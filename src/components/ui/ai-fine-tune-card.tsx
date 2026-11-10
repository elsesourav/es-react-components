"use client";

/** Adapted from Beautiful UI (https://github.com/slev12397/beautiful-ui).
 * Copyright (c) 2026 Shane Levine. MIT License; see LICENSE.third-party.
 * Original card geometry, interactions, and motion are preserved.
 * 100% Local component with zero external dependencies. */

import * as React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AI_THEME_STYLES } from "./ai-theme-styles";

import { ScrubField, type ScrubFieldProps } from "./scrub-field";
import { FineTuneGlideMenu } from "./glide-menu";

export { ScrubField, type ScrubFieldProps };

const SEGMENTS = ["row", "col", "grid"] as const;

function SegmentIcon({ kind }: { kind: string }) {
  const dot = "size-1.5 rounded-[2px] border-[1.2px] border-current";
  if (kind === "row")
    return (
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className={dot} />
        ))}
      </span>
    );
  if (kind === "col")
    return (
      <span className="flex flex-col gap-0.5">
        {[0, 1].map((i) => (
          <span key={i} className={dot} />
        ))}
      </span>
    );
  return (
    <span className="grid grid-cols-2 gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={dot} />
      ))}
    </span>
  );
}

/* A single scrub-able number property. `value` is the initial/default value. */
export type FineTuneField = {
  key: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
};

/* Prominent copy strings on the card. */
export type FineTuneCardLabels = {
  title: string;
  layout: string;
  type: string;
  placeholder: string;
  adjust: string;
  edited: string;
};

/* The editable state emitted by `onChange`. */
export type FineTuneState = {
  segment: number;
  values: Record<string, number>;
  type: string;
};

export const DEFAULT_FINE_TUNE_FIELDS: FineTuneField[] = [
  { key: "width", label: "W", value: 324, min: 40, max: 999 },
  { key: "height", label: "H", value: 96, min: 24, max: 999 },
  { key: "radius", label: "Radius", value: 28, min: 0, max: 64 },
  { key: "opacity", label: "Opacity", value: 100, min: 0, max: 100, suffix: "%" },
];

export const DEFAULT_FINE_TUNE_OPTIONS = ["Seasonal", "Classic", "Limited"];

export const DEFAULT_FINE_TUNE_LABELS: FineTuneCardLabels = {
  title: "Flavor card",
  layout: "Layout",
  type: "Type",
  placeholder: "Select type",
  adjust: "Adjust",
  edited: "Edited",
};

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

export type FineTuneCardProps = {
  variant?: string;
  fields?: FineTuneField[];
  options?: string[];
  labels?: Partial<FineTuneCardLabels>;
  onChange?: (state: FineTuneState) => void;
  theme?: "light" | "dark";
};

