import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWorkout } from '../hooks/useWorkout';
import { useActiveWorkout } from '../hooks/useActiveWorkout';
import { useNutrition } from '../hooks/useNutrition';
import { useExercises } from '../hooks/useExercises';
import { ExerciseDetailModal } from '../components/workout/ExerciseDetailModal';
import type { Exercise } from '../types';
import { ProgramWizardModal } from '../components/wizard/ProgramWizardModal';
import { AskJimmDrawer } from '../components/ai/AskJimmDrawer';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { StatCardsGrid } from '../components/dashboard/StatCardsGrid';
import { WorkoutCard } from '../components/dashboard/WorkoutCard';
import { NutritionCard } from '../components/dashboard/NutritionCard';
import { QuickActionCards } from '../components/dashboard/QuickActionCards';
import { toast } from 'sonner';
import { getPastDates, getTodayString } from '../lib/date-utils';

const DEFAULT_EXERCISES = [
  { id: 'ex_1', exerciseName: 'Barbell Bench Press', tags: ['Chest', 'Triceps', 'Shoulders'], prescription: '4 sets × 6–8 reps' },
  { id: 'ex_2', exerciseName: 'Incline Dumbbell Press', tags: ['Chest', 'Shoulders'], prescription: '3 sets × 8–10 reps' },
  { id: 'ex_3', exerciseName: 'Overhead Press (Barbell)', tags: ['Shoulders', 'Triceps'], prescription: '3 sets × 6–8 reps' },
  { id: 'ex_4', exerciseName: 'Lateral Raise (Dumbbell)', tags: ['Shoulders'], prescription: '4 sets × 12–15 reps' },
  { id: 'ex_5', exerciseName: 'Tricep Pushdown (Cable)', tags: ['Triceps'], prescription: '3 sets × 10–12 reps' },
];

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

  // Workout metrics
  const completedSessions = sessions.filter((s) => s.status === 'completed');
  const loggedVolume = completedSessions.reduce((acc, s) => acc + (s.totalVolume || 0), 0);
  const displayVolume = loggedVolume.toLocaleString();
  const displayWorkouts = completedSessions.length;
  const allTimeSessions = completedSessions.length;
  const allPRs = completedSessions.flatMap((s) => s.personalRecords || []);
  const displayPRs = allPRs.length;

  // Nutrition Metrics
  const targetCals = goals?.calorieTarget || 2450;
  const currentCals = dailyTotals.calories;
  const targetProtein = goals?.proteinTarget || 175;
  const currentProtein = dailyTotals.protein;
  const targetCarbs = goals?.carbTarget || 260;
  const currentCarbs = dailyTotals.carbs;
  const targetFat = goals?.fatTarget || 65;
  const currentFat = dailyTotals.fat;

  const workoutDates = new Set(completedSessions.map((session) => {
    const date = session.completedAt || session.startedAt;
    return date.slice(0, 10);
  }));
  const recentDates = getPastDates(7);
  const streakDays = (() => {
    let count = 0;
    const today = getTodayString();
    const dateCursor = new Date(`${workoutDates.has(today) ? today : getPastDates(2)[0]}T12:00:00`);
    let date = `${dateCursor.getFullYear()}-${String(dateCursor.getMonth() + 1).padStart(2, '0')}-${String(dateCursor.getDate()).padStart(2, '0')}`;
    while (workoutDates.has(date)) {
      count += 1;
      dateCursor.setDate(dateCursor.getDate() - 1);
      date = `${dateCursor.getFullYear()}-${String(dateCursor.getMonth() + 1).padStart(2, '0')}-${String(dateCursor.getDate()).padStart(2, '0')}`;
    }
    return count;
  })();
  const daysOfWeek = recentDates.map((date) => ({
    label: new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'narrow' }),
    completed: workoutDates.has(date),
    text: String(Number(date.slice(-2))),
  }));

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

  return (
    <div className="elite-dashboard space-y-3.5 sm:space-y-4 animate-fade-in w-full pb-12">
      {/* ── C. Hero Banner (Modular with StreakCard and Flex Flow Cutout) ── */}
      <HeroBanner userName={user?.displayName || 'Athlete'} streakDays={streakDays} daysOfWeek={daysOfWeek} />

      {/* ── D. Four Statistic Cards (Modular Grid) ── */}
      <StatCardsGrid
        displayVolume={displayVolume}
        displayWorkouts={displayWorkouts}
        allTimeSessions={allTimeSessions}
        streakDays={streakDays}
        displayPRs={displayPRs}
      />

      {/* ── E & F. Main Content Grid (Two-Column on Laptop/Desktop) ── */}
      <div className="dashboard-primary-grid grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 items-start min-w-0">
        {/* Left Column: Next Scheduled Workout (~58% width: 7/12 cols) */}
        <div className="min-w-0 xl:col-span-7">
          <WorkoutCard
            exercises={DEFAULT_EXERCISES}
            dateString="Sunday, October 25"
            workoutTitle="Push Day (Chest, Shoulders & Triceps)"
            duration="~60–75 min"
            onExerciseClick={handleExerciseClick}
            onStartWorkout={handleStartToday}
            onViewMoreExercises={() => navigate('/workouts')}
          />
        </div>

        {/* Right Column: Nutrition + Quick Action Cards (~42% width: 5/12 cols) */}
        <div className="dashboard-right-column min-w-0 xl:col-span-5 space-y-3">
          <NutritionCard
            currentCalories={currentCals}
            targetCalories={targetCals}
            protein={currentProtein}
            proteinTarget={targetProtein}
            carbs={currentCarbs}
            carbTarget={targetCarbs}
            fat={currentFat}
            fatTarget={targetFat}
            onLogMeals={() => navigate('/nutrition')}
          />
          <QuickActionCards
            onBuildProgram={() => setIsWizardOpen(true)}
            onMealPlanner={() => navigate('/nutrition')}
            onTrackProgress={() => navigate('/progress')}
            onAskJimm={() => setIsJimmOpen(true)}
          />
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


