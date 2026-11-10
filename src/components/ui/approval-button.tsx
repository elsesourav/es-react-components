"use client";

import React from "react";

export interface ApprovalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "secondary" | "ghost" | "accent";
  size?: "sm" | "md";
}

export function ApprovalButton({
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}: ApprovalButtonProps) {
  const variants = {
    secondary:
      "bg-[var(--mova-ai-surface,#fff)] text-[var(--mova-ai-ink,#202020)] shadow-[var(--mova-ai-shadow-btn,none)] hover:bg-[var(--mova-ai-inset,#f8f8f8)]",
    ghost:
      "bg-[var(--mova-ai-hover-strong,#e9e9e9)] text-[var(--mova-ai-ink,#202020)] hover:bg-[var(--mova-ai-border-strong,#c8c8c8)]",
    accent:
      "approval-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
  };
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-medium select-none transition-[transform,background-color,color,opacity,filter] duration-150 ease-out active:scale-[0.96] active:brightness-110 disabled:opacity-50 disabled:pointer-events-none ${
        variants[variant]
      } ${
        size === "sm"
          ? "h-[27px] px-3 text-[13px] leading-none rounded-full gap-1.5"
          : "px-4 py-[9px] text-sm leading-none rounded-full gap-2"
      } ${className}`}
      {...props}
    />
  );
}

export default ApprovalButton;
