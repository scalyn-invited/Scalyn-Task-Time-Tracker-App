import { useEffect, useMemo, useState } from 'react';
import { fetchClients } from '../../../lib/api/clients.api';
import { fetchTasks } from '../../../lib/api/tasks.api';
import { bulkDeleteTimeEntries, bulkUpdateTimeEntries, deleteTimeEntry, fetchTimesheets, updateTimeEntry } from '../../../lib/api/timesheets.api';
import { fetchUsers } from '../../../lib/api/users.api';
import type { ClientRecord, SafeUser, TimesheetEntry, TimesheetResponse } from '../../../types';
import type { TaskRecord } from '../../../../../tasks/src/types';
import { useToast } from '../../../../../shared/components/ToastProvider';

export function useTimesheetsPageData() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [response, setResponse] = useState<TimesheetResponse | null>(null);
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [userId, setUserId] = useState('');
  const [clientId, setClientId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);
  const [editClientId, setEditClientId] = useState('');
  const [editTaskId, setEditTaskId] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [selectedEntryIds, setSelectedEntryIds] = useState<number[]>([]);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const [bulkClientId, setBulkClientId] = useState('');
  const [bulkTaskId, setBulkTaskId] = useState('');

  const visibleTasks = useMemo(() => {
    if (!clientId) return tasks;
    return tasks.filter((task) => String(task.clientId) === clientId);
  }, [clientId, tasks]);

  const editVisibleTasks = useMemo(() => {
    if (!editClientId) return tasks;
    return tasks.filter((task) => String(task.clientId) === editClientId);
  }, [editClientId, tasks]);

  const bulkVisibleTasks = useMemo(() => {
    if (!bulkClientId) return tasks;
    return tasks.filter((task) => String(task.clientId) === bulkClientId);
  }, [bulkClientId, tasks]);

  const tableEntries = useMemo(
    () => [...(response?.groups ?? []).flatMap((group) => group.entries)].sort(
      (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    ),
    [response],
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [userRows, clientRows, taskRows, timesheetRows] = await Promise.all([
        fetchUsers(),
        fetchClients(),
        fetchTasks(),
        fetchTimesheets({
          view,
          userId: userId ? Number(userId) : undefined,
          clientId: clientId ? Number(clientId) : undefined,
          taskId: taskId ? Number(taskId) : undefined,
          from: from || undefined,
          to: to || undefined,
        }),
      ]);

      setUsers(userRows);
      setClients(clientRows);
      setTasks(taskRows);
      setResponse(timesheetRows);
      setSelectedEntryIds([]);
      setError('');
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Unable to load timesheets';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [view, userId, clientId, taskId, from, to]);

  useEffect(() => {
    if (!editingEntry) {
      setEditClientId('');
      setEditTaskId('');
      setEditStartTime('');
      setEditEndTime('');
      setEditDescription('');
      return;
    }

    setEditClientId(String(editingEntry.clientId));
    setEditTaskId(String(editingEntry.taskId));
    setEditStartTime(editingEntry.startTime.slice(0, 16));
    setEditEndTime(editingEntry.endTime ? editingEntry.endTime.slice(0, 16) : '');
    setEditDescription(editingEntry.description ?? '');
  }, [editingEntry]);

  async function saveBulkUpdate() {
    const changes: { clientId?: number; taskId?: number } = {};
    if (bulkClientId) changes.clientId = Number(bulkClientId);
    if (bulkTaskId) changes.taskId = Number(bulkTaskId);
    if (Object.keys(changes).length === 0) {
      setError('Select at least one field to update.');
      setFeedback('');
      showToast('Select at least one field to update.', 'warning');
      return;
    }
    try {
      await bulkUpdateTimeEntries({ timeEntryIds: selectedEntryIds, changes });
      setBulkUpdateOpen(false);
      setBulkClientId('');
      setBulkTaskId('');
      setFeedback(`${selectedEntryIds.length} time entries updated successfully.`);
      setError('');
      showToast(`${selectedEntryIds.length} time entries updated successfully.`, 'success');
      await loadData();
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : 'Unable to bulk update time entries';
      setError(message);
      setFeedback('');
      showToast(message, 'error');
    }
  }

  async function confirmBulkDelete() {
    try {
      await bulkDeleteTimeEntries(selectedEntryIds);
      setBulkDeleteOpen(false);
      setFeedback(`${selectedEntryIds.length} time entries deleted successfully.`);
      setError('');
      showToast(`${selectedEntryIds.length} time entries deleted successfully.`, 'success');
      await loadData();
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'Unable to bulk delete time entries';
      setError(message);
      setFeedback('');
      showToast(message, 'error');
    }
  }

  async function saveEditedEntry() {
    if (!editingEntry) return;

    try {
      await updateTimeEntry(editingEntry.id, {
        clientId: editClientId ? Number(editClientId) : undefined,
        taskId: editTaskId ? Number(editTaskId) : undefined,
        startTime: editStartTime ? new Date(editStartTime).toISOString() : undefined,
        endTime: editEndTime ? new Date(editEndTime).toISOString() : undefined,
        description: editDescription,
      });
      setEditingEntry(null);
      setFeedback('Time entry updated successfully.');
      setError('');
      showToast('Time entry updated successfully.', 'success');
      await loadData();
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : 'Unable to update time entry';
      setError(message);
      setFeedback('');
      showToast(message, 'error');
    }
  }

  async function confirmDeleteEntry() {
    if (pendingDeleteId === null) return;

    try {
      await deleteTimeEntry(pendingDeleteId);
      setPendingDeleteId(null);
      setFeedback('Time entry deleted successfully.');
      setError('');
      showToast('Time entry deleted successfully.', 'success');
      await loadData();
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'Unable to delete time entry';
      setError(message);
      setFeedback('');
      showToast(message, 'error');
    }
  }

  return {
    users,
    clients,
    tasks,
    response,
    view,
    setView,
    userId,
    setUserId,
    clientId,
    setClientId,
    taskId,
    setTaskId,
    from,
    setFrom,
    to,
    setTo,
    loading,
    pendingDeleteId,
    setPendingDeleteId,
    editingEntry,
    setEditingEntry,
    editClientId,
    setEditClientId,
    editTaskId,
    setEditTaskId,
    editStartTime,
    setEditStartTime,
    editEndTime,
    setEditEndTime,
    editDescription,
    setEditDescription,
    selectedEntryIds,
    setSelectedEntryIds,
    bulkDeleteOpen,
    setBulkDeleteOpen,
    bulkUpdateOpen,
    setBulkUpdateOpen,
    bulkClientId,
    setBulkClientId,
    bulkTaskId,
    setBulkTaskId,
    visibleTasks,
    editVisibleTasks,
    bulkVisibleTasks,
    tableEntries,
    saveBulkUpdate,
    confirmBulkDelete,
    saveEditedEntry,
    confirmDeleteEntry,
  };
}
