"use client";

/** Adapted from Beautiful UI (https://github.com/slev12397/beautiful-ui).
 * Copyright (c) 2026 Shane Levine. MIT License; see LICENSE.third-party.
 * Original card geometry, interactions, and motion are preserved.
 * Migrated to 100% local component with zero external dependencies. */

import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────
 * APPROVAL CARD (human-in-the-loop)
 * One question at a time. The stack slides vertically as you
 * move between questions (the card's height animates to fit),
 * the step counter rolls like an odometer, and the footer uses
 * pill actions — a quiet Skip and a dark Continue with a ⏎.
 * Single-choice answers auto-advance; multi-select waits.
 * ───────────────────────────────────────────────────────── */

import {
  type ApprovalQuestion,
  type ApprovalLabels,
  DEFAULT_APPROVAL_QUESTIONS,
  DEFAULT_APPROVAL_LABELS,
  SLIDE,
} from "./ai-approval-types";
import { RollingDigits, Ico } from "./rolling-digits";
import { GlideMenu, type GlideMenuProps } from "./glide-menu";
import { ApprovalButton } from "./approval-button";
import { AI_THEME_STYLES } from "./ai-theme-styles";

export type { ApprovalQuestion, ApprovalLabels, GlideMenuProps };
export { DEFAULT_APPROVAL_QUESTIONS, DEFAULT_APPROVAL_LABELS, RollingDigits, GlideMenu, ApprovalButton };

export type ApprovalCardProps = {
  questions?: ApprovalQuestion[];
  labels?: Partial<ApprovalLabels>;
  onSubmitted?: (answers: Record<number, number[]>, customAnswers: Record<number, string>) => void;
  onAnswerChange?: (questionIndex: number, answer: number[]) => void;
  resettable?: boolean;
  variant?: string;
  theme?: "light" | "dark";
};

export function ApprovalCard({
  questions = DEFAULT_APPROVAL_QUESTIONS,
  labels,
  onSubmitted,
  onAnswerChange,
  resettable = true,
}: ApprovalCardProps) {
  const t = { ...DEFAULT_APPROVAL_LABELS, ...labels };
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [custom, setCustom] = useState<Record<number, string>>({});
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const customRef = useRef(custom);
  customRef.current = custom;
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(true);
  const reopenRef = useRef<HTMLButtonElement>(null);
  const sentStatusRef = useRef<HTMLDivElement>(null);
  const previousView = useRef({ open: true, sent: false });

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const measured = useRef(false);
  const [viewportH, setViewportH] = useState<number | undefined>(undefined);
  const [trackY, setTrackY] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [ready, setReady] = useState(false);

  const last = qi >= questions.length - 1;
  const selected = answers[qi] ?? [];
  const hasAnswer = selected.length > 0 || Boolean(custom[qi]?.trim());

  const sync = (withAnim: boolean) => {
    const item = questionRefs.current[qi];
    if (!item) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setViewportH(item.offsetHeight);
    setTrackY(item.offsetTop);
    setAnimate(withAnim && !reduce);
  };

  useLayoutEffect(() => {
    const withAnim = measured.current;
    measured.current = true;
    sync(withAnim);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi, answers, custom, open, sent]);

  useEffect(() => {
    const previous = previousView.current;
    previousView.current = { open, sent };
    if (!open) reopenRef.current?.focus({ preventScroll: true });
    else if (sent) sentStatusRef.current?.focus({ preventScroll: true });
    else if (!previous.open || previous.sent)
      questionRefs.current[qi]
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus({ preventScroll: true });
  }, [open, sent, qi]);

  useEffect(() => {
    const focused = document.activeElement;
    const previousQuestion = questionRefs.current.find(
      (item, index) => index !== qi && item?.contains(focused)
    );
    if (previousQuestion)
      questionRefs.current[qi]
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus({ preventScroll: true });
  }, [qi]);

  useEffect(() => {
    setQi((current) => Math.max(0, Math.min(current, questions.length - 1)));
  }, [questions.length]);

  useEffect(() => {
    const id = requestAnimationFrame(() => sync(measured.current));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi]);

  useEffect(() => {
    const item = questionRefs.current[qi];
    if (!item || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => sync(false));
    observer.observe(item);
    return () => observer.disconnect();
  }, [qi, open, sent, questions]);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  const goTo = (next: number) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setQi(Math.max(0, Math.min(Math.max(next, 0), questions.length - 1)));
  };

  const send = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setSent(true);
    onSubmitted?.(answersRef.current, customRef.current);
  };

  const advance = () => {
    if (last) send();
    else goTo(qi + 1);
  };

  const toggle = (index: number) => {
    const type = questions[qi]?.type ?? "radio";
    const current = answersRef.current;
    const picked = current[qi] ?? [];
    const next =
      type === "radio"
        ? [index]
        : picked.includes(index)
        ? picked.filter((item) => item !== index)
        : [...picked, index];
    const updated = { ...current, [qi]: next };
    answersRef.current = updated;
    setAnswers(updated);
    onAnswerChange?.(qi, next);
    if (type === "radio") {
      setCustom((curr) => ({ ...curr, [qi]: "" }));
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        if (last) send();
        else setQi((curr) => Math.min(questions.length - 1, curr + 1));
      }, 480);
    }
  };

  const reset = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setQi(0);
    setAnswers({});
    setCustom({});
    setSent(false);
    setOpen(true);
    measured.current = false;
  };

  if (questions.length === 0)
    return (
      <div role="status" className="text-[13px] text-muted-foreground p-4">
        No questions to approve.
      </div>
    );

  if (!open) {
    return (
      <button
        ref={reopenRef}
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-[8px] bg-[var(--mova-ai-surface,#fff)] px-3 py-2 text-[12.5px] font-medium text-[var(--mova-ai-ink,#202020)] shadow-[var(--mova-ai-shadow-btn,none)] transition-colors duration-150 hover:bg-[var(--mova-ai-hover,#f1f1f1)]"
      >
        Open approval
      </button>
    );
  }

  if (sent) {
    return (
      <div
        ref={sentStatusRef}
        tabIndex={-1}
        role="status"
        className="flex w-full max-w-80 flex-wrap items-center gap-3"
        style={{
          animation: "mova-ai-approval-card-pop-in 260ms cubic-bezier(0.23,1,0.32,1) both",
        }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--mova-ai-success-tint,#e8f3ec)] py-1 pr-2.5 pl-1 text-[12.5px] font-medium text-[var(--mova-ai-success,#28734d)]">
          <span className="flex size-4.5 items-center justify-center rounded-full bg-[var(--mova-ai-success,#28734d)] text-white">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          {t.sentMessage}
        </span>
        {resettable && (
          <button
            type="button"
            onClick={reset}
            className="text-[12px] font-medium text-[var(--mova-ai-ink-muted,#858585)] transition-colors duration-150 hover:text-[var(--mova-ai-ink,#202020)]"
          >
            Start over
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-80">
      <div
        className="relative overflow-hidden rounded-lg border border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-surface,#fff)] text-[color:var(--mova-ai-ink,#202020)] shadow-[var(--mova-ai-shadow-card,none)]"
        style={{
          animation: "mova-ai-approval-card-fade-up 380ms cubic-bezier(0.23,1,0.32,1) both",
        }}
      >
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            if (advanceTimer.current) clearTimeout(advanceTimer.current);
            setOpen(false);
          }}
          className="primitive-icon-button absolute right-2.5 top-2.5 z-10 text-[var(--mova-ai-ink-muted,#858585)] transition-colors duration-100 hover:bg-[var(--mova-ai-hover,#f1f1f1)] hover:text-[var(--mova-ai-ink,#202020)]"
        >
          <Ico size={14} sw={2.2} path={<path d="M18 6L6 18M6 6l12 12" />} />
        </button>
        <div className="primitive-card-pad">
          <div
            className="overflow-hidden"
            style={{
              height: viewportH,
              transition: animate ? `height ${SLIDE}` : undefined,
            }}
            aria-live="polite"
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 26,
                transform: `translate3d(0, ${-trackY}px, 0)`,
                transition: animate ? `transform ${SLIDE}` : undefined,
                willChange: "transform",
              }}
            >
              {questions.map((question, qIdx) => {
                const active = qIdx === qi;
                if (!ready && !active) return null;
                const picked = answers[qIdx] ?? [];
                const questionStyle: CSSProperties = {
                  opacity: active ? 1 : 0,
                  transition: animate ? `opacity ${SLIDE}` : undefined,
                  pointerEvents: active ? undefined : "none",
                };
                return (
                  <div
                    key={qIdx}
                    ref={(el) => {
                      questionRefs.current[qIdx] = el;
                    }}
                    aria-hidden={active ? undefined : true}
                    style={questionStyle}
                  >
                    <div className="pr-7 text-[14px] font-medium text-[var(--mova-ai-ink,#202020)]">
                      {question.q}
                    </div>
                    <GlideMenu
                      className="mt-2.5 flex flex-col gap-1"
                      highlightClassName="inset-x-0 rounded-[8px] bg-[var(--mova-ai-hover,#f1f1f1)]"
                    >
                      {question.options.map((option, i) => {
                        const on = picked.includes(i);
                        return (
                          <button
                            key={option}
                            type="button"
                            data-menu-row
                            aria-pressed={on}
                            tabIndex={active ? 0 : -1}
                            onClick={() => {
                              if (active) toggle(i);
                            }}
                            className="relative z-10 flex items-center gap-1.5 rounded-[8px] pl-1 pr-2 py-1 text-left transition-colors duration-100"
                          >
                            <span
                              className={`flex size-4 shrink-0 items-center justify-center transition-colors duration-200
                                ${question.type === "radio" ? "rounded-full" : "rounded-[5px]"}
                                ${
                                  on
                                    ? "bg-[var(--mova-ai-ink,#202020)] text-[var(--mova-ai-canvas,#f4f4f4)]"
                                    : "shadow-[inset_0_0_0_1.5px_var(--mova-ai-border-strong,#c8c8c8)] text-transparent"
                                }`}
                            >
                              {question.type === "radio" ? (
                                <span
                                  className="size-1.5 rounded-full bg-[var(--mova-ai-canvas,#f4f4f4)] transition-transform duration-200"
                                  style={{ transform: on ? "scale(1)" : "scale(0)" }}
                                />
                              ) : (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              )}
                            </span>
                            <span
                              className={`text-[13px] leading-snug transition-colors duration-200 ${
                                on
                                  ? "text-[var(--mova-ai-ink,#202020)]"
                                  : "text-[var(--mova-ai-ink-secondary,#666)]"
                              }`}
                            >
                              {option}
                            </span>
                          </button>
                        );
                      })}
                      <label
                        data-menu-row
                        className="relative z-10 flex items-center gap-1.5 rounded-[8px] pl-1 pr-2 py-1 transition-colors duration-100"
                      >
                        <input
                          value={custom[qIdx] ?? ""}
                          tabIndex={active ? 0 : -1}
                          onChange={(event) => {
                            if (!active) return;
                            if (advanceTimer.current) clearTimeout(advanceTimer.current);
                            setCustom((curr) => ({ ...curr, [qIdx]: event.target.value }));
                            if (question.type === "radio")
                              setAnswers((curr) => ({ ...curr, [qIdx]: [] }));
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" && hasAnswer) {
                              event.preventDefault();
                              advance();
                            }
                          }}
                          placeholder={t.customPlaceholder}
                          aria-label="Custom answer"
                          className="min-w-0 flex-1 bg-transparent pl-1.5 text-[13px] text-[var(--mova-ai-ink,#202020)] outline-none placeholder:text-[var(--mova-ai-ink-muted,#858585)]"
                        />
                      </label>
                    </GlideMenu>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* footer — step nav (rolling counter) + pill actions */}
        <div className="primitive-card-footer flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[var(--mova-ai-ink-muted,#858585)]">
            <button
              type="button"
              aria-label="Previous question"
              disabled={qi <= 0}
              onClick={() => goTo(qi - 1)}
              className="flex size-[18px] items-center justify-center rounded-[5px] transition-colors duration-100 enabled:hover:text-[var(--mova-ai-ink,#202020)] disabled:opacity-30"
            >
              <Ico size={14} path={<path d="M18 15l-6-6-6 6" />} />
            </button>
            <span
              className="inline-flex items-center text-[12px] font-medium tabular-nums text-[var(--mova-ai-ink-muted,#858585)]"
              style={{ letterSpacing: "-0.1px", lineHeight: 1 }}
            >
              <RollingDigits value={`${qi + 1} / ${questions.length}`} />
            </span>
            <button
              type="button"
              aria-label="Next question"
              disabled={last}
              onClick={() => goTo(qi + 1)}
              className="flex size-[18px] items-center justify-center rounded-[5px] transition-colors duration-100 enabled:hover:text-[var(--mova-ai-ink,#202020)] disabled:opacity-30"
            >
              <Ico size={14} path={<path d="M6 9l6 6 6-6" />} />
            </button>
          </div>

          <div className="-mr-0.5 flex items-center gap-1.5">
            <ApprovalButton
              variant="ghost"
              size="sm"
              onClick={() => {
                if (advanceTimer.current) clearTimeout(advanceTimer.current);
                if (last) setOpen(false);
                else goTo(qi + 1);
              }}
            >
              {t.skip}
            </ApprovalButton>
            <ApprovalButton
              variant="accent"
              size="sm"
              disabled={!hasAnswer}
              onClick={advance}
            >
              {last ? t.send : t.continue}
            </ApprovalButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const scopedStyles = `
.mova-ai-approval-card{--approval-action-bg:#454545;--approval-action-fg:#fff;--approval-action-hover:#333;--approval-action-disabled-bg:#e9e9e9;--approval-action-disabled-fg:#858585}
.mova-ai-approval-card[data-theme="dark"]{--approval-action-bg:#f5f5f5;--approval-action-fg:#202020;--approval-action-hover:#fff;--approval-action-disabled-bg:#3b3b3b;--approval-action-disabled-fg:#929292}
.mova-ai-approval-card .approval-accent{background-color:var(--approval-action-bg);color:var(--approval-action-fg)}
.mova-ai-approval-card .approval-accent:not(:disabled):hover{background-color:var(--approval-action-hover)}
.mova-ai-approval-card .approval-accent:disabled{background-color:var(--approval-action-disabled-bg);color:var(--approval-action-disabled-fg);opacity:1}
.mova-ai-approval-card .primitive-card-pad{padding:12px}
.mova-ai-approval-card .primitive-card-bar{padding:10px 12px}
.mova-ai-approval-card .primitive-card-footer{padding:10px}
.mova-ai-approval-card .primitive-icon-button{display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:8px}
.mova-ai-approval-card :is(button,input,[tabindex]):focus-visible{outline:2px solid var(--mova-ai-accent,#454545)!important;outline-offset:2px}
.mova-ai-approval-card button:not(:disabled){cursor:pointer}
.mova-ai-approval-card code{overflow-wrap:anywhere}
.mova-ai-approval-card *, .mova-ai-approval-card *::before,.mova-ai-approval-card *::after{box-sizing:border-box}
@keyframes mova-ai-approval-card-pop-in{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes mova-ai-approval-card-fade-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes mova-ai-approval-card-shimmer-text{from{background-position:150% center}to{background-position:-50% center}}
@media(prefers-reduced-motion:reduce){.mova-ai-approval-card *, .mova-ai-approval-card *::before, .mova-ai-approval-card *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;

export function AIApprovalCard({
  theme = "light",
  ...props
}: ApprovalCardProps) {
  return (
    <div className="mova-ai-theme mova-ai-approval-card" data-theme={theme}>
      <style>{AI_THEME_STYLES}{scopedStyles}</style>
      <ApprovalCard {...props} />
    </div>
  );
}

export default AIApprovalCard;
