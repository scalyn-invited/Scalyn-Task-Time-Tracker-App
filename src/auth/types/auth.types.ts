import type { User, UserRole } from '../../generated/prisma';

export type SystemRole = Lowercase<UserRole>;

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  password?: never;
  systemRole: SystemRole;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  sub: number | string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: SafeUser;
}
