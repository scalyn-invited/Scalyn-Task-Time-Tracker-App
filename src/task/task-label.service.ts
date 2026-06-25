import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { TaskLabel, UserRole } from '../generated/prisma';
import { UserRole as UserRoleValue } from '../prisma/prisma-client';
import { SafeUser } from '../auth/types/auth.types';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskLabelDto } from './dto/create-task-label.dto';

@Injectable()
export class TaskLabelService {
  constructor(private readonly prisma: PrismaService) {}

  async list(_user: SafeUser): Promise<TaskLabel[]> {
    const labels = await this.prisma.taskLabel.findMany({
      orderBy: [{ name: 'asc' }],
    });

    return labels.map((label) => ({
      ...label,
      name: this.normalizeName(label.name),
    }));
  }

  async create(user: SafeUser, dto: CreateTaskLabelDto): Promise<TaskLabel> {
    this.ensureLabelManager(user.role);

    const name = this.normalizeName(dto.name);

    return this.prisma.taskLabel.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });
  }

  async remove(user: SafeUser, labelId: number): Promise<TaskLabel> {
    this.ensureLabelManager(user.role);

    const label = await this.findLabelOrFail(labelId);

    return this.prisma.taskLabel.delete({
      where: {
        id: label.id,
      },
    });
  }

  private async findLabelOrFail(labelId: number) {
    const label = await this.prisma.taskLabel.findUnique({
      where: {
        id: labelId,
      },
    });

    if (!label) {
      throw new NotFoundException('Label not found');
    }

    return label;
  }

  private ensureLabelManager(role: UserRole): void {
    if (role !== UserRoleValue.ADMIN && role !== UserRoleValue.MANAGER) {
      throw new ForbiddenException('You do not have permission to manage labels');
    }
  }

  private normalizeName(name: string): string {
    const normalizedName = String(name || '').trim().replace(/\s+/g, ' ');

    if (normalizedName.length < 1 || normalizedName.length > 80) {
      throw new BadRequestException('Label name must be between 1 and 80 characters');
    }

    return normalizedName;
  }
}
