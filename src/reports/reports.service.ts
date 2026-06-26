import { Injectable, BadRequestException } from '@nestjs/common';
import type { Prisma as PrismaTypes } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { SafeUser } from '../auth/types/auth.types';
import { ReportQueryDto } from './dto/report-query.dto';
import {
  ReportChartData,
  ReportDataResponse,
  ReportEntryWithRelations,
  ReportFilters,
  ReportOptionData,
  ReportOptionItem,
  ReportRange,
  ReportSummary,
  ReportTableData,
  ReportTableRow,
} from './reports.types';
import { ReportFilterService } from './report-filter.service';

@Injectable()
export class ReportsService {
  private readonly reportSelect: PrismaTypes.TimeEntrySelect = {
    id: true,
    userId: true,
    taskId: true,
    clientId: true,
    startTime: true,
    endTime: true,
    durationSeconds: true,
    totalPausedSeconds: true,
    pausedAt: true,
    status: true,
    description: true,
    isManual: true,
    createdAt: true,
    updatedAt: true,
    client: {
      select: {
        id: true,
        name: true,
        billable: true,
      },
    },
    task: {
      select: {
        id: true,
        title: true,
      },
    },
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly reportFilterService: ReportFilterService,
  ) {}

  async getDashboardData(user: SafeUser, query: ReportQueryDto): Promise<ReportDataResponse> {
    const { filters, range } = this.reportFilterService.buildFilters(user, query);
    const where = this.reportFilterService.buildWhereClause(user, filters, range);
    const orderBy = this.reportFilterService.buildOrderBy(filters.sortBy, filters.sortDir);

    const [summary, charts, options, table] = await Promise.all([
      this.loadSummary(where),
      this.loadCharts(where, range),
      this.loadOptions(user, where),
      this.loadTableData(where, orderBy, filters.page, filters.pageSize, query.draw ?? 0),
    ]);

    return {
      range: this.reportFilterService.getDateSqlRange(range),
      filters,
      summary,
      charts,
      options,
      table,
    };
  }

  async getTableData(user: SafeUser, query: ReportQueryDto): Promise<ReportTableData> {
    const { filters, range } = this.reportFilterService.buildFilters(user, query);
    const where = this.reportFilterService.buildWhereClause(user, filters, range);
    const orderBy = this.reportFilterService.buildOrderBy(filters.sortBy, filters.sortDir);

    return this.loadTableData(where, orderBy, filters.page, filters.pageSize, query.draw ?? 0);
  }

  async buildExportPayload(user: SafeUser, query: ReportQueryDto, selectedClientId?: number): Promise<{
    filters: ReportFilters;
    range: ReportRange;
    summary: ReportSummary;
    rows: ReportTableRow[];
  }> {
    const { filters: parsedFilters, range } = this.reportFilterService.buildFilters(user, query);
    const filters = {
      ...parsedFilters,
      clientId: selectedClientId ?? parsedFilters.clientId,
    };
    const where = this.reportFilterService.buildWhereClause(user, filters, range);
    const [summary, rows] = await Promise.all([
      this.loadSummary(where),
      this.loadAllRows(where, filters.sortBy, filters.sortDir),
    ]);

    return {
      filters,
      range,
      summary,
      rows: rows.map((row) => this.toRow(row)),
    };
  }

  private async loadSummary(where: PrismaTypes.TimeEntryWhereInput): Promise<ReportSummary> {
    const [aggregation, clients, tasks] = await Promise.all([
      this.prisma.timeEntry.aggregate({
        where,
        _sum: {
          durationSeconds: true,
        },
        _count: {
          id: true,
        },
      }),
      this.prisma.timeEntry.groupBy({
        by: ['clientId'],
        where,
      }),
      this.prisma.timeEntry.groupBy({
        by: ['taskId'],
        where,
      }),
    ]);

    return {
      totalHours: Number(((aggregation._sum.durationSeconds ?? 0) / 3600).toFixed(2)),
      totalTimeEntries: aggregation._count.id,
      activeClients: clients.length,
      activeTasks: tasks.length,
    };
  }

