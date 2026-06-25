export function formatDuration(totalSeconds: number): string {
  const safeSeconds = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0;
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  return [hours, minutes, seconds]
    .map((segment) => String(segment).padStart(2, '0'))
    .join(':');
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) {
    return '--';
  }

  return new Date(value).toLocaleString();
}

export function getInitials(name: string | null | undefined): string {
  const trimmed = String(name || 'User').trim();

  if (!trimmed) {
    return 'U';
  }

  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function toLocalDateTimeValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export function parseLocalDateTime(value: string): string {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Please enter a valid date and time');
  }

  return parsed.toISOString();
}
