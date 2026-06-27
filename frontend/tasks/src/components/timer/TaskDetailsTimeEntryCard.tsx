import { useEffect, useState } from 'react';
import { formatDuration } from '../../lib/format';
import type { ManualEntryPayload, TaskRecord, TimeEntry } from '../../types';

interface TaskDetailsTimeEntryCardProps {
  task: TaskRecord;
  activeTimer: TimeEntry | null;
  onStartTimer: (payload: { clientId: number; taskId: number; description?: string }) => Promise<void>;
  onPauseTimer: () => Promise<void>;
  onResumeTimer: () => Promise<void>;
  onStopTimer: (payload?: { description?: string }) => Promise<void>;
  onCancelTimer: () => Promise<void>;
  onCreateManualEntry: (payload: ManualEntryPayload) => Promise<void>;
}

function getCurrentElapsed(entry: TimeEntry | null): number {
  if (!entry) {
    return 0;
  }

  const referenceTime =
    entry.status === 'paused'
      ? entry.pausedAt
      : entry.endTime;

  if (entry.status === 'completed' || (!referenceTime && entry.status !== 'running')) {
    return entry.durationSeconds;
  }

  const currentEndTime = referenceTime ? new Date(referenceTime).getTime() : Date.now();
  const workedSeconds = Math.floor((currentEndTime - new Date(entry.startTime).getTime()) / 1000) - entry.totalPausedSeconds;

  return Math.max(0, workedSeconds);
}

