import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { AskJimmDrawer } from '../ai/AskJimmDrawer';
import { GoalPaceModal } from '../profile/GoalPaceModal';
import { AddToHomeScreenModal } from '../pwa/AddToHomeScreenModal';
import { HelpModal } from '../ui/HelpModal';
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
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isWorkoutPage = location.pathname === '/active-workout';

  return (
    <div className="elite-app-shell min-h-screen bg-[#F8F7FB] text-[#101828] flex">
      {/* Desktop Fixed Left Sidebar */}
      <Sidebar
        className="hidden lg:flex"
        onOpenJimm={() => setIsJimmOpen(true)}
        onOpenGoalPace={() => setIsGoalPaceOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Mobile Drawer (Slide-out Sidebar for phone & tablet) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fade-in" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer Panel */}
          <div className="relative z-10 w-[290px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col animate-slide-up">
            <Sidebar
              isMobile
              onClose={() => setIsMobileMenuOpen(false)}
              onOpenJimm={() => {
                setIsMobileMenuOpen(false);
                setIsJimmOpen(true);
              }}
              onOpenGoalPace={() => {
                setIsMobileMenuOpen(false);
                setIsGoalPaceOpen(true);
              }}
              onOpenHelp={() => {
                setIsMobileMenuOpen(false);
                setIsHelpOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <TopBar
          activeSessionName={session ? session.dayName || session.splitName || 'Workout' : undefined}
          onOpenActiveSession={() => navigate('/active-workout')}
          onOpenJimm={() => setIsJimmOpen(true)}
          onOpenGoalPace={() => setIsGoalPaceOpen(true)}
          onOpenInstallModal={() => setIsInstallOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="elite-main flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 w-full max-w-[1360px] mx-auto pb-24 lg:pb-12 min-w-0">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>

      {/* Persistent Floating Live Workout Widget */}
      {session && !isWorkoutPage && (
        <div className="active-workout-floating-widget fixed bottom-20 md:bottom-6 right-4 md:right-8 z-40 bg-gradient-to-r from-[#5B21B6] to-[#4C1D95] text-white px-4 sm:px-5 py-3 rounded-2xl shadow-xl border border-violet-400/40 flex items-center gap-3 sm:gap-4 animate-slide-up">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-400"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xs sm:text-sm text-white leading-tight flex items-center gap-1.5">
                <Dumbbell size={13} className="text-violet-300" />
                <span>{session.dayName || 'Workout in Progress'}</span>
              </span>
              <span className="text-[11px] text-violet-200 font-mono tabular-nums font-semibold mt-0.5">
                Elapsed: {formatDuration(elapsedSeconds)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/active-workout')}
            className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer shrink-0 ml-1"
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

      {/* Help & Support Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Add To Home Screen PWA Modal */}
      <AddToHomeScreenModal isOpen={isInstallOpen} onClose={() => setIsInstallOpen(false)} />
    </div>
  );
}
