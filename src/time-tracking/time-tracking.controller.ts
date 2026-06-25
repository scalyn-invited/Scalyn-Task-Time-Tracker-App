import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { ManualEntryDto } from './dto/manual-entry.dto';
import { StartTimerDto } from './dto/start-timer.dto';
import { StopTimerDto } from './dto/stop-timer.dto';
import { TimeTrackingService } from './time-tracking.service';
import { TimeEntryResponse } from './time-tracking.types';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('timer')
export class TimeTrackingController {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  @Get('active')
  @Header('Cache-Control', 'no-store')
  async getActive(
    @Req() req: AuthenticatedRequest,
  ): Promise<TimeEntryResponse | null> {
    return this.timeTrackingService.getActiveTimer(req.user.id);
  }

  @Post('start')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async start(
    @Req() req: AuthenticatedRequest,
    @Body() dto: StartTimerDto,
  ): Promise<TimeEntryResponse> {
    return this.timeTrackingService.startTimer(req.user.id, dto);
  }

  @Post('pause')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async pause(
    @Req() req: AuthenticatedRequest,
  ): Promise<TimeEntryResponse> {
    return this.timeTrackingService.pauseTimer(req.user.id);
  }

  @Post('resume')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async resume(
    @Req() req: AuthenticatedRequest,
  ): Promise<TimeEntryResponse> {
    return this.timeTrackingService.resumeTimer(req.user.id);
  }

  @Post('stop')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async stop(
    @Req() req: AuthenticatedRequest,
    @Body() dto: StopTimerDto,
  ): Promise<TimeEntryResponse> {
    return this.timeTrackingService.stopTimer(req.user.id, dto);
  }

  @Post('manual')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async manual(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ManualEntryDto,
  ): Promise<TimeEntryResponse> {
    return this.timeTrackingService.createManualEntry(req.user.id, dto);
  }
}
