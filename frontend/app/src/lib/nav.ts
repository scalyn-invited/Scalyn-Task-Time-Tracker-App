import type { SafeUser } from '../types';
import type { AppNavKey } from './icons';

export interface NavItem {
  key: AppNavKey;
  href: string;
  label: string;
  adminOnly?: boolean;
  match?: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'tasks', href: '/tasks', label: 'Task', match: (pathname) => pathname === '/tasks' || pathname.startsWith('/tasks/') },
  { key: 'timer', href: '/timer', label: 'Timer' },
  { key: 'timesheets', href: '/timesheets', label: 'Timesheets' },
  { key: 'clients', href: '/clients', label: 'Clients', match: (pathname) => pathname === '/clients' || pathname.startsWith('/clients/') },
  { key: 'team', href: '/team', label: 'Team', match: (pathname) => pathname === '/team' || pathname.startsWith('/team/') },
  { key: 'users', href: '/users', label: 'Users', adminOnly: true },
  { key: 'reports', href: '/reports', label: 'Reports' },
  { key: 'settings', href: '/settings', label: 'Setting' },
];

export function visibleNavItems(user: SafeUser | null): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.adminOnly || user?.systemRole === 'admin');
}
