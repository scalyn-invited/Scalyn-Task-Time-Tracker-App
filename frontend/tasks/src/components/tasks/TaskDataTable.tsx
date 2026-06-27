import { useEffect, useRef, useState } from 'react';
import DataTable from 'datatables.net-dt';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { TaskPriorityBadge, TaskStatusBadge } from './TaskStatusBadge';
import { TaskFieldPopover } from './TaskFieldPopover';
import { formatDuration } from '../../lib/format';
import { TableActionIconButton } from '../../../../shared/components/TableActionIconButton';
import type { TaskFormValues, TaskLabel, TaskRecord, TimeEntry } from '../../types';

interface TaskDataTableProps {
  tasks: TaskRecord[];
  labels: TaskLabel[];
  activeTimer: TimeEntry | null;
  selectedTaskIds: number[];
  onSelectionChange: (taskIds: number[]) => void;
  onEdit: (task: TaskRecord) => void;
  onDelete: (task: TaskRecord) => void;
  onUpdateLabels: (task: TaskRecord, labels: string[]) => Promise<void>;
  onUpdateTask: (task: TaskRecord, values: Partial<Pick<TaskFormValues, 'status' | 'priority'>>) => Promise<void>;
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

export function TaskDataTable({
  tasks,
  labels,
  activeTimer,
  selectedTaskIds,
  onSelectionChange,
  onEdit,
  onDelete,
  onUpdateLabels,
  onUpdateTask,
  overlayDismissKey,
}: TaskDataTableProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dataTableRef = useRef<DataTable | null>(null);
  const labelOverlayRef = useRef<HTMLDivElement | null>(null);
  const labelTriggerRef = useRef<HTMLButtonElement | null>(null);
  const fieldTriggerRef = useRef<HTMLButtonElement | null>(null);

  const [openLabelTaskId, setOpenLabelTaskId] = useState<number | null>(null);
  const [selectedLabelName, setSelectedLabelName] = useState('');
  const [isSavingLabels, setIsSavingLabels] = useState(false);
  const [labelOverlayPosition, setLabelOverlayPosition] = useState<OverlayPosition>(hiddenOverlayPosition);
  const [, setTimerNow] = useState(Date.now());
  const [openFieldEditor, setOpenFieldEditor] = useState<{ taskId: number; field: 'status' | 'priority' } | null>(null);

  const openLabelTask = openLabelTaskId === null ? null : tasks.find((task) => task.id === openLabelTaskId) || null;
  const availableLabels = openLabelTask
    ? labels.filter((label) => !openLabelTask.labels.some((taskLabel) => taskLabel.name === label.name))
    : [];
  const activeTimerElapsedSeconds = activeTimer?.status !== 'completed' ? getCurrentElapsed(activeTimer) : 0;
  const openFieldTask = openFieldEditor === null ? null : tasks.find((task) => task.id === openFieldEditor.taskId) || null;

  const closeLabelOverlay = () => {
    setOpenLabelTaskId(null);
    setSelectedLabelName('');
    setIsSavingLabels(false);
    labelTriggerRef.current = null;
    setLabelOverlayPosition(hiddenOverlayPosition);
  };

  const closeFieldEditor = () => {
    setOpenFieldEditor(null);
    fieldTriggerRef.current = null;
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
      closeFieldEditor();
    };

    instance.on('draw', handleDraw);

    return () => {
      instance.off('draw', handleDraw);
      closeLabelOverlay();
      closeFieldEditor();
      dataTableRef.current?.destroy();
      dataTableRef.current = null;
    };
  }, [tasks]);

  useEffect(() => {
    closeLabelOverlay();
    closeFieldEditor();
  }, [overlayDismissKey]);

  useEffect(() => {
    if (openFieldEditor && !openFieldTask) {
      closeFieldEditor();
    }
  }, [openFieldEditor, openFieldTask]);

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
    if (activeTimer?.status !== 'running') {
      setTimerNow(Date.now());
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTimerNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [activeTimer?.id, activeTimer?.status, activeTimer?.startTime, activeTimer?.pausedAt, activeTimer?.totalPausedSeconds]);

  const persistLabels = async (task: TaskRecord, nextLabels: string[]) => {
    setIsSavingLabels(true);
    try {
      await onUpdateLabels(task, nextLabels);
      closeLabelOverlay();
    } finally {
      setIsSavingLabels(false);
    }
  };

  const submitFieldUpdate = async (task: TaskRecord, field: 'status' | 'priority', nextValue: string) => {
    if (field === 'status') {
      await onUpdateTask(task, { status: nextValue as TaskRecord['status'] });
      closeFieldEditor();
      return;
    }

    await onUpdateTask(task, { priority: nextValue as TaskRecord['priority'] });
    closeFieldEditor();
  };

  return (
    <>
      <div className="datatable-shell">
        <table ref={tableRef} className="display compact task-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={tasks.length > 0 && tasks.every((task) => selectedTaskIds.includes(task.id))}
                  onChange={(event) => onSelectionChange(event.target.checked ? tasks.map((task) => task.id) : [])}
                  aria-label="Select all tasks"
                />
              </th>
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
                  <input
                    type="checkbox"
                    checked={selectedTaskIds.includes(task.id)}
                    onChange={(event) => {
                      onSelectionChange(
                        event.target.checked
                          ? [...new Set([...selectedTaskIds, task.id])]
                          : selectedTaskIds.filter((id) => id !== task.id),
                      );
                    }}
                    aria-label={`Select ${task.title}`}
                  />
                </td>
                <td>
                  <div className="task-cell-main">
                    <div className="task-row-title">
                      <Link className="task-row-link" to={`/tasks/${task.id}`}>{task.title}</Link>
                      {activeTimer?.status !== 'completed' && activeTimer?.taskId === task.id ? (
                        <span className={`task-timer-live-indicator${activeTimer.status === 'paused' ? ' is-paused' : ''}`}>
                          <span className="task-timer-live-dot" aria-hidden="true" />
                          <span>
                            {activeTimer.status === 'paused' ? 'Timer paused' : 'Timer running'} {formatDuration(activeTimerElapsedSeconds)}
                          </span>
                        </span>
                      ) : null}
                    </div>
                    <small>Assigned to {task.user.name}</small>
                  </div>
                </td>
                <td>{task.client.name}</td>
                <td>
                  <TaskStatusBadge
                    status={task.status}
                    onClick={(event) => {
                      closeLabelOverlay();
                      closeFieldEditor();

                      if (openFieldEditor?.taskId === task.id && openFieldEditor.field === 'status') {
                        closeFieldEditor();
                        return;
                      }

                      fieldTriggerRef.current = event.currentTarget;
                      setOpenFieldEditor((current) => (current?.taskId === task.id && current.field === 'status' ? null : { taskId: task.id, field: 'status' }));
                    }}
                    isActive={openFieldEditor?.taskId === task.id && openFieldEditor.field === 'status'}
                    ariaLabel={`Update status for ${task.title}`}
                  />
                </td>
                <td>
                  <TaskPriorityBadge
                    priority={task.priority}
                    onClick={(event) => {
                      closeLabelOverlay();
                      closeFieldEditor();

                      if (openFieldEditor?.taskId === task.id && openFieldEditor.field === 'priority') {
                        closeFieldEditor();
                        return;
                      }

                      fieldTriggerRef.current = event.currentTarget;
                      setOpenFieldEditor((current) => (current?.taskId === task.id && current.field === 'priority' ? null : { taskId: task.id, field: 'priority' }));
                    }}
                    isActive={openFieldEditor?.taskId === task.id && openFieldEditor.field === 'priority'}
                    ariaLabel={`Update priority for ${task.title}`}
                  />
                </td>
                <td className="task-label-cell">
                  <button
                    type="button"
                    className={`task-label-trigger${openLabelTaskId === task.id ? ' is-open' : ''}`}
                    aria-label={`Show labels for ${task.title}`}
                    aria-expanded={openLabelTaskId === task.id}
                    onClick={(event) => {
                      closeFieldEditor();

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
                  <div className="table-action-group">
                    <TableActionIconButton
                      action="edit"
                      label={`Edit ${task.title}`}
                      title="Edit"
                      onClick={() => {
                        closeLabelOverlay();
                        closeFieldEditor();
                        onEdit(task);
                      }}
                    />
                    <TableActionIconButton
                      action="delete"
                      label={`Delete ${task.title}`}
                      title="Delete"
                      variant="danger"
                      onClick={() => {
                        closeLabelOverlay();
                        closeFieldEditor();
                        onDelete(task);
                      }}
                    />
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

      {openFieldTask ? (
        <TaskFieldPopover
          open={Boolean(openFieldEditor)}
          field={openFieldEditor?.field || 'status'}
          taskTitle={openFieldTask.title}
          value={openFieldEditor?.field === 'priority' ? openFieldTask.priority : openFieldTask.status}
          anchorRef={fieldTriggerRef}
          onClose={closeFieldEditor}
          onSave={(nextValue) => submitFieldUpdate(openFieldTask, openFieldEditor?.field || 'status', nextValue)}
        />
      ) : null}
    </>
  );
}
