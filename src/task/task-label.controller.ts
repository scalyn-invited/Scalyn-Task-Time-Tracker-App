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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import type { TaskLabel } from '../generated/prisma';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { CreateTaskLabelDto } from './dto/create-task-label.dto';
import { TaskLabelService } from './task-label.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('api/task-labels')
export class TaskLabelController {
  constructor(private readonly taskLabelService: TaskLabelService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  async findAll(@Req() req: AuthenticatedRequest) {
    return this.taskLabelService.list(req.user);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateTaskLabelDto,
  ) {
    return this.taskLabelService.create(req.user, dto);
  }

  @Delete(':id')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskLabel> {
    return this.taskLabelService.remove(req.user, id);
  }
}
