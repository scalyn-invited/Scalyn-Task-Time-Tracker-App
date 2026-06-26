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
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { TimesheetQueryDto } from './dto/timesheet-query.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import { TimesheetResponse } from './timesheet.types';
import { TimesheetService } from './timesheet.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('time-entries')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  async list(
    @Req() req: AuthenticatedRequest,
    @Query() query: TimesheetQueryDto,
  ): Promise<TimesheetResponse> {
    return this.timesheetService.list(req.user, query);
  }

  @Patch(':id')
  @Header('Cache-Control', 'no-store')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTimeEntryDto,
  ) {
    return this.timesheetService.update(req.user, id, dto);
  }

  @Delete(':id')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.timesheetService.remove(req.user, id);
  }
}
