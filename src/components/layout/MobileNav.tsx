import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  CalendarDays,
  Users,
} from 'lucide-react';

const mobileNavItems = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/nutrition', label: 'Food', icon: UtensilsCrossed },
  { to: '/splits', label: 'Plan', icon: CalendarDays },
  { to: '/community', label: 'Feed', icon: Users },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-secondary/95 backdrop-blur-md border-t border-border-default px-1 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all min-w-[56px]
                ${
                  isActive
                    ? 'text-accent-primary font-black scale-105'
                    : 'text-text-muted hover:text-text-primary'
                }
              `}
            >
              <Icon size={19} className="mb-0.5 stroke-[2.2]" />
              <span className="leading-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
