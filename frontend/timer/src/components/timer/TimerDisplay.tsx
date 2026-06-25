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

  const referenceTime =
    entry.status === 'paused'
      ? entry.pausedAt
      : entry.endTime;

  if (entry.status === 'completed' || (!referenceTime && entry.status !== 'running')) {
    return entry.durationSeconds;
  }

  const currentEndTime = referenceTime ? new Date(referenceTime).getTime() : Date.now();
  const workedSeconds = Math.floor((currentEndTime - new Date(entry.startTime).getTime()) / 1000) - entry.totalPausedSeconds;

  return Math.max(0, workedSeconds);
}

export function TimerDisplay({ entry, className }: TimerDisplayProps) {
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    if (!entry || entry.status !== 'running') {
      setNow(Date.now());
      return undefined;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [entry?.id, entry?.status, entry?.startTime, entry?.pausedAt, entry?.totalPausedSeconds]);

  const elapsedSeconds = getCurrentElapsed(entry ?? null);

  return (
    <div className={className ? `${className} timer-display` : 'timer-display'}>
      <span>{entry?.status === 'paused' ? 'Paused' : 'Elapsed'}</span>
      <strong>{formatDuration(elapsedSeconds)}</strong>
    </div>
  );
}
