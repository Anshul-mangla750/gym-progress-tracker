import type { ProgressionSuggestion, SetLog, WeightUnit } from '../../types';
import { ProgressionBadge } from './ProgressionBadge';
import { History, TrendingUp } from 'lucide-react';

interface PreviousPerformanceProps {
  previousSets?: SetLog[];
  previousSummary?: string;
  suggestion?: ProgressionSuggestion | null;
  unit?: WeightUnit;
  onApplyPreviousWeights?: () => void;
  className?: string;
}

export function PreviousPerformance({
  previousSummary,
  suggestion,
  onApplyPreviousWeights,
  className = '',
}: PreviousPerformanceProps) {
  if (!previousSummary && !suggestion) return null;

  return (
    <div
      className={`
        bg-bg-secondary/70 border border-border-default rounded-xl p-3 sm:p-3.5
        flex flex-col sm:flex-row sm:items-center justify-between gap-2.5
        text-xs ${className}
      `}
    >
      <div className="flex items-start sm:items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-accent-primary shrink-0">
          <History size={14} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-text-primary">Last Session:</span>
            <span className="text-text-secondary font-mono tracking-tight tabular-nums">
              {previousSummary || 'None recorded'}
            </span>
          </div>
          {suggestion && suggestion.type !== 'first_session' && (
            <div className="text-text-muted mt-0.5 flex items-center gap-1.5 flex-wrap">
              <TrendingUp size={12} className="text-accent-primary shrink-0" />
              <span>{suggestion.message}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        {suggestion && <ProgressionBadge suggestion={suggestion} />}
        {onApplyPreviousWeights && (
          <button
            type="button"
            onClick={onApplyPreviousWeights}
            className="text-[11px] font-semibold text-accent-primary hover:underline cursor-pointer px-2 py-1 bg-accent-primary/10 rounded-md border border-accent-primary/20"
          >
            Copy Previous
          </button>
        )}
      </div>
    </div>
  );
}
