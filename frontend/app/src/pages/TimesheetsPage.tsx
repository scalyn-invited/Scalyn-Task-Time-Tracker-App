import { useEffect, useMemo, useState } from 'react';
import { bulkDeleteTimeEntries, bulkUpdateTimeEntries, deleteTimeEntry, fetchClients, fetchTasks, fetchTimesheets, fetchUsers, updateTimeEntry } from '../lib/api';
import type { ClientRecord, SafeUser, TimesheetEntry } from '../types';
import type { TaskRecord } from '../../../tasks/src/types';
import type { TimesheetResponse } from '../types';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { DataTable } from '../../../shared/components/DataTable';
import { BulkActionToolbar } from '../../../shared/components/BulkActionToolbar';

const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Number(seconds || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, '0')).join(':');
};

export function TimesheetsPage() {
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
      setError(loadError instanceof Error ? loadError.message : 'Unable to load timesheets');
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

  return (
    <section className="route-main timesheet-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Timesheets</h1>
          <p className="timesheet-subtitle">{response?.range.label ?? 'Loading range'}</p>
        </div>
        <div className="topbar-actions">
          <button className="action-button" type="button" onClick={() => void loadData()}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v6h-6" /></svg>
            <span>Refresh</span>
          </button>
          <button className="team-switcher" type="button" onClick={() => { setUserId(''); setClientId(''); setTaskId(''); setFrom(''); setTo(''); setView('monthly'); }}>
            <span>Reset filters</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </button>
        </div>
      </header>

      {feedback ? <div className="feedback" data-tone="success">{feedback}</div> : null}
      {error ? <div className="feedback" data-tone="error">{error}</div> : null}

      <section className="timesheet-summary-grid">
        <article className="stat-card stat-card-blue"><div className="stat-card-head">Total Duration</div><div className="stat-card-body"><strong>{formatDuration(response?.totals.durationSeconds ?? 0)}</strong><span>Tracked time</span></div></article>
        <article className="stat-card stat-card-green"><div className="stat-card-head">Time Entries</div><div className="stat-card-body"><strong>{response?.totals.entryCount ?? 0}</strong><span>Loaded rows</span></div></article>
        <article className="stat-card stat-card-purple"><div className="stat-card-head">Scope</div><div className="stat-card-body"><strong>{userId ? users.find((user) => String(user.id) === userId)?.name ?? 'Selected user' : 'All users'}</strong><span>{clientId ? clients.find((client) => String(client.id) === clientId)?.name ?? 'Selected client' : 'All clients'}</span></div></article>
      </section>

      <section className="card-panel timesheet-filter-panel">
        <div className="timesheet-view-toggle" role="tablist" aria-label="Timesheet view">
          {(['daily', 'weekly', 'monthly'] as const).map((candidate) => (
            <button key={candidate} type="button" className={`timesheet-view-button${view === candidate ? ' is-active' : ''}`} onClick={() => setView(candidate)}>{candidate[0].toUpperCase() + candidate.slice(1)}</button>
          ))}
        </div>

        <div className="timesheet-filter-grid">
          <label className="field"><span>User</span><select value={userId} onChange={(event) => setUserId(event.target.value)}><option value="">All users</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select></label>
          <label className="field"><span>Client</span><select value={clientId} onChange={(event) => setClientId(event.target.value)}><option value="">All clients</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label>
          <label className="field"><span>Task</span><select value={taskId} onChange={(event) => setTaskId(event.target.value)}><option value="">All tasks</option>{visibleTasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></label>
          <label className="field"><span>From</span><input type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></label>
          <label className="field"><span>To</span><input type="date" value={to} onChange={(event) => setTo(event.target.value)} /></label>
        </div>
      </section>

      <BulkActionToolbar
        count={selectedEntryIds.length}
        onClear={() => setSelectedEntryIds([])}
        actions={[
          { key: 'bulk-update', label: 'Bulk update', onClick: () => setBulkUpdateOpen(true) },
          { key: 'bulk-delete', label: 'Bulk delete', variant: 'danger', onClick: () => setBulkDeleteOpen(true) },
        ]}
      />

      <section className="card-panel timesheet-table-panel">
        <div className="panel-head"><div><h2>Time entries</h2></div></div>
        <DataTable
          data={tableEntries}
          className="timesheet-table"
          emptyMessage="No time entries found."
          searchPlaceholder="Search time entries"
          order={[[1, 'desc']]}
          selectable
          getRowId={(entry) => entry.id}
          selectedRowIds={selectedEntryIds}
          onSelectionChange={setSelectedEntryIds}
          columns={[
            {
              title: 'Created sort',
              render: (entry) => String(new Date(entry.createdAt).getTime()),
              sortValue: (entry) => new Date(entry.createdAt).getTime(),
              searchable: false,
              visible: false,
            },
            {
              title: 'Date',
              render: (entry) => new Date(entry.startTime).toLocaleDateString(),
              sortValue: (entry) => new Date(entry.createdAt).getTime(),
            },
            { title: 'Task', render: (entry) => entry.task.title },
            { title: 'Client', render: (entry) => entry.client.name },
            { title: 'Duration', render: (entry) => formatDuration(entry.durationSeconds) },
            { title: 'Description', render: (entry) => entry.description || 'No description' },
          ]}
          actions={[
            {
              action: 'edit',
              label: (entry) => `Edit time entry ${entry.id}`,
              title: 'Edit',
              onClick: (entry) => setEditingEntry(entry),
            },
            {
              action: 'delete',
              label: (entry) => `Delete time entry ${entry.id}`,
              title: 'Delete',
              variant: 'danger',
              onClick: (entry) => setPendingDeleteId(entry.id),
            },
          ]}
        />
      </section>

      {bulkUpdateOpen ? (
        <div className="client-modal" onClick={() => setBulkUpdateOpen(false)}>
          <div className="client-modal-overlay">
            <section className="client-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="bulk-timesheet-update-title" onClick={(event) => event.stopPropagation()}>
              <header className="client-modal-header">
                <div>
                  <p className="route-eyebrow">Timesheets</p>
                  <h2 id="bulk-timesheet-update-title">Bulk update time entries</h2>
                  <p className="client-modal-subtitle">Update the client and/or task for the selected entries.</p>
                </div>
                <button className="modal-close-button" type="button" onClick={() => setBulkUpdateOpen(false)} aria-label="Close bulk update modal"><span aria-hidden="true">&times;</span></button>
              </header>
              <div className="client-modal-body">
                <section className="client-modal-panel">
                  <form className="client-form" onSubmit={(event) => {
                    event.preventDefault();
                    void (async () => {
                      const changes: { clientId?: number; taskId?: number } = {};
                      if (bulkClientId) changes.clientId = Number(bulkClientId);
                      if (bulkTaskId) changes.taskId = Number(bulkTaskId);
                      if (Object.keys(changes).length === 0) {
                        setError('Select at least one field to update.');
                        setFeedback('');
                        return;
                      }
                      try {
                        await bulkUpdateTimeEntries({ timeEntryIds: selectedEntryIds, changes });
                        setBulkUpdateOpen(false);
                        setBulkClientId('');
                        setBulkTaskId('');
                        setFeedback(`${selectedEntryIds.length} time entries updated successfully.`);
                        setError('');
                        await loadData();
                      } catch (updateError) {
                        setError(updateError instanceof Error ? updateError.message : 'Unable to bulk update time entries');
                        setFeedback('');
                      }
                    })();
                  }}>
                    <div className="field"><label htmlFor="bulk-timesheet-client">Client</label><select id="bulk-timesheet-client" value={bulkClientId} onChange={(event) => { setBulkClientId(event.target.value); if (!bulkVisibleTasks.some((task) => String(task.id) === bulkTaskId)) { setBulkTaskId(''); } }}><option value="">No change</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></div>
                    <div className="field"><label htmlFor="bulk-timesheet-task">Task</label><select id="bulk-timesheet-task" value={bulkTaskId} onChange={(event) => setBulkTaskId(event.target.value)}><option value="">No change</option>{bulkVisibleTasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></div>
                    <div className="form-actions"><button className="btn btn-primary" type="submit">Apply changes</button><button className="btn btn-secondary" type="button" onClick={() => setBulkUpdateOpen(false)}>Cancel</button></div>
                  </form>
                </section>
              </div>
            </section>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={bulkDeleteOpen}
        title="Delete selected time entries?"
        message={<>Delete {selectedEntryIds.length} selected time entries? This action cannot be undone.</>}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={() => {
          void (async () => {
            try {
              await bulkDeleteTimeEntries(selectedEntryIds);
              setBulkDeleteOpen(false);
              setFeedback(`${selectedEntryIds.length} time entries deleted successfully.`);
              setError('');
              await loadData();
            } catch (deleteError) {
              setError(deleteError instanceof Error ? deleteError.message : 'Unable to bulk delete time entries');
              setFeedback('');
            }
          })();
        }}
      />

      {editingEntry ? (
        <div className="client-modal" onClick={() => setEditingEntry(null)}>
          <div className="client-modal-overlay">
            <section className="client-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="timesheet-edit-title" onClick={(event) => event.stopPropagation()}>
              <header className="client-modal-header">
                <div>
                  <p className="route-eyebrow">Timesheet</p>
                  <h2 id="timesheet-edit-title">Edit time entry</h2>
                  <p className="client-modal-subtitle">Update the client, task, times, and description for this entry.</p>
                </div>
                <button className="modal-close-button" type="button" onClick={() => setEditingEntry(null)} aria-label="Close edit modal"><span aria-hidden="true">&times;</span></button>
              </header>
              <div className="client-modal-body">
                <section className="client-modal-panel">
                  <form
                    className="client-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      void (async () => {
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
                          await loadData();
                        } catch (updateError) {
                          setError(updateError instanceof Error ? updateError.message : 'Unable to update time entry');
                          setFeedback('');
                        }
                      })();
                    }}
                  >
                    <div className="field"><label htmlFor="timesheet-edit-client">Client</label><select id="timesheet-edit-client" value={editClientId} onChange={(event) => { setEditClientId(event.target.value); if (!editVisibleTasks.some((task) => String(task.id) === editTaskId)) { setEditTaskId(''); } }} required><option value="">Select client</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></div>
                    <div className="field"><label htmlFor="timesheet-edit-task">Task</label><select id="timesheet-edit-task" value={editTaskId} onChange={(event) => setEditTaskId(event.target.value)} required><option value="">Select task</option>{editVisibleTasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></div>
                    <div className="field"><label htmlFor="timesheet-edit-start">Start time</label><input id="timesheet-edit-start" type="datetime-local" value={editStartTime} onChange={(event) => setEditStartTime(event.target.value)} required /></div>
                    <div className="field"><label htmlFor="timesheet-edit-end">End time</label><input id="timesheet-edit-end" type="datetime-local" value={editEndTime} onChange={(event) => setEditEndTime(event.target.value)} /></div>
                    <div className="field"><label htmlFor="timesheet-edit-description">Description</label><textarea id="timesheet-edit-description" rows={4} value={editDescription} onChange={(event) => setEditDescription(event.target.value)} /></div>
                    <div className="form-actions"><button className="btn btn-primary" type="submit">Save changes</button><button className="btn btn-secondary" type="button" onClick={() => setEditingEntry(null)}>Cancel</button></div>
                  </form>
                </section>
              </div>
            </section>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={pendingDeleteId !== null}
        title="Delete time entry?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onClose={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId === null) return;
          void (async () => {
            try {
              await deleteTimeEntry(pendingDeleteId);
              setPendingDeleteId(null);
              setFeedback('Time entry deleted successfully.');
              setError('');
              await loadData();
            } catch (deleteError) {
              setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete time entry');
              setFeedback('');
            }
          })();
        }}
      />
    </section>
  );
}
