import { Sparkles, Target } from 'lucide-react';
import heroAthleteImg from '../../assets/hero_athlete.jpg';
import { StreakCard } from './StreakCard';

interface DayIndicator {
  label: string;
  completed: boolean;
  text?: string;
}

const DEFAULT_DAYS_OF_WEEK: DayIndicator[] = [
  { label: 'M', completed: true },
  { label: 'T', completed: true },
  { label: 'W', completed: true },
  { label: 'T', completed: false, text: '3' },
  { label: 'F', completed: false, text: 'F' },
  { label: 'S', completed: false, text: '6' },
  { label: 'S', completed: false, text: '7' },
];

interface HeroBannerProps {
  userName?: string;
  dayName?: string;
  streakDays?: number;
  daysOfWeek?: DayIndicator[];
}

export function HeroBanner({
  userName = 'Alex',
  dayName = 'Push Day (Chest, Shoulders & Triceps)',
  streakDays = 0,
  daysOfWeek = DEFAULT_DAYS_OF_WEEK,
}: HeroBannerProps) {
  return (
    <div className="dashboard-hero-card rounded-3xl p-5 sm:p-7 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8 min-h-[160px]">
      {/* Left Section: Title, Subtitle, AI Badge */}
      <div className="flex-1 max-w-md xl:max-w-lg space-y-2.5 z-10 shrink-0">
        <div className="dashboard-hero-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
          <Sparkles size={11} className="fill-[#5B21B6] text-[#5B21B6]" />
          <span>AI FITNESS COMPANION</span>
        </div>

        <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-[34px] text-[#101828] tracking-tight leading-tight">
          Ready to Overload, <span className="text-[#7C3AED]">{userName}?</span>
        </h1>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#101828]">
          <Target size={15} className="text-[#7C3AED] shrink-0" />
          <span>Today's target: {dayName}.</span>
        </div>
        <p className="text-xs sm:text-sm text-[#667085] font-medium pl-6">
          Let's keep the momentum going! 💪
        </p>
      </div>

      {/* Center Athlete Cutout Image in Dedicated Flex Space (No overlapping) */}
      <div className="dashboard-athlete-art hidden xl:flex items-center justify-center pointer-events-none" aria-hidden="true">
        <img
          src={heroAthleteImg}
          alt=""
          className="h-full w-full object-cover object-center mix-blend-multiply opacity-90"
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 92%)',
          }}
        />
      </div>

      {/* Right Section: Streak Card */}
      <StreakCard streakDays={streakDays} daysOfWeek={daysOfWeek} />
    </div>
  );
}

