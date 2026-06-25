import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import type { Prisma as PrismaTypes, TaskAttachment } from '../generated/prisma';
import { SafeUser } from '../auth/types/auth.types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskService } from './task.service';
import { TaskActivityService } from './task-activity.service';
import { buildTaskAttachmentPath, ensureTaskUploadRoot } from './task-upload';

type TaskAttachmentWithUploader = PrismaTypes.TaskAttachmentGetPayload<{
  include: {
    uploadedByUser: true;
  };
}>;

export type UploadedTaskAttachment = Express.Multer.File;

@Injectable()
export class TaskAttachmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskService: TaskService,
    private readonly taskActivityService: TaskActivityService,
  ) {}

  async list(user: SafeUser, taskId: number): Promise<TaskAttachmentWithUploader[]> {
    await this.taskService.getOwnedTaskById(user, taskId);

    const attachments = await this.prisma.taskAttachment.findMany({
      where: { taskId },
      include: { uploadedByUser: true },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return attachments.map((attachment) => ({
      ...attachment,
      filePath: String(attachment.filePath),
    }));
  }

  async create(
    user: SafeUser,
    taskId: number,
    files: UploadedTaskAttachment[],
  ): Promise<TaskAttachmentWithUploader[]> {
    const task = await this.taskService.getOwnedTaskById(user, taskId);
    ensureTaskUploadRoot();

    if (files.length === 0) {
      return this.list(user, taskId);
    }

    for (const file of files) {
      await this.prisma.taskAttachment.create({
        data: {
          taskId: task.id,
          uploadedBy: user.id,
          fileName: file.filename,
          originalName: file.originalname,
          fileSize: file.size,
          mimeType: file.mimetype,
          filePath: file.path,
        },
      });

      await this.taskActivityService.record({
        taskId: task.id,
        userId: user.id,
        action: 'ATTACHMENT_UPLOADED',
        entityType: 'attachment',
        metadata: {
          fileName: file.filename,
          originalName: file.originalname,
          fileSize: file.size,
          mimeType: file.mimetype,
        },
      });
    }

    return this.list(user, taskId);
  }

  async remove(user: SafeUser, taskId: number, attachmentId: number): Promise<TaskAttachment> {
    const task = await this.taskService.getOwnedTaskById(user, taskId);
    const attachment = await this.prisma.taskAttachment.findFirst({
      where: {
        id: attachmentId,
        taskId: task.id,
      },
    });

    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }

    if (existsSync(attachment.filePath)) {
      unlinkSync(attachment.filePath);
    }

    const deleted = await this.prisma.taskAttachment.delete({
      where: { id: attachment.id },
    });

    await this.taskActivityService.record({
      taskId: task.id,
      userId: user.id,
      action: 'ATTACHMENT_DELETED',
      entityType: 'attachment',
      entityId: deleted.id,
      metadata: {
        originalName: deleted.originalName,
        fileName: deleted.fileName,
      },
    });

    return deleted;
  }

  async findOwnedAttachmentOrFail(
    user: SafeUser,
    taskId: number,
    attachmentId: number,
  ): Promise<TaskAttachmentWithUploader> {
    await this.taskService.getOwnedTaskById(user, taskId);

    const attachment = await this.prisma.taskAttachment.findFirst({
      where: {
        id: attachmentId,
        taskId,
      },
      include: {
        uploadedByUser: true,
      },
    });

    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }

    return attachment;
  }

  getAttachmentPath(fileName: string): string {
    return buildTaskAttachmentPath(fileName);
  }
}
