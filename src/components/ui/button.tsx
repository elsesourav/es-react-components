import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

    const variants = {
      primary:
        'bg-primary text-primary-foreground shadow-sm hover:opacity-95 hover:shadow-md hover:shadow-primary/20',
      secondary:
        'bg-surface-elevated text-foreground border border-border hover:bg-surface-subtle hover:border-border-strong shadow-sm',
      outline:
        'border border-border text-foreground bg-transparent hover:bg-surface-subtle hover:text-foreground hover:border-border-strong',
      ghost:
        'text-muted-foreground hover:text-foreground hover:bg-surface-subtle',
      danger:
        'bg-destructive text-destructive-foreground hover:opacity-95 shadow-sm hover:shadow-destructive/20',
      success:
        'bg-success text-success-foreground hover:opacity-95 shadow-sm hover:shadow-success/20',
      subtle:
        'bg-primary/10 text-primary hover:bg-primary/15 border border-primary/20',
    };

    const sizes = {
      xs: 'h-7 px-2.5 text-xs rounded-sm gap-1.5',
      sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
      md: 'h-10 px-4 text-sm rounded-lg gap-2',
      lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
      icon: 'h-10 w-10 p-0 rounded-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