  private async loadCharts(where: PrismaTypes.TimeEntryWhereInput, range: ReportRange): Promise<ReportChartData> {
    const [rows, clientGroups, taskGroups] = await Promise.all([
      this.prisma.timeEntry.findMany({
        where,
        select: {
          startTime: true,
          durationSeconds: true,
          client: {
            select: {
              name: true,
            },
          },
          task: {
            select: {
              title: true,
            },
          },
        },
      }),
      this.prisma.timeEntry.groupBy({
        by: ['clientId'],
        where,
        _sum: {
          durationSeconds: true,
        },
      }),
      this.prisma.timeEntry.groupBy({
        by: ['taskId'],
        where,
        _sum: {
          durationSeconds: true,
        },
      }),
    ]);

    const dayBuckets = new Map<string, number>();
    const weekBuckets = new Map<string, number>();

    for (const entry of rows) {
      const dayKey = this.formatDateBucket(entry.startTime);
      const weekKey = this.formatWeekBucket(entry.startTime);
      dayBuckets.set(dayKey, (dayBuckets.get(dayKey) ?? 0) + entry.durationSeconds);
      weekBuckets.set(weekKey, (weekBuckets.get(weekKey) ?? 0) + entry.durationSeconds);
    }

    const clientLabels = new Map<number, string>();
    const taskLabels = new Map<number, string>();
    const clientRecords = await this.prisma.client.findMany({
      where: {
        id: {
          in: clientGroups.map((group) => group.clientId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    const taskRecords = await this.prisma.task.findMany({
      where: {
        id: {
          in: taskGroups.map((group) => group.taskId),
        },
      },
      select: {
        id: true,
        title: true,
      },
    });

    clientRecords.forEach((client) => clientLabels.set(client.id, client.name));
    taskRecords.forEach((task) => taskLabels.set(task.id, task.title));

    const hoursPerDay = [...dayBuckets.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([label, seconds]) => ({ label, value: Number((seconds / 3600).toFixed(2)) }));
    const hoursPerWeek = [...weekBuckets.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([label, seconds]) => ({ label, value: Number((seconds / 3600).toFixed(2)) }));
    const hoursPerClient = clientGroups
      .map((group) => ({
        label: clientLabels.get(group.clientId) ?? `Client #${group.clientId}`,
        value: Number(((group._sum.durationSeconds ?? 0) / 3600).toFixed(2)),
      }))
      .sort((left, right) => right.value - left.value);
    const hoursPerTask = taskGroups
      .map((group) => ({
        label: taskLabels.get(group.taskId) ?? `Task #${group.taskId}`,
        value: Number(((group._sum.durationSeconds ?? 0) / 3600).toFixed(2)),
      }))
      .sort((left, right) => right.value - left.value);

    return {
      hoursPerDay: hoursPerDay.length > 0 ? hoursPerDay : [{ label: this.formatDateBucket(range.from), value: 0 }],
      hoursPerWeek: hoursPerWeek.length > 0 ? hoursPerWeek : [{ label: this.formatWeekBucket(range.from), value: 0 }],
      hoursPerClient,
      hoursPerTask,
    };
  }

  private async loadOptions(user: SafeUser, where: PrismaTypes.TimeEntryWhereInput): Promise<ReportOptionData> {
    const [clients, tasks, users] = await Promise.all([
      this.prisma.client.findMany({
        where: where.client?.userId !== undefined
          ? {
              userId: where.client.userId,
              archivedAt: null,
            }
          : {
              archivedAt: null,
            },
        select: {
          id: true,
          name: true,
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.task.findMany({
        where: where.client?.userId !== undefined
          ? {
              client: {
                userId: where.client.userId,
              },
            }
          : {},
        select: {
          id: true,
          title: true,
        },
        orderBy: { title: 'asc' },
      }),
      this.prisma.user.findMany({
        where: {
          ...(where.client?.userId !== undefined
            ? {
                timeEntries: {
                  some: {
                    client: {
                      userId: where.client.userId,
                    },
                  },
                },
              }
            : {}),
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: { name: 'asc' },
      }),
    ]);

    return {
      clients: clients.map((client) => ({ id: client.id, label: client.name })),
      tasks: tasks.map((task) => ({ id: task.id, label: task.title })),
      teamMembers: users.map((item) => ({ id: item.id, label: item.name })),
    };
  }

  private async loadTableData(
    where: PrismaTypes.TimeEntryWhereInput,
    orderBy: PrismaTypes.TimeEntryOrderByWithRelationInput[],
    page: number,
    pageSize: number,
    draw: number,
  ): Promise<ReportTableData> {
    const [count, rows] = await Promise.all([
      this.prisma.timeEntry.count({
        where,
      }),
      this.prisma.timeEntry.findMany({
        where,
        select: this.reportSelect,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      rows: rows.map((row) => this.toRow(row)),
      totalRows: count,
      filteredRows: count,
      page,
      pageSize,
      draw,
    };
  }

  private async loadAllRows(
    where: PrismaTypes.TimeEntryWhereInput,
    sortBy: ReportFilters['sortBy'],
    sortDir: ReportFilters['sortDir'],
  ): Promise<ReportEntryWithRelations[]> {
    return this.prisma.timeEntry.findMany({
      where,
      select: this.reportSelect,
      orderBy: this.reportFilterService.buildOrderBy(sortBy, sortDir),
    });
  }

  private toRow(entry: ReportEntryWithRelations): ReportTableRow {
    const durationSeconds = entry.durationSeconds;
    return {
      id: entry.id,
      date: this.formatDateCell(entry.startTime),
      client: entry.client.name,
      task: entry.task.title,
      teamMember: entry.user.name,
      startTime: this.formatTimeCell(entry.startTime),
      endTime: entry.endTime ? this.formatTimeCell(entry.endTime) : null,
      duration: this.formatDuration(durationSeconds),
      durationSeconds,
      description: this.normalizeDescription(entry.description),
      entryType: entry.isManual ? 'Manual' : 'Timer',
      status: entry.status,
      billable: entry.client.billable,
    };
  }

  private formatDateCell(value: Date): string {
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(value);
  }

  private formatTimeCell(value: Date): string {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(value);
  }

  private formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((value) => String(value).padStart(2, '0'))
      .join(':');
  }

  private normalizeDescription(description: string | null): string {
    if (!description) {
      return '';
    }

    return description.trim();
  }

  private formatDateBucket(value: Date): string {
    return new Intl.DateTimeFormat('en-CA').format(value);
  }

  private formatWeekBucket(value: Date): string {
    const date = new Date(value);
    const offset = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - offset);
    return new Intl.DateTimeFormat('en-CA').format(date);
  }
}
