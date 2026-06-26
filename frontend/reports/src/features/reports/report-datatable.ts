import DataTable from 'datatables.net-dt';
import type { ReportFilters, ReportTableData, ReportTableRequest, ReportTableRow } from './report-types';
import { fetchReportTable } from './report-service';

type ReportDataTableOptions = {
  getFilters: () => ReportFilters;
  onError: (message: string) => void;
};

const columnSortMap: Array<ReportTableRequest['sortBy']> = [
  'date',
  'client',
  'task',
  'teamMember',
  'startTime',
  'endTime',
  'duration',
  'description',
  'entryType',
];

export class ReportDataTablePanel {
  private instance: DataTable | null = null;

  constructor(
    private readonly table: HTMLTableElement,
    private readonly options: ReportDataTableOptions,
  ) {}

  init(): void {
    if (this.instance) {
      return;
    }

    this.instance = new DataTable(this.table, {
      serverSide: true,
      processing: true,
      searching: false,
      paging: true,
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100],
      order: [[0, 'desc']],
      responsive: false,
      ajax: async (request, callback) => {
        try {
          const filters = this.options.getFilters();
          const response = await fetchReportTable(filters, this.toTableRequest(request));
          callback(this.toDataTableResponse(response, request.draw));
        } catch (error) {
          this.options.onError(error instanceof Error ? error.message : 'Unable to load report table');
          callback({
            draw: request.draw,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: [],
          });
        }
      },
      columns: [
        { data: 'date' },
        { data: 'client' },
        { data: 'task' },
        { data: 'teamMember' },
        { data: 'startTime' },
        { data: 'endTime', render: (value: string | null) => value || '-' },
        { data: 'duration' },
        { data: 'description', render: (value: string) => value || 'No description' },
        { data: 'entryType' },
      ],
      columnDefs: [
        { targets: [6], className: 'report-table-mono' },
        { targets: [7], className: 'report-table-description' },
      ],
    });
  }

  reload(): void {
    this.instance?.ajax.reload(null, false);
  }

  destroy(): void {
    this.instance?.destroy();
    this.instance = null;
  }

  private toTableRequest(request: { draw: number; start: number; length: number; search: { value: string }; order: Array<{ column: number; dir: 'asc' | 'desc' }> }): ReportTableRequest {
    const sortIndex = request.order[0]?.column ?? 0;
    const sortBy = columnSortMap[sortIndex] ?? 'date';
    const pageSize = request.length || 10;

    return {
      draw: request.draw,
      page: Math.floor(request.start / pageSize) + 1,
      pageSize,
      search: request.search.value?.trim() ?? '',
      sortBy,
      sortDir: request.order[0]?.dir ?? 'desc',
    };
  }

  private toDataTableResponse(data: ReportTableData, draw: number) {
    return {
      draw,
      recordsTotal: data.totalRows,
      recordsFiltered: data.filteredRows,
      data: data.rows.map((row) => this.toRow(row)),
    };
  }

  private toRow(row: ReportTableRow) {
    return {
      date: row.date,
      client: row.client,
      task: row.task,
      teamMember: row.teamMember,
      startTime: row.startTime,
      endTime: row.endTime,
      duration: row.duration,
      description: row.description,
      entryType: row.entryType,
    };
  }
}
