import { FormEvent } from 'react';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { BulkActionToolbar } from '../../../shared/components/BulkActionToolbar';
import { TimesheetsSummaryCards } from '../features/timesheets/components/TimesheetsSummaryCards';
import { TimesheetsFilters } from '../features/timesheets/components/TimesheetsFilters';
import { TimesheetsTable } from '../features/timesheets/components/TimesheetsTable';
import { useTimesheetsPageData } from '../features/timesheets/hooks/useTimesheetsPageData';

const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Number(seconds || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, '0')).join(':');
};

export function TimesheetsPage() {
  const {
    users,
    clients,
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
  } = useTimesheetsPageData();

  const userScope = userId ? users.find((user) => String(user.id) === userId)?.name ?? 'Selected user' : 'All users';
  const clientScope = clientId ? clients.find((client) => String(client.id) === clientId)?.name ?? 'Selected client' : 'All clients';

  function handleBulkUpdateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void saveBulkUpdate();
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void saveEditedEntry();
  }

  return (
    <section className="route-main timesheets-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Timesheets</h1>
          <p className="timesheets-subtitle">Review tracked time, filter by user/client/task, and edit or remove entries.</p>
        </div>
      </header>

      <TimesheetsSummaryCards
        totalDuration={formatDuration(response?.totals.durationSeconds ?? 0)}
        entryCount={response?.totals.entryCount ?? 0}
        userScope={userScope}
        clientScope={clientScope}
      />

      <TimesheetsFilters
        view={view}
        onViewChange={setView}
        userId={userId}
        onUserIdChange={setUserId}
        clientId={clientId}
        onClientIdChange={setClientId}
        taskId={taskId}
        onTaskIdChange={setTaskId}
        from={from}
        onFromChange={setFrom}
        to={to}
        onToChange={setTo}
        users={users}
        clients={clients}
        visibleTasks={visibleTasks}
      />

      <BulkActionToolbar
        count={selectedEntryIds.length}
        onClear={() => setSelectedEntryIds([])}
        actions={[
          { key: 'bulk-update', label: 'Bulk update', onClick: () => setBulkUpdateOpen(true) },
          { key: 'bulk-delete', label: 'Bulk delete', variant: 'danger', onClick: () => setBulkDeleteOpen(true) },
        ]}
      />

      <TimesheetsTable
        entries={tableEntries}
        selectedEntryIds={selectedEntryIds}
        onSelectionChange={setSelectedEntryIds}
        onEdit={setEditingEntry}
        onDelete={(entry) => setPendingDeleteId(entry.id)}
      />

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
                  <form className="client-form" onSubmit={handleBulkUpdateSubmit}>
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
          void confirmBulkDelete();
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
                  <form className="client-form" onSubmit={handleEditSubmit}>
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
          void confirmDeleteEntry();
        }}
      />
    </section>
  );
}
