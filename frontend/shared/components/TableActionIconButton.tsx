import type { MouseEventHandler } from 'react';
import { getTableActionIconPaths, type TableActionIcon, type TableActionVariant } from '../lib/table-action-icons';

export interface TableActionIconButtonProps {
  action: TableActionIcon;
  label: string;
  title?: string;
  variant?: TableActionVariant;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function TableActionIconButton({
  action,
  label,
  title,
  variant = 'default',
  className = '',
  onClick,
}: TableActionIconButtonProps) {
  const variantClass =
    variant === 'danger'
      ? 'table-action-button-danger'
      : variant === 'success'
        ? 'table-action-button-success'
        : '';

  const classNames = ['table-action-button', variantClass, className].filter(Boolean).join(' ');
  const iconPaths = getTableActionIconPaths(action);

  return (
    <button type="button" className={classNames} aria-label={label} title={title || label} onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {iconPaths.map((path) => <path key={path} d={path} />)}
      </svg>
    </button>
  );
}
