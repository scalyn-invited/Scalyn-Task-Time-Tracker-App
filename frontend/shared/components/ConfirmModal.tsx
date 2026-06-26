import { DialogDescription, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';
import { ModalShell } from './ModalShell';

export interface ConfirmModalProps {
  open: boolean;
  title: ReactNode;
  message: ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  eyebrow?: string;
  destructive?: boolean;
  titleId?: string;
  messageId?: string;
}

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onClose,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  eyebrow = 'Confirm action',
  destructive = false,
  titleId = 'confirm-modal-title',
  messageId = 'confirm-modal-message',
}: ConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      rootClassName="confirm-modal"
      surfaceClassName="confirm-modal-overlay"
      panelClassName="confirm-modal-dialog"
      bodyClassName="confirm-modal-open"
      dialogProps={destructive ? { 'data-destructive': 'true' } : undefined}
    >
      <header className="confirm-modal-header">
        <div>
          <p className="confirm-modal-eyebrow">{eyebrow}</p>
          <DialogTitle as="h2" id={titleId}>
            {title}
          </DialogTitle>
        </div>
        <button className="confirm-modal-close" type="button" onClick={onClose} aria-label="Close confirmation dialog">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <div className="confirm-modal-body">
        <DialogDescription as="div" id={messageId} className="confirm-modal-message">
          {message}
        </DialogDescription>
        <div className="confirm-modal-actions">
          <button className="confirm-modal-button is-secondary confirm-modal-cancel" type="button" onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            className={`confirm-modal-button is-primary confirm-modal-confirm${destructive ? ' is-destructive' : ''}`}
            type="button"
            data-variant={destructive ? 'destructive' : 'primary'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
