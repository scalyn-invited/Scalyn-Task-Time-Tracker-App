import type {
  Client,
  ManualEntryPayload,
  SafeUser,
  StartTimerPayload,
  TaskActivity,
  TaskAttachment,
  TaskComment,
  TaskFormValues,
  TaskLabel,
  TaskRecord,
  TimeEntry,
} from '../types';

const TOKEN_KEY = 'sttt_access_token';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function buildAuthenticatedFileUrl(path: string, options: { download?: boolean } = {}): string {
  const token = getToken();
  const url = new URL(path, window.location.origin);

  if (token) {
    url.searchParams.set('accessToken', token);
  }

  if (options.download) {
    url.searchParams.set('download', '1');
  }

  return `${url.pathname}${url.search}`;
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const message = (payload as { message?: unknown }).message;

  if (typeof message === 'string') {
    return message;
  }

  if (Array.isArray(message) && typeof message[0] === 'string') {
    return message[0];
  }

  return fallback;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch (_error) {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }

    throw new ApiError(getErrorMessage(payload, 'Request failed'), response.status);
  }

  return payload as T;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  return parseResponse<T>(response);
}

export async function uploadTaskAttachments(taskId: number, files: File[]): Promise<TaskAttachment[]> {
  const body = new FormData();
  files.forEach((file) => body.append('files', file));

  return request<TaskAttachment[]>(`/api/tasks/${taskId}/attachments`, {
    method: 'POST',
    body,
  });
}

export function fetchCurrentUser(): Promise<SafeUser> {
  return request<SafeUser>('/users/me');
}

export function fetchUsers(): Promise<SafeUser[]> {
  return request<SafeUser[]>('/users');
}

export function fetchClients(): Promise<Client[]> {
  return request<Client[]>('/api/clients');
}

export function fetchLabels(): Promise<TaskLabel[]> {
  return request<TaskLabel[]>('/api/task-labels');
}

export function fetchTasks(filters: { clientId?: number; userId?: number } = {}): Promise<TaskRecord[]> {
  const search = new URLSearchParams();
  if (filters.clientId) {
    search.set('clientId', String(filters.clientId));
  }
  if (filters.userId) {
    search.set('userId', String(filters.userId));
  }

  const suffix = search.toString() ? `?${search.toString()}` : '';
  return request<TaskRecord[]>(`/api/tasks${suffix}`);
}

export function fetchTask(taskId: number): Promise<TaskRecord> {
  return request<TaskRecord>(`/api/tasks/${taskId}`);
}

export function createTask(values: TaskFormValues): Promise<TaskRecord> {
  return request<TaskRecord>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateTask(taskId: number, values: Partial<TaskFormValues>): Promise<TaskRecord> {
  return request<TaskRecord>(`/api/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function deleteTask(taskId: number): Promise<TaskRecord> {
  return request<TaskRecord>(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  });
}

export function fetchTaskAttachments(taskId: number): Promise<TaskAttachment[]> {
  return request<TaskAttachment[]>(`/api/tasks/${taskId}/attachments`);
}

export function deleteTaskAttachment(taskId: number, attachmentId: number): Promise<TaskAttachment> {
  return request<TaskAttachment>(`/api/tasks/${taskId}/attachments/${attachmentId}`, {
    method: 'DELETE',
  });
}

export function fetchTaskComments(taskId: number): Promise<TaskComment[]> {
  return request<TaskComment[]>(`/api/tasks/${taskId}/comments`);
}

export function createTaskComment(taskId: number, values: { content: string; parentId?: number | null }): Promise<TaskComment> {
  return request<TaskComment>(`/api/tasks/${taskId}/comments`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateTaskComment(commentId: number, values: { content: string }): Promise<TaskComment> {
  return request<TaskComment>(`/api/comments/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function deleteTaskComment(commentId: number): Promise<TaskComment> {
  return request<TaskComment>(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function fetchTaskActivity(taskId: number): Promise<TaskActivity[]> {
  return request<TaskActivity[]>(`/api/tasks/${taskId}/activity`);
}

export function fetchActiveTimer(): Promise<TimeEntry | null> {
  return request<TimeEntry | null>('/timer/active');
}

export function startTimer(values: StartTimerPayload): Promise<TimeEntry> {
  return request<TimeEntry>('/timer/start', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function createManualTimeEntry(values: ManualEntryPayload): Promise<TimeEntry> {
  return request<TimeEntry>('/timer/manual', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
