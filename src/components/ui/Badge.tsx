import type { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-emerald-50 text-emerald-800 border-emerald-200/90 font-semibold',
  secondary: 'bg-blue-50 text-blue-700 border-blue-200/90 font-semibold',
  success: 'bg-[#E8F8EE] text-[#15803D] border-[#B9E9CA] font-bold',
  warning: 'bg-amber-50 text-amber-800 border-amber-200/80 font-semibold',
  error: 'bg-rose-50 text-rose-700 border-rose-200/80 font-semibold',
  info: 'bg-sky-50 text-sky-700 border-sky-200/80 font-semibold',
  neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200 font-medium',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
};

export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  icon,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        shrink-0 select-none tracking-wide
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
