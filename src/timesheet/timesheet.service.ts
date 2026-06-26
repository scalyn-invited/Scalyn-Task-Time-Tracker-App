import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma as PrismaTypes } from '../generated/prisma';
import { TimeEntryStatus } from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { SafeUser } from '../auth/types/auth.types';
import { TimesheetQueryDto } from './dto/timesheet-query.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import {
  TimesheetDateGroupResponse,
  TimesheetEntryResponse,
  TimesheetEntryWithRelations,
  TimesheetResponse,
  TimesheetView,
} from './timesheet.types';

@Injectable()
export class TimesheetService {
  private readonly timeEntrySelect: PrismaTypes.TimeEntrySelect = {
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
    task: {
      select: {
        id: true,
        title: true,
      },
    },
    client: {
      select: {
        id: true,
        name: true,
      },
    },
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  async list(user: SafeUser, query: TimesheetQueryDto): Promise<TimesheetResponse> {
    const view = query.view ?? 'weekly';
    const range = this.resolveRange(view, query.from, query.to);
    const where = this.buildWhereClause(user.id, query, range.from, range.to);

    const [aggregation, entries] = await Promise.all([
      this.prisma.timeEntry.aggregate({
        where,
        _sum: {
          durationSeconds: true,
        },
        _count: {
          id: true,
        },
      }),
      this.prisma.timeEntry.findMany({
        where,
        select: this.timeEntrySelect,
        orderBy: [
          {
            startTime: 'desc',
          },
          {
            id: 'desc',
          },
        ],
      }),
    ]);

    const normalizedEntries = entries.map((entry) => this.toEntryResponse(entry));
    const groups = this.groupEntriesByDate(normalizedEntries);

    return {
      view,
      range: {
        from: range.from.toISOString(),
        to: range.to.toISOString(),
        label: this.describeRange(range.from, range.to),
      },
      totals: {
        durationSeconds: aggregation._sum.durationSeconds ?? 0,
        entryCount: aggregation._count.id,
      },
      groups,
    };
  }

  async update(
    user: SafeUser,
    id: number,
    dto: UpdateTimeEntryDto,
  ): Promise<TimesheetEntryResponse> {
    const current = await this.findOwnedEntryOrFail(user.id, id);
    const nextClientId = dto.clientId ?? current.clientId;
    const nextTaskId = dto.taskId ?? current.taskId;

    await this.findOwnedTaskAndClientOrFail(user.id, nextClientId, nextTaskId);

    const startTime = dto.startTime !== undefined ? this.parseDateTime(dto.startTime, 'startTime') : current.startTime;
    const endTime = dto.endTime !== undefined ? this.parseDateTime(dto.endTime, 'endTime') : current.endTime;

    if (endTime && endTime.getTime() < startTime.getTime()) {
      throw new BadRequestException('endTime must be later than startTime');
    }

    const data: PrismaTypes.TimeEntryUpdateInput = {
      client: {
        connect: {
          id: nextClientId,
        },
      },
      task: {
        connect: {
          id: nextTaskId,
        },
      },
      startTime,
      endTime,
      durationSeconds: this.calculateDurationSeconds(startTime, endTime ?? startTime, current.totalPausedSeconds),
    };

    if (dto.description !== undefined) {
      data.description = this.normalizeDescription(dto.description);
    }

    const updated = await this.prisma.timeEntry.update({
      where: {
        id: current.id,
      },
      data,
      select: this.timeEntrySelect,
    });

    return this.toEntryResponse(updated);
  }

  async remove(user: SafeUser, id: number): Promise<TimesheetEntryResponse> {
    const entry = await this.findOwnedEntryOrFail(user.id, id);

    const deleted = await this.prisma.timeEntry.delete({
      where: {
        id: entry.id,
      },
      select: this.timeEntrySelect,
    });

    return this.toEntryResponse(deleted);
  }

  private buildWhereClause(
    userId: number,
    query: TimesheetQueryDto,
    from: Date,
    to: Date,
  ): PrismaTypes.TimeEntryWhereInput {
    const where: PrismaTypes.TimeEntryWhereInput = {
      status: TimeEntryStatus.COMPLETED,
      client: {
        userId,
      },
      startTime: {
        gte: from,
        lte: to,
      },
    };

    if (query.userId !== undefined) {
      where.userId = query.userId;
    }

    if (query.clientId !== undefined) {
      where.clientId = query.clientId;
    }

    if (query.taskId !== undefined) {
      where.taskId = query.taskId;
    }

    return where;
  }

  private groupEntriesByDate(entries: TimesheetEntryResponse[]): TimesheetDateGroupResponse[] {
    const groups = new Map<string, TimesheetDateGroupResponse>();

    for (const entry of entries) {
      const dateKey = this.getDateKey(entry.startTime);
      const existing = groups.get(dateKey);
      const duration = entry.durationSeconds;

      if (existing) {
        existing.totalDurationSeconds += duration;
        existing.entryCount += 1;
        existing.entries.push(entry);
        continue;
      }

      groups.set(dateKey, {
        date: dateKey,
        label: this.formatDateLabel(entry.startTime),
        totalDurationSeconds: duration,
        entryCount: 1,
        entries: [entry],
      });
    }

    return [...groups.values()].sort((left, right) => right.date.localeCompare(left.date));
  }

  private toEntryResponse(entry: TimesheetEntryWithRelations): TimesheetEntryResponse {
    return {
      ...entry,
      status: 'COMPLETED',
      task: entry.task,
      client: entry.client,
      user: entry.user,
    };
  }

  private async findOwnedEntryOrFail(userId: number, id: number): Promise<TimesheetEntryWithRelations> {
    const entry = await this.prisma.timeEntry.findFirst({
      where: {
        id,
        status: TimeEntryStatus.COMPLETED,
        client: {
          userId,
        },
      },
      select: this.timeEntrySelect,
    });

    if (!entry) {
      throw new NotFoundException('Time entry not found');
    }

    return entry;
  }

  private async findOwnedTaskAndClientOrFail(
    userId: number,
    clientId: number,
    taskId: number,
  ): Promise<void> {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        clientId,
        client: {
          userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found for the selected client');
    }
  }

  private resolveRange(view: TimesheetView, from?: string, to?: string): { from: Date; to: Date } {
    if (from || to) {
      const start = from ? this.parseDateOnly(from, false) : this.getDefaultRange(view).from;
      const end = to ? this.parseDateOnly(to, true) : this.getDefaultRange(view).to;

      if (end.getTime() < start.getTime()) {
        throw new BadRequestException('to must be later than or equal to from');
      }

      return { from: start, to: end };
    }

    return this.getDefaultRange(view);
  }

  private getDefaultRange(view: TimesheetView): { from: Date; to: Date } {
    const now = new Date();

    if (view === 'daily') {
      return {
        from: this.startOfDay(now),
        to: this.endOfDay(now),
      };
    }

    if (view === 'monthly') {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        from: this.startOfDay(from),
        to: this.endOfDay(to),
      };
    }

    const start = this.startOfWeek(now);
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
    return {
      from: this.startOfDay(start),
      to: this.endOfDay(end),
    };
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  private endOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }

