import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskActivityController } from './task-activity.controller';
import { TaskAttachmentController } from './task-attachment.controller';
import { CommentController, TaskCommentController } from './task-comment.controller';
import { TaskLabelController } from './task-label.controller';
import { TaskLabelService } from './task-label.service';
import { TaskController } from './task.controller';
import { TaskActivityService } from './task-activity.service';
import { TaskAttachmentService } from './task-attachment.service';
import { TaskCommentService } from './task-comment.service';
import { TaskService } from './task.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [
    TaskController,
    TaskLabelController,
    TaskAttachmentController,
    TaskCommentController,
    CommentController,
    TaskActivityController,
  ],
  providers: [
    TaskService,
    TaskLabelService,
    TaskActivityService,
    TaskAttachmentService,
    TaskCommentService,
  ],
  exports: [TaskService, TaskLabelService, TaskActivityService, TaskAttachmentService, TaskCommentService],
})
export class TaskModule {}
