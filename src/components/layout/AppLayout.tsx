import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { AskJimmDrawer } from '../ai/AskJimmDrawer';
import { GoalPaceModal } from '../profile/GoalPaceModal';
import { AddToHomeScreenModal } from '../pwa/AddToHomeScreenModal';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';
import { formatDuration } from '../../lib/date-utils';
import { ChevronRight, Dumbbell } from 'lucide-react';

export function AppLayout() {
  const { session, elapsedSeconds } = useActiveWorkout();
  const navigate = useNavigate();
  const location = useLocation();

  const [isJimmOpen, setIsJimmOpen] = useState(false);
  const [isGoalPaceOpen, setIsGoalPaceOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);

  const isWorkoutPage = location.pathname === '/active-workout';

  return (
    <div className="elite-app-shell min-h-screen bg-[#F3F6F4] text-neutral-900 flex">
      {/* Desktop Sidebar */}
      <Sidebar
        className="hidden md:flex"
        onOpenJimm={() => setIsJimmOpen(true)}
        onOpenGoalPace={() => setIsGoalPaceOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <TopBar
          activeSessionName={session ? session.dayName || session.splitName || 'Workout' : undefined}
          onOpenActiveSession={() => navigate('/active-workout')}
          onOpenJimm={() => setIsJimmOpen(true)}
          onOpenGoalPace={() => setIsGoalPaceOpen(true)}
          onOpenInstallModal={() => setIsInstallOpen(true)}
        />

        <main className="elite-main flex-1 px-3 sm:px-5 md:px-6 py-4 sm:py-6 w-full max-w-[1360px] mx-auto pb-24 md:pb-12 min-w-0">
          <Outlet />
        </main>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>

      {/* Persistent Floating Live Workout Widget (Visible on any screen except /active-workout) */}
      {session && !isWorkoutPage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-8 z-40 bg-gradient-to-r from-[#123623] to-[#1C4D34] text-white px-4 sm:px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3 sm:gap-4 animate-slide-up">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xs sm:text-sm text-white leading-tight flex items-center gap-1.5">
                <Dumbbell size={13} className="text-emerald-400" />
                <span>{session.dayName || 'Workout in Progress'}</span>
              </span>
              <span className="text-[11px] text-emerald-300 font-mono tabular-nums font-semibold mt-0.5">
                Elapsed: {formatDuration(elapsedSeconds)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/active-workout')}
            className="px-3.5 py-1.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-1 cursor-pointer shrink-0 ml-1"
          >
            <span>Resume</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Jimm AI Coach Drawer */}
      <AskJimmDrawer isOpen={isJimmOpen} onClose={() => setIsJimmOpen(false)} />

      {/* Goal Pace & Profile Modal */}
      <GoalPaceModal isOpen={isGoalPaceOpen} onClose={() => setIsGoalPaceOpen(false)} />

      {/* Add To Home Screen PWA Modal */}
      <AddToHomeScreenModal isOpen={isInstallOpen} onClose={() => setIsInstallOpen(false)} />
    </div>
  );
}
