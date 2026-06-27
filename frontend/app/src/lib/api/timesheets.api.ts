import type { TimesheetResponse } from '../../types';
import { request } from './core';

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
