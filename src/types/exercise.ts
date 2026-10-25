export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'glutes'
  | 'core'
  | 'forearms'
  | 'calves'
  | 'full_body';

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'cable'
  | 'machine'
  | 'bodyweight'
  | 'kettlebell'
  | 'band'
  | 'other';

export type EquipmentType = Equipment;

export type ExerciseType = 'compound' | 'isolation' | 'cardio' | 'flexibility';

export type TrackingType =
  | 'weight_reps'
  | 'bodyweight_reps'
  | 'assisted'
  | 'duration'
  | 'distance';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment;
  exerciseType: ExerciseType;
  trackingType: TrackingType;
  instructions?: string;
  techniqueNotes?: string;
  defaultRestSeconds: number;
  isCustom: boolean;
  createdBy?: string;
  isFavorite?: boolean;
  lastUsed?: string;
  createdAt: string;
}
