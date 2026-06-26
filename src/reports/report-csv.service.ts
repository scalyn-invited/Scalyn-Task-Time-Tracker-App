import { Injectable } from '@nestjs/common';
import { format } from '@fast-csv/format';
import type { ReportExportPayload, ReportTableRow } from './reports.types';

type CsvRow = Record<string, string | number | boolean | null>;

@Injectable()
export class ReportCsvService {
  async buildDetailedCsv(payload: ReportExportPayload): Promise<Buffer> {
    return this.toCsvBuffer(
      payload.rows.map((row) => this.toDetailedRow(row)),
    );
  }

  async buildClientSummaryCsv(payload: ReportExportPayload): Promise<Buffer> {
    return this.toCsvBuffer(this.groupByClient(payload.rows));
  }

  async buildSelectedClientCsv(payload: ReportExportPayload): Promise<Buffer> {
    return this.toCsvBuffer(
      payload.rows.map((row) => this.toSelectedClientRow(row, payload)),
    );
  }

  async buildTaskSummaryCsv(payload: ReportExportPayload): Promise<Buffer> {
    return this.toCsvBuffer(this.groupByTask(payload.rows));
  }

  async buildTeamSummaryCsv(payload: ReportExportPayload): Promise<Buffer> {
    return this.toCsvBuffer(this.groupByTeam(payload.rows));
  }

  private toDetailedRow(row: ReportTableRow): CsvRow {
    return {
      Date: row.date,
      Client: row.client,
      Task: row.task,
      'Team Member': row.teamMember,
      'Start Time': row.startTime,
      'End Time': row.endTime ?? '',
      Duration: row.duration,
      Description: row.description,
      'Entry Type': row.entryType,
    };
  }

  private toSelectedClientRow(row: ReportTableRow, payload: ReportExportPayload): CsvRow {
    return {
      Client: payload.rows.length > 0 ? payload.rows[0].client : '',
      Date: row.date,
      Task: row.task,
      'Team Member': row.teamMember,
      'Start Time': row.startTime,
      'End Time': row.endTime ?? '',
      Duration: row.duration,
      Description: row.description,
      'Entry Type': row.entryType,
    };
  }

  private groupByClient(rows: ReportTableRow[]): CsvRow[] {
    const groups = new Map<string, { tasks: Set<string>; entries: number; hours: number }>();

    for (const row of rows) {
      const existing = groups.get(row.client) ?? {
        tasks: new Set<string>(),
        entries: 0,
        hours: 0,
      };

      existing.tasks.add(row.task);
      existing.entries += 1;
      existing.hours += row.durationSeconds / 3600;
      groups.set(row.client, existing);
    }

    return [...groups.entries()]
      .map(([client, group]) => ({
        Client: client,
        'Number of Tasks': group.tasks.size,
        'Total Time Entries': group.entries,
        'Total Hours': Number(group.hours.toFixed(2)),
      }))
      .sort((left, right) => String(left.Client).localeCompare(String(right.Client)));
  }

  private groupByTask(rows: ReportTableRow[]): CsvRow[] {
    const groups = new Map<string, { client: string; entries: number; hours: number }>();

    for (const row of rows) {
      const existing = groups.get(row.task) ?? {
        client: row.client,
        entries: 0,
        hours: 0,
      };

      existing.entries += 1;
      existing.hours += row.durationSeconds / 3600;
      groups.set(row.task, existing);
    }

    return [...groups.entries()]
      .map(([task, group]) => ({
        Task: task,
        Client: group.client,
        'Total Hours': Number(group.hours.toFixed(2)),
        'Number of Entries': group.entries,
      }))
      .sort((left, right) => String(left.Task).localeCompare(String(right.Task)));
  }

  private groupByTeam(rows: ReportTableRow[]): CsvRow[] {
    const groups = new Map<string, { tasks: Set<string>; entries: number; hours: number }>();

    for (const row of rows) {
      const existing = groups.get(row.teamMember) ?? {
        tasks: new Set<string>(),
        entries: 0,
        hours: 0,
      };

      existing.tasks.add(row.task);
      existing.entries += 1;
      existing.hours += row.durationSeconds / 3600;
      groups.set(row.teamMember, existing);
    }

    return [...groups.entries()]
      .map(([teamMember, group]) => ({
        'Team Member': teamMember,
        'Total Hours': Number(group.hours.toFixed(2)),
        'Number of Tasks': group.tasks.size,
        'Number of Entries': group.entries,
      }))
      .sort((left, right) => String(left['Team Member']).localeCompare(String(right['Team Member'])));
  }

  private toCsvBuffer(rows: CsvRow[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const csvStream = format({ headers: true });

      csvStream.on('error', reject);
      csvStream.on('data', (chunk: Buffer | string) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, 'utf8'));
      });
      csvStream.on('end', () => resolve(Buffer.concat(chunks)));

      rows.forEach((row) => csvStream.write(row));
      csvStream.end();
    });
  }
}
