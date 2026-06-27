import { ReportChartsPanel } from './report-charts';
import { ExportDropdown, type ReportExportKind } from './export-dropdown';
import { ReportDataTablePanel } from './report-datatable';
import { ReportFiltersPanel } from './report-filters';
import { ReportSummaryCards } from './report-summary';
import type { ReportDataResponse, ReportFilters } from './report-types';
import { buildExportFilename, buildExportPath, downloadReport, fetchReportData } from './report-service';

export class ReportsPage {
  private filters!: ReportFilters;
  private reportData: ReportDataResponse | null = null;
  private readonly summaryPanel: ReportSummaryCards;
  private readonly chartsPanel: ReportChartsPanel;
  private readonly exportPanel: ExportDropdown;
  private readonly tablePanel: ReportDataTablePanel;
  private readonly filterPanel: ReportFiltersPanel;
  private isLoading = false;
  private notificationTimer: number | null = null;

  constructor(private readonly root: HTMLElement) {
    this.root.innerHTML = this.renderShell();

    const filtersContainer = this.root.querySelector<HTMLElement>('[data-report-filters]');
    const summaryContainer = this.root.querySelector<HTMLElement>('[data-report-summary]');
    const chartsContainer = this.root.querySelector<HTMLElement>('[data-report-charts]');
    const exportContainer = this.root.querySelector<HTMLElement>('[data-export-slot]');
    const tableElement = this.root.querySelector<HTMLTableElement>('[data-report-table]');
    const notification = this.root.querySelector<HTMLElement>('[data-notification]');

    if (!filtersContainer || !summaryContainer || !chartsContainer || !exportContainer || !tableElement || !notification) {
      throw new Error('Reports shell failed to mount');
    }

    this.summaryPanel = new ReportSummaryCards(summaryContainer);
    this.chartsPanel = new ReportChartsPanel(chartsContainer);
    this.filters = this.defaultFilters();
    this.exportPanel = new ExportDropdown(exportContainer, () => this.filters, {
      onExport: async (kind, format) => {
        await this.handleExport(kind, format);
      },
    });
    this.tablePanel = new ReportDataTablePanel(tableElement, {
      getFilters: () => this.filters,
      onError: (message) => this.showNotification(message, 'error'),
    });
    this.filterPanel = new ReportFiltersPanel(filtersContainer, {
      clients: [],
      tasks: [],
      teamMembers: [],
    }, this.filters, {
      onChange: (nextFilters) => {
        this.filters = nextFilters;
        this.onFiltersChanged();
      },
    });

    this.notificationTarget = notification;
    this.filterPanel.render();
    this.summaryPanel.render({
      totalHours: 0,
      totalTimeEntries: 0,
      activeClients: 0,
      activeTasks: 0,
    });
    this.chartsPanel.render({
      hoursPerDay: [],
      hoursPerWeek: [],
      hoursPerClient: [],
      hoursPerTask: [],
    });
    this.exportPanel.render();
  }

  private notificationTarget: HTMLElement;