  private startOfWeek(date: Date): Date {
    const current = this.startOfDay(date);
    const offset = (current.getDay() + 6) % 7;
    current.setDate(current.getDate() - offset);
    return current;
  }

  private parseDateOnly(value: string, endOfDay: boolean): Date {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new BadRequestException('Date filters must be in YYYY-MM-DD format');
    }

    const [year, month, day] = value.split('-').map((segment) => Number(segment));
    const date = new Date(year, month - 1, day, endOfDay ? 23 : 0, endOfDay ? 59 : 0, endOfDay ? 59 : 0, endOfDay ? 999 : 0);

    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Date filters must be valid dates');
    }

    return date;
  }

  private parseDateTime(value: string, fieldName: string): Date {
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException(`${fieldName} must be a valid ISO date/time`);
    }

    return parsed;
  }

  private calculateDurationSeconds(startTime: Date, endTime: Date, totalPausedSeconds: number): number {
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000) - totalPausedSeconds;

    if (duration < 0) {
      throw new BadRequestException('Calculated duration cannot be negative');
    }

    return duration;
  }

  private normalizeDescription(description?: string): string | null | undefined {
    if (description === undefined) {
      return undefined;
    }

    const normalized = description.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private formatDateLabel(date: Date): string {
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  private describeRange(from: Date, to: Date): string {
    const formatter = new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `${formatter.format(from)} - ${formatter.format(to)}`;
  }

  private getDateKey(date: Date): string {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
