import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
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
    const baseStyles =
      'inline-flex items-center font-medium transition-colors select-none';

    const variants = {
      default:
        'bg-surface-elevated text-foreground border border-border',
      primary:
        'bg-primary/15 text-primary border border-primary/25',
      secondary:
        'bg-secondary text-secondary-foreground border border-transparent',
      outline:
        'border border-border text-muted-foreground bg-transparent',
      success:
        'bg-success/15 text-success border border-success/25',
      warning:
        'bg-warning/15 text-warning border border-warning/25',
      danger:
        'bg-destructive/15 text-destructive border border-destructive/25',
      info:
        'bg-info/15 text-info border border-info/25',
    };

    const dotColors = {
      default: 'bg-muted-foreground',
      primary: 'bg-primary',
      secondary: 'bg-secondary-foreground',
      outline: 'bg-muted-foreground',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-destructive',
      info: 'bg-info',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-[11px] rounded-full gap-1.5',
      md: 'px-2.5 py-0.5 text-xs rounded-full gap-1.5',
      lg: 'px-3 py-1 text-sm rounded-full gap-2',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn('h-1.5 w-1.5 rounded-full shrink-0', dotColors[variant])}
          />
        )}
        <span>{children}</span>
      </div>
    );
  }
);

Badge.displayName = 'Badge';
