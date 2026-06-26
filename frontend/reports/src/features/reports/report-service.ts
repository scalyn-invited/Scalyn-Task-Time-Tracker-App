import { downloadBlob, fetchBlob, request } from '../../lib/api';
import type {
  ReportDataResponse,
  ReportFilters,
  ReportTableData,
  ReportTableRequest,
} from './report-types';

export async function fetchReportData(filters: ReportFilters): Promise<ReportDataResponse> {
  return request<ReportDataResponse>(`/reports/data?${toQuery(filters)}`);
}

export async function fetchReportTable(filters: ReportFilters, tableRequest: ReportTableRequest): Promise<ReportTableData> {
  return request<ReportTableData>(`/reports/data/table?${toQuery({ ...filters, ...tableRequest })}`);
}

export async function downloadReport(path: string, filename: string): Promise<void> {
  const blob = await fetchBlob(path);
  downloadBlob(blob, filename);
}

export function buildExportPath(kind: string, format: 'csv' | 'pdf', filters: ReportFilters): string {
  const params = toQuery(filters);

  if (kind === 'selected-client' && filters.clientId) {
    return `/reports/export/client/${filters.clientId}/${format}?${params}`;
  }

  return `/reports/export/${kind}/${format}?${params}`;
}

export function buildExportFilename(kind: string, format: 'csv' | 'pdf', filters: ReportFilters, clientName?: string): string {
  const date = new Date().toISOString().slice(0, 10);

  if (kind === 'selected-client') {
    const slug = slugify(clientName) ?? `client-${filters.clientId ?? 'report'}`;
    return `${slug}-${date}.${format}`;
  }

  if (kind === 'client-summary') {
    return `client-summary-${date}.${format}`;
  }

  if (kind === 'task-summary') {
    return `task-summary-${date}.${format}`;
  }

  if (kind === 'team-summary') {
    return `team-summary-${date}.${format}`;
  }

  return `time-report-${date}.${format}`;
}

function toQuery(values: Record<string, unknown>): string {
  const search = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    search.set(key, String(value));
  });

  return search.toString();
}

function slugify(value?: string): string | null {
  if (!value) {
    return null;
  }

  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug.length > 0 ? slug : null;
}
