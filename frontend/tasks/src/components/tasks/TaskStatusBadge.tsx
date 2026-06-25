import { statusLabel } from '../../lib/format';
import type { TaskPriority, TaskStatus } from '../../types';
import type { MouseEventHandler } from 'react';

export interface TaskBadgeOption<T extends string> {
  value: T;
  className: string;
}

export const STATUS_OPTIONS: TaskBadgeOption<TaskStatus>[] = [
  { value: 'OPEN', className: 'status-pill status-pill-blue' },
  { value: 'IN_PROGRESS', className: 'status-pill status-pill-purple' },
  { value: 'TO_REVIEW', className: 'status-pill status-pill-orange' },
  { value: 'COMPLETED', className: 'status-pill status-pill-green' },
  { value: 'ON_HOLD', className: 'status-pill status-pill-muted' },
];

export const PRIORITY_OPTIONS: TaskBadgeOption<TaskPriority>[] = [
  { value: 'LOW', className: 'status-pill status-pill-blue' },
  { value: 'MEDIUM', className: 'status-pill status-pill-purple' },
  { value: 'HIGH', className: 'status-pill status-pill-red' },
];

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

interface TaskBadgeProps {
  className?: string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
}

function renderBadge(
  value: TaskStatus | TaskPriority,
  className: string,
  props: TaskBadgeProps = {},
) {
  const content = (
    <>
      <span>{statusLabel(value)}</span>
      {props.onClick ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="task-pill-caret">
          <path d="m7 10 5 5 5-5" />
        </svg>
      ) : null}
    </>
  );

  const combinedClassName = `${className} task-pill-button${props.onClick ? ' is-interactive' : ''}${props.isActive ? ' is-active' : ''}${props.className ? ` ${props.className}` : ''}`;

  if (props.onClick) {
    return (
      <button
        type="button"
        className={combinedClassName}
        onClick={props.onClick}
        aria-label={props.ariaLabel || `${statusLabel(value)}`}
        aria-haspopup="dialog"
      >
        {content}
      </button>
    );
  }

  return <span className={combinedClassName}>{content}</span>;
}

export function TaskStatusBadge({ status, ...props }: { status: TaskStatus } & TaskBadgeProps) {
  return renderBadge(status, STATUS_CLASS[status], props);
}

export function TaskPriorityBadge({ priority, ...props }: { priority: TaskPriority } & TaskBadgeProps) {
  return renderBadge(priority, PRIORITY_CLASS[priority], props);
}
