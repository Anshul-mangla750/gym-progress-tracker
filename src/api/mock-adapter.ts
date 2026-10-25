import type {
  User,
  Exercise,
  WorkoutSplit,
  WorkoutSession,
  MealLog,
  NutritionGoal,
  BodyWeightEntry,
  ExerciseSession,
} from '../types';
import { seedExercises } from '../data/seed-exercises';
import { seedFoods } from '../data/seed-foods';
import { seedSplits } from '../data/seed-splits';
import { calculateDailyTotals } from '../lib/nutrition-calc';
import { getTodayString, getPastDates } from '../lib/date-utils';

const STORAGE_KEYS = {
  USER: 'eliteengine_user_v4',
  EXERCISES: 'eliteengine_exercises_v4',
  SPLITS: 'eliteengine_splits_v5',
  SESSIONS: 'eliteengine_sessions_v4',
  ACTIVE_SESSION: 'eliteengine_active_session_v4',
  MEALS: 'eliteengine_meals_v4',
  SAVED_MEALS: 'eliteengine_saved_meals_v4',
  NUTRITION_GOALS: 'eliteengine_nutrition_goals_v4',
  BODY_WEIGHTS: 'eliteengine_body_weights_v4',
};

const DEFAULT_USER: User = {
  id: 'user_1',
  email: 'athlete@ironlog.io',
  name: 'Alex Vance',
  displayName: 'Alex',
  unitPreference: 'kg',
  experienceLevel: 'intermediate',
  availableDays: [1, 2, 3, 5, 6],
  fitnessGoals: ['Hypertrophy', 'Strength Overload', 'Body Recomposition'],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  activeSplitId: 'split_vtaper',
  progressionSettings: {
    defaultWeightIncrementKg: 2.5,
    defaultWeightIncrementLb: 5,
    progressionThreshold: 'all_sets',
    repTargetPosition: 'top',
  },
  createdAt: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const DEFAULT_GOAL: NutritionGoal = {
  id: 'goal_1',
  userId: 'user_1',
  calorieTarget: 2450,
  proteinTarget: 175,
  carbTarget: 260,
  fatTarget: 65,
  fiberTarget: 32,
  effectiveFrom: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
};

function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage write error:', err);
  }
}

