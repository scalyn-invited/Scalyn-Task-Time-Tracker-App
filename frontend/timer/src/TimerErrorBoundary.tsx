import React from 'react';

interface TimerErrorBoundaryProps {
  children: React.ReactNode;
}

interface TimerErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class TimerErrorBoundary extends React.Component<
  TimerErrorBoundaryProps,
  TimerErrorBoundaryState
> {
  constructor(props: TimerErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): TimerErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error): void {
    // Keep the timer page from going blank if a child render crashes.
    console.error('Timer page render failed', error);
  }

  override render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="app-shell dashboard-shell timer-shell timer-error-shell">
        <section className="dashboard-main timer-error-main">
          <article className="card-panel timer-error-card">
            <span className="status-pill status-pill-muted">Render error</span>
            <h1>Timer page could not load</h1>
            <p>
              Something in the timer UI crashed while rendering. Please refresh the page.
              {this.state.error ? ` ${this.state.error.message}` : ''}
            </p>
            <div className="timer-error-actions">
              <button className="action-button" type="button" onClick={() => window.location.reload()}>
                <span>Reload page</span>
              </button>
              <a className="ghost-action" href="/">
                Back to dashboard
              </a>
            </div>
          </article>
        </section>
      </main>
    );
  }
}
