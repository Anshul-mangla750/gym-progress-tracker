export interface BodyWeightEntry {
  id: string;
  userId: string;
  date: string;
  weight: number;
  unit: 'kg' | 'lb';
  notes?: string;
  createdAt: string;
}

export interface ExerciseProgressPoint {
  date: string;
  weight: number;
  bestReps: number;
  totalVolume: number;
  sets: number;
}

export interface VolumeDataPoint {
  date: string;
  totalVolume: number;
  totalSets: number;
  totalReps: number;
}

export interface NutritionDataPoint {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WeeklyFrequency {
  week: string;
  workouts: number;
}

export interface ProgressSummary {
  totalWorkouts: number;
  workoutsThisWeek: number;
  currentStreak: number;
  totalVolume: number;
  personalRecords: number;
  avgCalories: number;
  avgProtein: number;
}

export type DateRange = '7d' | '30d' | '90d' | 'custom';
