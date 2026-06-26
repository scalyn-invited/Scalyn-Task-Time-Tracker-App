import { Injectable } from '@nestjs/common';
import type { ReportExportPayload } from './reports.types';
import { ReportCsvService } from './report-csv.service';
import { ReportPdfService } from './report-pdf.service';

export type ReportExportKind =
  | 'detailed'
  | 'client-summary'
  | 'selected-client'
  | 'task-summary'
  | 'team-summary';

export type ReportExportFormat = 'csv' | 'pdf';

export interface ReportExportResult {
  filename: string;
  contentType: string;
  buffer: Buffer;
}

@Injectable()
export class ReportExportService {
  constructor(
    private readonly csvService: ReportCsvService,
    private readonly pdfService: ReportPdfService,
  ) {}

  async export(
    kind: ReportExportKind,
    format: ReportExportFormat,
    payload: ReportExportPayload,
    filename: string,
  ): Promise<ReportExportResult> {
    const buffer = await this.buildBuffer(kind, format, payload);

    return {
      filename,
      contentType: format === 'csv' ? 'text/csv; charset=utf-8' : 'application/pdf',
      buffer,
    };
  }

  private buildBuffer(
    kind: ReportExportKind,
    format: ReportExportFormat,
    payload: ReportExportPayload,
  ): Promise<Buffer> {
    if (format === 'csv') {
      switch (kind) {
        case 'detailed':
          return this.csvService.buildDetailedCsv(payload);
        case 'client-summary':
          return this.csvService.buildClientSummaryCsv(payload);
        case 'selected-client':
          return this.csvService.buildSelectedClientCsv(payload);
        case 'task-summary':
          return this.csvService.buildTaskSummaryCsv(payload);
        case 'team-summary':
          return this.csvService.buildTeamSummaryCsv(payload);
        default:
          return this.csvService.buildDetailedCsv(payload);
      }
    }

    switch (kind) {
      case 'detailed':
        return this.pdfService.buildDetailedPdf(payload);
      case 'client-summary':
        return this.pdfService.buildClientSummaryPdf(payload);
      case 'selected-client':
        return this.pdfService.buildSelectedClientPdf(payload);
      case 'task-summary':
        return this.pdfService.buildTaskSummaryPdf(payload);
      case 'team-summary':
        return this.pdfService.buildTeamSummaryPdf(payload);
      default:
        return this.pdfService.buildDetailedPdf(payload);
    }
  }
}
