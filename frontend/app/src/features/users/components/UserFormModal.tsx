import type { FormEvent } from 'react';
import type { SafeUser } from '../../types';

interface EditableSeedUser {
  id: 0;
  name: '';
  email: '';
  systemRole: 'member';
  role: 'MEMBER';
  isActive: true;
  createdAt: '';
  updatedAt: '';
}

interface UserFormModalProps {
  editingUser: SafeUser | null | EditableSeedUser;
  teams: Array<{ id: number; name: string }>;
  name: string;
  email: string;
  systemRole: 'admin' | 'manager' | 'member';
  temporaryPassword: string;
  confirmPassword: string;
  assignToTeam: boolean;
  teamId: string;
  teamRole: 'manager' | 'member';
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSystemRoleChange: (value: 'admin' | 'manager' | 'member') => void;
  onTemporaryPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAssignToTeamChange: (value: boolean) => void;
  onTeamIdChange: (value: string) => void;
  onTeamRoleChange: (value: 'manager' | 'member') => void;
}

export function UserFormModal(props: UserFormModalProps) {
  const {
    editingUser,
    teams,
    name,
    email,
    systemRole,
    temporaryPassword,
    confirmPassword,
    assignToTeam,
    teamId,
    teamRole,
    onClose,
    onSubmit,
    onNameChange,
    onEmailChange,
    onSystemRoleChange,
    onTemporaryPasswordChange,
    onConfirmPasswordChange,
    onAssignToTeamChange,
    onTeamIdChange,
    onTeamRoleChange,
  } = props;

  if (!editingUser) {
    return null;
  }

  return (
    <div className="client-modal user-modal" onClick={onClose}>
      <div className="client-modal-overlay user-modal-overlay">
        <section className="client-modal-dialog user-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="user-modal-title-react" onClick={(event) => event.stopPropagation()}>
          <header className="client-modal-header">
            <div><p className="route-eyebrow">Users</p><h2 id="user-modal-title-react">{editingUser.id ? 'Edit User' : 'Add User'}</h2><p className="client-modal-subtitle">{editingUser.id ? 'Update the user name, email address, and system role.' : 'Create a new account, set the temporary password, and optionally assign it to a team.'}</p></div>
            <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close user modal"><span aria-hidden="true">&times;</span></button>
          </header>
          <div className="client-modal-body user-modal-body">
            <section className="client-modal-panel user-form-panel">
              <form className="client-form user-form" onSubmit={onSubmit}>
                <div className="field"><label htmlFor="user-name-react">Full Name</label><input id="user-name-react" value={name} onChange={(event) => onNameChange(event.target.value)} minLength={2} maxLength={100} required /></div>
                <div className="field"><label htmlFor="user-email-react">Email Address</label><input id="user-email-react" value={email} onChange={(event) => onEmailChange(event.target.value)} type="email" maxLength={255} required /></div>
                <div className="field"><label htmlFor="user-system-role-react">System Role</label><select id="user-system-role-react" value={systemRole} onChange={(event) => onSystemRoleChange(event.target.value as 'admin' | 'manager' | 'member')}><option value="member">Member</option><option value="manager">Manager</option><option value="admin">Admin</option></select></div>
                {!editingUser.id ? (
                  <>
                    <div className="field"><label htmlFor="user-temporary-password-react">Temporary Password</label><input id="user-temporary-password-react" value={temporaryPassword} onChange={(event) => onTemporaryPasswordChange(event.target.value)} type="password" minLength={8} required /></div>
                    <div className="field"><label htmlFor="user-confirm-password-react">Confirm Password</label><input id="user-confirm-password-react" value={confirmPassword} onChange={(event) => onConfirmPasswordChange(event.target.value)} type="password" minLength={8} required /></div>
                    <div className="field checkbox-field"><label className="checkbox-label" htmlFor="user-assign-to-team-react"><input id="user-assign-to-team-react" checked={assignToTeam} onChange={(event) => onAssignToTeamChange(event.target.checked)} type="checkbox" /><span>Assign to team</span></label></div>
                    {assignToTeam ? (
                      <div className="user-team-fields">
                        <div className="field"><label htmlFor="user-team-id-react">Team</label><select id="user-team-id-react" value={teamId} onChange={(event) => onTeamIdChange(event.target.value)} required><option value="">Select Team</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></div>
                        <div className="field"><label htmlFor="user-team-role-react">Team Role</label><select id="user-team-role-react" value={teamRole} onChange={(event) => onTeamRoleChange(event.target.value as 'manager' | 'member')}><option value="member">Member</option><option value="manager">Manager</option></select></div>
                      </div>
                    ) : null}
                  </>
                ) : null}
                <div className="form-actions"><button className="btn btn-primary" type="submit">{editingUser.id ? 'Update user' : 'Save user'}</button><button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button></div>
              </form>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
