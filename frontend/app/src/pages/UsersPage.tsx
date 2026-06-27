import { FormEvent, useEffect, useMemo, useState } from 'react';
import { bulkUpdateUserStatus, createUser, deleteUser, fetchTeams, fetchUsers, updateUser } from '../lib/api';
import type { SafeUser } from '../types';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { DataTable } from '../../../shared/components/DataTable';
import { BulkActionToolbar } from '../../../shared/components/BulkActionToolbar';
import { useToast } from '../../../shared/components/ToastProvider';

export function UsersPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [teams, setTeams] = useState<Array<{ id: number; name: string }>>([]);
  const [editingUser, setEditingUser] = useState<SafeUser | null | { id: 0; name: ''; email: ''; systemRole: 'member'; role: 'MEMBER'; isActive: true; createdAt: ''; updatedAt: '' }> (null);
  const [pendingDelete, setPendingDelete] = useState<SafeUser | null>(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [systemRole, setSystemRole] = useState<'admin' | 'manager' | 'member'>('member');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [assignToTeam, setAssignToTeam] = useState(false);
  const [teamId, setTeamId] = useState('');
  const [teamRole, setTeamRole] = useState<'manager' | 'member'>('member');
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [bulkStatusOpen, setBulkStatusOpen] = useState(false);
  const [bulkIsActive, setBulkIsActive] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [userRows, teamRows] = await Promise.all([fetchUsers(), fetchTeams()]);
      setUsers(userRows);
      setTeams(teamRows);
      setSelectedUserIds([]);
      setError('');
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Unable to load users';
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
    if (!editingUser) {
      setName('');
      setEmail('');
      setSystemRole('member');
      setTemporaryPassword('');
      setConfirmPassword('');
      setAssignToTeam(false);
      setTeamId('');
      setTeamRole('member');
      return;
    }

    setName(editingUser.name);
    setEmail(editingUser.email);
    setSystemRole(editingUser.systemRole as 'admin' | 'manager' | 'member');
    setTemporaryPassword('');
    setConfirmPassword('');
    setAssignToTeam(false);
    setTeamId('');
    setTeamRole('member');
  }, [editingUser]);

  const summary = useMemo(() => ({
    total: users.length,
    active: users.filter((user) => user.isActive).length,
    admins: users.filter((user) => user.systemRole === 'admin').length,
  }), [users]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingUser && editingUser.id !== 0) {
        await updateUser(editingUser.id, { name: name.trim(), email: email.trim(), systemRole });
        setFeedback('User updated successfully.');
        showToast('User updated successfully.', 'success');
      } else {
        await createUser({
          name: name.trim(),
          email: email.trim(),
          temporaryPassword,
          confirmPassword,
          systemRole,
          assignToTeam,
          teamId: assignToTeam && teamId ? Number(teamId) : undefined,
          teamRole: assignToTeam ? teamRole : undefined,
        });
        setFeedback('User created successfully.');
        showToast('User created successfully.', 'success');
      }

      setError('');
      setEditingUser(null);
      await loadData();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Unable to save user';
      setError(message);
      setFeedback('');
      showToast(message, 'error');
    }
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

      <section className="clients-summary-grid users-summary-grid">
        <article className="stat-card stat-card-blue"><div className="stat-card-head">Total Users</div><div className="stat-card-body"><div><strong>{summary.total}</strong><span>All accounts</span></div></div></article>
        <article className="stat-card stat-card-green"><div className="stat-card-head">Active</div><div className="stat-card-body"><div><strong>{summary.active}</strong><span>Enabled accounts</span></div></div></article>
        <article className="stat-card stat-card-purple"><div className="stat-card-head">Admins</div><div className="stat-card-body"><div><strong>{summary.admins}</strong><span>Admin access</span></div></div></article>
      </section>

      <BulkActionToolbar
        count={selectedUserIds.length}
        onClear={() => setSelectedUserIds([])}
        actions={[
          { key: 'bulk-activate', label: 'Activate selected', onClick: () => { setBulkIsActive(true); setBulkStatusOpen(true); } },
          { key: 'bulk-deactivate', label: 'Deactivate selected', variant: 'danger', onClick: () => { setBulkIsActive(false); setBulkStatusOpen(true); } },
        ]}
      />

      <section className="card-panel clients-card users-card">
        {loading ? <div className="empty-state">Loading users...</div> : (
          <DataTable
            data={users}
            className="users-table clients-table"
            emptyMessage="No users found."
            searchPlaceholder="Search users"
            selectable
            getRowId={(user) => user.id}
            selectedRowIds={selectedUserIds}
            onSelectionChange={setSelectedUserIds}
            columns={[
              {
                key: 'name',
                title: 'Name',
                display: (user) => `<button class="client-name-link" type="button"><span class="client-avatar">${user.name.slice(0, 2).toUpperCase()}</span><span class="client-name-copy"><strong>${user.name}</strong><span>${user.systemRole}</span></span></button>`,
                searchValue: (user) => `${user.name} ${user.systemRole}`,
              },
              { key: 'email', title: 'Email', value: 'email' },
              {
                key: 'role',
                title: 'Role',
                display: (user) => `<span class="status-pill ${user.systemRole === 'admin' ? 'status-pill-blue' : user.systemRole === 'manager' ? 'status-pill-purple' : 'status-pill-muted'}">${user.systemRole}</span>`,
                searchValue: (user) => user.systemRole,
              },
              {
                key: 'status',
                title: 'Status',
                display: (user) => `<span class="status-pill ${user.isActive ? 'status-pill-green' : 'status-pill-red'}">${user.isActive ? 'Active' : 'Inactive'}</span>`,
                sortValue: (user) => (user.isActive ? 1 : 0),
                searchValue: (user) => (user.isActive ? 'Active' : 'Inactive'),
              },
              { key: 'createdAt', title: 'Created', display: (user) => new Date(user.createdAt).toLocaleString(), sortValue: (user) => new Date(user.createdAt).getTime() },
            ]}
            actions={[
              {
                action: 'edit',
                label: (user) => `Edit ${user.name}`,
                title: 'Edit',
                onClick: (user) => setEditingUser(user),
              },
              {
                action: 'delete',
                label: (user) => `Delete ${user.name}`,
                title: 'Delete',
                variant: 'danger',
                onClick: (user) => setPendingDelete(user),
              },
            ]}
          />
        )}
      </section>

      <ConfirmModal
        open={bulkStatusOpen}
        title={bulkIsActive ? 'Activate selected users?' : 'Deactivate selected users?'}
        message={<>Apply this action to {selectedUserIds.length} selected users?</>}
        confirmLabel={bulkIsActive ? 'Activate' : 'Deactivate'}
        cancelLabel="Cancel"
        destructive={!bulkIsActive}
        onClose={() => setBulkStatusOpen(false)}
        onConfirm={() => {
          void (async () => {
            try {
              await bulkUpdateUserStatus(selectedUserIds, bulkIsActive);
              setBulkStatusOpen(false);
              setFeedback(`${selectedUserIds.length} users ${bulkIsActive ? 'activated' : 'deactivated'} successfully.`);
              showToast(`${selectedUserIds.length} users ${bulkIsActive ? 'activated' : 'deactivated'} successfully.`, 'success');
              setError('');
              await loadData();
            } catch (statusError) {
              const message = statusError instanceof Error ? statusError.message : 'Unable to update users';
              setError(message);
              setFeedback('');
              showToast(message, 'error');
            }
          })();
        }}
      />

      {editingUser ? (
        <div className="client-modal user-modal" onClick={() => setEditingUser(null)}>
          <div className="client-modal-overlay user-modal-overlay">
            <section className="client-modal-dialog user-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="user-modal-title-react" onClick={(event) => event.stopPropagation()}>
              <header className="client-modal-header">
                <div><p className="route-eyebrow">Users</p><h2 id="user-modal-title-react">{editingUser.id ? 'Edit User' : 'Add User'}</h2><p className="client-modal-subtitle">{editingUser.id ? 'Update the user name, email address, and system role.' : 'Create a new account, set the temporary password, and optionally assign it to a team.'}</p></div>
                <button className="modal-close-button" type="button" onClick={() => setEditingUser(null)} aria-label="Close user modal"><span aria-hidden="true">&times;</span></button>
              </header>
              <div className="client-modal-body user-modal-body">
                <section className="client-modal-panel user-form-panel">
                  <form className="client-form user-form" onSubmit={handleSubmit}>
                    <div className="field"><label htmlFor="user-name-react">Full Name</label><input id="user-name-react" value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={100} required /></div>
                    <div className="field"><label htmlFor="user-email-react">Email Address</label><input id="user-email-react" value={email} onChange={(event) => setEmail(event.target.value)} type="email" maxLength={255} required /></div>
                    <div className="field"><label htmlFor="user-system-role-react">System Role</label><select id="user-system-role-react" value={systemRole} onChange={(event) => setSystemRole(event.target.value as 'admin' | 'manager' | 'member')}><option value="member">Member</option><option value="manager">Manager</option><option value="admin">Admin</option></select></div>
                    {!editingUser.id ? (
                      <>
                        <div className="field"><label htmlFor="user-temporary-password-react">Temporary Password</label><input id="user-temporary-password-react" value={temporaryPassword} onChange={(event) => setTemporaryPassword(event.target.value)} type="password" minLength={8} required /></div>
                        <div className="field"><label htmlFor="user-confirm-password-react">Confirm Password</label><input id="user-confirm-password-react" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" minLength={8} required /></div>
                        <div className="field checkbox-field"><label className="checkbox-label" htmlFor="user-assign-to-team-react"><input id="user-assign-to-team-react" checked={assignToTeam} onChange={(event) => setAssignToTeam(event.target.checked)} type="checkbox" /><span>Assign to team</span></label></div>
                        {assignToTeam ? (
                          <div className="user-team-fields">
                            <div className="field"><label htmlFor="user-team-id-react">Team</label><select id="user-team-id-react" value={teamId} onChange={(event) => setTeamId(event.target.value)} required><option value="">Select Team</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></div>
                            <div className="field"><label htmlFor="user-team-role-react">Team Role</label><select id="user-team-role-react" value={teamRole} onChange={(event) => setTeamRole(event.target.value as 'manager' | 'member')}><option value="member">Member</option><option value="manager">Manager</option></select></div>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                    <div className="form-actions"><button className="btn btn-primary" type="submit">{editingUser.id ? 'Update user' : 'Save user'}</button><button className="btn btn-secondary" type="button" onClick={() => setEditingUser(null)}>Cancel</button></div>
                  </form>
                </section>
              </div>
            </section>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete user?"
        message={pendingDelete ? <>Delete &quot;{pendingDelete.name}&quot;? This action cannot be undone.</> : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          void (async () => {
            try {
              await deleteUser(pendingDelete.id);
              setPendingDelete(null);
              setFeedback('User deleted successfully.');
              showToast('User deleted successfully.', 'success');
              setError('');
              await loadData();
            } catch (deleteError) {
              const message = deleteError instanceof Error ? deleteError.message : 'Unable to delete user';
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
