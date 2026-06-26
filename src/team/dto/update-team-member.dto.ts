import { IsString, Matches } from 'class-validator';

export class UpdateTeamMemberDto {
  @IsString()
  @Matches(/^(admin|manager|member)$/)
  role!: string;
}
