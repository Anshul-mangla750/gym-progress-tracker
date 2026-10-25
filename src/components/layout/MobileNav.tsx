import { NavLink } from 'react-router-dom';
import {
  Home,
  Dumbbell,
  UtensilsCrossed,
  CalendarDays,
  Users,
  BarChart2,
} from 'lucide-react';

const mobileNavItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/nutrition', label: 'Food', icon: UtensilsCrossed },
  { to: '/splits', label: 'Plan', icon: CalendarDays },
  { to: '/progress', label: 'Stats', icon: BarChart2 },
  { to: '/community', label: 'Feed', icon: Users },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E9E4F0] px-2 py-1.5 safe-area-pb shadow-lg">
      <div className="grid grid-cols-6 items-center gap-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) => `
                flex w-full min-w-0 flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all
                ${
                  isActive
                    ? 'text-[#7C3AED] font-black scale-105'
                    : 'text-[#667085] hover:text-[#101828]'
                }
              `}
            >
              <Icon size={19} className="mb-0.5 stroke-[2.2]" />
              <span className="leading-tight text-[9.5px]">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
