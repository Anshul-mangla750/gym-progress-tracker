// ── App-wide constants ───────────────────────────────────

export const APP_NAME = 'IRONLOG';
export const APP_TAGLINE = 'Track. Lift. Grow.';

export const STORAGE_KEYS = {
  ACTIVE_WORKOUT: 'ironlog_active_workout',
  AUTH_TOKEN: 'ironlog_auth_token',
  USER: 'ironlog_user',
  UNIT_PREF: 'ironlog_unit_pref',
  WORKOUT_SPLITS: 'ironlog_workout_splits',
  WORKOUT_SESSIONS: 'ironlog_workout_sessions',
  MEAL_LOGS: 'ironlog_meal_logs',
  SAVED_MEALS: 'ironlog_saved_meals',
  NUTRITION_GOALS: 'ironlog_nutrition_goals',
  BODY_WEIGHT: 'ironlog_body_weight',
  FAVORITES: 'ironlog_favorites',
  CUSTOM_EXERCISES: 'ironlog_custom_exercises',
  CUSTOM_FOODS: 'ironlog_custom_foods',
} as const;

export const MUSCLE_GROUPS = [
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'biceps', label: 'Biceps' },
  { value: 'triceps', label: 'Triceps' },
  { value: 'legs', label: 'Legs' },
  { value: 'glutes', label: 'Glutes' },
  { value: 'calves', label: 'Calves' },
  { value: 'core', label: 'Core' },
  { value: 'forearms', label: 'Forearms' },
  { value: 'full_body', label: 'Full Body' },
] as const;

export const EQUIPMENT_TYPES = [
  { value: 'barbell', label: 'Barbell' },
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'cable', label: 'Cable' },
  { value: 'machine', label: 'Machine' },
  { value: 'bodyweight', label: 'Bodyweight' },
  { value: 'kettlebell', label: 'Kettlebell' },
  { value: 'band', label: 'Resistance Band' },
  { value: 'other', label: 'Other' },
] as const;

export const FOOD_CATEGORIES = [
  { value: 'grains', label: 'Grains & Cereals' },
  { value: 'rice', label: 'Rice' },
  { value: 'dal_legumes', label: 'Dal & Legumes' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs_poultry', label: 'Eggs & Poultry' },
  { value: 'fish_seafood', label: 'Fish & Seafood' },
  { value: 'nuts_seeds', label: 'Nuts & Seeds' },
  { value: 'soy_products', label: 'Soy Products' },
  { value: 'oils_fats', label: 'Oils & Fats' },
  { value: 'packaged', label: 'Packaged / Supplements' },
  { value: 'common_meals', label: 'Common Meals' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'other', label: 'Other' },
] as const;

export const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast', icon: 'Coffee' },
  { value: 'lunch', label: 'Lunch', icon: 'UtensilsCrossed' },
  { value: 'dinner', label: 'Dinner', icon: 'Moon' },
  { value: 'snacks', label: 'Snacks', icon: 'Cookie' },
  { value: 'pre_workout', label: 'Pre-Workout', icon: 'Zap' },
  { value: 'post_workout', label: 'Post-Workout', icon: 'Trophy' },
] as const;

export const DEFAULT_NUTRITION_GOALS = {
  calorieTarget: 2000,
  proteinTarget: 120,
  carbTarget: 250,
  fatTarget: 65,
  fiberTarget: 30,
};

export const DEFAULT_PROGRESSION_SETTINGS = {
  defaultWeightIncrementKg: 2.5,
  defaultWeightIncrementLb: 5,
  progressionThreshold: 'all_sets' as const,
  repTargetPosition: 'top' as const,
};

export const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
] as const;

export const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
