import type { ClientRecord, SafeUser } from '../../types';
import type { TaskRecord } from '../../../../../tasks/src/types';

interface TimesheetsFiltersProps {
  view: 'daily' | 'weekly' | 'monthly';
  onViewChange: (view: 'daily' | 'weekly' | 'monthly') => void;
  userId: string;
  onUserIdChange: (value: string) => void;
  clientId: string;
  onClientIdChange: (value: string) => void;
  taskId: string;
  onTaskIdChange: (value: string) => void;
  from: string;
  onFromChange: (value: string) => void;
  to: string;
  onToChange: (value: string) => void;
  users: SafeUser[];
  clients: ClientRecord[];
  visibleTasks: TaskRecord[];
}

export function TimesheetsFilters({
  view,
  onViewChange,
  userId,
  onUserIdChange,
  clientId,
  onClientIdChange,
  taskId,
  onTaskIdChange,
  from,
  onFromChange,
  to,
  onToChange,
  users,
  clients,
  visibleTasks,
}: TimesheetsFiltersProps) {
  return (
    <section className="card-panel timesheet-filter-panel">
      <div className="timesheet-view-toggle" role="tablist" aria-label="Timesheet view">
        {(['daily', 'weekly', 'monthly'] as const).map((candidate) => (
          <button key={candidate} type="button" className={`timesheet-view-button${view === candidate ? ' is-active' : ''}`} onClick={() => onViewChange(candidate)}>{candidate[0].toUpperCase() + candidate.slice(1)}</button>
        ))}
      </div>

      <div className="timesheet-filter-grid">
        <label className="field"><span>User</span><select value={userId} onChange={(event) => onUserIdChange(event.target.value)}><option value="">All users</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select></label>
        <label className="field"><span>Client</span><select value={clientId} onChange={(event) => onClientIdChange(event.target.value)}><option value="">All clients</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label>
        <label className="field"><span>Task</span><select value={taskId} onChange={(event) => onTaskIdChange(event.target.value)}><option value="">All tasks</option>{visibleTasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></label>
        <label className="field"><span>From</span><input type="date" value={from} onChange={(event) => onFromChange(event.target.value)} /></label>
        <label className="field"><span>To</span><input type="date" value={to} onChange={(event) => onToChange(event.target.value)} /></label>
      </div>
    </section>
  );
}
