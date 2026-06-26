import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { UserManagementService } from './user-management.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UserController],
  providers: [UserManagementService],
  exports: [UserManagementService],
})
export class UserModule {}
