import { IsOptional, IsString, MaxLength } from 'class-validator';

export class StopTimerDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
