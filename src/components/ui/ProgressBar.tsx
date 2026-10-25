interface ProgressBarProps {
  value: number; // current value
  max?: number; // max target value
  color?: 'primary' | 'secondary' | 'warning' | 'error' | 'blue';
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorClasses = {
  primary: 'bg-accent-primary',
  secondary: 'bg-accent-secondary',
  warning: 'bg-warning',
  error: 'bg-error',
  blue: 'bg-info',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  showLabel = false,
  label,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(max > 0 ? (value / max) * 100 : 0, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-medium text-text-secondary mb-1.5">
          <span>{label}</span>
          <span className="tabular-nums">
            {Math.round(value)} / {Math.round(max)} ({Math.round(percentage)}%)
          </span>
        </div>
      )}
      <div className={`w-full bg-border-default rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
