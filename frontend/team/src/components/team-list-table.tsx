import DataTable from 'datatables.net-dt';
import { useEffect, useRef } from 'react';
import type { TeamSummary } from '../types';

interface Props {
  teams: TeamSummary[];
  onViewMembers: (team: TeamSummary) => void;
  onEdit: (team: TeamSummary) => void;
  onDelete: (team: TeamSummary) => void;
}

export function TeamListTable({ teams, onViewMembers, onEdit, onDelete }: Props) {
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
        searchPlaceholder: 'Search teams',
      },
    });

    dataTableRef.current = instance;

    return () => {
      dataTableRef.current?.destroy();
      dataTableRef.current = null;
    };
  }, [teams]);

  return (
    <div className="team-table-shell">
      <table ref={tableRef} className="display compact team-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Description</th>
            <th>Members</th>
            <th>Managers</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.description ?? ''}</td>
              <td>{team.membersCount}</td>
              <td>{team.managersCount}</td>
              <td>{new Date(team.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="team-row-actions">
                  <button type="button" className="team-action-link" onClick={() => onViewMembers(team)}>
                    View Members
                  </button>
                  <button type="button" className="team-action-link" onClick={() => onEdit(team)}>
                    Edit
                  </button>
                  <button type="button" className="team-action-link team-danger" onClick={() => onDelete(team)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
