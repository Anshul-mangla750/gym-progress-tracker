import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'bg-white border border-[#E2E8E4] shadow-xs',
  elevated: 'bg-white border border-[#E2E8E4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]',
  interactive: 'bg-white border border-[#E2E8E4] hover:border-emerald-500/60 hover:shadow-[0_8px_30px_-6px_rgba(22,163,74,0.12)] hover:-translate-y-0.5 cursor-pointer transition-all duration-200',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-2.5 sm:p-4',
  md: 'p-3.5 sm:p-5 md:p-6',
  lg: 'p-4 sm:p-6 md:p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action, className = '', children, ...props }: CardHeaderProps) {
  if (children) {
    return (
      <div className={`flex items-center justify-between pb-4 border-b border-border-default ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={`flex items-start justify-between gap-4 pb-4 border-b border-border-default ${className}`} {...props}>
      <div>
        {title && <h3 className="font-heading font-semibold text-base sm:text-lg text-text-primary">{title}</h3>}
        {subtitle && <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
