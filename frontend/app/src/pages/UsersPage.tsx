import { FormEvent } from 'react';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { BulkActionToolbar } from '../../../shared/components/BulkActionToolbar';
import { UsersSummaryCards } from '../features/users/components/UsersSummaryCards';
import { UsersTable } from '../features/users/components/UsersTable';
import { UserFormModal } from '../features/users/components/UserFormModal';
import { useUsersPageData } from '../features/users/hooks/useUsersPageData';

export function UsersPage() {
  const {
    users,
    teams,
    editingUser,
    setEditingUser,
    pendingDelete,
    setPendingDelete,
    loading,
    name,
    setName,
    email,
    setEmail,
    systemRole,
    setSystemRole,
    temporaryPassword,
    setTemporaryPassword,
    confirmPassword,
    setConfirmPassword,
    assignToTeam,
    setAssignToTeam,
    teamId,
    setTeamId,
    teamRole,
    setTeamRole,
    selectedUserIds,
    setSelectedUserIds,
    bulkStatusOpen,
    setBulkStatusOpen,
    bulkIsActive,
    setBulkIsActive,
    summary,
    saveUser,
    confirmBulkStatusUpdate,
    confirmDeleteUser,
  } = useUsersPageData();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void saveUser();
  }

  return (
    <section className="route-main users-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Users</h1>
          <p className="users-subtitle">Manage admin access, account status, and optional team assignment.</p>
        </div>
        <div className="topbar-actions">
          <button className="action-button" type="button" onClick={() => setEditingUser({ id: 0, name: '', email: '', systemRole: 'member', role: 'MEMBER', isActive: true, createdAt: '', updatedAt: '' })}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Add User</span>
          </button>
        </div>
      </header>

      <UsersSummaryCards total={summary.total} active={summary.active} admins={summary.admins} />

      <BulkActionToolbar
        count={selectedUserIds.length}
        onClear={() => setSelectedUserIds([])}
        actions={[
          { key: 'bulk-activate', label: 'Activate selected', onClick: () => { setBulkIsActive(true); setBulkStatusOpen(true); } },
          { key: 'bulk-deactivate', label: 'Deactivate selected', variant: 'danger', onClick: () => { setBulkIsActive(false); setBulkStatusOpen(true); } },
        ]}
      />

      <UsersTable
        users={users}
        loading={loading}
        selectedUserIds={selectedUserIds}
        onSelectionChange={setSelectedUserIds}
        onEdit={setEditingUser}
        onDelete={setPendingDelete}
      />

      <ConfirmModal
        open={bulkStatusOpen}
        title={bulkIsActive ? 'Activate selected users?' : 'Deactivate selected users?'}
        message={<>Apply this action to {selectedUserIds.length} selected users?</>}
        confirmLabel={bulkIsActive ? 'Activate' : 'Deactivate'}
        cancelLabel="Cancel"
        destructive={!bulkIsActive}
        onClose={() => setBulkStatusOpen(false)}
        onConfirm={() => {
          void confirmBulkStatusUpdate();
        }}
      />

      <UserFormModal
        editingUser={editingUser}
        teams={teams}
        name={name}
        email={email}
        systemRole={systemRole}
        temporaryPassword={temporaryPassword}
        confirmPassword={confirmPassword}
        assignToTeam={assignToTeam}
        teamId={teamId}
        teamRole={teamRole}
        onClose={() => setEditingUser(null)}
        onSubmit={handleSubmit}
        onNameChange={setName}
        onEmailChange={setEmail}
        onSystemRoleChange={setSystemRole}
        onTemporaryPasswordChange={setTemporaryPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onAssignToTeamChange={setAssignToTeam}
        onTeamIdChange={setTeamId}
        onTeamRoleChange={setTeamRole}
      />

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete user?"
        message={pendingDelete ? <>Delete &quot;{pendingDelete.name}&quot;? This action cannot be undone.</> : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          void confirmDeleteUser();
        }}
      />
    </section>
  );
}
