"use client";

// SPDX-License-Identifier: MIT
// Adapted from Beautiful UI, Copyright (c) 2026 Shane Levine.
// Original composer geometry, controls, glide motion, and rainbow sweep are retained.
// Migrated to 100% local implementation with zero external shader/glimm dependencies.

import React, { useEffect, useLayoutEffect, useRef, useState, useId } from "react";

type SpeechRecognizer = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};

const AI_THEME_STYLES = `/* Shared public tokens for the standalone AI component family. */
.mova-ai-theme {
  color-scheme: light;
  color: var(--mova-ai-ink, #202020);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: -0.01em;

  --mova-ai-page: #f7f7f7;
  --mova-ai-canvas: #f4f4f4;
  --mova-ai-surface: #ffffff;
  --mova-ai-inset: #f8f8f8;
  --mova-ai-hover: #f1f1f1;
  --mova-ai-hover-strong: #e9e9e9;

  --mova-ai-ink: #202020;
  --mova-ai-ink-secondary: #666666;
  --mova-ai-ink-muted: #858585;

  --mova-ai-border: #dedede;
  --mova-ai-border-soft: #ededed;
  --mova-ai-border-strong: #c8c8c8;
  --mova-ai-field: #f6f6f6;
  --mova-ai-grid: color-mix(in srgb, var(--mova-ai-border) 78%, transparent);
  --mova-ai-stripe: rgb(32 35 38 / 7%);
  --mova-ai-stripe-bg: #242424;

  --mova-ai-accent: #454545;
  --mova-ai-accent-ink: #333333;
  --mova-ai-accent-foreground: #ffffff;
  --mova-ai-accent-tint: #eeeeee;
  --mova-ai-success: #28734d;
  --mova-ai-success-tint: #e8f3ec;
  --mova-ai-warning: #986517;
  --mova-ai-warning-tint: #f8f0df;
  --mova-ai-danger: #a33c3c;
  --mova-ai-danger-tint: #f7eaea;
  --mova-ai-info: #496b89;
  --mova-ai-info-tint: #eaf0f5;
  --mova-ai-neutral-status: #69737d;
  --mova-ai-status-on: #ffffff;

  --mova-ai-tooltip-bg: #292929;
  --mova-ai-tooltip-fg: #f6f6f6;
  --mova-ai-tooltip-muted: #c3c3c3;
  --mova-ai-tooltip-border: #484848;

  --mova-ai-radius-panel: 8px;
  --mova-ai-radius-control: 8px;
  --mova-ai-shadow-xs: 0 1px 2px rgb(22 28 33 / 5%);
  --mova-ai-shadow-sm: 0 2px 8px rgb(22 28 33 / 7%);
  --mova-ai-shadow-md: 0 8px 20px rgb(22 28 33 / 11%);
  --mova-ai-shadow-lg: 0 14px 32px rgb(22 28 33 / 15%);
  --mova-ai-shadow-hairline: 0 0 0 1px var(--mova-ai-border);
  --mova-ai-shadow-btn: 0 0 0 1px var(--mova-ai-border-strong), var(--mova-ai-shadow-xs);
  --mova-ai-shadow-card: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-sm);
  --mova-ai-shadow-raised: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-md);
  --mova-ai-shadow-overlay: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-lg);
  --mova-ai-shadow-inset-field: inset 0 1px 2px rgb(22 28 33 / 12%);
}

.mova-ai-theme[data-theme="dark"] {
  color-scheme: dark;
  --mova-ai-page: #181818;
  --mova-ai-canvas: #202020;
  --mova-ai-surface: #272727;
  --mova-ai-inset: #1d1d1d;
  --mova-ai-hover: #2d2d2d;
  --mova-ai-hover-strong: #393939;

  --mova-ai-ink: #eeeeee;
  --mova-ai-ink-secondary: #b5b5b5;
  --mova-ai-ink-muted: #929292;

  --mova-ai-border: #3b3b3b;
  --mova-ai-border-soft: #303030;
  --mova-ai-border-strong: #505050;
  --mova-ai-field: #2c2c2c;
  --mova-ai-grid: color-mix(in srgb, var(--mova-ai-border) 78%, transparent);
  --mova-ai-stripe: rgb(255 255 255 / 6%);
  --mova-ai-stripe-bg: #202528;

  --mova-ai-accent: #c2c2c2;
  --mova-ai-accent-ink: #d5d5d5;
  --mova-ai-accent-foreground: #202020;
  --mova-ai-accent-tint: #353535;
  --mova-ai-success: #88c7a0;
  --mova-ai-success-tint: #293b30;
  --mova-ai-warning: #d7b66f;
  --mova-ai-warning-tint: #3c3525;
  --mova-ai-danger: #e5928e;
  --mova-ai-danger-tint: #3c2b2b;
  --mova-ai-info: #9bbbd6;
  --mova-ai-info-tint: #293541;
  --mova-ai-neutral-status: #a0a0a0;
  --mova-ai-status-on: #181818;

  --mova-ai-tooltip-bg: #121212;
  --mova-ai-tooltip-fg: #eeeeee;
  --mova-ai-tooltip-muted: #b5b5b5;
  --mova-ai-tooltip-border: #3b3b3b;

  --mova-ai-shadow-xs: 0 1px 2px rgb(0 0 0 / 22%);
  --mova-ai-shadow-sm: 0 2px 8px rgb(0 0 0 / 25%);
  --mova-ai-shadow-md: 0 8px 20px rgb(0 0 0 / 30%);
  --mova-ai-shadow-lg: 0 14px 32px rgb(0 0 0 / 38%);
  --mova-ai-shadow-hairline: 0 0 0 1px var(--mova-ai-border);
  --mova-ai-shadow-btn: 0 0 0 1px var(--mova-ai-border-strong), var(--mova-ai-shadow-xs);
  --mova-ai-shadow-card: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-sm);
  --mova-ai-shadow-raised: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-md);
  --mova-ai-shadow-overlay: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-lg);
  --mova-ai-shadow-inset-field: inset 0 1px 2px rgb(0 0 0 / 42%);
}
`;

