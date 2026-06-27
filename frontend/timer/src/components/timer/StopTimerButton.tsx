interface StopTimerButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function StopTimerButton({ onClick, disabled = false, loading = false }: StopTimerButtonProps) {
  return (
    <button className="btn btn-danger timer-stop-button" type="button" onClick={onClick} disabled={disabled || loading}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7h10v10H7z" />
      </svg>
      <span>{loading ? 'Stopping...' : 'Stop Timer'}</span>
    </button>
  );
}
