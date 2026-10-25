import { useState } from 'react';
import { useNutrition } from '../hooks/useNutrition';
import type { MealType, Food, MealItem, MealLog } from '../types';
import { MacroRing } from '../components/nutrition/MacroRing';
import { MealCard } from '../components/nutrition/MealCard';
import { FoodSearch } from '../components/nutrition/FoodSearch';
import { FoodQuantityEditor } from '../components/nutrition/FoodQuantityEditor';
import { MEAL_TYPES } from '../lib/constants';
import { formatDate, getTodayString } from '../lib/date-utils';
import { subDays, addDays, parseISO, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Nutrition() {
  const {
    selectedDate,
    setSelectedDate,
    meals,
    dailyTotals,
    goals,
    saveMeal,
    deleteMeal,
  } = useNutrition();

  const [activeMealType, setActiveMealType] = useState<MealType | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);

  const parsedCurrentDate = parseISO(selectedDate);
  const isCurrentDayToday = isToday(parsedCurrentDate);

  const handlePrevDay = () => {
    const prev = subDays(parsedCurrentDate, 1);
    setSelectedDate(prev.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const next = addDays(parsedCurrentDate, 1);
    setSelectedDate(next.toISOString().split('T')[0]);
  };

  const handleOpenAddFood = (mealType: MealType) => {
    setActiveMealType(mealType);
    setIsSearchOpen(true);
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    setIsSearchOpen(false);
    setIsQuantityOpen(true);
  };

  const handleAddItemToMeal = async (item: MealItem) => {
    if (!activeMealType) return;

    // Check if meal of this type already exists for selectedDate
    const existingMeal = meals.find((m) => m.mealType === activeMealType);

    if (existingMeal) {
      const updatedItems = [...existingMeal.items, item];
      const totalCalories = updatedItems.reduce((acc, i) => acc + i.calories, 0);
      const totalProtein = updatedItems.reduce((acc, i) => acc + i.protein, 0);
      const totalCarbs = updatedItems.reduce((acc, i) => acc + i.carbohydrates, 0);
      const totalFat = updatedItems.reduce((acc, i) => acc + i.fat, 0);
      const totalFiber = updatedItems.reduce((acc, i) => acc + (i.fiber || 0), 0);

      const updatedMeal: MealLog = {
        ...existingMeal,
        items: updatedItems,
        totalCalories: Math.round(totalCalories),
        totalProtein: Math.round(totalProtein),
        totalCarbs: Math.round(totalCarbs),
        totalFat: Math.round(totalFat),
        totalFiber: Math.round(totalFiber),
      };

      await saveMeal(updatedMeal);
    } else {
      const newMeal: MealLog = {
        id: `meal_${Date.now()}`,
        userId: 'user_1',
        date: selectedDate,
        mealType: activeMealType,
        items: [item],
        totalCalories: Math.round(item.calories),
        totalProtein: Math.round(item.protein),
        totalCarbs: Math.round(item.carbohydrates),
        totalFat: Math.round(item.fat),
        totalFiber: Math.round(item.fiber || 0),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveMeal(newMeal);
    }
  };

  const handleRemoveItem = async (mealId: string, itemId: string) => {
    const targetMeal = meals.find((m) => m.id === mealId);
    if (!targetMeal) return;

    const remainingItems = targetMeal.items.filter((i) => i.id !== itemId);
    if (remainingItems.length === 0) {
      await deleteMeal(mealId);
    } else {
      const totalCalories = remainingItems.reduce((acc, i) => acc + i.calories, 0);
      const totalProtein = remainingItems.reduce((acc, i) => acc + i.protein, 0);
      const totalCarbs = remainingItems.reduce((acc, i) => acc + i.carbohydrates, 0);
      const totalFat = remainingItems.reduce((acc, i) => acc + i.fat, 0);
      const totalFiber = remainingItems.reduce((acc, i) => acc + (i.fiber || 0), 0);

      const updated: MealLog = {
        ...targetMeal,
        items: remainingItems,
        totalCalories: Math.round(totalCalories),
        totalProtein: Math.round(totalProtein),
        totalCarbs: Math.round(totalCarbs),
        totalFat: Math.round(totalFat),
        totalFiber: Math.round(totalFiber),
      };

      await saveMeal(updated);
    }
  };

  return (
    <div className="nutrition-page space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Date Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-bg-card rounded-2xl border border-border-default">
        <div>
          <span className="text-xs uppercase font-bold text-accent-primary tracking-wider">
            Daily Food & Nutrition Log
          </span>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-text-primary mt-0.5">
            {formatDate(parsedCurrentDate, 'EEEE, MMMM d, yyyy')}
          </h1>
        </div>

        {/* Date Selector controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-2 rounded-xl bg-bg-elevated hover:bg-bg-input text-text-secondary hover:text-text-primary border border-border-default transition-colors cursor-pointer"
            title="Previous Day"
          >
            <ChevronLeft size={16} />
          </button>

          {!isCurrentDayToday && (
            <button
              type="button"
              onClick={() => setSelectedDate(getTodayString())}
              className="px-3 py-1.5 rounded-xl bg-accent-primary-muted text-accent-primary border border-accent-primary/20 text-xs font-bold hover:bg-accent-primary/20 transition-colors cursor-pointer"
            >
              Today
            </button>
          )}

          <button
            type="button"
            onClick={handleNextDay}
            className="p-2 rounded-xl bg-bg-elevated hover:bg-bg-input text-text-secondary hover:text-text-primary border border-border-default transition-colors cursor-pointer"
            title="Next Day"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Macronutrient Compliance Ring & Breakdown */}
      <MacroRing
        currentCalories={dailyTotals.calories}
        targetCalories={goals?.calorieTarget || 2400}
        protein={dailyTotals.protein}
        proteinTarget={goals?.proteinTarget || 170}
        carbs={dailyTotals.carbs}
        carbTarget={goals?.carbTarget || 250}
        fat={dailyTotals.fat}
        fatTarget={goals?.fatTarget || 65}
      />

      {/* Meal Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MEAL_TYPES.map((cat) => {
          const mealForCat = meals.find((m) => m.mealType === cat.value);
          return (
            <MealCard
              key={cat.value}
              mealType={cat.value}
              meal={mealForCat}
              onAddFood={handleOpenAddFood}
              onRemoveItem={handleRemoveItem}
            />
          );
        })}
      </div>

      {/* Food Search Modal */}
      <FoodSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectFood={handleSelectFood}
      />

      {/* Portion / Quantity Editor Modal */}
      <FoodQuantityEditor
        food={selectedFood}
        isOpen={isQuantityOpen}
        onClose={() => {
          setIsQuantityOpen(false);
          setSelectedFood(null);
        }}
        onAdd={handleAddItemToMeal}
      />
    </div>
  );
}
