import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface TactileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sizeVariant?: 'sm' | 'md' | 'lg';
  onClear?: () => void;
  showClear?: boolean;
}

export const TactileInput = React.forwardRef<HTMLInputElement, TactileInputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      sizeVariant = 'md',
      id,
      disabled,
      value,
      showClear,
      onClear,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const sizes = {
      sm: 'h-8 px-2.5 text-xs rounded-[calc(var(--radius,0.75rem)*0.75)]',
      md: 'h-10 px-3.5 text-sm rounded-[var(--radius,0.75rem)]',
      lg: 'h-12 px-4 text-base rounded-[calc(var(--radius,0.75rem)*1.25)]',
    };

    const hasClear = showClear && value !== undefined && value !== '' && !disabled;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-muted-foreground/80 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            value={value}
            className={cn(
              'w-full mat-well border border-border/80 text-foreground placeholder:text-muted-foreground/50',
              'transition-[border-color,box-shadow] duration-150 ease-out',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              'disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-strong',
              sizes[sizeVariant],
              leftIcon && '!pl-10',
              (rightIcon || hasClear) && '!pr-10',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              className
            )}
            {...props}
          />
          {hasClear ? (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              tabIndex={-1}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            rightIcon && (
              <div className="absolute right-3.5 text-muted-foreground flex items-center justify-center pointer-events-none">
                {rightIcon}
              </div>
            )
          )}
        </div>
        {error ? (
          <p className="text-xs text-destructive animate-fade-in font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

TactileInput.displayName = 'TactileInput';
