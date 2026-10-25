import { Droplets, Plus, RotateCcw } from 'lucide-react';

interface HydrationTrackerProps {
  waterMl: number;
  waterGoalMl: number;
  onAddWater: (amount: number) => void;
  onResetWater: () => void;
}

export function HydrationTracker({
  waterMl,
  waterGoalMl,
  onAddWater,
  onResetWater,
}: HydrationTrackerProps) {
  const percentage = Math.min(100, Math.round((waterMl / waterGoalMl) * 100));

  return (
    <div className="pt-5 border-t border-[#F1EEF5] space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#101828]">
          <Droplets size={14} className="text-[#2585E8] fill-[#2585E8]" />
          <span>Daily Hydration</span>
        </div>
        <span className="font-semibold text-[#667085] tabular-nums">
          {waterMl.toLocaleString()} / {waterGoalMl.toLocaleString()} ml ({percentage}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-[#EFF6FF] overflow-hidden border border-blue-100">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-[#2585E8] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Quick Add Buttons */}
      <div className="flex items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={() => onAddWater(250)}
          className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] hover:bg-blue-100 text-[#2585E8] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
        >
          <Plus size={11} />
          <span>250 ml</span>
        </button>
        <button
          type="button"
          onClick={() => onAddWater(500)}
          className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] hover:bg-blue-100 text-[#2585E8] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
        >
          <Plus size={11} />
          <span>500 ml</span>
        </button>
        {waterMl > 0 && (
          <button
            type="button"
            onClick={onResetWater}
            className="ml-auto text-[11px] text-[#667085] hover:text-[#101828] transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCcw size={11} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
