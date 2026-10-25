import { useState, useEffect, useCallback } from 'react';
import type { MealLog, NutritionGoal, Food, DailyNutrition } from '../types';
import { mockApi } from '../api/mock-adapter';
import { getTodayString } from '../lib/date-utils';

export function useNutrition() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [dailyTotals, setDailyTotals] = useState<DailyNutrition>({
    date: getTodayString(),
    calories: 0,
    protein: 0,
    carbs: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    calorieTarget: 2400,
    proteinTarget: 170,
    carbTarget: 250,
    fatTarget: 65,
  });
  const [goals, setGoals] = useState<NutritionGoal | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [dayMeals, totals, nutritionGoals, allFoods] = await Promise.all([
        mockApi.getMealsByDate(selectedDate),
        mockApi.getDailyNutritionSummary(selectedDate),
        mockApi.getNutritionGoals(),
        mockApi.getFoods(),
      ]);
      setMeals(dayMeals);
      setDailyTotals(totals);
      setGoals(nutritionGoals);
      setFoods(allFoods);
    } catch (err) {
      console.error('Failed to load nutrition data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveMeal = useCallback(
    async (meal: MealLog) => {
      await mockApi.saveMeal(meal);
      await loadData();
    },
    [loadData]
  );

  const deleteMeal = useCallback(
    async (id: string) => {
      await mockApi.deleteMeal(id);
      await loadData();
    },
    [loadData]
  );

  const updateGoals = useCallback(
    async (newGoals: Partial<NutritionGoal>) => {
      const updated = await mockApi.updateNutritionGoals(newGoals);
      setGoals(updated);
      return updated;
    },
    []
  );

  return {
    selectedDate,
    setSelectedDate,
    meals,
    dailyTotals,
    goals,
    foods,
    isLoading,
    refresh: loadData,
    saveMeal,
    deleteMeal,
    updateGoals,
  };
}
