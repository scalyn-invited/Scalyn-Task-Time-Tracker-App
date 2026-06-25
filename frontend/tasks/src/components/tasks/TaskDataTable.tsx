import { useEffect, useRef, useState } from 'react';
import DataTable from 'datatables.net-dt';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { TaskPriorityBadge, TaskStatusBadge } from './TaskStatusBadge';
import type { ManualEntryPayload, StartTimerPayload, TaskLabel, TaskRecord, TimeEntry } from '../../types';

interface TaskDataTableProps {
  tasks: TaskRecord[];
  labels: TaskLabel[];
  activeTimer: TimeEntry | null;
  onEdit: (task: TaskRecord) => void;
  onDelete: (task: TaskRecord) => void;
  onUpdateLabels: (task: TaskRecord, labels: string[]) => Promise<void>;
  onStartTimer: (payload: StartTimerPayload) => Promise<void>;
  onCreateManualEntry: (payload: ManualEntryPayload) => Promise<void>;
  overlayDismissKey?: string;
}

type OverlayPosition = {
  top: number;
  left: number;
  visibility: 'hidden' | 'visible';
};

const hiddenOverlayPosition: OverlayPosition = {
  top: 0,
  left: 0,
  visibility: 'hidden',
};

function getTaskLabelSummary(task: TaskRecord): string {
  if (task.labels.length === 0) {
    return 'No labels';
  }

  return `${task.labels[0].name}${task.labels.length > 1 ? ` +${task.labels.length - 1}` : ''}`;
}

function createOverlayPosition(anchor: HTMLElement, overlay: HTMLElement): OverlayPosition {
  const anchorRect = anchor.getBoundingClientRect();
  const padding = 12;
  const gap = 10;
  const panelWidth = Math.min(340, window.innerWidth - padding * 2);
  const panelHeight = overlay.getBoundingClientRect().height;

  let left = anchorRect.left;
  let top = anchorRect.bottom + gap;

  if (left + panelWidth > window.innerWidth - padding) {
    left = window.innerWidth - padding - panelWidth;
  }

  left = Math.max(padding, left);

  if (top + panelHeight > window.innerHeight - padding) {
    top = anchorRect.top - gap - panelHeight;
  }

  top = Math.max(padding, Math.min(top, window.innerHeight - padding - panelHeight));

  return {
    top: Math.round(top),
    left: Math.round(left),
    visibility: 'visible',
  };
}

