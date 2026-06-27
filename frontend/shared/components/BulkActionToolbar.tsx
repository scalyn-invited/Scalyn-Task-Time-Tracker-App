interface BulkActionToolbarProps {
  count: number;
  actions: Array<{
    key: string;
    label: string;
    variant?: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
  }>;
  onClear: () => void;
}

export function BulkActionToolbar({ count, actions, onClear }: BulkActionToolbarProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <div className="card-panel" style={{ marginBottom: '16px' }}>
      <div className="topbar-actions" style={{ justifyContent: 'space-between', width: '100%' }}>
        <strong>{count} selected</strong>
        <div className="topbar-actions">
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              className={action.variant === 'danger' ? 'btn btn-danger' : 'btn btn-primary'}
              onClick={action.onClick}
            >
              <span>{action.label}</span>
            </button>
          ))}
          <button type="button" className="btn btn-secondary" onClick={onClear}>Clear</button>
        </div>
      </div>
    </div>
  );
}