export function TaskDetailsTimeEntryCard({
  task,
  activeTimer,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onStopTimer,
  onCancelTimer,
  onCreateManualEntry,
}: TaskDetailsTimeEntryCardProps) {
  const [description, setDescription] = useState('');
  const [manualMinutes, setManualMinutes] = useState('0');
  const [manualDescription, setManualDescription] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [, setNow] = useState(Date.now());

  const timerIsActiveOnTask = activeTimer?.status !== 'completed' && activeTimer?.taskId === task.id;
  const hasOtherActiveTimer = Boolean(activeTimer?.status !== 'completed' && activeTimer?.taskId !== task.id);
  const canStartTimer = !activeTimer || activeTimer.status === 'completed';
  const elapsedSeconds = timerIsActiveOnTask ? getCurrentElapsed(activeTimer ?? null) : 0;

  useEffect(() => {
    setDescription(timerIsActiveOnTask ? activeTimer?.description || '' : '');
  }, [timerIsActiveOnTask, activeTimer?.description, activeTimer?.id]);

  useEffect(() => {
    if (!timerIsActiveOnTask || activeTimer?.status !== 'running') {
      setNow(Date.now());
      return undefined;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [timerIsActiveOnTask, activeTimer?.id, activeTimer?.status, activeTimer?.startTime, activeTimer?.pausedAt, activeTimer?.totalPausedSeconds]);

  const handleStart = async () => {
    setIsSaving(true);
    setError('');

    try {
      await onStartTimer({
        clientId: task.clientId,
        taskId: task.id,
        description: description.trim() || undefined,
      });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to start timer');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePause = async () => {
    setIsSaving(true);
    setError('');

    try {
      await onPauseTimer();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to pause timer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResume = async () => {
    setIsSaving(true);
    setError('');

    try {
      await onResumeTimer();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to resume timer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStop = async () => {
    setIsSaving(true);
    setError('');

    try {
      await onStopTimer({
        description: description.trim() || undefined,
      });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to stop timer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = async () => {
    setIsSaving(true);
    setError('');

    try {
      const shouldCancel = window.confirm('Cancel the active timer? This will discard the current timer and any unsaved tracked time.');
      if (!shouldCancel) {
        return;
      }

      await onCancelTimer();
      setDescription('');
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to cancel timer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualEntry = async () => {
    const parsedMinutes = Number(manualMinutes);

    if (!Number.isInteger(parsedMinutes) || parsedMinutes < 1) {
      setError('Minutes worked must be a positive whole number.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      await onCreateManualEntry({
        clientId: task.clientId,
        taskId: task.id,
        durationMinutes: parsedMinutes,
        description: manualDescription.trim() || undefined,
      });
      setManualMinutes('0');
      setManualDescription('');
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to save manual entry');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <aside className="card-panel task-time-entry-card">
      <div className="task-time-entry-head">
        <div>
          <span className="section-chip">Time Entry</span>
          <h2>Track time</h2>
        </div>
        <span className={`task-time-entry-status${timerIsActiveOnTask && activeTimer?.status === 'paused' ? ' is-paused' : ''}${timerIsActiveOnTask && activeTimer?.status === 'running' ? ' is-running' : ''}`}>
          {timerIsActiveOnTask
            ? activeTimer?.status === 'paused'
              ? 'Paused'
              : 'Running'
            : hasOtherActiveTimer
              ? 'Another task active'
              : 'Ready'}
        </span>
      </div>

      {timerIsActiveOnTask ? (
        <div className="task-time-entry-elapsed">
          <span>{activeTimer?.status === 'paused' ? 'Paused' : 'Elapsed'}</span>
          <strong>{formatDuration(elapsedSeconds)}</strong>
        </div>
      ) : null}

      {activeTimer?.status && activeTimer.status !== 'completed' ? (
        <div className="task-time-entry-alert">
          <strong>
            {timerIsActiveOnTask
              ? activeTimer.status === 'paused'
                ? 'Timer paused on this task'
                : 'Timer running on this task'
              : activeTimer.status === 'paused'
                ? 'Another task timer is currently paused'
                : 'Another task timer is currently running'}
          </strong>
          <span>
            {timerIsActiveOnTask
              ? activeTimer.status === 'paused'
                ? 'Resume here when you are ready to continue.'
                : 'Stop the timer when work is complete or pause when you step away.'
              : `A live timer is already active on ${activeTimer.task.title}. Open that task to control it.`}
          </span>
        </div>
      ) : null}

      <div className="task-time-entry-section">
        <div className="task-time-entry-section-header">
          <div className="task-time-entry-section-title">Timer</div>
        </div>
        <label className="field task-time-entry-field">
          <span>Optional note</span>
          <textarea
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a quick note for this live session"
            disabled={isSaving}
          />
        </label>

        {timerIsActiveOnTask ? (
          <div className="task-timer-controls">
            {activeTimer?.status === 'paused' ? (
              <button
                type="button"
                className="btn btn-success task-timer-control task-timer-control-start"
                disabled={isSaving}
                onClick={() => void handleResume()}
              >
                {isSaving ? 'Resuming...' : 'Resume'}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-warning task-timer-control task-timer-control-pause"
                disabled={isSaving}
                onClick={() => void handlePause()}
              >
                {isSaving ? 'Pausing...' : 'Pause'}
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary task-timer-control task-timer-control-cancel"
              disabled={isSaving}
              onClick={() => void handleCancel()}
            >
              {isSaving ? 'Cancelling...' : 'Cancel'}
            </button>
            <button
              type="button"
              className="btn btn-danger task-timer-control task-timer-control-stop"
              disabled={isSaving}
              onClick={() => void handleStop()}
            >
              {isSaving ? 'Stopping...' : 'Stop'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-success task-timer-submit task-timer-submit-start"
            disabled={isSaving || !canStartTimer}
            onClick={() => void handleStart()}
          >
            {isSaving ? 'Starting...' : !canStartTimer ? 'Timer active' : 'Start timer'}
          </button>
        )}
      </div>

      <div className="task-timer-divider" />

      <div className="task-time-entry-section">
        <div className="task-time-entry-section-header">
          <div className="task-time-entry-section-title">Manual entry</div>
        </div>
        <div className="task-timer-grid task-time-entry-grid">
          <label className="field task-time-entry-field">
            <span>Minutes worked</span>
            <input
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              value={manualMinutes}
              onChange={(event) => setManualMinutes(event.target.value)}
              disabled={isSaving}
            />
          </label>
          <label className="field task-time-entry-field task-timer-field-wide">
            <span>Description</span>
            <textarea
              rows={3}
              value={manualDescription}
              onChange={(event) => setManualDescription(event.target.value)}
              placeholder="Optional note for this manual entry"
              disabled={isSaving}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-secondary task-timer-submit"
          disabled={isSaving}
          onClick={() => void handleManualEntry()}
        >
          {isSaving ? 'Saving...' : 'Save entry'}
        </button>
      </div>

      {error ? <p className="feedback-message error task-timer-feedback">{error}</p> : null}
    </aside>
  );
}
