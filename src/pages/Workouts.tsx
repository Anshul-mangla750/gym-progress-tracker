import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../hooks/useWorkout';
import { useActiveWorkout } from '../hooks/useActiveWorkout';
import { useAuth } from '../hooks/useAuth';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import {
  Play,
  Calendar,
  Clock,
  Dumbbell,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { formatDate, formatDuration } from '../lib/date-utils';

import type { WorkoutDay } from '../types';

export function Workouts() {
  const { activeSplit, sessions } = useWorkout();
  const { session: activeSession, startWorkout, startEmptyWorkout } = useActiveWorkout();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'program' | 'history'>('program');
  const unit = user?.unitPreference || 'kg';

  const completedSessions = sessions.filter((s) => s.status === 'completed');

  const handleStartDay = (day: WorkoutDay) => {
    if (activeSession) {
      navigate('/active-workout');
      return;
    }
    if (activeSplit) {
      startWorkout(day, activeSplit.name, activeSplit.id);
      navigate('/active-workout');
    }
  };

  const handleStartFreestyle = () => {
    if (activeSession) {
      navigate('/active-workout');
      return;
    }
    startEmptyWorkout('Freestyle Session');
    navigate('/active-workout');
  };

  return (
    <div className="workouts-page space-y-6 animate-fade-in">
      <PageHeader
        title="Workouts"
        subtitle="Execute your structured training splits or record freestyle sessions"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<Plus size={14} />}
              onClick={handleStartFreestyle}
            >
              <span className="hidden xs:inline">Freestyle Session</span>
              <span className="xs:hidden">Freestyle</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Calendar size={14} />}
              onClick={() => navigate('/splits')}
            >
              <span className="hidden xs:inline">Split Planner</span>
              <span className="xs:hidden">Splits</span>
            </Button>
          </div>
        }
      />

      <Tabs
        tabs={[
          { id: 'program', label: 'Active Program Days', badge: activeSplit?.days.length },
          { id: 'history', label: 'Workout History', badge: completedSessions.length },
        ]}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as 'program' | 'history')}
      />

      {activeTab === 'program' ? (
        <div className="space-y-6">
          {/* Active Split Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-bg-card rounded-2xl border border-border-default">
            <div>
              <span className="text-xs uppercase font-bold text-accent-primary tracking-wider">
                Current Active Split
              </span>
              <h2 className="font-heading font-extrabold text-xl text-text-primary mt-0.5">
                {activeSplit?.name || 'No program selected'}
              </h2>
              {activeSplit?.description && (
                <p className="text-xs text-text-muted mt-1 max-w-xl">
                  {activeSplit.description}
                </p>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/splits')}
              className="self-start sm:self-auto"
            >
              Change Split
            </Button>
          </div>

          {/* Days Grid */}
          <div className="workout-days-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {activeSplit?.days.map((day, idx) => (
              <div
                key={day.id}
                className="workout-day-card bg-white rounded-3xl p-6 border border-[#E9E4F0] shadow-xs hover:shadow-md hover:border-violet-300/80 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#E9E4F0] mb-3.5">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#F3E8FF] text-[#5B21B6] border border-[#BDE7CD]">
                      Day {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-neutral-500">
                      {day.exercises.length} Exercises
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-neutral-900 mb-3 tracking-tight">
                    {day.name}
                  </h3>

                  <div className="space-y-2 mb-5">
                    {day.exercises.slice(0, 5).map((ex, exIdx) => (
                      <div
                        key={ex.id || exIdx}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FBFAFD] text-xs"
                      >
                        <span className="font-semibold text-neutral-800 line-clamp-1">{ex.exerciseName}</span>
                        <span className="text-neutral-500 font-bold tabular-nums shrink-0 ml-2 bg-white px-2 py-0.5 rounded-md border border-[#E9E4F0]">
                          {ex.targetSets} sets
                        </span>
                      </div>
                    ))}
                    {day.exercises.length > 5 && (
                      <span className="text-[11px] text-neutral-400 font-semibold block pt-1 text-center">
                        + {day.exercises.length - 5} more exercises
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E9E4F0]">
                  <button
                    type="button"
                    onClick={() => handleStartDay(day)}
                    className="w-full py-3 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <Play size={14} className="fill-white" />
                    <span>Start Workout</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="space-y-3">
          {completedSessions.length === 0 ? (
            <div className="py-12 text-center text-xs text-text-muted border border-dashed border-border-default rounded-2xl">
              No completed sessions yet. Start a workout to build your training history!
            </div>
          ) : (
            completedSessions.map((sess) => (
              <Card key={sess.id} padding="md" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-text-muted">
                      {formatDate(sess.startedAt, 'MMM d, yyyy')}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border-default"></span>
                    <span className="text-xs text-accent-primary font-medium">
                      {sess.splitName || 'Workout'}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-text-primary">
                    {sess.dayName || 'Workout Session'}
                  </h3>

                  {sess.sessionNotes && (
                    <p className="text-xs text-text-muted mt-1 italic">
                      "{sess.sessionNotes}"
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6 shrink-0 text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E9E4F0]">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Clock size={14} className="text-text-muted" />
                    <span className="tabular-nums font-medium">
                      {formatDuration(sess.durationSeconds || 0)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Dumbbell size={14} className="text-accent-primary" />
                    <span className="font-bold tabular-nums text-text-primary">
                      {sess.totalVolume?.toLocaleString()} {unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <CheckCircle2 size={14} className="text-accent-secondary" />
                    <span className="tabular-nums">
                      {sess.totalSets} sets
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