const COMPONENT_STYLES = `
[data-mova-prompt] button:focus-visible { outline:2px solid var(--mova-ai-accent,#454545);outline-offset:2px; }
[data-mova-prompt] :is(input,textarea):focus-visible { outline:none; }
[data-mova-prompt] .prompt-composer:focus-within { outline:2px solid var(--mova-ai-accent,#454545);outline-offset:2px; }
[data-mova-prompt] button { cursor:pointer; } [data-mova-prompt] button:disabled { cursor:default; }

@keyframes mova-prompt-pop {from {opacity:0;transform:scale(.95)} to {opacity:1;transform:scale(1)}}
@keyframes mova-prompt-eq {0%,100% {transform:scaleY(.35)} 50% {transform:scaleY(1)}}
@media(prefers-reduced-motion:reduce) { [data-mova-prompt], [data-mova-prompt] * {animation:none!important;transition:none!important;scroll-behavior:auto!important;} }
`;

function Icon({
  children,
  size = 15,
  strokeWidth = 1.8,
}: {
  children: React.ReactNode;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const GLYPHS: Record<string, React.ReactNode> = {
  clip: (
    <path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  layers: (
    <g>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </g>
  ),
  globe: (
    <g>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </g>
  ),
};

const BRANDS: Record<string, React.ReactNode> = {
  figma: (
    <svg width="11" height="16" viewBox="0 0 38 57" aria-hidden="true">
      <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19z" fill="#0ACF83" />
      <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF" />
      <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E" />
      <path d="M19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z" fill="#FF7262" />
      <path d="M38 28.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z" fill="#1ABCFE" />
    </svg>
  ),
  slack: (
    <svg width="15" height="15" viewBox="0 0 127 127" aria-hidden="true">
      <path
        d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"
        fill="#E01E5A"
      />
      <path
        d="M47 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.7 39.7.8 47 .8c7.3 0 13.2 5.9 13.2 13.2v13.2H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.3.7 54.4.7 47.1c0-7.3 5.9-13.2 13.2-13.2H47z"
        fill="#36C5F0"
      />
      <path
        d="M99.9 47.1c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V47.1zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.9C66.9 6.6 72.8.7 80.1.7c7.3 0 13.2 5.9 13.2 13.2v33.2z"
        fill="#2EB67D"
      />
      <path
        d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z"
        fill="#ECB22E"
      />
    </svg>
  ),
  gmail: (
    <svg width="15" height="12" viewBox="0 0 256 193" aria-hidden="true">
      <path
        d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z"
        fill="#4285F4"
      />
      <path
        d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798v98.91Z"
        fill="#34A853"
      />
      <path
        d="m58.182 93.14-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.669 34.992-4.669 40.644L128 145.504 58.182 93.14Z"
        fill="#EA4335"
      />
      <path
        d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z"
        fill="#FBBC04"
      />
      <path
        d="m0 49.504 26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z"
        fill="#C5221F"
      />
    </svg>
  ),
};

export type AIPromptSource = {
  key: string;
  name: string;
  desc: string;
  glyph?: string;
  brand?: string;
  attach?: boolean;
  connect?: boolean;
};

export const DEFAULT_PROMPT_SOURCES: AIPromptSource[] = [
  { key: "attach", name: "Add photos & files", desc: "Upload from your computer", glyph: "clip", attach: true },
  { key: "scoop", name: "Scoop Data", desc: "Sales & churn metrics", glyph: "chart" },
  { key: "flavors", name: "Flavor records", desc: "26 makers, tags, links", glyph: "layers" },
  { key: "web", name: "Web search", desc: "Real-time news and info", glyph: "globe" },
  { key: "figma", name: "Figma", desc: "Design-to-code workflows", brand: "figma" },
  { key: "slack", name: "Slack", desc: "Read and manage Slack", brand: "slack" },
  { key: "gmail", name: "Gmail", desc: "Read and manage Gmail", brand: "gmail", connect: true },
];

export const DEFAULT_PROMPT_COMMANDS = [
  { key: "compare", name: "/compare", desc: "Flavor vs. last summer" },
  { key: "churn-plan", name: "/churn-plan", desc: "Draft a churn schedule" },
  { key: "restock", name: "/restock", desc: "Build a reorder list" },
  { key: "draft-email", name: "/draft-email", desc: "Write a supplier email" },
  { key: "summarize", name: "/summarize", desc: "Digest the thread so far" },
];

export const DEFAULT_PROMPT_MODELS = [
  { key: "sprinkles-5", name: "Sprinkles 5", tag: "Flagship" },
  { key: "vanilla-1", name: "Vanilla 1", tag: "Basic" },
  { key: "freezer-burn", name: "Freezer Burn 0.4", tag: "Stale" },
];

const AUTO_STEPS: {
  draft: string;
  active?: number;
  connect?: boolean;
  modelOpen?: boolean;
  model?: string;
  hold: number;
}[] = [
  { draft: "", connect: false, model: "vanilla-1", hold: 1100 },
  { draft: "@", active: 0, hold: 900 },
  { draft: "@", active: 1, hold: 620 },
  { draft: "@", active: 4, hold: 620 },
  { draft: "@", active: 6, hold: 700 },
  { draft: "@", active: 6, connect: true, hold: 1000 },
  { draft: "", hold: 700 },
  { draft: "/", active: 0, hold: 900 },
  { draft: "/", active: 1, hold: 620 },
  { draft: "/", active: 3, hold: 1000 },
  { draft: "", hold: 800 },
  { draft: "", modelOpen: true, hold: 1200 },
  { draft: "", model: "sprinkles-5", hold: 2400 },
  { draft: "", hold: 900 },
];

function parseToken(draft: string): { kind: "at" | "slash"; query: string; start: number } | null {
  const match = /(^|\s)([@/])([\w-]*)$/.exec(draft);
  if (!match) return null;
  return {
    kind: match[2] === "@" ? "at" : "slash",
    query: match[3].toLowerCase(),
    start: match.index + match[1].length,
  };
}

export interface AIPromptBarProps {
  theme?: "dark" | "light";
  className?: string;
  variant?: "Rounded" | "Pill" | string;
  demo?: boolean;
  tall?: boolean;
  placeholder?: string;
  onSend?: (
    text: string,
    submission: {
      files: File[];
      sources: Array<{ key: string; name: string; desc: string }>;
      model: { key: string; name: string; tag: string };
    }
  ) => void;
}

export function AIPromptBar({
  theme = "dark",
  className = "",
  variant = "Rounded",
  demo = true,
  tall = false,
  placeholder,
  onSend,
}: AIPromptBarProps) {
  const sourceMenuId = useId();
  const modelMenuId = useId();
  const [feedback, setFeedback] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognizer | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pill = variant === "Pill";
  const [draft, setDraft] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [model, setModel] = useState(DEFAULT_PROMPT_MODELS[1]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedSources, setSelectedSources] = useState<AIPromptSource[]>([]);
  const [connected, setConnected] = useState(false);
  const [active, setActive] = useState(0);
  const [listening, setListening] = useState(false);
  const [auto, setAuto] = useState(demo);
  const [autoStep, setAutoStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const wide = expanded || tall;
  const [rowBox, setRowBox] = useState<{ top: number; height: number } | null>(null);
  const [engaged, setEngaged] = useState(false);
  const [modelBox, setModelBox] = useState<{ top: number; height: number } | null>(null);
  const [modelHovered, setModelHovered] = useState<number | null>(null);
  const [modelMenuLeft, setModelMenuLeft] = useState(0);
  const [modelMenuBottom, setModelMenuBottom] = useState(0);
  const composerAnchorRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const modelRef = useRef<HTMLButtonElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const modelRowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const glimmRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const takeOver = (event: { target: EventTarget | null }) => {
    setAuto(false);
    if (auto && event.target === inputRef.current) setDraft("");
  };

  const token = dismissed ? null : parseToken(draft);
  const menu: "at" | "slash" | null = plusOpen ? "at" : token?.kind ?? null;
  const query = plusOpen ? "" : token?.query ?? "";

  const rows =
    menu === "at"
      ? DEFAULT_PROMPT_SOURCES.filter((s) => s.name.toLowerCase().includes(query))
      : menu === "slash"
      ? DEFAULT_PROMPT_COMMANDS.filter((c) => c.name.slice(1).startsWith(query))
      : [];

  useEffect(() => {
    setActive(0);
    setEngaged(false);
  }, [menu, query]);

  useLayoutEffect(() => {
    const target = rowRefs.current[active];
    if (target) setRowBox({ top: target.offsetTop, height: target.offsetHeight });
  }, [menu, query, active, connected, rows.length]);

  const modelIndex = DEFAULT_PROMPT_MODELS.findIndex((m) => m.key === model.key);
  useLayoutEffect(() => {
    if (!modelOpen) return;
    const target = modelRowRefs.current[modelHovered ?? modelIndex];
    if (target) setModelBox({ top: target.offsetTop, height: target.offsetHeight });
  }, [modelOpen, modelHovered, modelIndex]);

  useLayoutEffect(() => {
    if (!modelOpen || !composerAnchorRef.current || !modelRef.current) return;
    const reposition = () => {
      const anchorRect = composerAnchorRef.current?.getBoundingClientRect();
      const triggerRect = modelRef.current?.getBoundingClientRect();
      if (!anchorRect || !triggerRect) return;
      const menuWidth = modelMenuRef.current?.offsetWidth ?? 208;
      setModelMenuLeft(
        Math.max(0, Math.min(triggerRect.left - anchorRect.left, anchorRect.width - menuWidth))
      );
      setModelMenuBottom(anchorRect.bottom - triggerRect.top + 8);
    };
    reposition();
    const observer = new ResizeObserver(reposition);
    observer.observe(composerAnchorRef.current);
    window.addEventListener("resize", reposition);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", reposition);
    };
  }, [modelOpen, wide, model.name]);

  useEffect(() => {
    if (!modelOpen) setModelHovered(null);
  }, [modelOpen]);

  // ── Local Canvas Rainbow Beam Sweep (100% Zero Outside Dependencies) ──
  const celebrate = () => {
    const canvas = glimmRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, rect.width * dpr);
    canvas.height = Math.max(1, rect.height * dpr);

    const startTime = performance.now();
    const duration = 650; // ms

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const w = rect.width;
      const h = rect.height;
      const beamWidth = Math.max(120, w * 0.45);
      const centerX = -beamWidth + (w + beamWidth * 2) * ease;
      const alpha = Math.sin(progress * Math.PI) * 0.55;

      const grad = ctx.createLinearGradient(centerX - beamWidth / 2, 0, centerX + beamWidth / 2, h);
      grad.addColorStop(0, "rgba(255, 60, 60, 0)");
      grad.addColorStop(0.15, `rgba(255, 75, 75, ${alpha})`);
      grad.addColorStop(0.3, `rgba(255, 175, 40, ${alpha * 1.1})`);
      grad.addColorStop(0.45, `rgba(255, 235, 60, ${alpha * 1.2})`);
      grad.addColorStop(0.6, `rgba(40, 220, 130, ${alpha * 1.1})`);
      grad.addColorStop(0.75, `rgba(30, 180, 255, ${alpha})`);
      grad.addColorStop(0.9, `rgba(180, 60, 255, ${alpha * 0.9})`);
      grad.addColorStop(1, "rgba(220, 60, 210, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  const selectModel = (next: (typeof DEFAULT_PROMPT_MODELS)[number]) => {
    setModel(next);
    setModelOpen(false);
    if (next.key === "sprinkles-5") celebrate();
  };

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const step = AUTO_STEPS[autoStep % AUTO_STEPS.length];
    setDraft(step.draft);
    if (step.active !== undefined) setActive(step.active);
    if (step.connect !== undefined) setConnected(step.connect);
    if (step.modelOpen !== undefined) setModelOpen(step.modelOpen);
    if (step.model) {
      const next = DEFAULT_PROMPT_MODELS.find((m) => m.key === step.model);
      if (next) selectModel(next);
    }
    const t = setTimeout(() => setAutoStep((s) => s + 1), step.hold);
    return () => clearTimeout(t);
  }, [auto, autoStep]);

  const toggleDictation = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const speechWindow = window as Window & {
      SpeechRecognition?: new () => SpeechRecognizer;
      webkitSpeechRecognition?: new () => SpeechRecognizer;
    };
    const Recognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setFeedback(
        "Dictation is unavailable in this browser. You can type your message instead."
      );
      return;
    }
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = navigator.language;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setDraft((current) => `${current.trimEnd()} ${text}`.trimStart());
      setFeedback("Dictation added to your message.");
    };
    recognition.onend = () => {
      setListening(false);
      inputRef.current?.focus();
    };
    recognition.onerror = () => {
      setListening(false);
      setFeedback(
        "Dictation could not start. Check microphone access or type your message."
      );
    };
    try {
      recognition.start();
      setListening(true);
      setFeedback("Listening through your microphone…");
    } catch {
      setListening(false);
      setFeedback("Dictation is unavailable right now.");
    }
  };

  useLayoutEffect(() => {
    const input = inputRef.current;
    const controls = controlsRef.current;
    const measure = measureRef.current;
    const modelButton = modelRef.current;
    if (!input || !controls || !measure || !modelButton) return;

    const fixedControlsWidth = 28 * 3 + modelButton.offsetWidth;
    const inlineGaps = 4 * 4;
    const inlineInputWidth = controls.clientWidth - fixedControlsWidth - inlineGaps;
    const needsFullWidth =
      draft.includes("\n") || measure.offsetWidth + 8 > inlineInputWidth;
    if (needsFullWidth !== expanded) {
      setExpanded(needsFullWidth);
    }

    const minHeight = 28;
    const maxHeight = 100;
    input.style.height = "0px";
    const contentHeight = input.scrollHeight;
    input.style.height = `${Math.min(Math.max(contentHeight, minHeight), maxHeight)}px`;
    input.style.overflowY = contentHeight > maxHeight ? "auto" : "hidden";
  }, [draft, expanded]);

  useEffect(() => {
    if (!modelOpen && !plusOpen) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setDismissed(true);
        setModelOpen(false);
        setPlusOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [modelOpen, plusOpen]);

  const closeMenus = () => {
    setPlusOpen(false);
    setModelOpen(false);
  };

  const pick = (row: { key: string; name: string }) => {
    const source = DEFAULT_PROMPT_SOURCES.find((s) => s.key === row.key);
    if (source?.attach) {
      fileRef.current?.click();
      if (token) setDraft(draft.slice(0, token.start));
    } else if (menu === "at") {
      if (source)
        setSelectedSources((curr) =>
          curr.some((item) => item.key === source.key) ? curr : [...curr, source]
        );
      if (source?.connect) {
        setConnected(true);
        setFeedback(
          `${source.name} selected for this demo. Connect your account in your app to use live data.`
        );
      }
      setDraft(`${token ? draft.slice(0, token.start) : draft}@${row.name} `);
    } else {
      setDraft(`${token ? draft.slice(0, token.start) : draft}${row.name} `);
    }
    setPlusOpen(false);
    setDismissed(false);
    inputRef.current?.focus();
  };

  const canSend = draft.trim().length > 0 || attachments.length > 0;
  const send = () => {
    if (!canSend) return;
    onSend?.(draft.trim(), {
      files: [...attachments],
      sources: selectedSources
        .filter((source) => draft.includes(`@${source.name}`))
        .map(({ key, name, desc }) => ({ key, name, desc })),
      model: { ...model },
    });
    setFeedback(
      `Sent${
        attachments.length
          ? ` with ${attachments.length} attachment${
              attachments.length === 1 ? "" : "s"
            }`
          : ""
      }: ${draft.trim() || attachments.map((file) => file.name).join(", ")}`
    );
    setDraft("");
    setAttachments([]);
    setSelectedSources([]);
    closeMenus();
  };

  return (
    <div
      ref={rootRef}
      data-mova-prompt
      data-theme={theme}
      data-promptbar
      className={`mova-ai-theme ${
        demo
          ? "flex min-h-[384px] w-full max-w-[420px] flex-col justify-end pb-8"
          : "w-full"
      } ${className}`}
      onPointerDownCapture={takeOver}
      onKeyDownCapture={(event) => {
        takeOver(event);
        if (event.key === "Escape") {
          event.stopPropagation();
          setDismissed(true);
          closeMenus();
          inputRef.current?.focus();
        }
      }}
    >
      <style>{AI_THEME_STYLES}{COMPONENT_STYLES}</style>
      <input
        ref={fileRef}
        type="file"
        multiple
        className="hidden"
        aria-label="Attach files"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          setAttachments((curr) => [...curr, ...files]);
          setFeedback(
            `${files.length} file${files.length === 1 ? "" : "s"} attached.`
          );
          event.target.value = "";
          inputRef.current?.focus();
        }}
      />
      <div ref={composerAnchorRef} className="relative">
        {/* @ / slash menu */}
        {menu && (
          <div
            id={sourceMenuId}
            role="listbox"
            aria-label="Sources and commands"
            onMouseLeave={() => setEngaged(false)}
            className="absolute inset-x-0 bottom-full z-10 mb-2 max-h-[min(320px,60dvh)] overflow-y-auto rounded-[10px] bg-[var(--mova-ai-surface,#fff)] p-1 shadow-[var(--mova-ai-shadow-raised,none)]"
            style={{
              animation: "mova-prompt-pop 180ms cubic-bezier(0.23,1,0.32,1) both",
              transformOrigin: "bottom center",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-1 rounded-[6px] bg-[var(--mova-ai-hover,#f1f1f1)]"
              style={{
                top: rowBox?.top ?? 0,
                height: rowBox?.height ?? 0,
                opacity: rowBox && engaged && rows.length > 0 ? 1 : 0,
                transition:
                  "top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease",
              }}
            />
            {rows.map((row, i) => {
              const source =
                menu === "at"
                  ? DEFAULT_PROMPT_SOURCES.find((s) => s.key === row.key)
                  : undefined;
              return (
                <button
                  key={row.key}
                  id={`${sourceMenuId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  type="button"
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => {
                    setActive(i);
                    setEngaged(true);
                  }}
                  onFocus={() => {
                    setActive(i);
                    setEngaged(true);
                  }}
                  onClick={() => pick(row)}
                  className="relative z-10 flex h-9 w-full items-center gap-2.5 rounded-[6px] px-2 text-left"
                >
                  {source && (
                    <span className="flex size-5.5 shrink-0 items-center justify-center text-[var(--mova-ai-ink-secondary,#666)]">
                      {source.brand ? (
                        BRANDS[source.brand]
                      ) : (
                        <Icon size={15}>{GLYPHS[source.glyph ?? "clip"]}</Icon>
                      )}
                    </span>
                  )}
                  <span className="shrink-0 text-[12.5px] font-medium text-[var(--mova-ai-ink,#202020)]">
                    {row.name}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-[var(--mova-ai-ink-muted,#858585)]">
                    {row.desc}
                  </span>
                  {source?.connect && (
                    <span
                      className={`shrink-0 text-[12px] font-medium transition-colors duration-100 ${
                        connected
                          ? "text-[var(--mova-ai-success,#28734d)]"
                          : "text-[var(--mova-ai-accent-ink,#333)] hover:underline"
                      }`}
                    >
                      {connected ? "Connected" : "Connect"}
                    </span>
                  )}
                </button>
              );
            })}
            {rows.length === 0 && (
              <div className="flex h-9 items-center px-2 text-[12px] text-[var(--mova-ai-ink-muted,#858585)]">
                No matches for “{query}”
              </div>
            )}
            <div className="mt-1 border-t border-[var(--mova-ai-border,#dedede)] px-2 pt-1.5 pb-1 text-[11px] text-[var(--mova-ai-ink-muted,#858585)]">
              {menu === "at"
                ? "Type to search sources & files"
                : "Type to search commands"}
            </div>
          </div>
        )}

        {/* Model menu */}
        {modelOpen && (
          <div
            ref={modelMenuRef}
            id={modelMenuId}
            role="group"
            aria-label="Available models"
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                const current = modelRowRefs.current.indexOf(
                  document.activeElement as HTMLButtonElement
                );
                modelRowRefs.current[
                  (current +
                    (event.key === "ArrowDown" ? 1 : DEFAULT_PROMPT_MODELS.length - 1)) %
                    DEFAULT_PROMPT_MODELS.length
                ]?.focus();
              }
            }}
            onMouseLeave={() => setModelHovered(null)}
            className="absolute z-10 w-52 max-w-full rounded-[10px] bg-[var(--mova-ai-surface,#fff)] p-1 shadow-[var(--mova-ai-shadow-raised,none)]"
            style={{
              left: modelMenuLeft,
              bottom: modelMenuBottom,
              animation: "mova-prompt-pop 180ms cubic-bezier(0.23,1,0.32,1) both",
              transformOrigin: "bottom left",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-1 rounded-[6px] bg-[var(--mova-ai-hover,#f1f1f1)]"
              style={{
                top: modelBox?.top ?? 0,
                height: modelBox?.height ?? 0,
                opacity: modelBox && modelHovered !== null ? 1 : 0,
                transition:
                  "top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease",
              }}
            />
            {DEFAULT_PROMPT_MODELS.map((m, i) => (
              <button
                key={m.key}
                type="button"
                ref={(el) => {
                  modelRowRefs.current[i] = el;
                }}
                onMouseDown={(event) => event.preventDefault()}
                onFocus={() => setModelHovered(i)}
                onMouseEnter={() => setModelHovered(i)}
                onClick={() => {
                  selectModel(m);
                  inputRef.current?.focus();
                }}
                className="relative z-10 flex h-7.5 w-full items-center gap-2 rounded-[6px] px-2 text-left"
              >
                <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-[var(--mova-ai-ink,#202020)]">
                  {m.name}
                </span>
                <span className="shrink-0 text-[11px] text-[var(--mova-ai-ink-muted,#858585)]">
                  {m.tag}
                </span>
                <span
                  className={`shrink-0 text-[var(--mova-ai-ink,#202020)] ${
                    m.key === model.key ? "" : "invisible"
                  }`}
                >
                  <Icon size={13} strokeWidth={2.5}>
                    <path d="M20 6L9 17l-5-5" />
                  </Icon>
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <div
          className={`prompt-composer relative isolate flex flex-col overflow-hidden border border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-surface,#fff)] shadow-[var(--mova-ai-shadow-card,none)] transition-[border-color,border-radius] duration-150 focus-within:border-[var(--mova-ai-border-strong,#c8c8c8)] ${
            tall ? "gap-2.5 p-3.5" : "gap-1.5 p-1.5"
          } ${
            pill
              ? attachments.length > 0 || wide
                ? "rounded-[24px]"
                : "rounded-full"
              : tall
              ? "rounded-[22px]"
              : "rounded-[14px]"
          }`}
        >
          {/* Canvas for Rainbow Sweep */}
          <canvas
            ref={glimmRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            style={{ borderRadius: "inherit" }}
          />
          <span
            ref={measureRef}
            aria-hidden="true"
            className="pointer-events-none absolute invisible whitespace-pre text-[13px] leading-[18px]"
          >
            {draft}
          </span>

          {attachments.length > 0 && (
            <div
              className={`flex flex-wrap gap-1.5 pt-0.5 ${pill ? "px-1" : "px-0.5"}`}
            >
              {attachments.map((file, i) => (
                <span
                  key={`${file.name}-${i}`}
                  className={`flex h-6.5 items-center gap-1.5 bg-[var(--mova-ai-field,#f6f6f6)] py-1 pr-1 pl-1.5 text-[11.5px] text-[var(--mova-ai-ink-secondary,#666)] shadow-[var(--mova-ai-shadow-hairline,none)] ${
                    pill ? "rounded-full" : "rounded-[6px]"
                  }`}
                  style={{
                    animation:
                      "mova-prompt-pop 200ms cubic-bezier(0.23,1,0.32,1) both",
                  }}
                >
                  <Icon size={12}>
                    <g>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </g>
                  </Icon>
                  <span className="max-w-36 truncate">{file.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() =>
                      setAttachments((curr) => curr.filter((_, j) => j !== i))
                    }
                    className={`-my-1 flex size-6 items-center justify-center text-[var(--mova-ai-ink-muted,#858585)] transition-colors duration-100 hover:bg-[color-mix(in_srgb,var(--mova-ai-border,#dedede)_70%,transparent)] hover:text-[var(--mova-ai-ink,#202020)] ${
                      pill ? "rounded-full" : "rounded-[5px]"
                    }`}
                  >
                    <Icon size={10} strokeWidth={2.5}>
                      <path d="M18 6L6 18M6 6l12 12" />
                    </Icon>
                  </button>
                </span>
              ))}
            </div>
          )}

          <div
            ref={controlsRef}
            className={`grid items-end gap-x-1 gap-y-1.5 ${
              wide
                ? "grid-cols-[28px_auto_minmax(0,1fr)_28px_28px]"
                : "grid-cols-[28px_minmax(0,1fr)_auto_28px_28px]"
            }`}
          >
            <button
              type="button"
              aria-label="Add attachments and sources"
              aria-expanded={plusOpen}
              onClick={() => {
                setModelOpen(false);
                setPlusOpen((curr) => !curr);
                inputRef.current?.focus();
              }}
              className={`flex size-7 shrink-0 items-center justify-center justify-self-start text-[var(--mova-ai-ink-muted,#858585)] transition-[background-color,color,transform] duration-150 hover:bg-[var(--mova-ai-hover,#f1f1f1)] hover:text-[var(--mova-ai-ink,#202020)] active:scale-[0.94] ${
                pill ? "rounded-full" : "rounded-[8px]"
              } ${
                plusOpen
                  ? "bg-[var(--mova-ai-hover,#f1f1f1)] text-[var(--mova-ai-ink,#202020)]"
                  : ""
              } ${wide ? "col-start-1 row-start-2" : "col-start-1 row-start-1"}`}
            >
              <Icon size={16} strokeWidth={2}>
                <path d="M12 5v14M5 12h14" />
              </Icon>
            </button>

            <textarea
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setDismissed(false);
                setPlusOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return;
                if (menu && rows.length > 0) {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    setEngaged(true);
                    setActive(
                      (curr) =>
                        (curr + (event.key === "ArrowDown" ? 1 : rows.length - 1)) %
                        rows.length
                    );
                    return;
                  }
                  if (
                    (event.key === "Enter" && !event.shiftKey) ||
                    event.key === "Tab"
                  ) {
                    event.preventDefault();
                    pick(rows[active]);
                    return;
                  }
                }
                if (event.key === "Escape") {
                  setDismissed(true);
                  closeMenus();
                  return;
                }
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  send();
                }
              }}
              placeholder={
                listening ? "Listening…" : placeholder ?? "Write a message…"
              }
              aria-label="Prompt"
              aria-expanded={!!menu}
              aria-controls={menu ? sourceMenuId : undefined}
              aria-activedescendant={
                menu && rows[active] ? `${sourceMenuId}-${active}` : undefined
              }
              className={`${
                tall
                  ? "min-h-[68px] px-2 py-2 text-[14px] leading-5"
                  : "min-h-7 px-1 py-[5px] text-[13px] leading-[18px]"
              } min-w-0 w-full resize-none bg-transparent text-[var(--mova-ai-ink,#202020)] outline-none [overflow-wrap:anywhere] placeholder:text-[var(--mova-ai-ink-muted,#858585)] ${
                wide ? "col-span-full col-start-1 row-start-1" : "col-start-2 row-start-1"
              }`}
            />

            {/* Model picker */}
            <button
              ref={modelRef}
              type="button"
              aria-expanded={modelOpen}
              aria-label="Choose model"
              aria-controls={modelMenuId}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setPlusOpen(false);
                  setDismissed(true);
                  setModelOpen(true);
                  requestAnimationFrame(() =>
                    modelRowRefs.current[modelIndex]?.focus()
                  );
                }
              }}
              onClick={() => {
                setPlusOpen(false);
                setDismissed(true);
                setModelOpen((curr) => !curr);
              }}
              className={`flex h-7 shrink-0 items-center gap-1 px-1.5 text-[12px] font-medium text-[var(--mova-ai-ink-secondary,#666)] transition-colors duration-150 hover:bg-[var(--mova-ai-hover,#f1f1f1)] hover:text-[var(--mova-ai-ink,#202020)] ${
                pill ? "rounded-full" : "rounded-[8px]"
              } ${
                wide
                  ? "col-start-2 row-start-2 justify-self-start"
                  : "col-start-3 row-start-1"
              }`}
            >
              {model.name}
              <span className="text-[var(--mova-ai-ink-muted,#858585)]">
                <Icon size={11} strokeWidth={2.4}>
                  <path d="M6 9l6 6 6-6" />
                </Icon>
              </span>
            </button>

            {/* Dictation */}
            <button
              type="button"
              aria-label={listening ? "Stop dictation" : "Start dictation"}
              aria-pressed={listening}
              onClick={toggleDictation}
              className={`flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-150 active:scale-[0.94] ${
                pill ? "rounded-full" : "rounded-[8px]"
              } ${
                listening
                  ? "bg-[var(--mova-ai-accent-tint,#eee)] text-[var(--mova-ai-accent-ink,#333)]"
                  : "text-[var(--mova-ai-ink-muted,#858585)] hover:bg-[var(--mova-ai-hover,#f1f1f1)] hover:text-[var(--mova-ai-ink,#202020)]"
              } ${wide ? "col-start-4 row-start-2" : "col-start-4 row-start-1"}`}
            >
              {listening ? (
                <span className="flex h-3.5 items-center gap-[2.5px]">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-[2.5px] rounded-full bg-current"
                      style={{
                        height: "100%",
                        animation: `mova-prompt-eq 900ms ease-in-out ${i * 150}ms infinite`,
                      }}
                    />
                  ))}
                </span>
              ) : (
                <Icon size={15} strokeWidth={2}>
                  <g>
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
                  </g>
                </Icon>
              )}
            </button>

            {/* Send */}
            <button
              type="button"
              aria-label="Send"
              disabled={!canSend}
              onClick={send}
              className={`flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.94] ${
                pill ? "rounded-full" : "rounded-[8px]"
              } ${wide ? "col-start-5 row-start-2" : "col-start-5 row-start-1"}`}
              style={{
                background: canSend
                  ? "var(--mova-ai-ink,#202020)"
                  : "var(--mova-ai-border-strong,#c8c8c8)",
                color: canSend
                  ? "var(--mova-ai-surface,#fff)"
                  : "var(--mova-ai-ink-secondary,#666)",
              }}
            >
              <Icon size={16} strokeWidth={2.4}>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </Icon>
            </button>
          </div>
        </div>
      </div>
      <p
        role="status"
        className="mt-2 min-h-4 break-words text-[11px] text-[var(--mova-ai-ink-muted,#858585)]"
      >
        {feedback}
      </p>
    </div>
  );
}

export const PromptBar = AIPromptBar;
export default AIPromptBar;
