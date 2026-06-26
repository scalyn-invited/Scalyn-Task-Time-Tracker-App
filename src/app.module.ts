import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';
import { validateEnv } from './config/env.validation';
import { UserModule } from './user/user.module';
import { WebModule } from './web/web.module';
import { TaskModule } from './task/task.module';
import { TimeTrackingModule } from './time-tracking/time-tracking.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ReportsModule } from './reports/reports.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      validate: validateEnv,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ClientModule,
    TaskModule,
    TimeTrackingModule,
    TimesheetModule,
    ReportsModule,
    TeamModule,
    WebModule,
  ],
})
export class AppModule {}
