import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { TaskAttachmentService } from './task-attachment.service';
import {
  ALLOWED_TASK_ATTACHMENT_MIME_TYPES,
  MAX_TASK_ATTACHMENT_SIZE,
  ensureTaskUploadRoot,
  getTaskAttachmentExtension,
} from './task-upload';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TaskAttachmentController {
  constructor(private readonly taskAttachmentService: TaskAttachmentService) {}

  @Get(':id/attachments')
  @Header('Cache-Control', 'no-store')
  async list(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskAttachmentService.list(req.user, id);
  }

  @Post(':id/attachments')
  @Header('Cache-Control', 'no-store')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          try {
            callback(null, ensureTaskUploadRoot());
          } catch (error) {
            callback(error as Error, '');
          }
        },
        filename: (_req, file, callback) => {
          const safeName = file.originalname
            .replace(/[^\w.\-]+/g, '_')
            .replace(/_+/g, '_')
            .slice(0, 80);
          const extension = getTaskAttachmentExtension(file.originalname) || extname(safeName);
          callback(null, `${Date.now()}-${randomUUID()}${extension}`);
        },
      }),
      limits: {
        fileSize: MAX_TASK_ATTACHMENT_SIZE,
      },
      fileFilter: (_req, file, callback) => {
        if (!ALLOWED_TASK_ATTACHMENT_MIME_TYPES.has(file.mimetype)) {
          callback(new BadRequestException(`Unsupported file type: ${file.mimetype}`), false);
          return;
        }

        callback(null, true);
      },
    }),
  )
  async upload(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    return this.taskAttachmentService.create(req.user, id, files);
  }

  @Get(':id/attachments/:attachmentId/file')
  @Header('Cache-Control', 'no-store')
  async stream(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Param('attachmentId', ParseIntPipe) attachmentId: number,
    @Query('download') download: string | undefined,
    @Res() res: Response,
  ): Promise<void> {
    const attachment = await this.taskAttachmentService.findOwnedAttachmentOrFail(req.user, id, attachmentId);

    res.setHeader(
      'Content-Disposition',
      `${download === '1' ? 'attachment' : 'inline'}; filename="${encodeURIComponent(attachment.originalName)}"`,
    );
    res.setHeader('Content-Type', attachment.mimeType);
    res.sendFile(attachment.filePath);
  }

  @Delete(':id/attachments/:attachmentId')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Param('attachmentId', ParseIntPipe) attachmentId: number,
  ) {
    return this.taskAttachmentService.remove(req.user, id, attachmentId);
  }
}
