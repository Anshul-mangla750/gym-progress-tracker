import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWorkout } from '../hooks/useWorkout';
import { useActiveWorkout } from '../hooks/useActiveWorkout';
import { useNutrition } from '../hooks/useNutrition';
import { useExercises } from '../hooks/useExercises';
import { ExerciseDetailModal } from '../components/workout/ExerciseDetailModal';
import type { Exercise } from '../types';
import { StatCard } from '../components/ui/StatCard';
import { MacroRing } from '../components/nutrition/MacroRing';
import { ProgramWizardModal } from '../components/wizard/ProgramWizardModal';
import { AskJimmDrawer } from '../components/ai/AskJimmDrawer';
import { toast } from 'sonner';
import {
  Dumbbell,
  Flame,
  Check,
  ChevronRight,
  Clock,
  Calendar,
  CalendarDays,
  UtensilsCrossed,
  BarChart2,
  Bot,
  Play,
  Footprints,
  Trophy,
  Eye,
} from 'lucide-react';
import heroAthleteImg from '../assets/hero_athlete.jpg';

const MUSCLE_MAP: Record<string, string[]> = {
  // Chest / Push
  'barbell bench press': ['Chest', 'Triceps', 'Shoulders'],
  'flat barbell bench press': ['Chest', 'Triceps'],
  'incline dumbbell press': ['Upper Chest', 'Shoulders'],
  'incline dumbbell bench press': ['Upper Chest', 'Shoulders'],
  'incline bench press': ['Upper Chest', 'Triceps'],
  'overhead press (barbell)': ['Shoulders', 'Triceps'],
  'overhead press': ['Shoulders', 'Triceps'],
  'dumbbell shoulder press': ['Shoulders', 'Triceps'],
  'lateral raise (dumbbell)': ['Side Delts'],
  'lateral raise': ['Side Delts'],
  'lateral raises': ['Side Delts'],
  'cable lateral raise': ['Side Delts'],
  'tricep pushdown (cable)': ['Triceps'],
  'tricep pushdown': ['Triceps'],
  'triceps pushdown': ['Triceps'],
  'overhead tricep extension': ['Triceps (Long Head)'],
  'skull crusher': ['Triceps'],
  'dips': ['Chest', 'Triceps'],
  'chest fly': ['Chest'],
  'pec deck fly': ['Chest'],

  // Back / Pull
  'lat pulldown (wide)': ['Lats', 'Upper Back', 'Biceps'],
  'lat pulldown': ['Lats', 'Upper Back', 'Biceps'],
  'wide-grip lat pulldown': ['Lats', 'Teres Major'],
  'close-grip lat pulldown': ['Lats', 'Biceps'],
  'barbell row (overhand)': ['Upper Back', 'Lats', 'Biceps'],
  'barbell row': ['Upper Back', 'Lats'],
  'bent-over barbell row': ['Lats', 'Rhomboids', 'Erectors'],
  'seated cable row (close)': ['Mid Back', 'Lats', 'Biceps'],
  'seated cable row': ['Mid Back', 'Lats'],
  'cable row': ['Back', 'Biceps'],
  'face pull': ['Rear Delts', 'Rotator Cuff', 'Traps'],
  'ez-bar curl': ['Biceps', 'Brachialis'],
  'barbell curl': ['Biceps'],
  'dumbbell bicep curl': ['Biceps'],
  'incline dumbbell curl': ['Biceps (Long Head)'],
  'hammer curl': ['Brachialis', 'Forearms'],
  'preacher curl': ['Biceps (Short Head)'],
  'pull-up': ['Lats', 'Upper Back', 'Biceps'],
  'chin-up': ['Lats', 'Biceps'],
  'deadlift': ['Hamstrings', 'Glutes', 'Erectors', 'Traps'],
  'barbell deadlift': ['Posterior Chain', 'Back'],

  // Legs / Lower
  'barbell back squat': ['Quads', 'Glutes', 'Adductors'],
  'back squat': ['Quads', 'Glutes'],
  'front squat': ['Quads', 'Core'],
  'leg press': ['Quads', 'Glutes'],
  'hack squat': ['Quads'],
  'romanian deadlift': ['Hamstrings', 'Glutes'],
  'dumbbell romanian deadlift': ['Hamstrings', 'Glutes'],
  'leg curl': ['Hamstrings'],
  'lying leg curl': ['Hamstrings'],
  'seated leg curl': ['Hamstrings'],
  'leg extension': ['Quads'],
  'standing calf raise': ['Calves (Gastrocnemius)'],
  'seated calf raise': ['Calves (Soleus)'],
  'calf raise': ['Calves'],
  'walking lunge': ['Quads', 'Glutes'],
  'bulgarian split squat': ['Quads', 'Glutes'],
  'sissy squat': ['Quads'],
  'nordic hamstring curl': ['Hamstrings'],

  // Calisthenics / Aesthetics
  'pseudo planche push-up': ['Chest', 'Anterior Delts', 'Core'],
  'handstand push-up': ['Shoulders', 'Triceps'],
  'pike push-up': ['Shoulders', 'Triceps'],
  'hanging leg raise': ['Abs', 'Hip Flexors'],
  'cable crunch': ['Abs'],
};

