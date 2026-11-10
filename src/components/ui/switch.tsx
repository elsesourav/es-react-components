import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      checked,
      defaultChecked,
      onChange,
      disabled,
      sizeVariant = 'md',
      id,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(
      checked !== undefined ? checked : Boolean(defaultChecked)
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      if (onChange) onChange(e);
    };

    const containerSizes = {
      sm: 'w-8 h-4',
      md: 'w-11 h-6',
      lg: 'w-14 h-7',
    };

    const thumbSizes = {
      sm: 'h-3 w-3 translate-x-0.5 peer-checked:translate-x-4',
      md: 'h-4 w-4 translate-x-1 peer-checked:translate-x-6',
      lg: 'h-5 w-5 translate-x-1 peer-checked:translate-x-8',
    };

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-start gap-3 select-none cursor-pointer group',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative inline-flex items-center shrink-0 mt-0.5">
          <input
            id={inputId}
            type="checkbox"
            ref={ref}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'rounded-full bg-border transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-checked:bg-primary',
              containerSizes[sizeVariant]
            )}
          />
          <div
            className={cn(
              'absolute rounded-full bg-white shadow-sm transition-transform duration-200 pointer-events-none',
              thumbSizes[sizeVariant]
            )}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
