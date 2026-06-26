import { Chart, type ChartConfiguration, type ChartData, registerables } from 'chart.js';
import type { ReportCharts } from './report-types';

Chart.register(...registerables);

type ReportChartKey = keyof ReportCharts;

const palette = {
  blue: '#2f7cf6',
  teal: '#19b4a6',
  amber: '#f39b2f',
  plum: '#7c5cff',
};

export class ReportChartsPanel {
  private readonly charts = new Map<ReportChartKey, Chart>();
  private shellRendered = false;

  constructor(private readonly container: HTMLElement) {}

  render(charts: ReportCharts): void {
    if (!this.shellRendered) {
      this.container.innerHTML = `
        <article class="card-panel report-chart-card" data-chart-card="hoursPerDay">
          <header>
            <h3>Hours Per Day</h3>
          </header>
          <div class="report-chart-frame">
            <canvas data-chart="hoursPerDay" height="180"></canvas>
            <div class="report-chart-empty" data-chart-empty hidden>No data for current filters</div>
          </div>
        </article>
        <article class="card-panel report-chart-card" data-chart-card="hoursPerWeek">
          <header>
            <h3>Hours Per Week</h3>
          </header>
          <div class="report-chart-frame">
            <canvas data-chart="hoursPerWeek" height="180"></canvas>
            <div class="report-chart-empty" data-chart-empty hidden>No data for current filters</div>
          </div>
        </article>
        <article class="card-panel report-chart-card" data-chart-card="hoursPerClient">
          <header>
            <h3>Hours Per Client</h3>
          </header>
          <div class="report-chart-frame">
            <canvas data-chart="hoursPerClient" height="180"></canvas>
            <div class="report-chart-empty" data-chart-empty hidden>No data for current filters</div>
          </div>
        </article>
        <article class="card-panel report-chart-card" data-chart-card="hoursPerTask">
          <header>
            <h3>Hours Per Task</h3>
          </header>
          <div class="report-chart-frame">
            <canvas data-chart="hoursPerTask" height="180"></canvas>
            <div class="report-chart-empty" data-chart-empty hidden>No data for current filters</div>
          </div>
        </article>
      `;
      this.shellRendered = true;
    }

    this.createOrUpdateChart('hoursPerDay', 'line', charts.hoursPerDay, palette.blue);
    this.createOrUpdateChart('hoursPerWeek', 'line', charts.hoursPerWeek, palette.teal);
    this.createOrUpdateChart('hoursPerClient', 'bar', charts.hoursPerClient, palette.amber);
    this.createOrUpdateChart('hoursPerTask', 'bar', charts.hoursPerTask, palette.plum);
  }

  destroy(): void {
    this.charts.forEach((chart) => chart.destroy());
    this.charts.clear();
    this.shellRendered = false;
  }

  private createOrUpdateChart(
    key: ReportChartKey,
    kind: 'line' | 'bar',
    points: Array<{ label: string; value: number }>,
    color: string,
  ): void {
    const canvas = this.container.querySelector<HTMLCanvasElement>(`[data-chart="${key}"]`);
    if (!canvas) {
      return;
    }

    const normalizedPoints = points.length > 0 ? points : [{ label: 'No data', value: 0 }];
    const hasData = points.some((point) => point.value > 0);
    this.setEmptyState(key, !hasData);

    const data: ChartData<'line' | 'bar', number[], string> = {
      labels: normalizedPoints.map((point) => point.label),
      datasets: [
        {
          label: key,
          data: normalizedPoints.map((point) => point.value),
          borderColor: color,
          backgroundColor: hasData ? `${color}22` : 'rgba(125, 135, 152, 0.18)',
          pointBackgroundColor: color,
          pointRadius: hasData ? 3 : 0,
          borderWidth: 2,
          borderRadius: kind === 'bar' ? 12 : undefined,
          tension: 0.35,
          fill: kind === 'line',
        },
      ],
    };

    const existing = this.charts.get(key);
    if (existing) {
      existing.data = data;
      existing.options = this.buildChartOptions(hasData);
      existing.update();
      return;
    }

    const config: ChartConfiguration<'line' | 'bar', number[], string> = {
      type: kind,
      data,
      options: this.buildChartOptions(hasData),
    };

    this.charts.set(key, new Chart(canvas, config));
  }

  private buildChartOptions(hasData: boolean): ChartConfiguration<'line' | 'bar', number[], string>['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: hasData,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#5e6b7f',
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: hasData ? undefined : 1,
          ticks: {
            precision: 0,
            color: '#5e6b7f',
          },
        },
      },
    };
  }

  private setEmptyState(key: ReportChartKey, empty: boolean): void {
    const card = this.container.querySelector<HTMLElement>(`[data-chart-card="${key}"]`);
    if (!card) {
      return;
    }

    const emptyState = card.querySelector<HTMLElement>('[data-chart-empty]');
    if (emptyState) {
      emptyState.hidden = !empty;
    }
  }
}
