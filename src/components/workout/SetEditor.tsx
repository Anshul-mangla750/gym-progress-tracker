import { useState } from 'react';
import type { ExerciseSession, SetLog, WeightUnit } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PreviousPerformance } from './PreviousPerformance';
import { useProgression } from '../../hooks/useProgression';
import { Check, Plus, Trash2, MoreVertical, Flame } from 'lucide-react';

interface SetEditorProps {
  exerciseIndex: number;
  exerciseSession: ExerciseSession;
  unit: WeightUnit;
  onUpdateSet: (exerciseIndex: number, setIndex: number, updates: Partial<SetLog>) => void;
  onAddSet: (exerciseIndex: number) => void;
  onRemoveSet: (exerciseIndex: number, setIndex: number) => void;
  onRemoveExercise: (exerciseIndex: number) => void;
  onTriggerRestTimer: (seconds?: number) => void;
}

export function SetEditor({
  exerciseIndex,
  exerciseSession,
  unit,
  onUpdateSet,
  onAddSet,
  onRemoveSet,
  onRemoveExercise,
  onTriggerRestTimer,
}: SetEditorProps) {
  const [showMenu, setShowMenu] = useState(false);

  const { suggestion, previousSets, previousSummary } = useProgression({
    exerciseId: exerciseSession.exerciseId,
    targetRepsMin: exerciseSession.targetRepsMin,
    targetRepsMax: exerciseSession.targetRepsMax,
    unit,
  });

  const handleApplyPreviousWeights = () => {
    if (previousSets.length === 0) return;
    exerciseSession.sets.forEach((set, idx) => {
      const prev = previousSets[idx] || previousSets[previousSets.length - 1];
      if (prev && prev.weight !== undefined) {
        onUpdateSet(exerciseIndex, idx, {
          weight: suggestion?.suggestedWeight || prev.weight,
          targetReps: suggestion?.suggestedReps || prev.actualReps || set.targetReps,
        });
      }
    });
  };

  const handleToggleComplete = (setIndex: number, currentSet: SetLog) => {
    const isNowCompleted = !currentSet.isCompleted;
    const actualReps = isNowCompleted
      ? currentSet.actualReps || currentSet.targetReps || exerciseSession.targetRepsMax
      : currentSet.actualReps;

    onUpdateSet(exerciseIndex, setIndex, {
      isCompleted: isNowCompleted,
      actualReps,
    });

    if (isNowCompleted) {
      onTriggerRestTimer();
    }
  };

  return (
    <Card className="mb-4 overflow-hidden border border-border-default bg-bg-card">
      {/* Exercise Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-default">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary">
              {exerciseSession.exerciseName}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-bg-elevated text-text-secondary border border-border-default font-medium">
              Target: {exerciseSession.targetRepsMin}-{exerciseSession.targetRepsMax} reps
            </span>
          </div>
          {exerciseSession.notes && (
            <p className="text-xs text-text-muted mt-1 italic">{exerciseSession.notes}</p>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
          >
            <MoreVertical size={18} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 z-20 w-44 bg-bg-elevated border border-border-default rounded-xl shadow-xl py-1 text-xs animate-scale-in">
              <button
                onClick={() => {
                  handleApplyPreviousWeights();
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-text-primary hover:bg-bg-card flex items-center gap-2"
              >
                <span>Autofill Overload Target</span>
              </button>
              <button
                onClick={() => {
                  onRemoveExercise(exerciseIndex);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-error hover:bg-bg-card flex items-center gap-2"
              >
                <Trash2 size={13} />
                <span>Remove Exercise</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Previous Performance & Double Progression Advice */}
      <div className="mb-4">
        <PreviousPerformance
          previousSets={previousSets}
          previousSummary={previousSummary}
          suggestion={suggestion}
          unit={unit}
          onApplyPreviousWeights={handleApplyPreviousWeights}
        />
      </div>

      {/* Sets Table Header */}
      <div className="grid grid-cols-12 gap-2 text-[11px] font-semibold text-text-muted uppercase tracking-wider px-2 pb-2">
        <div className="col-span-2 sm:col-span-1 text-center">Set</div>
        <div className="col-span-3 sm:col-span-3 text-center">Previous</div>
        <div className="col-span-3 sm:col-span-3 text-center">{unit.toUpperCase()}</div>
        <div className="col-span-2 sm:col-span-3 text-center">Reps</div>
        <div className="col-span-2 sm:col-span-2 text-center">Done</div>
      </div>

      {/* Sets List */}
      <div className="space-y-2">
        {exerciseSession.sets.map((set, setIndex) => {
          const prevSet = previousSets[setIndex];
          const prevText = prevSet ? `${prevSet.weight ?? '-'} × ${prevSet.actualReps ?? '-'}` : '-';

          return (
            <div
              key={set.id}
              className={`
                grid grid-cols-12 gap-2 items-center p-2 rounded-xl transition-all duration-150
                ${
                  set.isCompleted
                    ? 'bg-accent-primary-muted/40 border border-accent-primary/20'
                    : 'bg-bg-secondary hover:bg-bg-elevated border border-transparent'
                }
              `}
            >
              {/* Set index */}
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-bg-card border border-border-default flex items-center justify-center text-xs font-bold text-text-secondary">
                  {set.setNumber}
                </span>
              </div>

              {/* Previous reference */}
              <div className="col-span-3 sm:col-span-3 text-center text-xs text-text-muted font-mono tabular-nums">
                {prevText}
              </div>

              {/* Weight input */}
              <div className="col-span-3 sm:col-span-3 flex justify-center">
                <input
                  type="number"
                  step="0.5"
                  placeholder="0"
                  value={set.weight !== undefined ? set.weight : ''}
                  onChange={(e) => {
                    const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                    onUpdateSet(exerciseIndex, setIndex, { weight: val });
                  }}
                  className="w-full max-w-[90px] h-9 px-2 text-center rounded-lg bg-bg-input border border-border-default text-text-primary text-sm font-semibold tabular-nums focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
                />
              </div>

              {/* Reps input */}
              <div className="col-span-2 sm:col-span-3 flex justify-center">
                <input
                  type="number"
                  step="1"
                  placeholder={String(set.targetReps || exerciseSession.targetRepsMax)}
                  value={set.actualReps !== undefined ? set.actualReps : ''}
                  onChange={(e) => {
                    const val = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                    onUpdateSet(exerciseIndex, setIndex, { actualReps: val });
                  }}
                  className="w-full max-w-[80px] h-9 px-2 text-center rounded-lg bg-bg-input border border-border-default text-text-primary text-sm font-semibold tabular-nums focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
                />
              </div>

              {/* Completion button & delete */}
              <div className="col-span-2 sm:col-span-2 flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => handleToggleComplete(setIndex, set)}
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer
                    ${
                      set.isCompleted
                        ? 'bg-accent-primary text-black shadow-md shadow-accent-primary/20 scale-105'
                        : 'bg-bg-input border border-border-default text-text-muted hover:text-text-primary hover:border-border-subtle'
                    }
                  `}
                  title={set.isCompleted ? 'Mark incomplete' : 'Complete set'}
                >
                  <Check size={16} className={set.isCompleted ? 'stroke-[3]' : ''} />
                </button>

                {exerciseSession.sets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveSet(exerciseIndex, setIndex)}
                    className="p-1 text-text-muted hover:text-error transition-colors hidden sm:inline-flex"
                    title="Delete set"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer controls: Add Set */}
      <div className="mt-3 flex items-center justify-between pt-2">
        <Button
          variant="secondary"
          size="sm"
          icon={<Plus size={14} />}
          onClick={() => onAddSet(exerciseIndex)}
        >
          Add Set
        </Button>

        <span className="text-xs text-text-muted flex items-center gap-1">
          <Flame size={12} className="text-accent-secondary" />
          <span>
            {exerciseSession.sets.filter((s) => s.isCompleted).length} / {exerciseSession.sets.length} completed
          </span>
        </span>
      </div>
    </Card>
  );
}
