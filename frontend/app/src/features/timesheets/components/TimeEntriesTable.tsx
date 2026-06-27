import type { TimesheetEntry } from '../../types';
import { DataTable } from '../../../../../shared/components/DataTable';

const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Number(seconds || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, '0')).join(':');
};

interface TimeEntriesTableProps {
  entries: TimesheetEntry[];
  selectedEntryIds?: number[];
  onSelectionChange?: (ids: number[]) => void;
  onEdit: (entry: TimesheetEntry) => void;
  onDelete: (entry: TimesheetEntry) => void;
  showTaskColumn?: boolean;
  selectable?: boolean;
  title?: string;
}

export function TimeEntriesTable({
  entries,
  selectedEntryIds = [],
  onSelectionChange,
  onEdit,
  onDelete,
  showTaskColumn = true,
  selectable = false,
  title = 'Time entries',
}: TimeEntriesTableProps) {
  const columns = [
    {
      key: 'createdSort',
      title: 'Created sort',
      display: (entry: TimesheetEntry) => String(new Date(entry.createdAt).getTime()),
      sortValue: (entry: TimesheetEntry) => new Date(entry.createdAt).getTime(),
      searchable: false,
      visible: false,
    },
    {
      key: 'date',
      title: 'Date',
      display: (entry: TimesheetEntry) => new Date(entry.startTime).toLocaleDateString(),
      sortValue: (entry: TimesheetEntry) => new Date(entry.createdAt).getTime(),
      searchValue: (entry: TimesheetEntry) => `${new Date(entry.startTime).toLocaleDateString()} ${new Date(entry.startTime).toLocaleString()}`,
    },
    ...(showTaskColumn
      ? [{ key: 'task', title: 'Task', display: (entry: TimesheetEntry) => entry.task.title, searchValue: (entry: TimesheetEntry) => entry.task.title }]
      : []),
    { key: 'client', title: 'Client', display: (entry: TimesheetEntry) => entry.client.name, searchValue: (entry: TimesheetEntry) => entry.client.name },
    { key: 'duration', title: 'Duration', display: (entry: TimesheetEntry) => formatDuration(entry.durationSeconds), sortValue: (entry: TimesheetEntry) => entry.durationSeconds },
    { key: 'description', title: 'Description', display: (entry: TimesheetEntry) => entry.description || 'No description', searchValue: (entry: TimesheetEntry) => entry.description || 'No description' },
  ];

  return (
    <section className="card-panel timesheet-table-panel">
      <div className="panel-head"><div><h2>{title}</h2></div></div>
      <DataTable
        data={entries}
        className="timesheet-table"
        emptyMessage="No time entries found."
        searchPlaceholder="Search time entries"
        order={[[1, 'desc']]}
        selectable={selectable}
        getRowId={(entry) => entry.id}
        selectedRowIds={selectedEntryIds}
        onSelectionChange={onSelectionChange}
        columns={columns}
        actions={[
          {
            action: 'edit',
            label: (entry) => `Edit time entry ${entry.id}`,
            title: 'Edit',
            onClick: (entry) => onEdit(entry),
          },
          {
            action: 'delete',
            label: (entry) => `Delete time entry ${entry.id}`,
            title: 'Delete',
            variant: 'danger',
            onClick: (entry) => onDelete(entry),
          },
        ]}
      />
    </section>
  );
}
