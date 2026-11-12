import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  caption?: string;
  icon?: React.ReactNode;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    {
      className,
      label,
      value,
      change,
      trend = 'neutral',
      caption,
      icon,
      ...props
    },
    ref
  ) => {
    const trendColors = {
      up: 'text-success bg-success/10 border-success/20',
      down: 'text-destructive bg-destructive/10 border-destructive/20',
      neutral: 'text-muted-foreground bg-surface-subtle border-border',
    };

    const trendIcons = {
      up: <ArrowUpRight className="h-3.5 w-3.5" />,
      down: <ArrowDownRight className="h-3.5 w-3.5" />,
      neutral: <Minus className="h-3.5 w-3.5" />,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'p-5 rounded-xl bg-card border border-border shadow-lift hover:shadow-float transition-all flex flex-col justify-between space-y-4',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          {icon && (
            <div className="p-2 rounded-lg bg-surface border border-border/60 text-primary shadow-cap">
              {icon}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold tracking-tight text-foreground">
            {value}
          </div>
          {(change !== undefined || caption) && (
            <div className="flex items-center gap-2 pt-0.5">
              {change !== undefined && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold border',
                    trendColors[trend]
                  )}
                >
                  {trendIcons[trend]}
                  {change}
                </span>
              )}
              {caption && (
                <span className="text-xs text-muted-foreground">{caption}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Stat.displayName = 'Stat';
