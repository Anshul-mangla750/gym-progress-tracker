import type { Food, NutrientResult } from '../types';

/**
 * Calculate nutrients for a given food and quantity.
 * Handles per-100g, per-piece, per-cup, per-tbsp, per-scoop, etc.
 */
export function calculateNutrients(
  food: Food,
  quantity: number,
  unit?: string
): NutrientResult {
  // The multiplier determines how many "servings" the user is consuming
  // relative to the food's defined servingSize
  const effectiveUnit = unit || food.servingUnit;
  let multiplier: number;

  if (effectiveUnit === food.servingUnit) {
    // Same unit system — direct ratio
    multiplier = quantity / food.servingSize;
  } else if (effectiveUnit === 'g' && food.servingUnit === 'g') {
    multiplier = quantity / food.servingSize;
  } else if (effectiveUnit === 'ml' && food.servingUnit === 'ml') {
    multiplier = quantity / food.servingSize;
  } else {
    // Fallback — treat as direct quantity ratio
    multiplier = quantity / food.servingSize;
  }

  return {
    calories: round(food.calories * multiplier),
    protein: round(food.protein * multiplier),
    carbohydrates: round(food.carbohydrates * multiplier),
    fat: round(food.fat * multiplier),
    fiber: food.fiber !== undefined ? round(food.fiber * multiplier) : undefined,
  };
}

/** Sum nutrients from an array of nutrient results */
export function sumNutrients(items: NutrientResult[]): NutrientResult {
  return items.reduce(
    (total, item) => ({
      calories: round(total.calories + item.calories),
      protein: round(total.protein + item.protein),
      carbohydrates: round(total.carbohydrates + item.carbohydrates),
      fat: round(total.fat + item.fat),
      fiber:
        total.fiber !== undefined || item.fiber !== undefined
          ? round((total.fiber || 0) + (item.fiber || 0))
          : undefined,
    }),
    { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 }
  );
}

/** Calculate remaining macros */
export function calculateRemaining(
  consumed: NutrientResult,
  target: { calorieTarget: number; proteinTarget: number; carbTarget: number; fatTarget: number }
) {
  return {
    calories: Math.max(0, target.calorieTarget - consumed.calories),
    protein: Math.max(0, target.proteinTarget - consumed.protein),
    carbs: Math.max(0, target.carbTarget - consumed.carbohydrates),
    fat: Math.max(0, target.fatTarget - consumed.fat),
  };
}

/** Calculate percentage of target */
export function percentOfTarget(consumed: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(Math.round((consumed / target) * 100), 100);
}

export function calculateDailyTotals(meals: { date: string; totalCalories?: number; totalProtein?: number; totalCarbs?: number; totalFat?: number; totalFiber?: number }[]) {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let fiber = 0;

  for (const m of meals) {
    calories += m.totalCalories || 0;
    protein += m.totalProtein || 0;
    carbs += m.totalCarbs || 0;
    fat += m.totalFat || 0;
    fiber += m.totalFiber || 0;
  }

  return {
    date: meals[0]?.date || new Date().toISOString().split('T')[0],
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    carbohydrates: Math.round(carbs),
    fat: Math.round(fat),
    fiber: Math.round(fiber),
    calorieTarget: 2400,
    proteinTarget: 170,
    carbTarget: 250,
    fatTarget: 65,
  };
}

function round(value: number, decimals = 1): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

