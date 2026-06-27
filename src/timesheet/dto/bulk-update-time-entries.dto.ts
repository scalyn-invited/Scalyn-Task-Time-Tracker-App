import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayUnique, IsArray, IsInt, IsOptional, Min, ValidateNested } from 'class-validator';

class BulkTimeEntryChangesDto {
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
}

export class BulkUpdateTimeEntriesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  timeEntryIds!: number[];

  @ValidateNested()
  @Type(() => BulkTimeEntryChangesDto)
  changes!: BulkTimeEntryChangesDto;
}
