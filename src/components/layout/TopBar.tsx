import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Search, Bell, Crown, Flame, ChevronDown, Play, Dumbbell, CalendarDays, UtensilsCrossed, BarChart2, X } from 'lucide-react';
import alexAvatarImg from '../../assets/alex_vance.jpg';

interface TopBarProps {
  activeSessionName?: string;
  onOpenActiveSession?: () => void;
  onOpenJimm: () => void;
  onOpenGoalPace: () => void;
  onOpenInstallModal: () => void;
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
}: TopBarProps) {
  const [search, setSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="elite-topbar border-b border-[#E5E9E6] bg-white sticky top-0 z-30 px-3 sm:px-6 shrink-0">
      <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile Brand Logo */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#16A34A] flex items-center justify-center text-white font-black shadow-xs shrink-0">
            <Zap size={18} className="fill-white stroke-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-sm sm:text-base text-neutral-900 tracking-tight leading-none">
              ELITE<span className="text-[#16A34A]">ENGINE</span>
            </span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-widest text-neutral-400 font-bold mt-0.5">
              AI Fitness
            </span>
          </div>
        </div>

        {/* Global Search Pill Input (Desktop) */}
        <div ref={dropdownRef} className="w-80 md:w-96 hidden md:block relative">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-neutral-400 pointer-events-none" />
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
              style={{ paddingLeft: '2.5rem', paddingRight: search ? '2rem' : '1rem' }}
              className="w-full h-10 rounded-xl bg-[#F8FAF9] border border-[#E5E9E6] text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-emerald-500/15 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setIsDropdownOpen(false);
                }}
                className="absolute right-3 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown (Desktop) */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl border border-[#E2E8E4] shadow-xl p-2 z-50 animate-fade-in space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Matching Results ({searchResults.length})
              </div>
              {searchResults.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectResult(item.path)}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F3F8F5] transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-heading font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-emerald-700 block truncate">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-neutral-500 block truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 shrink-0">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile search toggle button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden w-8 h-8 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
            title="Search"
          >
            <Search size={15} />
          </button>

          {activeSessionName && (
            <button
              type="button"
              onClick={onOpenActiveSession}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#166534] text-[11px] sm:text-xs font-bold hover:bg-emerald-100 transition-all cursor-pointer max-w-[100px] xs:max-w-[140px] sm:max-w-none truncate"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 animate-ping"></span>
              <Play size={9} className="fill-emerald-600 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Active:</span> <span className="truncate">{activeSessionName}</span>
            </button>
          )}

          {/* Upgrade to Pro button */}
          <button
            type="button"
            onClick={onOpenInstallModal}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
          >
            <Crown size={14} className="text-amber-500 fill-amber-500" />
            <span>Upgrade to Pro</span>
          </button>

          {/* Streak indicator */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-orange-50/80 border border-orange-200 text-xs font-bold text-neutral-800">
            <Flame size={13} className="text-orange-500 fill-orange-500 shrink-0" />
            <span className="tabular-nums">4</span>
            <span className="text-[11px] text-neutral-500 hidden sm:inline font-medium">Streak</span>
          </div>

          {/* Notification Bell */}
          <button
            type="button"
            onClick={onOpenInstallModal}
            className="hidden xs:flex w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 items-center justify-center text-neutral-600 transition-colors cursor-pointer shadow-2xs"
            title="Notifications"
          >
            <Bell size={15} />
          </button>

          {/* User profile button */}
          <button
            type="button"
            onClick={onOpenGoalPace}
            className="flex items-center gap-1.5 sm:gap-2 pl-0.5 sm:pl-1 pr-1 sm:pr-2 py-1 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-200 overflow-hidden shrink-0 shadow-2xs">
              <img
                src={alexAvatarImg}
                alt="Alex Vance"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:inline font-semibold text-xs text-neutral-800">Alex Vance</span>
            <ChevronDown size={14} className="text-neutral-400 hidden sm:inline" />
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden pb-3 pt-1 border-t border-[#EAEFEA] animate-slide-down">
          <div className="relative flex items-center">
            <Search size={15} className="absolute left-3 text-neutral-400 pointer-events-none" />
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
              className="w-full h-9 rounded-xl bg-[#F8FAF9] border border-[#E5E9E6] text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#16A34A]"
            />
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen(false);
                setSearch('');
              }}
              className="absolute right-2.5 text-neutral-400 hover:text-neutral-700"
            >
              <X size={14} />
            </button>
          </div>

          {/* Mobile search results */}
          {search.trim().length >= 2 && searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-xl border border-[#E2E8E4] shadow-lg p-1.5 space-y-1">
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
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-neutral-50 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                        <Icon size={12} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-neutral-900 block truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-neutral-500 block truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 shrink-0">
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
