import type { ClientRecord } from '../../types';

interface ClientsSummaryCardsProps {
  activeClients: ClientRecord[];
  archivedClients: ClientRecord[];
}

export function ClientsSummaryCards({ activeClients, archivedClients }: ClientsSummaryCardsProps) {
  return (
    <section className="clients-summary-grid">
      <article className="stat-card stat-card-blue"><div className="stat-card-head">Total Clients</div><div className="stat-card-body"><div><strong>{activeClients.length + archivedClients.length}</strong><span>All records</span></div></div></article>
      <article className="stat-card stat-card-green"><div className="stat-card-head">Active</div><div className="stat-card-body"><div><strong>{activeClients.length}</strong><span>Visible in active view</span></div></div></article>
      <article className="stat-card stat-card-orange"><div className="stat-card-head">Archived</div><div className="stat-card-body"><div><strong>{archivedClients.length}</strong><span>Soft archived</span></div></div></article>
    </section>
  );
}
