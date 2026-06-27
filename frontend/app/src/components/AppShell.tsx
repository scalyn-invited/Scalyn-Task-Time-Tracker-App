import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import type { SafeUser } from '../types';
import { clearToken } from '../lib/api';
import { navIcon } from '../lib/icons';
import { visibleNavItems } from '../lib/nav';

interface AppShellProps {
  currentUser: SafeUser;
}

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase() || 'U';
}

export function AppShell({ currentUser }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useMemo(() => visibleNavItems(currentUser), [currentUser]);

  return (
    <main className="app-shell dashboard-shell">
      <aside className="sidebar">
        <a className="brand brand-sidebar" href="/" aria-label="Scalyn home">
          <span className="brand-mark brand-mark-large" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="brandGradientUnifiedApp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#48a0ff" />
                  <stop offset="100%" stopColor="#2b6bff" />
                </linearGradient>
              </defs>
              <path d="M35 14.5A16 16 0 1 0 35 33" fill="none" stroke="url(#brandGradientUnifiedApp)" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M31 12l6 2-2 6" fill="none" stroke="url(#brandGradientUnifiedApp)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="24" cy="24" r="3.5" fill="#2b6bff" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>Scalyn</strong>
            <span>Task Time Tracker</span>
          </span>
        </a>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          {items.map((item) => {
            const active = item.match ? item.match(location.pathname) : location.pathname === item.href;
            return (
              <NavLink key={item.href} to={item.href} className={`sidebar-link${active ? ' active' : ''}`} aria-current={active ? 'page' : undefined}>
                <span className="icon-wrap" aria-hidden="true"><svg viewBox="0 0 24 24">{navIcon(item.key)}</svg></span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            className="profile-chip"
            type="button"
            onClick={() => navigate('/profile')}
            aria-label="Open your profile"
          >
            <span className="avatar avatar-small">{initialsFromName(currentUser.name)}</span>
            <span className="profile-chip-copy">
              <strong>{currentUser.name}</strong>
              <span>{currentUser.email}</span>
            </span>
            <svg className="chevron" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              clearToken();
              navigate('/login');
            }}
            style={{ marginTop: '12px', width: '100%' }}
          >
            Logout
          </button>
        </div>
      </aside>
      <Outlet />
    </main>
  );
}
