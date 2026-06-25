export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'TO_REVIEW' | 'COMPLETED' | 'ON_HOLD';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type UserRole = 'ADMIN' | 'MANAGER' | 'MEMBER';
export type TaskDetailTab = 'details' | 'comments' | 'activity';

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: number;
  name: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskLabel {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskRecord {
  id: number;
  title: string;
  descriptionHtml: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  clientId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  client: Client;
  user: SafeUser;
  labels: TaskLabel[];
}

export interface TaskAttachment {
  id: number;
  taskId: number;
  uploadedBy: number;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  filePath: string;
  createdAt: string;
  uploader?: SafeUser;
}

export interface TaskComment {
  id: number;
  taskId: number;
  userId: number;
  parentId: number | null;
  content: string;
  editedAt: string | null;
  createdAt: string;
  user: SafeUser;
  replies?: TaskComment[];
}

export interface TaskActivity {
  id: number;
  taskId: number;
  userId: number;
  action: string;
  entityType: string;
  entityId: number | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  user: SafeUser;
  task: Pick<TaskRecord, 'id' | 'title'>;
}

export interface TaskFormValues {
  title: string;
  clientId: number;
  userId: number;
  priority: TaskPriority;
  status: TaskStatus;
  labels: string[];
  descriptionHtml: string;
}

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
  status: 'running' | 'paused' | 'completed';
  description: string | null;
  isManual: boolean;
  createdAt: string;
  updatedAt: string;
  elapsedSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  task: Pick<TaskRecord, 'id' | 'title' | 'clientId' | 'client'>;
  client: Client;
}

export interface StartTimerPayload {
  clientId: number;
  taskId: number;
  description?: string;
}

export interface ManualEntryPayload {
  clientId: number;
  taskId: number;
  durationMinutes: number;
  description?: string;
}
