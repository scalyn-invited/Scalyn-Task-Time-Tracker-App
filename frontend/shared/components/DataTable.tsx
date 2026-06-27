import DataTableLib from 'datatables.net-dt';
import { useEffect, useRef } from 'react';
import { renderTableActionButtonHtml, type TableActionIcon, type TableActionVariant, escapeHtml } from '../lib/table-action-icons';

export interface DataTableAction<T> {
  action: TableActionIcon;
  label: string | ((row: T) => string);
  title?: string | ((row: T) => string);
  variant?: TableActionVariant | ((row: T) => TableActionVariant);
  onClick: (row: T) => void;
}

export interface DataTableColumn<T> {
  title: string;
  value?: keyof T | ((row: T) => unknown);
  render?: (row: T) => string;
  orderable?: boolean;
  searchable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Array<DataTableColumn<T>>;
  actions?: Array<DataTableAction<T>>;
  className?: string;
  emptyMessage?: string;
  pageLength?: number;
  order?: Array<[number, 'asc' | 'desc']>;
  searchPlaceholder?: string;
  selectable?: boolean;
  getRowId?: (row: T) => number;
  selectedRowIds?: number[];
  onSelectionChange?: (ids: number[]) => void;
}

function resolveColumnValue<T>(row: T, column: DataTableColumn<T>): unknown {
  if (column.render) {
    return column.render(row);
  }

  if (typeof column.value === 'function') {
    return column.value(row);
  }

  if (typeof column.value === 'string') {
    return row[column.value];
  }

  return '';
}

export function DataTable<T>({
  data,
  columns,
  actions = [],
  className = '',
  emptyMessage = 'No records found.',
  pageLength = 10,
  order = [[0, 'asc']],
  searchPlaceholder,
  selectable = false,
  getRowId,
  selectedRowIds = [],
  onSelectionChange,
}: DataTableProps<T>) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const instanceRef = useRef<DataTableLib | null>(null);
  const rowsRef = useRef<T[]>(data);

  rowsRef.current = data;

  useEffect(() => {
    const table = tableRef.current;
    if (!table) {
      return;
    }

    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    const headers = columns.map((column) => ({
      title: column.title,
      orderable: column.orderable ?? true,
      searchable: column.searchable ?? true,
      className: column.className,
      render: (_value: unknown, _type: unknown, row: T) => {
        const value = resolveColumnValue(row, column);
        return typeof value === 'string' ? value : escapeHtml(value);
      },
    }));

    if (selectable) {
      headers.unshift({
        title: '<input type="checkbox" data-select-all />',
        orderable: false,
        searchable: false,
        className: 'datatable-select-column',
        render: (_value: unknown, _type: unknown, row: T) => {
          const rowId = getRowId ? getRowId(row) : rowsRef.current.indexOf(row) + 1;
          const checked = selectedRowIds.includes(rowId);
          return `<input type="checkbox" data-select-row="${rowId}" ${checked ? 'checked' : ''} />`;
        },
      });
    }

    if (actions.length > 0) {
      headers.push({
        title: 'Actions',
        orderable: false,
        searchable: false,
        className: 'datatable-actions-column',
        render: (_value: unknown, _type: unknown, row: T) => {
          return `<div class="table-action-group">${actions.map((action, index) => renderTableActionButtonHtml({
            action: action.action,
            ariaLabel: typeof action.label === 'function' ? action.label(row) : action.label,
            title: typeof action.title === 'function' ? action.title(row) : action.title ?? (typeof action.label === 'function' ? action.label(row) : action.label),
            variant: typeof action.variant === 'function' ? action.variant(row) : action.variant,
            dataAttributes: { 'action-index': index, 'row-index': rowsRef.current.indexOf(row) },
          })).join('')}</div>`;
        },
      });
    }

    const instance = new DataTableLib(table, {
      data,
      columns: headers,
      paging: true,
      searching: true,
      info: true,
      pageLength,
      lengthMenu: [10, 25, 50, 100],
      order,
      language: {
        emptyTable: emptyMessage,
        searchPlaceholder,
      },
      headerCallback: selectable
        ? (thead) => {
            const checkbox = thead.querySelector<HTMLInputElement>('[data-select-all]');
            if (checkbox) {
              checkbox.checked = data.length > 0 && data.every((row, index) => {
                const rowId = getRowId ? getRowId(row) : index + 1;
                return selectedRowIds.includes(rowId);
              });
            }
          }
        : undefined,
      responsive: false,
    });

    const clickHandler = (event: Event) => {
      const target = event.target as HTMLElement | null;

      if (selectable && target instanceof HTMLInputElement && target.matches('[data-select-all]')) {
        const nextIds = target.checked
          ? rowsRef.current.map((row, index) => (getRowId ? getRowId(row) : index + 1))
          : [];
        onSelectionChange?.(nextIds);
        return;
      }

      if (selectable && target instanceof HTMLInputElement && target.matches('[data-select-row]')) {
        const rowId = Number(target.dataset.selectRow);
        const next = target.checked
          ? [...selectedRowIds, rowId]
          : selectedRowIds.filter((id) => id !== rowId);
        onSelectionChange?.([...new Set(next)]);
        return;
      }

      const button = target?.closest<HTMLButtonElement>('[data-action-index][data-row-index]');
      if (!button) {
        return;
      }

      const actionIndex = Number(button.dataset.actionIndex);
      const rowIndex = Number(button.dataset.rowIndex);
      const action = actions[actionIndex];
      const row = rowsRef.current[rowIndex];

      if (!action || !row) {
        return;
      }

      action.onClick(row);
    };

    table.addEventListener('click', clickHandler);
    instanceRef.current = instance;

    return () => {
      table.removeEventListener('click', clickHandler);
      instance.destroy();
      instanceRef.current = null;
    };
  }, [
    actions,
    columns,
    data,
    emptyMessage,
    order,
    pageLength,
    searchPlaceholder,
    selectable,
    getRowId,
    selectedRowIds,
    onSelectionChange,
  ]);

  return (
    <div className="datatable-shell">
      <table ref={tableRef} className={`display compact ${className}`.trim()} style={{ width: '100%' }} />
    </div>
  );
}
