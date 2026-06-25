import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { Client, Prisma as PrismaTypes, Task, TimeEntryStatus as TimeEntryStatusType, TaskActivityAction } from '../generated/prisma';
import { TimeEntryStatus, Prisma as PrismaValue } from '../prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { ManualEntryDto } from './dto/manual-entry.dto';
import { StartTimerDto } from './dto/start-timer.dto';
import { StopTimerDto } from './dto/stop-timer.dto';
import { TimeEntryResponse, TimeEntryWithRelations, TimerStatus } from './time-tracking.types';

type TimeEntryInclude = {
  task: {
    include: {
      client: true;
    };
  };
  client: true;
};

type ActiveTimeEntry = PrismaTypes.TimeEntryGetPayload<{
  include: TimeEntryInclude;
}>;

@Injectable()
export class TimeTrackingService {
  private readonly timeEntryInclude: TimeEntryInclude = {
    task: {
      include: {
        client: true,
      },
    },
    client: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async getActiveTimer(userId: number): Promise<TimeEntryResponse | null> {
    const activeEntry = await this.prisma.timeEntry.findFirst({
      where: {
        userId,
        status: {
          in: [TimeEntryStatus.RUNNING, TimeEntryStatus.PAUSED],
        },
      },
      include: this.timeEntryInclude,
      orderBy: [
        {
          startTime: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    });

    if (!activeEntry) {
      return null;
    }

    return this.formatResponse(activeEntry, new Date());
  }

  async startTimer(userId: number, dto: StartTimerDto): Promise<TimeEntryResponse> {
    const description = this.normalizeDescription(dto.description);
    const startedAt = new Date();

    return this.prisma.$transaction(
      async (tx) => {
        await this.assertNoActiveTimer(tx, userId);

        const { client, task } = await this.findOwnedTaskAndClientOrFail(
          tx,
          userId,
          dto.clientId,
          dto.taskId,
        );

        const entry = await tx.timeEntry.create({
          data: {
            userId,
            taskId: task.id,
            clientId: client.id,
            startTime: startedAt,
            endTime: null,
            durationSeconds: 0,
            totalPausedSeconds: 0,
            pausedAt: null,
            status: TimeEntryStatus.RUNNING,
            description,
            isManual: false,
          },
          include: this.timeEntryInclude,
        });

        return this.formatResponse(entry, startedAt);
      },
      {
        isolationLevel: PrismaValue.TransactionIsolationLevel.Serializable,
      },
    );
  }

  async pauseTimer(userId: number): Promise<TimeEntryResponse> {
    const pausedAt = new Date();

    return this.prisma.$transaction(
      async (tx) => {
        const activeEntry = await this.findActiveTimerOrFail(tx, userId, TimeEntryStatus.RUNNING);

        const updated = await tx.timeEntry.update({
          where: {
            id: activeEntry.id,
          },
          data: {
            pausedAt,
            status: TimeEntryStatus.PAUSED,
          },
          include: this.timeEntryInclude,
        });

        await this.recordTimerActivity(tx, updated, 'TIMER_PAUSED', {
          pausedAt: pausedAt.toISOString(),
          totalPausedSeconds: updated.totalPausedSeconds,
        });

        return this.formatResponse(updated, pausedAt);
      },
      {
        isolationLevel: PrismaValue.TransactionIsolationLevel.Serializable,
      },
    );
  }

  async resumeTimer(userId: number): Promise<TimeEntryResponse> {
    const resumedAt = new Date();

    return this.prisma.$transaction(
      async (tx) => {
        const activeEntry = await this.findActiveTimerOrFail(tx, userId, TimeEntryStatus.PAUSED);

        if (!activeEntry.pausedAt) {
          throw new BadRequestException('Paused timer is missing a pause timestamp');
        }

        const pauseDurationSeconds = this.calculateDurationSeconds(activeEntry.pausedAt, resumedAt);
        const updated = await tx.timeEntry.update({
          where: {
            id: activeEntry.id,
          },
          data: {
            pausedAt: null,
            totalPausedSeconds: activeEntry.totalPausedSeconds + pauseDurationSeconds,
            status: TimeEntryStatus.RUNNING,
          },
          include: this.timeEntryInclude,
        });

        await this.recordTimerActivity(tx, updated, 'TIMER_RESUMED', {
          resumedAt: resumedAt.toISOString(),
          pauseDurationSeconds,
          totalPausedSeconds: updated.totalPausedSeconds,
        });

        return this.formatResponse(updated, resumedAt);
      },
      {
        isolationLevel: PrismaValue.TransactionIsolationLevel.Serializable,
      },
    );
  }

  async stopTimer(userId: number, dto: StopTimerDto): Promise<TimeEntryResponse> {
    const stoppedAt = new Date();
    const description = this.normalizeDescription(dto.description);

    return this.prisma.$transaction(
      async (tx) => {
        const activeEntry = await this.findActiveTimerOrFail(tx, userId, [
          TimeEntryStatus.RUNNING,
          TimeEntryStatus.PAUSED,
        ]);

        const completed = await this.completeTimerEntry(tx, activeEntry, stoppedAt, description);

        await this.recordTimerActivity(tx, completed, 'TIMER_STOPPED', {
          stoppedAt: stoppedAt.toISOString(),
          totalPausedSeconds: completed.totalPausedSeconds,
          durationSeconds: completed.durationSeconds,
        });

        return this.formatResponse(completed, stoppedAt);
      },
      {
        isolationLevel: PrismaValue.TransactionIsolationLevel.Serializable,
      },
    );
  }

  async createManualEntry(userId: number, dto: ManualEntryDto): Promise<TimeEntryResponse> {
    const description = this.normalizeDescription(dto.description);
    const endedAt = new Date();
    const durationSeconds = this.calculateDurationSecondsFromMinutes(dto.durationMinutes);
    const startTime = new Date(endedAt.getTime() - durationSeconds * 1000);

    return this.prisma.$transaction(
      async (tx) => {
        const { client, task } = await this.findOwnedTaskAndClientOrFail(
          tx,
          userId,
          dto.clientId,
          dto.taskId,
        );

        const entry = await tx.timeEntry.create({
          data: {
            userId,
            taskId: task.id,
            clientId: client.id,
            startTime,
            endTime: endedAt,
            durationSeconds,
            totalPausedSeconds: 0,
            pausedAt: null,
            status: TimeEntryStatus.COMPLETED,
            description,
            isManual: true,
          },
          include: this.timeEntryInclude,
        });

        return this.formatResponse(entry, endedAt);
      },
      {
        isolationLevel: PrismaValue.TransactionIsolationLevel.Serializable,
      },
    );
  }

  private async assertNoActiveTimer(
    tx: PrismaTypes.TransactionClient,
    userId: number,
  ): Promise<void> {
    const activeTimer = await tx.timeEntry.findFirst({
      where: {
        userId,
        status: {
          in: [TimeEntryStatus.RUNNING, TimeEntryStatus.PAUSED],
        },
      },
      select: {
        id: true,
      },
      orderBy: [
        {
          startTime: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    });

    if (activeTimer) {
      throw new BadRequestException('An active timer already exists. Pause or stop it before starting a new one.');
    }
  }

  private async findActiveTimerOrFail(
    tx: PrismaTypes.TransactionClient,
    userId: number,
    status: TimeEntryStatusType | TimeEntryStatusType[],
  ): Promise<ActiveTimeEntry> {
    const statuses = Array.isArray(status) ? status : [status];

    const entry = await tx.timeEntry.findFirst({
      where: {
        userId,
        status: {
          in: statuses,
        },
      },
      include: this.timeEntryInclude,
      orderBy: [
        {
          startTime: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    });

    if (!entry) {
      const stateLabel = statuses.length === 1 ? this.toTimerStateLabel(statuses[0]) : 'active';
      throw new BadRequestException(`No ${stateLabel} timer found`);
    }

    return entry;
  }

  private async completeTimerEntry(
    tx: PrismaTypes.TransactionClient,
    entry: ActiveTimeEntry,
    stoppedAt: Date,
    description?: string | null,
  ): Promise<ActiveTimeEntry> {
    if (entry.status === TimeEntryStatus.PAUSED && !entry.pausedAt) {
      throw new BadRequestException('Paused timer is missing a pause timestamp');
    }

    const pauseDurationSeconds = entry.status === TimeEntryStatus.PAUSED && entry.pausedAt
      ? this.calculateDurationSeconds(entry.pausedAt, stoppedAt)
      : 0;
    const totalPausedSeconds = entry.totalPausedSeconds + pauseDurationSeconds;
    const durationSeconds = this.calculateDurationSeconds(entry.startTime, stoppedAt) - totalPausedSeconds;

    if (durationSeconds < 0) {
      throw new BadRequestException('Calculated duration cannot be negative');
    }

    return tx.timeEntry.update({
      where: {
        id: entry.id,
      },
      data: {
        endTime: stoppedAt,
        durationSeconds,
        totalPausedSeconds,
        pausedAt: null,
        status: TimeEntryStatus.COMPLETED,
        ...(description !== undefined ? { description } : {}),
      },
      include: this.timeEntryInclude,
    });
  }

  private async recordTimerActivity(
    tx: PrismaTypes.TransactionClient,
    entry: TimeEntryWithRelations,
    action: TaskActivityAction,
    metadata: Record<string, unknown>,
  ): Promise<void> {
    await tx.taskActivity.create({
      data: {
        taskId: entry.taskId,
        userId: entry.userId,
        action,
        entityType: 'time_entry',
        entityId: entry.id,
        metadata: {
          ...metadata,
          timerStatus: this.toApiTimerStatus(entry.status),
          taskTitle: entry.task.title,
          clientId: entry.clientId,
        } as PrismaTypes.InputJsonValue,
      },
    });
  }

  private async findOwnedTaskAndClientOrFail(
    tx: PrismaTypes.TransactionClient,
    userId: number,
    clientId: number,
    taskId: number,
  ): Promise<{ client: Client; task: Task }> {
    const client = await tx.client.findFirst({
      where: {
        id: clientId,
        userId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const task = await tx.task.findFirst({
      where: {
        id: taskId,
        clientId: client.id,
        client: {
          userId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found for the selected client');
    }

    return { client, task };
  }

  private parseDate(value: string, fieldName: string): Date {
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException(`${fieldName} must be a valid ISO date`);
    }

    return parsed;
  }

  private calculateDurationSecondsFromMinutes(durationMinutes: number): number {
    if (!Number.isInteger(durationMinutes) || durationMinutes < 1) {
      throw new BadRequestException('durationMinutes must be a positive whole number');
    }

    return durationMinutes * 60;
  }

  private calculateDurationSeconds(startTime: Date, endTime: Date): number {
    const duration = endTime.getTime() - startTime.getTime();

    if (duration < 0) {
      throw new BadRequestException('endTime must be later than startTime');
    }

    return Math.floor(duration / 1000);
  }

  private normalizeDescription(description?: string): string | null | undefined {
    if (description === undefined) {
      return undefined;
    }

    const normalized = description.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private formatResponse(
    entry: TimeEntryWithRelations,
    now: Date,
  ): TimeEntryResponse {
    const status = this.toApiTimerStatus(entry.status);
    const elapsedSeconds = this.calculateElapsedSeconds(entry, now);

    return {
      ...entry,
      status,
      elapsedSeconds,
      isRunning: status === 'running',
      isPaused: status === 'paused',
    };
  }

  private calculateElapsedSeconds(entry: TimeEntryWithRelations, now: Date): number {
    const endReference =
      entry.status === TimeEntryStatus.PAUSED
        ? entry.pausedAt ?? now
        : entry.endTime ?? now;
    const duration = this.calculateDurationSeconds(entry.startTime, endReference) - entry.totalPausedSeconds;

    return Math.max(0, duration);
  }

  private toApiTimerStatus(status: TimeEntryStatusType): TimerStatus {
    switch (status) {
      case TimeEntryStatus.RUNNING:
        return 'running';
      case TimeEntryStatus.PAUSED:
        return 'paused';
      case TimeEntryStatus.COMPLETED:
        return 'completed';
      default:
        return 'completed';
    }
  }

  private toTimerStateLabel(status: TimeEntryStatusType): string {
    switch (status) {
      case TimeEntryStatus.RUNNING:
        return 'running';
      case TimeEntryStatus.PAUSED:
        return 'paused';
      case TimeEntryStatus.COMPLETED:
        return 'completed';
      default:
        return 'active';
    }
  }
}
