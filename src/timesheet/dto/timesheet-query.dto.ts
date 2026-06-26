import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, Min } from 'class-validator';
import type { TimesheetView } from '../timesheet.types';

const TIMESHEET_VIEWS: TimesheetView[] = ['daily', 'weekly', 'monthly'];

export class TimesheetQueryDto {
  @IsOptional()
  @IsIn(TIMESHEET_VIEWS)
  view?: TimesheetView;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  clientId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  taskId?: number;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}
