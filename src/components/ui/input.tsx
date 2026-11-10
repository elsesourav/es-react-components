import * as React from 'react';
import { cn } from '@/lib/utils';
import { FloatingLabelInput, FloatingLabelInputProps } from './floating-label-input';
import { InlineValidation, InlineValidationProps } from './inline-validation-input';
import {
  PasswordInput,
  PasswordInputProps,
  PasswordStrength,
  usePasswordStrength,
} from './password-input';
import { OtpInput, OtpInputProps } from './otp-input';
import { TagInput, TagInputProps } from './tag-input';
import {
  ExpandingSearch,
  ExpandingSearchProps,
  useExpandingSearch,
} from './expanding-search';

export {
  FloatingLabelInput,
  InlineValidation,
  PasswordInput,
  PasswordStrength,
  usePasswordStrength,
  OtpInput,
  TagInput,
  ExpandingSearch,
  useExpandingSearch,
};

export type {
  FloatingLabelInputProps,
  InlineValidationProps,
  PasswordInputProps,
  OtpInputProps,
  TagInputProps,
  ExpandingSearchProps,
};

export interface StandardInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const StandardInput = React.forwardRef<HTMLInputElement, StandardInputProps>(
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
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const sizes = {
      sm: 'h-8 px-2.5 text-xs rounded-md',
      md: 'h-10 px-3.5 text-sm rounded-lg',
      lg: 'h-12 px-4 text-base rounded-xl',
    };

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
            <div className="absolute left-3.5 text-muted-foreground pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full bg-surface border border-border text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] duration-150',
              sizes[sizeVariant],
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              'disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-strong',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              leftIcon && '!pl-10',
              rightIcon && '!pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-muted-foreground flex items-center justify-center">
              {rightIcon}
            </div>
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

StandardInput.displayName = 'StandardInput';

export type UnifiedInputProps =
  | ({ variant?: 'standard' } & StandardInputProps)
  | ({ variant: 'floating' } & FloatingLabelInputProps)
  | ({ variant: 'inline-validation' } & InlineValidationProps)
  | ({ variant: 'password' } & PasswordInputProps)
  | ({ variant: 'otp' } & OtpInputProps)
  | ({ variant: 'tag' } & TagInputProps)
  | ({ variant: 'search' | 'expanding-search' } & ExpandingSearchProps);

export const Input = React.forwardRef<any, UnifiedInputProps>((props, ref) => {
  switch (props.variant) {
    case 'floating':
      return <FloatingLabelInput {...(props as FloatingLabelInputProps)} />;
    case 'inline-validation':
      return <InlineValidation {...(props as InlineValidationProps)} />;
    case 'password':
      return <PasswordInput {...(props as PasswordInputProps)} />;
    case 'otp':
      return <OtpInput {...(props as OtpInputProps)} />;
    case 'tag':
      return <TagInput {...(props as TagInputProps)} />;
    case 'search':
    case 'expanding-search':
      return <ExpandingSearch {...(props as ExpandingSearchProps)} />;
    case 'standard':
    default:
      return <StandardInput ref={ref} {...(props as StandardInputProps)} />;
  }
}) as React.ForwardRefExoticComponent<UnifiedInputProps> & {
  Standard: typeof StandardInput;
  Floating: typeof FloatingLabelInput;
  InlineValidation: typeof InlineValidation;
  Password: typeof PasswordInput;
  OTP: typeof OtpInput;
  Tags: typeof TagInput;
  Search: typeof ExpandingSearch;
};

Input.Standard = StandardInput;
Input.Floating = FloatingLabelInput;
Input.InlineValidation = InlineValidation;
Input.Password = PasswordInput;
Input.OTP = OtpInput;
Input.Tags = TagInput;
Input.Search = ExpandingSearch;
Input.displayName = 'Input';
