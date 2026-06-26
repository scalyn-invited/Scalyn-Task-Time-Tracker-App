import { useEffect, useState, type FormEvent } from 'react';
import { ModalShell } from '../../../shared/components/ModalShell';
import type { SafeUser } from '../types';

interface Props {
  open: boolean;
  users: SafeUser[];
  onClose: () => void;
  onSubmit: (values: { userId: number; role: 'manager' | 'member' }) => Promise<void> | void;
}

export function AddExistingMemberModal({ open, users, onClose, onSubmit }: Props) {
  const [userId, setUserId] = useState<number | ''>('');
  const [role, setRole] = useState<'manager' | 'member'>('member');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setUserId('');
      setRole('member');
      setError('');
      setSaving(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (userId === '') {
      setError('User is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSubmit({ userId, role });
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to add member');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell open={open} onClose={onClose} rootClassName="team-modal-root" panelClassName="team-modal-panel">
      <form className="team-modal" onSubmit={handleSubmit}>
        <header className="team-modal-head">
          <h2>Add Member</h2>
          <button type="button" className="team-modal-close" onClick={onClose} aria-label="Close">x</button>
        </header>

        {error ? <div className="team-form-error">{error}</div> : null}

        <label className="team-field">
          <span>Existing User</span>
          <select value={userId} onChange={(event) => setUserId(event.target.value ? Number(event.target.value) : '')} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>

        <label className="team-field">
          <span>Team Role</span>
          <select value={role} onChange={(event) => setRole(event.target.value as 'manager' | 'member')}>
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>
        </label>

        <footer className="team-modal-actions">
          <button type="button" className="team-secondary-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="team-primary-button" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </footer>
      </form>
    </ModalShell>
  );
}
