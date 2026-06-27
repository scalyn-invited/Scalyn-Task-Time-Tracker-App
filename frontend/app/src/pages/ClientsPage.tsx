import { FormEvent } from 'react';
import type { ClientRecord } from '../types';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { BulkActionToolbar } from '../../../shared/components/BulkActionToolbar';
import { ClientsSummaryCards } from '../features/clients/components/ClientsSummaryCards';
import { ClientsTable } from '../features/clients/components/ClientsTable';
import { ClientFormModal } from '../features/clients/components/ClientFormModal';
import { ClientDetailsModal } from '../features/clients/components/ClientDetailsModal';
import { useClientsPageData } from '../features/clients/hooks/useClientsPageData';

export function ClientsPage() {
  const {
    activeClients,
    archivedClients,
    clients,
    view,
    setView,
    selectedClient,
    setSelectedClient,
    editingClient,
    setEditingClient,
    confirmingClient,
    setConfirmingClient,
    loading,
    name,
    setName,
    description,
    setDescription,
    monthlyAllowanceMinutes,
    setMonthlyAllowanceMinutes,
    billable,
    setBillable,
    selectedClientIds,
    setSelectedClientIds,
    bulkConfirmOpen,
    setBulkConfirmOpen,
    openDetails,
    saveClient,
    confirmSingleArchiveToggle,
    confirmBulkArchiveToggle,
  } = useClientsPageData();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void saveClient();
  }

  return (
    <section className="route-main clients-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Clients</h1>
          <p className="clients-subtitle">Manage active and archived client records for time tracking, billing, and reporting.</p>
        </div>
        <div className="topbar-actions">
          <button className="action-button" type="button" onClick={() => setEditingClient({
            id: 0,
            name: '',
            description: null,
            monthlyAllowanceMinutes: 0,
            billable: false,
            archivedAt: null,
            userId: 0,
            createdAt: '',
            updatedAt: '',
          } as ClientRecord)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Create Client</span>
          </button>
          <button className="team-switcher" type="button" onClick={() => setView((current) => current === 'archived' ? 'active' : 'archived')}>
            <span>{view === 'archived' ? 'View Active Clients' : 'View Archived Clients'}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </button>
        </div>
      </header>

      <ClientsSummaryCards activeClients={activeClients} archivedClients={archivedClients} />

      <BulkActionToolbar
        count={selectedClientIds.length}
        onClear={() => setSelectedClientIds([])}
        actions={[
          {
            key: 'bulk-client-action',
            label: view === 'archived' ? 'Bulk restore' : 'Bulk archive',
            onClick: () => setBulkConfirmOpen(true),
          },
        ]}
      />

      <ClientsTable
        clients={clients}
        loading={loading}
        view={view}
        selectedClientIds={selectedClientIds}
        onSelectionChange={setSelectedClientIds}
        onOpenDetails={(clientId) => { void openDetails(clientId); }}
        onEdit={setEditingClient}
        onArchiveToggle={setConfirmingClient}
      />

      <ClientFormModal
        editingClient={editingClient}
        name={name}
        description={description}
        monthlyAllowanceMinutes={monthlyAllowanceMinutes}
        billable={billable}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onMonthlyAllowanceMinutesChange={setMonthlyAllowanceMinutes}
        onBillableChange={setBillable}
        onClose={() => setEditingClient(null)}
        onSubmit={handleSubmit}
      />

      <ClientDetailsModal selectedClient={selectedClient} onClose={() => setSelectedClient(null)} />

      <ConfirmModal
        open={confirmingClient !== null}
        title={view === 'archived' ? 'Restore client?' : 'Archive client?'}
        message={confirmingClient ? `${view === 'archived' ? 'Restore' : 'Archive'} "${confirmingClient.name}"?` : ''}
        confirmLabel={view === 'archived' ? 'Restore' : 'Archive'}
        cancelLabel="Cancel"
        destructive={view !== 'archived'}
        onClose={() => setConfirmingClient(null)}
        onConfirm={() => {
          void confirmSingleArchiveToggle();
        }}
      />

      <ConfirmModal
        open={bulkConfirmOpen}
        title={view === 'archived' ? 'Restore selected clients?' : 'Archive selected clients?'}
        message={`${view === 'archived' ? 'Restore' : 'Archive'} ${selectedClientIds.length} selected clients?`}
        confirmLabel={view === 'archived' ? 'Restore' : 'Archive'}
        cancelLabel="Cancel"
        destructive={view !== 'archived'}
        onClose={() => setBulkConfirmOpen(false)}
        onConfirm={() => {
          void confirmBulkArchiveToggle();
        }}
      />
    </section>
  );
}
