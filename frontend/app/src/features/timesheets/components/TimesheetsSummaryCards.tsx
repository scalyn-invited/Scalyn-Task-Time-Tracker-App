interface TimesheetsSummaryCardsProps {
  totalDuration: string;
  entryCount: number;
  userScope: string;
  clientScope: string;
}

export function TimesheetsSummaryCards({ totalDuration, entryCount, userScope, clientScope }: TimesheetsSummaryCardsProps) {
  return (
    <section className="timesheet-summary-grid">
      <article className="stat-card stat-card-blue"><div className="stat-card-head">Total Duration</div><div className="stat-card-body"><strong>{totalDuration}</strong><span>Tracked time</span></div></article>
      <article className="stat-card stat-card-green"><div className="stat-card-head">Time Entries</div><div className="stat-card-body"><strong>{entryCount}</strong><span>Loaded rows</span></div></article>
      <article className="stat-card stat-card-purple"><div className="stat-card-head">Scope</div><div className="stat-card-body"><strong>{userScope}</strong><span>{clientScope}</span></div></article>
    </section>
  );
}
