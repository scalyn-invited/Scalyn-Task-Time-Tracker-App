import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [TimesheetController],
  providers: [TimesheetService],
  exports: [TimesheetService],
})
export class TimesheetModule {}
