export interface Profile {
  id: number;
  name: string;
  email: string;
}

export interface ClientOption {
  id: number;
  name: string;
  description: string | null;
  archivedAt: string | null;
}

export interface TaskOption {
  id: number;
  title: string;
  clientId: number;
  client: ClientOption;
}

export interface TimeEntryClient {
  id: number;
  name: string;
  description: string | null;
  archivedAt: string | null;
}

export interface TimeEntryTask {
  id: number;
  title: string;
  clientId: number;
  client: TimeEntryClient;
}

export type TimerStatus = 'running' | 'paused' | 'completed';

export interface TimeEntry {
  id: number;
  userId: number;
  taskId: number;
  clientId: number;
  startTime: string;
  endTime: string | null;
  durationSeconds: number;
  totalPausedSeconds: number;
  pausedAt: string | null;
  status: TimerStatus;
  description: string | null;
  isManual: boolean;
  createdAt: string;
  updatedAt: string;
  elapsedSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  task: TimeEntryTask;
  client: TimeEntryClient;
}

export interface StartTimerPayload {
  clientId: number;
  taskId: number;
  description?: string;
}

export interface StopTimerPayload {
  description?: string;
}

export interface ManualEntryPayload {
  clientId: number;
  taskId: number;
  durationMinutes: number;
  description?: string;
}
