import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  archiveClient,
  bulkArchiveClients,
  bulkRestoreClients,
  createClient,
  fetchArchivedClients,
  fetchClient,
  fetchClients,
  updateClient,
} from '../lib/api';
import type { ClientRecord } from '../types';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { DataTable } from '../../../shared/components/DataTable';
import { BulkActionToolbar } from '../../../shared/components/BulkActionToolbar';
import { useToast } from '../../../shared/components/ToastProvider';

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

export function ClientsPage() {
  const { showToast } = useToast();
  const [activeClients, setActiveClients] = useState<ClientRecord[]>([]);
  const [archivedClients, setArchivedClients] = useState<ClientRecord[]>([]);
  const [view, setView] = useState<'active' | 'archived'>('active');
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);
  const [confirmingClient, setConfirmingClient] = useState<ClientRecord | null>(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [monthlyAllowanceMinutes, setMonthlyAllowanceMinutes] = useState('0');
  const [billable, setBillable] = useState(false);
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false);

  const clients = useMemo(() => (view === 'archived' ? archivedClients : activeClients), [activeClients, archivedClients, view]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [active, archived] = await Promise.all([fetchClients(), fetchArchivedClients()]);
      setActiveClients(active);
      setArchivedClients(archived);
      setSelectedClientIds([]);
      setError('');
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Unable to load clients';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    if (!editingClient) {
      setName('');
      setDescription('');
      setMonthlyAllowanceMinutes('0');
      setBillable(false);
      return;
    }

    setName(editingClient.name);
    setDescription(editingClient.description ?? '');
    setMonthlyAllowanceMinutes(String(editingClient.monthlyAllowanceMinutes ?? 0));
    setBillable(Boolean(editingClient.billable));
  }, [editingClient]);

  async function openDetails(clientId: number) {
    try {
      const client = await fetchClient(clientId);
      setSelectedClient(client);
      setError('');
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Unable to load client details';
      setError(message);
      showToast(message, 'error');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingClient) {
        await updateClient(editingClient.id, {
          name: name.trim(),
          description: description.trim(),
          monthlyAllowanceMinutes: Number(monthlyAllowanceMinutes),
          billable,
        });
        setFeedback('Client updated successfully.');
        showToast('Client updated successfully.', 'success');
      } else {
        await createClient({
          name: name.trim(),
          description: description.trim(),
          monthlyAllowanceMinutes: Number(monthlyAllowanceMinutes),
          billable,
        });
        setFeedback('Client created successfully.');
        showToast('Client created successfully.', 'success');
      }

      setError('');
      setEditingClient(null);
      await loadData();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Unable to save client';
      setError(message);
      setFeedback('');
      showToast(message, 'error');
    }
  }

  return (
    <section className="route-main clients-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Clients</h1>
          <p className="clients-subtitle">Manage your client accounts, time allowances, and archive state.</p>
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
          })}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Create Client</span>
          </button>
          <button className="team-switcher" type="button" onClick={() => setView((current) => current === 'archived' ? 'active' : 'archived')}>
            <span>{view === 'archived' ? 'View Active Clients' : 'View Archived Clients'}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </button>
        </div>
      </header>

      <section className="clients-summary-grid">
        <article className="stat-card stat-card-blue"><div className="stat-card-head">Total Clients</div><div className="stat-card-body"><div><strong>{activeClients.length + archivedClients.length}</strong><span>All records</span></div></div></article>
        <article className="stat-card stat-card-green"><div className="stat-card-head">Active</div><div className="stat-card-body"><div><strong>{activeClients.length}</strong><span>Visible in active view</span></div></div></article>
        <article className="stat-card stat-card-orange"><div className="stat-card-head">Archived</div><div className="stat-card-body"><div><strong>{archivedClients.length}</strong><span>Soft archived</span></div></div></article>
      </section>

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
            onSelectionChange={setSelectedClientIds}
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
                onClick: (client) => { void openDetails(client.id); },
              },
              {
                action: 'edit',
                label: (client) => `Edit ${client.name}`,
                title: 'Edit',
                onClick: (client) => setEditingClient(client),
              },
              {
                action: view === 'archived' ? 'restore' : 'archive',
                label: (client) => `${view === 'archived' ? 'Restore' : 'Archive'} ${client.name}`,
                title: view === 'archived' ? 'Restore' : 'Archive',
                variant: view === 'archived' ? 'success' : 'default',
                onClick: (client) => setConfirmingClient(client),
              },
            ]}
          />
        )}
      </section>

      {editingClient ? (
        <div className="client-modal" onClick={() => setEditingClient(null)}>
          <div className="client-modal-overlay">
            <section className="client-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="client-modal-title-react" onClick={(event) => event.stopPropagation()}>
              <header className="client-modal-header">
                <div>
                  <p className="route-eyebrow">Client</p>
                  <h2 id="client-modal-title-react">{editingClient.id ? 'Edit client' : 'Create client'}</h2>
                  <p className="client-modal-subtitle">Manage the client record and monthly allowance.</p>
                </div>
                <button className="modal-close-button" type="button" onClick={() => setEditingClient(null)} aria-label="Close client modal"><span aria-hidden="true">&times;</span></button>
              </header>
              <div className="client-modal-body">
                <section className="client-modal-panel">
                  <form className="client-form" onSubmit={handleSubmit}>
                    <div className="field"><label htmlFor="client-name-react">Client Name</label><input id="client-name-react" value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={120} required /></div>
                    <div className="field"><label htmlFor="client-allowance-react">Monthly Time Allowance (minutes)</label><input id="client-allowance-react" value={monthlyAllowanceMinutes} onChange={(event) => setMonthlyAllowanceMinutes(event.target.value)} type="number" min="0" step="1" required /></div>
                    <div className="field checkbox-field"><label className="checkbox-label" htmlFor="client-billable-react"><input id="client-billable-react" checked={billable} onChange={(event) => setBillable(event.target.checked)} type="checkbox" /><span>Billable overflow</span></label></div>
                    <div className="field"><label htmlFor="client-description-react">Description</label><textarea id="client-description-react" value={description} onChange={(event) => setDescription(event.target.value)} rows={4} maxLength={1000}></textarea></div>
                    <div className="form-actions"><button className="btn btn-primary" type="submit">Save client</button><button className="btn btn-secondary" type="button" onClick={() => setEditingClient(null)}>Cancel</button></div>
                  </form>
                </section>
              </div>
            </section>
          </div>
        </div>
      ) : null}

      {selectedClient ? (
        <div className="client-modal" onClick={() => setSelectedClient(null)}>
          <div className="client-modal-overlay">
            <section className="client-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="client-detail-title-react" onClick={(event) => event.stopPropagation()}>
              <header className="client-modal-header">
                <div><p className="route-eyebrow">Client</p><h2 id="client-detail-title-react">Client details</h2><p className="client-modal-subtitle">Review client allowance, billing behavior, and archive state.</p></div>
                <button className="modal-close-button" type="button" onClick={() => setSelectedClient(null)} aria-label="Close client modal"><span aria-hidden="true">&times;</span></button>
              </header>
              <div className="client-modal-body">
                <section className="client-modal-panel client-modal-details">
                  <div className="client-detail-identity"><span className="client-avatar client-avatar-large">{selectedClient.name.slice(0, 2).toUpperCase()}</span><div><h3 className="client-detail-name">{selectedClient.name}</h3><p className="panel-copy">{selectedClient.description || 'No description provided.'}</p></div></div>
                  <div className="client-detail-grid">
                    <div className="summary-item"><span>Monthly allowance</span><strong>{formatTimeMinutes(selectedClient.monthlyAllowanceMinutes)}</strong></div>
                    <div className="summary-item"><span>Billable overflow</span><strong>{selectedClient.billable ? 'Enabled' : 'Disabled'}</strong></div>
                    <div className="summary-item"><span>Status</span><strong>{selectedClient.archivedAt ? 'Archived' : 'Active'}</strong></div>
                    <div className="summary-item"><span>Created</span><strong>{formatDateTime(selectedClient.createdAt)}</strong></div>
                    <div className="summary-item"><span>Updated</span><strong>{formatDateTime(selectedClient.updatedAt)}</strong></div>
                  </div>
                  <div className="form-actions client-detail-actions"><button className="btn btn-primary" type="button" onClick={() => { setEditingClient(selectedClient); setSelectedClient(null); }}>Edit client</button><button className="btn btn-secondary" type="button" onClick={() => setSelectedClient(null)}>Close</button></div>
                </section>
              </div>
            </section>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={bulkConfirmOpen}
        title={view === 'archived' ? 'Restore selected clients?' : 'Archive selected clients?'}
        message={<>Apply this action to {selectedClientIds.length} selected clients?</>}
        confirmLabel={view === 'archived' ? 'Restore' : 'Archive'}
        cancelLabel="Cancel"
        destructive={view !== 'archived'}
        onClose={() => setBulkConfirmOpen(false)}
        onConfirm={() => {
          void (async () => {
            try {
              if (view === 'archived') {
                await bulkRestoreClients(selectedClientIds);
                setFeedback(`${selectedClientIds.length} clients restored successfully.`);
                showToast(`${selectedClientIds.length} clients restored successfully.`, 'success');
              } else {
                await bulkArchiveClients(selectedClientIds);
                setFeedback(`${selectedClientIds.length} clients archived successfully.`);
                showToast(`${selectedClientIds.length} clients archived successfully.`, 'success');
              }
              setBulkConfirmOpen(false);
              setError('');
              await loadData();
            } catch (archiveError) {
              const message = archiveError instanceof Error ? archiveError.message : 'Unable to update clients';
              setError(message);
              setFeedback('');
              showToast(message, 'error');
            }
          })();
        }}
      />

      <ConfirmModal
        open={confirmingClient !== null}
        title={view === 'archived' ? 'Restore client?' : 'Archive client?'}
        message={confirmingClient ? <>Are you sure you want to {view === 'archived' ? 'restore' : 'archive'} &quot;{confirmingClient.name}&quot;?</> : ''}
        confirmLabel={view === 'archived' ? 'Restore' : 'Archive'}
        cancelLabel="Cancel"
        destructive={view !== 'archived'}
        onClose={() => setConfirmingClient(null)}
        onConfirm={() => {
          if (!confirmingClient) return;
          void (async () => {
            try {
              if (view === 'archived') {
                await restoreClient(confirmingClient.id);
                setFeedback('Client restored successfully.');
                showToast('Client restored successfully.', 'success');
              } else {
                await archiveClient(confirmingClient.id);
                setFeedback('Client archived successfully.');
                showToast('Client archived successfully.', 'success');
              }
              setConfirmingClient(null);
              setError('');
              await loadData();
            } catch (archiveError) {
              const message = archiveError instanceof Error ? archiveError.message : 'Unable to update client';
              setError(message);
              setFeedback('');
              showToast(message, 'error');
            }
          })();
        }}
      />
    </section>
  );
}
