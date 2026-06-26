import DataTable from 'datatables.net-dt';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TeamMemberRecord } from '../types';

interface Props {
  members: TeamMemberRecord[];
  onEditRole: (member: TeamMemberRecord) => void;
  onRemove: (member: TeamMemberRecord) => void;
}

export function TeamMemberList({ members, onEditRole, onRemove }: Props) {
  const navigate = useNavigate();
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dataTableRef = useRef<DataTable | null>(null);

  useEffect(() => {
    const table = tableRef.current;

    if (!table) {
      return;
    }

    if (dataTableRef.current) {
      dataTableRef.current.destroy();
      dataTableRef.current = null;
    }

    const instance = new DataTable(table, {
      paging: true,
      searching: true,
      info: true,
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100],
      order: [[0, 'asc']],
      language: {
        searchPlaceholder: 'Search members',
      },
    });

    dataTableRef.current = instance;

    return () => {
      dataTableRef.current?.destroy();
      dataTableRef.current = null;
    };
  }, [members]);

  return (
    <div className="team-table-shell">
      <table ref={tableRef} className="display compact team-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Team Role</th>
            <th>System Role</th>
            <th>Joined Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.user.name}</td>
              <td>{member.user.email}</td>
              <td>{member.role}</td>
              <td>{member.user.systemRole}</td>
              <td>{new Date(member.joinedAt).toLocaleDateString()}</td>
              <td>{member.user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <div className="team-row-actions">
                  <button type="button" className="team-action-link" onClick={() => navigate('/profile')}>View Profile</button>
                  <button type="button" className="team-action-link" onClick={() => onEditRole(member)}>Change Team Role</button>
                  <button type="button" className="team-action-link team-danger" onClick={() => onRemove(member)}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
