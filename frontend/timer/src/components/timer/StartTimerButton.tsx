interface StartTimerButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function StartTimerButton({ onClick, disabled = false, loading = false }: StartTimerButtonProps) {
  return (
    <button className="action-button timer-start-button" type="button" onClick={onClick} disabled={disabled || loading}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      <span>{loading ? 'Starting...' : 'Start Timer'}</span>
    </button>
  );
}
