import { useEffect, useState, type FormEvent } from 'react';
import { ModalShell } from '../../../shared/components/ModalShell';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; description: string }) => Promise<void> | void;
}

export function CreateTeamModal({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName('');
      setDescription('');
      setError('');
      setSaving(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      await onSubmit({ name, description });
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save team');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell open={open} onClose={onClose} rootClassName="team-modal-root" panelClassName="team-modal-panel">
      <form className="team-modal" onSubmit={handleSubmit}>
        <header className="team-modal-head">
          <h2>Create Team</h2>
          <button type="button" className="team-modal-close" onClick={onClose} aria-label="Close">x</button>
        </header>

        {error ? <div className="team-form-error">{error}</div> : null}

        <label className="team-field">
          <span>Team Name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} />
        </label>

        <label className="team-field">
          <span>Description</span>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} />
        </label>

        <footer className="team-modal-actions">
          <button type="button" className="team-secondary-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="team-primary-button" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </footer>
      </form>
    </ModalShell>
  );
}
