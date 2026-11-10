"use client";

import React, { type ReactNode } from "react";

export const DEFAULT_CODE_LINES = [
  "export async function churnBatch() {",
  '  const flavor = await getFlavor("pistachio");',
  "  const base = await dairy.fetch({ flavor });",
  '  await freezer.store(base, { temp: "-16C" });',
  "  if (!base.approved) return null;",
  "  return base.gallons;",
  "}",
];

/* A single run of code within a diff row; `change` tints it as an add/del. */
export type CodePiece = { text: string; change?: "add" | "del" };

/* One row of a unified diff: old/new line numbers, its kind, and its pieces. */
export type DiffRow = {
  old: number | null;
  cur: number | null;
  type: "ctx" | "add" | "del";
  pieces: CodePiece[];
};

/* Prominent copy strings on the code block. */
export type CodeBlockLabels = { copy: string; copied: string };

export type Piece = CodePiece;
export type Row = DiffRow;

export const DEFAULT_DIFF_ROWS: Row[] = [
  {
    old: 1,
    cur: 1,
    type: "ctx",
    pieces: [{ text: "export async function churnBatch() {" }],
  },
  {
    old: 2,
    cur: 2,
    type: "ctx",
    pieces: [{ text: '  const flavor = await getFlavor("pistachio");' }],
  },
  {
    old: 3,
    cur: 3,
    type: "ctx",
    pieces: [{ text: "  const base = await dairy.fetch({ flavor });" }],
  },
  {
    old: 4,
    cur: null,
    type: "del",
    pieces: [
      { text: "  await freezer.store(base, { temp: " },
      { text: '"-14C"', change: "del" },
      { text: " });" },
    ],
  },
  {
    old: null,
    cur: 4,
    type: "add",
    pieces: [
      { text: "  await freezer.store(base, { temp: " },
      { text: '"-16C"', change: "add" },
      { text: " });" },
    ],
  },
  {
    old: null,
    cur: 5,
    type: "add",
    pieces: [{ text: "  if (!base.approved) return null;" }],
  },
  {
    old: 5,
    cur: 6,
    type: "ctx",
    pieces: [{ text: "  return base.gallons;" }],
  },
  { old: 6, cur: 7, type: "ctx", pieces: [{ text: "}" }] },
];

export const HATCH =
  "repeating-linear-gradient(45deg, var(--mova-ai-danger,#a33c3c) 0, var(--mova-ai-danger,#a33c3c) 1.5px, transparent 1.5px, transparent 3px)";

/* Light/Dark syntax coloring — keywords, functions, strings, numbers */
export const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "async",
  "function",
  "const",
  "let",
  "var",
  "await",
  "return",
  "if",
  "else",
  "for",
  "while",
  "new",
  "throw",
  "try",
  "catch",
  "null",
  "true",
  "false",
  "undefined",
]);

export const TOKEN =
  /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|\b\d+(?:\.\d+)?\b|\b(?:import|from|export|default|async|function|const|let|var|await|return|if|else|for|while|new|throw|try|catch|null|true|false|undefined)\b|[A-Za-z_$][\w$]*(?=\s*\())/g;

export function highlight(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    const t = m[0];
    if (idx > last) nodes.push(<span key={k++}>{text.slice(last, idx)}</span>);
    let color: string;
    let weight: number | undefined;
    if (/^["'`]/.test(t) || /^\d/.test(t)) {
      color = "var(--mova-ai-warning,#986517)";
    } else if (KEYWORDS.has(t)) {
      color = "var(--mova-ai-accent-ink,#333)";
    } else {
      color = "var(--mova-ai-ink,#202020)";
      weight = 500;
    }
    nodes.push(
      <span key={k++} style={{ color, fontWeight: weight }}>
        {t}
      </span>
    );
    last = idx + t.length;
  }
  if (last < text.length) nodes.push(<span key={k++}>{text.slice(last)}</span>);
  return nodes;
}

export function Pieces({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map((p, i) => {
        if (p.change) {
          const add = p.change === "add";
          return (
            <span
              key={i}
              className="rounded-[3px]"
              style={{
                background: `color-mix(in srgb, ${
                  add
                    ? "var(--mova-ai-success,#28734d)"
                    : "var(--mova-ai-danger,#a33c3c)"
                } 18%, transparent)`,
                padding: "0 2px",
                margin: "0 -1px",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              {highlight(p.text)}
            </span>
          );
        }
        return <span key={i}>{highlight(p.text)}</span>;
      })}
    </>
  );
}

export function CodeContent({
  isDiff,
  lines,
  diff,
}: {
  isDiff: boolean;
  lines: string[];
  diff: Row[];
}) {
  return isDiff ? (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-5 w-px bg-[var(--mova-ai-border,#dedede)]" />
      {diff.map((r, i) => {
        const add = r.type === "add";
        const del = r.type === "del";
        const num = del ? r.old : r.cur;
        return (
          <div
            key={i}
            className={`relative grid grid-cols-[20px_minmax(0,1fr)] items-start ${
              add
                ? "bg-[var(--mova-ai-success-tint,#e8f3ec)]"
                : del
                ? "bg-[var(--mova-ai-danger-tint,#f7eaea)]"
                : ""
            }`}
          >
            {(add || del) && (
              <span
                className="absolute inset-y-0 left-0 w-[3px]"
                style={{
                  background: add ? "var(--mova-ai-success,#28734d)" : HATCH,
                }}
              />
            )}
            <span
              className={`select-none text-center text-[11px] ${
                add
                  ? "text-[var(--mova-ai-success,#28734d)]"
                  : del
                  ? "text-[var(--mova-ai-danger,#a33c3c)]"
                  : "text-[var(--mova-ai-ink-muted,#858585)]"
              }`}
            >
              {num ?? ""}
            </span>
            <code className="pr-3 pl-1 break-words whitespace-pre-wrap">
              <Pieces pieces={r.pieces} />
            </code>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-5 w-px bg-[var(--mova-ai-border,#dedede)]" />
      {lines.map((line, i) => (
        <div key={i} className="grid grid-cols-[20px_minmax(0,1fr)] items-start">
          <span className="select-none text-center text-[11px] text-[var(--mova-ai-ink-muted,#858585)]">
            {i + 1}
          </span>
          <code className="pr-3 pl-1 break-words whitespace-pre-wrap">
            {highlight(line)}
          </code>
        </div>
      ))}
    </div>
  );
}

export function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[var(--mova-ai-ink-muted,#858585)]"
    >
      <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  );
}
