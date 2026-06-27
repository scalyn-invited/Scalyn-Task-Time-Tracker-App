import { useEffect, useRef } from 'react';
import { ReportsPage } from '../../../reports/src/features/reports/reports-page';

export function ReportsRoutePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const page = new ReportsPage(rootRef.current);
    void page.start();

    return () => {
      page.destroy();
    };
  }, []);

  return <div ref={rootRef} />;
}
