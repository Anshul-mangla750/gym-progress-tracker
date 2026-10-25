import { useState } from 'react';
import type { Food, MealItem } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { calculateNutrients } from '../../lib/nutrition-calc';

interface FoodQuantityEditorProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: MealItem) => void;
}

export function FoodQuantityEditor({
  food,
  isOpen,
  onClose,
  onAdd,
}: FoodQuantityEditorProps) {
  const [quantity, setQuantity] = useState<number>(food?.servingSize || 100);

  if (!food) return null;

  const nutrients = calculateNutrients(food, quantity, food.servingUnit);

  const handleConfirm = () => {
    const mealItem: MealItem = {
      id: `item_${Date.now()}`,
      foodId: food.id,
      foodName: food.name,
      quantity,
      unit: food.servingUnit,
      servingBasis: food.servingBasis,
      servingSize: food.servingSize,
      calories: nutrients.calories,
      protein: nutrients.protein,
      carbohydrates: nutrients.carbohydrates,
      fat: nutrients.fat,
      fiber: nutrients.fiber,
      addedAt: new Date().toISOString(),
    };
    onAdd(mealItem);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={food.name}
      description={`Serving unit: ${food.servingUnit} (${food.servingBasis})`}
      maxWidth="sm"
    >
      <div className="space-y-5">
        {/* Portion Input */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-2">
            Portion / Quantity ({food.servingUnit})
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="any"
              min="0.1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
              className="flex-1 h-11 px-3 rounded-xl bg-bg-input border border-border-default text-text-primary text-base font-bold tabular-nums focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
            />
            <span className="text-sm font-semibold text-text-muted px-2">
              {food.servingUnit}
            </span>
          </div>

          {/* Quick increment buttons */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {[0.5, 1, 1.5, 2].map((mult) => {
              const portionVal = Math.round(food.servingSize * mult);
              return (
                <button
                  key={mult}
                  type="button"
                  onClick={() => setQuantity(portionVal)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-bg-elevated hover:bg-bg-input border border-border-default text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                >
                  {portionVal} {food.servingUnit}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Macronutrients Preview */}
        <div className="p-4 rounded-xl bg-bg-secondary border border-border-default space-y-2.5">
          <div className="flex justify-between items-baseline border-b border-border-default pb-2">
            <span className="text-sm font-medium text-text-secondary">Total Calories:</span>
            <span className="font-heading font-extrabold text-2xl text-accent-primary tabular-nums">
              {nutrients.calories} <span className="text-xs text-text-muted">kcal</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs">
            <div className="p-2 rounded-lg bg-bg-card border border-border-subtle">
              <span className="text-text-muted block text-[10px] uppercase font-semibold">Protein</span>
              <strong className="text-text-primary font-bold text-sm tabular-nums">{nutrients.protein}g</strong>
            </div>
            <div className="p-2 rounded-lg bg-bg-card border border-border-subtle">
              <span className="text-text-muted block text-[10px] uppercase font-semibold">Carbs</span>
              <strong className="text-text-primary font-bold text-sm tabular-nums">{nutrients.carbohydrates}g</strong>
            </div>
            <div className="p-2 rounded-lg bg-bg-card border border-border-subtle">
              <span className="text-text-muted block text-[10px] uppercase font-semibold">Fat</span>
              <strong className="text-text-primary font-bold text-sm tabular-nums">{nutrients.fat}g</strong>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" fullWidth onClick={handleConfirm}>
            Add to Meal
          </Button>
        </div>
      </div>
    </Modal>
  );
}
