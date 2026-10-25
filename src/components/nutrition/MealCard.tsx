import type { MealLog, MealType, MealItem } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MEAL_TYPES } from '../../lib/constants';
import { Plus, Trash2, Utensils } from 'lucide-react';

interface MealCardProps {
  mealType: MealType;
  meal?: MealLog;
  onAddFood: (mealType: MealType) => void;
  onRemoveItem: (mealId: string, itemId: string) => void;
}

export function MealCard({
  mealType,
  meal,
  onAddFood,
  onRemoveItem,
}: MealCardProps) {
  const meta = MEAL_TYPES.find((m) => m.value === mealType) || {
    value: mealType,
    label: mealType,
  };

  const items: MealItem[] = meal?.items || [];
  const calories = meal?.totalCalories || 0;
  const protein = meal?.totalProtein || 0;
  const carbs = meal?.totalCarbs || 0;
  const fat = meal?.totalFat || 0;

  return (
    <Card className="bg-bg-card border border-border-default overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-default">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center text-accent-primary shrink-0">
            <Utensils size={15} />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-text-primary capitalize">
              {meta.label}
            </h4>
            <span className="text-xs text-text-muted">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Meal subtotal badges */}
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <div className="text-right text-xs">
              <span className="font-heading font-bold text-text-primary tabular-nums">
                {calories} kcal
              </span>
              <span className="text-text-muted block text-[10px]">
                {protein}g P • {carbs}g C • {fat}g F
              </span>
            </div>
          )}
          <Button
            variant="secondary"
            size="sm"
            icon={<Plus size={13} />}
            onClick={() => onAddFood(mealType)}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="py-4 text-center text-xs text-text-muted">
          No foods logged yet for {meta.label.toLowerCase()}.
        </div>
      ) : (
        <div className="space-y-1.5 divide-y divide-border-default/40">
          {items.map((item) => (
            <div
              key={item.id}
              className="pt-2 first:pt-0 flex items-center justify-between text-xs group"
            >
              <div>
                <span className="font-medium text-text-primary block line-clamp-1">
                  {item.foodName}
                </span>
                <span className="text-text-muted text-[11px] tabular-nums">
                  {item.quantity} {item.unit} • {item.calories} kcal ({item.protein}g P)
                </span>
              </div>

              <button
                type="button"
                onClick={() => meal && onRemoveItem(meal.id, item.id)}
                className="p-1 rounded-md text-text-muted hover:text-error hover:bg-bg-elevated transition-colors ml-2 cursor-pointer"
                title="Remove item"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
