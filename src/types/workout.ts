export type WeightUnit = 'kg' | 'lb';

export interface SetLog {
  id: string;
  setNumber: number;
  weight?: number;
  weightUnit: WeightUnit;
  targetReps: number;
  actualReps?: number;
  duration?: number;
  isCompleted: boolean;
  isPersonalRecord: boolean;
  rpe?: number;
  notes?: string;
}

export interface PlanExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sortOrder: number;
  targetSets: number;
  targetRepsMin: number;
  targetRepsMax: number;
  restSeconds: number;
  notes?: string;
  supersetGroup?: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  dayOfWeek?: number;
  sortOrder: number;
  exercises: PlanExercise[];
}

export interface WorkoutSplit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isTemplate: boolean;
  days: WorkoutDay[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: 'PPL' | 'Upper/Lower' | 'Full Body' | 'Arnold' | 'Bro Split' | 'Powerbuilding' | 'Calisthenics' | 'Hybrid';
  frequencyDays?: number;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
}

export interface ExerciseSession {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sortOrder: number;
  targetSets: number;
  targetRepsMin: number;
  targetRepsMax: number;
  notes?: string;
  sets: SetLog[];
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  type: 'weight' | 'reps' | 'volume';
  value: number;
  previousValue?: number;
}

export type SessionStatus = 'in_progress' | 'completed' | 'abandoned';

export interface WorkoutSession {
  id: string;
  userId: string;
  splitId?: string;
  splitName?: string;
  dayName?: string;
  status: SessionStatus;
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  exercises: ExerciseSession[];
  totalVolume?: number;
  totalSets?: number;
  totalReps?: number;
  personalRecords: PersonalRecord[];
  sessionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressionSuggestion {
  type: 'increase_weight' | 'increase_reps' | 'repeat' | 'first_session' | 'deload';
  suggestedWeight?: number;
  suggestedReps?: number;
  message: string;
  previousWeight?: number;
  previousReps?: number[];
}

export interface ProgressionSettings {
  defaultWeightIncrementKg: number;
  defaultWeightIncrementLb: number;
  progressionThreshold: 'all_sets' | 'majority_sets';
  repTargetPosition: 'top' | 'mid';
}
