import type {
  AuthResponse,
  ClientRecord,
  SafeUser,
  TaskLabel,
  TimesheetResponse,
} from '../types';

const TOKEN_KEY = 'sttt_access_token';

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
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
    } catch {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
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

export function login(values: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function register(values: { name: string; email: string; password: string }): Promise<SafeUser> {
  return request<SafeUser>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function fetchCurrentUser(): Promise<SafeUser> {
  return request<SafeUser>('/api/users/me');
}

export function updateProfile(values: { name?: string; email?: string }): Promise<SafeUser> {
  return request<SafeUser>('/api/users/me', {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function changePassword(values: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<void> {
  return request<void>('/api/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function fetchClients(): Promise<ClientRecord[]> {
  return request<ClientRecord[]>('/api/clients');
}

export function fetchArchivedClients(): Promise<ClientRecord[]> {
  return request<ClientRecord[]>('/api/clients/archived');
}

export function fetchClient(clientId: number): Promise<ClientRecord> {
  return request<ClientRecord>(`/api/clients/${clientId}`);
}

export function createClient(values: {
  name: string;
  description?: string;
  monthlyAllowanceMinutes: number;
  billable: boolean;
}): Promise<ClientRecord> {
  return request<ClientRecord>('/api/clients', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateClient(clientId: number, values: {
  name?: string;
  description?: string;
  monthlyAllowanceMinutes?: number;
  billable?: boolean;
}): Promise<ClientRecord> {
  return request<ClientRecord>(`/api/clients/${clientId}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function archiveClient(clientId: number): Promise<ClientRecord> {
  return request<ClientRecord>(`/api/clients/${clientId}/archive`, {
    method: 'PATCH',
  });
}

export function restoreClient(clientId: number): Promise<ClientRecord> {
  return request<ClientRecord>(`/api/clients/${clientId}/restore`, {
    method: 'PATCH',
  });
}

export function fetchUsers(): Promise<SafeUser[]> {
  return request<SafeUser[]>('/api/users');
}

export function createUser(values: {
  name: string;
  email: string;
  temporaryPassword: string;
  confirmPassword: string;
  systemRole: string;
  assignToTeam?: boolean;
  teamId?: number;
  teamRole?: string;
}): Promise<SafeUser> {
  return request<SafeUser>('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateUser(userId: number, values: { name?: string; email?: string; systemRole?: string }): Promise<SafeUser> {
  return request<SafeUser>(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function deleteUser(userId: number): Promise<SafeUser> {
  return request<SafeUser>(`/api/users/${userId}`, {
    method: 'DELETE',
  });
}

export function fetchTeams(): Promise<Array<{ id: number; name: string }>> {
  return request<Array<{ id: number; name: string }>>('/teams');
}

export function fetchTasks(filters: { clientId?: number; userId?: number } = {}) {
  const search = new URLSearchParams();
  if (filters.clientId) search.set('clientId', String(filters.clientId));
  if (filters.userId) search.set('userId', String(filters.userId));
  const suffix = search.toString() ? `?${search.toString()}` : '';
  return request(`/api/tasks${suffix}`);
}

export function fetchTaskLabels(): Promise<TaskLabel[]> {
  return request<TaskLabel[]>('/api/task-labels');
}

export function createTaskLabel(name: string): Promise<TaskLabel> {
  return request<TaskLabel>('/api/task-labels', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function deleteTaskLabel(labelId: number): Promise<TaskLabel> {
  return request<TaskLabel>(`/api/task-labels/${labelId}`, {
    method: 'DELETE',
  });
}

export function fetchTimesheets(filters: {
  view: 'daily' | 'weekly' | 'monthly';
  userId?: number;
  clientId?: number;
  taskId?: number;
  from?: string;
  to?: string;
}): Promise<TimesheetResponse> {
  const params = new URLSearchParams();
  params.set('view', filters.view);

  if (filters.userId) params.set('userId', String(filters.userId));
  if (filters.clientId) params.set('clientId', String(filters.clientId));
  if (filters.taskId) params.set('taskId', String(filters.taskId));
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);

  return request<TimesheetResponse>(`/time-entries?${params.toString()}`);
}

export function updateTimeEntry(entryId: number, values: {
  clientId?: number;
  taskId?: number;
  startTime?: string;
  endTime?: string;
  description?: string;
}) {
  return request(`/time-entries/${entryId}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function deleteTimeEntry(entryId: number) {
  return request(`/time-entries/${entryId}`, {
    method: 'DELETE',
  });
}

export function bulkUpdateTimeEntries(values: { timeEntryIds: number[]; changes: { clientId?: number; taskId?: number } }) {
  return request<{ count: number }>('/time-entries/bulk', {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function bulkDeleteTimeEntries(timeEntryIds: number[]) {
  return request<{ count: number }>('/time-entries/bulk', {
    method: 'DELETE',
    body: JSON.stringify({ timeEntryIds }),
  });
}

export function bulkArchiveClients(clientIds: number[]) {
  return request<{ count: number }>('/api/clients/bulk/archive', {
    method: 'PATCH',
    body: JSON.stringify({ clientIds }),
  });
}

export function bulkRestoreClients(clientIds: number[]) {
  return request<{ count: number }>('/api/clients/bulk/restore', {
    method: 'PATCH',
    body: JSON.stringify({ clientIds }),
  });
}

export function bulkUpdateUserStatus(userIds: number[], isActive: boolean) {
  return request<{ count: number }>('/api/users/bulk/status', {
    method: 'PUT',
    body: JSON.stringify({ userIds, isActive }),
  });
}
