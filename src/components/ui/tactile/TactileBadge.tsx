import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TactileBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'sunken'
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const TactileBadge = React.forwardRef<HTMLDivElement, TactileBadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'mat-lift text-foreground border border-border/80',
      primary: 'bg-primary/10 text-primary border border-primary/30 shadow-sm',
      success: 'bg-success/10 text-success border border-success/30 shadow-sm',
      warning: 'bg-warning/10 text-warning border border-warning/30 shadow-sm',
      destructive:
        'bg-destructive/10 text-destructive border border-destructive/30 shadow-sm',
      sunken: 'mat-well text-muted-foreground border border-border/70',
      outline: 'border border-border text-muted-foreground bg-transparent',
    };

    const dotColors = {
      default: 'bg-muted-foreground',
      primary: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      destructive: 'bg-destructive',
      sunken: 'bg-muted-foreground/60',
      outline: 'bg-muted-foreground',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px] gap-1 rounded-[calc(var(--radius,0.75rem)*0.5)]',
      md: 'px-2.5 py-1 text-xs gap-1.5 rounded-[calc(var(--radius,0.75rem)*0.65)]',
      lg: 'px-3 py-1.5 text-sm gap-2 rounded-[calc(var(--radius,0.75rem)*0.8)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium select-none tracking-tight',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('h-1.5 w-1.5 rounded-full shrink-0 animate-pulse', dotColors[variant])}
          />
        )}
        <span>{children}</span>
      </div>
    );
  }
);

TactileBadge.displayName = 'TactileBadge';
