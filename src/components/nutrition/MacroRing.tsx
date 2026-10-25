import { Dumbbell, Wheat, Droplets, Flame } from 'lucide-react';

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
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 p-1.5 bg-transparent min-w-0 ${className}`}>
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
          {/* Vibrant brand green stroke */}
          <circle
            cx="50"
            cy="50"
            r="41"
            className="text-[#079447] stroke-current transition-all duration-700 ease-out"
            strokeWidth="9"
            strokeDasharray={257.6}
            strokeDashoffset={257.6 - (calPercent / 100) * 257.6}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Center Text with Flame Icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <div className="flex items-center gap-1">
            <Flame size={14} className="text-[#079447] fill-[#079447]" />
            <span className="font-heading font-black text-2xl sm:text-3xl text-[#101828] tabular-nums tracking-tight leading-none">
              {Math.round(currentCalories).toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#667085] mt-1">
            / {targetCalories.toLocaleString()} KCAL
          </span>
          <span className="text-[10px] font-bold text-white mt-1.5 px-3 py-0.5 rounded-full bg-[#079447] shadow-xs">
            {isPaceReached ? 'Pace Reached!' : `${Math.round(targetCalories - currentCalories).toLocaleString()} left`}
          </span>
        </div>
      </div>

      {/* Macronutrient Bars with clean gaps and icons */}
      <div className="flex-1 w-full min-w-0 space-y-4">
        {/* Protein */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#101828] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#E8F7EC] text-[#079447] flex items-center justify-center shrink-0">
                <Dumbbell size={13} className="text-[#079447]" />
              </span>
              <span>Protein</span>
            </span>
            <span className="font-mono tabular-nums text-[#667085] text-xs">
              <strong className="text-[#101828] font-bold">{Math.round(protein)}g</strong> / {proteinTarget}g
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
            <div
              className="h-full bg-[#079447] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((protein / (proteinTarget || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#101828] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEF9E7] text-[#D9A115] flex items-center justify-center shrink-0">
                <Wheat size={13} className="text-[#D9A115]" />
              </span>
              <span>Carbs</span>
            </span>
            <span className="font-mono tabular-nums text-[#667085] text-xs">
              <strong className="text-[#101828] font-bold">{Math.round(carbs)}g</strong> / {carbTarget}g
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
            <div
              className="h-full bg-[#F5C542] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((carbs / (carbTarget || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Fats */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#101828] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FEE8EB] text-[#E95767] flex items-center justify-center shrink-0">
                <Droplets size={13} className="text-[#E95767]" />
              </span>
              <span>Fats</span>
            </span>
            <span className="font-mono tabular-nums text-[#667085] text-xs">
              <strong className="text-[#101828] font-bold">{Math.round(fat)}g</strong> / {fatTarget}g
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
            <div
              className="h-full bg-[#E95767] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((fat / (fatTarget || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
