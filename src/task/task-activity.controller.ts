import { Controller, Get, Header, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { TaskActivityService } from './task-activity.service';
import { TaskService } from './task.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TaskActivityController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskActivityService: TaskActivityService,
  ) {}

  @Get(':id/activity')
  @Header('Cache-Control', 'no-store')
  async list(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.taskService.getOwnedTaskById(req.user, id);
    return this.taskActivityService.listByTask(id);
  }
}
