import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Team, TeamMember, User } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '../prisma/prisma-client';
import { SafeUser, SystemRole } from '../auth/types/auth.types';
import { AddTeamMemberDto } from './dto/add-team-member.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

type TeamRecord = Team & {
  members?: Array<TeamMember & { user: Pick<User, 'id' | 'name' | 'email' | 'systemRole' | 'isActive' | 'createdAt' | 'updatedAt'> }>;
  _count?: { members: number };
};

type TeamMemberRecord = TeamMember & {
  user: Pick<User, 'id' | 'name' | 'email' | 'systemRole' | 'isActive' | 'createdAt' | 'updatedAt'>;
};

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async listTeams(currentUser: SafeUser) {
    const teams = await this.prisma.team.findMany({
      where: currentUser.systemRole === 'admin'
        ? undefined
        : {
            members: {
              some: {
                userId: currentUser.id,
                role: UserRole.MANAGER,
              },
            },
          },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                systemRole: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return teams.map((team) => this.toTeamSummary(team as TeamRecord));
  }

  async getTeam(currentUser: SafeUser, teamId: number) {
    const team = await this.findAccessibleTeam(currentUser, teamId);
    return this.toTeamSummary(team);
  }

  async createTeam(currentUser: SafeUser, dto: CreateTeamDto) {
    this.ensureAdmin(currentUser);

    const name = dto.name.trim();
    const existing = await this.prisma.team.findFirst({ where: { name } });
    if (existing) {
      throw new ConflictException('Team name already exists');
    }

    const team = await this.prisma.team.create({
      data: {
        name,
        description: dto.description?.trim() || null,
        createdById: currentUser.id,
      },
      include: {
        members: true,
        _count: { select: { members: true } },
      },
    });

    return this.toTeamSummary(team as TeamRecord);
  }

  async updateTeam(currentUser: SafeUser, teamId: number, dto: UpdateTeamDto) {
    const team = await this.findManageableTeam(currentUser, teamId);
    const data: { name?: string; description?: string | null } = {};

    if (dto.name !== undefined) {
      data.name = dto.name.trim();
    }

    if (dto.description !== undefined) {
      data.description = dto.description?.trim() || null;
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const updated = await this.prisma.team.update({
      where: { id: team.id },
      data,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                systemRole: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
        _count: { select: { members: true } },
      },
    });

    return this.toTeamSummary(updated as TeamRecord);
  }

  async deleteTeam(currentUser: SafeUser, teamId: number): Promise<void> {
    const team = await this.findManageableTeam(currentUser, teamId);

    await this.prisma.team.delete({
      where: { id: team.id },
    });
  }

  async listMembers(currentUser: SafeUser, teamId: number) {
    const team = await this.findAccessibleTeam(currentUser, teamId);

    const members = await this.prisma.teamMember.findMany({
      where: { teamId: team.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            systemRole: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: [{ joinedAt: 'desc' }],
    });

    return members.map((member) => this.toMemberSummary(member as TeamMemberRecord));
  }

  async addMember(currentUser: SafeUser, teamId: number, dto: AddTeamMemberDto) {
    const team = await this.findManageableTeam(currentUser, teamId);
    const targetUser = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    if (targetUser.id === currentUser.id && currentUser.systemRole !== 'admin') {
      throw new ForbiddenException('You cannot add yourself to a team');
    }

    if (currentUser.systemRole !== 'admin') {
      this.ensureManagerAssignableRole(currentUser, dto.role);
    }

    try {
      const member = await this.prisma.teamMember.create({
        data: {
          teamId: team.id,
          userId: targetUser.id,
          role: this.toStoredRole(dto.role),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              systemRole: true,
              isActive: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return this.toMemberSummary(member as TeamMemberRecord);
    } catch (error: unknown) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('User is already a member of this team');
      }

      throw error;
    }
  }

  async updateMember(currentUser: SafeUser, teamId: number, memberId: number, dto: UpdateTeamMemberDto) {
    const team = await this.findManageableTeam(currentUser, teamId);
    const member = await this.prisma.teamMember.findUnique({
      where: { id: memberId },
      include: { user: true },
    });

    if (!member || member.teamId !== team.id) {
      throw new NotFoundException('Team member not found');
    }

    if (member.userId === currentUser.id && currentUser.systemRole !== 'admin') {
      throw new ForbiddenException('You cannot change your own team role');
    }

    if (currentUser.systemRole !== 'admin') {
      this.ensureManagerAssignableRole(currentUser, dto.role);
    }

    const updated = await this.prisma.teamMember.update({
      where: { id: member.id },
      data: { role: this.toStoredRole(dto.role) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            systemRole: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return this.toMemberSummary(updated as TeamMemberRecord);
  }

  async removeMember(currentUser: SafeUser, teamId: number, memberId: number): Promise<void> {
    const team = await this.findManageableTeam(currentUser, teamId);
    const member = await this.prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!member || member.teamId !== team.id) {
      throw new NotFoundException('Team member not found');
    }

    if (member.userId === currentUser.id && currentUser.systemRole !== 'admin') {
      throw new ForbiddenException('You cannot remove yourself from a team');
    }

    await this.prisma.teamMember.delete({
      where: { id: member.id },
    });
  }

  private async findManageableTeam(currentUser: SafeUser, teamId: number): Promise<Team> {
    const team = await this.findTeamOrFail(teamId);

    if (currentUser.systemRole === 'admin') {
      return team;
    }

    const membership = await this.prisma.teamMember.findFirst({
      where: {
        teamId: team.id,
        userId: currentUser.id,
        role: UserRole.MANAGER,
      },
    });

    if (!membership) {
      throw new ForbiddenException('You cannot manage this team');
    }

    return team;
  }

  private async findAccessibleTeam(currentUser: SafeUser, teamId: number): Promise<TeamRecord> {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                systemRole: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
        _count: { select: { members: true } },
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    if (currentUser.systemRole === 'admin') {
      return team as TeamRecord;
    }

    const hasAccess = await this.prisma.teamMember.findFirst({
      where: {
        teamId: team.id,
        userId: currentUser.id,
        role: UserRole.MANAGER,
      },
    });

    if (!hasAccess) {
      throw new ForbiddenException('You cannot access this team');
    }

    return team as TeamRecord;
  }

  private async findTeamOrFail(teamId: number): Promise<Team> {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  private toTeamSummary(team: TeamRecord) {
    const members = team.members ?? [];
    return {
      id: team.id,
      name: team.name,
      description: team.description,
      createdById: team.createdById,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
      membersCount: team._count?.members ?? members.length,
      managersCount: members.filter((member) => member.role === UserRole.MANAGER).length,
    };
  }

  private toMemberSummary(member: TeamMemberRecord) {
    return {
      id: member.id,
      teamId: member.teamId,
      userId: member.userId,
      role: this.toSystemRole(member.role),
      joinedAt: member.joinedAt,
      user: {
        id: member.user.id,
        name: member.user.name,
        email: member.user.email,
        systemRole: this.toSystemRole(member.user.systemRole),
        role: member.user.systemRole,
        isActive: member.user.isActive,
        createdAt: member.user.createdAt,
        updatedAt: member.user.updatedAt,
      },
    };
  }

  private ensureAdmin(user: SafeUser): void {
    if (user.systemRole !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
  }

  private ensureManagerAssignableRole(user: SafeUser, role: string): void {
    if (user.systemRole === 'admin') {
      return;
    }

    if (role === 'admin') {
      throw new ForbiddenException('Managers cannot assign admin roles');
    }

    if (user.systemRole !== 'manager') {
      throw new ForbiddenException('You cannot assign team roles');
    }
  }

  private toStoredRole(role: string): User['systemRole'] {
    return role.toUpperCase() as User['systemRole'];
  }

  private toSystemRole(role: User['systemRole']): SystemRole {
    return role.toLowerCase() as SystemRole;
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
