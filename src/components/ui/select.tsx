import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dropdown, DropdownProps, DropdownItem, useDropdown } from './dropdown';
import { TactileSelect, TactileSelectProps, TactileSelectOption } from './tactile/TactileSelect';

export type { DropdownProps, DropdownItem, TactileSelectProps, TactileSelectOption };
export { Dropdown, useDropdown, TactileSelect };

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  sizeVariant?: 'sm' | 'md' | 'lg';
  variant?: 'native' | 'standard' | 'tactile' | 'cap' | 'sunken';
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options = [],
      sizeVariant = 'md',
      variant = 'native',
      id,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const sizes = {
      sm: 'h-8 px-2.5 text-xs rounded-md',
      md: 'h-10 px-3 text-sm rounded-lg',
      lg: 'h-12 px-4 text-base rounded-xl',
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-foreground select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full appearance-none border border-border/80 text-foreground transition-all pr-9 rounded-[var(--radius)] cursor-pointer',
              variant === 'tactile' || variant === 'cap'
                ? 'mat-cap hover:bg-surface active:translate-y-px'
                : variant === 'sunken'
                ? 'mat-well'
                : 'bg-surface shadow-well focus:shadow-lift',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              sizes[sizeVariant],
              className
            )}
            {...props}
          >
            {children
              ? children
              : options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-surface text-foreground"
                  >
                    {opt.label}
                  </option>
                ))}
          </select>
          <ChevronDown className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
        {error ? (
          <p className="text-xs text-destructive animate-fade-in">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

NativeSelect.displayName = 'NativeSelect';

export type UnifiedSelectProps =
  | ({ variant?: 'native' | 'standard' | 'cap' | 'sunken' } & Omit<NativeSelectProps, 'variant'>)
  | ({ variant: 'animated' } & Omit<DropdownProps, 'variant'>)
  | ({ variant: 'tactile' } & Omit<TactileSelectProps, 'variant'>);

export const Select = React.forwardRef<any, UnifiedSelectProps>((props, ref) => {
  if (props.variant === 'tactile') {
    return <TactileSelect ref={ref} {...(props as TactileSelectProps)} />;
  }
  if (props.variant === 'animated') {
    return <Dropdown {...(props as DropdownProps)} />;
  }
  return <NativeSelect ref={ref} {...(props as NativeSelectProps)} />;
}) as React.ForwardRefExoticComponent<UnifiedSelectProps> & {
  Native: typeof NativeSelect;
  Animated: typeof Dropdown;
  Tactile: typeof TactileSelect;
};

Select.Native = NativeSelect;
Select.Animated = Dropdown;
Select.Tactile = TactileSelect;
Select.displayName = 'Select';