// Generate realistic past workout sessions so the app opens with rich historical data
function generateSeedSessions(): WorkoutSession[] {
  const dates = getPastDates(14);
  const sessions: WorkoutSession[] = [];

  // Completed Push session 4 days ago
  sessions.push({
    id: 'sess_prev_push',
    userId: 'user_1',
    splitId: 'split_ppl',
    splitName: 'Push / Pull / Legs (PPL)',
    dayName: 'Push Day (Chest, Shoulders & Triceps)',
    status: 'completed',
    startedAt: `${dates[4]}T10:00:00.000Z`,
    completedAt: `${dates[4]}T11:15:00.000Z`,
    durationSeconds: 4500,
    totalVolume: 5840,
    totalSets: 14,
    totalReps: 108,
    personalRecords: [
      {
        exerciseId: 'ex_1',
        exerciseName: 'Barbell Bench Press',
        type: 'weight',
        value: 80,
        previousValue: 77.5,
      },
    ],
    sessionNotes: 'Strong bench press session. Hit all top rep targets on bench!',
    createdAt: `${dates[4]}T10:00:00.000Z`,
    updatedAt: `${dates[4]}T11:15:00.000Z`,
    exercises: [
      {
        id: 'es_1',
        exerciseId: 'ex_1',
        exerciseName: 'Barbell Bench Press',
        sortOrder: 1,
        targetSets: 4,
        targetRepsMin: 6,
        targetRepsMax: 8,
        sets: [
          { id: 's1', setNumber: 1, weight: 80, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: true, rpe: 8 },
          { id: 's2', setNumber: 2, weight: 80, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 8.5 },
          { id: 's3', setNumber: 3, weight: 80, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 9 },
          { id: 's4', setNumber: 4, weight: 80, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 9.5 },
        ],
      },
      {
        id: 'es_2',
        exerciseId: 'ex_2',
        exerciseName: 'Incline Dumbbell Press',
        sortOrder: 2,
        targetSets: 3,
        targetRepsMin: 8,
        targetRepsMax: 10,
        sets: [
          { id: 's5', setNumber: 1, weight: 28, weightUnit: 'kg', targetReps: 10, actualReps: 10, isCompleted: true, isPersonalRecord: false, rpe: 8 },
          { id: 's6', setNumber: 2, weight: 28, weightUnit: 'kg', targetReps: 10, actualReps: 9, isCompleted: true, isPersonalRecord: false, rpe: 8.5 },
          { id: 's7', setNumber: 3, weight: 28, weightUnit: 'kg', targetReps: 10, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 9 },
        ],
      },
      {
        id: 'es_3',
        exerciseId: 'ex_15',
        exerciseName: 'Overhead Press (Barbell)',
        sortOrder: 3,
        targetSets: 3,
        targetRepsMin: 6,
        targetRepsMax: 8,
        sets: [
          { id: 's8', setNumber: 1, weight: 50, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 8 },
          { id: 's9', setNumber: 2, weight: 50, weightUnit: 'kg', targetReps: 8, actualReps: 7, isCompleted: true, isPersonalRecord: false, rpe: 8.5 },
          { id: 's10', setNumber: 3, weight: 50, weightUnit: 'kg', targetReps: 8, actualReps: 7, isCompleted: true, isPersonalRecord: false, rpe: 9 },
        ],
      },
    ],
  });

  // Completed Pull session 2 days ago
  sessions.push({
    id: 'sess_prev_pull',
    userId: 'user_1',
    splitId: 'split_ppl',
    splitName: 'Push / Pull / Legs (PPL)',
    dayName: 'Pull Day (Back & Biceps)',
    status: 'completed',
    startedAt: `${dates[2]}T17:00:00.000Z`,
    completedAt: `${dates[2]}T18:10:00.000Z`,
    durationSeconds: 4200,
    totalVolume: 6420,
    totalSets: 12,
    totalReps: 98,
    personalRecords: [],
    sessionNotes: 'Great lat activation. Felt energized.',
    createdAt: `${dates[2]}T17:00:00.000Z`,
    updatedAt: `${dates[2]}T18:10:00.000Z`,
    exercises: [
      {
        id: 'es_p1',
        exerciseId: 'ex_8',
        exerciseName: 'Barbell Bent-Over Row',
        sortOrder: 1,
        targetSets: 4,
        targetRepsMin: 6,
        targetRepsMax: 8,
        sets: [
          { id: 'sp1', setNumber: 1, weight: 70, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 7.5 },
          { id: 'sp2', setNumber: 2, weight: 70, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 8 },
          { id: 'sp3', setNumber: 3, weight: 70, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 8.5 },
          { id: 'sp4', setNumber: 4, weight: 70, weightUnit: 'kg', targetReps: 8, actualReps: 8, isCompleted: true, isPersonalRecord: false, rpe: 9 },
        ],
      },
    ],
  });

  return sessions;
}

