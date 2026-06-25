import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get()
  async listUsers(): Promise<SafeUser[]> {
    // TODO: Restrict this route to admins once role-based access control is added.
    return this.userService.listUsers();
  }
}
