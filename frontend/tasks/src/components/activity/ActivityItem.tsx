import { formatRelativeTime, initials } from '../../lib/format';
import type { TaskActivity } from '../../types';

function describeActivity(activity: TaskActivity): string {
  const fileName = typeof activity.metadata?.originalName === 'string' ? activity.metadata.originalName : null;

  switch (activity.action) {
    case 'TASK_CREATED':
      return 'created this task';
    case 'TASK_UPDATED':
      return 'updated task details';
    case 'TASK_STATUS_CHANGED':
      return `changed status to ${String(activity.metadata?.next || 'a new state')}`;
    case 'TASK_DESCRIPTION_UPDATED':
      return 'updated the task description';
    case 'TASK_ASSIGNED':
      return 'reassigned the task';
    case 'ATTACHMENT_UPLOADED':
      return `uploaded ${fileName ? `"${fileName}"` : 'an attachment'}`;
    case 'ATTACHMENT_DELETED':
      return `deleted ${fileName ? `"${fileName}"` : 'an attachment'}`;
    case 'COMMENT_ADDED':
      return 'added a comment';
    case 'COMMENT_REPLIED':
      return 'replied to a comment';
    case 'COMMENT_EDITED':
      return 'edited a comment';
    case 'COMMENT_DELETED':
      return 'deleted a comment';
    case 'TIMER_PAUSED':
      return `paused timer on ${activity.task.title}`;
    case 'TIMER_RESUMED':
      return `resumed timer on ${activity.task.title}`;
    case 'TIMER_STOPPED':
      return `stopped timer on ${activity.task.title}`;
    default:
      return 'made a change';
  }
}

export function ActivityItem({ activity }: { activity: TaskActivity }) {
  return (
    <article className="activity-item">
      <div className="task-avatar">{initials(activity.user.name)}</div>
      <div className="activity-copy">
        <strong>{activity.user.name}</strong>
        <p>{describeActivity(activity)}</p>
        <small>{formatRelativeTime(activity.createdAt)}</small>
      </div>
    </article>
  );
}
