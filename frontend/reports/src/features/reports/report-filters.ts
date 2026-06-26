import type { ReportFilters, ReportOptionItem, ReportOptions, ReportPreset } from './report-types';

export interface ReportFiltersPanelOptions {
  onChange: (filters: ReportFilters) => void;
}

export class ReportFiltersPanel {
  private searchTimer: number | null = null;

  constructor(
    private readonly container: HTMLElement,
    private options: ReportOptions,
    private filters: ReportFilters,
    private readonly callbacks: ReportFiltersPanelOptions,
  ) {}

  render(): void {
    this.container.innerHTML = `
      <div class="section-header reports-section-header">
        <div>
          <h2>Shape the report</h2>
        </div>
        <div class="report-filter-summary" data-filter-summary>${this.describeFilters(this.filters)}</div>
      </div>
      <form class="report-filter-grid" data-report-filter-form>
        <label class="report-field report-field-wide">
          <span>Date Range</span>
          <select name="preset" data-filter="preset"></select>
        </label>

        <label class="report-field">
          <span>Client</span>
          <select name="clientId" data-filter="clientId"></select>
        </label>

        <label class="report-field">
          <span>Task</span>
          <select name="taskId" data-filter="taskId"></select>
        </label>

        <label class="report-field">
          <span>Team Member</span>
          <select name="userId" data-filter="userId"></select>
        </label>

        <label class="report-field">
          <span>Entry Type</span>
          <select name="entryType" data-filter="entryType"></select>
        </label>

        <label class="report-field">
          <span>Status</span>
          <select name="status" data-filter="status"></select>
        </label>

        <label class="report-field">
          <span>Billable</span>
          <select name="billable" data-filter="billable"></select>
        </label>

        <label class="report-field report-field-wide report-field-search">
          <span>Search</span>
          <input name="search" data-filter="search" type="search" placeholder="Search clients, tasks, members, or notes" />
        </label>

        <div class="report-field report-field-wide report-custom-range" data-custom-range>
          <label class="report-field">
            <span>From</span>
            <input name="from" data-filter="from" type="date" />
          </label>
          <label class="report-field">
            <span>To</span>
            <input name="to" data-filter="to" type="date" />
          </label>
        </div>
      </form>
    `;

    this.populateSelects();
    this.syncControls();
    this.bindEvents();
  }

  setOptions(options: ReportOptions): void {
    this.options = options;
    this.render();
  }

  setFilters(filters: ReportFilters): void {
    this.filters = filters;
    this.syncControls();
  }

  getFilters(): ReportFilters {
    return { ...this.filters };
  }

  destroy(): void {
    if (this.searchTimer !== null) {
      window.clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }
  }

  private bindEvents(): void {
    const form = this.container.querySelector('[data-report-filter-form]') as HTMLFormElement | null;
    if (!form) {
      return;
    }

    form.querySelectorAll<HTMLSelectElement | HTMLInputElement>('[data-filter]').forEach((input) => {
      const update = () => {
        const next = this.readFilters();
        this.filters = next;
        this.updateSummary();

        if (input.name === 'search') {
          if (this.searchTimer !== null) {
            window.clearTimeout(this.searchTimer);
          }

          this.searchTimer = window.setTimeout(() => {
            this.callbacks.onChange(this.filters);
          }, 250);
          return;
        }

        this.callbacks.onChange(next);
      };

      if (input instanceof HTMLInputElement && input.type === 'search') {
        input.addEventListener('input', update);
      } else {
        input.addEventListener('change', update);
      }
    });
  }

  private populateSelects(): void {
    this.populatePresetSelect();
    this.populateRelationSelect('clientId', this.options.clients, 'All clients');
    this.populateRelationSelect('taskId', this.options.tasks, 'All tasks');
    this.populateRelationSelect('userId', this.options.teamMembers, 'All team members');
    this.populateEntryTypeSelect();
    this.populateStatusSelect();
    this.populateBillableSelect();
  }

  private populatePresetSelect(): void {
    const select = this.container.querySelector<HTMLSelectElement>('[data-filter="preset"]');
    if (!select) {
      return;
    }

    const presets: Array<{ value: ReportPreset; label: string }> = [
      { value: 'today', label: 'Today' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'thisWeek', label: 'This Week' },
      { value: 'lastWeek', label: 'Last Week' },
      { value: 'thisMonth', label: 'This Month' },
      { value: 'lastMonth', label: 'Last Month' },
      { value: 'thisYear', label: 'This Year' },
      { value: 'custom', label: 'Custom Range' },
    ];

    select.innerHTML = presets.map((preset) => `<option value="${preset.value}">${preset.label}</option>`).join('');
  }

  private populateRelationSelect(
    key: 'clientId' | 'taskId' | 'userId',
    items: ReportOptionItem[],
    emptyLabel: string,
  ): void {
    const select = this.container.querySelector<HTMLSelectElement>(`[data-filter="${key}"]`);
    if (!select) {
      return;
    }

    const options = [
      `<option value="">${emptyLabel}</option>`,
      ...items.map((item) => `<option value="${item.id}">${this.escapeHtml(item.label)}</option>`),
    ];

    select.innerHTML = options.join('');
  }

