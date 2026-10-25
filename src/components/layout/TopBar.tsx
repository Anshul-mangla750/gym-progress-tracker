import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Crown,
  Flame,
  ChevronDown,
  Play,
  Dumbbell,
  CalendarDays,
  UtensilsCrossed,
  BarChart2,
  X,
  Zap,
} from 'lucide-react';
import alexAvatarImg from '../../assets/alex_vance.jpg';
import { useAuth } from '../../hooks/useAuth';

interface TopBarProps {
  activeSessionName?: string;
  onOpenActiveSession?: () => void;
  onOpenJimm?: () => void;
  onOpenGoalPace: () => void;
  onOpenInstallModal: () => void;
  onToggleMobileMenu?: () => void;
}

const SEARCH_ITEMS = [
  // Splits
  { title: 'Push / Pull / Legs (PPL)', subtitle: '6-day hypertrophy routine', path: '/splits', category: 'Split', icon: CalendarDays },
  { title: 'Arnold Golden Era Split', subtitle: 'Chest/Back, Shoulders/Arms, Legs', path: '/splits', category: 'Split', icon: CalendarDays },
  { title: 'Upper / Lower Split', subtitle: '4-day balanced power split', path: '/splits', category: 'Split', icon: CalendarDays },
  { title: 'Classic Bodybuilding Bro Split', subtitle: '5-day single muscle group focus', path: '/splits', category: 'Split', icon: CalendarDays },
  { title: 'Full Body 3-Day Routine', subtitle: '3-day foundational frequency', path: '/splits', category: 'Split', icon: CalendarDays },
  { title: 'Powerbuilding 5x5 + Hypertrophy', subtitle: 'Heavy compound strength', path: '/splits', category: 'Split', icon: CalendarDays },
  { title: 'Calisthenics & Bodyweight Mastery', subtitle: 'Gymnastic pulls & push-ups', path: '/splits', category: 'Split', icon: CalendarDays },
  { title: 'V-Taper Aesthetic Split', subtitle: 'Lats, side delts, upper chest', path: '/splits', category: 'Split', icon: CalendarDays },

  // Exercises
  { title: 'Barbell Bench Press', subtitle: 'Chest compound builder', path: '/exercises', category: 'Exercise', icon: Dumbbell },
  { title: 'Barbell Back Squat', subtitle: 'Quad & glute foundation', path: '/exercises', category: 'Exercise', icon: Dumbbell },
  { title: 'Barbell Deadlift', subtitle: 'Posterior chain builder', path: '/exercises', category: 'Exercise', icon: Dumbbell },
  { title: 'Overhead Press (Barbell)', subtitle: 'Anterior & side delt strength', path: '/exercises', category: 'Exercise', icon: Dumbbell },
  { title: 'Incline Dumbbell Press', subtitle: 'Upper pectoral targeting', path: '/exercises', category: 'Exercise', icon: Dumbbell },
  { title: 'Lat Pulldown / Pull-Up', subtitle: 'Back width and taper', path: '/exercises', category: 'Exercise', icon: Dumbbell },

  // Features
  { title: 'Food & Macro Tracker', subtitle: 'Log calories, protein, carbs & fat', path: '/nutrition', category: 'Nutrition', icon: UtensilsCrossed },
  { title: 'Progress & Volume Analytics', subtitle: 'Track lifts, body weight & PRs', path: '/progress', category: 'Progress', icon: BarChart2 },
  { title: 'Community Feed', subtitle: 'Workout logs, leaderboards & discussions', path: '/community', category: 'Community', icon: Zap },
];

