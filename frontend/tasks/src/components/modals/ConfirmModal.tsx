import { ReactNode, useEffect } from 'react';

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
  useEffect(() => {
    if (!open) {
      document.body.classList.remove('confirm-modal-open');
      return;
    }

    document.body.classList.add('confirm-modal-open');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('confirm-modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="confirm-modal" data-destructive={destructive ? 'true' : undefined}>
      <div
        className="confirm-modal-overlay"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <section
          className="confirm-modal-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={messageId}
        >
          <header className="confirm-modal-header">
            <div>
              <p className="confirm-modal-eyebrow">{eyebrow}</p>
              <h2 id={titleId}>{title}</h2>
            </div>
            <button
              className="confirm-modal-close"
              type="button"
              onClick={onClose}
              aria-label="Close confirmation dialog"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </header>
          <div className="confirm-modal-body">
            <div id={messageId} className="confirm-modal-message">
              {message}
            </div>
            <div className="confirm-modal-actions">
              <button className="confirm-modal-button is-secondary confirm-modal-cancel" type="button" onClick={onClose}>
                {cancelLabel}
              </button>
              <button
                className={`confirm-modal-button is-primary confirm-modal-confirm${destructive ? ' is-destructive' : ''}`}
                type="button"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
