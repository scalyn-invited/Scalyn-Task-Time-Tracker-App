import { useEffect, useMemo, useState } from 'react';
import { clearToken, getToken, request } from './lib/api';
import { getInitials } from './lib/format';
import { ActiveTimerCard } from './components/timer/ActiveTimerCard';
import { StartTimerButton } from './components/timer/StartTimerButton';
import { StopTimerButton } from './components/timer/StopTimerButton';
import { ManualTimeEntryModal } from './modals/ManualTimeEntryModal';
import { useTimerStore } from './store/timer.store';
import { ClientOption, ManualEntryPayload, Profile, TaskOption } from './types';

export function TimerPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [tasks, setTasks] = useState<TaskOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [manualOpen, setManualOpen] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);

  const activeTimer = useTimerStore((state) => state.activeTimer);
  const isLoading = useTimerStore((state) => state.isLoading);
  const isSaving = useTimerStore((state) => state.isSaving);
  const error = useTimerStore((state) => state.error);
  const refreshActiveTimer = useTimerStore((state) => state.refreshActiveTimer);
  const startTimer = useTimerStore((state) => state.startTimer);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const submitManualEntry = useTimerStore((state) => state.submitManualEntry);
  const clearError = useTimerStore((state) => state.clearError);

  const activeClients = useMemo(
    () => clients.filter((client) => client.archivedAt === null),
    [clients],
  );

  const visibleTasks = useMemo(() => {
    if (selectedClientId === null) {
      return tasks;
    }

    return tasks.filter((task) => task.clientId === selectedClientId);
  }, [selectedClientId, tasks]);

  useEffect(() => {
    if (!getToken()) {
      clearToken();
      window.location.assign('/login');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [me, clientRows, taskRows] = await Promise.all([
          request<Profile>('/users/me'),
          request<ClientOption[]>('/api/clients'),
          request<TaskOption[]>('/api/tasks'),
        ]);

        if (cancelled) {
          return;
        }

        setProfile(me);
        setClients(Array.isArray(clientRows) ? clientRows : []);
        setTasks(Array.isArray(taskRows) ? taskRows : []);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        if ((loadError as { status?: number }).status === 401) {
          clearToken();
          window.location.assign('/login');
          return;
        }

        setPageError(loadError instanceof Error ? loadError.message : 'Unable to load timer page');
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activeTimer) {
      setSelectedClientId(activeTimer.clientId);
      setSelectedTaskId(activeTimer.taskId);
      return;
    }

    if (selectedClientId === null && activeClients.length > 0) {
      setSelectedClientId(activeClients[0]!.id);
    }
  }, [activeClients, activeTimer, selectedClientId]);

  useEffect(() => {
    if (selectedClientId === null) {
      return;
    }

    const firstTaskForClient = tasks.find((task) => task.clientId === selectedClientId);
    if (firstTaskForClient && !visibleTasks.some((task) => task.id === selectedTaskId)) {
      setSelectedTaskId(firstTaskForClient.id);
    }
  }, [selectedClientId, selectedTaskId, tasks, visibleTasks]);

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      try {
        await refreshActiveTimer();
      } catch (pollError) {
        if (cancelled) {
          return;
        }

        if ((pollError as { status?: number }).status === 401) {
          clearToken();
          window.location.assign('/login');
        }
      }
    };

    void poll();
    const interval = window.setInterval(() => {
      void poll();
    }, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [refreshActiveTimer]);

  function resolveSelectedTaskId(clientId: number | null): number | null {
    if (clientId === null) {
      return null;
    }

    const candidate = tasks.find((task) => task.clientId === clientId);
    return candidate ? candidate.id : null;
  }

  async function handleStartTimer() {
    if (selectedClientId === null || selectedTaskId === null) {
      setPageError('Please select both a client and a task.');
      return;
    }

    setPageError(null);
    clearError();

    await startTimer({
      clientId: selectedClientId,
      taskId: selectedTaskId,
      description: description.trim() || undefined,
    });
  }

  async function handleStopTimer() {
    setPageError(null);
    clearError();

    await stopTimer();
  }

  async function handleManualSubmit(payload: ManualEntryPayload) {
    setPageError(null);
    clearError();

    await submitManualEntry(payload);
  }

  const selectedClient = activeClients.find((client) => client.id === selectedClientId) ?? null;
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;
  const canStart = selectedClientId !== null && selectedTaskId !== null && !isSaving;

  return (
    <main className="app-shell dashboard-shell timer-shell">
      <aside className="sidebar">
        <a className="brand brand-sidebar" href="/" aria-label="Scalyn home">
          <span className="brand-mark brand-mark-large" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="brandGradientTimerReact" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#48a0ff" />
                  <stop offset="100%" stopColor="#2b6bff" />
                </linearGradient>
              </defs>
              <path d="M35 14.5A16 16 0 1 0 35 33" fill="none" stroke="url(#brandGradientTimerReact)" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M31 12l6 2-2 6" fill="none" stroke="url(#brandGradientTimerReact)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="24" cy="24" r="3.5" fill="#2b6bff" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>Scalyn</strong>
            <span>Task Time Tracker</span>
          </span>
        </a>

        <nav className="sidebar-nav" aria-label="Primary">
          <a className="sidebar-link" href="/">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-4.5v-6.2H9.5V21H5a1 1 0 0 1-1-1z" />
              </svg>
            </span>
            <span>Dashboard</span>
          </a>
          <a className="sidebar-link active" href="/timer" aria-current="page">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M10 2h4M12 6v2m0 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 4v4l3 2" />
              </svg>
            </span>
            <span>Timer</span>
          </a>
          <a className="sidebar-link" href="/timesheets">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm3 4h8m-8 4h8m-8 4h5" />
              </svg>
            </span>
            <span>Timesheets</span>
          </a>
          <a className="sidebar-link" href="/reports">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 20V10m7 10V4m7 16v-8" />
              </svg>
            </span>
            <span>Reports</span>
          </a>
          <a className="sidebar-link" href="/clients">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M14 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM4 21a6 6 0 0 1 12 0m3-10h3m-1.5-1.5V12.5" />
              </svg>
            </span>
            <span>Clients</span>
          </a>
          <a className="sidebar-link" href="/tasks">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 3h10v3H7zm0 6h10m-10 4h10m-10 4h6M5 5h0m0 6h0m0 4h0m0 4h0" />
              </svg>
            </span>
            <span>Tasks</span>
          </a>
          <a className="sidebar-link" href="/team">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm7 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM3 20a6 6 0 0 1 12 0m6 0a6 6 0 0 0-4.5-5.8" />
              </svg>
            </span>
            <span>Team</span>
          </a>
          <a className="sidebar-link" href="/settings">
            <span className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M10.6 3.5h2.8l.5 2a7.3 7.3 0 0 1 1.4.8l2-.6 1.4 2.4-1.5 1.4a7.6 7.6 0 0 1 0 1.6l1.5 1.4-1.4 2.4-2-.6a7.3 7.3 0 0 1-1.4.8l-.5 2h-2.8l-.5-2a7.3 7.3 0 0 1-1.4-.8l-2 .6-1.4-2.4 1.5-1.4a7.6 7.6 0 0 1 0-1.6L5.3 8.1l1.4-2.4 2 .6a7.3 7.3 0 0 1 1.4-.8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
            </span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <a className="profile-chip" href="/profile" aria-label="Open your profile">
            <span className="avatar avatar-small">{getInitials(profile?.name)}</span>
            <span className="profile-chip-copy">
              <strong>{profile?.name ?? 'Loading...'}</strong>
              <span>{profile?.email ?? '...'}</span>
            </span>
            <svg className="chevron" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </a>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="topbar dashboard-topbar">
          <h1>Timer</h1>
          <div className="topbar-actions">
            <StartTimerButton onClick={handleStartTimer} disabled={!canStart} loading={isSaving} />
            <button className="team-switcher" type="button" onClick={() => setManualOpen(true)}>
              <span>Manual entry</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 10 5 5 5-5" />
              </svg>
            </button>
          </div>
        </header>

        <div className="dashboard-content timer-content">
          <ActiveTimerCard entry={activeTimer} onStop={handleStopTimer} loading={isSaving} />

          <section className="content-grid timer-controls-grid">
            <article className="card-panel timer-panel">
              <div className="section-header">
                <h2>Track Work</h2>
                <span className="status-pill status-pill-muted">Live</span>
              </div>

              <div className="timer-form-grid">
                <label>
                  <span>Client</span>
                  <select
                    value={selectedClientId ?? ''}
                    onChange={(event) => {
                      const nextClientId = event.target.value ? Number(event.target.value) : null;
                      setSelectedClientId(nextClientId);
                      setSelectedTaskId(resolveSelectedTaskId(nextClientId));
                    }}
                  >
                    <option value="">Select a client</option>
                    {activeClients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Task</span>
                  <select
                    value={selectedTaskId ?? ''}
                    onChange={(event) => setSelectedTaskId(event.target.value ? Number(event.target.value) : null)}
                  >
                    <option value="">Select a task</option>
                    {visibleTasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="timer-description-field">
                  <span>Description</span>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Optional note for the live timer"
                  />
                </label>
              </div>

              <div className="timer-selection-summary">
                <div>
                  <span>Current Task</span>
                  <strong>{selectedTask?.title ?? 'No task selected'}</strong>
                </div>
                <div>
                  <span>Client</span>
                  <strong>{selectedClient?.name ?? 'No client selected'}</strong>
                </div>
                <div>
                  <span>Duration</span>
                  <strong>{activeTimer ? 'Tracking live' : '00:00:00'}</strong>
                </div>
              </div>
            </article>

            <article className="card-panel timer-panel">
              <div className="section-header">
                <h2>Session State</h2>
                <span className="status-pill status-pill-muted">
                  {isLoading ? 'Syncing' : activeTimer ? 'Running' : 'Ready'}
                </span>
              </div>

              <div className="route-list">
                <div className="route-item">
                  <strong>Current Task</strong>
                  <span>{activeTimer?.task?.title ?? selectedTask?.title ?? 'None'}</span>
                </div>
                <div className="route-item">
                  <strong>Client</strong>
                  <span>{activeTimer?.client?.name ?? selectedClient?.name ?? 'None'}</span>
                </div>
                <div className="route-item">
                  <strong>Duration</strong>
                  <span>{activeTimer ? 'Updated every second' : 'No active session'}</span>
                </div>
              </div>

              <div className="timer-actions timer-side-actions">
                <button className="ghost-action" type="button" onClick={() => setManualOpen(true)}>
                  Manual Entry
                </button>
                {activeTimer ? (
                  <StopTimerButton onClick={handleStopTimer} disabled={!activeTimer || isSaving} loading={isSaving} />
                ) : (
                  <StartTimerButton onClick={handleStartTimer} disabled={!canStart} loading={isSaving} />
                )}
              </div>
            </article>
          </section>

          {(pageError || error) ? (
            <p className="feedback-message error timer-error">
              {pageError ?? error}
            </p>
          ) : null}
        </div>
      </section>

      <ManualTimeEntryModal
        open={manualOpen}
        clients={activeClients}
        tasks={tasks}
        defaultClientId={selectedClientId}
        defaultTaskId={selectedTaskId}
        onClose={() => setManualOpen(false)}
        onSubmit={handleManualSubmit}
        loading={isSaving}
      />
    </main>
  );
}
