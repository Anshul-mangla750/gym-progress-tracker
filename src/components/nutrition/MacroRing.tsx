import { ShoppingBag, Wheat, Droplets } from 'lucide-react';

interface MacroRingProps {
  currentCalories: number;
  targetCalories: number;
  protein: number;
  proteinTarget: number;
  carbs: number;
  carbTarget: number;
  fat: number;
  fatTarget: number;
  className?: string;
}

export function MacroRing({
  currentCalories,
  targetCalories,
  protein,
  proteinTarget,
  carbs,
  carbTarget,
  fat,
  fatTarget,
  className = '',
}: MacroRingProps) {
  const calPercent = targetCalories > 0 ? Math.min((currentCalories / targetCalories) * 100, 100) : 0;
  const isPaceReached = currentCalories >= targetCalories;

  return (
    <div className={`flex flex-col min-[1450px]:flex-row items-center justify-between gap-4 xl:gap-5 p-1 bg-transparent min-w-0 ${className}`}>
      {/* Central Calorie Gauge */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
        <svg className="w-32 h-32 sm:w-36 sm:h-36 -rotate-90 transform" viewBox="0 0 100 100">
          {/* Background track circle */}
          <circle
            cx="50"
            cy="50"
            r="41"
            className="text-neutral-100 stroke-current"
            strokeWidth="9"
            fill="none"
          />
          {/* Vibrant green stroke */}
          <circle
            cx="50"
            cy="50"
            r="41"
            className="text-[#16A34A] stroke-current transition-all duration-700 ease-out"
            strokeWidth="9"
            strokeDasharray={257.6}
            strokeDashoffset={257.6 - (calPercent / 100) * 257.6}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 tabular-nums tracking-tight leading-none">
            {Math.round(currentCalories).toLocaleString()}
          </span>
          <span className="text-[11px] font-semibold text-neutral-400 mt-1">
            / {targetCalories.toLocaleString()} KCAL
          </span>
          <span className="text-[10px] font-bold text-white mt-1.5 px-3 py-0.5 rounded-full bg-[#16A34A] shadow-xs">
            {isPaceReached ? 'Pace Reached!' : `${Math.round(targetCalories - currentCalories).toLocaleString()} left`}
          </span>
        </div>
      </div>

      {/* Macronutrient Bars */}
      <div className="flex-1 w-full min-[1450px]:w-auto min-w-0 space-y-3.5">
        {/* Protein */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-neutral-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                <ShoppingBag size={13} className="text-emerald-700" />
              </span>
              <span>Protein</span>
            </span>
            <span className="font-mono tabular-nums text-neutral-500 text-xs">
              <strong className="text-neutral-900 font-bold">{Math.round(protein)}g</strong> / {proteinTarget}g
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full bg-[#16A34A] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((protein / (proteinTarget || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-neutral-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                <Wheat size={13} className="text-amber-700" />
              </span>
              <span>Carbs</span>
            </span>
            <span className="font-mono tabular-nums text-neutral-500 text-xs">
              <strong className="text-neutral-900 font-bold">{Math.round(carbs)}g</strong> / {carbTarget}g
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full bg-[#EAB308] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((carbs / (carbTarget || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Fats */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-neutral-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                <Droplets size={13} className="text-rose-700" />
              </span>
              <span>Fats</span>
            </span>
            <span className="font-mono tabular-nums text-neutral-500 text-xs">
              <strong className="text-neutral-900 font-bold">{Math.round(fat)}g</strong> / {fatTarget}g
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full bg-[#EF4444] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((fat / (fatTarget || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
