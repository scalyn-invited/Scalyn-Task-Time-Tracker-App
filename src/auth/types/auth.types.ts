import type { User } from '../../generated/prisma';

export type SafeUser = Omit<User, 'password'>;

export interface JwtPayload {
  sub: number | string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: SafeUser;
}
