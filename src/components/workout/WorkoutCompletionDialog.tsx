import { useState } from 'react';
import type { WorkoutSession, WeightUnit } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trophy, Clock, Dumbbell, CheckCircle2 } from 'lucide-react';
import { formatDuration } from '../../lib/date-utils';

interface WorkoutCompletionDialogProps {
  isOpen: boolean;
  session: WorkoutSession | null;
  unit: WeightUnit;
  elapsedSeconds?: number;
  onConfirm: (notes: string) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export function WorkoutCompletionDialog({
  isOpen,
  session,
  unit,
  elapsedSeconds,
  onConfirm,
  onClose,
  isLoading = false,
}: WorkoutCompletionDialogProps) {
  const [notes, setNotes] = useState('');

  if (!session) return null;

  // Calculate live stats
  let totalVolume = 0;
  let totalSets = 0;
  let totalReps = 0;

  session.exercises.forEach((ex) => {
    ex.sets.forEach((set) => {
      if (set.isCompleted && set.actualReps) {
        totalSets += 1;
        totalReps += set.actualReps;
        if (set.weight) {
          totalVolume += set.weight * set.actualReps;
        }
      }
    });
  });

  const durationSec = elapsedSeconds ?? session.durationSeconds ?? 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="flex flex-col items-center text-center p-2">
        {/* Celebration Trophy Icon */}
        <div className="w-16 h-16 rounded-2xl bg-accent-primary/20 text-accent-primary flex items-center justify-center mb-4 ring-8 ring-accent-primary/10">
          <Trophy size={32} className="stroke-[2.5]" />
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-text-primary tracking-tight">
          Workout Complete!
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1 mb-6">
          Phenomenal execution. Another brick laid towards progressive overload.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          <div className="p-3 bg-bg-secondary rounded-xl border border-border-default flex flex-col items-center">
            <Clock size={16} className="text-text-muted mb-1" />
            <span className="font-heading font-bold text-lg text-text-primary tabular-nums">
              {formatDuration(durationSec)}
            </span>
            <span className="text-[11px] text-text-muted">Duration</span>
          </div>

          <div className="p-3 bg-bg-secondary rounded-xl border border-border-default flex flex-col items-center">
            <Dumbbell size={16} className="text-accent-primary mb-1" />
            <span className="font-heading font-bold text-lg text-text-primary tabular-nums">
              {totalVolume.toLocaleString()} <span className="text-xs">{unit}</span>
            </span>
            <span className="text-[11px] text-text-muted">Volume</span>
          </div>

          <div className="p-3 bg-bg-secondary rounded-xl border border-border-default flex flex-col items-center">
            <CheckCircle2 size={16} className="text-accent-secondary mb-1" />
            <span className="font-heading font-bold text-lg text-text-primary tabular-nums">
              {totalSets} <span className="text-xs">({totalReps} reps)</span>
            </span>
            <span className="text-[11px] text-text-muted">Completed</span>
          </div>
        </div>

        {/* Notes input */}
        <div className="w-full text-left mb-6">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">
            Session Reflections / Notes (optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did your energy, sleep, or technique feel today?"
            className="w-full p-3 rounded-xl bg-bg-input border border-border-default text-text-primary text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 placeholder:text-text-muted resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <Button variant="secondary" fullWidth onClick={onClose} disabled={isLoading}>
            Resume Workout
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={() => onConfirm(notes)}
            isLoading={isLoading}
          >
            Save to History
          </Button>
        </div>
      </div>
    </Modal>
  );
}
