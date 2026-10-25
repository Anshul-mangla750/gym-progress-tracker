import type { Exercise } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Dumbbell, ShieldCheck, Clock, Layers } from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (exercise: Exercise) => void;
}

export function ExerciseDetailModal({
  exercise,
  isOpen,
  onClose,
  onSelect,
}: ExerciseDetailModalProps) {
  if (!exercise) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exercise.name}
      description={`Primary target: ${exercise.primaryMuscle.toUpperCase()}`}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Badges / Attributes */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" size="md">
            {exercise.primaryMuscle}
          </Badge>
          <Badge variant="neutral" size="md">
            {exercise.equipment}
          </Badge>
          <Badge variant="secondary" size="md">
            {exercise.exerciseType}
          </Badge>
          <Badge variant="info" size="md">
            {exercise.trackingType.replace('_', ' ')}
          </Badge>
        </div>

        {/* Secondary Muscles */}
        {exercise.secondaryMuscles.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers size={13} />
              <span>Synergist / Secondary Muscles</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {exercise.secondaryMuscles.map((sm) => (
                <span
                  key={sm}
                  className="px-2 py-0.5 rounded-md bg-bg-elevated border border-border-default text-xs text-text-secondary capitalize"
                >
                  {sm}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        {exercise.instructions && (
          <div className="bg-bg-secondary p-4 rounded-xl border border-border-default">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Dumbbell size={13} className="text-accent-primary" />
              <span>Execution Instructions</span>
            </h4>
            <p className="text-sm text-text-primary leading-relaxed">
              {exercise.instructions}
            </p>
          </div>
        )}

        {/* Technique Notes */}
        {exercise.techniqueNotes && (
          <div className="bg-accent-primary-muted/20 border border-accent-primary/20 p-4 rounded-xl">
            <h4 className="text-xs font-semibold text-accent-primary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>Coaching Cues & Technique</span>
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {exercise.techniqueNotes}
            </p>
          </div>
        )}

        {/* Default rest */}
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Clock size={14} />
          <span>Recommended rest between sets: {exercise.defaultRestSeconds} seconds</span>
        </div>

        {/* Action */}
        {onSelect && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                onSelect(exercise);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-accent-primary text-black font-bold text-sm hover:bg-accent-primary-hover transition-colors cursor-pointer"
            >
              Add to Workout
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
