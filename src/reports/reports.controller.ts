import { Controller, Get, Header, Param, ParseIntPipe, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { ReportQueryDto } from './dto/report-query.dto';
import { ReportExportKind, ReportExportService } from './report-export.service';
import { ReportsService } from './reports.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly reportExportService: ReportExportService,
  ) {}

  @Get('data')
  @Header('Cache-Control', 'no-store')
  async getData(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
  ) {
    return this.reportsService.getDashboardData(req.user, query);
  }

  @Get('data/table')
  @Header('Cache-Control', 'no-store')
  async getTable(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
  ) {
    return this.reportsService.getTableData(req.user, query);
  }

  @Get('export/detailed/csv')
  @Header('Cache-Control', 'no-store')
  async exportDetailedCsv(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'detailed', 'csv', req.user, query);
  }

  @Get('export/detailed/pdf')
  @Header('Cache-Control', 'no-store')
  async exportDetailedPdf(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'detailed', 'pdf', req.user, query);
  }

  @Get('export/client-summary/csv')
  @Header('Cache-Control', 'no-store')
  async exportClientSummaryCsv(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'client-summary', 'csv', req.user, query);
  }

  @Get('export/client-summary/pdf')
  @Header('Cache-Control', 'no-store')
  async exportClientSummaryPdf(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'client-summary', 'pdf', req.user, query);
  }

  @Get('export/client/:clientId/csv')
  @Header('Cache-Control', 'no-store')
  async exportClientCsv(
    @Req() req: AuthenticatedRequest,
    @Param('clientId', ParseIntPipe) clientId: number,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'selected-client', 'csv', req.user, query, clientId);
  }

  @Get('export/client/:clientId/pdf')
  @Header('Cache-Control', 'no-store')
  async exportClientPdf(
    @Req() req: AuthenticatedRequest,
    @Param('clientId', ParseIntPipe) clientId: number,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'selected-client', 'pdf', req.user, query, clientId);
  }

  @Get('export/task-summary/csv')
  @Header('Cache-Control', 'no-store')
  async exportTaskCsv(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'task-summary', 'csv', req.user, query);
  }

  @Get('export/task-summary/pdf')
  @Header('Cache-Control', 'no-store')
  async exportTaskPdf(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'task-summary', 'pdf', req.user, query);
  }

  @Get('export/team-summary/csv')
  @Header('Cache-Control', 'no-store')
  async exportTeamCsv(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'team-summary', 'csv', req.user, query);
  }

  @Get('export/team-summary/pdf')
  @Header('Cache-Control', 'no-store')
  async exportTeamPdf(
    @Req() req: AuthenticatedRequest,
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.sendExport(res, 'team-summary', 'pdf', req.user, query);
  }

  private async sendExport(
    res: Response,
    kind: ReportExportKind,
    format: 'csv' | 'pdf',
    user: SafeUser,
    query: ReportQueryDto,
    selectedClientId?: number,
  ): Promise<void> {
    const payload = await this.reportsService.buildExportPayload(user, query, selectedClientId);
    const filename = this.buildFilename(
      kind,
      format,
      selectedClientId,
      payload.filters.clientId,
      selectedClientId !== undefined ? payload.rows[0]?.client : undefined,
    );
    const result = await this.reportExportService.export(kind, format, payload, filename);

    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.buffer);
  }

  private buildFilename(
    kind: ReportExportKind,
    format: 'csv' | 'pdf',
    selectedClientId: number | undefined,
    clientFilterId?: number,
    clientName?: string,
  ): string {
    const today = new Date().toISOString().slice(0, 10);

    if (kind === 'selected-client') {
      const clientPart = this.slugify(clientName) ?? `client-${selectedClientId ?? clientFilterId ?? 'report'}`;
      return `${clientPart}-${today}.${format}`;
    }

    if (kind === 'client-summary') {
      return `client-summary-${today}.${format}`;
    }

    if (kind === 'task-summary') {
      return `task-summary-${today}.${format}`;
    }

    if (kind === 'team-summary') {
      return `team-summary-${today}.${format}`;
    }

    return `time-report-${today}.${format}`;
  }

  private slugify(value?: string): string | null {
    if (!value) {
      return null;
    }

    const slug = value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return slug.length > 0 ? slug : null;
  }
}
