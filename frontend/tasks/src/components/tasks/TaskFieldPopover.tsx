import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { statusLabel } from '../../lib/format';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from './TaskStatusBadge';
import type { TaskPriority, TaskStatus } from '../../types';
import type { RefObject } from 'react';

type TaskFieldValue = TaskStatus | TaskPriority;
type TaskFieldKind = 'status' | 'priority';

interface TaskFieldPopoverOption {
  value: TaskFieldValue;
  className: string;
}

interface TaskFieldPopoverProps {
  open: boolean;
  field: TaskFieldKind;
  taskTitle: string;
  value: TaskFieldValue;
  anchorRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onSave: (value: TaskFieldValue) => Promise<void>;
}

type OverlayPosition = {
  top: number;
  left: number;
  visibility: 'hidden' | 'visible';
};

const hiddenOverlayPosition: OverlayPosition = {
  top: 0,
  left: 0,
  visibility: 'hidden',
};

function getOptions(field: TaskFieldKind): TaskFieldPopoverOption[] {
  return field === 'status' ? STATUS_OPTIONS : PRIORITY_OPTIONS;
}

function createOverlayPosition(anchor: HTMLElement, overlay: HTMLElement): OverlayPosition {
  const anchorRect = anchor.getBoundingClientRect();
  const padding = 12;
  const gap = 10;
  const panelWidth = Math.min(340, window.innerWidth - padding * 2);
  const panelHeight = overlay.getBoundingClientRect().height;

  let left = anchorRect.left;
  let top = anchorRect.bottom + gap;

  if (left + panelWidth > window.innerWidth - padding) {
    left = window.innerWidth - padding - panelWidth;
  }

  left = Math.max(padding, left);

  if (top + panelHeight > window.innerHeight - padding) {
    top = anchorRect.top - gap - panelHeight;
  }

  top = Math.max(padding, Math.min(top, window.innerHeight - padding - panelHeight));

  return {
    top: Math.round(top),
    left: Math.round(left),
    visibility: 'visible',
  };
}

export function TaskFieldPopover({
  open,
  field,
  taskTitle,
  value,
  anchorRef,
  onClose,
  onSave,
}: TaskFieldPopoverProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<OverlayPosition>(hiddenOverlayPosition);
  const [draftValue, setDraftValue] = useState<TaskFieldValue>(value);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      return;
    }

    setDraftValue(value);
    setError('');
    setPosition(hiddenOverlayPosition);
  }, [open, value, field, taskTitle]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const positionOverlay = () => {
      const anchor = anchorRef.current;
      const overlay = overlayRef.current;

      if (!anchor || !anchor.isConnected || !overlay) {
        onClose();
        return;
      }

      setPosition(createOverlayPosition(anchor, overlay));
    };

    const frame = window.requestAnimationFrame(positionOverlay);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const overlay = overlayRef.current;
      const trigger = anchorRef.current;

      if (overlay?.contains(target) || trigger?.contains(target)) {
        return;
      }

      onClose();
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', positionOverlay);
    window.addEventListener('scroll', positionOverlay, true);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', positionOverlay);
      window.removeEventListener('scroll', positionOverlay, true);
    };
  }, [anchorRef, open, onClose]);

  if (!open || typeof document === 'undefined') {
    return null;
  }

  const options = getOptions(field);
  const currentLabel = statusLabel(value);

  return createPortal(
    <div className="task-label-overlay" aria-hidden={false}>
      <div
        ref={overlayRef}
        className="task-field-popover task-label-popover"
        role="dialog"
        aria-modal="false"
        aria-labelledby={`task-field-popover-${field}-title`}
        style={position}
      >
        <div className="task-label-popover-head">
          <div>
            <div id={`task-field-popover-${field}-title`} className="task-label-popover-title">
              Update {statusLabel(field)}
            </div>
            <div className="task-label-popover-subtitle">{taskTitle}</div>
          </div>
          <button type="button" className="task-label-popover-close" onClick={onClose} aria-label={`Close ${field} popover`}>
            &times;
          </button>
        </div>

        <div className="task-field-current">
          <span>Current value</span>
          <strong>{currentLabel}</strong>
        </div>

        <div className="task-field-options" role="listbox" aria-label={`Select ${field}`}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`task-field-option${draftValue === option.value ? ' is-selected' : ''}`}
              onClick={() => setDraftValue(option.value)}
              aria-pressed={draftValue === option.value}
            >
              <span className={option.className}>{statusLabel(option.value)}</span>
              {draftValue === option.value ? <span className="task-field-option-check" aria-hidden="true">Selected</span> : null}
            </button>
          ))}
        </div>

        {error ? <p className="feedback-message error task-field-feedback">{error}</p> : null}

        <div className="form-actions task-field-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={isSaving || draftValue === value}
            onClick={async () => {
              setIsSaving(true);
              setError('');

              try {
                await onSave(draftValue);
                onClose();
              } catch (nextError) {
                setError(nextError instanceof Error ? nextError.message : `Unable to update ${field}`);
              } finally {
                setIsSaving(false);
              }
            }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
