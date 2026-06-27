import { useEffect, useMemo, useState } from 'react';
import { createTaskLabel, deleteTaskLabel, fetchTaskLabels } from '../lib/api';
import type { SafeUser, TaskLabel } from '../types';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';

interface SettingsPageProps {
  currentUser: SafeUser;
}

export function SettingsPage({ currentUser }: SettingsPageProps) {
  const [labels, setLabels] = useState<TaskLabel[]>([]);
  const [newLabelName, setNewLabelName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [pendingDelete, setPendingDelete] = useState<TaskLabel | null>(null);
  const canEdit = useMemo(() => currentUser.role === 'ADMIN' || currentUser.role === 'MANAGER', [currentUser.role]);

  const loadLabels = async () => {
    try {
      const response = await fetchTaskLabels();
      setLabels(response);
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load settings');
    }
  };

  useEffect(() => {
    void loadLabels();
  }, []);

  return (
    <section className="route-main">
      <header className="topbar dashboard-topbar">
        <div>
          <h1>Settings</h1>
          <p className="panel-copy">Manage account preferences and the global task label catalog.</p>
        </div>
      </header>

      {feedback ? <div className="feedback" data-tone="success">{feedback}</div> : null}
      {error ? <div className="feedback" data-tone="error">{error}</div> : null}

      <section className="route-grid route-grid-single">
        <article className="card-panel route-card settings-labels-panel">
          <div className="section-header"><div><h2>Task Labels</h2></div></div>

          <div className="settings-labels-toolbar">
            <div className="settings-labels-copy" aria-hidden="true"></div>
            {canEdit ? (
              <div className="settings-label-create-row">
                <input type="text" value={newLabelName} onChange={(event) => setNewLabelName(event.target.value)} maxLength={80} placeholder="New global label" />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      await createTaskLabel(newLabelName.trim());
                      setNewLabelName('');
                      setFeedback('Label created successfully.');
                      setError('');
                      await loadLabels();
                    } catch (createError) {
                      setError(createError instanceof Error ? createError.message : 'Unable to create label');
                      setFeedback('');
                    }
                  }}
                >
                  Add label
                </button>
              </div>
            ) : null}
          </div>

          <div className="settings-label-list">
            {labels.length === 0 ? (
              <div className="empty-shell empty-shell-inline"><div><strong>No labels yet</strong><p>{canEdit ? 'Add the first label to the global catalog.' : 'Only admins and managers can manage labels.'}</p></div></div>
            ) : (
              <div className="settings-label-items">
                {labels.map((label) => (
                  <div key={label.id} className="settings-label-item">
                    <span className="task-label-chip">{label.name}</span>
                    {canEdit ? (
                      <button type="button" className="client-action client-action-archive settings-label-delete" onClick={() => setPendingDelete(label)}>
                        Delete
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </section>

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete label?"
        message={pendingDelete ? <>Delete &quot;{pendingDelete.name}&quot;?</> : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          void (async () => {
            try {
              await deleteTaskLabel(pendingDelete.id);
              setPendingDelete(null);
              setFeedback('Label deleted successfully.');
              setError('');
              await loadLabels();
            } catch (deleteError) {
              setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete label');
              setFeedback('');
            }
          })();
        }}
      />
    </section>
  );
}
