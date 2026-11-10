import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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

    const boxSizes = {
      sm: 'h-4 w-4 rounded',
      md: 'h-5 w-5 rounded-md',
      lg: 'h-6 w-6 rounded-md',
    };

    const iconSizes = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    };

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-start gap-2.5 select-none cursor-pointer group',
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
              'border border-border bg-surface transition-all duration-200 flex items-center justify-center',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40',
              'peer-checked:bg-primary peer-checked:border-primary text-primary-foreground',
              boxSizes[sizeVariant]
            )}
          >
            {isChecked && <Check className={cn('stroke-[3]', iconSizes[sizeVariant])} />}
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

Checkbox.displayName = 'Checkbox';
