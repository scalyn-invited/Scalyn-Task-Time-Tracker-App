import type { TimeEntry, Client, TaskRecord } from '../../types';

interface TaskTimeEntryEditModalProps {
  entry: TimeEntry | null;
  clients: Client[];
  tasks: TaskRecord[];
  editClientId: string;
  editTaskId: string;
  editStartTime: string;
  editEndTime: string;
  editDescription: string;
  onClose: () => void;
  onClientChange: (value: string) => void;
  onTaskChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
}

export function TaskTimeEntryEditModal({
  entry,
  clients,
  tasks,
  editClientId,
  editTaskId,
  editStartTime,
  editEndTime,
  editDescription,
  onClose,
  onClientChange,
  onTaskChange,
  onStartTimeChange,
  onEndTimeChange,
  onDescriptionChange,
  onSubmit,
}: TaskTimeEntryEditModalProps) {
  if (!entry) {
    return null;
  }

  const visibleTasks = editClientId ? tasks.filter((task) => String(task.clientId) === editClientId) : tasks;

  return (
    <div className="client-modal" onClick={onClose}>
      <div className="client-modal-overlay">
        <section className="client-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="task-time-log-edit-title" onClick={(event) => event.stopPropagation()}>
          <header className="client-modal-header">
            <div>
              <p className="route-eyebrow">Time Logs</p>
              <h2 id="task-time-log-edit-title">Edit time entry</h2>
              <p className="client-modal-subtitle">Update the client, task, times, and description for this entry.</p>
            </div>
            <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close edit modal"><span aria-hidden="true">&times;</span></button>
          </header>
          <div className="client-modal-body">
            <section className="client-modal-panel">
              <form className="client-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
                <div className="field"><label htmlFor="task-time-log-client">Client</label><select id="task-time-log-client" value={editClientId} onChange={(event) => onClientChange(event.target.value)} required><option value="">Select client</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></div>
                <div className="field"><label htmlFor="task-time-log-task">Task</label><select id="task-time-log-task" value={editTaskId} onChange={(event) => onTaskChange(event.target.value)} required><option value="">Select task</option>{visibleTasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></div>
                <div className="field"><label htmlFor="task-time-log-start">Start time</label><input id="task-time-log-start" type="datetime-local" value={editStartTime} onChange={(event) => onStartTimeChange(event.target.value)} required /></div>
                <div className="field"><label htmlFor="task-time-log-end">End time</label><input id="task-time-log-end" type="datetime-local" value={editEndTime} onChange={(event) => onEndTimeChange(event.target.value)} /></div>
                <div className="field"><label htmlFor="task-time-log-description">Description</label><textarea id="task-time-log-description" rows={4} value={editDescription} onChange={(event) => onDescriptionChange(event.target.value)} /></div>
                <div className="form-actions"><button className="btn btn-primary" type="submit">Save changes</button><button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button></div>
              </form>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
