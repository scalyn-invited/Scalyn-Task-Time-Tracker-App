import { useEffect, useState } from 'react';
import {
  createManualTimeEntry,
  createTask,
  deleteTask,
  fetchActiveTimer,
  fetchClients,
  fetchLabels,
  fetchTasks,
  fetchUsers,
  startTimer,
  updateTask,
  uploadTaskAttachments,
} from '../../lib/api';
import { TaskDataTable } from '../../components/tasks/TaskDataTable';
import { CreateTaskModal } from '../../modals/CreateTaskModal';
import { EditTaskModal } from '../../modals/EditTaskModal';
import type { Client, ManualEntryPayload, SafeUser, StartTimerPayload, TaskFormValues, TaskLabel, TaskRecord, TimeEntry } from '../../types';

export function TasksPage() {
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [labels, setLabels] = useState<TaskLabel[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskRecord | null>(null);
  const [activeTimer, setActiveTimer] = useState<TimeEntry | null>(null);
  const [pendingDeleteTask, setPendingDeleteTask] = useState<TaskRecord | null>(null);

  const loadPage = async (filters: { clientId?: number; userId?: number } = {}) => {
    setIsLoading(true);
    try {
      const [nextTasks, nextClients, nextUsers, nextLabels] = await Promise.all([
        fetchTasks(filters),
        fetchClients(),
        fetchUsers(),
        fetchLabels(),
      ]);

      setTasks(nextTasks);
      setClients(nextClients);
      setUsers(nextUsers);
      setLabels(nextLabels);
      setFeedback('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load tasks';
      setFeedback(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPage({
      clientId: selectedClientId,
      userId: selectedUserId,
    });
  }, [selectedClientId, selectedUserId]);

  useEffect(() => {
    void fetchActiveTimer()
      .then(setActiveTimer)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!pendingDeleteTask) {
      document.body.classList.remove('confirm-modal-open');
      return;
    }

    document.body.classList.add('confirm-modal-open');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPendingDeleteTask(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('confirm-modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pendingDeleteTask]);

  const saveNewTask = async (values: TaskFormValues, pendingFiles: File[]) => {
    const task = await createTask(values);
    if (pendingFiles.length > 0) {
      await uploadTaskAttachments(task.id, pendingFiles);
    }
    await loadPage({ clientId: selectedClientId, userId: selectedUserId });
    return task;
  };

  const saveExistingTask = async (task: TaskRecord, values: TaskFormValues) => {
    const updated = await updateTask(task.id, values);
    await loadPage({ clientId: selectedClientId, userId: selectedUserId });
    return updated;
  };

  const updateTaskLabels = async (task: TaskRecord, nextLabels: string[]) => {
    await updateTask(task.id, { labels: nextLabels });
    await loadPage({ clientId: selectedClientId, userId: selectedUserId });
  };

  const runTaskTimer = async (payload: StartTimerPayload) => {
    const entry = await startTimer(payload);
    setActiveTimer(entry);
    setFeedback('');
  };

  const saveManualEntry = async (payload: ManualEntryPayload) => {
    await createManualTimeEntry(payload);
    const nextActiveTimer = await fetchActiveTimer().catch(() => activeTimer);
    setActiveTimer(nextActiveTimer);
    setFeedback('');
  };

  const confirmDeleteTask = async () => {
    if (!pendingDeleteTask) {
      return;
    }

    try {
      await deleteTask(pendingDeleteTask.id);
      setPendingDeleteTask(null);
      await loadPage({ clientId: selectedClientId, userId: selectedUserId });
    } catch (error: unknown) {
      setFeedback(error instanceof Error ? error.message : 'Unable to delete task');
    }
  };

  return (
    <section className="route-main tasks-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Tasks</h1>
          <p className="tasks-subtitle">Track client work, delegate assignments, and keep labels tidy.</p>
        </div>
        <div className="topbar-actions">
          <button type="button" className="action-button" onClick={() => setIsCreateOpen(true)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Create task</span>
          </button>
          <button
            type="button"
            className="team-switcher"
            onClick={() => {
              setSelectedClientId(undefined);
              setSelectedUserId(undefined);
            }}
          >
            <span>Reset filters</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </button>
        </div>
      </header>

      <section className="tasks-summary-grid">
        <article className="stat-card stat-card-blue">
          <div className="stat-card-head">Total Tasks</div>
          <div className="stat-card-body">
            <strong>{tasks.length}</strong>
            <span>Across your active clients</span>
          </div>
        </article>
        <article className="stat-card stat-card-green">
          <div className="stat-card-head">Open Tasks</div>
          <div className="stat-card-body">
            <strong>{tasks.filter((task) => task.status !== 'COMPLETED').length}</strong>
            <span>Not yet completed</span>
          </div>
        </article>
        <article className="stat-card stat-card-purple">
          <div className="stat-card-head">Completed</div>
          <div className="stat-card-body">
            <strong>{tasks.filter((task) => task.status === 'COMPLETED').length}</strong>
            <span>Finished tasks</span>
          </div>
        </article>
      </section>

      <section className="card-panel tasks-filter-panel">
        <div className="tasks-filter-grid">
          <div className="field">
            <label htmlFor="task-client-filter-react">Filter by client</label>
            <select
              id="task-client-filter-react"
              value={selectedClientId || ''}
              onChange={(event) => setSelectedClientId(event.target.value ? Number(event.target.value) : undefined)}
            >
              <option value="">All clients</option>
              {clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="task-user-filter-react">Filter by assigned user</label>
            <select
              id="task-user-filter-react"
              value={selectedUserId || ''}
              onChange={(event) => setSelectedUserId(event.target.value ? Number(event.target.value) : undefined)}
            >
              <option value="">All users</option>
              {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="card-panel tasks-table-panel">
        <div className="panel-head">
          <div>
            <h2>Task list</h2>
          </div>
          <div className="feedback" data-tone={feedback ? 'error' : undefined} aria-live="polite">{feedback}</div>
        </div>
        {isLoading ? <div className="empty-state">Loading tasks...</div> : (
          <TaskDataTable
            tasks={tasks}
            labels={labels}
            activeTimer={activeTimer}
            overlayDismissKey={`${isCreateOpen}-${editingTask?.id ?? 'closed'}`}
            onEdit={(task) => setEditingTask(task)}
            onDelete={(task) => setPendingDeleteTask(task)}
            onUpdateLabels={(task, nextLabels) => updateTaskLabels(task, nextLabels)}
            onStartTimer={runTaskTimer}
            onCreateManualEntry={saveManualEntry}
          />
        )}
      </section>

      {isCreateOpen ? (
        <CreateTaskModal
          clients={clients}
          users={users}
          labels={labels}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={saveNewTask}
        />
      ) : null}

      {editingTask ? (
        <EditTaskModal
          task={editingTask}
          clients={clients}
          users={users}
          labels={labels}
          onClose={() => setEditingTask(null)}
          onSubmit={(values) => saveExistingTask(editingTask, values)}
        />
      ) : null}

      {pendingDeleteTask ? (
        <div className="confirm-modal" data-destructive="true">
          <div
            className="confirm-modal-overlay"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setPendingDeleteTask(null);
              }
            }}
          >
            <section
              className="confirm-modal-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="task-delete-confirm-title"
              aria-describedby="task-delete-confirm-message"
            >
              <header className="confirm-modal-header">
                <div>
                  <p className="route-eyebrow">Confirm action</p>
                  <h2 id="task-delete-confirm-title">Delete task?</h2>
                </div>
                <button
                  className="modal-close-button confirm-modal-close"
                  type="button"
                  onClick={() => setPendingDeleteTask(null)}
                  aria-label="Close confirmation dialog"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </header>
              <div className="confirm-modal-body">
                <p id="task-delete-confirm-message" className="confirm-modal-message">
                  Delete &quot;{pendingDeleteTask.title}&quot;? This action cannot be undone.
                </p>
                <div className="form-actions confirm-modal-actions">
                  <button
                    className="btn btn-secondary confirm-modal-cancel"
                    type="button"
                    onClick={() => setPendingDeleteTask(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary confirm-modal-confirm"
                    type="button"
                    data-variant="destructive"
                    onClick={() => {
                      void confirmDeleteTask();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}
