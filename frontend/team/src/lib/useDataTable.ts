import DataTable from 'datatables.net-dt';
import { useCallback, useLayoutEffect, useRef } from 'react';

interface Options {
  pageLength?: number;
  signature?: string;
}

export function useDataTable<T extends HTMLTableElement>(options: Options = {}) {
  const tableRef = useRef<T | null>(null);
  const instanceRef = useRef<DataTable | null>(null);

  const destroy = useCallback(() => {
    if (!instanceRef.current) {
      return;
    }

    try {
      instanceRef.current.destroy();
    } catch {
      // DataTables can already be half-disposed if React is replacing the table.
    } finally {
      instanceRef.current = null;
    }
  }, []);

  useLayoutEffect(() => {
    const table = tableRef.current;
    if (!table) {
      return;
    }

    destroy();
    instanceRef.current = new DataTable(table, {
      paging: true,
      searching: true,
      info: true,
      lengthMenu: [10, 25, 50, 100],
      pageLength: options.pageLength ?? 10,
      responsive: true,
      order: [[0, 'asc']],
    });

    return () => {
      destroy();
    };
  }, [destroy, options.pageLength, options.signature]);

  return { tableRef, destroy };
}
