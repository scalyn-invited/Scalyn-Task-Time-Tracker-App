import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { User } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '../prisma/prisma-client';
import { SafeUser, SystemRole } from '../auth/types/auth.types';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { BulkUpdateUserStatusDto } from './dto/bulk-update-user-status.dto';

type UserRecord = Pick<User, 'id' | 'name' | 'email' | 'password' | 'systemRole' | 'isActive' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class UserManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentUser(userId: number): Promise<SafeUser> {
    const user = await this.findUserOrFail(userId);
    return this.toSafeUser(user);
  }

  async updateProfile(userId: number, dto: UpdateUserDto): Promise<SafeUser> {
    const user = await this.findUserOrFail(userId);

    const data: { name?: string; email?: string } = {};

    if (dto.name !== undefined) {
      data.name = dto.name.trim();
    }

    if (dto.email !== undefined) {
      data.email = dto.email.trim().toLowerCase();
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const updated = await this.updateUserRecord(user.id, data);
    return this.toSafeUser(updated);
  }

  async changePassword(userId: number, dto: ChangePasswordDto): Promise<void> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Password confirmation does not match');
    }

    const user = await this.findUserOrFail(userId);
    const matches = await bcrypt.compare(dto.currentPassword, user.password);

    if (!matches) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const password = await this.hashPassword(dto.newPassword);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password },
    });
  }

  async listUsers(currentUser: SafeUser): Promise<SafeUser[]> {
    const users =
      currentUser.systemRole === 'admin'
        ? await this.prisma.user.findMany({
            orderBy: [{ createdAt: 'desc' }],
          })
        : await this.prisma.user.findMany({
            where: {
              teamMemberships: {
                some: {
                  team: {
                    members: {
                      some: {
                        userId: currentUser.id,
                        role: UserRole.MANAGER,
                      },
                    },
                  },
                },
              },
            },
            orderBy: [{ createdAt: 'desc' }],
          });

    return users.map((user) => this.toSafeUser(user as UserRecord));
  }

  async getUser(currentUser: SafeUser, userId: number): Promise<SafeUser> {
    const user = await this.findAccessibleUser(currentUser, userId);
    return this.toSafeUser(user);
  }

  async createUser(currentUser: SafeUser, dto: CreateUserDto): Promise<SafeUser> {
    this.ensureAdmin(currentUser);

    if (dto.temporaryPassword !== dto.confirmPassword) {
      throw new BadRequestException('Password confirmation does not match');
    }

    const email = dto.email.trim().toLowerCase();
    const password = await this.hashPassword(dto.temporaryPassword);
    const systemRole = this.toStoredRole(dto.systemRole);

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const user = await this.prisma.$transaction(async (transaction) => {
      const created = await transaction.user.create({
        data: {
          name: dto.name.trim(),
          email,
          password,
          systemRole,
          isActive: true,
        },
      });

      if (dto.assignToTeam && dto.teamId && dto.teamRole) {
        await transaction.teamMember.create({
          data: {
            teamId: dto.teamId,
            userId: created.id,
            role: this.toStoredRole(dto.teamRole),
          },
        });
      } else if (dto.assignToTeam && dto.teamId) {
        await transaction.teamMember.create({
          data: {
            teamId: dto.teamId,
            userId: created.id,
            role: UserRole.MEMBER,
          },
        });
      }

      return created;
    });

    return this.toSafeUser(user);
  }

  async updateUser(currentUser: SafeUser, userId: number, dto: UpdateUserAdminDto): Promise<SafeUser> {
    this.ensureAdmin(currentUser);

    if (userId === currentUser.id && dto.systemRole && this.toSystemRole(dto.systemRole) !== currentUser.systemRole) {
      throw new ForbiddenException('You cannot change your own system role');
    }

    const user = await this.findUserOrFail(userId);
    const data: { name?: string; email?: string; systemRole?: User['systemRole'] } = {};

    if (dto.name !== undefined) {
      data.name = dto.name.trim();
    }

    if (dto.email !== undefined) {
      data.email = dto.email.trim().toLowerCase();
    }

    if (dto.systemRole !== undefined) {
      data.systemRole = this.toStoredRole(dto.systemRole);
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const updated = await this.updateUserRecord(user.id, data);
    return this.toSafeUser(updated);
  }

  async updateStatus(currentUser: SafeUser, userId: number, dto: UpdateUserStatusDto): Promise<SafeUser> {
    this.ensureAdmin(currentUser);

    if (userId === currentUser.id && dto.isActive === false) {
      throw new ForbiddenException('You cannot deactivate your own account');
    }

    const user = await this.findUserOrFail(userId);
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: { isActive: dto.isActive },
    });

    return this.toSafeUser(updated);
  }

  async deleteUser(currentUser: SafeUser, userId: number): Promise<SafeUser> {
    this.ensureAdmin(currentUser);

    if (userId === currentUser.id) {
      throw new ForbiddenException('You cannot delete your own account');
    }

    const user = await this.findUserOrFail(userId);

    try {
      await this.prisma.user.delete({
        where: { id: user.id },
      });
    } catch (_error) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { isActive: false },
      });
    }

    return {
      ...this.toSafeUser(user),
      isActive: false,
    };
  }

  async bulkUpdateStatus(currentUser: SafeUser, dto: BulkUpdateUserStatusDto): Promise<{ count: number }> {
    this.ensureAdmin(currentUser);

    if (dto.userIds.includes(currentUser.id) && dto.isActive === false) {
      throw new ForbiddenException('You cannot deactivate your own account');
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: dto.userIds },
      },
      select: { id: true },
    });

    if (users.length !== dto.userIds.length) {
      throw new NotFoundException('One or more users were not found');
    }

    await this.prisma.user.updateMany({
      where: {
        id: { in: dto.userIds },
      },
      data: { isActive: dto.isActive },
    });

    return { count: dto.userIds.length };
  }

  private async findAccessibleUser(currentUser: SafeUser, userId: number): Promise<UserRecord> {
    const user = await this.findUserOrFail(userId);

    if (currentUser.systemRole === 'admin') {
      return user;
    }

    if (currentUser.id === user.id) {
      return user;
    }

    const allowed = await this.prisma.teamMember.findFirst({
      where: {
        userId: currentUser.id,
        role: UserRole.MANAGER,
        team: {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      },
    });

    if (!allowed) {
      throw new ForbiddenException('You cannot access this user');
    }

    return user;
  }

  private async findUserOrFail(userId: number): Promise<UserRecord> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user as UserRecord;
  }

  private async updateUserRecord(
    userId: number,
    data: { name?: string; email?: string; systemRole?: User['systemRole'] },
  ): Promise<UserRecord> {
    try {
      return (await this.prisma.user.update({
        where: { id: userId },
        data,
      })) as UserRecord;
    } catch (error: unknown) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('Email is already registered');
      }

      throw error;
    }
  }

  private ensureAdmin(user: SafeUser): void {
    if (user.systemRole !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
  }

  private toSafeUser(user: UserRecord): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      systemRole: this.toSystemRole(user.systemRole),
      role: user.systemRole,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private toStoredRole(role: string): User['systemRole'] {
    return role.toUpperCase() as User['systemRole'];
  }

  private toSystemRole(role: string): SystemRole {
    return role.toLowerCase() as SystemRole;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2002'
    );
  }
}
