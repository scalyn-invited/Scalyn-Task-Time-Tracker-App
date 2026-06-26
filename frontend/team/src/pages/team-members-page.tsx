import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { AddExistingMemberModal } from '../modals/add-existing-member-modal';
import { AssignRoleModal } from '../modals/assign-role-modal';
import { CreateMemberModal } from '../modals/create-member-modal';
import { addTeamMember, createUser, fetchTeam, fetchTeamMembers, fetchUsers, removeTeamMember, updateTeamMember } from '../lib/api';
import type { SafeUser, TeamMemberRecord, TeamSummary } from '../types';
import { TeamMemberList } from '../components/team-member-list';

const waitForUiFrame = () => new Promise<void>((resolve) => {
  window.requestAnimationFrame(() => resolve());
});

export function TeamMembersPage() {
  const params = useParams();
  const navigate = useNavigate();
  const teamId = Number(params.teamId);
  const [team, setTeam] = useState<TeamSummary | null>(null);
  const [members, setMembers] = useState<TeamMemberRecord[]>([]);
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [addExistingOpen, setAddExistingOpen] = useState(false);
  const [createMemberOpen, setCreateMemberOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMemberRecord | null>(null);
  const [pendingRemoveMember, setPendingRemoveMember] = useState<TeamMemberRecord | null>(null);

  const loadTeamData = async () => {
    setIsLoading(true);
    await waitForUiFrame();

    try {
      const [teamResponse, membersResponse, usersResponse] = await Promise.all([
        fetchTeam(teamId),
        fetchTeamMembers(teamId),
        fetchUsers(),
      ]);

      setTeam(teamResponse);
      setMembers(membersResponse);
      setUsers(usersResponse);
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load team');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!Number.isFinite(teamId)) {
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const [teamResponse, membersResponse, usersResponse] = await Promise.all([
          fetchTeam(teamId),
          fetchTeamMembers(teamId),
          fetchUsers(),
        ]);

        if (!cancelled) {
          setTeam(teamResponse);
          setMembers(membersResponse);
          setUsers(usersResponse);
          setError('');
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load team');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [teamId]);

  const availableUsers = useMemo(() => users.filter((user) => !members.some((member) => member.userId === user.id)), [users, members]);

  const confirmRemoveMember = async () => {
    if (!pendingRemoveMember) {
      return;
    }

    try {
      await removeTeamMember(teamId, pendingRemoveMember.id);
      setPendingRemoveMember(null);
      await waitForUiFrame();
      await loadTeamData();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Unable to remove member');
    }
  };

  if (!Number.isFinite(teamId)) {
    return <div className="team-banner">Invalid team</div>;
  }

  return (
    <section className="route-main team-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>{team?.name ?? 'Team Members'}</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="action-button" onClick={() => navigate('/teams')}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            <span>Back</span>
          </button>
          <button type="button" className="team-secondary-button" onClick={() => setAddExistingOpen(true)} disabled={isLoading || !team}>
            Add existing member
          </button>
          <button type="button" className="action-button" onClick={() => setCreateMemberOpen(true)} disabled={isLoading || !team}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Create member</span>
          </button>
        </div>
      </header>

      {error ? <div className="feedback" data-tone="error" aria-live="polite">{error}</div> : null}

      <section className="card-panel team-table-panel">
        <div className="panel-head">
          <div>
            <h2>Team members</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="empty-state">Loading members...</div>
        ) : members.length === 0 ? (
          <div className="empty-state">No members yet</div>
        ) : (
          <TeamMemberList
            members={members}
            onEditRole={(member) => setEditMember(member)}
            onRemove={(member) => setPendingRemoveMember(member)}
          />
        )}
      </section>

      <AddExistingMemberModal
        open={addExistingOpen}
        users={availableUsers}
        onClose={() => setAddExistingOpen(false)}
        onSubmit={async (values) => {
          try {
            await addTeamMember(teamId, values);
            setAddExistingOpen(false);
            await waitForUiFrame();
            await loadTeamData();
          } catch (addError) {
            setError(addError instanceof Error ? addError.message : 'Unable to add member');
            throw addError;
          }
        }}
      />

      <CreateMemberModal
        open={createMemberOpen}
        teams={team ? [team] : []}
        onClose={() => setCreateMemberOpen(false)}
        onSubmit={async (values) => {
          try {
            await createUser({
              ...values,
              assignToTeam: values.assignToTeam,
              teamId: values.assignToTeam ? teamId : undefined,
              teamRole: values.assignToTeam ? values.teamRole : undefined,
            });
            setCreateMemberOpen(false);
            await waitForUiFrame();
            await loadTeamData();
          } catch (createError) {
            setError(createError instanceof Error ? createError.message : 'Unable to save user');
            throw createError;
          }
        }}
      />

      <AssignRoleModal
        open={editMember !== null}
        member={editMember}
        onClose={() => setEditMember(null)}
        onSubmit={async (values) => {
          if (!editMember) {
            return;
          }

          try {
            await updateTeamMember(teamId, editMember.id, values);
            setEditMember(null);
            await waitForUiFrame();
            await loadTeamData();
          } catch (updateError) {
            setError(updateError instanceof Error ? updateError.message : 'Unable to update member');
            throw updateError;
          }
        }}
      />

      <ConfirmModal
        open={pendingRemoveMember !== null}
        title="Remove member?"
        message={pendingRemoveMember ? <>Remove &quot;{pendingRemoveMember.user.name}&quot; from this team? This action cannot be undone.</> : ''}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        destructive
        titleId="member-remove-confirm-title"
        messageId="member-remove-confirm-message"
        onClose={() => setPendingRemoveMember(null)}
        onConfirm={() => {
          void confirmRemoveMember();
        }}
      />
    </section>
  );
}
