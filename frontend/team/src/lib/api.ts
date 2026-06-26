import type { SafeUser, TeamMemberRecord, TeamRole, TeamSummary } from '../types';

const TOKEN_KEY = 'sttt_access_token';

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

function token(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? (() => {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return { message: text };
    }
  })() : null;

  if (!response.ok) {
    if (response.status === 401) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }

    const message =
      payload && typeof payload === 'object' && 'message' in payload && typeof (payload as { message?: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : 'Request failed';

    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const accessToken = token();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  return parseResponse<T>(response);
}

export function fetchCurrentUser(): Promise<SafeUser> {
  return request<SafeUser>('/users/me');
}

export function fetchTeams(): Promise<TeamSummary[]> {
  return request<TeamSummary[]>('/teams');
}

export function fetchTeam(teamId: number): Promise<TeamSummary> {
  return request<TeamSummary>(`/teams/${teamId}`);
}

export function createTeam(values: { name: string; description?: string | null }): Promise<TeamSummary> {
  return request<TeamSummary>('/teams', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateTeam(teamId: number, values: { name?: string; description?: string | null }): Promise<TeamSummary> {
  return request<TeamSummary>(`/teams/${teamId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function deleteTeam(teamId: number): Promise<void> {
  return request<void>(`/teams/${teamId}`, {
    method: 'DELETE',
  });
}

export function fetchTeamMembers(teamId: number): Promise<TeamMemberRecord[]> {
  return request<TeamMemberRecord[]>(`/teams/${teamId}/members`);
}

export function addTeamMember(teamId: number, values: { userId: number; role: TeamRole }): Promise<TeamMemberRecord> {
  return request<TeamMemberRecord>(`/teams/${teamId}/members`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateTeamMember(teamId: number, memberId: number, values: { role: TeamRole }): Promise<TeamMemberRecord> {
  return request<TeamMemberRecord>(`/teams/${teamId}/members/${memberId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function removeTeamMember(teamId: number, memberId: number): Promise<void> {
  return request<void>(`/teams/${teamId}/members/${memberId}`, {
    method: 'DELETE',
  });
}

export function fetchUsers(): Promise<SafeUser[]> {
  return request<SafeUser[]>('/users');
}

export function createUser(values: {
  name: string;
  email: string;
  temporaryPassword: string;
  confirmPassword: string;
  systemRole: TeamRole;
  assignToTeam?: boolean;
  teamId?: number;
  teamRole?: Exclude<TeamRole, 'admin'>;
}): Promise<SafeUser> {
  return request<SafeUser>('/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateUser(userId: number, values: { name?: string; email?: string; systemRole?: TeamRole }): Promise<SafeUser> {
  return request<SafeUser>(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function updateUserStatus(userId: number, isActive: boolean): Promise<SafeUser> {
  return request<SafeUser>(`/users/${userId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ isActive }),
  });
}

export function deleteUser(userId: number): Promise<SafeUser> {
  return request<SafeUser>(`/users/${userId}`, {
    method: 'DELETE',
  });
}

export function updateProfile(values: { name?: string; email?: string }): Promise<SafeUser> {
  return request<SafeUser>('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function changePassword(values: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<void> {
  return request<void>('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
