import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../../tasks/src/components/layout/AppShell';
import { ProfilePage } from './pages/profile-page';
import { TeamMembersPage } from './pages/team-members-page';
import { TeamsPage } from './pages/teams-page';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import './styles.css';

const root = document.getElementById('team-root');

if (!root) {
  throw new Error('Team root element not found');
}

function TeamApp() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/teams" replace />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamId" element={<TeamMembersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/teams" replace />} />
      </Routes>
    </AppShell>
  );
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter basename="/team">
      <TeamApp />
    </BrowserRouter>
  </React.StrictMode>,
);
