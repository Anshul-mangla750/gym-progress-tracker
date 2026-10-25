import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  badge,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 ${className}`}>
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight">
            {title}
          </h1>
          {badge}
        </div>
        {subtitle && (
          <p className="text-sm text-text-secondary mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">{action}</div>}
    </div>
  );
}