// Generate default meal logs for today (1,248 kcal total, realistic midday status)
function generateSeedMeals(): MealLog[] {
  const today = getTodayString();
  return [
    {
      id: 'meal_seed_breakfast',
      userId: 'user_1',
      date: today,
      mealType: 'breakfast',
      items: [
        {
          id: 'item_b1',
          foodId: 'food_1',
          foodName: 'Oats (Dry)',
          quantity: 80,
          unit: 'g',
          servingBasis: 'per 100g',
          servingSize: 100,
          calories: 311,
          protein: 14,
          carbohydrates: 53,
          fat: 6,
          fiber: 8,
          addedAt: new Date().toISOString(),
        },
        {
          id: 'item_b2',
          foodId: 'food_2',
          foodName: 'Whey Protein Isolate',
          quantity: 35,
          unit: 'g',
          servingBasis: 'per scoop (35g)',
          servingSize: 35,
          calories: 130,
          protein: 27,
          carbohydrates: 2,
          fat: 1,
          fiber: 0,
          addedAt: new Date().toISOString(),
        },
      ],
      totalCalories: 441,
      totalProtein: 41,
      totalCarbs: 55,
      totalFat: 7,
      totalFiber: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'meal_seed_lunch',
      userId: 'user_1',
      date: today,
      mealType: 'lunch',
      items: [
        {
          id: 'item_l1',
          foodId: 'food_3',
          foodName: 'Chicken Breast (Cooked)',
          quantity: 180,
          unit: 'g',
          servingBasis: 'per 100g',
          servingSize: 100,
          calories: 297,
          protein: 56,
          carbohydrates: 0,
          fat: 6,
          fiber: 0,
          addedAt: new Date().toISOString(),
        },
        {
          id: 'item_l2',
          foodId: 'food_4',
          foodName: 'Cooked White Rice',
          quantity: 200,
          unit: 'g',
          servingBasis: 'per 100g',
          servingSize: 100,
          calories: 260,
          protein: 5,
          carbohydrates: 56,
          fat: 1,
          fiber: 1,
          addedAt: new Date().toISOString(),
        },
      ],
      totalCalories: 557,
      totalProtein: 61,
      totalCarbs: 56,
      totalFat: 7,
      totalFiber: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'meal_seed_snack',
      userId: 'user_1',
      date: today,
      mealType: 'snacks',
      items: [
        {
          id: 'item_s1',
          foodId: 'food_5',
          foodName: 'Banana (1 medium)',
          quantity: 1,
          unit: 'piece',
          servingBasis: 'per piece (~120g)',
          servingSize: 1,
          calories: 105,
          protein: 1,
          carbohydrates: 27,
          fat: 0,
          fiber: 3,
          addedAt: new Date().toISOString(),
        },
        {
          id: 'item_s2',
          foodId: 'food_6',
          foodName: 'Almonds (Raw)',
          quantity: 25,
          unit: 'g',
          servingBasis: 'per 100g',
          servingSize: 100,
          calories: 145,
          protein: 5,
          carbohydrates: 5,
          fat: 12,
          fiber: 3,
          addedAt: new Date().toISOString(),
        },
      ],
      totalCalories: 250,
      totalProtein: 6,
      totalCarbs: 32,
      totalFat: 12,
      totalFiber: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

function generateSeedBodyWeights(): BodyWeightEntry[] {
  const dates = getPastDates(14);
  const baseWeight = 78.5;
  return dates.map((date: string, idx: number) => ({
    id: `bw_${idx}`,
    userId: 'user_1',
    date,
    weight: +(baseWeight - (13 - idx) * 0.08 + (Math.sin(idx) * 0.2)).toFixed(1),
    unit: 'kg' as const,
    notes: idx === 13 ? 'Morning weigh-in after fasting' : undefined,
    createdAt: `${date}T07:00:00.000Z`,
  }));
}

// ── Mock Database Initialization ──────────────────────────────────────────

export function initMockStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    setStorage(STORAGE_KEYS.USER, DEFAULT_USER);
  }
  if (!localStorage.getItem(STORAGE_KEYS.EXERCISES)) {
    setStorage(STORAGE_KEYS.EXERCISES, seedExercises);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SPLITS)) {
    setStorage(STORAGE_KEYS.SPLITS, seedSplits);
  } else {
    // Merge any missing seed template splits
    const existing = getStorage<WorkoutSplit[]>(STORAGE_KEYS.SPLITS, []);
    const existingIds = new Set(existing.map((s) => s.id));
    const missing = seedSplits.filter((s) => !existingIds.has(s.id));
    if (missing.length > 0) {
      setStorage(STORAGE_KEYS.SPLITS, [...existing, ...missing]);
    }
  }
  if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
    setStorage(STORAGE_KEYS.SESSIONS, generateSeedSessions());
  }
  if (!localStorage.getItem(STORAGE_KEYS.MEALS)) {
    setStorage(STORAGE_KEYS.MEALS, generateSeedMeals());
  }
  if (!localStorage.getItem(STORAGE_KEYS.NUTRITION_GOALS)) {
    setStorage(STORAGE_KEYS.NUTRITION_GOALS, DEFAULT_GOAL);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BODY_WEIGHTS)) {
    setStorage(STORAGE_KEYS.BODY_WEIGHTS, generateSeedBodyWeights());
  }
}

