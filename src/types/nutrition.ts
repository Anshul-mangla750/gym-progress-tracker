export type FoodCategory =
  | 'grains'
  | 'rice'
  | 'dal_legumes'
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'eggs_poultry'
  | 'fish_seafood'
  | 'nuts_seeds'
  | 'soy_products'
  | 'oils_fats'
  | 'packaged'
  | 'common_meals'
  | 'beverages'
  | 'other';

export type ServingUnit = 'g' | 'ml' | 'piece' | 'cup' | 'tbsp' | 'tsp' | 'serving' | 'scoop';

export type MealType =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snacks'
  | 'pre_workout'
  | 'post_workout';

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  servingBasis: string;
  servingSize: number;
  servingUnit: ServingUnit;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
  source?: string;
  verified: boolean;
  isCustom: boolean;
  createdBy?: string;
  createdAt: string;
}

export interface MealItem {
  id: string;
  foodId: string;
  foodName: string;
  quantity: number;
  unit: string;
  servingBasis: string;
  servingSize: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
  addedAt: string;
}

export interface MealLog {
  id: string;
  userId: string;
  date: string;
  mealType: MealType;
  items: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SavedMeal {
  id: string;
  userId: string;
  name: string;
  items: {
    foodId: string;
    foodName: string;
    quantity: number;
    unit: string;
  }[];
  totalCalories: number;
  totalProtein: number;
  createdAt: string;
}

export interface NutritionGoal {
  id: string;
  userId: string;
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  fiberTarget?: number;
  effectiveFrom: string;
  createdAt: string;
}

export interface DailyNutrition {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  carbohydrates?: number;
  fat: number;
  fiber?: number;
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
}

export interface NutrientResult {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
}
