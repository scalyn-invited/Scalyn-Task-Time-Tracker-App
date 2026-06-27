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
      getRowId={(member) => member.id}
      columns={[
        { key: 'name', title: 'Name', display: (member) => member.user.name, searchValue: (member) => member.user.name },
        { key: 'email', title: 'Email', display: (member) => member.user.email, searchValue: (member) => member.user.email },
        { key: 'teamRole', title: 'Team Role', display: (member) => member.role, searchValue: (member) => member.role },
        { key: 'systemRole', title: 'System Role', display: (member) => member.user.systemRole, searchValue: (member) => member.user.systemRole },
        { key: 'joinedAt', title: 'Joined Date', display: (member) => new Date(member.joinedAt).toLocaleDateString(), sortValue: (member) => new Date(member.joinedAt).getTime() },
        { key: 'status', title: 'Status', display: (member) => member.user.isActive ? 'Active' : 'Inactive', sortValue: (member) => member.user.isActive ? 1 : 0, searchValue: (member) => member.user.isActive ? 'Active' : 'Inactive' },
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
