import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../../lib/api';
import type { SafeUser } from '../../types';

interface AppShellProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-4.5v-6.2H9.5V21H5a1 1 0 0 1-1-1z" /> },
  { href: '/timer', label: 'Timer', icon: <path d="M10 2h4M12 6v2m0 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 4v4l3 2" /> },
  { href: '/timesheets', label: 'Timesheets', icon: <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm3 4h8m-8 4h8m-8 4h5" /> },
  { href: '/reports', label: 'Reports', icon: <path d="M5 20V10m7 10V4m7 16v-8" /> },
  { href: '/clients', label: 'Clients', icon: <path d="M14 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM4 21a6 6 0 0 1 12 0m3-10h3m-1.5-1.5V12.5" /> },
  { href: '/tasks', label: 'Tasks', icon: <path d="M7 3h10v3H7zm0 6h10m-10 4h10m-10 4h6M5 5h0m0 6h0m0 4h0m0 4h0" /> },
  { href: '/team', label: 'Team', icon: <path d="M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm7 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM3 20a6 6 0 0 1 12 0m6 0a6 6 0 0 0-4.5-5.8" /> },
  { href: '/settings', label: 'Settings', icon: <path d="M10.6 3.5h2.8l.5 2a7.3 7.3 0 0 1 1.4.8l2-.6 1.4 2.4-1.5 1.4a7.6 7.6 0 0 1 0 1.6l1.5 1.4-1.4 2.4-2-.6a7.3 7.3 0 0 1-1.4.8l-.5 2h-2.8l-.5-2a7.3 7.3 0 0 1-1.4-.8l-2 .6-1.4-2.4 1.5-1.4a7.6 7.6 0 0 1 0-1.6L5.3 8.1l1.4-2.4 2 .6a7.3 7.3 0 0 1 1.4-.8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /> },
];

export function AppShell({ children }: AppShellProps) {
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    void fetchCurrentUser()
      .then(setCurrentUser)
      .catch(() => {
        window.location.href = '/login';
      });
  }, []);

  return (
    <main className="app-shell dashboard-shell">
      <aside className="sidebar">
        <a className="brand brand-sidebar" href="/" aria-label="Scalyn home">
          <span className="brand-mark brand-mark-large" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="brandGradientTasksReact" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#48a0ff" />
                  <stop offset="100%" stopColor="#2b6bff" />
                </linearGradient>
              </defs>
              <path
                d="M35 14.5A16 16 0 1 0 35 33"
                fill="none"
                stroke="url(#brandGradientTasksReact)"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <path
                d="M31 12l6 2-2 6"
                fill="none"
                stroke="url(#brandGradientTasksReact)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="3.5" fill="#2b6bff" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>Scalyn</strong>
            <span>Task Time Tracker</span>
          </span>
        </a>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            item.href === '/tasks' ? (
              <NavLink
                key={item.href}
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                to={item.href}
              >
                <span className="icon-wrap" aria-hidden="true"><svg viewBox="0 0 24 24">{item.icon}</svg></span>
                <span>{item.label}</span>
              </NavLink>
            ) : (
              <a key={item.href} className={`sidebar-link${window.location.pathname === item.href ? ' active' : ''}`} href={item.href}>
                <span className="icon-wrap" aria-hidden="true"><svg viewBox="0 0 24 24">{item.icon}</svg></span>
                <span>{item.label}</span>
              </a>
            )
          ))}
        </nav>

        {currentUser ? (
          <div className="sidebar-footer">
            <button className="profile-chip" type="button" aria-label="Open user menu">
              <span className="avatar avatar-small">{currentUser.name.split(/\s+/).map((part) => part[0] || '').slice(0, 2).join('').toUpperCase()}</span>
              <span className="profile-chip-copy">
                <strong>{currentUser.name}</strong>
                <span>{currentUser.email}</span>
              </span>
              <svg className="chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 10 5 5 5-5" />
              </svg>
            </button>
          </div>
        ) : null}
      </aside>
      {children}
    </main>
  );
}
