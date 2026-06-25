import type { Client, Task, TimeEntry } from '../generated/prisma';

export type TimeEntryWithRelations = TimeEntry & {
  task: Task & {
    client: Client;
  };
  client: Client;
};

export type TimerStatus = 'running' | 'paused' | 'completed';

export interface TimeEntryResponse {
  id: number;
  userId: number;
  taskId: number;
  clientId: number;
  startTime: Date;
  endTime: Date | null;
  durationSeconds: number;
  totalPausedSeconds: number;
  pausedAt: Date | null;
  status: TimerStatus;
  description: string | null;
  isManual: boolean;
  createdAt: Date;
  updatedAt: Date;
  elapsedSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  task: Task & {
    client: Client;
  };
  client: Client;
}
