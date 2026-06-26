import { useEffect, useState, type FormEvent } from 'react';
import { ModalShell } from '../../../shared/components/ModalShell';
import type { TeamMemberRecord } from '../types';

interface Props {
  open: boolean;
  member: TeamMemberRecord | null;
  onClose: () => void;
  onSubmit: (values: { role: 'admin' | 'manager' | 'member' }) => Promise<void> | void;
}

export function EditMemberModal({ open, member, onClose, onSubmit }: Props) {
  const [role, setRole] = useState<'admin' | 'manager' | 'member'>('member');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && member) {
      setRole(member.role);
      setError('');
      setSaving(false);
    }
  }, [open, member]);

  if (!open || !member) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      await onSubmit({ role });
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to update member');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell open={open} onClose={onClose} rootClassName="team-modal-root" panelClassName="team-modal-panel">
      <form className="team-modal" onSubmit={handleSubmit}>
        <header className="team-modal-head">
          <h2>Edit Member</h2>
          <button type="button" className="team-modal-close" onClick={onClose} aria-label="Close">x</button>
        </header>

        {error ? <div className="team-form-error">{error}</div> : null}

        <label className="team-field">
          <span>Team Role</span>
          <select value={role} onChange={(event) => setRole(event.target.value as typeof role)}>
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
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
