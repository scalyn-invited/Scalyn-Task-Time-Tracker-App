import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskPriority as TaskPriorityValue, TaskStatus as TaskStatusValue } from '../prisma/prisma-client';
import type { Prisma as PrismaTypes, Task, TaskLabel, TaskActivityAction } from '../generated/prisma';
import { SafeUser } from '../auth/types/auth.types';
import { PrismaService } from '../prisma/prisma.service';
import { BulkUpdateTasksDto } from './dto/bulk-update-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTasksQueryDto } from './dto/list-tasks.query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { sanitizeTaskHtml } from './task-html';
import { TaskActivityService } from './task-activity.service';

type TaskWithRelations = PrismaTypes.TaskGetPayload<{
  include: {
    client: true;
    user: true;
    labels: true;
  };
}>;

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskActivityService: TaskActivityService,
  ) {}

  async list(user: SafeUser, query: ListTasksQueryDto): Promise<TaskWithRelations[]> {
    const where: PrismaTypes.TaskWhereInput = {
      client: {
        userId: user.id,
      },
    };

    if (query.clientId !== undefined) {
      where.clientId = query.clientId;
    }

    if (query.userId !== undefined) {
      where.userId = query.userId;
    }

    const tasks = await this.prisma.task.findMany({
      where,
      include: {
        client: true,
        user: true,
        labels: true,
      },
      orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    });

    return tasks.map((task) => ({
      ...task,
      labels: [...task.labels].sort((left, right) => left.name.localeCompare(right.name)),
    }));
  }

  async create(user: SafeUser, dto: CreateTaskDto): Promise<TaskWithRelations> {
    const title = this.normalizeTitle(dto.title);
    const client = await this.findOwnedClientOrFail(user.id, dto.clientId);
    const assignee = await this.findUserOrFail(dto.userId);
    const priority = dto.priority ?? TaskPriorityValue.MEDIUM;
    const status = dto.status ?? TaskStatusValue.OPEN;
    const descriptionHtml = sanitizeTaskHtml(dto.descriptionHtml);
    const labels = await this.resolveLabels(dto.labels ?? []);

    const task = await this.prisma.task.create({
      data: {
        title,
        descriptionHtml: descriptionHtml || null,
        priority,
        status,
        client: {
          connect: {
            id: client.id,
          },
        },
        user: {
          connect: {
            id: assignee.id,
          },
        },
        labels: labels.length > 0
          ? {
              connect: labels.map((label) => ({ id: label.id })),
            }
          : undefined,
      },
      include: {
        client: true,
        user: true,
        labels: true,
      },
    });

    await this.taskActivityService.record({
      taskId: task.id,
      userId: user.id,
      action: 'TASK_CREATED' as TaskActivityAction,
      entityType: 'task',
      entityId: task.id,
      metadata: {
        title: task.title,
        clientId: task.clientId,
        userId: task.userId,
      },
    });

    return this.sortTaskLabels(task);
  }

  async update(
    user: SafeUser,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<TaskWithRelations> {
    const existingTask = await this.findOwnedTaskOrFail(user.id, taskId);
    const nextUserId = dto.userId ?? existingTask.userId;
    const assignee = nextUserId === existingTask.userId
      ? existingTask.user
      : await this.findUserOrFail(nextUserId);

    const data: PrismaTypes.TaskUpdateInput = {};

    if (dto.title !== undefined) {
      data.title = this.normalizeTitle(dto.title);
    }

    if (dto.descriptionHtml !== undefined) {
      data.descriptionHtml = sanitizeTaskHtml(dto.descriptionHtml) || null;
    }

    if (dto.priority !== undefined) {
      data.priority = dto.priority;
    }

    if (dto.status !== undefined) {
      data.status = dto.status;
    }

    if (dto.clientId !== undefined) {
      const client = dto.clientId === existingTask.clientId
        ? existingTask.client
        : await this.findOwnedClientOrFail(user.id, dto.clientId);
      data.client = {
        connect: {
          id: client.id,
        },
      };
    }

    if (dto.userId !== undefined) {
      data.user = {
        connect: {
          id: assignee.id,
        },
      };
    }

    if (dto.labels !== undefined) {
      const labels = await this.resolveLabels(dto.labels);
      data.labels = {
        set: labels.map((label) => ({ id: label.id })),
      };
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const task = await this.prisma.task.update({
      where: { id: existingTask.id },
      data,
      include: {
        client: true,
        user: true,
        labels: true,
      },
    });

    const activityUpdates = await this.getUpdateActivityEvents(user.id, existingTask, task, dto);
    await Promise.all(activityUpdates.map((entry) => this.taskActivityService.record(entry)));

    return this.sortTaskLabels(task);
  }

  async remove(user: SafeUser, taskId: number): Promise<Task> {
    await this.findOwnedTaskOrFail(user.id, taskId);

    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async bulkUpdate(user: SafeUser, dto: BulkUpdateTasksDto): Promise<{ count: number }> {
    if (!dto.changes || (dto.changes.priority === undefined && dto.changes.status === undefined)) {
      throw new BadRequestException('At least one change must be provided');
    }

    const tasks = await this.prisma.task.findMany({
      where: {
        id: { in: dto.taskIds },
        client: { userId: user.id },
      },
      include: {
        client: true,
        user: true,
        labels: true,
      },
    });

    if (tasks.length !== dto.taskIds.length) {
      throw new NotFoundException('One or more tasks were not found');
    }

    await this.prisma.task.updateMany({
      where: {
        id: { in: dto.taskIds },
      },
      data: {
        ...(dto.changes.priority !== undefined ? { priority: dto.changes.priority } : {}),
        ...(dto.changes.status !== undefined ? { status: dto.changes.status } : {}),
      },
    });

    return { count: dto.taskIds.length };
  }

  async bulkRemove(user: SafeUser, taskIds: number[]): Promise<{ count: number }> {
    const tasks = await this.prisma.task.findMany({
      where: {
        id: { in: taskIds },
        client: { userId: user.id },
      },
      select: { id: true },
    });

    if (tasks.length !== taskIds.length) {
      throw new NotFoundException('One or more tasks were not found');
    }

    await this.prisma.task.deleteMany({
      where: {
        id: { in: taskIds },
      },
    });

    return { count: taskIds.length };
  }

  async getOwnedTaskById(user: SafeUser, taskId: number): Promise<TaskWithRelations> {
    return this.findOwnedTaskOrFail(user.id, taskId);
  }

  async listTimeLogs(user: SafeUser, taskId: number) {
    await this.findOwnedTaskOrFail(user.id, taskId);

    const where: PrismaTypes.TimeEntryWhereInput = {
      taskId,
    };

    if (user.role === 'MEMBER') {
      where.userId = user.id;
    }

    return this.prisma.timeEntry.findMany({
      where,
      include: {
        task: {
          include: {
            client: true,
          },
        },
        client: true,
        user: true,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
  }

  async listAllLabels(): Promise<TaskLabel[]> {
    return this.prisma.taskLabel.findMany({
      orderBy: { name: 'asc' },
    });
  }

  private async findOwnedClientOrFail(userId: number, clientId: number) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        userId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  private async findUserOrFail(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Assigned user not found');
    }

    return user;
  }

  private async findOwnedTaskOrFail(userId: number, taskId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        client: {
          userId,
        },
      },
      include: {
        client: true,
        user: true,
        labels: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  private async getUpdateActivityEvents(
    actorUserId: number,
    before: TaskWithRelations,
    after: TaskWithRelations,
    dto: UpdateTaskDto,
  ): Promise<Array<{
    taskId: number;
    userId: number;
    action: TaskActivityAction;
    entityType: string;
    entityId?: number | null;
    metadata?: Record<string, unknown>;
  }>> {
    const events: Array<{
      taskId: number;
      userId: number;
      action: TaskActivityAction;
      entityType: string;
      entityId?: number | null;
      metadata?: Record<string, unknown>;
    }> = [];

    const statusChanged = dto.status !== undefined && before.status !== after.status;
    const descriptionChanged = dto.descriptionHtml !== undefined && before.descriptionHtml !== after.descriptionHtml;
    const assigneeChanged = dto.userId !== undefined && before.userId !== after.userId;
    const genericUpdated =
      dto.title !== undefined ||
      dto.priority !== undefined ||
      dto.clientId !== undefined ||
      dto.labels !== undefined;

    if (statusChanged) {
      events.push({
        taskId: after.id,
        userId: actorUserId,
        action: 'TASK_STATUS_CHANGED' as TaskActivityAction,
        entityType: 'task',
        entityId: after.id,
        metadata: { previous: before.status, next: after.status },
      });
    }

    if (descriptionChanged) {
      events.push({
        taskId: after.id,
        userId: actorUserId,
        action: 'TASK_DESCRIPTION_UPDATED' as TaskActivityAction,
        entityType: 'task',
        entityId: after.id,
        metadata: {
          previousLength: before.descriptionHtml?.length || 0,
          nextLength: after.descriptionHtml?.length || 0,
        },
      });
    }

    if (assigneeChanged) {
      events.push({
        taskId: after.id,
        userId: actorUserId,
        action: 'TASK_ASSIGNED' as TaskActivityAction,
        entityType: 'user',
        entityId: after.userId,
        metadata: { previousUserId: before.userId, nextUserId: after.userId },
      });
    }

    if (genericUpdated) {
      events.push({
        taskId: after.id,
        userId: actorUserId,
        action: 'TASK_UPDATED' as TaskActivityAction,
        entityType: 'task',
        entityId: after.id,
        metadata: {
          previousTitle: before.title,
          nextTitle: after.title,
          previousClientId: before.clientId,
          nextClientId: after.clientId,
          previousPriority: before.priority,
          nextPriority: after.priority,
        },
      });
    }

    return events;
  }

  private async resolveLabels(labels: string[]): Promise<TaskLabel[]> {
    const normalizedLabels = this.normalizeLabels(labels);

    if (normalizedLabels.length === 0) {
      return [];
    }

    const existingLabels = await this.prisma.taskLabel.findMany({
      where: {
        name: {
          in: normalizedLabels,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    if (existingLabels.length !== normalizedLabels.length) {
      throw new BadRequestException('One or more labels do not exist');
    }

    return existingLabels;
  }

  private normalizeTitle(title: string): string {
    const normalizedTitle = title.trim().replace(/\s+/g, ' ');

    if (normalizedTitle.length < 2 || normalizedTitle.length > 191) {
      throw new BadRequestException('Task title must be between 2 and 191 characters');
    }

    return normalizedTitle;
  }

  private normalizeLabels(labels: string[]): string[] {
    const normalized = labels
      .map((label) => this.normalizeLabel(label))
      .filter((label) => label.length > 0);

    return [...new Set(normalized)];
  }

  private normalizeLabel(label: string): string {
    if (typeof label !== 'string') {
      throw new BadRequestException('Label must be a string');
    }

    const normalizedLabel = label.trim().replace(/\s+/g, ' ');

    if (normalizedLabel.length === 0 || normalizedLabel.length > 80) {
      throw new BadRequestException('Labels must be between 1 and 80 characters');
    }

    return normalizedLabel;
  }

  private sortTaskLabels(task: TaskWithRelations): TaskWithRelations {
    return {
      ...task,
      labels: [...task.labels].sort((left, right) => left.name.localeCompare(right.name)),
    };
  }
}
