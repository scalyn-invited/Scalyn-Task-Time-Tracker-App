import type { TimesheetEntry } from '../../types';
import { DataTable } from '../../../../../shared/components/DataTable';

const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Number(seconds || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, '0')).join(':');
};

interface TimesheetsTableProps {
  entries: TimesheetEntry[];
  selectedEntryIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onEdit: (entry: TimesheetEntry) => void;
  onDelete: (entry: TimesheetEntry) => void;
}

export function TimesheetsTable({ entries, selectedEntryIds, onSelectionChange, onEdit, onDelete }: TimesheetsTableProps) {
  return (
    <section className="card-panel timesheet-table-panel">
      <div className="panel-head"><div><h2>Time entries</h2></div></div>
      <DataTable
        data={entries}
        className="timesheet-table"
        emptyMessage="No time entries found."
        searchPlaceholder="Search time entries"
        order={[[1, 'desc']]}
        selectable
        getRowId={(entry) => entry.id}
        selectedRowIds={selectedEntryIds}
        onSelectionChange={onSelectionChange}
        columns={[
          {
            key: 'createdSort',
            title: 'Created sort',
            display: (entry) => String(new Date(entry.createdAt).getTime()),
            sortValue: (entry) => new Date(entry.createdAt).getTime(),
            searchable: false,
            visible: false,
          },
          {
            key: 'date',
            title: 'Date',
            display: (entry) => new Date(entry.startTime).toLocaleDateString(),
            sortValue: (entry) => new Date(entry.createdAt).getTime(),
            searchValue: (entry) => `${new Date(entry.startTime).toLocaleDateString()} ${new Date(entry.startTime).toLocaleString()}`,
          },
          { key: 'task', title: 'Task', display: (entry) => entry.task.title, searchValue: (entry) => entry.task.title },
          { key: 'client', title: 'Client', display: (entry) => entry.client.name, searchValue: (entry) => entry.client.name },
          { key: 'duration', title: 'Duration', display: (entry) => formatDuration(entry.durationSeconds), sortValue: (entry) => entry.durationSeconds },
          { key: 'description', title: 'Description', display: (entry) => entry.description || 'No description', searchValue: (entry) => entry.description || 'No description' },
        ]}
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
