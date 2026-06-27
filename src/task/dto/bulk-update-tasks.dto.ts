import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayUnique, IsArray, IsEnum, IsInt, IsOptional, Min, ValidateNested } from 'class-validator';
import { TaskPriority as TaskPriorityValue, TaskStatus as TaskStatusValue } from '../../prisma/prisma-client';
import type { TaskPriority, TaskStatus } from '../../generated/prisma';

class BulkTaskChangesDto {
  @IsOptional()
  @IsEnum(TaskPriorityValue)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatusValue)
  status?: TaskStatus;
}

export class BulkUpdateTasksDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  taskIds!: number[];

  @ValidateNested()
  @Type(() => BulkTaskChangesDto)
  changes!: BulkTaskChangesDto;
}
