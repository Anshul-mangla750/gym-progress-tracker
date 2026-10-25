import type { Exercise } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Dumbbell, Info, Plus } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect?: (exercise: Exercise) => void;
  onViewDetails?: (exercise: Exercise) => void;
  showAddButton?: boolean;
  className?: string;
}

export function ExerciseCard({
  exercise,
  onSelect,
  onViewDetails,
  showAddButton = false,
  className = '',
}: ExerciseCardProps) {
  return (
    <Card
      variant="interactive"
      padding="sm"
      className={`flex flex-col justify-between group transition-all duration-200 ${className}`}
      onClick={() => {
        if (onSelect) onSelect(exercise);
        else if (onViewDetails) onViewDetails(exercise);
      }}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-heading font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-primary transition-colors line-clamp-1">
            {exercise.name}
          </h4>
          <span className="text-[11px] font-medium text-text-muted capitalize shrink-0">
            {exercise.exerciseType}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <Badge variant="primary" size="sm">
            {exercise.primaryMuscle}
          </Badge>
          <Badge variant="neutral" size="sm">
            {exercise.equipment}
          </Badge>
          {exercise.isCustom && (
            <Badge variant="secondary" size="sm">
              Custom
            </Badge>
          )}
        </div>

        {exercise.techniqueNotes && (
          <p className="text-xs text-text-muted line-clamp-2 mb-3">
            {exercise.techniqueNotes}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-default/60 text-xs">
        <span className="text-text-muted flex items-center gap-1">
          <Dumbbell size={12} />
          <span className="capitalize">{exercise.trackingType.replace('_', ' ')}</span>
        </span>

        <div className="flex items-center gap-1.5">
          {onViewDetails && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(exercise);
              }}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
              title="View technique instructions"
            >
              <Info size={14} />
            </button>
          )}

          {showAddButton && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelect) onSelect(exercise);
              }}
              className="px-2.5 py-1 rounded-lg bg-accent-primary text-black font-semibold text-xs flex items-center gap-1 hover:bg-accent-primary-hover transition-colors shadow-xs"
            >
              <Plus size={13} className="stroke-[3]" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
