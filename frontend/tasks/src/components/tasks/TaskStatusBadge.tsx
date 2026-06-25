import { statusLabel } from '../../lib/format';
import type { TaskPriority, TaskStatus } from '../../types';

const STATUS_CLASS: Record<TaskStatus, string> = {
  OPEN: 'status-pill status-pill-blue',
  IN_PROGRESS: 'status-pill status-pill-purple',
  TO_REVIEW: 'status-pill status-pill-orange',
  COMPLETED: 'status-pill status-pill-green',
  ON_HOLD: 'status-pill status-pill-muted',
};

const PRIORITY_CLASS: Record<TaskPriority, string> = {
  LOW: 'status-pill status-pill-blue',
  MEDIUM: 'status-pill status-pill-purple',
  HIGH: 'status-pill status-pill-red',
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return <span className={STATUS_CLASS[status]}>{statusLabel(status)}</span>;
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  return <span className={PRIORITY_CLASS[priority]}>{statusLabel(priority)}</span>;
}
