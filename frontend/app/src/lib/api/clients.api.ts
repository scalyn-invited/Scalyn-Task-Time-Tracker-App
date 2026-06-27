import type { ClientRecord } from '../../types';
import { request } from './core';

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
