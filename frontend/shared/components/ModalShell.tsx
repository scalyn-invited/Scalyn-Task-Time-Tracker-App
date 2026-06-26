import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { HTMLAttributes, ReactNode, useEffect } from 'react';

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  rootClassName?: string;
  backdropClassName?: string;
  surfaceClassName?: string;
  panelClassName: string;
  bodyClassName?: string;
  dialogProps?: HTMLAttributes<HTMLDivElement>;
}

export function ModalShell({
  open,
  onClose,
  children,
  rootClassName,
  backdropClassName,
  surfaceClassName,
  panelClassName,
  bodyClassName = 'modal-open',
  dialogProps,
}: ModalShellProps) {
  useEffect(() => {
    if (!open) {
      document.body.classList.remove(bodyClassName);
      return;
    }

    document.body.classList.add(bodyClassName);

    return () => {
      document.body.classList.remove(bodyClassName);
    };
  }, [bodyClassName, open]);

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} className={rootClassName} {...dialogProps}>
      {backdropClassName ? <DialogBackdrop className={backdropClassName} /> : null}
      {surfaceClassName ? (
        <div className={surfaceClassName}>
          <DialogPanel className={panelClassName}>{children}</DialogPanel>
        </div>
      ) : (
        <DialogPanel className={panelClassName}>{children}</DialogPanel>
      )}
    </Dialog>
  );
}
