import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#079447] hover:bg-[#075B38] active:bg-[#05482C] text-white font-bold shadow-xs hover:shadow-md hover:shadow-emerald-700/20 active:scale-[0.98]',
  secondary:
    'bg-white border border-[#E4EDE7] text-[#101828] hover:bg-[#F8FAF9] shadow-xs active:scale-[0.98]',
  ghost:
    'bg-transparent text-[#667085] hover:text-[#101828] hover:bg-[#F8FAF9] active:scale-[0.98]',
  danger:
    'bg-[#FEE8EB] text-[#E95767] hover:bg-rose-100 border border-rose-200 active:scale-[0.98]',
  success:
    'bg-[#E8F7EC] text-[#075B38] hover:bg-emerald-100 border border-emerald-200 active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg font-medium',
  md: 'h-9 sm:h-10 px-3.5 sm:px-4 text-xs sm:text-sm gap-2 rounded-xl font-medium',
  lg: 'h-11 sm:h-12 px-5 sm:px-6 text-sm sm:text-base gap-2.5 rounded-xl font-semibold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, icon, fullWidth, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-150 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer select-none
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
