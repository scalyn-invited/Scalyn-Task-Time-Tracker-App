import type { Client, Task, TimeEntry } from '../generated/prisma';

export type TimeEntryWithRelations = TimeEntry & {
  task: Task & {
    client: Client;
  };
  client: Client;
};

export interface TimeEntryResponse {
  id: number;
  userId: number;
  taskId: number;
  clientId: number;
  startTime: Date;
  endTime: Date | null;
  durationSeconds: number;
  description: string | null;
  isManual: boolean;
  createdAt: Date;
  updatedAt: Date;
  elapsedSeconds: number;
  isRunning: boolean;
  task: Task & {
    client: Client;
  };
  client: Client;
}
