import { DataTable } from '../../../shared/components/DataTable';
import type { TeamSummary } from '../types';

interface Props {
  teams: TeamSummary[];
  onViewMembers: (team: TeamSummary) => void;
  onEdit: (team: TeamSummary) => void;
  onDelete: (team: TeamSummary) => void;
}

export function TeamListTable({ teams, onViewMembers, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={teams}
      className="team-table"
      emptyMessage="No teams found."
      searchPlaceholder="Search teams"
      columns={[
        { title: 'Team Name', render: (team) => team.name },
        { title: 'Description', render: (team) => team.description ?? '' },
        { title: 'Members', render: (team) => String(team.membersCount) },
        { title: 'Managers', render: (team) => String(team.managersCount) },
        { title: 'Created Date', render: (team) => new Date(team.createdAt).toLocaleDateString() },
      ]}
      actions={[
        {
          action: 'detail',
          label: (team) => `View members for ${team.name}`,
          title: 'View members',
          onClick: (team) => onViewMembers(team),
        },
        {
          action: 'edit',
          label: (team) => `Edit ${team.name}`,
          title: 'Edit',
          onClick: (team) => onEdit(team),
        },
        {
          action: 'delete',
          label: (team) => `Delete ${team.name}`,
          title: 'Delete',
          variant: 'danger',
          onClick: (team) => onDelete(team),
        },
      ]}
    />
  );
}
