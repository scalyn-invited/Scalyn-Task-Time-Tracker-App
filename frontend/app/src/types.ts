export type SystemRole = 'admin' | 'manager' | 'member';

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  systemRole: SystemRole;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: SafeUser;
}

export interface ClientRecord {
  id: number;
  name: string;
  description: string | null;
  monthlyAllowanceMinutes: number;
  billable: boolean;
  archivedAt: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskLabel {
  id: number;
  name: string;
}

export interface TimesheetEntry {
  id: number;
  userId: number;
  taskId: number;
  clientId: number;
  startTime: string;
  endTime: string | null;
  durationSeconds: number;
  totalPausedSeconds: number;
  pausedAt: string | null;
  status: 'COMPLETED';
  description: string | null;
  isManual: boolean;
  createdAt: string;
  updatedAt: string;
  task: { id: number; title: string };
  client: { id: number; name: string };
  user: { id: number; name: string; email: string };
}

export interface TimesheetGroup {
  date: string;
  label: string;
  totalDurationSeconds: number;
  entryCount: number;
  entries: TimesheetEntry[];
}

export interface TimesheetResponse {
  view: 'daily' | 'weekly' | 'monthly';
  range: {
    from: string;
    to: string;
    label: string;
  };
  totals: {
    durationSeconds: number;
    entryCount: number;
  };
  groups: TimesheetGroup[];
}
