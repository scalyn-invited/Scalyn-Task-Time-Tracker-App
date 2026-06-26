import type { Client, Task, TimeEntry, User } from '../generated/prisma';

export type TimesheetView = 'daily' | 'weekly' | 'monthly';

export type TimesheetEntryWithRelations = TimeEntry & {
  task: Pick<Task, 'id' | 'title'>;
  client: Pick<Client, 'id' | 'name'>;
  user: Pick<User, 'id' | 'name' | 'email'>;
};

export interface TimesheetEntryResponse {
  id: number;
  userId: number;
  taskId: number;
  clientId: number;
  startTime: Date;
  endTime: Date | null;
  durationSeconds: number;
  totalPausedSeconds: number;
  pausedAt: Date | null;
  status: 'COMPLETED';
  description: string | null;
  isManual: boolean;
  createdAt: Date;
  updatedAt: Date;
  task: Pick<Task, 'id' | 'title'>;
  client: Pick<Client, 'id' | 'name'>;
  user: Pick<User, 'id' | 'name' | 'email'>;
}

export interface TimesheetDateGroupResponse {
  date: string;
  label: string;
  totalDurationSeconds: number;
  entryCount: number;
  entries: TimesheetEntryResponse[];
}

export interface TimesheetResponse {
  view: TimesheetView;
  range: {
    from: string;
    to: string;
    label: string;
  };
  totals: {
    durationSeconds: number;
    entryCount: number;
  };
  groups: TimesheetDateGroupResponse[];
}
