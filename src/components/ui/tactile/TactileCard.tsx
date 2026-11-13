import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'lifted' | 'sunken' | 'float' | 'interactive';
}

export const TactileCard = React.forwardRef<HTMLDivElement, TactileCardProps>(
  ({ className, variant = 'lifted', ...props }, ref) => {
    const variants = {
      lifted: 'mat-lift text-card-foreground border border-border/80',
      sunken: 'mat-well text-card-foreground border border-border/70',
      float: 'mat-float text-card-foreground border border-border/80',
      interactive:
        'mat-lift text-card-foreground border border-border/80 hover:border-primary/50 hover:shadow-float active:translate-y-px transition-all duration-200 cursor-pointer',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-[var(--radius,0.75rem)] overflow-hidden', variants[variant], className)}
        {...props}
      />
    );
  }
);
TactileCard.displayName = 'TactileCard';

export const TactileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-5 sm:p-6', className)}
    {...props}
  />
));
TactileCardHeader.displayName = 'TactileCardHeader';

export const TactileCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-semibold text-lg leading-none tracking-tight text-foreground',
      className
    )}
    {...props}
  />
));
TactileCardTitle.displayName = 'TactileCardTitle';

export const TactileCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
TactileCardDescription.displayName = 'TactileCardDescription';

export const TactileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 sm:p-6 pt-0', className)} {...props} />
));
TactileCardContent.displayName = 'TactileCardContent';

export const TactileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-5 sm:p-6 pt-0 border-t border-border/50 pt-4', className)}
    {...props}
  />
));
TactileCardFooter.displayName = 'TactileCardFooter';
