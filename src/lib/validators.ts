import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  unitPreference: z.enum(['kg', 'lb']).default('kg'),
});

export const setLogSchema = z.object({
  id: z.string(),
  setNumber: z.number().int().positive(),
  weight: z.number().nonnegative().optional(),
  weightUnit: z.enum(['kg', 'lb']),
  targetReps: z.number().int().positive(),
  actualReps: z.number().int().nonnegative().optional(),
  duration: z.number().nonnegative().optional(),
  isCompleted: z.boolean(),
  isPersonalRecord: z.boolean().default(false),
  rpe: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
});

export const foodItemSchema = z.object({
  foodId: z.string(),
  foodName: z.string().min(1),
  quantity: z.number().positive('Quantity must be greater than 0'),
  unit: z.string(),
  servingBasis: z.string(),
  servingSize: z.number().positive(),
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbohydrates: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  fiber: z.number().nonnegative().optional(),
});

export const mealLogSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snacks', 'pre_workout', 'post_workout']),
  items: z.array(foodItemSchema).min(1, 'Add at least one food item'),
});

export const nutritionGoalSchema = z.object({
  calorieTarget: z.number().int().positive('Calories must be positive'),
  proteinTarget: z.number().nonnegative('Protein target must be 0 or positive'),
  carbTarget: z.number().nonnegative('Carb target must be 0 or positive'),
  fatTarget: z.number().nonnegative('Fat target must be 0 or positive'),
  fiberTarget: z.number().nonnegative().optional(),
});

export const bodyWeightSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  weight: z.number().positive('Weight must be positive'),
  unit: z.enum(['kg', 'lb']),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type MealLogInput = z.infer<typeof mealLogSchema>;
export type NutritionGoalInput = z.infer<typeof nutritionGoalSchema>;
export type BodyWeightInput = z.infer<typeof bodyWeightSchema>;
