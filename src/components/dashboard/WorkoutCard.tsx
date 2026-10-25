import { Calendar, CalendarDays, Clock, Dumbbell, Layers, ListPlus, Play, Zap } from 'lucide-react';
import { ExerciseRow } from './ExerciseRow';
import heroAthleteImg from '../../assets/hero_athlete.jpg';

interface ExerciseItem {
  id: string;
  exerciseName: string;
  tags?: string[];
  prescription: string;
}

interface WorkoutCardProps {
  exercises: ExerciseItem[];
  dateString?: string;
  workoutTitle?: string;
  duration?: string;
  onExerciseClick: (name: string, id?: string) => void;
  onStartWorkout: () => void;
  onViewMoreExercises: () => void;
}

export function WorkoutCard({
  exercises,
  dateString = 'Sunday, October 25',
  workoutTitle = 'Push Day (Chest, Shoulders & Triceps)',
  duration = '~60–75 min',
  onExerciseClick,
  onStartWorkout,
  onViewMoreExercises,
}: WorkoutCardProps) {
  return (
    <div className="min-w-0 space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-50 text-[#7C3AED] flex items-center justify-center shrink-0">
            <Calendar size={16} />
          </div>
          <h2 className="font-heading font-bold text-base sm:text-lg text-[#101828]">
            Next Scheduled Workout
          </h2>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#667085]">
          <CalendarDays size={13} className="text-[#667085]" />
          <span>{dateString}</span>
        </span>
      </div>

      {/* Workout Card */}
      <div className="bg-white rounded-2xl border border-[#E9E4F0] shadow-xs overflow-hidden card-elevated">
        {/* Dark Green Workout Banner */}
        <div className="workout-dark-banner relative overflow-hidden bg-gradient-to-r from-[#5B21B6] to-[#4C1D95] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
          <img src={heroAthleteImg} alt="" aria-hidden="true" className="workout-athlete-art" />
          {/* Dumbbell watermark */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
            <Dumbbell size={64} className="rotate-12 text-white" />
          </div>

          <div className="relative z-10 space-y-1 min-w-0">
            <h3 className="font-heading font-black text-base sm:text-lg tracking-tight text-white truncate flex items-center gap-2">
              <Dumbbell size={18} className="text-violet-300 shrink-0" />
              <span>{workoutTitle}</span>
            </h3>
          </div>

          <div className="relative z-10 flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-xs">
              <Clock size={11} />
              <span>{duration}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F3E8FF]/20 text-[#DDD6FE] border border-white/10">
              <Layers size={11} />
              <span>{exercises.length} Exercises</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#7C3AED]/40 text-violet-200 border border-violet-400/30">
              <Zap size={11} className="fill-violet-200" />
              <span>Strength</span>
            </span>
          </div>
        </div>

        {/* Exercise List */}
        <div className="p-4 sm:p-5 divide-y divide-[#F1EEF5] space-y-1">
          {exercises.map((ex, idx) => (
            <ExerciseRow
              key={ex.id || idx}
              index={idx}
              name={ex.exerciseName}
              tags={ex.tags || ['Chest', 'Triceps']}
              prescription={ex.prescription}
              onClick={() => onExerciseClick(ex.exerciseName, ex.id)}
            />
          ))}

          {/* + 1 more exercise link */}
          <div className="pt-2.5">
            <button
              type="button"
              onClick={onViewMoreExercises}
              className="w-full text-center py-2.5 text-xs font-bold text-[#667085] hover:text-[#101828] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ListPlus size={14} />
              <span>+1 more exercise</span>
            </button>
          </div>
        </div>

        {/* Start Button */}
        <div className="p-5 sm:p-6 pt-2 border-t border-[#F1EEF5]">
          <button
            type="button"
            onClick={onStartWorkout}
            className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#4C1D95] text-white font-heading font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Play size={16} className="fill-white" />
            <span>Start Workout Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
