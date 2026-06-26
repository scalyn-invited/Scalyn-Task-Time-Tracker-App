import type { ReportDataResponse, ReportFilters, ReportTableData, ReportTableRequest } from '../features/reports/report-types';

const TOKEN_KEY = 'sttt_access_token';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function buildAuthenticatedFileUrl(path: string): string {
  const token = getToken();
  const url = new URL(path, window.location.origin);

  if (token) {
    url.searchParams.set('accessToken', token);
  }

  return `${url.pathname}${url.search}`;
}

function buildHeaderAuthenticatedUrl(path: string): string {
  const url = new URL(path, window.location.origin);
  return `${url.pathname}${url.search}`;
}

function toQuery(filters: Partial<ReportFilters> & Partial<ReportTableRequest>): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === '') {
      continue;
    }

    search.set(key, String(value));
  }

  return search.toString();
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch (_error) {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }

    const message = typeof payload === 'object' && payload && 'message' in payload
      ? String((payload as { message?: unknown }).message ?? 'Request failed')
      : 'Request failed';

    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  return parseResponse<T>(response);
}

export async function requestReportData(filters: ReportFilters): Promise<ReportDataResponse> {
  return request<ReportDataResponse>(`/reports/data?${toQuery(filters)}`);
}

export async function requestReportTable(filters: ReportFilters, tableRequest: ReportTableRequest): Promise<ReportTableData> {
  return request<ReportTableData>(
    `/reports/data/table?${toQuery({ ...filters, ...tableRequest })}`,
  );
}

export async function fetchBlob(path: string): Promise<Blob> {
  const url = buildHeaderAuthenticatedUrl(path);
  const headers: HeadersInit = {
    Accept: 'application/octet-stream',
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(text || 'Unable to download report', response.status);
  }

  return response.blob();
}

export function downloadBlob(blob: Blob, filename: string): void {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
