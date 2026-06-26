import { useEffect, useMemo, useState } from 'react';
import { ActivityItem } from './ActivityItem';
import type { TaskActivity } from '../../types';

const PAGE_SIZE = 10;

export function ActivityTimeline({ activity }: { activity: TaskActivity[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(activity.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [activity]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const visibleActivity = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return activity.slice(start, start + PAGE_SIZE);
  }, [activity, currentPage]);

  if (activity.length === 0) {
    return <div className="empty-state">No activity yet. New task updates will appear here.</div>;
  }

  return (
    <section className="activity-timeline-shell">
      <div className="activity-timeline">
        {visibleActivity.map((entry) => (
          <ActivityItem key={entry.id} activity={entry} />
        ))}
      </div>

      <footer className="activity-timeline-footer" aria-label="Activity pagination">
        <div className="activity-timeline-range">
          Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, activity.length)} of {activity.length} entries
        </div>
        <div className="activity-timeline-pager">
          <button
            type="button"
            className="btn btn-secondary activity-timeline-page-button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="activity-timeline-page-indicator status-pill status-pill-muted">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-secondary activity-timeline-page-button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </footer>
    </section>
  );
}