export function TaskDataTable({
  tasks,
  labels,
  activeTimer,
  onEdit,
  onDelete,
  onUpdateLabels,
  onStartTimer,
  onCreateManualEntry,
  overlayDismissKey,
}: TaskDataTableProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dataTableRef = useRef<DataTable | null>(null);
  const labelOverlayRef = useRef<HTMLDivElement | null>(null);
  const labelTriggerRef = useRef<HTMLButtonElement | null>(null);
  const timerOverlayRef = useRef<HTMLDivElement | null>(null);
  const timerTriggerRef = useRef<HTMLButtonElement | null>(null);

  const [openLabelTaskId, setOpenLabelTaskId] = useState<number | null>(null);
  const [selectedLabelName, setSelectedLabelName] = useState('');
  const [isSavingLabels, setIsSavingLabels] = useState(false);
  const [labelOverlayPosition, setLabelOverlayPosition] = useState<OverlayPosition>(hiddenOverlayPosition);

  const [openTimerTaskId, setOpenTimerTaskId] = useState<number | null>(null);
  const [timerDescription, setTimerDescription] = useState('');
  const [manualMinutes, setManualMinutes] = useState('0');
  const [manualDescription, setManualDescription] = useState('');
  const [timerError, setTimerError] = useState('');
  const [isSavingTimer, setIsSavingTimer] = useState(false);
  const [timerOverlayPosition, setTimerOverlayPosition] = useState<OverlayPosition>(hiddenOverlayPosition);

  const openLabelTask = openLabelTaskId === null ? null : tasks.find((task) => task.id === openLabelTaskId) || null;
  const availableLabels = openLabelTask
    ? labels.filter((label) => !openLabelTask.labels.some((taskLabel) => taskLabel.name === label.name))
    : [];
  const openTimerTask = openTimerTaskId === null ? null : tasks.find((task) => task.id === openTimerTaskId) || null;
  const timerIsActiveOnTask = openTimerTask ? activeTimer?.isRunning && activeTimer.taskId === openTimerTask.id : false;

  const closeLabelOverlay = () => {
    setOpenLabelTaskId(null);
    setSelectedLabelName('');
    setIsSavingLabels(false);
    labelTriggerRef.current = null;
    setLabelOverlayPosition(hiddenOverlayPosition);
  };

  const closeTimerOverlay = () => {
    setOpenTimerTaskId(null);
    setTimerDescription('');
    setManualMinutes('0');
    setManualDescription('');
    setTimerError('');
    setIsSavingTimer(false);
    timerTriggerRef.current = null;
    setTimerOverlayPosition(hiddenOverlayPosition);
  };

  useEffect(() => {
    const table = tableRef.current;

    if (!table) {
      return;
    }

    if (dataTableRef.current) {
      dataTableRef.current.destroy();
      dataTableRef.current = null;
    }

    const instance = new DataTable(table, {
      paging: true,
      searching: true,
      info: true,
      pageLength: 10,
      order: [[0, 'asc']],
      language: {
        searchPlaceholder: 'Search tasks',
      },
    });
    dataTableRef.current = instance;

    const handleDraw = () => {
      closeLabelOverlay();
      closeTimerOverlay();
    };

    instance.on('draw', handleDraw);

    return () => {
      instance.off('draw', handleDraw);
      closeLabelOverlay();
      closeTimerOverlay();
      dataTableRef.current?.destroy();
      dataTableRef.current = null;
    };
  }, [tasks]);

  useEffect(() => {
    closeLabelOverlay();
    closeTimerOverlay();
  }, [overlayDismissKey]);

  useEffect(() => {
    if (!openLabelTask) {
      return;
    }

    const positionOverlay = () => {
      const anchor = labelTriggerRef.current;
      const overlay = labelOverlayRef.current;

      if (!anchor || !anchor.isConnected || !overlay) {
        closeLabelOverlay();
        return;
      }

      setLabelOverlayPosition(createOverlayPosition(anchor, overlay));
    };

    const frame = window.requestAnimationFrame(positionOverlay);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLabelOverlay();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const overlay = labelOverlayRef.current;
      const trigger = labelTriggerRef.current;

      if (overlay?.contains(target) || trigger?.contains(target)) {
        return;
      }

      closeLabelOverlay();
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', positionOverlay);
    window.addEventListener('scroll', positionOverlay, true);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', positionOverlay);
      window.removeEventListener('scroll', positionOverlay, true);
    };
  }, [openLabelTask, openLabelTask?.labels.length]);

  useEffect(() => {
    if (!openTimerTask) {
      return;
    }

    const positionOverlay = () => {
      const anchor = timerTriggerRef.current;
      const overlay = timerOverlayRef.current;

      if (!anchor || !anchor.isConnected || !overlay) {
        closeTimerOverlay();
        return;
      }

      setTimerOverlayPosition(createOverlayPosition(anchor, overlay));
    };

    const frame = window.requestAnimationFrame(positionOverlay);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTimerOverlay();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const overlay = timerOverlayRef.current;
      const trigger = timerTriggerRef.current;

      if (overlay?.contains(target) || trigger?.contains(target)) {
        return;
      }

      closeTimerOverlay();
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', positionOverlay);
    window.addEventListener('scroll', positionOverlay, true);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', positionOverlay);
      window.removeEventListener('scroll', positionOverlay, true);
    };
  }, [openTimerTask, timerDescription, manualMinutes, manualDescription, timerError, timerIsActiveOnTask]);

  const persistLabels = async (task: TaskRecord, nextLabels: string[]) => {
    setIsSavingLabels(true);
    try {
      await onUpdateLabels(task, nextLabels);
      closeLabelOverlay();
    } finally {
      setIsSavingLabels(false);
    }
  };

  const submitStartTimer = async (task: TaskRecord) => {
    setIsSavingTimer(true);
    setTimerError('');

    try {
      await onStartTimer({
        clientId: task.clientId,
        taskId: task.id,
        description: timerDescription.trim() || undefined,
      });
      closeTimerOverlay();
    } catch (error) {
      setTimerError(error instanceof Error ? error.message : 'Unable to start timer');
    } finally {
      setIsSavingTimer(false);
    }
  };

  const submitManualEntry = async (task: TaskRecord) => {
    const parsedMinutes = Number(manualMinutes);

    if (!Number.isInteger(parsedMinutes) || parsedMinutes < 1) {
      setTimerError('Minutes worked must be a positive whole number.');
      return;
    }

    setIsSavingTimer(true);
    setTimerError('');

    try {
      await onCreateManualEntry({
        clientId: task.clientId,
        taskId: task.id,
        durationMinutes: parsedMinutes,
        description: manualDescription.trim() || undefined,
      });
      closeTimerOverlay();
    } catch (error) {
      setTimerError(error instanceof Error ? error.message : 'Unable to save manual entry');
    } finally {
      setIsSavingTimer(false);
    }
  };

  return (
    <>
      <div className="datatable-shell">
        <table ref={tableRef} className="display compact task-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Client</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Labels</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <div className="task-cell-main">
                    <div className="task-row-title">
                      <Link className="task-row-link" to={`/tasks/${task.id}`}>{task.title}</Link>
                      {activeTimer?.isRunning && activeTimer.taskId === task.id ? (
                        <span className="task-timer-live-indicator">
                          <span className="task-timer-live-dot" aria-hidden="true" />
                          <span>Timer running</span>
                        </span>
                      ) : null}
                    </div>
                    <small>Assigned to {task.user.name}</small>
                  </div>
                </td>
                <td>{task.client.name}</td>
                <td><TaskStatusBadge status={task.status} /></td>
                <td><TaskPriorityBadge priority={task.priority} /></td>
                <td className="task-label-cell">
                  <button
                    type="button"
                    className={`task-label-trigger${openLabelTaskId === task.id ? ' is-open' : ''}`}
                    aria-label={`Show labels for ${task.title}`}
                    aria-expanded={openLabelTaskId === task.id}
                    onClick={(event) => {
                      closeTimerOverlay();

                      if (openLabelTaskId === task.id) {
                        closeLabelOverlay();
                        return;
                      }

                      labelTriggerRef.current = event.currentTarget;
                      setSelectedLabelName('');
                      setOpenLabelTaskId(task.id);
                      setLabelOverlayPosition((current) => ({ ...current, visibility: 'hidden' }));
                    }}
                  >
                    <span>{getTaskLabelSummary(task)}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="task-label-trigger-icon">
                      <path d="m7 10 5 5 5-5" />
                    </svg>
                  </button>
                </td>
                <td>
                  <div className="table-actions task-table-actions">
                    <button
                      type="button"
                      className={`task-icon-action${openTimerTaskId === task.id || (activeTimer?.isRunning && activeTimer.taskId === task.id) ? ' is-active is-live' : ''}`}
                      aria-label={`Open timer actions for ${task.title}`}
                      title="Timer"
                      onClick={(event) => {
                        closeLabelOverlay();

                        if (openTimerTaskId === task.id) {
                          closeTimerOverlay();
                          return;
                        }

                        timerTriggerRef.current = event.currentTarget;
                        setTimerDescription(activeTimer?.taskId === task.id ? activeTimer.description || '' : '');
                        setManualMinutes('0');
                        setManualDescription('');
                        setTimerError('');
                        setOpenTimerTaskId(task.id);
                        setTimerOverlayPosition((current) => ({ ...current, visibility: 'hidden' }));
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M10 2h4M12 6v2m0 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 4v4l3 2" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="task-icon-action"
                      aria-label={`Edit ${task.title}`}
                      title="Edit"
                      onClick={() => {
                        closeLabelOverlay();
                        closeTimerOverlay();
                        onEdit(task);
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="task-icon-action task-icon-action-danger"
                      aria-label={`Delete ${task.title}`}
                      title="Delete"
                      onClick={() => {
                        closeLabelOverlay();
                        closeTimerOverlay();
                        onDelete(task);
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openLabelTask && typeof document !== 'undefined' ? createPortal(
        <div className="task-label-overlay" aria-hidden={false}>
          <div
            ref={labelOverlayRef}
            className="task-label-popover"
            role="dialog"
            aria-modal="false"
            aria-label="Task labels"
            style={labelOverlayPosition}
          >
            <div className="task-label-popover-head">
              <div>
                <div className="task-label-popover-title">Current labels</div>
                <div className="task-label-popover-subtitle">{openLabelTask.title}</div>
              </div>
              <button type="button" className="task-label-popover-close" onClick={closeLabelOverlay} aria-label="Close labels popover">
                &times;
              </button>
            </div>

            <div className="task-label-popover-section">
              <div className="task-label-chip-row task-label-chip-row-inline">
                {openLabelTask.labels.length > 0 ? openLabelTask.labels.map((label) => (
                  <span key={label.id} className="task-label-chip">
                    {label.name}
                    <button
                      type="button"
                      aria-label={`Remove ${label.name}`}
                      disabled={isSavingLabels}
                      onClick={() => {
                        void persistLabels(
                          openLabelTask,
                          openLabelTask.labels
                            .map((taskLabel) => taskLabel.name)
                            .filter((taskLabelName) => taskLabelName !== label.name),
                        );
                      }}
                    >
                      &times;
                    </button>
                  </span>
                )) : <span className="task-label-empty">No labels on this task.</span>}
              </div>
            </div>

            <div className="task-label-popover-section">
              <div className="task-label-menu-title">Add existing label</div>
              <div className="task-label-add-row">
                <select
                  className="task-label-select-inline"
                  value={selectedLabelName}
                  disabled={availableLabels.length === 0 || isSavingLabels}
                  onChange={(event) => setSelectedLabelName(event.target.value)}
                >
                  <option value="">{availableLabels.length > 0 ? 'Select a label' : 'No more labels in catalog'}</option>
                  {availableLabels.map((label) => <option key={label.id} value={label.name}>{label.name}</option>)}
                </select>
                <button
                  type="button"
                  className="task-label-add-button"
                  disabled={!selectedLabelName || isSavingLabels}
                  onClick={() => {
                    if (!selectedLabelName) {
                      return;
                    }

                    void persistLabels(
                      openLabelTask,
                      [...openLabelTask.labels.map((label) => label.name), selectedLabelName].sort((left, right) => left.localeCompare(right)),
                    );
                  }}
                >
                  {isSavingLabels ? 'Saving...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      ) : null}

      {openTimerTask && typeof document !== 'undefined' ? createPortal(
        <div className="task-label-overlay" aria-hidden={false}>
          <div
            ref={timerOverlayRef}
            className="task-timer-popover"
            role="dialog"
            aria-modal="false"
            aria-label="Task timer"
            style={timerOverlayPosition}
          >
            {activeTimer?.isRunning ? (
              <div className="task-timer-alert">
                <div className="task-timer-alert-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M10 2h4M12 6v2m0 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 4v4l3 2" />
                  </svg>
                </div>
                <div className="task-timer-alert-copy">
                  <strong>{timerIsActiveOnTask ? 'Timer running on this task' : 'Another task timer is currently running'}</strong>
                  <span>
                    {timerIsActiveOnTask
                      ? 'Starting again will restart this task session.'
                      : <>Starting here will switch from <span className="task-timer-source-task">{activeTimer.task.title}</span>.</>}
                  </span>
                </div>
              </div>
            ) : null}

            <div className="task-label-popover-head">
              <div>
                <div className="task-label-popover-title">Timer</div>
                <div className="task-label-popover-subtitle">{openTimerTask.title}</div>
              </div>
              <button type="button" className="task-label-popover-close" onClick={closeTimerOverlay} aria-label="Close timer popover">
                &times;
              </button>
            </div>

            <div className="task-timer-section">
              <div className="task-label-menu-title">Start timer</div>
              <label className="task-timer-field">
                <span>Optional note</span>
                <textarea
                  rows={3}
                  value={timerDescription}
                  onChange={(event) => setTimerDescription(event.target.value)}
                  placeholder="Add a quick note for the live session"
                  disabled={isSavingTimer}
                />
              </label>
              <button
                type="button"
                className="btn btn-primary task-timer-submit"
                disabled={isSavingTimer}
                onClick={() => {
                  void submitStartTimer(openTimerTask);
                }}
              >
                {isSavingTimer ? 'Starting...' : (timerIsActiveOnTask ? 'Restart timer' : 'Start timer')}
              </button>
            </div>

            <div className="task-timer-divider" />

            <div className="task-timer-section">
              <div className="task-label-menu-title">Manual entry</div>
              <div className="task-timer-grid">
                <label className="task-timer-field">
                  <span>Minutes worked</span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    inputMode="numeric"
                    value={manualMinutes}
                    onChange={(event) => setManualMinutes(event.target.value)}
                    disabled={isSavingTimer}
                  />
                </label>
                <label className="task-timer-field task-timer-field-wide">
                  <span>Description</span>
                  <textarea
                    rows={3}
                    value={manualDescription}
                    onChange={(event) => setManualDescription(event.target.value)}
                    placeholder="Optional note for this manual entry"
                    disabled={isSavingTimer}
                  />
                </label>
              </div>
              <button
                type="button"
                className="btn btn-secondary task-timer-submit"
                disabled={isSavingTimer}
                onClick={() => {
                  void submitManualEntry(openTimerTask);
                }}
              >
                {isSavingTimer ? 'Saving...' : 'Save entry'}
              </button>
            </div>

            {timerError ? <p className="feedback-message error task-timer-feedback">{timerError}</p> : null}
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
