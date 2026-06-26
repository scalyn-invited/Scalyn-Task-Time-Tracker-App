import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import type {
  ReportBillableFilter,
  ReportEntryTypeFilter,
  ReportPreset,
  ReportSortField,
} from '../reports.types';

const REPORT_PRESETS: ReportPreset[] = [
  'today',
  'yesterday',
  'thisWeek',
  'lastWeek',
  'thisMonth',
  'lastMonth',
  'thisYear',
  'custom',
];

const REPORT_ENTRY_TYPES: ReportEntryTypeFilter[] = ['all', 'timer', 'manual'];
const REPORT_BILLABLE_FILTERS: ReportBillableFilter[] = ['all', 'true', 'false'];
const REPORT_SORT_FIELDS: ReportSortField[] = [
  'date',
  'client',
  'task',
  'teamMember',
  'startTime',
  'endTime',
  'duration',
  'description',
  'entryType',
];

export class ReportQueryDto {
  @IsOptional()
  @IsIn(REPORT_PRESETS)
  preset?: ReportPreset;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

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
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId?: number;

  @IsOptional()
  @IsIn(REPORT_ENTRY_TYPES)
  entryType?: ReportEntryTypeFilter;

  @IsOptional()
  @IsIn(['all', 'RUNNING', 'PAUSED', 'COMPLETED'])
  status?: 'all' | 'RUNNING' | 'PAUSED' | 'COMPLETED';

  @IsOptional()
  @IsIn(REPORT_BILLABLE_FILTERS)
  billable?: ReportBillableFilter;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;

  @IsOptional()
  @IsIn(REPORT_SORT_FIELDS)
  sortBy?: ReportSortField;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDir?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  draw?: number;
}
