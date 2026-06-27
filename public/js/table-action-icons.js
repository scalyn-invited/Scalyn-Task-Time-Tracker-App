const ICON_PATHS = {
  edit: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z'],
  delete: ['M3 6h18', 'M8 6V4h8v2', 'M19 6l-1 14H6L5 6', 'M10 11v6M14 11v6'],
  archive: ['M4 8h16', 'M7 8V6h10v2', 'M6 8l1 12h10l1-12', 'M10 12h4'],
  restore: ['M12 8v8', 'm8-4-4-4-4 4', 'M5 7h14l-1 13H6L5 7Z', 'M9 3h6l1 4H8l1-4Z'],
  detail: ['M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z', 'M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z'],
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildIconMarkup(action) {
  const paths = ICON_PATHS[action] || ICON_PATHS.edit;

  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths.map((path) => `<path d="${path}" />`).join('')}</svg>`;
}

export function getTableActionIconPaths(action) {
  return ICON_PATHS[action] || ICON_PATHS.edit;
}

export function renderTableActionButtonHtml({
  action,
  ariaLabel,
  title,
  className = '',
  variant = 'default',
  dataAttributes = {},
}) {
  const variantClass =
    variant === 'danger'
      ? 'table-action-button-danger'
      : variant === 'success'
        ? 'table-action-button-success'
        : '';

  const extraClassName = className ? ` ${className}` : '';
  const dataAttrs = Object.entries(dataAttributes)
    .map(([key, value]) => ` data-${key}="${escapeHtml(value)}"`)
    .join('');

  return `
    <button type="button" class="table-action-button${variantClass ? ` ${variantClass}` : ''}${extraClassName}" aria-label="${escapeHtml(ariaLabel)}" title="${escapeHtml(title)}"${dataAttrs}>
      ${buildIconMarkup(action)}
    </button>
  `;
}
