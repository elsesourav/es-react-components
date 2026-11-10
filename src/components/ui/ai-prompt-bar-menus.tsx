"use client";

import React from "react";
import {
  Icon,
  GLYPHS,
  BRANDS,
  DEFAULT_PROMPT_SOURCES,
  DEFAULT_PROMPT_MODELS,
  type AIPromptSource,
} from "./ai-prompt-bar-types";

export interface PromptSourceMenuProps {
  sourceMenuId: string;
  menu: "at" | "slash";
  query: string;
  rows: { key: string; name: string; desc: string }[];
  active: number;
  setActive: (idx: number | ((curr: number) => number)) => void;
  engaged: boolean;
  setEngaged: (engaged: boolean) => void;
  rowRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  rowBox: { top: number; height: number } | null;
  sources?: AIPromptSource[];
  connectedSources?: string[];
  connected?: boolean;
  pick: (row: { key: string; name: string; desc?: string }) => void;
}

export function PromptSourceMenu({
  sourceMenuId,
  menu,
  query,
  rows,
  active,
  setActive,
  engaged,
  setEngaged,
  rowRefs,
  rowBox,
  sources = DEFAULT_PROMPT_SOURCES,
  connectedSources = [],
  connected: globalConnected = false,
  pick,
}: PromptSourceMenuProps) {
  return (
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
            ? sources.find((s) => s.key === row.key) ||
              DEFAULT_PROMPT_SOURCES.find((s) => s.key === row.key)
            : undefined;
        const isConnected = globalConnected || connectedSources.includes(row.key);
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
                  isConnected
                    ? "text-[var(--mova-ai-success,#28734d)]"
                    : "text-[var(--mova-ai-accent-ink,#333)] hover:underline"
                }`}
              >
                {isConnected ? "Connected" : "Connect"}
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
  );
}

export interface PromptModelMenuProps {
  modelMenuRef: React.RefObject<HTMLDivElement | null>;
  modelMenuId: string;
  models?: typeof DEFAULT_PROMPT_MODELS;
  model: (typeof DEFAULT_PROMPT_MODELS)[number];
  modelRowRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  modelHovered: number | null;
  setModelHovered: (idx: number | null) => void;
  modelBox: { top: number; height: number } | null;
  modelMenuLeft: number;
  modelMenuBottom: number;
  selectModel: (m: (typeof DEFAULT_PROMPT_MODELS)[number]) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function PromptModelMenu({
  modelMenuRef,
  modelMenuId,
  models = DEFAULT_PROMPT_MODELS,
  model,
  modelRowRefs,
  modelHovered,
  setModelHovered,
  modelBox,
  modelMenuLeft,
  modelMenuBottom,
  selectModel,
  inputRef,
}: PromptModelMenuProps) {
  return (
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
              (event.key === "ArrowDown" ? 1 : models.length - 1)) %
              models.length
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
      {models.map((m, i) => (
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
  );
}