  async start(): Promise<void> {
    this.setLoading(true);
    try {
      const snapshot = await fetchReportData(this.filters);
      this.applySnapshot(snapshot);
      this.tablePanel.init();
      this.exportPanel.render();
    } catch (error) {
      this.showNotification(error instanceof Error ? error.message : 'Unable to load reports', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  destroy(): void {
    this.tablePanel.destroy();
    this.chartsPanel.destroy();
    this.filterPanel.destroy();
    this.exportPanel.destroy();
    if (this.notificationTimer !== null) {
      window.clearTimeout(this.notificationTimer);
      this.notificationTimer = null;
    }
  }

  private async onFiltersChanged(): Promise<void> {
    this.exportPanel.render();
    this.tablePanel.reload();
    this.setLoading(true);

    try {
      const snapshot = await fetchReportData(this.filters);
      this.applySnapshot(snapshot);
    } catch (error) {
      this.showNotification(error instanceof Error ? error.message : 'Unable to refresh reports', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  private applySnapshot(snapshot: ReportDataResponse): void {
    this.reportData = snapshot;
    this.filters = snapshot.filters;
    this.filterPanel.setOptions(snapshot.options);
    this.filterPanel.setFilters(snapshot.filters);
    this.summaryPanel.render(snapshot.summary);
    this.chartsPanel.render(snapshot.charts);
    this.exportPanel.render();
  }

  private async handleExport(kind: ReportExportKind, format: 'csv' | 'pdf'): Promise<void> {
    if (!this.filters) {
      return;
    }

    if (kind === 'selected-client' && !this.filters.clientId) {
      this.showNotification('Pick a client first to export a selected client report.', 'error');
      return;
    }

    const clientName = this.reportData?.options.clients.find((item) => item.id === this.filters.clientId)?.label;
    const path = buildExportPath(kind, format, this.filters);
    const filename = buildExportFilename(kind, format, this.filters, clientName);

    try {
      this.showNotification('Preparing download...', 'info');
      await downloadReport(path, filename);
      this.showNotification('Download started successfully.', 'success');
    } catch (error) {
      this.showNotification(error instanceof Error ? error.message : 'Unable to export report', 'error');
    }
  }

  private setLoading(value: boolean): void {
    this.isLoading = value;
    this.root.dataset.loading = value ? 'true' : 'false';
    const page = this.root.querySelector<HTMLElement>('.reports-page');
    if (page) {
      page.dataset.loading = value ? 'true' : 'false';
    }
  }

  private showNotification(message: string, tone: 'success' | 'error' | 'info'): void {
    this.notificationTarget.textContent = message;
    this.notificationTarget.dataset.tone = tone;
    this.notificationTarget.hidden = false;

    if (this.notificationTimer !== null) {
      window.clearTimeout(this.notificationTimer);
    }

    if (tone !== 'error') {
      this.notificationTimer = window.setTimeout(() => {
        this.notificationTarget.hidden = true;
      }, 3200);
    }
  }

  private defaultFilters(): ReportFilters {
    return {
      preset: 'thisMonth',
      entryType: 'all',
      status: 'all',
      billable: 'all',
      search: '',
      page: 1,
      pageSize: 10,
      sortBy: 'date',
      sortDir: 'desc',
    };
  }

  private renderShell(): string {
    return `
        <section class="route-main reports-page">
          <header class="topbar dashboard-topbar">
            <div>
              <h1>Reports</h1>
              <p class="panel-copy">Filter time data, inspect trends, and export client, task, and team summaries.</p>
            </div>
            <div class="topbar-actions report-topbar-actions">
              <div data-export-slot></div>
            </div>
          </header>

          <div class="feedback reports-notification" data-notification hidden></div>

          <section class="route-grid reports-hero-grid">
            <article class="card-panel route-card reports-filter-card" data-report-filters></article>
            <aside class="card-panel route-card report-insight-panel">
              <div class="section-header reports-section-header">
                <div>
                  <h2>What this report includes</h2>
                </div>
              </div>
              <ul class="report-insight-list">
                <li>Summary cards update instantly with filters.</li>
                <li>Charts aggregate time by day, week, client, and task.</li>
                <li>The table stays server-driven for fast paging and sorting.</li>
                <li>Exports use the same filtered dataset as the UI.</li>
              </ul>
            </aside>
          </section>

          <section class="stats-grid report-summary-grid" data-report-summary></section>

          <section class="report-charts-grid" data-report-charts></section>

          <section class="card-panel report-table-shell">
            <div class="section-header reports-section-header">
              <div>
                <h2>Filtered time entries</h2>
              </div>
              <div class="report-table-hint">Search, sort, and page through the current filter set.</div>
            </div>
            <div class="datatable-shell">
              <table class="display compact report-table" data-report-table style="width: 100%">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Task</th>
                    <th>Team Member</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Duration</th>
                    <th>Description</th>
                    <th>Entry Type</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </section>
        </section>
    `;
  }
}
