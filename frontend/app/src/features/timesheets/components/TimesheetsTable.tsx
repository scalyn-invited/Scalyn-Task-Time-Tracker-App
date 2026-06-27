import type { TimesheetEntry } from '../../types';
import { TimeEntriesTable } from './TimeEntriesTable';

interface TimesheetsTableProps {
  entries: TimesheetEntry[];
  selectedEntryIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onEdit: (entry: TimesheetEntry) => void;
  onDelete: (entry: TimesheetEntry) => void;
}

export function TimesheetsTable({ entries, selectedEntryIds, onSelectionChange, onEdit, onDelete }: TimesheetsTableProps) {
  return (
    <TimeEntriesTable
      entries={entries}
      selectedEntryIds={selectedEntryIds}
      onSelectionChange={onSelectionChange}
      onEdit={onEdit}
      onDelete={onDelete}
      showTaskColumn
      selectable
      title="Time entries"
    />
  );
}
