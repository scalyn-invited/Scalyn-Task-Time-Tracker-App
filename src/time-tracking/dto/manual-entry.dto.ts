import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ManualEntryDto {
  @IsInt()
  @Min(1)
  clientId!: number;

  @IsInt()
  @Min(1)
  taskId!: number;

  @IsInt()
  @Min(1)
  durationMinutes!: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
