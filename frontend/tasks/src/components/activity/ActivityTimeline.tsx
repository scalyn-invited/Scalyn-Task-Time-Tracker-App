import { ActivityItem } from './ActivityItem';
import type { TaskActivity } from '../../types';

export function ActivityTimeline({ activity }: { activity: TaskActivity[] }) {
  if (activity.length === 0) {
    return <div className="empty-state">No activity yet. New task updates will appear here.</div>;
  }

  return (
    <div className="activity-timeline">
      {activity.map((entry) => (
        <ActivityItem key={entry.id} activity={entry} />
      ))}
    </div>
  );
}
