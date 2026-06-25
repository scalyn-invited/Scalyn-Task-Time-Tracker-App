import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import type { TaskComment } from '../generated/prisma';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
import { TaskCommentService } from './task-comment.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TaskCommentController {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  @Get(':id/comments')
  @Header('Cache-Control', 'no-store')
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskCommentService.list(req.user, id);
  }

  @Post(':id/comments')
  @Header('Cache-Control', 'no-store')
  async create(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateTaskCommentDto,
  ) {
    return this.taskCommentService.create(req.user, id, dto);
  }
}

@UseGuards(JwtAuthGuard)
@Controller('api/comments')
export class CommentController {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  @Put(':id')
  @Header('Cache-Control', 'no-store')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskCommentDto,
  ) {
    return this.taskCommentService.update(req.user, id, dto);
  }

  @Delete(':id')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskComment> {
    return this.taskCommentService.remove(req.user, id);
  }
}
