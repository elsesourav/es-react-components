"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useId } from "react";
import {
  DEFAULT_PROMPT_SOURCES,
  DEFAULT_PROMPT_COMMANDS,
  DEFAULT_PROMPT_MODELS,
  AUTO_STEPS,
  parseToken,
  COMPONENT_STYLES,
  type AIPromptSource,
  type AIPromptBarProps,
} from "./ai-prompt-bar-types";
import { PromptSourceMenu, PromptModelMenu } from "./ai-prompt-bar-menus";
import { PromptBarComposer } from "./ai-prompt-bar-composer";
import { AI_THEME_STYLES } from "./ai-theme-styles";
import { useAIPromptVoice, useRainbowCelebration } from "./use-ai-prompt-voice";

export type { AIPromptSource, AIPromptBarProps };
export { DEFAULT_PROMPT_SOURCES, DEFAULT_PROMPT_COMMANDS, DEFAULT_PROMPT_MODELS };

export function AIPromptBar({
  theme,
  className = "",
  variant = "Rounded",
  demo = true,
  tall = false,
  placeholder,
  onSend,
  sources = DEFAULT_PROMPT_SOURCES,
  models = DEFAULT_PROMPT_MODELS,
}: AIPromptBarProps) {
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    theme === "dark" || theme === "light" ? theme : "dark"
  );

  useEffect(() => {
    if (theme === "dark" || theme === "light") {
      setResolvedTheme(theme);
      return;
    }
    const updateTheme = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setResolvedTheme(isDark ? "dark" : "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, [theme]);

  const sourceMenuId = useId();
  const modelMenuId = useId();
  const [feedback, setFeedback] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pill = variant?.toLowerCase() === "pill";
  const [draft, setDraft] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [model, setModel] = useState(models[1] || models[0]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedSources, setSelectedSources] = useState<AIPromptSource[]>([]);
  const [connected, setConnected] = useState(false);
  const [active, setActive] = useState(0);
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

  const { glimmRef, celebrate } = useRainbowCelebration();
  const { listening, toggleDictation } = useAIPromptVoice({
    onTranscript: (text) => {
      setDraft((curr) => `${curr.trimEnd()} ${text}`.trimStart());
    },
    onFeedback: (msg) => {
      setFeedback(msg);
    },
  });

  const takeOver = (event: { target: EventTarget | null }) => {
    setAuto(false);
    if (auto && event.target === inputRef.current) setDraft("");
  };

  const token = dismissed ? null : parseToken(draft);
  const menu: "at" | "slash" | null = plusOpen ? "at" : token?.kind ?? null;
  const query = plusOpen ? "" : token?.query ?? "";

  const rows =
    menu === "at"
      ? sources.filter((s) => s.name.toLowerCase().includes(query))
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

  const modelIndex = models.findIndex((m) => m.key === model.key);
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

  const selectModel = (next: (typeof DEFAULT_PROMPT_MODELS)[number]) => {
    setModel(next);
    setModelOpen(false);
  };

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const step = AUTO_STEPS[autoStep % AUTO_STEPS.length];
    setDraft(step.draft);
    if (step.active !== undefined) setActive(step.active);
    if (step.connect !== undefined) setConnected(step.connect);
    if (step.modelOpen !== undefined) setModelOpen(step.modelOpen);
    if (step.model) {
      const next = models.find((m) => m.key === step.model);
      if (next) selectModel(next);
    }
    const t = setTimeout(() => setAutoStep((s) => s + 1), step.hold);
    return () => clearTimeout(t);
  }, [auto, autoStep, models]);

  useLayoutEffect(() => {
    const input = inputRef.current;
    const controls = controlsRef.current;
    const measure = measureRef.current;
    const modelButton = modelRef.current;
    if (!input || !controls || !measure || !modelButton) return;

    const fixedControlsWidth = 28 * 3 + modelButton.offsetWidth;
    const inlineGaps = 4 * 4;
    const inlineInputWidth = controls.clientWidth - fixedControlsWidth - inlineGaps;
    const needsFullWidth = draft.includes("\n") || measure.offsetWidth + 8 > inlineInputWidth;
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
    const source = sources.find((s) => s.key === row.key);
    if (source?.attach) {
      fileRef.current?.click();
      if (token) setDraft(draft.slice(0, token.start));
    } else if (menu === "at") {
      if (source) {
        setSelectedSources((curr) =>
          curr.some((item) => item.key === source.key) ? curr : [...curr, source]
        );
      }
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
    celebrate();
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
      data-theme={resolvedTheme}
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
        {menu && (
          <PromptSourceMenu
            sourceMenuId={sourceMenuId}
            menu={menu}
            query={query}
            rows={rows}
            active={active}
            setActive={setActive}
            engaged={engaged}
            setEngaged={setEngaged}
            rowRefs={rowRefs}
            rowBox={rowBox}
            sources={sources}
            connected={connected}
            pick={pick}
          />
        )}

        {modelOpen && (
          <PromptModelMenu
            modelMenuRef={modelMenuRef}
            modelMenuId={modelMenuId}
            models={models}
            model={model}
            modelRowRefs={modelRowRefs}
            modelHovered={modelHovered}
            setModelHovered={setModelHovered}
            modelBox={modelBox}
            modelMenuLeft={modelMenuLeft}
            modelMenuBottom={modelMenuBottom}
            selectModel={selectModel}
            inputRef={inputRef}
          />
        )}

        <PromptBarComposer
          pill={pill}
          tall={tall}
          wide={wide}
          draft={draft}
          setDraft={setDraft}
          attachments={attachments}
          setAttachments={setAttachments}
          plusOpen={plusOpen}
          setPlusOpen={setPlusOpen}
          modelOpen={modelOpen}
          setModelOpen={setModelOpen}
          model={model}
          listening={listening}
          toggleDictation={toggleDictation}
          canSend={canSend}
          send={send}
          inputRef={inputRef}
          controlsRef={controlsRef}
          modelRef={modelRef}
          measureRef={measureRef}
          glimmRef={glimmRef}
          sourceMenuId={sourceMenuId}
          modelMenuId={modelMenuId}
          menu={menu}
          rows={rows}
          active={active}
          setActive={setActive}
          setEngaged={setEngaged}
          pick={pick}
          setDismissed={setDismissed}
          closeMenus={closeMenus}
          placeholder={placeholder}
          modelIndex={modelIndex}
          modelRowRefs={modelRowRefs}
        />
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
