import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTimeEntryDto {
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
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
