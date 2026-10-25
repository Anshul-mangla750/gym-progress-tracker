import type { WeightUnit, ProgressionSettings } from './workout';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  email: string;
  name: string;
  displayName?: string;
  unitPreference: WeightUnit;
  experienceLevel: ExperienceLevel;
  availableDays: number[];
  fitnessGoals: string[];
  timezone: string;
  profilePicUrl?: string;
  activeSplitId?: string;
  progressionSettings: ProgressionSettings;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  unitPreference?: WeightUnit;
}
