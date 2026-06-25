import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { formatDuration } from '../../lib/format';
import type { TimeEntry } from '../../types';

interface TimerSavedModalProps {
  open: boolean;
  entry: TimeEntry | null;
  onClose: () => void;
  onViewTimesheet: () => void;
}

export function TimerSavedModal({ open, entry, onClose, onViewTimesheet }: TimerSavedModalProps) {
  const taskName = entry?.task?.title ?? 'Task unavailable';
  const clientName = entry?.client?.name ?? 'Client unavailable';
  const duration = formatDuration(entry?.durationSeconds ?? 0);

  return (
    <Dialog open={open} onClose={onClose} className="timer-saved-dialog">
      <DialogBackdrop className="timer-saved-backdrop" />
      <div className="timer-saved-shell">
        <DialogPanel className="card-panel timer-saved-panel">
          <div className="timer-saved-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M20 7 9 18l-5-5" />
            </svg>
          </div>

          <div className="timer-saved-copy">
            <DialogTitle className="timer-saved-title">Time Entry Saved</DialogTitle>
            <p>Your tracked time has been successfully saved.</p>

            <dl className="timer-saved-details">
              <div>
                <dt>Task</dt>
                <dd>{taskName}</dd>
              </div>
              <div>
                <dt>Client</dt>
                <dd>{clientName}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{duration}</dd>
              </div>
            </dl>
          </div>

          <div className="timer-saved-actions">
            <button className="action-button timer-saved-primary" type="button" onClick={onViewTimesheet}>
              View Timesheet
            </button>
            <button className="ghost-action timer-saved-secondary" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
