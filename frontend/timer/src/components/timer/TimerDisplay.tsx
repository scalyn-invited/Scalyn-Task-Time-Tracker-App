import { useEffect, useState } from 'react';
import { formatDuration } from '../../lib/format';
import { TimeEntry } from '../../types';

interface TimerDisplayProps {
  entry: TimeEntry | null;
  className?: string;
}

function getCurrentElapsed(entry: TimeEntry | null): number {
  if (!entry) {
    return 0;
  }

  if (!entry.isRunning || entry.endTime) {
    return entry.durationSeconds;
  }

  return Math.max(0, Math.floor((Date.now() - new Date(entry.startTime).getTime()) / 1000));
}

export function TimerDisplay({ entry, className }: TimerDisplayProps) {
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    if (!entry?.isRunning) {
      setNow(Date.now());
      return undefined;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [entry?.id, entry?.isRunning, entry?.startTime]);

  const elapsedSeconds = getCurrentElapsed(entry ?? null);

  return (
    <div className={className ? `${className} timer-display` : 'timer-display'}>
      <span>Elapsed</span>
      <strong>{formatDuration(elapsedSeconds)}</strong>
    </div>
  );
}
