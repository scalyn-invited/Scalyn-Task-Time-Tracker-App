import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReportCsvService } from './report-csv.service';
import { ReportExportService } from './report-export.service';
import { ReportFilterService } from './report-filter.service';
import { ReportPdfService } from './report-pdf.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ReportsController],
  providers: [
    ReportFilterService,
    ReportsService,
    ReportCsvService,
    ReportPdfService,
    ReportExportService,
  ],
  exports: [ReportsService],
})
export class ReportsModule {}
