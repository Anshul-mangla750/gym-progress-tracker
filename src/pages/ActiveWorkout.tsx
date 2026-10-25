import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveWorkout } from '../hooks/useActiveWorkout';
import { useAuth } from '../hooks/useAuth';
import { useRestTimer } from '../hooks/useRestTimer';
import { SetEditor } from '../components/workout/SetEditor';
import { RestTimer } from '../components/workout/RestTimer';
import { ExerciseSearch } from '../components/workout/ExerciseSearch';
import { WorkoutCompletionDialog } from '../components/workout/WorkoutCompletionDialog';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Button } from '../components/ui/Button';
import {
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  Dumbbell,
  Play,
} from 'lucide-react';
import { formatDuration } from '../lib/date-utils';
import { toast } from 'sonner';

export function ActiveWorkout() {
  const {
    session,
    elapsedSeconds,
    updateSet,
    addSet,
    removeSet,
    addExerciseToSession,
    removeExerciseFromSession,
    completeWorkout,
    abandonWorkout,
    startEmptyWorkout,
  } = useActiveWorkout();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const unit = user?.unitPreference || 'kg';

  // Rest Timer hook
  const {
    remainingSeconds,
    totalSeconds,
    isRunning,
    progress,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addSeconds,
  } = useRestTimer();

  const handleFinishConfirm = async (notes: string) => {
    setIsFinishing(true);
    try {
      await completeWorkout(notes);
      setIsCompletionOpen(false);
      toast.success('Workout Complete! 🎉', {
        description: 'Session saved to history. Your dashboard metrics have been updated!',
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to finish workout:', err);
      toast.error('Failed to save workout session.');
    } finally {
      setIsFinishing(false);
    }
  };

  const handleAbandonConfirm = async () => {
    await abandonWorkout();
    setIsCancelConfirmOpen(false);
    toast.info('Workout session abandoned.');
    navigate('/');
  };

  if (!session) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-border-default flex items-center justify-center text-text-muted mb-4">
          <Dumbbell size={32} />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-text-primary mb-2">
          No Active Workout
        </h2>
        <p className="text-sm text-text-secondary max-w-sm mb-6">
          You don't have a workout running right now. Pick a day from your split or start a quick freestyle session.
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate('/workouts')}
          >
            Go to Split Days
          </Button>
          <Button
            variant="primary"
            icon={<Play size={15} className="fill-black" />}
            onClick={() => startEmptyWorkout('Freestyle Session')}
          >
            Start Empty Workout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="active-workout-page space-y-6 pb-20 animate-fade-in max-w-4xl mx-auto">
      {/* Active Workout Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-bg-card rounded-2xl border border-border-default sticky top-16 z-20 backdrop-blur-md bg-bg-card/90 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-primary">
              Live Session
            </span>
            <span className="text-xs text-text-muted">•</span>
            <span className="text-xs text-text-muted">{session.splitName || 'Custom'}</span>
          </div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-text-primary tracking-tight mt-0.5">
            {session.dayName || 'Workout'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Elapsed Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-elevated border border-border-default">
            <Clock size={16} className="text-accent-primary animate-pulse" />
            <span className="font-heading font-extrabold text-base text-text-primary tabular-nums tracking-tight">
              {formatDuration(elapsedSeconds)}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCancelConfirmOpen(true)}
            className="text-error hover:bg-error-muted"
            title="Cancel Workout"
          >
            <XCircle size={18} />
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<CheckCircle2 size={16} className="stroke-[2.5]" />}
            onClick={() => setIsCompletionOpen(true)}
          >
            Finish
          </Button>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-4">
        {session.exercises.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted border border-dashed border-border-default rounded-2xl bg-bg-secondary/30">
            No exercises added yet. Click "+ Add Exercise" below to start lifting!
          </div>
        ) : (
          session.exercises.map((exSession, idx) => (
            <SetEditor
              key={exSession.id}
              exerciseIndex={idx}
              exerciseSession={exSession}
              unit={unit}
              onUpdateSet={updateSet}
              onAddSet={addSet}
              onRemoveSet={removeSet}
              onRemoveExercise={removeExerciseFromSession}
              onTriggerRestTimer={() => startTimer(90)}
            />
          ))
        )}
      </div>

      {/* Add Exercise CTA */}
      <div className="flex justify-center pt-2">
        <Button
          variant="secondary"
          size="md"
          icon={<Plus size={16} />}
          onClick={() => setIsSearchOpen(true)}
        >
          Add Exercise to Session
        </Button>
      </div>

      {/* Floating Rest Timer */}
      <RestTimer
        remainingSeconds={remainingSeconds}
        totalSeconds={totalSeconds}
        isRunning={isRunning}
        progress={progress}
        onPause={pauseTimer}
        onResume={resumeTimer}
        onReset={resetTimer}
        onAddSeconds={addSeconds}
      />

      {/* Exercise Search Modal */}
      <ExerciseSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectExercise={addExerciseToSession}
      />

      {/* Workout Completion Summary Dialog */}
      <WorkoutCompletionDialog
        isOpen={isCompletionOpen}
        session={session}
        unit={unit}
        elapsedSeconds={elapsedSeconds}
        onConfirm={handleFinishConfirm}
        onClose={() => setIsCompletionOpen(false)}
        isLoading={isFinishing}
      />

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isCancelConfirmOpen}
        onClose={() => setIsCancelConfirmOpen(false)}
        onConfirm={handleAbandonConfirm}
        title="Cancel Workout Session?"
        message="Are you sure you want to abandon this session? Current logged sets will not be saved to your history."
        confirmLabel="Abandon Workout"
        cancelLabel="Keep Lifting"
        variant="danger"
      />
    </div>
  );
}
