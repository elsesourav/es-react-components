"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ScrubFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  active?: boolean;
}

export function ScrubField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
  active,
}: ScrubFieldProps) {
  const drag = useRef<{ x: number; v: number } | null>(null);
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const clamp = (v: number) =>
    Math.min(max, Math.max(min, Number((Math.round(v / step) * step).toFixed(8))));

  const commitDraft = () => {
    const parsed = draft.trim() === "" ? NaN : Number(draft);
    if (!Number.isFinite(parsed)) {
      setDraft(String(value));
      return;
    }
    const next = clamp(parsed);
    setDraft(String(next));
    if (next !== value) onChange(next);
  };

  return (
    <label
      className="flex h-6.5 min-w-0 items-center gap-1 rounded-[6px] py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-200"
      style={{
        background: active
          ? "var(--mova-ai-accent-tint,#eee)"
          : "var(--mova-ai-field,#f6f6f6)",
        boxShadow: active ? "0 0 0 1px var(--mova-ai-accent,#454545)" : "none",
      }}
    >
      <span
        role="slider"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, v: value };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          onChange(clamp(drag.current.v + ((e.clientX - drag.current.x) / 2) * step));
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onLostPointerCapture={() => (drag.current = null)}
        onKeyDown={(e) => {
          const mult = e.shiftKey ? 10 : 1;
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault();
            onChange(clamp(value + step * mult));
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault();
            onChange(clamp(value - step * mult));
          }
        }}
        className="flex h-full shrink-0 cursor-ew-resize touch-none items-center rounded-[4px] px-0.5 text-[12px] text-[var(--mova-ai-ink-muted,#858585)] select-none hover:text-[var(--mova-ai-ink-secondary,#666)] focus-visible:text-[var(--mova-ai-accent-ink,#333)] focus-visible:outline-none"
      >
        {label}
      </span>
      <input
        inputMode="decimal"
        value={draft}
        onChange={(event) => {
          if (/^-?\d*\.?\d*$/.test(event.target.value)) setDraft(event.target.value);
        }}
        onBlur={commitDraft}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commitDraft();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            setDraft(String(value));
          }
        }}
        aria-label={`${label} value`}
        className="min-w-0 flex-1 bg-transparent text-[12px] text-[var(--mova-ai-ink,#202020)] tabular-nums outline-none"
      />
      {suffix && (
        <span className="shrink-0 pr-0.5 text-[11.5px] text-[var(--mova-ai-ink-muted,#858585)]">
          {suffix}
        </span>
      )}
    </label>
  );
}

export default ScrubField;
