import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Dumbbell,
  UtensilsCrossed,
  Users,
  CalendarDays,
  BookOpen,
  BarChart2,
  Settings,
  HelpCircle,
  Zap,
  Sparkles,
  X,
  Play,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';
import { formatDurationCompact } from '../../lib/date-utils';
import jimmRobotImg from '../../assets/jimm_robot.jpg';
import alexAvatarImg from '../../assets/alex_vance.jpg';

interface SidebarProps {
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
  onOpenJimm?: () => void;
  onOpenGoalPace?: () => void;
  onOpenHelp?: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/nutrition', label: 'Food & Macros', icon: UtensilsCrossed },
  { to: '/community', label: 'Community', icon: Users, badge: '24k', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { to: '/splits', label: 'Plan & Programs', icon: CalendarDays },
  { to: '/exercises', label: 'Exercise Library', icon: BookOpen },
  { to: '/progress', label: 'Progress & Stats', icon: BarChart2 },
];

export function Sidebar({
  className = '',
  isMobile = false,
  onClose,
  onOpenJimm,
  onOpenGoalPace,
  onOpenHelp,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const { session, elapsedSeconds } = useActiveWorkout();
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside
      className={`
        elite-sidebar w-[285px] lg:w-[295px] xl:w-[305px] min-w-[285px] lg:min-w-[295px] xl:min-w-[305px] bg-white border-r border-[#E9E4F0]
        flex flex-col h-full sticky top-0 shrink-0 select-none z-20 overflow-hidden
        ${className}
      `}
    >
      {/* ── Brand Header ────────────────────────────────────────── */}
      <div className="h-[72px] px-6 flex items-center justify-between shrink-0 border-b border-[#E9E4F0]">
        <NavLink
          to="/"
          onClick={handleNavClick}
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          {/* VYQOR brand mark */}
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-extrabold shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <Zap className="w-5 h-5 fill-white stroke-white shrink-0" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-black text-lg tracking-tight text-[#101828] leading-none">
              VYQOR
            </span>
            <span className="text-[7px] text-[#667085] uppercase tracking-[0.11em] font-extrabold mt-1">
              VISION · YOUR QUEST · OVERCOME · RESULTS
            </span>
          </div>
        </NavLink>

        {/* Mobile close button */}
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-[#E9E4F0] flex items-center justify-center text-[#667085] hover:text-[#101828] hover:bg-neutral-50 transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ── Main Navigation List (Scrollable) ───────────────────── */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto space-y-2 min-h-0">
        {/* Active Workout Banner (Visible when session is running) */}
        {session && (
          <div
            onClick={() => {
              navigate('/active-workout');
              handleNavClick();
            }}
            className="p-3.5 mb-3 rounded-2xl bg-gradient-to-r from-[#5B21B6] to-[#4C1D95] text-white shadow-xs border border-violet-400/40 cursor-pointer hover:border-violet-300 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-violet-300">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
                <span>Active Workout</span>
              </span>
              <span className="font-mono text-xs font-bold text-white tabular-nums bg-white/10 px-2 py-0.5 rounded-md">
                {formatDurationCompact(elapsedSeconds)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading font-bold text-xs truncate text-white">
                {session.dayName || 'Active Session'}
              </span>
              <span className="text-violet-300 text-xs font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                <Play size={10} className="fill-violet-300 mr-1" /> Resume →
              </span>
            </div>
          </div>
        )}

        {/* Primary Navigation Items with Generous Padding & Gaps */}
        <div className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={handleNavClick}
                className={({ isActive }) => `
                  flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-150 group cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#F3E8FF] text-[#7C3AED] font-bold shadow-2xs'
                      : 'text-[#667085] hover:text-[#101828] hover:bg-[#FBFAFD]'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Icon
                        size={18}
                        className={`min-w-[18px] min-h-[18px] shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#7C3AED]'
                            : 'text-[#667085] group-hover:text-[#101828]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 ${
                          item.badgeColor || 'bg-neutral-100 text-[#667085] border-[#E9E4F0]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* ── Visual Section Divider ────────────────────────────── */}
        <div className="my-3.5 border-t border-[#E9E4F0]/80" />

        {/* ── Ask Jimm AI Coach Card ────────────────────────────── */}
        <div>
          <div className="p-4 rounded-2xl bg-[#F3E8FF] border border-[#DDD6FE] shadow-2xs space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="relative w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-violet-200 shadow-2xs shrink-0">
                <img
                  src={jimmRobotImg}
                  alt="Jimm AI Coach"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#7C3AED] border-2 border-white"></span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-xs text-[#101828] truncate">
                    Ask Jimm AI
                  </span>
                  <Sparkles size={11} className="text-[#7C3AED] fill-[#7C3AED] shrink-0" />
                </div>
                <span className="text-[10px] text-[#667085] leading-tight block mt-0.5 truncate">
                  Get personalized workout plans, diet tips and more.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenJimm) onOpenJimm();
                handleNavClick();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Chat with Jimm AI →</span>
            </button>
          </div>
        </div>

        {/* ── Visual Section Divider ────────────────────────────── */}
        <div className="my-3 border-t border-[#E9E4F0]/80" />

        {/* ── Settings & Help Links ──────────────────────────────── */}
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => {
              if (onOpenGoalPace) onOpenGoalPace();
              handleNavClick();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-[#667085] hover:text-[#101828] hover:bg-[#FBFAFD] transition-colors cursor-pointer text-left"
          >
            <Settings size={18} className="text-[#667085] shrink-0" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenHelp) onOpenHelp();
              handleNavClick();
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-[#667085] hover:text-[#101828] hover:bg-[#FBFAFD] transition-colors cursor-pointer text-left"
          >
            <HelpCircle size={18} className="text-[#667085] shrink-0" />
            <span>Help & Support</span>
          </button>
        </div>
      </nav>

      {/* ── User Profile & Pro Athlete Dock ────────────────────── */}
      <div className="p-3.5 border-t border-[#E9E4F0] shrink-0 bg-white">
        <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => {
            if (onOpenGoalPace) onOpenGoalPace();
            handleNavClick();
          }}
          className="flex min-w-0 flex-1 items-center gap-3.5 p-2 rounded-xl hover:bg-[#FBFAFD] transition-colors cursor-pointer text-left"
        >
          <div className="relative w-9 h-9 rounded-full border border-[#E9E4F0] overflow-hidden shrink-0 shadow-2xs">
            <img
              src={alexAvatarImg}
              alt={user?.displayName || user?.name || 'VYQOR athlete'}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#7C3AED] border-2 border-white"></span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-heading font-bold text-xs text-[#101828] block truncate leading-tight">
              {user?.displayName || 'Alex Vance'}
            </span>
            <span className="text-[10px] text-[#7C3AED] font-bold block leading-tight flex items-center gap-1 mt-0.5">
              <span>Pro Athlete</span>
              <span className="text-[#667085]">•</span>
              <span className="text-[#667085] font-medium">Hypertrophy</span>
            </span>
          </div>
          <Settings size={15} className="text-[#667085] hover:text-[#101828] shrink-0" />
        </button>
        <button
          type="button"
          aria-label="Sign out"
          title="Sign out"
          onClick={async () => {
            await logout();
            navigate('/auth', { replace: true });
            handleNavClick();
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#777184] transition hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut size={16} />
        </button>
        </div>
      </div>
    </aside>
  );
}
