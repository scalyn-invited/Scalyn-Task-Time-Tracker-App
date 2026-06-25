import { useEffect, useState } from 'react';
import {
  createTask,
  deleteTask,
  fetchActiveTimer,
  fetchClients,
  fetchLabels,
  fetchTasks,
  fetchUsers,
  updateTask,
  uploadTaskAttachments,
} from '../../lib/api';
import { TaskDataTable } from '../../components/tasks/TaskDataTable';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { CreateTaskModal } from '../../modals/CreateTaskModal';
import { EditTaskModal } from '../../modals/EditTaskModal';
import type { Client, SafeUser, TaskFormValues, TaskLabel, TaskRecord, TimeEntry } from '../../types';

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
    const interval = window.setInterval(() => {
      void fetchActiveTimer()
        .then(setActiveTimer)
        .catch(() => undefined);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

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

  const updateTaskFields = async (task: TaskRecord, values: Partial<Pick<TaskFormValues, 'status' | 'priority'>>) => {
    await updateTask(task.id, values);
    await loadPage({ clientId: selectedClientId, userId: selectedUserId });
  };

  const updateTaskLabels = async (task: TaskRecord, nextLabels: string[]) => {
    await updateTask(task.id, { labels: nextLabels });
    await loadPage({ clientId: selectedClientId, userId: selectedUserId });
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
            onUpdateTask={(task, values) => updateTaskFields(task, values)}
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

      <ConfirmModal
        open={Boolean(pendingDeleteTask)}
        title="Delete task?"
        message={pendingDeleteTask ? <>Delete &quot;{pendingDeleteTask.title}&quot;? This action cannot be undone.</> : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        titleId="task-delete-confirm-title"
        messageId="task-delete-confirm-message"
        onClose={() => setPendingDeleteTask(null)}
        onConfirm={() => {
          void confirmDeleteTask();
        }}
      />
    </section>
  );
}
