import type { SafeUser } from '../../types';
import { DataTable } from '../../../../../shared/components/DataTable';

interface UsersTableProps {
  users: SafeUser[];
  loading: boolean;
  selectedUserIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onEdit: (user: SafeUser) => void;
  onDelete: (user: SafeUser) => void;
}

export function UsersTable({ users, loading, selectedUserIds, onSelectionChange, onEdit, onDelete }: UsersTableProps) {
  return (
    <section className="card-panel clients-card users-card">
      {loading ? <div className="empty-state">Loading users...</div> : (
        <DataTable
          data={users}
          className="users-table clients-table"
          emptyMessage="No users found."
          searchPlaceholder="Search users"
          selectable
          getRowId={(user) => user.id}
          selectedRowIds={selectedUserIds}
          onSelectionChange={onSelectionChange}
          columns={[
            {
              key: 'name',
              title: 'Name',
              display: (user) => `<button class="client-name-link" type="button"><span class="client-avatar">${user.name.slice(0, 2).toUpperCase()}</span><span class="client-name-copy"><strong>${user.name}</strong><span>${user.systemRole}</span></span></button>`,
              searchValue: (user) => `${user.name} ${user.systemRole}`,
            },
            { key: 'email', title: 'Email', value: 'email' },
            {
              key: 'role',
              title: 'Role',
              display: (user) => `<span class="status-pill ${user.systemRole === 'admin' ? 'status-pill-blue' : user.systemRole === 'manager' ? 'status-pill-purple' : 'status-pill-muted'}">${user.systemRole}</span>`,
              searchValue: (user) => user.systemRole,
            },
            {
              key: 'status',
              title: 'Status',
              display: (user) => `<span class="status-pill ${user.isActive ? 'status-pill-green' : 'status-pill-red'}">${user.isActive ? 'Active' : 'Inactive'}</span>`,
              sortValue: (user) => (user.isActive ? 1 : 0),
              searchValue: (user) => (user.isActive ? 'Active' : 'Inactive'),
            },
            { key: 'createdAt', title: 'Created', display: (user) => new Date(user.createdAt).toLocaleString(), sortValue: (user) => new Date(user.createdAt).getTime() },
          ]}
          actions={[
            {
              action: 'edit',
              label: (user) => `Edit ${user.name}`,
              title: 'Edit',
              onClick: (user) => onEdit(user),
            },
            {
              action: 'delete',
              label: (user) => `Delete ${user.name}`,
              title: 'Delete',
              variant: 'danger',
              onClick: (user) => onDelete(user),
            },
          ]}
        />
      )}
    </section>
  );
}
