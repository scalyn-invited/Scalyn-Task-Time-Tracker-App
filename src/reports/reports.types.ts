import type { Client, Task, TimeEntry, TimeEntryStatus, User } from '../generated/prisma';

export type ReportPreset =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom';

export type ReportEntryTypeFilter = 'all' | 'timer' | 'manual';

export type ReportBillableFilter = 'all' | 'true' | 'false';

export type ReportSortField =
  | 'date'
  | 'client'
  | 'task'
  | 'teamMember'
  | 'startTime'
  | 'endTime'
  | 'duration'
  | 'description'
  | 'entryType';

export interface ReportUserScope {
  canSeeWorkspaceData: boolean;
}

export interface ReportRange {
  from: Date;
  to: Date;
  label: string;
}

export interface ReportFilters {
  preset: ReportPreset;
  from?: string;
  to?: string;
  clientId?: number;
  taskId?: number;
  userId?: number;
  entryType: ReportEntryTypeFilter;
  status?: TimeEntryStatus | 'all';
  billable: ReportBillableFilter;
  search: string;
  page: number;
  pageSize: number;
  sortBy: ReportSortField;
  sortDir: 'asc' | 'desc';
}

export type ReportEntryWithRelations = TimeEntry & {
  client: Pick<Client, 'id' | 'name' | 'billable'>;
  task: Pick<Task, 'id' | 'title'>;
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
};

export interface ReportTableRow {
  id: number;
  date: string;
  client: string;
  task: string;
  teamMember: string;
  startTime: string;
  endTime: string | null;
  duration: string;
  durationSeconds: number;
  description: string;
  entryType: string;
  status: TimeEntryStatus;
  billable: boolean;
}

export interface ReportSummary {
  totalHours: number;
  totalTimeEntries: number;
  activeClients: number;
  activeTasks: number;
}

export interface ReportSeriesPoint {
  label: string;
  value: number;
}

export interface ReportChartData {
  hoursPerDay: ReportSeriesPoint[];
  hoursPerWeek: ReportSeriesPoint[];
  hoursPerClient: ReportSeriesPoint[];
  hoursPerTask: ReportSeriesPoint[];
}

export interface ReportOptionItem {
  id: number;
  label: string;
}

export interface ReportOptionData {
  clients: ReportOptionItem[];
  tasks: ReportOptionItem[];
  teamMembers: ReportOptionItem[];
}

export interface ReportTableData {
  rows: ReportTableRow[];
  totalRows: number;
  filteredRows: number;
  page: number;
  pageSize: number;
  draw: number;
}

export interface ReportDataResponse {
  range: {
    from: string;
    to: string;
    label: string;
  };
  filters: ReportFilters;
  summary: ReportSummary;
  charts: ReportChartData;
  options: ReportOptionData;
  table: ReportTableData;
}

export interface ReportExportPayload {
  filters: ReportFilters;
  rows: ReportTableRow[];
  summary: ReportSummary;
  range: ReportRange;
}
