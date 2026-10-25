import type { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'pill' | 'underline';
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className = '',
  variant = 'pill',
}: TabsProps) {
  if (variant === 'underline') {
    return (
      <div className={`flex border-b border-border-default overflow-x-auto no-scrollbar gap-2 ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center gap-2 py-2.5 px-3 border-b-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors
                ${
                  isActive
                    ? 'border-accent-primary text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-subtle'
                }
              `}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#079447] text-white font-bold' : 'bg-neutral-100 text-[#667085]'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex p-1 bg-white rounded-xl border border-[#E4EDE7] shadow-2xs overflow-x-auto no-scrollbar gap-1 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-150
              ${
                isActive
                  ? 'bg-[#E8F7EC] text-[#079447] font-bold shadow-xs border border-emerald-200'
                  : 'text-[#667085] hover:text-[#101828] hover:bg-[#F8FAF9]'
              }
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#079447] text-white' : 'bg-neutral-100 text-[#667085]'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
