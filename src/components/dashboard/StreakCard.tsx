import { Flame, Check, Zap } from 'lucide-react';

interface DayIndicator {
  label: string;
  completed: boolean;
  text?: string;
}

interface StreakCardProps {
  streakDays?: number;
  daysOfWeek: DayIndicator[];
  className?: string;
}

export function StreakCard({ streakDays = 4, daysOfWeek, className = '' }: StreakCardProps) {
  return (
    <div
      className={`dashboard-streak-card w-full sm:w-auto md:w-72 rounded-2xl p-4 sm:p-5 shrink-0 z-10 space-y-3.5 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FFF4E6] flex items-center justify-center text-[#FF7A00] shrink-0 shadow-2xs">
          <Flame size={20} className="fill-[#FF7A00] text-[#FF7A00]" />
        </div>
        <div>
          <span className="font-heading font-extrabold text-xs sm:text-sm text-[#101828] block leading-tight">
            {streakDays}-Day Training Streak
          </span>
          <span className="text-[11px] text-[#667085] font-medium flex items-center gap-1 mt-0.5">
            <Zap size={11} className="text-[#FF7A00] fill-[#FF7A00]" />
            <span>3 days to Spark ⚡</span>
          </span>
        </div>
      </div>

      {/* 7-Day Weekday Indicators */}
      <div className="flex items-center justify-between gap-1 pt-3 border-t border-[#F0F4F1]">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold text-[#667085]">{day.label}</span>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                day.completed
                  ? 'dashboard-streak-day-active'
                  : 'dashboard-streak-day-inactive'
              }`}
            >
              {day.completed ? <Check size={13} className="stroke-[3]" /> : day.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
