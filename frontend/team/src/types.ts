export type SystemRole = 'admin' | 'manager' | 'member';
export type TeamRole = 'admin' | 'manager' | 'member';

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  systemRole: SystemRole;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamSummary {
  id: number;
  name: string;
  description: string | null;
  createdById: number;
  createdAt: string;
  updatedAt: string;
  membersCount: number;
  managersCount: number;
}

export interface TeamMemberRecord {
  id: number;
  teamId: number;
  userId: number;
  role: TeamRole;
  joinedAt: string;
  user: SafeUser;
}
