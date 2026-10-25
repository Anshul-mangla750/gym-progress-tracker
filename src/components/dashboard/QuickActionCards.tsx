import { ArrowRight, Bot, CalendarPlus, ChefHat, TrendingUp } from 'lucide-react';

interface QuickActionCardsProps {
  onBuildProgram: () => void;
  onMealPlanner: () => void;
  onTrackProgress: () => void;
  onAskJimm: () => void;
}

export function QuickActionCards({
  onBuildProgram,
  onMealPlanner,
  onTrackProgress,
  onAskJimm,
}: QuickActionCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
      {/* Card 1 — Build Program */}
      <button
        type="button"
        onClick={onBuildProgram}
        className="quick-action-card text-left p-4 sm:p-5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] hover:border-blue-400 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group flex flex-col justify-between min-h-[124px]"
      >
        <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2585E8] flex items-center justify-center shrink-0">
          <CalendarPlus size={18} />
        </div>
        <div className="mt-3">
          <span className="font-heading font-black text-xs sm:text-[13px] text-[#101828] block leading-tight">
            Build Program
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-[#667085] group-hover:text-[#2585E8] transition-colors leading-tight flex items-center gap-1 mt-1">
            <span>Custom plan</span>
            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </button>

      {/* Card 2 — Meal Planner */}
      <button
        type="button"
        onClick={onMealPlanner}
        className="quick-action-card text-left p-4 sm:p-5 rounded-2xl bg-[#FFF4E6] border border-[#FED7AA] hover:border-orange-400 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group flex flex-col justify-between min-h-[124px]"
      >
        <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF7A00] flex items-center justify-center shrink-0">
          <ChefHat size={18} />
        </div>
        <div className="mt-3">
          <span className="font-heading font-black text-xs sm:text-[13px] text-[#101828] block leading-tight">
            Meal Planner
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-[#667085] group-hover:text-[#FF7A00] transition-colors leading-tight flex items-center gap-1 mt-1">
            <span>AI recipes</span>
            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </button>

      {/* Card 3 — Track Progress */}
      <button
        type="button"
        onClick={onTrackProgress}
        className="quick-action-card text-left p-4 sm:p-5 rounded-2xl bg-[#E8F7EC] border border-[#BBF7D0] hover:border-emerald-400 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group flex flex-col justify-between min-h-[124px]"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#079447] flex items-center justify-center shrink-0">
          <TrendingUp size={18} />
        </div>
        <div className="mt-3">
          <span className="font-heading font-black text-xs sm:text-[13px] text-[#101828] block leading-tight">
            Track Progress
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-[#667085] group-hover:text-[#079447] transition-colors leading-tight flex items-center gap-1 mt-1">
            <span>Analytics</span>
            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </button>

      {/* Card 4 — Ask Jimm AI */}
      <button
        type="button"
        onClick={onAskJimm}
        className="quick-action-card text-left p-4 sm:p-5 rounded-2xl bg-[#F4EFFE] border border-[#DDD6FE] hover:border-purple-400 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group flex flex-col justify-between min-h-[124px]"
      >
        <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#7540E8] flex items-center justify-center shrink-0">
          <Bot size={18} />
        </div>
        <div className="mt-3">
          <span className="font-heading font-black text-xs sm:text-[13px] text-[#101828] block leading-tight">
            Ask Jimm AI
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-[#667085] group-hover:text-[#7540E8] transition-colors leading-tight flex items-center gap-1 mt-1">
            <span>AI coach</span>
            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </button>
    </div>
  );
}
