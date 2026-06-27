import type { ManualEntryPayload, StartTimerPayload, StopTimerPayload, TimeEntry } from '../types';

const TOKEN_KEY = 'sttt_access_token';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
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

  if (Array.isArray(message) && message.length > 0 && typeof message[0] === 'string') {
    return message[0];
  }

  return fallback;
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
    throw new ApiError(getErrorMessage(payload, 'Request failed'), response.status);
  }

  return payload as T;
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

export function pauseTimer(): Promise<TimeEntry> {
  return request<TimeEntry>('/timer/pause', {
    method: 'POST',
  });
}

export function resumeTimer(): Promise<TimeEntry> {
  return request<TimeEntry>('/timer/resume', {
    method: 'POST',
  });
}

export function stopTimer(values: StopTimerPayload = {}): Promise<TimeEntry> {
  return request<TimeEntry>('/timer/stop', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function cancelTimer(): Promise<{ success: true }> {
  return request<{ success: true }>('/timer/active', {
    method: 'DELETE',
  });
}

export function createManualTimeEntry(values: ManualEntryPayload): Promise<TimeEntry> {
  return request<TimeEntry>('/timer/manual', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
