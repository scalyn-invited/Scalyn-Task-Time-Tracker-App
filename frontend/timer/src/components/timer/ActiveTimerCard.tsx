import { TimerDisplay } from './TimerDisplay';
import { StartTimerButton } from './StartTimerButton';
import { TimeEntry } from '../../types';
import { formatDateTime } from '../../lib/format';

interface ActiveTimerCardProps {
  entry: TimeEntry | null;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  loading?: boolean;
}

export function ActiveTimerCard({
  entry,
  onStart,
  onPause,
  onResume,
  onStop,
  loading = false,
}: ActiveTimerCardProps) {
  const timerStatus = entry?.status ?? 'completed';
  const isRunning = timerStatus === 'running';
  const isPaused = timerStatus === 'paused';

  return (
    <section className="active-timer card-panel">
      <div className="section-header">
        <h2>Active Timer</h2>
        <span className="status-pill">
          {entry ? timerStatus.charAt(0).toUpperCase() + timerStatus.slice(1) : 'Idle'}
        </span>
      </div>

      {!entry ? (
        <div className="empty-shell active-timer-empty">
          <div>
            <strong>No active timer</strong>
            <p>Pick a client and task, then start tracking work.</p>
          </div>
          <div className="active-timer-empty-actions">
            <StartTimerButton onClick={onStart} disabled={loading} loading={loading} />
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
              <span>{isPaused ? 'Paused at' : 'Started'}</span>
              <strong>{formatDateTime(isPaused && entry.pausedAt ? entry.pausedAt : entry.startTime)}</strong>
            </div>
            <div className="timer-action-row">
              {isRunning ? (
                <button
                  className="btn btn-warning timer-action-button timer-action-button-secondary"
                  type="button"
                  onClick={onPause}
                  disabled={loading}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 6h4v12H7zm6 0h4v12h-4z" />
                  </svg>
                  <span>{loading ? 'Pausing...' : 'Pause'}</span>
                </button>
              ) : null}

              {isPaused ? (
                <button
                  className="btn btn-success timer-action-button timer-action-button-secondary"
                  type="button"
                  onClick={onResume}
                  disabled={loading}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>{loading ? 'Resuming...' : 'Resume'}</span>
                </button>
              ) : null}

              <button
                className="btn btn-danger timer-stop-button"
                type="button"
                onClick={onStop}
                disabled={loading || (!isRunning && !isPaused)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 7h10v10H7z" />
                </svg>
                <span>{loading ? 'Stopping...' : 'Stop'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
