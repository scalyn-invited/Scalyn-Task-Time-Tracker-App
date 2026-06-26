import type { ReportFilters } from './report-types';

export type ReportExportKind =
  | 'detailed'
  | 'client-summary'
  | 'selected-client'
  | 'task-summary'
  | 'team-summary';

export interface ExportDropdownOptions {
  onExport: (kind: ReportExportKind, format: 'csv' | 'pdf') => Promise<void>;
}

export class ExportDropdown {
  private open = false;
  private busy = false;

  constructor(
    private readonly container: HTMLElement,
    private readonly getFilters: () => ReportFilters,
    private readonly callbacks: ExportDropdownOptions,
  ) {}

  render(): void {
    const filters = this.getFilters();
    const hasClient = Boolean(filters.clientId);

    this.container.innerHTML = `
      <button class="report-export-toggle" type="button" data-export-toggle ${this.busy ? 'disabled' : ''}>
        <span>${this.busy ? 'Preparing...' : 'Export Report'}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
      </button>
      <div class="report-export-menu${this.open ? ' is-open' : ''}" data-export-menu ${this.open ? '' : 'hidden'}>
        <div class="report-export-group">
          <div class="report-export-group-title">Detailed Reports</div>
          <button type="button" data-export-kind="detailed" data-export-format="pdf" ${this.busy ? 'disabled' : ''}>Export Detailed Report (PDF)</button>
          <button type="button" data-export-kind="detailed" data-export-format="csv" ${this.busy ? 'disabled' : ''}>Export Detailed Report (CSV)</button>
        </div>
        <div class="report-export-group">
          <div class="report-export-group-title">Client Reports</div>
          <button type="button" data-export-kind="client-summary" data-export-format="pdf" ${this.busy ? 'disabled' : ''}>Export Client Summary (PDF)</button>
          <button type="button" data-export-kind="client-summary" data-export-format="csv" ${this.busy ? 'disabled' : ''}>Export Client Summary (CSV)</button>
          <button type="button" data-export-kind="selected-client" data-export-format="pdf" ${this.busy || !hasClient ? 'disabled' : ''}>Export Selected Client Report (PDF)</button>
          <button type="button" data-export-kind="selected-client" data-export-format="csv" ${this.busy || !hasClient ? 'disabled' : ''}>Export Selected Client Report (CSV)</button>
        </div>
        <div class="report-export-group">
          <div class="report-export-group-title">Task Reports</div>
          <button type="button" data-export-kind="task-summary" data-export-format="pdf" ${this.busy ? 'disabled' : ''}>Export Task Summary (PDF)</button>
          <button type="button" data-export-kind="task-summary" data-export-format="csv" ${this.busy ? 'disabled' : ''}>Export Task Summary (CSV)</button>
        </div>
        <div class="report-export-group">
          <div class="report-export-group-title">Team Reports</div>
          <button type="button" data-export-kind="team-summary" data-export-format="pdf" ${this.busy ? 'disabled' : ''}>Export Team Summary (PDF)</button>
          <button type="button" data-export-kind="team-summary" data-export-format="csv" ${this.busy ? 'disabled' : ''}>Export Team Summary (CSV)</button>
        </div>
      </div>
    `;

    const toggle = this.container.querySelector<HTMLButtonElement>('[data-export-toggle]');
    const menu = this.container.querySelector<HTMLElement>('[data-export-menu]');

    toggle?.addEventListener('click', () => {
      if (this.busy) {
        return;
      }

      this.open = !this.open;
      this.render();
    });

    menu?.querySelectorAll<HTMLButtonElement>('[data-export-kind]').forEach((button) => {
      button.addEventListener('click', () => {
        const kind = button.dataset.exportKind as ReportExportKind;
        const format = button.dataset.exportFormat as 'csv' | 'pdf';
        void this.triggerExport(kind, format);
      });
    });

    this.bindOutsideClick();
  }

  setBusy(busy: boolean): void {
    this.busy = busy;
    this.render();
  }

  close(): void {
    this.open = false;
    this.render();
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleEscape);
    document.removeEventListener('pointerdown', this.handleOutsideClick);
  }

  private async triggerExport(kind: ReportExportKind, format: 'csv' | 'pdf'): Promise<void> {
    this.setBusy(true);
    this.open = false;
    this.render();

    try {
      await this.callbacks.onExport(kind, format);
    } finally {
      this.setBusy(false);
    }
  }

  private bindOutsideClick(): void {
    document.removeEventListener('keydown', this.handleEscape);
    document.removeEventListener('pointerdown', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleEscape);
    document.addEventListener('pointerdown', this.handleOutsideClick);
  }

  private handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  private handleOutsideClick = (event: PointerEvent) => {
    const target = event.target as Node | null;
    if (!target) {
      return;
    }

    if (this.container.contains(target)) {
      return;
    }

    this.close();
  };
}
