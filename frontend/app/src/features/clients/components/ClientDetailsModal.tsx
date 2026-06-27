import type { ClientRecord } from '../../types';

const formatTimeMinutes = (totalMinutes: number): string => {
  const minutes = Number(totalMinutes || 0);
  if (!Number.isFinite(minutes) || minutes < 0) return '0m';
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) return `${remainder}m`;
  if (remainder === 0) return `${hours}h`;
  return `${hours}h ${remainder}m`;
};

const formatDateTime = (value?: string | null): string => (value ? new Date(value).toLocaleString() : '--');

interface ClientDetailsModalProps {
  selectedClient: ClientRecord | null;
  onClose: () => void;
}

export function ClientDetailsModal({ selectedClient, onClose }: ClientDetailsModalProps) {
  if (!selectedClient) {
    return null;
  }

  return (
    <div className="client-modal" onClick={onClose}>
      <div className="client-modal-overlay">
        <section className="client-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="client-detail-title-react" onClick={(event) => event.stopPropagation()}>
          <header className="client-modal-header">
            <div><p className="route-eyebrow">Client</p><h2 id="client-detail-title-react">Client details</h2><p className="client-modal-subtitle">Review client allowance, billing behavior, and archive state.</p></div>
            <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close client modal"><span aria-hidden="true">&times;</span></button>
          </header>
          <div className="client-modal-body"><section className="client-detail-grid"><article className="client-detail-card card-panel"><span>Name</span><strong>{selectedClient.name}</strong></article><article className="client-detail-card card-panel"><span>Monthly Allowance</span><strong>{formatTimeMinutes(selectedClient.monthlyAllowanceMinutes)}</strong></article><article className="client-detail-card card-panel"><span>Billable overflow</span><strong>{selectedClient.billable ? 'Enabled' : 'Disabled'}</strong></article><article className="client-detail-card card-panel"><span>Status</span><strong>{selectedClient.archivedAt ? 'Archived' : 'Active'}</strong></article><article className="client-detail-card card-panel"><span>Description</span><strong>{selectedClient.description || 'No description provided'}</strong></article><article className="client-detail-card card-panel"><span>Created</span><strong>{formatDateTime(selectedClient.createdAt)}</strong></article><article className="client-detail-card card-panel"><span>Updated</span><strong>{formatDateTime(selectedClient.updatedAt)}</strong></article><article className="client-detail-card card-panel"><span>Archived</span><strong>{formatDateTime(selectedClient.archivedAt)}</strong></article></section></div>
        </section>
      </div>
    </div>
  );
}
