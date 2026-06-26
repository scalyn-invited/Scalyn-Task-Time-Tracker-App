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

export interface ReportFilters {
  preset: ReportPreset;
  from?: string;
  to?: string;
  clientId?: number;
  taskId?: number;
  userId?: number;
  entryType: ReportEntryTypeFilter;
  status: 'all' | 'RUNNING' | 'PAUSED' | 'COMPLETED';
  billable: ReportBillableFilter;
  search: string;
  page: number;
  pageSize: number;
  sortBy: ReportSortField;
  sortDir: 'asc' | 'desc';
}

export interface ReportSummary {
  totalHours: number;
  totalTimeEntries: number;
  activeClients: number;
  activeTasks: number;
}

export interface ReportChartPoint {
  label: string;
  value: number;
}

export interface ReportCharts {
  hoursPerDay: ReportChartPoint[];
  hoursPerWeek: ReportChartPoint[];
  hoursPerClient: ReportChartPoint[];
  hoursPerTask: ReportChartPoint[];
}

export interface ReportOptionItem {
  id: number;
  label: string;
}

export interface ReportOptions {
  clients: ReportOptionItem[];
  tasks: ReportOptionItem[];
  teamMembers: ReportOptionItem[];
}

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
  status: 'RUNNING' | 'PAUSED' | 'COMPLETED';
  billable: boolean;
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
  charts: ReportCharts;
  options: ReportOptions;
  table: ReportTableData;
}

export interface ReportTableRequest {
  draw: number;
  page: number;
  pageSize: number;
  search: string;
  sortBy: ReportSortField;
  sortDir: 'asc' | 'desc';
}
