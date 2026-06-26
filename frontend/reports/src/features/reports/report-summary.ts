import type { ReportSummary } from './report-types';

export class ReportSummaryCards {
  constructor(private readonly container: HTMLElement) {}

  render(summary: ReportSummary): void {
    this.container.innerHTML = `
      <article class="stat-card stat-card-blue report-stat-card">
        <div class="stat-card-head">Total Hours</div>
        <div class="stat-card-body">
          <div>
            <strong>${summary.totalHours.toFixed(2)}</strong>
            <span>Across the active filter set</span>
          </div>
        </div>
      </article>
      <article class="stat-card stat-card-green report-stat-card">
        <div class="stat-card-head">Time Entries</div>
        <div class="stat-card-body">
          <div>
            <strong>${summary.totalTimeEntries.toLocaleString()}</strong>
            <span>Matching all current filters</span>
          </div>
        </div>
      </article>
      <article class="stat-card stat-card-purple report-stat-card">
        <div class="stat-card-head">Active Clients</div>
        <div class="stat-card-body">
          <div>
            <strong>${summary.activeClients.toLocaleString()}</strong>
            <span>Clients represented in the report</span>
          </div>
        </div>
      </article>
      <article class="stat-card stat-card-orange report-stat-card">
        <div class="stat-card-head">Active Tasks</div>
        <div class="stat-card-body">
          <div>
            <strong>${summary.activeTasks.toLocaleString()}</strong>
            <span>Tasks represented in the report</span>
          </div>
        </div>
      </article>
    `;
  }
}
