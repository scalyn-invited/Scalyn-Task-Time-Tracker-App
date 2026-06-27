import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import '../../tasks/src/styles.css';
import '../../team/src/styles.css';
import '../../timer/src/styles.css';
import '../../reports/src/styles.css';
import { fetchCurrentUser, getToken } from './lib/api';
import type { SafeUser } from './types';
import { AppShell } from './components/AppShell';
import { AuthGuard } from './components/AuthGuard';
import { ToastProvider } from '../../shared/components/ToastProvider';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ClientsPage } from './pages/ClientsPage';
import { UsersPage } from './pages/UsersPage';
import { TimesheetsPage } from './pages/TimesheetsPage';
import { TimerRoutePage } from './pages/TimerRoutePage';
import { TasksRoutePage } from './pages/TasksRoutePage';
import { TaskDetailsRoutePage } from './pages/TaskDetailsRoutePage';
import { ReportsRoutePage } from './pages/ReportsRoutePage';
import { TeamsRoutePage } from './pages/TeamsRoutePage';
import { TeamMembersRoutePage } from './pages/TeamMembersRoutePage';
import { TeamProfileRoutePage } from './pages/TeamProfileRoutePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }

    void fetchCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage currentUser={currentUser} onLoggedIn={setCurrentUser} />} />
        <Route path="/register" element={<RegisterPage currentUser={currentUser} />} />

        <Route element={<AuthGuard currentUser={currentUser} loading={loading} />}>
          <Route element={currentUser ? <AppShell currentUser={currentUser} /> : null}>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/timer" element={<TimerRoutePage />} />
            <Route path="/tasks" element={<TasksRoutePage />} />
            <Route path="/tasks/:taskId" element={<TaskDetailsRoutePage />} />
            <Route path="/timesheets" element={<TimesheetsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientsPage />} />
            <Route path="/reports" element={<ReportsRoutePage />} />
            <Route path="/team" element={<Navigate to="/team/teams" replace />} />
            <Route path="/team/teams" element={<TeamsRoutePage />} />
            <Route path="/team/teams/:teamId" element={<TeamMembersRoutePage />} />
            <Route path="/team/profile" element={<TeamProfileRoutePage />} />
            <Route path="/profile" element={<ProfilePage currentUser={currentUser!} onProfileUpdated={setCurrentUser} />} />
            <Route path="/settings" element={<SettingsPage currentUser={currentUser!} />} />
            <Route path="*" element={<NotFoundPage authenticated />} />
          </Route>
        </Route>

        <Route element={<AuthGuard currentUser={currentUser} loading={loading} requireAdmin />}>
          <Route element={currentUser ? <AppShell currentUser={currentUser} /> : null}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage authenticated={Boolean(currentUser)} />} />
      </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('App root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
);
