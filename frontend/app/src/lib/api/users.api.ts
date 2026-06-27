import type { SafeUser } from '../../types';
import { request } from './core';

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

export function bulkUpdateUserStatus(userIds: number[], isActive: boolean) {
  return request<{ count: number }>('/api/users/bulk/status', {
    method: 'PUT',
    body: JSON.stringify({ userIds, isActive }),
  });
}

export function fetchTeams(): Promise<Array<{ id: number; name: string }>> {
  return request<Array<{ id: number; name: string }>>('/teams');
}
