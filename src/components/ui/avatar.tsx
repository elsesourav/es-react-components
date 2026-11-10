import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = '',
      fallback,
      size = 'md',
      status,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState<boolean>(false);

    const sizes = {
      xs: 'h-6 w-6 text-[10px]',
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const statusSizes = {
      xs: 'h-1.5 w-1.5 right-0 bottom-0',
      sm: 'h-2 w-2 right-0 bottom-0',
      md: 'h-2.5 w-2.5 right-0.5 bottom-0.5',
      lg: 'h-3 w-3 right-0.5 bottom-0.5',
      xl: 'h-3.5 w-3.5 right-1 bottom-1',
    };

    const statusColors = {
      online: 'bg-success',
      offline: 'bg-muted-foreground',
      busy: 'bg-destructive',
      away: 'bg-warning',
    };

    const getInitials = (text?: string) => {
      if (!text) return '?';
      const parts = text.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return text.slice(0, 2).toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center shrink-0 rounded-full font-semibold overflow-hidden border border-border select-none bg-surface-elevated text-foreground',
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{fallback ? getInitials(fallback) : getInitials(alt)}</span>
        )}

        {status && (
          <span
            className={cn(
              'absolute rounded-full ring-2 ring-background',
              statusColors[status],
              statusSizes[size]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