export function FineTuneCard({
  fields = DEFAULT_FINE_TUNE_FIELDS,
  options = DEFAULT_FINE_TUNE_OPTIONS,
  labels,
  onChange,
}: FineTuneCardProps) {
  const text = { ...DEFAULT_FINE_TUNE_LABELS, ...labels };
  const [seg, setSeg] = useState(0);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.value]))
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [menuOpen]);

  const [typeValue, setTypeValue] = useState(text.placeholder);

  const selectSeg = (i: number) => {
    setSeg(i);
    onChange?.({ segment: i, values, type: typeValue });
  };
  const setValue = (key: string, v: number) => {
    const next = { ...values, [key]: v };
    setValues(next);
    onChange?.({ segment: seg, values: next, type: typeValue });
  };
  const selectType = (value: string) => {
    setTypeValue(value);
    setMenuOpen(false);
    triggerRef.current?.focus();
    onChange?.({ segment: seg, values, type: value });
  };

  const changed = fields.some((f) => values[f.key] !== f.value);
  const done = seg !== 0 || changed || typeValue !== text.placeholder;

  return (
    <div className="relative w-full max-w-60 rounded-lg border border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-surface,#fff)] text-[color:var(--mova-ai-ink,#202020)] shadow-[var(--mova-ai-shadow-raised,none)]">
      {/* header */}
      <div className="primitive-card-bar flex items-center justify-between border-b border-[var(--mova-ai-border,#dedede)]">
        <span className="text-[13px] font-medium text-[var(--mova-ai-ink,#202020)]">
          {text.title}
        </span>
        {done ? (
          <span
            className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--mova-ai-success,#28734d)]"
            style={{
              animation:
                "mova-ai-fine-tune-card-pop-in 250ms cubic-bezier(0.23,1,0.32,1) both",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {text.edited}
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="flex size-4.5 items-center justify-center rounded-[5px] border border-[var(--mova-ai-accent,#454545)]/30 bg-[var(--mova-ai-accent-tint,#eee)]">
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="var(--mova-ai-accent,#454545)"
              >
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
            </span>
            <span
              className="bg-clip-text text-[12px] font-medium text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--mova-ai-accent,#454545) 35%, var(--mova-ai-accent-ink,#333) 50%, var(--mova-ai-accent,#454545) 65%)",
                backgroundSize: "200% 100%",
                animation: "mova-ai-fine-tune-card-shimmer-text 1.4s linear infinite",
              }}
            >
              {text.adjust}
            </span>
          </span>
        )}
      </div>

      {/* layout section */}
      <div className="primitive-card-pad flex flex-col gap-2 border-b border-[var(--mova-ai-border,#dedede)]">
        <p className="text-[12.5px] font-medium text-[var(--mova-ai-ink,#202020)]">
          {text.layout}
        </p>
        <div className="relative grid grid-cols-3 rounded-[8px] bg-[var(--mova-ai-field,#f6f6f6)] p-0.5">
          <span
            aria-hidden
            className="absolute inset-y-0.5 rounded-[6px] bg-[var(--mova-ai-surface,#fff)] shadow-[var(--mova-ai-shadow-btn,none)] transition-transform duration-300"
            style={{
              width: "calc((100% - 4px) / 3)",
              left: 2,
              transform: `translateX(${seg * 100}%)`,
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
          {SEGMENTS.map((s, i) => (
            <button
              key={s}
              type="button"
              aria-label={`${s} layout`}
              aria-pressed={i === seg}
              onClick={() => selectSeg(i)}
              className={`relative z-10 flex h-6 items-center justify-center transition-colors duration-200 ${
                i === seg
                  ? "text-[var(--mova-ai-accent,#454545)]"
                  : "text-[var(--mova-ai-ink-muted,#858585)]"
              }`}
            >
              <SegmentIcon kind={s} />
            </button>
          ))}
        </div>
        {chunk(fields, 2).map((pair, ri) => (
          <div key={ri} className="grid min-w-0 grid-cols-2 gap-2">
            {pair.map((f) => (
              <ScrubField
                key={f.key}
                label={f.label}
                value={values[f.key]}
                onChange={(v) => setValue(f.key, v)}
                min={f.min}
                max={f.max}
                step={f.step}
                suffix={f.suffix}
                active={values[f.key] !== f.value}
              />
            ))}
          </div>
        ))}
      </div>

      {/* interaction section */}
      <div className="primitive-card-footer flex items-center justify-between">
        <span className="text-[12px] text-[var(--mova-ai-ink-muted,#858585)]">
          {text.type}
        </span>
        <div
          ref={menuRef}
          className="relative -mr-0.5 w-30"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              triggerRef.current?.focus();
            }
            if (menuOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
              event.preventDefault();
              const items = Array.from(
                menuRef.current?.querySelectorAll<HTMLButtonElement>(
                  "[role=menuitemradio]"
                ) ?? []
              );
              const current = items.indexOf(
                document.activeElement as HTMLButtonElement
              );
              items[
                (current +
                  (event.key === "ArrowDown" ? 1 : -1) +
                  items.length) %
                  items.length
              ]?.focus();
            }
          }}
        >
          <button
            type="button"
            ref={triggerRef}
            aria-haspopup="menu"
            aria-label={text.type}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((curr) => !curr)}
            className="flex h-6.5 w-full items-center justify-between rounded-[6px] bg-[var(--mova-ai-inset,#f8f8f8)] py-1 pr-1 pl-2 shadow-[var(--mova-ai-shadow-hairline,none)] transition-shadow duration-200 focus-visible:outline-none"
            style={{
              boxShadow: menuOpen
                ? "0 0 0 1px var(--mova-ai-accent,#454545)"
                : undefined,
            }}
          >
            <span
              className={`text-[12px] ${
                typeValue !== text.placeholder
                  ? "text-[var(--mova-ai-ink,#202020)]"
                  : "text-[var(--mova-ai-ink-muted,#858585)]"
              }`}
            >
              {typeValue}
            </span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mova-ai-ink-muted,#858585)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200"
              style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0)" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {menuOpen && (
            <div
              role="menu"
              aria-label={text.type}
              className="absolute right-0 bottom-8 z-10 w-30 rounded-[10px] bg-[var(--mova-ai-surface,#fff)] p-1 shadow-[var(--mova-ai-shadow-raised,none)]"
              style={{
                animation:
                  "mova-ai-fine-tune-card-pop-in 200ms cubic-bezier(0.23,1,0.32,1) both",
                transformOrigin: "bottom right",
              }}
            >
              <FineTuneGlideMenu
                className="flex flex-col gap-px"
                highlightClassName="inset-x-0 rounded-[6px] bg-[var(--mova-ai-field,#f6f6f6)]"
              >
                {options.map((item) => (
                  <button
                    key={item}
                    data-menu-row
                    role="menuitemradio"
                    aria-checked={item === typeValue}
                    type="button"
                    onClick={() => selectType(item)}
                    className={`relative z-10 flex h-6.5 w-full items-center rounded-[6px] px-2 text-left text-[12.5px] text-[var(--mova-ai-ink,#202020)] ${
                      item === typeValue
                        ? "bg-[var(--mova-ai-field,#f6f6f6)] group-hover/glide-menu:bg-transparent"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </FineTuneGlideMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const scopedStyles = `
.mova-ai-fine-tune-card .primitive-card-pad{padding:12px}
.mova-ai-fine-tune-card .primitive-card-bar{padding:10px 12px}
.mova-ai-fine-tune-card .primitive-card-footer{padding:10px}
.mova-ai-fine-tune-card .primitive-icon-button{display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:8px}
.mova-ai-fine-tune-card :is(button,input,[tabindex]):focus-visible{outline:2px solid var(--mova-ai-accent,#454545)!important;outline-offset:2px}
.mova-ai-fine-tune-card button:not(:disabled){cursor:pointer}
.mova-ai-fine-tune-card code{overflow-wrap:anywhere}
.mova-ai-fine-tune-card *, .mova-ai-fine-tune-card *::before,.mova-ai-fine-tune-card *::after{box-sizing:border-box}
@keyframes mova-ai-fine-tune-card-pop-in{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes mova-ai-fine-tune-card-fade-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes mova-ai-fine-tune-card-shimmer-text{from{background-position:150% center}to{background-position:-50% center}}
@media(prefers-reduced-motion:reduce){
  .mova-ai-fine-tune-card *, .mova-ai-fine-tune-card *::before, .mova-ai-fine-tune-card *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important
  }
}
`;

export function AIFineTuneCard({
  theme = "light",
  ...props
}: FineTuneCardProps) {
  return (
    <div className="mova-ai-theme mova-ai-fine-tune-card" data-theme={theme}>
      <style>{AI_THEME_STYLES}{scopedStyles}</style>
      <FineTuneCard {...props} />
    </div>
  );
}

export default AIFineTuneCard;
