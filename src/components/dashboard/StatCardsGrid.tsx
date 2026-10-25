import { Award, CalendarCheck, ChevronRight, Dumbbell, Flame, Footprints, Sparkles, Trophy } from 'lucide-react';
import { StatCard } from '../ui/StatCard';

interface StatCardsGridProps {
  displayVolume: string;
  displayWorkouts: string | number;
  allTimeSessions: number;
  streakDays: number;
  displayPRs: string | number;
}

export function StatCardsGrid({
  displayVolume,
  displayWorkouts,
  allTimeSessions,
  streakDays,
  displayPRs,
}: StatCardsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {/* Card 1 — Weekly Volume */}
      <StatCard
        title="Weekly Volume"
        value={displayVolume}
        unit="kg"
        icon={
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E8F7EC] flex items-center justify-center text-[#079447]">
            <Dumbbell size={20} />
          </div>
        }
        trend={{ value: 8.5, label: 'vs last week', isPositiveGood: true }}
        rightVisual={
          <div className="flex items-end gap-1 h-5 pt-1">
            <span className="w-1.5 h-2.5 bg-[#079447] rounded-xs"></span>
            <span className="w-1.5 h-4 bg-[#079447] rounded-xs"></span>
            <span className="w-1.5 h-5 bg-[#079447] rounded-xs"></span>
          </div>
        }
      />

      {/* Card 2 — Workouts */}
      <StatCard
        title="Workouts"
        value={String(displayWorkouts)}
        unit="logged"
        icon={
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2585E8]">
            <Footprints size={20} />
          </div>
        }
        subtitle={
          <>
            <CalendarCheck size={12} className="text-[#2585E8] shrink-0" />
            <span>All-time sessions: {allTimeSessions}</span>
          </>
        }
        rightVisual={
          <svg className="w-12 h-5 text-[#2585E8]" viewBox="0 0 60 24" fill="none">
            <path
              d="M2 18 C 15 18, 25 4, 38 12 C 46 16, 52 4, 58 2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        }
      />

      {/* Card 3 — Training Streak */}
      <StatCard
        title="Training Streak"
        value={String(streakDays)}
        unit="days"
        icon={
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF4E6] flex items-center justify-center text-[#FF7A00]">
            <Flame size={20} className="fill-[#FF7A00] text-[#FF7A00]" />
          </div>
        }
        trend={{
          value: 100,
          label: 'consistent adherence',
          isPositiveGood: true,
          icon: <Award size={13} className="text-[#FF7A00] shrink-0" />,
        }}
        rightVisual={
          <Flame size={18} className="text-[#FF7A00] fill-[#FF7A00]" />
        }
      />

      {/* Card 4 — PRs Broken */}
      <StatCard
        title="PRs Broken"
        value={String(displayPRs)}
        unit="records"
        icon={
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F4EFFE] flex items-center justify-center text-[#7540E8]">
            <Trophy size={20} />
          </div>
        }
        subtitle={
          <>
            <Sparkles size={12} className="text-[#7540E8] shrink-0" />
            <span>Double progression unlocked!</span>
          </>
        }
        rightVisual={
          <ChevronRight size={18} className="text-[#667085]" />
        }
      />
    </div>
  );
}
