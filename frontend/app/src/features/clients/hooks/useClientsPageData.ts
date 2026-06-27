import { useEffect, useMemo, useState } from 'react';
import {
  archiveClient,
  bulkArchiveClients,
  bulkRestoreClients,
  createClient,
  fetchArchivedClients,
  fetchClient,
  fetchClients,
  updateClient,
} from '../../../lib/api/clients.api';
import type { ClientRecord } from '../../../types';
import { useToast } from '../../../../../shared/components/ToastProvider';

export function useClientsPageData() {
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

  async function saveClient() {
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

  async function confirmSingleArchiveToggle() {
    if (!confirmingClient) return;

    try {
      if (view === 'archived') {
        await bulkRestoreClients([confirmingClient.id]);
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
  }

  async function confirmBulkArchiveToggle() {
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
  }

  return {
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
    feedback,
    error,
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
    loadData,
    openDetails,
    saveClient,
    confirmSingleArchiveToggle,
    confirmBulkArchiveToggle,
  };
}
