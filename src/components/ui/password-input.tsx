"use client";

import React, { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  max: number;
  label: "Too short" | "Weak" | "Fair" | "Good" | "Strong";
  colorClass: string;
  requirements: PasswordRequirement[];
}

export function usePasswordStrength(password: string): PasswordStrengthResult {
  const reqs: PasswordRequirement[] = [
    { id: "length", label: "At least 8 characters", met: password.length >= 8 },
    { id: "case", label: "Mixed uppercase & lowercase", met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { id: "number", label: "At least one number", met: /\d/.test(password) },
    { id: "special", label: "At least one symbol (!@#$%...)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = reqs.filter((r) => r.met).length;
  let score = 0;
  let label: PasswordStrengthResult["label"] = "Too short";
  let colorClass = "bg-muted";

  if (password.length === 0) {
    score = 0;
    label = "Too short";
    colorClass = "bg-muted";
  } else if (password.length < 6) {
    score = 1;
    label = "Too short";
    colorClass = "bg-destructive";
  } else if (metCount <= 1) {
    score = 1;
    label = "Weak";
    colorClass = "bg-destructive";
  } else if (metCount === 2) {
    score = 2;
    label = "Fair";
    colorClass = "bg-warning";
  } else if (metCount === 3) {
    score = 3;
    label = "Good";
    colorClass = "bg-info";
  } else {
    score = 4;
    label = "Strong";
    colorClass = "bg-success";
  }

  return {
    score,
    max: 4,
    label,
    colorClass,
    requirements: reqs,
  };
}

export interface PasswordStrengthProps {
  value: string;
  className?: string;
  showRequirements?: boolean;
}

export function PasswordStrength({
  value,
  className = "",
  showRequirements = false,
}: PasswordStrengthProps) {
  const { score, max, label, colorClass, requirements } = usePasswordStrength(value);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">Password strength</span>
        <span
          className={`font-semibold capitalize ${
            score === 0
              ? "text-muted-foreground"
              : score === 1
                ? "text-destructive"
                : score === 2
                  ? "text-warning"
                  : score === 3
                    ? "text-info"
                    : "text-success"
          }`}
        >
          {value ? label : "—"}
        </span>
      </div>

      {/* Segmented meter */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-full rounded-full transition-all duration-300 ${
              i < score ? colorClass : "bg-border"
            }`}
          />
        ))}
      </div>

      {showRequirements && (
        <ul className="mt-2.5 space-y-1 text-xs text-muted-foreground">
          {requirements.map((req) => (
            <li key={req.id} className="flex items-center gap-1.5">
              <span
                className={`size-1.5 rounded-full ${
                  req.met ? "bg-success" : "bg-muted-foreground/40"
                }`}
              />
              <span className={req.met ? "text-foreground line-through opacity-70" : ""}>
                {req.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  showStrengthMeter?: boolean;
  showRequirements?: boolean;
  hint?: string;
  className?: string;
}

export function PasswordInput({
  label,
  value,
  defaultValue,
  onChange,
  showStrengthMeter = false,
  showRequirements = false,
  hint,
  className = "",
  disabled,
  id,
  ...props
}: PasswordInputProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const [uncontrolled, setUncontrolled] = useState(defaultValue || "");
  const [showPassword, setShowPassword] = useState(false);

  const currentValue = value !== undefined ? value : uncontrolled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setUncontrolled(e.target.value);
    }
    onChange?.(e.target.value);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          id={inputId}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          className="h-10 w-full rounded-[var(--radius)] border border-border bg-surface px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-[border-color,box-shadow] duration-150 hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        />

        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      {showStrengthMeter && (
        <PasswordStrength
          value={currentValue}
          showRequirements={showRequirements}
          className="mt-2.5"
        />
      )}

      {hint && !showStrengthMeter && (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
