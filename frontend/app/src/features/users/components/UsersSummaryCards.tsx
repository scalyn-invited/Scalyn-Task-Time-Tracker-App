interface UsersSummaryCardsProps {
  total: number;
  active: number;
  admins: number;
}

export function UsersSummaryCards({ total, active, admins }: UsersSummaryCardsProps) {
  return (
    <section className="clients-summary-grid users-summary-grid">
      <article className="stat-card stat-card-blue"><div className="stat-card-head">Total Users</div><div className="stat-card-body"><div><strong>{total}</strong><span>All accounts</span></div></div></article>
      <article className="stat-card stat-card-green"><div className="stat-card-head">Active</div><div className="stat-card-body"><div><strong>{active}</strong><span>Enabled accounts</span></div></div></article>
      <article className="stat-card stat-card-purple"><div className="stat-card-head">Admins</div><div className="stat-card-body"><div><strong>{admins}</strong><span>Admin access</span></div></div></article>
    </section>
  );
}
