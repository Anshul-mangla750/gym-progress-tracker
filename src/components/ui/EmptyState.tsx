import type { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center text-center
        p-8 sm:p-12 border border-dashed border-border-default rounded-2xl
        bg-bg-secondary/40 ${className}
      `}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-bg-elevated border border-border-default flex items-center justify-center text-text-muted mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-heading font-semibold text-base sm:text-lg text-text-primary mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-text-secondary max-w-sm mb-5">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
