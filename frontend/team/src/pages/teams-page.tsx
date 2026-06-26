import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';
import { TeamListTable } from '../components/team-list-table';
import { CreateTeamModal } from '../modals/create-team-modal';
import { EditTeamModal } from '../modals/edit-team-modal';
import { createTeam, deleteTeam, fetchTeams, updateTeam } from '../lib/api';
import type { TeamSummary } from '../types';

const waitForUiFrame = () => new Promise<void>((resolve) => {
  window.requestAnimationFrame(() => resolve());
});

export function TeamsPage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<TeamSummary[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTeam, setEditTeam] = useState<TeamSummary | null>(null);
  const [pendingDeleteTeam, setPendingDeleteTeam] = useState<TeamSummary | null>(null);

  const loadTeams = async () => {
    setIsLoading(true);
    await waitForUiFrame();

    try {
      const response = await fetchTeams();
      setTeams(response);
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load teams');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
          const response = await fetchTeams();
          if (!cancelled) {
            setTeams(response);
            setError('');
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load teams');
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
  }, []);

  const confirmDeleteTeam = async () => {
    if (!pendingDeleteTeam) {
      return;
    }

    try {
      await deleteTeam(pendingDeleteTeam.id);
      setPendingDeleteTeam(null);
      await waitForUiFrame();
      await loadTeams();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete team');
    }
  };

  return (
    <section className="route-main team-page">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Teams</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="action-button" onClick={() => setCreateOpen(true)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
            <span>Create team</span>
          </button>
        </div>
      </header>

      {error ? <div className="feedback" data-tone="error" aria-live="polite">{error}</div> : null}

      <section className="card-panel team-table-panel">
        <div className="panel-head">
          <div>
            <h2>Team list</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="empty-state">Loading teams...</div>
        ) : teams.length === 0 ? (
          <div className="empty-state">No teams yet</div>
        ) : (
          <TeamListTable
            teams={teams}
            onViewMembers={(team) => navigate(`/teams/${team.id}`)}
            onEdit={(team) => setEditTeam(team)}
            onDelete={(team) => setPendingDeleteTeam(team)}
          />
        )}
      </section>

      <CreateTeamModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={async (values) => {
          try {
            await createTeam(values);
            setCreateOpen(false);
            await waitForUiFrame();
            await loadTeams();
          } catch (createError) {
            setError(createError instanceof Error ? createError.message : 'Unable to save team');
            throw createError;
          }
        }}
      />

      <EditTeamModal
        open={editTeam !== null}
        team={editTeam}
        onClose={() => setEditTeam(null)}
        onSubmit={async (values) => {
          if (!editTeam) {
            return;
          }

          try {
            await updateTeam(editTeam.id, values);
            setEditTeam(null);
            await waitForUiFrame();
            await loadTeams();
          } catch (updateError) {
            setError(updateError instanceof Error ? updateError.message : 'Unable to save team');
            throw updateError;
          }
        }}
      />

      <ConfirmModal
        open={pendingDeleteTeam !== null}
        title="Delete team?"
        message={pendingDeleteTeam ? <>Delete &quot;{pendingDeleteTeam.name}&quot;? This action cannot be undone.</> : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        titleId="team-delete-confirm-title"
        messageId="team-delete-confirm-message"
        onClose={() => setPendingDeleteTeam(null)}
        onConfirm={() => {
          void confirmDeleteTeam();
        }}
      />
    </section>
  );
}
