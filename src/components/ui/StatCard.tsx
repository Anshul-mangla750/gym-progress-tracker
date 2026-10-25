import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  rightVisual?: ReactNode;
  trend?: {
    value: number; // percentage or delta
    label?: string; // e.g. "vs last week"
    isPositiveGood?: boolean;
    icon?: ReactNode;
  };
  subtitle?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  rightVisual,
  trend,
  subtitle,
  className = '',
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`dashboard-stat-card flex flex-col justify-between bg-white border border-[#E4EDE7] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all min-h-[128px] ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-semibold text-[#667085] block leading-tight truncate">
              {title}
            </span>
            <div className="flex items-baseline gap-1 mt-1 min-w-0 flex-wrap">
              <span className="text-xl sm:text-2xl lg:text-[26px] font-heading font-black text-[#101828] tracking-tight tabular-nums leading-none truncate">
                {value}
              </span>
              {unit && (
                <span className="text-[10px] sm:text-xs font-bold text-[#667085] shrink-0">
                  {unit}
                </span>
              )}
            </div>
          </div>
        </div>

        {rightVisual && (
          <div className="shrink-0 pt-0.5 hidden xs:block">
            {rightVisual}
          </div>
        )}
      </div>

      {(trend || subtitle) && (
        <div className="mt-3 pt-2.5 border-t border-[#F0F4F1] flex items-center justify-between text-[11px] sm:text-xs min-w-0">
          {trend ? (
            <span
              className={`inline-flex items-center gap-1.5 font-bold tabular-nums min-w-0 truncate ${
                trend.value > 0
                  ? trend.isPositiveGood !== false
                    ? 'text-[#079447]'
                    : 'text-[#E95767]'
                  : 'text-[#667085]'
              }`}
            >
              {trend.icon ? (
                trend.icon
              ) : trend.value >= 0 ? (
                <TrendingUp size={13} className="shrink-0 stroke-[2.5]" />
              ) : (
                <TrendingDown size={13} className="shrink-0 stroke-[2.5]" />
              )}
              <span className="shrink-0">{trend.value > 0 ? `+${trend.value}%` : `${trend.value}%`}</span>
              {trend?.label && (
                <span className="text-[#667085] font-medium ml-0.5 truncate">
                  {trend.label}
                </span>
              )}
            </span>
          ) : subtitle ? (
            <div className="text-[#667085] font-medium truncate flex items-center gap-1.5 w-full">
              {subtitle}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
