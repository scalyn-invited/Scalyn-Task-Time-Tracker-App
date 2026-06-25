import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma as PrismaTypes, TaskComment } from '../generated/prisma';
import { SafeUser } from '../auth/types/auth.types';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
import { sanitizeTaskHtml } from './task-html';
import { TaskService } from './task.service';
import { TaskActivityService } from './task-activity.service';

type TaskCommentWithAuthor = PrismaTypes.TaskCommentGetPayload<{
  include: {
    user: true;
  };
}>;

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskService: TaskService,
    private readonly taskActivityService: TaskActivityService,
  ) {}

  async list(user: SafeUser, taskId: number): Promise<TaskCommentWithAuthor[]> {
    await this.taskService.getOwnedTaskById(user, taskId);

    return this.prisma.taskComment.findMany({
      where: { taskId },
      include: { user: true },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });
  }

  async create(user: SafeUser, taskId: number, dto: CreateTaskCommentDto): Promise<TaskCommentWithAuthor> {
    const task = await this.taskService.getOwnedTaskById(user, taskId);
    const content = sanitizeTaskHtml(dto.content);
    const parentId = dto.parentId ?? null;
    let parent: TaskComment | null = null;

    if (parentId !== null) {
      parent = await this.prisma.taskComment.findFirst({
        where: {
          id: parentId,
          taskId: task.id,
        },
      });

      if (!parent) {
        throw new NotFoundException('Parent comment not found');
      }

      const depth = await this.getCommentDepth(parent.id);
      if (depth >= 3) {
        throw new BadRequestException('Comment threads are limited to 3 levels');
      }
    }

    const comment = await this.prisma.taskComment.create({
      data: {
        taskId: task.id,
        userId: user.id,
        parentId,
        content,
        editedAt: null,
      },
      include: { user: true },
    });

    await this.taskActivityService.record({
      taskId: task.id,
      userId: user.id,
      action: parent ? 'COMMENT_REPLIED' : 'COMMENT_ADDED',
      entityType: 'comment',
      entityId: comment.id,
      metadata: {
        parentId,
      },
    });

    return comment;
  }

  async update(user: SafeUser, commentId: number, dto: UpdateTaskCommentDto): Promise<TaskCommentWithAuthor> {
    const existing = await this.findOwnedCommentOrFail(user.id, commentId);
    const content = sanitizeTaskHtml(dto.content);

    const updated = await this.prisma.taskComment.update({
      where: { id: existing.id },
      data: {
        content,
        editedAt: new Date(),
      },
      include: { user: true },
    });

    await this.taskActivityService.record({
      taskId: updated.taskId,
      userId: user.id,
      action: 'COMMENT_EDITED',
      entityType: 'comment',
      entityId: updated.id,
    });

    return updated;
  }

  async remove(user: SafeUser, commentId: number): Promise<TaskComment> {
    const existing = await this.findOwnedCommentOrFail(user.id, commentId);

    const deleted = await this.prisma.taskComment.delete({
      where: { id: existing.id },
    });

    await this.taskActivityService.record({
      taskId: deleted.taskId,
      userId: user.id,
      action: 'COMMENT_DELETED',
      entityType: 'comment',
      entityId: deleted.id,
      metadata: {
        parentId: deleted.parentId,
      },
    });

    return deleted;
  }

  private async findOwnedCommentOrFail(userId: number, commentId: number): Promise<TaskCommentWithAuthor> {
    const comment = await this.prisma.taskComment.findFirst({
      where: {
        id: commentId,
        userId,
      },
      include: { user: true },
    });

    if (!comment) {
      throw new ForbiddenException('Comment not found or not owned by you');
    }

    return comment;
  }

  private async getCommentDepth(commentId: number): Promise<number> {
    let depth = 1;
    let current = await this.prisma.taskComment.findUnique({
      where: { id: commentId },
      select: { parentId: true },
    });

    while (current?.parentId) {
      depth += 1;
      current = await this.prisma.taskComment.findUnique({
        where: { id: current.parentId },
        select: { parentId: true },
      });
    }

    return depth;
  }
}
