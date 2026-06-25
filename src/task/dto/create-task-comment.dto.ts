import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateTaskCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50000)
  content!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parentId?: number;
}
