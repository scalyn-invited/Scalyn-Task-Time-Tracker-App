import { DataTable } from '../../../shared/components/DataTable';
import type { TeamMemberRecord } from '../types';

interface Props {
  members: TeamMemberRecord[];
  onEditRole: (member: TeamMemberRecord) => void;
  onRemove: (member: TeamMemberRecord) => void;
}

export function TeamMemberList({ members, onEditRole, onRemove }: Props) {
  return (
    <DataTable
      data={members}
      className="team-table"
      emptyMessage="No team members found."
      searchPlaceholder="Search members"
      columns={[
        { title: 'Name', render: (member) => member.user.name },
        { title: 'Email', render: (member) => member.user.email },
        { title: 'Team Role', render: (member) => member.role },
        { title: 'System Role', render: (member) => member.user.systemRole },
        { title: 'Joined Date', render: (member) => new Date(member.joinedAt).toLocaleDateString() },
        { title: 'Status', render: (member) => member.user.isActive ? 'Active' : 'Inactive' },
      ]}
      actions={[
        {
          action: 'edit',
          label: (member) => `Change team role for ${member.user.name}`,
          title: 'Change team role',
          onClick: (member) => onEditRole(member),
        },
        {
          action: 'delete',
          label: (member) => `Remove ${member.user.name}`,
          title: 'Remove',
          variant: 'danger',
          onClick: (member) => onRemove(member),
        },
      ]}
    />
  );
}
