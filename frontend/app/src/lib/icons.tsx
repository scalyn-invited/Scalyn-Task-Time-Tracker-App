import type { ReactNode } from 'react';

export type AppNavKey = 'timer' | 'tasks' | 'timesheets' | 'clients' | 'team' | 'users' | 'reports' | 'settings';

export function navIcon(key: AppNavKey): ReactNode {
  switch (key) {
    case 'timer':
      return <path d="M10 2h4M12 6v2m0 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 4v4l3 2" />;
    case 'tasks':
      return <path d="M7 3h10v3H7zm0 6h10m-10 4h10m-10 4h6M5 5h0m0 6h0m0 4h0m0 4h0" />;
    case 'timesheets':
      return <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm3 4h8m-8 4h8m-8 4h5" />;
    case 'clients':
      return <path d="M14 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM4 21a6 6 0 0 1 12 0m3-10h3m-1.5-1.5V12.5" />;
    case 'team':
      return <path d="M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm7 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM3 20a6 6 0 0 1 12 0m6 0a6 6 0 0 0-4.5-5.8" />;
    case 'users':
      return <path d="M16 11a4 4 0 1 0-8 0m12 7a7 7 0 0 0-16 0m6-7h4" />;
    case 'reports':
      return <path d="M5 20V10m7 10V4m7 16v-8" />;
    case 'settings':
      return <path d="M10.6 3.5h2.8l.5 2a7.3 7.3 0 0 1 1.4.8l2-.6 1.4 2.4-1.5 1.4a7.6 7.6 0 0 1 0 1.6l1.5 1.4-1.4 2.4-2-.6a7.3 7.3 0 0 1-1.4.8l-.5 2h-2.8l-.5-2a7.3 7.3 0 0 1-1.4-.8l-2 .6-1.4-2.4 1.5-1.4a7.6 7.6 0 0 1 0-1.6L5.3 8.1l1.4-2.4 2 .6a7.3 7.3 0 0 1 1.4-.8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />;
    default:
      return null;
  }
}
