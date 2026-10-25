import type { ReactNode } from 'react';
import { Card } from './Card';

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
  };
  subtitle?: string;
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
    <Card
      padding="md"
      onClick={onClick}
      className={`flex flex-col justify-between bg-white border border-[#E5E9E6] rounded-2xl shadow-xs hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {icon && (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block leading-tight truncate">
              {title}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5 min-w-0 flex-wrap">
              <span className="text-lg sm:text-2xl lg:text-[26px] font-heading font-extrabold text-neutral-900 tracking-tight tabular-nums leading-none truncate">
                {value}
              </span>
              {unit && (
                <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 shrink-0">
                  {unit}
                </span>
              )}
            </div>
          </div>
        </div>

        {rightVisual && (
          <div className="shrink-0 pt-0.5 hidden sm:block">
            {rightVisual}
          </div>
        )}
      </div>

      {(trend || subtitle) && (
        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] sm:text-xs min-w-0">
          {trend ? (
            <span
              className={`inline-flex items-center gap-1 font-semibold tabular-nums min-w-0 truncate ${
                trend.value > 0
                  ? trend.isPositiveGood !== false
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                  : 'text-neutral-500'
              }`}
            >
              <span className="text-[10px] shrink-0">↗</span>
              <span className="shrink-0">{trend.value > 0 ? `+${trend.value}%` : `${trend.value}%`}</span>
              {trend?.label && (
                <span className="text-neutral-500 font-normal ml-0.5 truncate hidden xs:inline">
                  {trend.label}
                </span>
              )}
            </span>
          ) : subtitle ? (
            <span className="text-neutral-500 font-normal truncate block w-full">{subtitle}</span>
          ) : null}
        </div>
      )}
    </Card>
  );
}
