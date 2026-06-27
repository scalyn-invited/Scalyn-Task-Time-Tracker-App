import type { FormEvent } from 'react';
import type { ClientRecord } from '../../types';

interface ClientFormModalProps {
  editingClient: ClientRecord | null;
  name: string;
  description: string;
  monthlyAllowanceMinutes: string;
  billable: boolean;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onMonthlyAllowanceMinutesChange: (value: string) => void;
  onBillableChange: (value: boolean) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ClientFormModal({
  editingClient,
  name,
  description,
  monthlyAllowanceMinutes,
  billable,
  onNameChange,
  onDescriptionChange,
  onMonthlyAllowanceMinutesChange,
  onBillableChange,
  onClose,
  onSubmit,
}: ClientFormModalProps) {
  if (!editingClient) {
    return null;
  }

  return (
    <div className="client-modal" onClick={onClose}>
      <div className="client-modal-overlay">
        <section className="client-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="client-modal-title-react" onClick={(event) => event.stopPropagation()}>
          <header className="client-modal-header">
            <div>
              <p className="route-eyebrow">Client</p>
              <h2 id="client-modal-title-react">{editingClient.id ? 'Edit client' : 'Create client'}</h2>
              <p className="client-modal-subtitle">Manage the client record and monthly allowance.</p>
            </div>
            <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close client modal"><span aria-hidden="true">&times;</span></button>
          </header>
          <div className="client-modal-body">
            <section className="client-modal-panel">
              <form className="client-form" onSubmit={onSubmit}>
                <div className="field"><label htmlFor="client-name-react">Client Name</label><input id="client-name-react" value={name} onChange={(event) => onNameChange(event.target.value)} minLength={2} maxLength={120} required /></div>
                <div className="field"><label htmlFor="client-allowance-react">Monthly Time Allowance (minutes)</label><input id="client-allowance-react" value={monthlyAllowanceMinutes} onChange={(event) => onMonthlyAllowanceMinutesChange(event.target.value)} type="number" min="0" step="1" required /></div>
                <div className="field checkbox-field"><label className="checkbox-label" htmlFor="client-billable-react"><input id="client-billable-react" checked={billable} onChange={(event) => onBillableChange(event.target.checked)} type="checkbox" /><span>Billable overflow</span></label></div>
                <div className="field"><label htmlFor="client-description-react">Description</label><textarea id="client-description-react" value={description} onChange={(event) => onDescriptionChange(event.target.value)} rows={4} maxLength={1000}></textarea></div>
                <div className="form-actions"><button className="btn btn-primary" type="submit">Save client</button><button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button></div>
              </form>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
