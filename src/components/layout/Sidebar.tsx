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
  Zap,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';
import { formatDurationCompact } from '../../lib/date-utils';
import jimmRobotImg from '../../assets/jimm_robot.jpg';
import alexAvatarImg from '../../assets/alex_vance.jpg';

interface SidebarProps {
  className?: string;
  onOpenJimm?: () => void;
  onOpenGoalPace?: () => void;
}

interface NavGroup {
  sectionTitle: string;
  items: {
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    sectionTitle: '',
    items: [
      { to: '/', label: 'Home', icon: Home },
      { to: '/workouts', label: 'Workouts', icon: Dumbbell },
      { to: '/nutrition', label: 'Food & Macros', icon: UtensilsCrossed },
      { to: '/community', label: 'Community Feed', icon: Users, badge: '24k', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
      { to: '/splits', label: 'Plan & Programs', icon: CalendarDays },
      { to: '/exercises', label: 'Exercise Library', icon: BookOpen },
      { to: '/progress', label: 'Progress & Stats', icon: BarChart2 },
    ],
  },
];

export function Sidebar({ className = '', onOpenJimm, onOpenGoalPace }: SidebarProps) {
  const { user } = useAuth();
  const { session, elapsedSeconds } = useActiveWorkout();
  const navigate = useNavigate();

  return (
    <aside
      className={`
        elite-sidebar w-[224px] min-w-[224px] max-w-[224px] bg-white/90 border-r border-[#E5E9E6]
        flex flex-col h-screen sticky top-0 shrink-0 z-20 select-none
        ${className}
      `}
    >
      {/* ── Brand Header ────────────────────────────────────────── */}
      <div className="h-16 px-5 flex items-center justify-between shrink-0 border-b border-[#E5E9E6]">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#15803D] flex items-center justify-center text-white font-extrabold shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all shrink-0">
            <Zap className="w-5 h-5 fill-white stroke-white shrink-0" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-black text-lg tracking-tight text-neutral-900 leading-none">
              ELITE<span className="text-[#16A34A]">ENGINE</span>
            </span>
            <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold mt-1">
              AI FITNESS COMPANION
            </span>
          </div>
        </NavLink>
      </div>

      {/* ── Main Navigation List (Scrollable) ───────────────────── */}
      <nav className="flex-1 px-2.5 py-3 overflow-y-auto space-y-3 min-h-0">
        {/* Active Workout Banner (Visible when session is running) */}
        {session && (
          <div
            onClick={() => navigate('/active-workout')}
            className="p-3 rounded-2xl bg-gradient-to-r from-[#123623] to-[#1A4B32] text-white shadow-xs border border-emerald-500/30 cursor-pointer hover:border-emerald-400/60 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
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
              <span className="text-emerald-300 text-xs font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                Resume →
              </span>
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        {NAV_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
            {group.sectionTitle && <div className="px-3 pt-1 pb-1 text-[10px] font-black uppercase tracking-widest text-neutral-400">{group.sectionTitle}</div>}
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 group cursor-pointer
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-[#EAF8EE] to-[#F3FAF5] text-[#15803D] font-bold border border-[#A7E2BE]/70 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-[#F3F6F4]'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4.5 h-4.5 min-w-[18px] min-h-[18px] shrink-0 transition-colors ${
                            isActive
                              ? 'text-[#16A34A]'
                              : 'text-neutral-400 group-hover:text-neutral-700'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {/* Pill Badge */}
                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 ${
                            item.badgeColor || 'bg-neutral-100 text-neutral-600 border-neutral-200'
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
        ))}

        {/* ── Ask Jimm AI Coach Card ────────────────────────────── */}
        <div className="pt-2">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#EAF8EE] via-[#E2F5E8] to-[#D8F1DF] border border-emerald-200/90 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-emerald-200 shadow-2xs shrink-0">
                <img
                  src={jimmRobotImg}
                  alt="Jimm AI Coach"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-xs text-neutral-900 truncate">
                    Ask Jimm AI
                  </span>
                  <Sparkles size={11} className="text-emerald-600 fill-emerald-600 shrink-0" />
                </div>
                <span className="text-[10px] text-neutral-600 leading-tight block mt-0.5 truncate">
                  24/7 AI Training & Diet Coach
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenJimm}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Chat with Jimm AI</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── User Profile & Settings Dock ───────────────────────── */}
      <div className="p-3 border-t border-[#E5E9E6] shrink-0 bg-white space-y-1">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F3F6F4] transition-colors">
          <div
            onClick={onOpenGoalPace}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
          >
            <div className="relative w-8 h-8 rounded-full border border-neutral-200 overflow-hidden shrink-0 shadow-2xs">
              <img
                src={alexAvatarImg}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-heading font-bold text-xs text-neutral-900 block truncate leading-tight">
                {user?.displayName || 'Alex Vance'}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block leading-tight flex items-center gap-1">
                <span>Pro Athlete</span>
                <span>•</span>
                <span className="text-neutral-500 font-medium">Hypertrophy</span>
              </span>
            </div>
          </div>

          {/* Quick Settings Icon */}
          <button
            type="button"
            onClick={onOpenGoalPace}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 transition-colors cursor-pointer"
            title="Profile & Nutrition Goals"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