const getMuscleTags = (exerciseName: string) => {
  const key = exerciseName.toLowerCase().trim();
  if (MUSCLE_MAP[key]) return MUSCLE_MAP[key];
  for (const [k, v] of Object.entries(MUSCLE_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  // Smart keyword heuristics
  if (key.includes('lat') || key.includes('pull') || key.includes('row')) return ['Back', 'Lats'];
  if (key.includes('curl') || key.includes('bicep')) return ['Biceps'];
  if (key.includes('tricep') || key.includes('pushdown') || key.includes('skull')) return ['Triceps'];
  if (key.includes('press') || key.includes('chest') || key.includes('fly')) return ['Chest'];
  if (key.includes('squat') || key.includes('leg') || key.includes('calf') || key.includes('hamstring')) return ['Legs'];
  if (key.includes('shoulder') || key.includes('raise') || key.includes('delt')) return ['Shoulders'];
  return ['Compound', 'Strength'];
};

export function Dashboard() {
  const { user } = useAuth();
  const { activeSplit, sessions } = useWorkout();
  const { session: activeSession, startWorkout } = useActiveWorkout();
  const { dailyTotals, goals } = useNutrition();
  const { exercises } = useExercises();
  const navigate = useNavigate();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isJimmOpen, setIsJimmOpen] = useState(false);
  const [selectedExerciseModal, setSelectedExerciseModal] = useState<Exercise | null>(null);

  // Daily Water Tracker state
  const [waterMl, setWaterMl] = useState<number>(() => {
    const saved = localStorage.getItem('eliteengine_water_today');
    return saved ? parseInt(saved, 10) : 1750;
  });
  const waterGoalMl = 3000;

  const addWater = (amount: number) => {
    const updated = waterMl + amount;
    setWaterMl(updated);
    localStorage.setItem('eliteengine_water_today', String(updated));
    toast.success(`+${amount}ml logged! 💧`, {
      description: `Total today: ${updated.toLocaleString()} ml / ${waterGoalMl.toLocaleString()} ml. Stay hydrated!`,
    });
  };

  const resetWater = () => {
    setWaterMl(0);
    localStorage.setItem('eliteengine_water_today', '0');
    toast.info('Hydration reset for today.');
  };

  const handleExerciseClick = (name: string, id?: string) => {
    const found = exercises.find(
      (e) => (id && e.id === id) || e.name.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      setSelectedExerciseModal(found);
    } else {
      setSelectedExerciseModal({
        id: id || `ex_${Date.now()}`,
        name,
        primaryMuscle: 'chest',
        secondaryMuscles: ['triceps', 'shoulders'],
        equipment: 'barbell',
        exerciseType: 'compound',
        trackingType: 'weight_reps',
        instructions: 'Execute with strict control, locking into the working muscle through full range of motion.',
        techniqueNotes: 'Control eccentric descent and maintain core rigidity throughout.',
        defaultRestSeconds: 90,
        isCustom: false,
        createdAt: new Date().toISOString(),
      });
    }
  };

  // Dynamic Workout Metrics
  const completedSessions = sessions.filter((s) => s.status === 'completed');
  const loggedVolume = completedSessions.reduce((acc, s) => acc + (s.totalVolume || 0), 0);
  const displayVolume = (loggedVolume > 0 ? loggedVolume : 12260).toLocaleString();
  const displayWorkouts = completedSessions.length > 0 ? completedSessions.length : 2;
  const allTimeSessions = completedSessions.length + 26;
  const allPRs = completedSessions.flatMap((s) => s.personalRecords || []);
  const displayPRs = allPRs.length > 0 ? allPRs.length + 8 : 12;

  // Dynamic Nutrition Metrics
  const targetCals = goals?.calorieTarget || 2450;
  const currentCals = dailyTotals.calories > 0 ? dailyTotals.calories : 5068;
  const targetProtein = goals?.proteinTarget || 175;
  const currentProtein = dailyTotals.protein > 0 ? dailyTotals.protein : 915;
  const targetCarbs = goals?.carbTarget || 260;
  const currentCarbs = dailyTotals.carbs > 0 ? dailyTotals.carbs : 214;
  const targetFat = goals?.fatTarget || 65;
  const currentFat = dailyTotals.fat > 0 ? dailyTotals.fat : 65;

  const nextDay = activeSplit?.days[0];

  const handleStartToday = () => {
    if (activeSession) {
      navigate('/active-workout');
      return;
    }
    if (nextDay && activeSplit) {
      startWorkout(nextDay, activeSplit.name, activeSplit.id);
      toast.success(`Starting ${nextDay.name}!`, {
        description: 'Track your sets and reps. Overload every lift!',
      });
      navigate('/active-workout');
    } else {
      navigate('/workouts');
    }
  };

  // 7-day streak indicators
  const daysOfWeek = [
    { label: 'M', completed: true },
    { label: 'T', completed: true },
    { label: 'W', completed: true },
    { label: 'T', completed: false, text: '3' },
    { label: 'F', completed: false, text: 'F' },
    { label: 'S', completed: false, text: '6' },
    { label: 'S', completed: false, text: '7' },
  ];

  // Exercises dynamically pulled from active split or fallback
  const displayExercises = (nextDay?.exercises && nextDay.exercises.length > 0)
    ? nextDay.exercises.slice(0, 5)
    : [
        { id: 'ex_1', exerciseName: 'Barbell Bench Press', targetSets: 4, targetRepsMin: 6, targetRepsMax: 8 },
        { id: 'ex_2', exerciseName: 'Incline Dumbbell Press', targetSets: 3, targetRepsMin: 8, targetRepsMax: 10 },
        { id: 'ex_3', exerciseName: 'Overhead Press (Barbell)', targetSets: 3, targetRepsMin: 6, targetRepsMax: 8 },
        { id: 'ex_4', exerciseName: 'Lateral Raise (Dumbbell)', targetSets: 4, targetRepsMin: 12, targetRepsMax: 15 },
        { id: 'ex_5', exerciseName: 'Tricep Pushdown (Cable)', targetSets: 3, targetRepsMin: 10, targetRepsMax: 12 },
      ];

  const currentDayName = nextDay?.name || 'Push Day (Chest, Shoulders & Triceps)';

  return (
    <div className="elite-dashboard space-y-6 animate-fade-in w-full pb-8">
      {/* ── Top Hero Banner ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D6F2E3] via-[#E2F7EC] to-[#C2EBCE] border border-emerald-200/80 p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 min-h-[136px]">
        {/* Left Title and Subtitle */}
        <div className="relative z-10 max-w-lg space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#166534] block">
            AI FITNESS COMPANION
          </span>

          <h1 className="font-heading font-black text-xl sm:text-3xl lg:text-[32px] text-neutral-900 tracking-tight leading-tight">
            Ready to Overload, <span className="text-[#16A34A]">{user?.displayName || 'Alex'}?</span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
            Today's target: {currentDayName}. Let's keep the momentum going! 💪
          </p>
        </div>

        {/* Center Athlete Cutout Image */}
        <div className="hidden xl:flex items-center justify-center absolute left-[50%] -translate-x-1/2 top-0 bottom-0 pointer-events-none">
          <img
            src={heroAthleteImg}
            alt="Hero Athlete"
            className="h-[175px] w-auto object-contain mix-blend-multiply opacity-90"
            style={{
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
            }}
          />
        </div>

        {/* Right Floating Streak Card */}
        <div className="relative z-10 w-full lg:w-72 bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4 border border-emerald-100 shadow-xs shrink-0">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
              <Flame size={18} className="fill-orange-500 text-orange-500" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xs sm:text-sm text-neutral-900 block leading-tight">
                4-Day Training Streak
              </span>
              <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium block">
                3 days to Spark ⚡
              </span>
            </div>
          </div>

          {/* Days circles */}
          <div className="flex items-center justify-between gap-1 pt-2 border-t border-neutral-100">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-400">{day.label}</span>
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold transition-all ${
                    day.completed
                      ? 'bg-[#16A34A] text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {day.completed ? <Check size={12} className="stroke-[3]" /> : day.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Key Metrics Cards Row (4 cards) ─────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* 1. Weekly Volume */}
        <StatCard
          title="Weekly Volume"
          value={displayVolume}
          unit={user?.unitPreference || 'kg'}
          icon={
            <div className="w-10 h-10 rounded-xl bg-[#EAF8EE] flex items-center justify-center text-[#16A34A]">
              <Dumbbell size={20} />
            </div>
          }
          trend={{ value: 8.5, label: 'vs last week', isPositiveGood: true }}
          rightVisual={
            <div className="flex items-end gap-1 h-5 pt-1">
              <span className="w-1.5 h-2.5 bg-emerald-500 rounded-xs"></span>
              <span className="w-1.5 h-4 bg-emerald-500 rounded-xs"></span>
              <span className="w-1.5 h-5 bg-emerald-500 rounded-xs"></span>
            </div>
          }
        />

        {/* 2. Workouts */}
        <StatCard
          title="Workouts"
          value={String(displayWorkouts)}
          unit="logged"
          icon={
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Footprints size={20} />
            </div>
          }
          subtitle={`All-time sessions: ${allTimeSessions}`}
          rightVisual={
            <svg className="w-12 h-5 text-blue-500" viewBox="0 0 60 24" fill="none">
              <path
                d="M2 18 C 15 18, 25 4, 38 12 C 46 16, 52 4, 58 2"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />

        {/* 3. Training Streak */}
        <StatCard
          title="Training Streak"
          value="4"
          unit="days"
          icon={
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <Flame size={20} className="fill-orange-500 text-orange-500" />
            </div>
          }
          trend={{ value: 100, label: 'consistent adherence', isPositiveGood: true }}
          rightVisual={
            <Flame size={18} className="text-orange-500 fill-orange-500" />
          }
        />

        {/* 4. PRS Broken */}
        <StatCard
          title="PRS Broken"
          value={String(displayPRs)}
          unit="records"
          icon={
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Trophy size={20} />
            </div>
          }
          subtitle="Double progression unlocked!"
          rightVisual={
            <ChevronRight size={18} className="text-neutral-400" />
          }
        />
      </div>

      {/* ── Bottom Section (2 Columns) ──────────────────────── */}
      <div className="grid grid-cols-1 min-[1280px]:grid-cols-12 gap-5 xl:gap-6 items-start min-w-0">
        {/* Left Column: Next Scheduled Workout */}
        <div className="min-w-0 min-[1280px]:col-span-7 space-y-3">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Calendar size={18} className="text-neutral-700 shrink-0" />
              <h2 className="font-heading font-bold text-base sm:text-lg text-neutral-900">
                Next Scheduled Workout
              </h2>
              {activeSplit && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {activeSplit.name}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => navigate('/splits')}
              className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              <CalendarDays size={13} />
              <span>Switch Split</span>
            </button>
          </div>

          {/* Workout Card */}
          <div className="bg-white rounded-2xl border border-[#E5E9E6] shadow-xs overflow-hidden">
            {/* Dark Forest Green Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#102B19] via-[#143520] to-[#1A4228] p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Dumbbell watermark */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                <Dumbbell size={64} className="rotate-12 text-white" />
              </div>

              <div className="relative z-10 space-y-1 min-w-0">
                <h3
                  className="font-heading font-black text-base sm:text-lg tracking-tight text-white truncate"
                  style={{ color: '#ffffff' }}
                >
                  {currentDayName}
                </h3>
              </div>

              <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-1 rounded-full bg-white/10 text-white/95 backdrop-blur-xs">
                  <Clock size={11} />
                  <span>60–75 min</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full bg-[#84CC16]/25 text-[#BEF264]">
                  {nextDay?.exercises.length || 5} Exercises
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full bg-[#22C55E]/25 text-[#86EFAC]">
                  Strength
                </span>
              </div>
            </div>

            {/* Exercise List */}
            <div className="p-3 sm:p-4 space-y-1">
              <div className="text-[11px] text-neutral-400 font-medium px-1 mb-1">
                Tip: Click any exercise below to inspect form, muscles & technique cues.
              </div>
              {displayExercises.map((ex, idx) => {
                const tags = getMuscleTags(ex.exerciseName);
                return (
                  <div
                    key={ex.id || idx}
                    onClick={() => handleExerciseClick(ex.exerciseName, ex.id)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all cursor-pointer group"
                    title="Click to preview exercise technique and target muscles"
                  >
                    {/* Number + Title + Muscle tags */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <span className="font-heading font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-emerald-700 truncate">
                          {ex.exerciseName}
                        </span>
                        <Eye size={12} className="opacity-0 group-hover:opacity-100 text-emerald-600 transition-opacity" />
                        <div className="hidden sm:flex items-center gap-1">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sets & Reps + Arrow */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-medium text-neutral-500 tabular-nums">
                        {ex.targetSets} sets × {ex.targetRepsMin}-{ex.targetRepsMax} reps
                      </span>
                      <ChevronRight size={14} className="text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}

              {/* + 1 more exercise link */}
              <button
                type="button"
                onClick={() => navigate('/workouts')}
                className="w-full text-center py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                + 1 more exercise
              </button>
            </div>

            {/* Start Button */}
            <div className="p-4 pt-1 border-t border-neutral-100">
              <button
                type="button"
                onClick={handleStartToday}
                className="w-full py-3.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-heading font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Play size={16} className="fill-white" />
                <span>Start Workout Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Nutrition + Quick Action Cards */}
        <div className="min-w-0 min-[1280px]:col-span-5 space-y-4">
          {/* Today's Nutrition & Goal Pace Card */}
          <div className="bg-white rounded-2xl border border-[#E5E9E6] p-5 shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <UtensilsCrossed size={16} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-neutral-900 leading-tight">
                    Today's Nutrition & Goal Pace
                  </h3>
                  <span className="text-xs text-neutral-500 block mt-0.5">
                    Calorie deficit/surplus compliance
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/nutrition')}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-[#16A34A] text-[#16A34A] hover:bg-emerald-50 text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                <span>Log Meals</span>
                <span>→</span>
              </button>
            </div>

            {/* Macro Ring Component with dynamic calories & pace */}
            <MacroRing
              currentCalories={currentCals}
              targetCalories={targetCals}
              protein={currentProtein}
              proteinTarget={targetProtein}
              carbs={currentCarbs}
              carbTarget={targetCarbs}
              fat={currentFat}
              fatTarget={targetFat}
              className="border-none p-0 bg-transparent"
            />

            {/* Quick Daily Hydration Tracker */}
            <div className="pt-3.5 border-t border-[#E8ECE9] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-neutral-800">
                  <span className="text-blue-500 text-sm">💧</span>
                  <span>Daily Hydration</span>
                </div>
                <span className="font-semibold text-neutral-500 tabular-nums">
                  {waterMl.toLocaleString()} / {waterGoalMl.toLocaleString()} ml ({Math.min(100, Math.round((waterMl / waterGoalMl) * 100))}%)
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 rounded-full bg-blue-50 overflow-hidden border border-blue-100">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (waterMl / waterGoalMl) * 100)}%` }}
                />
              </div>

              {/* Quick Add Buttons */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => addWater(250)}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  +250 ml
                </button>
                <button
                  type="button"
                  onClick={() => addWater(500)}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  +500 ml
                </button>
                {waterMl > 0 && (
                  <button
                    type="button"
                    onClick={resetWater}
                    className="ml-auto text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 4 Quick Action Cards */}
          <div className="grid grid-cols-2 min-[1450px]:grid-cols-4 gap-2.5 sm:gap-3">
            {/* 1. Build Program */}
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="text-left p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#F0F7FF] to-white border border-[#DBEAFE] hover:border-blue-400/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[110px]"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar size={17} />
              </div>
              <div className="mt-2.5">
                <span className="font-heading font-black text-xs sm:text-sm text-neutral-900 block leading-tight">
                  Build Program
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 group-hover:text-blue-600 transition-colors leading-tight block mt-0.5 truncate">
                  Custom plan &gt;
                </span>
              </div>
            </button>

            {/* 2. Meal Planner */}
            <button
              type="button"
              onClick={() => navigate('/nutrition')}
              className="text-left p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FFFBEB] to-white border border-[#FEF3C7] hover:border-amber-400/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[110px]"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <UtensilsCrossed size={17} />
              </div>
              <div className="mt-2.5">
                <span className="font-heading font-black text-xs sm:text-sm text-neutral-900 block leading-tight">
                  Meal Planner
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 group-hover:text-amber-700 transition-colors leading-tight block mt-0.5 truncate">
                  AI food ideas &gt;
                </span>
              </div>
            </button>

            {/* 3. Track Progress */}
            <button
              type="button"
              onClick={() => navigate('/progress')}
              className="text-left p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#F0FDF4] to-white border border-[#DCFCE7] hover:border-emerald-400/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[110px]"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <BarChart2 size={17} />
              </div>
              <div className="mt-2.5">
                <span className="font-heading font-black text-xs sm:text-sm text-neutral-900 block leading-tight">
                  Track Progress
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 group-hover:text-emerald-700 transition-colors leading-tight block mt-0.5 truncate">
                  Analytics &gt;
                </span>
              </div>
            </button>

            {/* 4. Ask Jimm AI */}
            <button
              type="button"
              onClick={() => setIsJimmOpen(true)}
              className="text-left p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FAF5FF] to-white border border-[#F3E8FF] hover:border-purple-400/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[110px]"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Bot size={17} />
              </div>
              <div className="mt-2.5">
                <span className="font-heading font-black text-xs sm:text-sm text-neutral-900 block leading-tight">
                  Ask Jimm AI
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 group-hover:text-purple-700 transition-colors leading-tight block mt-0.5 truncate">
                  AI coach &gt;
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Detail Modal on click */}
      <ExerciseDetailModal
        isOpen={!!selectedExerciseModal}
        exercise={selectedExerciseModal}
        onClose={() => setSelectedExerciseModal(null)}
      />

      {/* Program Wizard Modal */}
      <ProgramWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />

      {/* Ask Jimm Drawer */}
      <AskJimmDrawer isOpen={isJimmOpen} onClose={() => setIsJimmOpen(false)} />
    </div>
  );
}
