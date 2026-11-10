"use client";

import React from "react";

export type SpeechRecognizer = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};

export function Icon({
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

export const GLYPHS: Record<string, React.ReactNode> = {
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

export const BRANDS: Record<string, React.ReactNode> = {
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
  brand?: "figma" | "slack" | "gmail" | string;
  glyph?: "clip" | "chart" | "layers" | "globe" | string;
  attach?: boolean;
  connect?: boolean;
};

export const DEFAULT_PROMPT_SOURCES: AIPromptSource[] = [
  { key: "attach", name: "Add photos & files", desc: "Upload from your computer", glyph: "clip", attach: true },
  { key: "figma", name: "Figma", desc: "Embed design files and frames", brand: "figma", connect: true },
  { key: "slack", name: "Slack", desc: "Channels, canvas, threads", brand: "slack", connect: true },
  { key: "gmail", name: "Google Mail", desc: "Threads and drafts", brand: "gmail", connect: true },
  { key: "web", name: "Live Web", desc: "Real-time search & scrape", glyph: "globe" },
  { key: "charts", name: "Metrics", desc: "Telemetry, churn, ARR", glyph: "chart" },
  { key: "layers", name: "Context pack", desc: "Knowledge base snapshots", glyph: "layers" },
];

export const DEFAULT_PROMPT_COMMANDS = [
  { key: "audit", name: "/audit", desc: "Run a full UX / a11y review on this frame" },
  { key: "simplify", name: "/simplify", desc: "Cut component count while preserving layout" },
  { key: "generate", name: "/generate", desc: "Produce three copy variants of this section" },
  { key: "diff", name: "/diff", desc: "Compare this draft against production" },
];

export const DEFAULT_PROMPT_MODELS = [
  { key: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", desc: "Hybrid reasoning · best overall", tag: "Fast" },
  { key: "gpt-4o", name: "GPT-4o", desc: "Omni model for code and vision", tag: "Pro" },
  { key: "gemini-2-flash", name: "Gemini 2.0 Flash", desc: "Ultra-low latency inference", tag: "Free" },
  { key: "deepseek-r1", name: "DeepSeek R1", desc: "Open weights reasoning model", tag: "Local" },
];

export const AUTO_STEPS: {
  draft: string;
  active?: number;
  connect?: boolean;
  modelOpen?: boolean;
  model?: string;
  hold: number;
}[] = [
  { draft: "", connect: false, model: "claude-3-7-sonnet", hold: 1100 },
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
  { draft: "", model: "gpt-4o", hold: 2400 },
  { draft: "", hold: 900 },
];

export function parseToken(draft: string): { kind: "at" | "slash"; query: string; start: number } | null {
  const match = /(^|\s)([@/])([\w-]*)$/.exec(draft);
  if (!match) return null;
  return {
    kind: match[2] === "@" ? "at" : "slash",
    query: match[3].toLowerCase(),
    start: match.index + match[1].length,
  };
}

export const COMPONENT_STYLES = `
[data-mova-prompt] button:focus-visible { outline:2px solid var(--mova-ai-accent,#454545);outline-offset:2px; }
[data-mova-prompt] :is(input,textarea):focus-visible { outline:none; }
[data-mova-prompt] .prompt-composer:focus-within { outline:2px solid var(--mova-ai-accent,#454545);outline-offset:2px; }
[data-mova-prompt] button { cursor:pointer; } [data-mova-prompt] button:disabled { cursor:default; }
@keyframes mova-prompt-pop {from {opacity:0;transform:scale(.95)} to {opacity:1;transform:scale(1)}}
@keyframes mova-prompt-eq {0%,100% {transform:scaleY(.35)} 50% {transform:scaleY(1)}}
@media(prefers-reduced-motion:reduce) { [data-mova-prompt], [data-mova-prompt] * {animation:none!important;transition:none!important;scroll-behavior:auto!important;} }
`;

export interface AIPromptBarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  onSubmit?: (prompt: string, meta: { model: string; sources: string[] }) => void;
  placeholder?: string;
  sources?: AIPromptSource[];
  models?: typeof DEFAULT_PROMPT_MODELS;
  defaultModel?: string;
  variant?: "pill" | "dock" | "tall" | "Rounded" | "Pill" | string;
  theme?: "light" | "dark";
  className?: string;
  demo?: boolean;
  tall?: boolean;
  onSend?: (
    text: string,
    submission: {
      files: File[];
      sources: Array<{ key: string; name: string; desc: string }>;
      model: { key: string; name: string; tag: string };
    }
  ) => void;
}
