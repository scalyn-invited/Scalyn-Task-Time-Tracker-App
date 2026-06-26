import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { SystemRoles } from '../auth/decorators/system-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SystemRolesGuard } from '../auth/guards/system-roles.guard';
import { SafeUser } from '../auth/types/auth.types';
import { AddTeamMemberDto } from './dto/add-team-member.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamService } from './team.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard, SystemRolesGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @SystemRoles('admin', 'manager')
  async listTeams(@Req() req: AuthenticatedRequest) {
    return this.teamService.listTeams(req.user);
  }

  @Get(':id')
  @SystemRoles('admin', 'manager')
  async getTeam(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.teamService.getTeam(req.user, id);
  }

  @Post()
  @SystemRoles('admin')
  async createTeam(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateTeamDto,
  ) {
    return this.teamService.createTeam(req.user, dto);
  }

  @Put(':id')
  @SystemRoles('admin')
  async updateTeam(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(req.user, id, dto);
  }

  @Delete(':id')
  @SystemRoles('admin')
  async deleteTeam(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.teamService.deleteTeam(req.user, id);
  }

  @Get(':id/members')
  @SystemRoles('admin', 'manager')
  async listMembers(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.teamService.listMembers(req.user, id);
  }

  @Post(':id/members')
  @SystemRoles('admin', 'manager')
  async addMember(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddTeamMemberDto,
  ) {
    return this.teamService.addMember(req.user, id, dto);
  }

  @Put(':id/members/:memberId')
  @SystemRoles('admin', 'manager')
  async updateMember(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() dto: UpdateTeamMemberDto,
  ) {
    return this.teamService.updateMember(req.user, id, memberId, dto);
  }

  @Delete(':id/members/:memberId')
  @SystemRoles('admin', 'manager')
  async removeMember(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    await this.teamService.removeMember(req.user, id, memberId);
  }
}
