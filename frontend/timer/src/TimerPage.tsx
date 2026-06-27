import { useEffect, useMemo, useState } from 'react';
import { clearToken, getToken, request } from './lib/api';
import { ActiveTimerCard } from './components/timer/ActiveTimerCard';
import { ManualTimeEntryModal } from './modals/ManualTimeEntryModal';
import { TimerSavedModal } from './components/timer/TimerSavedModal';
import { useTimerStore } from './store/timer.store';
import { ClientOption, ManualEntryPayload, Profile, TaskOption, TimeEntry } from './types';

export function TimerPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [tasks, setTasks] = useState<TaskOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [manualOpen, setManualOpen] = useState(false);
  const [savedTimer, setSavedTimer] = useState<TimeEntry | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  const activeTimer = useTimerStore((state) => state.activeTimer);
  const isLoading = useTimerStore((state) => state.isLoading);
  const isSaving = useTimerStore((state) => state.isSaving);
  const error = useTimerStore((state) => state.error);
  const refreshActiveTimer = useTimerStore((state) => state.refreshActiveTimer);
  const startTimer = useTimerStore((state) => state.startTimer);
  const pauseTimer = useTimerStore((state) => state.pauseTimer);
  const resumeTimer = useTimerStore((state) => state.resumeTimer);
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
          request<Profile>('/api/users/me'),
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
    if (activeTimer) {
      setPageError('Pause or stop the current timer before starting a new one.');
      return;
    }

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

  async function handlePauseTimer() {
    setPageError(null);
    clearError();
    await pauseTimer();
  }

  async function handleResumeTimer() {
    setPageError(null);
    clearError();
    await resumeTimer();
  }

  async function handleStopTimer() {
    setPageError(null);
    clearError();

    const stoppedTimer = await stopTimer();
    setSavedTimer(stoppedTimer);
  }

  async function handleManualSubmit(payload: ManualEntryPayload) {
    setPageError(null);
    clearError();

    const entry = await submitManualEntry(payload);
    setSavedTimer(entry);
  }

  const selectedClient = activeClients.find((client) => client.id === selectedClientId) ?? null;
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;
  return (
    <section className="route-main dashboard-main timer-shell">
        <header className="topbar dashboard-topbar">
          <h1>Timer</h1>
          <div className="topbar-actions">
            <button className="team-switcher" type="button" onClick={() => setManualOpen(true)}>
              <span>Manual entry</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 10 5 5 5-5" />
              </svg>
            </button>
          </div>
        </header>

        <div className="dashboard-content timer-content">
          <ActiveTimerCard
            entry={activeTimer}
            onStart={handleStartTimer}
            onPause={handlePauseTimer}
            onResume={handleResumeTimer}
            onStop={handleStopTimer}
            loading={isSaving}
          />

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
                  <strong>{activeTimer ? (activeTimer.status === 'paused' ? 'Paused' : 'Tracking live') : '00:00:00'}</strong>
                </div>
              </div>
            </article>

            <article className="card-panel timer-panel">
              <div className="section-header">
                <h2>Session State</h2>
                <span className="status-pill status-pill-muted">
                  {isLoading ? 'Syncing' : activeTimer ? (activeTimer.status === 'paused' ? 'Paused' : 'Running') : 'Ready'}
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
                  <span>{activeTimer ? (activeTimer.status === 'paused' ? 'Countdown is frozen' : 'Updated every second') : 'No active session'}</span>
                </div>
              </div>

              <div className="timer-actions timer-side-actions">
                <button className="ghost-action" type="button" onClick={() => setManualOpen(true)}>
                  Manual Entry
                </button>
                <span className="timer-side-hint">
                  {activeTimer
                    ? activeTimer.status === 'paused'
                      ? 'Resume or stop the paused timer.'
                      : 'Pause or stop the running timer.'
                    : 'Select a client and task to begin.'}
                </span>
              </div>
            </article>
          </section>

          {(pageError || error) ? (
            <p className="feedback-message error timer-error">
              {pageError ?? error}
            </p>
          ) : null}
        </div>

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

      <TimerSavedModal
        open={savedTimer !== null}
        entry={savedTimer}
        onClose={() => setSavedTimer(null)}
        onViewTimesheet={() => {
          window.location.assign('/timesheets');
        }}
      />
    </section>
  );
}
