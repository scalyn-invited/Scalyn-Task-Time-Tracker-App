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
      getRowId={(team) => team.id}
      columns={[
        { key: 'name', title: 'Team Name', display: (team) => team.name, searchValue: (team) => team.name },
        { key: 'description', title: 'Description', display: (team) => team.description ?? '', searchValue: (team) => team.description ?? '' },
        { key: 'membersCount', title: 'Members', display: (team) => String(team.membersCount), sortValue: (team) => team.membersCount },
        { key: 'managersCount', title: 'Managers', display: (team) => String(team.managersCount), sortValue: (team) => team.managersCount },
        { key: 'createdAt', title: 'Created Date', display: (team) => new Date(team.createdAt).toLocaleDateString(), sortValue: (team) => new Date(team.createdAt).getTime() },
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
