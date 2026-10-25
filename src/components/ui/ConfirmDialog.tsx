import type { ReactNode } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, Info } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center text-center p-2">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center mb-4
            ${variant === 'danger' ? 'bg-error-muted text-error' : ''}
            ${variant === 'warning' ? 'bg-warning-muted text-warning' : ''}
            ${variant === 'primary' ? 'bg-accent-primary-muted text-accent-primary' : ''}
          `}
        >
          {variant === 'danger' || variant === 'warning' ? (
            <AlertTriangle size={24} />
          ) : (
            <Info size={24} />
          )}
        </div>

        <h3 className="font-heading font-bold text-lg text-text-primary mb-2">{title}</h3>
        <div className="text-sm text-text-secondary mb-6">{message}</div>

        <div className="flex gap-3 w-full">
          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            fullWidth
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
