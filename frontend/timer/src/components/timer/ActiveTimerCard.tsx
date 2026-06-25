import { TimerDisplay } from './TimerDisplay';
import { TimeEntry } from '../../types';
import { formatDateTime } from '../../lib/format';

interface ActiveTimerCardProps {
  entry: TimeEntry | null;
  onStop: () => void;
  loading?: boolean;
}

export function ActiveTimerCard({ entry, onStop, loading = false }: ActiveTimerCardProps) {
  return (
    <section className="active-timer card-panel">
      <div className="section-header">
        <h2>Active Timer</h2>
        <span className="status-pill">
          {entry?.isRunning ? 'Running' : 'Idle'}
        </span>
      </div>

      {!entry ? (
        <div className="empty-shell">
          <div>
            <strong>No active timer</strong>
            <p>Pick a client and task, then start tracking work.</p>
          </div>
        </div>
      ) : (
        <div className="active-timer-body">
          <button className="play-button" type="button" aria-label="Timer active">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 7.5 17 12l-8 4.5z" />
            </svg>
          </button>

          <div className="task-meta">
            <h3>{entry.task?.title ?? 'Task unavailable'}</h3>
            <p>
              {entry.client?.name ?? 'Client unavailable'}
              <span className="dot-sep">&middot;</span>
              <span className="tag">{entry.isManual ? 'Manual' : 'Timer'}</span>
            </p>
          </div>

          <TimerDisplay entry={entry} className="elapsed-block" />

          <div className="timer-actions">
            <div className="timer-meta-note">
              <span>Started</span>
              <strong>{formatDateTime(entry.startTime)}</strong>
            </div>
            <button
              className="danger-action timer-stop-button"
              type="button"
              onClick={onStop}
              disabled={loading || !entry.isRunning}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 7h10v10H7z" />
              </svg>
              <span>{loading ? 'Stopping...' : 'Stop Timer'}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
