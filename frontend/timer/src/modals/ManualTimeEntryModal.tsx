import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ModalShell } from '../../../shared/components/ModalShell';
import { ClientOption, ManualEntryPayload, TaskOption } from '../types';

interface ManualTimeEntryModalProps {
  open: boolean;
  clients: ClientOption[];
  tasks: TaskOption[];
  defaultClientId: number | null;
  defaultTaskId: number | null;
  onClose: () => void;
  onSubmit: (payload: ManualEntryPayload) => Promise<void>;
  loading?: boolean;
}

export function ManualTimeEntryModal({
  open,
  clients,
  tasks,
  defaultClientId,
  defaultTaskId,
  onClose,
  onSubmit,
  loading = false,
}: ManualTimeEntryModalProps) {
  const initialClientId = defaultClientId ?? clients[0]?.id ?? null;
  const [clientId, setClientId] = useState<number | null>(initialClientId);
  const [taskId, setTaskId] = useState<number | null>(defaultTaskId ?? null);
  const [durationMinutes, setDurationMinutes] = useState<string>('0');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    if (clientId === null) {
      return tasks;
    }

    return tasks.filter((task) => task.clientId === clientId);
  }, [clientId, tasks]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const nextClientId = defaultClientId ?? clients[0]?.id ?? null;
    const nextTaskId =
      defaultTaskId ?? tasks.find((task) => task.clientId === nextClientId)?.id ?? tasks[0]?.id ?? null;

    setClientId(nextClientId);
    setTaskId(nextTaskId);
    setDurationMinutes('0');
    setDescription('');
    setError(null);
  }, [clients, defaultClientId, defaultTaskId, open, tasks]);

  useEffect(() => {
    if (clientId === null) {
      return;
    }

    const nextTask = tasks.find((task) => task.clientId === clientId);
    if (nextTask && !filteredTasks.some((task) => task.id === taskId)) {
      setTaskId(nextTask.id);
    }
  }, [clientId, filteredTasks, taskId, tasks]);

  if (!open) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (clientId === null || taskId === null) {
      setError('Please select both a client and a task.');
      return;
    }

    const parsedDurationMinutes = Number(durationMinutes);

    if (!Number.isInteger(parsedDurationMinutes) || parsedDurationMinutes < 1) {
      setError('Minutes worked must be a positive whole number.');
      return;
    }

    try {
      const payload: ManualEntryPayload = {
        clientId,
        taskId,
        durationMinutes: parsedDurationMinutes,
        description: description.trim() || undefined,
      };

      await onSubmit(payload);
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save manual entry');
    }
  }

  return (
    <ModalShell open={open} onClose={onClose} rootClassName="modal-overlay" panelClassName="modal-card card-panel manual-time-modal">
      <div className="section-header">
        <h2 id="manual-time-title">Manual Time Entry</h2>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close manual time entry">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <form className="manual-time-form" onSubmit={handleSubmit}>
          <label>
            <span>Client</span>
            <select
              value={clientId ?? ''}
              onChange={(event) => setClientId(event.target.value ? Number(event.target.value) : null)}
              required
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Task</span>
            <select
              value={taskId ?? ''}
              onChange={(event) => setTaskId(event.target.value ? Number(event.target.value) : null)}
              required
            >
              <option value="">Select a task</option>
              {filteredTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Minutes worked</span>
            <input
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              value={durationMinutes}
              onChange={(event) => setDurationMinutes(event.target.value)}
              placeholder="60"
              required
            />
            <small className="field-hint">The entry will end at the moment you save it.</small>
          </label>

          <label>
            <span>Description</span>
            <textarea
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional note for this manual time entry"
            />
          </label>

          {error ? <p className="feedback-message error">{error}</p> : null}

          <div className="modal-actions">
            <button className="ghost-action" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="action-button" type="submit" disabled={loading}>
              <span>{loading ? 'Saving...' : 'Save Entry'}</span>
            </button>
          </div>
      </form>
    </ModalShell>
  );
}
