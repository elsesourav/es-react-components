"use client";

import React from "react";
import { Icon, DEFAULT_PROMPT_MODELS } from "./ai-prompt-bar-types";

export interface PromptBarComposerProps {
  pill: boolean;
  tall: boolean;
  wide: boolean;
  draft: string;
  setDraft: (d: string) => void;
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  plusOpen: boolean;
  setPlusOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modelOpen: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  model: (typeof DEFAULT_PROMPT_MODELS)[number];
  listening: boolean;
  toggleDictation: () => void;
  canSend: boolean;
  send: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  controlsRef: React.RefObject<HTMLDivElement | null>;
  modelRef: React.RefObject<HTMLButtonElement | null>;
  measureRef: React.RefObject<HTMLSpanElement | null>;
  glimmRef: React.RefObject<HTMLCanvasElement | null>;
  sourceMenuId: string;
  modelMenuId: string;
  menu: "at" | "slash" | null;
  rows: { key: string; name: string; desc: string }[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  setEngaged: (engaged: boolean) => void;
  pick: (row: { key: string; name: string }) => void;
  setDismissed: (dismissed: boolean) => void;
  closeMenus: () => void;
  placeholder?: string;
  modelIndex: number;
  modelRowRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}

export function PromptBarComposer({
  pill,
  tall,
  wide,
  draft,
  setDraft,
  attachments,
  setAttachments,
  plusOpen,
  setPlusOpen,
  modelOpen,
  setModelOpen,
  model,
  listening,
  toggleDictation,
  canSend,
  send,
  inputRef,
  controlsRef,
  modelRef,
  measureRef,
  glimmRef,
  sourceMenuId,
  modelMenuId,
  menu,
  rows,
  active,
  setActive,
  setEngaged,
  pick,
  setDismissed,
  closeMenus,
  placeholder,
  modelIndex,
  modelRowRefs,
}: PromptBarComposerProps) {
  return (
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
        <div className={`flex flex-wrap gap-1.5 pt-0.5 ${pill ? "px-1" : "px-0.5"}`}>
          {attachments.map((file, i) => (
            <span
              key={`${file.name}-${i}`}
              className={`flex h-6.5 items-center gap-1.5 bg-[var(--mova-ai-field,#f6f6f6)] py-1 pr-1 pl-1.5 text-[11.5px] text-[var(--mova-ai-ink-secondary,#666)] shadow-[var(--mova-ai-shadow-hairline,none)] ${
                pill ? "rounded-full" : "rounded-[6px]"
              }`}
              style={{
                animation: "mova-prompt-pop 200ms cubic-bezier(0.23,1,0.32,1) both",
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
                onClick={() => setAttachments((curr) => curr.filter((_, j) => j !== i))}
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
            plusOpen ? "bg-[var(--mova-ai-hover,#f1f1f1)] text-[var(--mova-ai-ink,#202020)]" : ""
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
                  (curr) => (curr + (event.key === "ArrowDown" ? 1 : rows.length - 1)) % rows.length
                );
                return;
              }
              if ((event.key === "Enter" && !event.shiftKey) || event.key === "Tab") {
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
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              send();
            }
          }}
          placeholder={listening ? "Listening…" : placeholder ?? "Write a message…"}
          aria-label="Prompt"
          aria-expanded={!!menu}
          aria-controls={menu ? sourceMenuId : undefined}
          aria-activedescendant={menu && rows[active] ? `${sourceMenuId}-${active}` : undefined}
          className={`${
            tall
              ? "min-h-[68px] px-2 py-2 text-[14px] leading-5"
              : "min-h-7 px-1 py-[5px] text-[13px] leading-[18px]"
          } min-w-0 w-full resize-none bg-transparent text-[var(--mova-ai-ink,#202020)] outline-none [overflow-wrap:anywhere] placeholder:text-[var(--mova-ai-ink-muted,#858585)] ${
            wide ? "col-span-full col-start-1 row-start-1" : "col-start-2 row-start-1"
          }`}
        />

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
              requestAnimationFrame(() => modelRowRefs.current[modelIndex]?.focus());
            }
          }}
          onClick={() => {
            setPlusOpen(false);
            setDismissed(true);
            setModelOpen((curr) => !curr);
          }}
          className={`flex h-7 shrink-0 items-center gap-1 px-1.5 text-[12px] font-medium text-[var(--mova-ai-ink-secondary,#666)] transition-colors duration-150 hover:bg-[var(--mova-ai-hover,#f1f1f1)] hover:text-[var(--mova-ai-ink,#202020)] ${
            pill ? "rounded-full" : "rounded-[8px]"
          } ${wide ? "col-start-2 row-start-2 justify-self-start" : "col-start-3 row-start-1"}`}
        >
          {model.name}
          <span className="text-[var(--mova-ai-ink-muted,#858585)]">
            <Icon size={11} strokeWidth={2.4}>
              <path d="M6 9l6 6 6-6" />
            </Icon>
          </span>
        </button>

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
  );
}
