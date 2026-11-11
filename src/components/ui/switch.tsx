import * as React from 'react';
import { cn } from '@/lib/utils';

export type SwitchShape = 'pill' | 'rectangle' | 'rounded';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
  shape?: SwitchShape;
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
      shape = 'pill',
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
      sm: 'w-8 h-4.5',
      md: 'w-11 h-6',
      lg: 'w-14 h-7',
    };

    const thumbSizes = {
      sm: 'size-3.5 translate-x-0 peer-checked:translate-x-3.5',
      md: 'size-5 translate-x-0 peer-checked:translate-x-5',
      lg: 'size-6 translate-x-0 peer-checked:translate-x-7',
    };

    const trackRadius = {
      pill: 'rounded-full',
      rectangle: 'rounded-[3px]',
      rounded: 'rounded-[6px]',
    };

    const thumbRadius = {
      pill: 'rounded-full',
      rectangle: 'rounded-[2px]',
      rounded: 'rounded-[4px]',
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
              'bg-border transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-checked:bg-primary',
              trackRadius[shape],
              containerSizes[sizeVariant]
            )}
          />
          <div
            className={cn(
              'absolute left-0.5 top-0.5 bg-white shadow-sm transition-transform duration-200 pointer-events-none flex items-center justify-center',
              thumbRadius[shape],
              thumbSizes[sizeVariant]
            )}
          >
            {shape === 'rectangle' && (
              <span className="flex items-center gap-[1.5px] opacity-35">
                <span className="w-[1px] h-2 bg-zinc-800 rounded-full" />
                <span className="w-[1px] h-2 bg-zinc-800 rounded-full" />
              </span>
            )}
          </div>
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
