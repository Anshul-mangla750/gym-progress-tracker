import { useState } from 'react';
import type { WorkoutDay, PlanExercise, Exercise } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ExerciseSearch } from './ExerciseSearch';
import { Trash2, Plus, GripVertical, Clock } from 'lucide-react';

interface SplitDayEditorProps {
  day: WorkoutDay;
  dayIndex: number;
  onUpdateDay: (updatedDay: WorkoutDay) => void;
  onRemoveDay: () => void;
}

export function SplitDayEditor({
  day,
  onUpdateDay,
  onRemoveDay,
}: SplitDayEditorProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNameChange = (name: string) => {
    onUpdateDay({ ...day, name });
  };

  const handleAddExercise = (exercise: Exercise) => {
    const newPlanExercise: PlanExercise = {
      id: `pe_${Date.now()}`,
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sortOrder: day.exercises.length + 1,
      targetSets: 3,
      targetRepsMin: 8,
      targetRepsMax: 10,
      restSeconds: exercise.defaultRestSeconds || 90,
    };
    onUpdateDay({
      ...day,
      exercises: [...day.exercises, newPlanExercise],
    });
  };

  const handleUpdateExercise = (
    index: number,
    updates: Partial<PlanExercise>
  ) => {
    const updatedExercises = [...day.exercises];
    updatedExercises[index] = { ...updatedExercises[index], ...updates };
    onUpdateDay({ ...day, exercises: updatedExercises });
  };

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = day.exercises
      .filter((_, idx) => idx !== index)
      .map((e, idx) => ({ ...e, sortOrder: idx + 1 }));
    onUpdateDay({ ...day, exercises: updatedExercises });
  };

  return (
    <Card className="bg-bg-card border border-border-default mb-4">
      {/* Day header */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-border-default">
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            value={day.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full bg-transparent font-heading font-bold text-base sm:text-lg text-text-primary border-b border-transparent hover:border-border-default focus:border-accent-primary focus:outline-none transition-colors"
            placeholder="Day Name (e.g. Push Day)"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Plus size={13} />}
            onClick={() => setIsSearchOpen(true)}
          >
            Add Exercise
          </Button>

          <button
            type="button"
            onClick={onRemoveDay}
            className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-bg-elevated transition-colors"
            title="Delete Day"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Exercises list */}
      {day.exercises.length === 0 ? (
        <div className="py-6 text-center text-xs text-text-muted border border-dashed border-border-default rounded-xl bg-bg-secondary/30">
          No exercises added to this day. Click "Add Exercise" to select movements.
        </div>
      ) : (
        <div className="space-y-2">
          {day.exercises.map((pe, idx) => (
            <div
              key={pe.id}
              className="p-3 rounded-xl bg-bg-secondary border border-border-default flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 min-w-0">
                <GripVertical size={16} className="text-text-muted shrink-0 cursor-grab" />
                <div>
                  <h5 className="font-heading font-semibold text-sm text-text-primary line-clamp-1">
                    {pe.exerciseName}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                    <Clock size={11} />
                    <span>{pe.restSeconds}s rest</span>
                  </div>
                </div>
              </div>

              {/* Set & Rep config inputs */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <span>Sets:</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={pe.targetSets}
                    onChange={(e) =>
                      handleUpdateExercise(idx, {
                        targetSets: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-12 h-8 text-center rounded-lg bg-bg-input border border-border-default text-text-primary font-bold tabular-nums"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <span>Reps:</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={pe.targetRepsMin}
                    onChange={(e) =>
                      handleUpdateExercise(idx, {
                        targetRepsMin: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-11 h-8 text-center rounded-lg bg-bg-input border border-border-default text-text-primary font-bold tabular-nums"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={pe.targetRepsMax}
                    onChange={(e) =>
                      handleUpdateExercise(idx, {
                        targetRepsMax: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-11 h-8 text-center rounded-lg bg-bg-input border border-border-default text-text-primary font-bold tabular-nums"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveExercise(idx)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-error transition-colors ml-1 cursor-pointer"
                  title="Remove exercise from day"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exercise Search Modal */}
      <ExerciseSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectExercise={handleAddExercise}
      />
    </Card>
  );
}
