import type { AuthResponse, SafeUser } from '../../types';
import { request } from './core';

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
