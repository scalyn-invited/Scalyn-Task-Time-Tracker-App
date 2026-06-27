import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { SafeUser } from '../types';

interface AuthGuardProps {
  currentUser: SafeUser | null;
  loading: boolean;
  requireAdmin?: boolean;
}

export function AuthGuard({ currentUser, loading, requireAdmin = false }: AuthGuardProps) {
  const location = useLocation();

  if (loading) {
    return <main className="shell"><section className="page"><div className="empty-state">Loading...</div></section></main>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requireAdmin && currentUser.systemRole !== 'admin') {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
