import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { TaskDetailsPage } from './pages/tasks/TaskDetailsPage';
import { TasksPage } from './pages/tasks/TasksPage';
import './styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Tasks root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </React.StrictMode>,
);
