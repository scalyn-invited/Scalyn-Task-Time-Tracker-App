import DataTableLib from 'datatables.net-dt';
import { useEffect, useMemo, useRef } from 'react';
import { renderTableActionButtonHtml, type TableActionIcon, type TableActionVariant, escapeHtml } from '../lib/table-action-icons';

export interface DataTableAction<T> {
  action: TableActionIcon;
  label: string | ((row: T) => string);
  title?: string | ((row: T) => string);
  variant?: TableActionVariant | ((row: T) => TableActionVariant);
  onClick: (row: T) => void;
}

export interface DataTableColumn<T> {
  key: string;
  title: string;
  value?: keyof T | ((row: T) => unknown);
  display?: (row: T) => string;
  sortValue?: (row: T) => string | number;
  searchValue?: (row: T) => string;
  orderable?: boolean;
  searchable?: boolean;
  className?: string;
  visible?: boolean;
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
  getRowId: (row: T) => number;
  selectedRowIds?: number[];
  onSelectionChange?: (ids: number[]) => void;
}

function resolveDisplayValue<T>(row: T, column: DataTableColumn<T>): string {
  if (column.display) {
    return column.display(row);
  }

  if (typeof column.value === 'function') {
    return escapeHtml(column.value(row));
  }

  if (typeof column.value === 'string') {
    return escapeHtml(row[column.value]);
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

  const rowMap = useMemo(() => {
    const next = new Map<number, T>();
    data.forEach((row) => next.set(getRowId(row), row));
    return next;
  }, [data, getRowId]);

  const visibleRowIds = useMemo(() => data.map((row) => getRowId(row)), [data, getRowId]);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) {
      return;
    }

    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    const dataTableColumns = columns.map((column) => ({
      title: column.title,
      orderable: column.orderable ?? true,
      searchable: column.searchable ?? true,
      visible: column.visible ?? true,
      className: column.className,
      render: (_value: unknown, type: string, row: T) => {
        if (type === 'sort' && column.sortValue) {
          return column.sortValue(row);
        }

        if (type === 'filter' && column.searchValue) {
          return column.searchValue(row);
        }

        return resolveDisplayValue(row, column);
      },
    }));

    if (selectable) {
      dataTableColumns.unshift({
        title: '<input type="checkbox" data-select-all />',
        orderable: false,
        searchable: false,
        visible: true,
        className: 'datatable-select-column',
        render: (_value: unknown, _type: string, row: T) => {
          const rowId = getRowId(row);
          const checked = selectedRowIds.includes(rowId);
          return `<input type="checkbox" data-select-row-id="${rowId}" ${checked ? 'checked' : ''} />`;
        },
      });
    }

    if (actions.length > 0) {
      dataTableColumns.push({
        title: 'Actions',
        orderable: false,
        searchable: false,
        visible: true,
        className: 'datatable-actions-column',
        render: (_value: unknown, _type: string, row: T) => {
          const rowId = getRowId(row);
          return `<div class="table-action-group">${actions.map((action, index) => renderTableActionButtonHtml({
            action: action.action,
            ariaLabel: typeof action.label === 'function' ? action.label(row) : action.label,
            title: typeof action.title === 'function' ? action.title(row) : action.title ?? (typeof action.label === 'function' ? action.label(row) : action.label),
            variant: typeof action.variant === 'function' ? action.variant(row) : action.variant,
            dataAttributes: { 'action-index': index, 'row-id': rowId },
          })).join('')}</div>`;
        },
      });
    }

    const instance = new DataTableLib(table, {
      data,
      columns: dataTableColumns,
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
              checkbox.checked = visibleRowIds.length > 0 && visibleRowIds.every((rowId) => selectedRowIds.includes(rowId));
              checkbox.indeterminate = visibleRowIds.some((rowId) => selectedRowIds.includes(rowId)) && !checkbox.checked;
            }
          }
        : undefined,
      responsive: false,
    });

    const clickHandler = (event: Event) => {
      const target = event.target as HTMLElement | null;

      if (selectable && target instanceof HTMLInputElement && target.matches('[data-select-all]')) {
        onSelectionChange?.(target.checked ? [...new Set(visibleRowIds)] : []);
        return;
      }

      if (selectable && target instanceof HTMLInputElement && target.matches('[data-select-row-id]')) {
        const rowId = Number(target.dataset.selectRowId);
        const next = target.checked
          ? [...selectedRowIds, rowId]
          : selectedRowIds.filter((id) => id !== rowId);
        onSelectionChange?.([...new Set(next)]);
        return;
      }

      const button = target?.closest<HTMLButtonElement>('[data-action-index][data-row-id]');
      if (!button) {
        return;
      }

      const actionIndex = Number(button.dataset.actionIndex);
      const rowId = Number(button.dataset.rowId);
      const action = actions[actionIndex];
      const row = rowMap.get(rowId);

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
    getRowId,
    onSelectionChange,
    order,
    pageLength,
    rowMap,
    searchPlaceholder,
    selectable,
    selectedRowIds,
    visibleRowIds,
  ]);

  return (
    <div className="datatable-shell">
      <table ref={tableRef} className={`display compact ${className}`.trim()} style={{ width: '100%' }} />
    </div>
  );
}
