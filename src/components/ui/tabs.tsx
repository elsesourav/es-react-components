import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline' | 'segmented';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className,
}) => {
  if (variant === 'segmented') {
    return (
      <div className="w-full overflow-x-auto scrollbar-none py-1">
        <div
          className={cn(
            'inline-flex items-center p-1 rounded-xl bg-surface border border-border/60 min-w-max',
            className
          )}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 select-none whitespace-nowrap',
                  isActive
                    ? 'bg-surface-elevated text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.icon && <span className="h-4 w-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      'px-1.5 py-0.2 rounded-full text-[10px] font-semibold',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface-subtle text-muted-foreground'
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div className="w-full overflow-x-auto scrollbar-none">
        <div
          className={cn(
            'flex items-center gap-6 border-b border-border/80 min-w-max',
            className
          )}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  'relative flex items-center gap-2 py-3 text-sm font-medium transition-colors select-none -mb-px whitespace-nowrap',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.icon && <span className="h-4 w-4 shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Pills variant
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-1">
      <div className={cn('flex items-center gap-2 min-w-max', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 select-none whitespace-nowrap',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                  : 'bg-surface hover:bg-surface-elevated text-muted-foreground hover:text-foreground border border-border/50'
              )}
            >
              {tab.icon && <span className="h-4 w-4 shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
