import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SystemRoles } from '../auth/decorators/system-roles.decorator';
import { SystemRolesGuard } from '../auth/guards/system-roles.guard';
import { SafeUser } from '../auth/types/auth.types';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserManagementService } from './user-management.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserManagementService) {}

  @Get('me')
  async getCurrentUser(@Req() req: AuthenticatedRequest): Promise<SafeUser> {
    return this.userService.getCurrentUser(req.user.id);
  }

  @Patch('me')
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateUserDto,
  ): Promise<SafeUser> {
    return this.userService.updateProfile(req.user.id, dto);
  }

  @Patch('me/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ): Promise<void> {
    await this.userService.changePassword(req.user.id, dto);
  }

  @Get()
  @UseGuards(SystemRolesGuard)
  @SystemRoles('admin', 'manager')
  async listUsers(@Req() req: AuthenticatedRequest): Promise<SafeUser[]> {
    return this.userService.listUsers(req.user);
  }

  @Get(':id')
  @UseGuards(SystemRolesGuard)
  @SystemRoles('admin', 'manager')
  async getUser(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SafeUser> {
    return this.userService.getUser(req.user, id);
  }

  @Post()
  @UseGuards(SystemRolesGuard)
  @SystemRoles('admin')
  async createUser(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateUserDto,
  ): Promise<SafeUser> {
    return this.userService.createUser(req.user, dto);
  }

  @Put(':id')
  @UseGuards(SystemRolesGuard)
  @SystemRoles('admin')
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserAdminDto,
  ): Promise<SafeUser> {
    return this.userService.updateUser(req.user, id, dto);
  }

  @Put(':id/status')
  @UseGuards(SystemRolesGuard)
  @SystemRoles('admin')
  async updateStatus(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserStatusDto,
  ): Promise<SafeUser> {
    return this.userService.updateStatus(req.user, id, dto);
  }

  @Delete(':id')
  @UseGuards(SystemRolesGuard)
  @SystemRoles('admin')
  @HttpCode(HttpStatus.OK)
  async deleteUser(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SafeUser> {
    return this.userService.deleteUser(req.user, id);
  }
}