// Automatically ensure seeded data exists
initMockStorage();

// ── Mock API Methods ──────────────────────────────────────────────────────

export const mockApi = {
  // ── Auth & User ──
  async getUser(): Promise<User> {
    return getStorage<User>(STORAGE_KEYS.USER, DEFAULT_USER);
  },

  async updateUser(updates: Partial<User>): Promise<User> {
    const current = await this.getUser();
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    setStorage(STORAGE_KEYS.USER, updated);
    return updated;
  },

  // ── Exercises ──
  async getExercises(): Promise<Exercise[]> {
    return getStorage<Exercise[]>(STORAGE_KEYS.EXERCISES, seedExercises);
  },

  async getExerciseById(id: string): Promise<Exercise | undefined> {
    const all = await this.getExercises();
    return all.find((e) => e.id === id);
  },

  async createExercise(exercise: Omit<Exercise, 'id' | 'createdAt'>): Promise<Exercise> {
    const all = await this.getExercises();
    const newEx: Exercise = {
      ...exercise,
      id: `ex_custom_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    all.unshift(newEx);
    setStorage(STORAGE_KEYS.EXERCISES, all);
    return newEx;
  },

  // ── Workout Splits ──
  async getSplits(): Promise<WorkoutSplit[]> {
    return getStorage<WorkoutSplit[]>(STORAGE_KEYS.SPLITS, seedSplits);
  },

  async getSplitById(id: string): Promise<WorkoutSplit | undefined> {
    const splits = await this.getSplits();
    return splits.find((s) => s.id === id);
  },

  async getActiveSplit(): Promise<WorkoutSplit | undefined> {
    const splits = await this.getSplits();
    return splits.find((s) => s.isActive) || splits[0];
  },

  async createSplit(split: Omit<WorkoutSplit, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkoutSplit> {
    const splits = await this.getSplits();
    const newSplit: WorkoutSplit = {
      ...split,
      id: `split_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (newSplit.isActive) {
      splits.forEach((s) => (s.isActive = false));
    }
    splits.unshift(newSplit);
    setStorage(STORAGE_KEYS.SPLITS, splits);
    return newSplit;
  },

  async updateSplit(id: string, updates: Partial<WorkoutSplit>): Promise<WorkoutSplit> {
    const splits = await this.getSplits();
    const index = splits.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Split not found');
    if (updates.isActive) {
      splits.forEach((s) => (s.isActive = false));
    }
    const updated = { ...splits[index], ...updates, updatedAt: new Date().toISOString() };
    splits[index] = updated;
    setStorage(STORAGE_KEYS.SPLITS, splits);
    return updated;
  },

  async deleteSplit(id: string): Promise<void> {
    const splits = await this.getSplits();
    const filtered = splits.filter((s) => s.id !== id);
    if (filtered.length > 0 && !filtered.some((s) => s.isActive)) {
      filtered[0].isActive = true;
    }
    setStorage(STORAGE_KEYS.SPLITS, filtered);
  },

  async duplicateSplit(id: string): Promise<WorkoutSplit> {
    const split = await this.getSplitById(id);
    if (!split) throw new Error('Split not found');
    const copy: Omit<WorkoutSplit, 'id' | 'createdAt' | 'updatedAt'> = {
      ...split,
      name: `${split.name} (Copy)`,
      isTemplate: false,
      isActive: false,
      days: split.days.map((d) => ({
        ...d,
        id: `day_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        exercises: d.exercises.map((e) => ({
          ...e,
          id: `pe_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        })),
      })),
    };
    return this.createSplit(copy);
  },

  // ── Workout Sessions ──
  async getSessions(): Promise<WorkoutSession[]> {
    return getStorage<WorkoutSession[]>(STORAGE_KEYS.SESSIONS, []);
  },

  async getActiveSession(): Promise<WorkoutSession | null> {
    return getStorage<WorkoutSession | null>(STORAGE_KEYS.ACTIVE_SESSION, null);
  },

  async saveActiveSession(session: WorkoutSession | null): Promise<void> {
    setStorage(STORAGE_KEYS.ACTIVE_SESSION, session);
  },

  async completeSession(session: WorkoutSession): Promise<WorkoutSession> {
    const sessions = await this.getSessions();
    const completedSession: WorkoutSession = {
      ...session,
      status: 'completed',
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    sessions.unshift(completedSession);
    setStorage(STORAGE_KEYS.SESSIONS, sessions);
    setStorage(STORAGE_KEYS.ACTIVE_SESSION, null);
    return completedSession;
  },

  async abandonSession(): Promise<void> {
    setStorage(STORAGE_KEYS.ACTIVE_SESSION, null);
  },

  async getPreviousSessionForDay(dayName: string): Promise<WorkoutSession | undefined> {
    const sessions = await this.getSessions();
    return sessions.find((s) => s.dayName === dayName && s.status === 'completed');
  },

  async getExerciseHistory(exerciseId: string): Promise<ExerciseSession[]> {
    const sessions = await this.getSessions();
    const history: ExerciseSession[] = [];
    for (const sess of sessions) {
      if (sess.status === 'completed') {
        const found = sess.exercises.find((e) => e.exerciseId === exerciseId);
        if (found) history.push(found);
      }
    }
    return history;
  },

  // ── Nutrition ──
  async getFoods(): Promise<typeof seedFoods> {
    return seedFoods;
  },

  async getMealsByDate(date: string): Promise<MealLog[]> {
    const all = getStorage<MealLog[]>(STORAGE_KEYS.MEALS, []);
    return all.filter((m) => m.date === date);
  },

  async saveMeal(meal: MealLog): Promise<MealLog> {
    const all = getStorage<MealLog[]>(STORAGE_KEYS.MEALS, []);
    const idx = all.findIndex((m) => m.id === meal.id || (m.date === meal.date && m.mealType === meal.mealType));
    if (idx >= 0) {
      all[idx] = { ...meal, updatedAt: new Date().toISOString() };
    } else {
      all.unshift(meal);
    }
    setStorage(STORAGE_KEYS.MEALS, all);
    return meal;
  },

  async deleteMeal(id: string): Promise<void> {
    const all = getStorage<MealLog[]>(STORAGE_KEYS.MEALS, []);
    setStorage(
      STORAGE_KEYS.MEALS,
      all.filter((m) => m.id !== id)
    );
  },

  async getDailyNutritionSummary(date: string) {
    const meals = await this.getMealsByDate(date);
    return calculateDailyTotals(meals);
  },

  async getNutritionGoals(): Promise<NutritionGoal> {
    return getStorage<NutritionGoal>(STORAGE_KEYS.NUTRITION_GOALS, DEFAULT_GOAL);
  },

  async updateNutritionGoals(goals: Partial<NutritionGoal>): Promise<NutritionGoal> {
    const current = await this.getNutritionGoals();
    const updated = { ...current, ...goals, effectiveFrom: new Date().toISOString() };
    setStorage(STORAGE_KEYS.NUTRITION_GOALS, updated);
    return updated;
  },

  // ── Body Weight ──
  async getBodyWeights(): Promise<BodyWeightEntry[]> {
    return getStorage<BodyWeightEntry[]>(STORAGE_KEYS.BODY_WEIGHTS, []);
  },

  async logBodyWeight(entry: Omit<BodyWeightEntry, 'id' | 'createdAt'>): Promise<BodyWeightEntry> {
    const all = await this.getBodyWeights();
    const newEntry: BodyWeightEntry = {
      ...entry,
      id: `bw_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    all.unshift(newEntry);
    setStorage(STORAGE_KEYS.BODY_WEIGHTS, all);
    return newEntry;
  },

  async deleteBodyWeight(id: string): Promise<void> {
    const all = await this.getBodyWeights();
    setStorage(
      STORAGE_KEYS.BODY_WEIGHTS,
      all.filter((b) => b.id !== id)
    );
  },
};
