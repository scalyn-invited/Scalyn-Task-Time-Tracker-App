import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  @MaxLength(255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  email!: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
  temporaryPassword!: string;

  @IsString()
  confirmPassword!: string;

  @IsString()
  @Matches(/^(admin|manager|member)$/)
  systemRole!: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  assignToTeam?: boolean;

  @ValidateIf((dto: CreateUserDto) => dto.assignToTeam === true)
  @IsInt()
  @Min(1)
  teamId?: number;

  @ValidateIf((dto: CreateUserDto) => dto.assignToTeam === true)
  @IsString()
  @Matches(/^(manager|member)$/)
  teamRole?: string;
}
