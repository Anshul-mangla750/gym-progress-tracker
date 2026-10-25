import type { ProgressionSuggestion } from '../../types';
import { ArrowUp, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface ProgressionBadgeProps {
  suggestion: ProgressionSuggestion;
  className?: string;
  showText?: boolean;
}

export function ProgressionBadge({
  suggestion,
  className = '',
  showText = true,
}: ProgressionBadgeProps) {
  switch (suggestion.type) {
    case 'increase_weight':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-accent-primary-muted text-accent-primary border border-accent-primary/30 ${className}`}
          title={suggestion.message}
        >
          <ArrowUp size={13} className="stroke-[3]" />
          <span>Increase Weight</span>
          {showText && suggestion.suggestedWeight && (
            <span className="tabular-nums font-extrabold underline decoration-accent-primary">
              ({suggestion.suggestedWeight})
            </span>
          )}
        </span>
      );

    case 'increase_reps':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-accent-secondary-muted text-accent-secondary border border-accent-secondary/30 ${className}`}
          title={suggestion.message}
        >
          <ArrowRight size={13} className="stroke-[3]" />
          <span>Increase Reps</span>
          {showText && suggestion.suggestedReps && (
            <span className="tabular-nums font-extrabold underline decoration-accent-secondary">
              (Aim {suggestion.suggestedReps})
            </span>
          )}
        </span>
      );

    case 'repeat':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-bg-elevated text-text-secondary border border-border-default ${className}`}
          title={suggestion.message}
        >
          <RotateCcw size={12} />
          <span>Maintain / Hit Reps</span>
        </span>
      );

    case 'first_session':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-info-muted text-info border border-info/30 ${className}`}
          title={suggestion.message}
        >
          <Sparkles size={12} />
          <span>Establish Baseline</span>
        </span>
      );
  }
}