export function TopBar({
  activeSessionName,
  onOpenActiveSession,
  onOpenGoalPace,
  onOpenInstallModal,
  onToggleMobileMenu,
}: TopBarProps) {
  const [search, setSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = search.trim().length >= 2
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSelectResult = (path: string) => {
    navigate(path);
    setSearch('');
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    } else if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        handleSelectResult(searchResults[0].path);
      } else if (search.trim()) {
        navigate('/exercises');
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <header className="elite-topbar border-b border-[#E9E4F0] bg-white sticky top-0 z-30 px-3 sm:px-6 shrink-0">
      <div className="h-[72px] flex items-center justify-between gap-3 sm:gap-4">
        {/* Left side: Mobile Hamburger menu button + Logo (on mobile) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Hamburger toggle button for phone / tablet drawer */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden w-10 h-10 rounded-xl border border-[#E9E4F0] bg-white hover:bg-neutral-50 flex items-center justify-center text-[#101828] transition-colors cursor-pointer"
            aria-label="Open sidebar menu"
          >
            <Menu size={20} />
          </button>

          {/* Mobile Brand Logo */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-black shadow-xs shrink-0">
              <Zap size={16} className="fill-white stroke-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-sm text-[#101828] tracking-tight leading-none">
                VYQOR
              </span>
              <span className="text-[7.5px] uppercase tracking-widest text-[#667085] font-bold mt-0.5">
                Fitness
              </span>
            </div>
          </div>
        </div>

        {/* Global Search Pill Input (Desktop/Laptop) */}
        <div ref={dropdownRef} className="w-80 md:w-96 lg:w-[420px] hidden lg:block relative">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-[#667085] pointer-events-none" />
            <input
              type="text"
              placeholder="Search workouts, exercises, foods..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (search.trim().length >= 2) setIsDropdownOpen(true);
              }}
              onKeyDown={handleKeyDown}
              style={{ paddingLeft: '2.5rem', paddingRight: search ? '2rem' : '4.5rem' }}
              className="w-full h-11 rounded-xl bg-[#FBFAFD] border border-[#E9E4F0] text-xs sm:text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-violet-500/15 transition-all"
            />
            {search ? (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setIsDropdownOpen(false);
                }}
                className="absolute right-3 text-[#667085] hover:text-[#101828] cursor-pointer"
              >
                <X size={14} />
              </button>
            ) : (
              <div className="absolute right-3 hidden xl:flex items-center pointer-events-none">
                <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-[#E9E4F0] text-[10px] text-[#667085] font-mono shadow-2xs">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>

          {/* Search Results Dropdown (Desktop) */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute top-13 left-0 right-0 bg-white rounded-2xl border border-[#E9E4F0] shadow-xl p-2 z-50 animate-fade-in space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                Matching Results ({searchResults.length})
              </div>
              {searchResults.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectResult(item.path)}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F3E8FF] transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-violet-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-heading font-bold text-xs sm:text-sm text-[#101828] group-hover:text-[#7C3AED] block truncate">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[#667085] block truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-[#667085] shrink-0">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile search toggle button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="lg:hidden w-9 h-9 rounded-xl border border-[#E9E4F0] bg-white hover:bg-neutral-50 flex items-center justify-center text-[#667085] transition-colors cursor-pointer"
            title="Search"
          >
            <Search size={16} />
          </button>

          {/* Active Workout Indicator (if active) */}
          {activeSessionName && (
            <button
              type="button"
              onClick={onOpenActiveSession}
              className="topbar-active-session flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#F3E8FF] border border-violet-200 text-[#5B21B6] text-[11px] sm:text-xs font-bold hover:bg-violet-100 transition-all cursor-pointer max-w-[120px] xs:max-w-[150px] sm:max-w-none truncate"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 animate-ping"></span>
              <Play size={10} className="fill-[#7C3AED] text-[#7C3AED] shrink-0" />
              <span className="hidden sm:inline">Active:</span> <span className="truncate">{activeSessionName}</span>
            </button>
          )}

          {/* Upgrade to Pro Button with Crown Icon */}
          <button
            type="button"
            onClick={onOpenInstallModal}
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E9E4F0] bg-white hover:bg-[#FBFAFD] text-xs font-semibold text-[#101828] transition-colors cursor-pointer shadow-2xs"
          >
            <Crown size={15} className="text-[#FF7A00] fill-[#FF7A00]" />
            <span>Upgrade to Pro</span>
          </button>

          {/* Streak Indicator with Fire Icon (orange accent) */}
          <div className="topbar-streak-indicator flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-[#FFF4E6] border border-[#FFDEC2] text-xs font-bold text-[#101828]">
            <Flame size={15} className="text-[#FF7A00] fill-[#FF7A00] shrink-0" />
            <span className="tabular-nums">4</span>
            <span className="text-[11px] text-[#667085] hidden xl:inline font-medium">Streak</span>
          </div>

          {/* Notification Bell */}
          <button
            type="button"
            onClick={onOpenInstallModal}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E9E4F0] bg-white hover:bg-neutral-50 flex items-center justify-center text-[#667085] transition-colors cursor-pointer shadow-2xs relative"
            title="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7C3AED] ring-2 ring-white"></span>
          </button>

          {/* User Profile Avatar with Name & Dropdown */}
          <button
            type="button"
            onClick={onOpenGoalPace}
            className="topbar-profile-button flex items-center gap-2 pl-1 pr-1.5 sm:pr-2.5 py-1 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-[#E9E4F0] overflow-hidden shrink-0 shadow-2xs">
              <img
                src={alexAvatarImg}
                alt={user?.displayName || user?.name || 'VYQOR athlete'}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:inline font-semibold text-xs sm:text-[13px] text-[#101828]">{user?.displayName || user?.name || 'Athlete'}</span>
            <ChevronDown size={14} className="text-[#667085] hidden sm:inline" />
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="lg:hidden pb-3 pt-1 border-t border-[#E9E4F0] animate-slide-down">
          <div className="relative flex items-center">
            <Search size={15} className="absolute left-3 text-[#667085] pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Search workouts, splits, exercises..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsDropdownOpen(true);
              }}
              onKeyDown={handleKeyDown}
              style={{ paddingLeft: '2.25rem', paddingRight: '2rem' }}
              className="w-full h-10 rounded-xl bg-[#FBFAFD] border border-[#E9E4F0] text-xs text-[#101828] placeholder:text-[#667085] focus:outline-none focus:border-[#7C3AED]"
            />
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen(false);
                setSearch('');
              }}
              className="absolute right-2.5 text-[#667085] hover:text-[#101828]"
            >
              <X size={14} />
            </button>
          </div>

          {/* Mobile Search Results */}
          {search.trim().length >= 2 && searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-xl border border-[#E9E4F0] shadow-lg p-1.5 space-y-1">
              {searchResults.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      handleSelectResult(item.path);
                      setIsMobileSearchOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#F3E8FF] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-violet-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                        <Icon size={12} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-[#101828] block truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#667085] block truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-[#667085] shrink-0">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
