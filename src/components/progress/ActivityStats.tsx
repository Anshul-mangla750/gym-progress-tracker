import { useMemo, useState } from 'react';
import { eachDayOfInterval, format, parseISO, startOfMonth, startOfWeek } from 'date-fns';
import { CalendarDays, Dumbbell, Flame, Utensils } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MealLog, WeightUnit, WorkoutSession } from '../../types';

interface ActivityStatsProps {
  sessions: WorkoutSession[];
  meals: MealLog[];
  unit: WeightUnit;
}

type Period = 'week' | 'month';

export function ActivityStats({ sessions, meals, unit }: ActivityStatsProps) {
  const [period, setPeriod] = useState<Period>('week');

  const stats = useMemo(() => {
    const today = new Date();
    const start = period === 'week' ? startOfWeek(today, { weekStartsOn: 1 }) : startOfMonth(today);
    const days = eachDayOfInterval({ start, end: today });
    const keyOf = (date: Date) => format(date, 'yyyy-MM-dd');
    const startKey = keyOf(start);
    const todayKey = keyOf(today);
    const completedSessions = sessions.filter((session) => {
      if (session.status !== 'completed') return false;
      const sessionDay = keyOf(parseISO(session.completedAt || session.startedAt));
      return sessionDay >= startKey && sessionDay <= todayKey;
    });
    const periodMeals = meals.filter((meal) => meal.date >= startKey && meal.date <= todayKey);

    const daily = days.map((day) => ({
      date: keyOf(day),
      label: period === 'week' ? format(day, 'EEE') : format(day, 'd'),
      workouts: 0,
      meals: 0,
      calories: 0,
    }));

    completedSessions.forEach((session) => {
      const date = keyOf(parseISO(session.completedAt || session.startedAt));
      const day = daily.find((item) => item.date === date);
      if (day) day.workouts += 1;
    });

    periodMeals.forEach((meal) => {
      const day = daily.find((item) => item.date === meal.date);
      if (day) {
        day.meals += 1;
        day.calories += meal.totalCalories;
      }
    });

    const chartData = period === 'week'
      ? daily
      : daily.reduce<Array<{ label: string; workouts: number; meals: number }>>((weeks, day) => {
          const weekIndex = Math.floor((Number(day.date.slice(-2)) - 1) / 7);
          const label = `Week ${weekIndex + 1}`;
          const bucket = weeks.find((week) => week.label === label);
          if (bucket) {
            bucket.workouts += day.workouts;
            bucket.meals += day.meals;
          } else {
            weeks.push({ label, workouts: day.workouts, meals: day.meals });
          }
          return weeks;
        }, []);

    const mealDays = daily.filter((day) => day.meals > 0).length;
    const activeDays = daily.filter((day) => day.meals > 0 || day.workouts > 0).length;
    const calories = periodMeals.reduce((total, meal) => total + meal.totalCalories, 0);

    return {
      chartData,
      workoutCount: completedSessions.length,
      volume: completedSessions.reduce((total, session) => total + (session.totalVolume || 0), 0),
      mealCount: periodMeals.length,
      activeDays,
      dayCount: daily.length,
      averageCalories: mealDays ? Math.round(calories / mealDays) : 0,
    };
  }, [meals, period, sessions]);

  const periodStart = period === 'week' ? startOfWeek(new Date(), { weekStartsOn: 1 }) : startOfMonth(new Date());
  const periodLabel = period === 'week'
    ? `${format(periodStart, 'MMM d')} – ${format(new Date(), 'MMM d')}`
    : `${format(new Date(), 'MMMM')} · month to date`;

  const cards = [
    { label: 'Workouts', value: stats.workoutCount, detail: `${stats.volume.toLocaleString()} ${unit} total volume`, icon: Dumbbell, color: 'text-violet-700 bg-violet-50' },
    { label: 'Meals logged', value: stats.mealCount, detail: 'meal entries recorded', icon: Utensils, color: 'text-amber-700 bg-amber-50' },
    { label: 'Active days', value: `${stats.activeDays}/${stats.dayCount}`, detail: 'days with a workout or meal', icon: CalendarDays, color: 'text-sky-700 bg-sky-50' },
    { label: 'Avg calories', value: stats.averageCalories.toLocaleString(), detail: 'kcal per day with meals', icon: Flame, color: 'text-rose-700 bg-rose-50' },
  ];

  return (
    <section className="rounded-2xl border border-[#E9E4F0] bg-white p-4 shadow-xs sm:p-5 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-700">Training & nutrition</p>
          <h2 className="mt-1 font-heading text-lg font-bold text-[#101828] sm:text-xl">Activity summary</h2>
          <p className="mt-0.5 text-xs text-[#667085]">{periodLabel} · logged workouts and meals</p>
        </div>
        <div className="inline-flex w-fit rounded-xl border border-[#E9E4F0] bg-[#FBFAFD] p-1" role="tablist" aria-label="Activity summary period">
          {(['week', 'month'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={period === value}
              onClick={() => setPeriod(value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${period === value ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#667085] hover:text-[#101828]'}`}
            >
              This {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {cards.map(({ label, value, detail, icon: Icon, color }) => (
          <div key={label} className="min-w-0 rounded-xl border border-[#EEEAF3] bg-[#FDFCFE] p-3 sm:p-3.5">
            <div className="flex items-center gap-2">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
                <Icon size={15} />
              </span>
              <span className="truncate text-xs font-medium text-[#667085]">{label}</span>
            </div>
            <p className="mt-2 truncate font-heading text-xl font-extrabold tabular-nums text-[#101828]">{value}</p>
            <p className="mt-0.5 truncate text-[10px] text-[#667085] sm:text-[11px]">{detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold text-[#475467]">Workouts and meals logged</p>
        <div className="h-48 w-full sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEEAF3" vertical={false} />
              <XAxis dataKey="label" stroke="#8A8494" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} stroke="#8A8494" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: '#F7F3FC' }}
                contentStyle={{ borderRadius: 12, borderColor: '#E9E4F0', fontSize: 12 }}
              />
              <Bar dataKey="workouts" name="Workouts" fill="#7C3AED" radius={[5, 5, 0, 0]} maxBarSize={26} />
              <Bar dataKey="meals" name="Meals" fill="#F5C542" radius={[5, 5, 0, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1 text-[10px] text-[#8A8494]">Calories average uses days with at least one meal log.</p>
      </div>
    </section>
  );
}
