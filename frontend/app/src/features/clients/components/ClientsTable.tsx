import type { ClientRecord } from '../../types';
import { DataTable } from '../../../../../shared/components/DataTable';

const formatTimeMinutes = (totalMinutes: number): string => {
  const minutes = Number(totalMinutes || 0);
  if (!Number.isFinite(minutes) || minutes < 0) return '0m';
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) return `${remainder}m`;
  if (remainder === 0) return `${hours}h`;
  return `${hours}h ${remainder}m`;
};

interface ClientsTableProps {
  clients: ClientRecord[];
  loading: boolean;
  view: 'active' | 'archived';
  selectedClientIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onOpenDetails: (clientId: number) => void;
  onEdit: (client: ClientRecord) => void;
  onArchiveToggle: (client: ClientRecord) => void;
}

export function ClientsTable({
  clients,
  loading,
  view,
  selectedClientIds,
  onSelectionChange,
  onOpenDetails,
  onEdit,
  onArchiveToggle,
}: ClientsTableProps) {
  return (
    <section className="card-panel clients-card">
      {loading ? <div className="empty-state">Loading clients...</div> : (
        <DataTable
          data={clients}
          className="clients-table"
          emptyMessage="No clients found."
          searchPlaceholder="Search clients"
          selectable
          getRowId={(client) => client.id}
          selectedRowIds={selectedClientIds}
          onSelectionChange={onSelectionChange}
          columns={[
            {
              key: 'clientName',
              title: 'Client Name',
              display: (client) => `<button class="client-name-link" type="button"><span class="client-avatar">${client.name.slice(0, 2).toUpperCase()}</span><span class="client-name-copy"><strong>${client.name}</strong><span>${client.description || 'No description'}</span></span></button>`,
              searchValue: (client) => `${client.name} ${client.description || ''}`,
            },
            {
              key: 'monthlyAllowance',
              title: 'Monthly Allowance',
              display: (client) => formatTimeMinutes(client.monthlyAllowanceMinutes),
              sortValue: (client) => client.monthlyAllowanceMinutes,
            },
            {
              key: 'billable',
              title: 'Billable',
              display: (client) => `<span class="status-pill ${client.billable ? 'status-pill-blue' : 'status-pill-muted'}">${client.billable ? 'Billable' : 'Not billable'}</span>`,
              sortValue: (client) => (client.billable ? 1 : 0),
              searchValue: (client) => (client.billable ? 'Billable' : 'Not billable'),
            },
            {
              key: 'status',
              title: 'Status',
              display: (client) => `<span class="status-pill ${client.archivedAt ? 'status-pill-muted' : 'status-pill-green'}">${client.archivedAt ? 'Archived' : 'Active'}</span>`,
              sortValue: (client) => (client.archivedAt ? 1 : 0),
              searchValue: (client) => (client.archivedAt ? 'Archived' : 'Active'),
            },
          ]}
          actions={[
            {
              action: 'detail',
              label: (client) => `View ${client.name}`,
              title: 'Details',
              onClick: (client) => onOpenDetails(client.id),
            },
            {
              action: 'edit',
              label: (client) => `Edit ${client.name}`,
              title: 'Edit',
              onClick: (client) => onEdit(client),
            },
            {
              action: view === 'archived' ? 'restore' : 'archive',
              label: (client) => `${view === 'archived' ? 'Restore' : 'Archive'} ${client.name}`,
              title: view === 'archived' ? 'Restore' : 'Archive',
              variant: view === 'archived' ? 'success' : 'default',
              onClick: (client) => onArchiveToggle(client),
            },
          ]}
        />
      )}
    </section>
  );
}
