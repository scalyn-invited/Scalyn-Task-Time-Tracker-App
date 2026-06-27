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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import type { Task } from '../generated/prisma';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { BulkTaskIdsDto } from './dto/bulk-task-ids.dto';
import { BulkUpdateTasksDto } from './dto/bulk-update-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTasksQueryDto } from './dto/list-tasks.query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query() query: ListTasksQueryDto,
  ) {
    return this.taskService.list(req.user, query);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-store')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.getOwnedTaskById(req.user, id);
  }

  @Get(':id/time-logs')
  @Header('Cache-Control', 'no-store')
  async findTimeLogs(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.listTimeLogs(req.user, id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateTaskDto,
  ) {
    return this.taskService.create(req.user, dto);
  }

  @Put('bulk')
  @Header('Cache-Control', 'no-store')
  async bulkUpdate(
    @Req() req: AuthenticatedRequest,
    @Body() dto: BulkUpdateTasksDto,
  ) {
    return this.taskService.bulkUpdate(req.user, dto);
  }

  @Put(':id')
  @Header('Cache-Control', 'no-store')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(req.user, id, dto);
  }

  @Delete('bulk')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async bulkRemove(
    @Req() req: AuthenticatedRequest,
    @Body() dto: BulkTaskIdsDto,
  ) {
    return this.taskService.bulkRemove(req.user, dto.taskIds);
  }

  @Delete(':id')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.remove(req.user, id);
  }
}
