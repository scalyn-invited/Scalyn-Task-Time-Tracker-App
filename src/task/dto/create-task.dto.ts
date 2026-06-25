import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TaskPriority as TaskPriorityValue, TaskStatus as TaskStatusValue } from '../../prisma/prisma-client';
import type { TaskPriority, TaskStatus } from '../../generated/prisma';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  @MaxLength(191)
  title!: string;

  @IsOptional()
  @IsString()
  descriptionHtml?: string;

  @IsOptional()
  @IsEnum(TaskPriorityValue)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatusValue)
  status?: TaskStatus;

  @IsInt()
  @Min(1)
  clientId!: number;

  @IsInt()
  @Min(1)
  userId!: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  labels?: string[];
}
