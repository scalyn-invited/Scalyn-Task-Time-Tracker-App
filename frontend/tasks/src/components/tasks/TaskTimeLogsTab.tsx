import { TimeEntriesTable } from '../../../../app/src/features/timesheets/components/TimeEntriesTable';
import type { TimeEntry } from '../../types';

interface TaskTimeLogsTabProps {
  entries: TimeEntry[];
  loading: boolean;
  onEdit: (entry: TimeEntry) => void;
  onDelete: (entry: TimeEntry) => void;
}

export function TaskTimeLogsTab({ entries, loading, onEdit, onDelete }: TaskTimeLogsTabProps) {
  if (loading) {
    return <div className="empty-state">Loading time logs...</div>;
  }

  return (
    <TimeEntriesTable
      entries={entries as never[]}
      onEdit={(entry) => onEdit(entry as unknown as TimeEntry)}
      onDelete={(entry) => onDelete(entry as unknown as TimeEntry)}
      showTaskColumn={false}
      selectable={false}
      title="Time logs"
    />
  );
}
