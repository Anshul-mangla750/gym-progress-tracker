import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  WorkoutSession,
  WorkoutDay,
  Exercise,
  SetLog,
  ExerciseSession,
} from '../types';
import { mockApi } from '../api/mock-adapter';

interface WorkoutContextType {
  session: WorkoutSession | null;
  isActive: boolean;
  elapsedSeconds: number;
  startWorkout: (day: WorkoutDay, splitName?: string, splitId?: string) => Promise<void>;
  startEmptyWorkout: (name?: string) => Promise<void>;
  updateSet: (exerciseIndex: number, setIndex: number, updates: Partial<SetLog>) => void;
  addSet: (exerciseIndex: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
  addExerciseToSession: (exercise: Exercise) => void;
  removeExerciseFromSession: (exerciseIndex: number) => void;
  completeWorkout: (notes?: string) => Promise<WorkoutSession | null>;
  abandonWorkout: () => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Load active session from mock storage on mount
  useEffect(() => {
    async function loadActive() {
      const active = await mockApi.getActiveSession();
      if (active) {
        setSession(active);
        const startTime = new Date(active.startedAt).getTime();
        const now = Date.now();
        setElapsedSeconds(Math.max(0, Math.floor((now - startTime) / 1000)));
      }
    }
    loadActive();
  }, []);

  // Live timer tick when session is active
  useEffect(() => {
    if (!session) {
      setElapsedSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  // Persist session to mockApi whenever it changes
  useEffect(() => {
    mockApi.saveActiveSession(session);
  }, [session]);

  const startWorkout = useCallback(
    async (day: WorkoutDay, splitName: string = 'Custom Split', splitId?: string) => {
      const user = await mockApi.getUser();
      const unit = user.unitPreference || 'kg';

      const exercises: ExerciseSession[] = day.exercises.map((pe, idx) => {
        const sets: SetLog[] = Array.from({ length: pe.targetSets || 3 }).map((_, sIdx) => ({
          id: `set_${Date.now()}_${idx}_${sIdx}`,
          setNumber: sIdx + 1,
          weight: undefined,
          weightUnit: unit,
          targetReps: pe.targetRepsMax || 10,
          actualReps: undefined,
          isCompleted: false,
          isPersonalRecord: false,
        }));

        return {
          id: `es_${Date.now()}_${idx}`,
          exerciseId: pe.exerciseId,
          exerciseName: pe.exerciseName,
          sortOrder: pe.sortOrder,
          targetSets: pe.targetSets,
          targetRepsMin: pe.targetRepsMin,
          targetRepsMax: pe.targetRepsMax,
          notes: pe.notes,
          sets,
        };
      });

      const newSession: WorkoutSession = {
        id: `sess_${Date.now()}`,
        userId: user.id,
        splitId,
        splitName,
        dayName: day.name,
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        exercises,
        personalRecords: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setSession(newSession);
      setElapsedSeconds(0);
    },
    []
  );

  const startEmptyWorkout = useCallback(async (name: string = 'Quick Workout') => {
    const user = await mockApi.getUser();
    const newSession: WorkoutSession = {
      id: `sess_${Date.now()}`,
      userId: user.id,
      dayName: name,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      exercises: [],
      personalRecords: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSession(newSession);
    setElapsedSeconds(0);
  }, []);

  const updateSet = useCallback(
    (exerciseIndex: number, setIndex: number, updates: Partial<SetLog>) => {
      setSession((prev) => {
        if (!prev) return null;
        const newExercises = [...prev.exercises];
        const targetExercise = { ...newExercises[exerciseIndex] };
        const newSets = [...targetExercise.sets];
        newSets[setIndex] = { ...newSets[setIndex], ...updates };
        targetExercise.sets = newSets;
        newExercises[exerciseIndex] = targetExercise;
        return { ...prev, exercises: newExercises, updatedAt: new Date().toISOString() };
      });
    },
    []
  );

  const addSet = useCallback((exerciseIndex: number) => {
    setSession((prev) => {
      if (!prev) return null;
      const newExercises = [...prev.exercises];
      const targetExercise = { ...newExercises[exerciseIndex] };
      const lastSet = targetExercise.sets[targetExercise.sets.length - 1];
      const newSet: SetLog = {
        id: `set_${Date.now()}_${targetExercise.sets.length}`,
        setNumber: targetExercise.sets.length + 1,
        weight: lastSet?.weight,
        weightUnit: lastSet?.weightUnit || 'kg',
        targetReps: lastSet?.targetReps || targetExercise.targetRepsMax || 10,
        actualReps: undefined,
        isCompleted: false,
        isPersonalRecord: false,
      };
      targetExercise.sets = [...targetExercise.sets, newSet];
      newExercises[exerciseIndex] = targetExercise;
      return { ...prev, exercises: newExercises, updatedAt: new Date().toISOString() };
    });
  }, []);

  const removeSet = useCallback((exerciseIndex: number, setIndex: number) => {
    setSession((prev) => {
      if (!prev) return null;
      const newExercises = [...prev.exercises];
      const targetExercise = { ...newExercises[exerciseIndex] };
      targetExercise.sets = targetExercise.sets
        .filter((_, idx) => idx !== setIndex)
        .map((s, idx) => ({ ...s, setNumber: idx + 1 }));
      newExercises[exerciseIndex] = targetExercise;
      return { ...prev, exercises: newExercises, updatedAt: new Date().toISOString() };
    });
  }, []);

  const addExerciseToSession = useCallback(async (exercise: Exercise) => {
    const user = await mockApi.getUser();
    const unit = user.unitPreference || 'kg';

    setSession((prev) => {
      if (!prev) return null;
      const newExerciseSession: ExerciseSession = {
        id: `es_${Date.now()}`,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        sortOrder: prev.exercises.length + 1,
        targetSets: 3,
        targetRepsMin: 8,
        targetRepsMax: 10,
        sets: [
          { id: `s_${Date.now()}_1`, setNumber: 1, weight: undefined, weightUnit: unit, targetReps: 10, isCompleted: false, isPersonalRecord: false },
          { id: `s_${Date.now()}_2`, setNumber: 2, weight: undefined, weightUnit: unit, targetReps: 10, isCompleted: false, isPersonalRecord: false },
          { id: `s_${Date.now()}_3`, setNumber: 3, weight: undefined, weightUnit: unit, targetReps: 10, isCompleted: false, isPersonalRecord: false },
        ],
      };
      return {
        ...prev,
        exercises: [...prev.exercises, newExerciseSession],
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const removeExerciseFromSession = useCallback((exerciseIndex: number) => {
    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        exercises: prev.exercises.filter((_, idx) => idx !== exerciseIndex),
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const completeWorkout = useCallback(
    async (notes?: string): Promise<WorkoutSession | null> => {
      if (!session) return null;

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

      const finishedSession: WorkoutSession = {
        ...session,
        status: 'completed',
        durationSeconds: elapsedSeconds,
        totalVolume,
        totalSets,
        totalReps,
        sessionNotes: notes,
      };

      const result = await mockApi.completeSession(finishedSession);
      setSession(null);
      setElapsedSeconds(0);
      return result;
    },
    [session, elapsedSeconds]
  );

  const abandonWorkout = useCallback(async () => {
    await mockApi.abandonSession();
    setSession(null);
    setElapsedSeconds(0);
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        session,
        isActive: !!session,
        elapsedSeconds,
        startWorkout,
        startEmptyWorkout,
        updateSet,
        addSet,
        removeSet,
        addExerciseToSession,
        removeExerciseFromSession,
        completeWorkout,
        abandonWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useActiveWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useActiveWorkout must be used within a WorkoutProvider');
  }
  return context;
}
