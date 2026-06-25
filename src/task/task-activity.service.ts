import { Injectable } from '@nestjs/common';
import type { Prisma as PrismaTypes, TaskActivity, TaskActivityAction } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

type TaskActivityWithActor = PrismaTypes.TaskActivityGetPayload<{
  include: {
    user: true;
    task: true;
  };
}>;

export interface TaskActivityMetadata {
  [key: string]: unknown;
}

@Injectable()
export class TaskActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async record(params: {
    taskId: number;
    userId: number;
    action: TaskActivityAction;
    entityType: string;
    entityId?: number | null;
    metadata?: TaskActivityMetadata | null;
  }): Promise<TaskActivity> {
    return this.prisma.taskActivity.create({
      data: {
        taskId: params.taskId,
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId ?? null,
        metadata: (params.metadata ?? undefined) as PrismaTypes.InputJsonValue | undefined,
      },
    });
  }

  async listByTask(taskId: number): Promise<TaskActivityWithActor[]> {
    return this.prisma.taskActivity.findMany({
      where: { taskId },
      include: {
        user: true,
        task: true,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }
}
