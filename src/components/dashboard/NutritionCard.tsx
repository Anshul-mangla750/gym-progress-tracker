import { Plus, Scale, UtensilsCrossed } from 'lucide-react';
import { MacroRing } from '../nutrition/MacroRing';

interface NutritionCardProps {
  currentCalories: number;
  targetCalories: number;
  protein: number;
  proteinTarget: number;
  carbs: number;
  carbTarget: number;
  fat: number;
  fatTarget: number;
  onLogMeals: () => void;
}

export function NutritionCard({
  currentCalories,
  targetCalories,
  protein,
  proteinTarget,
  carbs,
  carbTarget,
  fat,
  fatTarget,
  onLogMeals,
}: NutritionCardProps) {
  return (
    <div className="nutrition-summary-card bg-white rounded-2xl border border-[#E4EDE7] p-6 sm:p-7 shadow-xs space-y-6 card-elevated">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F7EC] text-[#079447] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <UtensilsCrossed size={17} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#101828] leading-tight">
              Today's Nutrition & Goal Pace
            </h3>
            <span className="text-xs text-[#667085] flex items-center gap-1 mt-0.5">
              <Scale size={12} className="text-[#667085]" />
              <span>Calorie deficit/surplus compliance</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogMeals}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#079447] text-[#079447] hover:bg-[#E8F7EC] text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
        >
          <Plus size={12} />
          <span>Log Meals →</span>
        </button>
      </div>

      {/* Macro Ring Component with circular calorie indicator & 3 macros */}
      <MacroRing
        currentCalories={currentCalories}
        targetCalories={targetCalories}
        protein={protein}
        proteinTarget={proteinTarget}
        carbs={carbs}
        carbTarget={carbTarget}
        fat={fat}
        fatTarget={fatTarget}
        className="border-none p-0 bg-transparent"
      />

    </div>
  );
}
