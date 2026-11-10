import * as React from 'react';
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  title?: string;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      children,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const variants = {
      neutral:
        'bg-surface-elevated text-foreground border-border',
      info:
        'bg-info/10 text-info border-info/30',
      success:
        'bg-success/10 text-success border-success/30',
      warning:
        'bg-warning/10 text-warning border-warning/30',
      danger:
        'bg-destructive/10 text-destructive border-destructive/30',
    };

    const icons = {
      neutral: <Info className="h-5 w-5 shrink-0 text-muted-foreground" />,
      info: <Info className="h-5 w-5 shrink-0 text-info" />,
      success: <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />,
      warning: <TriangleAlert className="h-5 w-5 shrink-0 text-warning" />,
      danger: <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex items-start gap-3 p-4 rounded-xl border text-sm',
          variants[variant],
          className
        )}
        {...props}
      >
        {icons[variant]}
        <div className="flex-1 space-y-1">
          {title && (
            <h5 className="font-semibold leading-none tracking-tight">
              {title}
            </h5>
          )}
          <div className="text-xs opacity-90 leading-relaxed">{children}</div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 -mr-1 -mt-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
