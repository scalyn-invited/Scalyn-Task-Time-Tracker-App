import { useEffect, useMemo, useState } from 'react';
import { bulkUpdateUserStatus, createUser, deleteUser, fetchTeams, fetchUsers, updateUser } from '../../../lib/api/users.api';
import type { SafeUser } from '../../../types';
import { useToast } from '../../../../../shared/components/ToastProvider';

export function useUsersPageData() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [teams, setTeams] = useState<Array<{ id: number; name: string }>>([]);
  const [editingUser, setEditingUser] = useState<SafeUser | null | { id: 0; name: ''; email: ''; systemRole: 'member'; role: 'MEMBER'; isActive: true; createdAt: ''; updatedAt: '' }>(null);
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

  async function saveUser() {
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

  async function confirmBulkStatusUpdate() {
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
  }

  async function confirmDeleteUser() {
    if (!pendingDelete) return;

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
  }

  return {
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
  };
}
