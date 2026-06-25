import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma as PrismaValue } from '../prisma/prisma-client';
import type { Client, Prisma as PrismaTypes, Task } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { ManualEntryDto } from './dto/manual-entry.dto';
import { StartTimerDto } from './dto/start-timer.dto';
import { StopTimerDto } from './dto/stop-timer.dto';
import { TimeEntryResponse, TimeEntryWithRelations } from './time-tracking.types';

type TimeEntryInclude = {
  task: {
    include: {
      client: true;
    };
  };
  client: true;
};

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
        endTime: null,
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
        const { client, task } = await this.findOwnedTaskAndClientOrFail(
          tx,
          userId,
          dto.clientId,
          dto.taskId,
        );

        await this.closeActiveTimers(tx, userId, startedAt);

        const entry = await tx.timeEntry.create({
          data: {
            userId,
            taskId: task.id,
            clientId: client.id,
            startTime: startedAt,
            endTime: null,
            durationSeconds: 0,
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

  async stopTimer(userId: number, dto: StopTimerDto): Promise<TimeEntryResponse> {
    const stoppedAt = new Date();
    const description = this.normalizeDescription(dto.description);

    return this.prisma.$transaction(
      async (tx) => {
        const activeEntries = await tx.timeEntry.findMany({
          where: {
            userId,
            endTime: null,
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

        if (activeEntries.length === 0) {
          throw new NotFoundException('No active timer found');
        }

        for (const activeEntry of activeEntries) {
          await this.closeEntry(tx, activeEntry, stoppedAt, description);
        }

        const stoppedEntry = activeEntries[0];
        const completed = await tx.timeEntry.findUnique({
          where: { id: stoppedEntry.id },
          include: this.timeEntryInclude,
        });

        if (!completed) {
          throw new NotFoundException('Active timer not found');
        }

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

  private async closeActiveTimers(
    tx: PrismaTypes.TransactionClient,
    userId: number,
    endedAt: Date,
  ): Promise<void> {
    const activeEntries = await tx.timeEntry.findMany({
      where: {
        userId,
        endTime: null,
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

    for (const activeEntry of activeEntries) {
      await this.closeEntry(tx, activeEntry, endedAt);
    }
  }

  private async closeEntry(
    tx: PrismaTypes.TransactionClient,
    entry: { id: number; startTime: Date },
    endedAt: Date,
    description?: string | null,
  ): Promise<void> {
    const durationSeconds = this.calculateDurationSeconds(entry.startTime, endedAt);

    await tx.timeEntry.update({
      where: {
        id: entry.id,
      },
      data: {
        endTime: endedAt,
        durationSeconds,
        ...(description !== undefined ? { description } : {}),
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
    const isRunning = entry.endTime === null;

    return {
      ...entry,
      elapsedSeconds: isRunning
        ? this.calculateDurationSeconds(entry.startTime, now)
        : entry.durationSeconds,
      isRunning,
    };
  }
}
