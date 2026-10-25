import { ChevronRight, Eye, Repeat } from 'lucide-react';

interface ExerciseRowProps {
  index: number;
  name: string;
  tags: string[];
  prescription: string;
  onClick: () => void;
}

export function ExerciseRow({ index, name, tags, prescription, onClick }: ExerciseRowProps) {
  return (
    <div
      onClick={onClick}
      className="dashboard-exercise-row flex items-center justify-between py-3.5 px-3.5 sm:px-4 rounded-xl hover:bg-[#F3E8FF]/60 transition-colors cursor-pointer group"
      title="Click to view technique, form cues & muscles"
    >
      {/* Number + Title + Muscle tags */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-6 h-6 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center text-xs font-bold shrink-0">
          {index + 1}
        </div>
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          <span className="font-heading font-bold text-xs sm:text-sm text-[#101828] group-hover:text-[#7C3AED] truncate transition-colors">
            {name}
          </span>
          <Eye size={12} className="opacity-0 group-hover:opacity-100 text-[#7C3AED] transition-opacity shrink-0" />
          <div className="hidden sm:flex items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[#FBFAFD] border border-[#E9E4F0] text-[#667085] text-[10px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sets & Reps + Arrow */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-semibold text-[#667085] tabular-nums flex items-center gap-1">
          <Repeat size={12} className="text-[#667085]" />
          <span>{prescription}</span>
        </span>
        <ChevronRight size={14} className="text-[#667085] group-hover:text-[#7C3AED] group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}
