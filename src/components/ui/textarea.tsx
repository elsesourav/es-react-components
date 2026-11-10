import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  characterCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      characterCount = false,
      maxLength,
      value,
      onChange,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const [currentLength, setCurrentLength] = React.useState<number>(
      typeof value === 'string' ? value.length : 0
    );

    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(e.target.value.length);
      if (onChange) onChange(e);
    };

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-xs font-medium text-foreground select-none"
            >
              {label}
            </label>
          )}
          {characterCount && maxLength && (
            <span className="text-[11px] text-muted-foreground">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full bg-surface border border-border text-foreground placeholder:text-muted-foreground/60 transition-colors p-3 text-sm rounded-lg resize-y',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-destructive animate-fade-in">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
