"use client";

import React from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";

export interface TaskStepItem {
  id: string;
  label: string;
  description?: string;
}

export interface TaskStepsProps {
  steps: TaskStepItem[];
  current: number; // 0-based index of active stage
  failed?: boolean;
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function TaskSteps({
  steps,
  current,
  failed = false,
  label = "Progress stages",
  orientation = "horizontal",
  className = "",
}: TaskStepsProps) {
  const isVertical = orientation === "vertical";

  return (
    <nav
      aria-label={label}
      className={`w-full ${className}`}
    >
      <ol
        className={`flex ${
          isVertical ? "flex-col space-y-4" : "items-center justify-between"
        } w-full`}
      >
        {steps.map((step, idx) => {
          const isCompleted = idx < current;
          const isCurrent = idx === current;
          const isUpcoming = idx > current;
          const isStepFailed = isCurrent && failed;
          const isLast = idx === steps.length - 1;

          return (
            <li
              key={step.id}
              className={`relative flex ${
                isVertical ? "items-start gap-3.5" : "flex-1 flex-col items-center text-center"
              } ${isLast && !isVertical ? "flex-initial" : ""}`}
            >
              {/* Connector line (Horizontal) */}
              {!isVertical && !isLast && (
                <div
                  aria-hidden="true"
                  className={`absolute top-4 left-1/2 w-full h-[2px] -translate-y-1/2 z-0 transition-colors duration-300 ${
                    idx < current ? "bg-primary" : "bg-border"
                  }`}
                />
              )}

              {/* Step indicator node */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`size-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 select-none ${
                    isCompleted
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : isStepFailed
                        ? "bg-destructive text-destructive-foreground ring-4 ring-destructive/20 animate-shake"
                        : isCurrent
                          ? "bg-surface border-2 border-primary text-primary ring-4 ring-primary/20 shadow-xs"
                          : "bg-surface border border-border text-muted-foreground"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="size-4 stroke-[2.5]" />
                  ) : isStepFailed ? (
                    <AlertCircle className="size-4 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Loader2 className="size-4 animate-spin text-primary" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Step labels (Horizontal) */}
                {!isVertical && (
                  <div className="mt-2 space-y-0.5 px-1 max-w-[120px]">
                    <p
                      className={`text-xs font-semibold tracking-tight transition-colors ${
                        isCurrent
                          ? isStepFailed
                            ? "text-destructive"
                            : "text-foreground font-bold"
                          : isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="text-[11px] text-muted-foreground line-clamp-1">
                        {step.description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Step labels (Vertical) */}
              {isVertical && (
                <div className="flex-1 pt-0.5">
                  <p
                    className={`text-xs font-semibold transition-colors ${
                      isCurrent
                        ? isStepFailed
                          ? "text-destructive"
                          : "text-foreground font-bold"
                        : isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
