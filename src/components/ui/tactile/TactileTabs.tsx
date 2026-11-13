import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TactileTabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TactileTabsProps {
  items: TactileTabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TactileTabs = React.forwardRef<HTMLDivElement, TactileTabsProps>(
  (
    {
      items,
      value: controlledValue,
      defaultValue,
      onChange,
      size = 'md',
      className,
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || items[0]?.id || ''
    );
    const activeId = isControlled ? controlledValue : internalValue;

    const handleSelect = (id: string, disabled?: boolean) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalValue(id);
      }
      onChange?.(id);
    };

    const containerSizes = {
      sm: 'p-0.5 gap-1 rounded-[calc(var(--radius,0.75rem)*0.65)]',
      md: 'p-1 gap-1.5 rounded-[var(--radius,0.75rem)]',
      lg: 'p-1.5 gap-2 rounded-[calc(var(--radius,0.75rem)*1.25)]',
    };

    const itemSizes = {
      sm: 'h-7 px-2.5 text-xs gap-1.5 rounded-[calc(var(--radius,0.75rem)*0.5)]',
      md: 'h-8 px-3.5 text-xs font-medium gap-2 rounded-[calc(var(--radius,0.75rem)*0.75)]',
      lg: 'h-10 px-5 text-sm font-medium gap-2.5 rounded-[var(--radius,0.75rem)]',
    };

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'inline-flex items-center mat-well border border-border/80 select-none',
          containerSizes[size],
          className
        )}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => handleSelect(item.id, item.disabled)}
              className={cn(
                'relative inline-flex items-center justify-center font-medium transition-[background-color,box-shadow,color,transform] duration-150 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40',
                'disabled:pointer-events-none disabled:opacity-40',
                itemSizes[size],
                isActive
                  ? 'mat-cap text-foreground border border-border/70 font-semibold'
                  : 'text-muted-foreground hover:text-foreground bg-transparent active:translate-y-px'
              )}
            >
              {item.icon && <span className="inline-flex shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && <span className="inline-flex shrink-0 ml-1">{item.badge}</span>}
            </button>
          );
        })}
      </div>
    );
  }
);

TactileTabs.displayName = 'TactileTabs';
