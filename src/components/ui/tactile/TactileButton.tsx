import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TactileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'subtle'
    | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  pressed?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      isLoading = false,
      pressed = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium select-none cursor-pointer ' +
      'transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 ' +
      'disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none';

    const variants = {
      default:
        'bg-surface-elevated text-foreground border border-border/80 hover:bg-surface ' +
        'shadow-cap active:translate-y-[1.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)]',
      primary:
        'bg-primary text-primary-foreground border border-primary/80 hover:brightness-105 ' +
        'shadow-cap active:translate-y-[1.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.1)]',
      secondary:
        'bg-secondary text-secondary-foreground border border-border hover:bg-surface-subtle ' +
        'shadow-cap active:translate-y-[1.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.06)]',
      accent:
        'bg-accent text-accent-foreground border border-border hover:brightness-105 ' +
        'shadow-cap active:translate-y-[1.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)]',
      destructive:
        'bg-destructive text-destructive-foreground border border-destructive/80 hover:brightness-105 ' +
        'shadow-cap active:translate-y-[1.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.1)]',
      subtle:
        'bg-surface-subtle text-foreground border border-border/60 hover:bg-surface ' +
        'shadow-lift active:translate-y-[1.5px] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
      ghost:
        'bg-transparent text-muted-foreground hover:text-foreground hover:bg-surface-subtle ' +
        'hover:shadow-cap active:translate-y-[1.5px]',
    };

    const sizes = {
      xs: 'h-7 px-2.5 text-xs rounded-[calc(var(--radius,0.75rem)*0.6)] gap-1.5',
      sm: 'h-8 px-3 text-xs rounded-[calc(var(--radius,0.75rem)*0.75)] gap-1.5',
      md: 'h-10 px-4 text-sm rounded-[var(--radius,0.75rem)] gap-2',
      lg: 'h-12 px-6 text-base rounded-[calc(var(--radius,0.75rem)*1.25)] gap-2.5',
      icon: 'h-10 w-10 p-0 rounded-[var(--radius,0.75rem)]',
    };

    const pressedState = pressed
      ? 'translate-y-[1.5px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08)] bg-surface-sunken'
      : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], pressedState, className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

TactileButton.displayName = 'TactileButton';
