import type { TaskLabel } from '../../types';
import { request } from './core';

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
