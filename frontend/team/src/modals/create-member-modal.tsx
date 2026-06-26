import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ModalShell } from '../../../shared/components/ModalShell';
import type { TeamSummary } from '../types';

interface Props {
  open: boolean;
  teams: TeamSummary[];
  onClose: () => void;
  onSubmit: (values: {
    name: string;
    email: string;
    temporaryPassword: string;
    confirmPassword: string;
    systemRole: 'admin' | 'manager' | 'member';
    assignToTeam: boolean;
    teamId?: number;
    teamRole?: 'manager' | 'member';
  }) => Promise<void> | void;
}

export function CreateMemberModal({ open, teams, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [systemRole, setSystemRole] = useState<'admin' | 'manager' | 'member'>('member');
  const [assignToTeam, setAssignToTeam] = useState(false);
  const [teamId, setTeamId] = useState<number | undefined>();
  const [teamRole, setTeamRole] = useState<'manager' | 'member'>('member');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const selectableTeams = useMemo(() => teams, [teams]);

  useEffect(() => {
    if (open) {
      setName('');
      setEmail('');
      setTemporaryPassword('');
      setConfirmPassword('');
      setSystemRole('member');
      setAssignToTeam(false);
      setTeamId(undefined);
      setTeamRole('member');
      setError('');
      setSaving(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && selectableTeams.length === 1) {
      setTeamId(selectableTeams[0].id);
      setAssignToTeam(true);
    }
  }, [open, selectableTeams]);

  useEffect(() => {
    if (!assignToTeam) {
      setTeamId(undefined);
      setTeamRole('member');
    }
  }, [assignToTeam]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      await onSubmit({
        name,
        email,
        temporaryPassword,
        confirmPassword,
        systemRole,
        assignToTeam,
        teamId,
        teamRole: assignToTeam ? teamRole : undefined,
      });
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell open={open} onClose={onClose} rootClassName="team-modal-root" panelClassName="team-modal-panel">
      <form className="team-modal" onSubmit={handleSubmit}>
        <header className="team-modal-head">
          <h2>Create Member</h2>
          <button type="button" className="team-modal-close" onClick={onClose} aria-label="Close">x</button>
        </header>

        {error ? <div className="team-form-error">{error}</div> : null}

        <label className="team-field">
          <span>Full Name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} />
        </label>

        <label className="team-field">
          <span>Email Address</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" maxLength={255} />
        </label>

        <label className="team-field">
          <span>Temporary Password</span>
          <input value={temporaryPassword} onChange={(event) => setTemporaryPassword(event.target.value)} required type="password" minLength={8} />
        </label>

        <label className="team-field">
          <span>Confirm Password</span>
          <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required type="password" minLength={8} />
        </label>

        <label className="team-field">
          <span>System Role</span>
          <select value={systemRole} onChange={(event) => setSystemRole(event.target.value as typeof systemRole)}>
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label className="team-check">
          <input type="checkbox" checked={assignToTeam} onChange={(event) => setAssignToTeam(event.target.checked)} />
          <span>Assign to Team</span>
        </label>

        {assignToTeam ? (
          <>
            <label className="team-field">
              <span>Team</span>
              <select value={teamId ?? ''} onChange={(event) => setTeamId(event.target.value ? Number(event.target.value) : undefined)} required>
                <option value="">Select Team</option>
                {selectableTeams.map((team) => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </label>

            <label className="team-field">
              <span>Team Role</span>
              <select value={teamRole} onChange={(event) => setTeamRole(event.target.value as 'manager' | 'member')}>
                <option value="member">Member</option>
                <option value="manager">Manager</option>
              </select>
            </label>
          </>
        ) : null}

        <footer className="team-modal-actions">
          <button type="button" className="team-secondary-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="team-primary-button" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </footer>
      </form>
    </ModalShell>
  );
}