  private populateEntryTypeSelect(): void {
    const select = this.container.querySelector<HTMLSelectElement>('[data-filter="entryType"]');
    if (!select) {
      return;
    }

    select.innerHTML = [
      '<option value="all">All entries</option>',
      '<option value="timer">Timer</option>',
      '<option value="manual">Manual</option>',
    ].join('');
  }

  private populateStatusSelect(): void {
    const select = this.container.querySelector<HTMLSelectElement>('[data-filter="status"]');
    if (!select) {
      return;
    }

    select.innerHTML = [
      '<option value="all">All statuses</option>',
      '<option value="RUNNING">Running</option>',
      '<option value="PAUSED">Paused</option>',
      '<option value="COMPLETED">Completed</option>',
    ].join('');
  }

  private populateBillableSelect(): void {
    const select = this.container.querySelector<HTMLSelectElement>('[data-filter="billable"]');
    if (!select) {
      return;
    }

    select.innerHTML = [
      '<option value="all">Any</option>',
      '<option value="true">Billable</option>',
      '<option value="false">Non-billable</option>',
    ].join('');
  }

  private syncControls(): void {
    const filters = this.filters;
    const setValue = (selector: string, value: string) => {
      const input = this.container.querySelector<HTMLInputElement | HTMLSelectElement>(selector);
      if (input) {
        input.value = value;
      }
    };

    setValue('[data-filter="preset"]', filters.preset);
    setValue('[data-filter="clientId"]', filters.clientId ? String(filters.clientId) : '');
    setValue('[data-filter="taskId"]', filters.taskId ? String(filters.taskId) : '');
    setValue('[data-filter="userId"]', filters.userId ? String(filters.userId) : '');
    setValue('[data-filter="entryType"]', filters.entryType ?? 'all');
    setValue('[data-filter="status"]', filters.status ?? 'all');
    setValue('[data-filter="billable"]', filters.billable ?? 'all');
    setValue('[data-filter="search"]', filters.search ?? '');
    setValue('[data-filter="from"]', filters.from ?? '');
    setValue('[data-filter="to"]', filters.to ?? '');

    const customRange = this.container.querySelector<HTMLElement>('[data-custom-range]');
    if (customRange) {
      customRange.hidden = filters.preset !== 'custom';
    }

    this.updateSummary();
  }

  private readFilters(): ReportFilters {
    const getValue = (selector: string): string => {
      const el = this.container.querySelector<HTMLInputElement | HTMLSelectElement>(selector);
      return el ? el.value : '';
    };

    return {
      ...this.filters,
      preset: getValue('[data-filter="preset"]') as ReportPreset,
      clientId: this.parseId(getValue('[data-filter="clientId"]')),
      taskId: this.parseId(getValue('[data-filter="taskId"]')),
      userId: this.parseId(getValue('[data-filter="userId"]')),
      entryType: getValue('[data-filter="entryType"]') as ReportFilters['entryType'],
      status: getValue('[data-filter="status"]') as ReportFilters['status'],
      billable: getValue('[data-filter="billable"]') as ReportFilters['billable'],
      search: getValue('[data-filter="search"]').trim(),
      from: getValue('[data-filter="from"]') || undefined,
      to: getValue('[data-filter="to"]') || undefined,
      page: 1,
    };
  }

  private parseId(value: string): number | undefined {
    if (!value) {
      return undefined;
    }

    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  private updateSummary(): void {
    const summary = this.container.querySelector<HTMLElement>('[data-filter-summary]');
    if (!summary) {
      return;
    }

    summary.textContent = this.describeFilters(this.filters);
  }

  private describeFilters(filters: ReportFilters): string {
    const labels = [
      filters.preset === 'custom' ? 'Custom range' : this.prettyPreset(filters.preset),
      filters.clientId ? `Client ${filters.clientId}` : null,
      filters.taskId ? `Task ${filters.taskId}` : null,
      filters.userId ? `Member ${filters.userId}` : null,
      filters.entryType !== 'all' ? filters.entryType : null,
      filters.status !== 'all' ? filters.status : null,
      filters.billable !== 'all' ? filters.billable : null,
      filters.search ? `Search "${filters.search}"` : null,
    ].filter(Boolean);

    return labels.length > 0 ? labels.join(' • ') : 'All data';
  }

  private prettyPreset(value: ReportPreset): string {
    switch (value) {
      case 'today':
        return 'Today';
      case 'yesterday':
        return 'Yesterday';
      case 'thisWeek':
        return 'This week';
      case 'lastWeek':
        return 'Last week';
      case 'thisMonth':
        return 'This month';
      case 'lastMonth':
        return 'Last month';
      case 'thisYear':
        return 'This year';
      default:
        return 'Custom range';
    }
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
      switch (character) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return character;
      }
    });
  }
}
