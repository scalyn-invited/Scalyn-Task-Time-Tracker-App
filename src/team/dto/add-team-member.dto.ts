import { IsInt, IsString, Matches, Min } from 'class-validator';

export class AddTeamMemberDto {
  @IsInt()
  @Min(1)
  userId!: number;

  @IsString()
  @Matches(/^(manager|member)$/)
  role!: string;
}
