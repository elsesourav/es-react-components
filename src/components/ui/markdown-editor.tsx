"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
  Columns,
  HelpCircle,
  Maximize2,
  Minimize2,
  Trash2,
  Sparkles,
  Sigma,
  Variable,
} from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";
import { MarkdownEditorToolbar } from "./markdown-editor-toolbar";
export { MarkdownEditorToolbar };
import { cn } from "@/lib/utils";

export type MarkdownEditorMode = "write" | "preview" | "split";

export interface MarkdownEditorProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  rows?: number;
  minHeight?: number | string;
  required?: boolean;
  helperText?: string;
  mode?: MarkdownEditorMode;
  defaultMode?: MarkdownEditorMode;
  onModeChange?: (mode: MarkdownEditorMode) => void;
  showToolbar?: boolean;
  showWordCount?: boolean;
  className?: string;
  readOnly?: boolean;
}

export function MarkdownEditor({
  label,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Write markdown with headers, code blocks, lists, and LaTeX math formulas ($E=mc^2$ or $$\\int_0^1 x dx$$)...",
  rows = 14,
  minHeight = "360px",
  required = false,
  helperText,
  mode: controlledMode,
  defaultMode = "split",
  onModeChange,
  showToolbar = true,
  showWordCount = true,
  className = "",
  readOnly = false,
}: MarkdownEditorProps) {
  const isValueControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const textValue = isValueControlled ? controlledValue : internalValue;

  const isModeControlled = controlledMode !== undefined;
  const [internalMode, setInternalMode] = useState<MarkdownEditorMode>(defaultMode);
  const currentMode = isModeControlled ? controlledMode : internalMode;

  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (nextValue: string) => {
    if (!isValueControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const handleModeChange = (nextMode: MarkdownEditorMode) => {
    if (!isModeControlled) {
      setInternalMode(nextMode);
    }
    onModeChange?.(nextMode);
  };

  const insertSnippet = (prefix: string, suffix: string = "", placeholderText: string = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previous = textarea.value;
    const selected = previous.substring(start, end);

    const insertion = `${prefix}${selected || placeholderText}${suffix}`;
    const nextVal = previous.substring(0, start) + insertion + previous.substring(end);

    handleTextChange(nextVal);

    setTimeout(() => {
      textarea.focus();
      const selectionStart = start + prefix.length;
      const selectionEnd = selectionStart + (selected ? selected.length : placeholderText.length);
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  const wordMetrics = useMemo(() => {
    const trimmed = textValue.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = textValue.length;
    const readingTime = Math.ceil(words / 200);
    const lines = textValue.split("\n").length;
    return { words, chars, readingTime, lines };
  }, [textValue]);

  // Handle escape to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "space-y-2 select-text",
        isFullscreen &&
          "fixed inset-0 z-50 p-6 bg-background/95 backdrop-blur-md overflow-y-auto flex flex-col justify-start",
        className
      )}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {label ? (
          <label className="block text-xs font-semibold text-foreground">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>Markdown Editor</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Syntax Guide Toggle */}
          <button
            type="button"
            onClick={() => setShowCheatsheet((prev) => !prev)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-surface-subtle border border-transparent hover:border-border cursor-pointer"
            title="Markdown and LaTeX syntax reference"
          >
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-xl hover:bg-surface-subtle border border-transparent hover:border-border transition-colors cursor-pointer"
            title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>

          {/* Mode Switcher Tabs */}
          <div
            role="tablist"
            className="flex items-center p-0.5 rounded-xl bg-surface-subtle border border-border"
          >
            <button
              type="button"
              role="tab"
              aria-selected={currentMode === "write"}
              onClick={() => handleModeChange("write")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer",
                currentMode === "write"
                  ? "bg-surface text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Write</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={currentMode === "split"}
              onClick={() => handleModeChange("split")}
              className={cn(
                "hidden sm:flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer",
                currentMode === "split"
                  ? "bg-surface text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={currentMode === "preview"}
              onClick={() => handleModeChange("preview")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer",
                currentMode === "preview"
                  ? "bg-surface text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cheatsheet Guide Drawer */}
      {showCheatsheet && (
        <div className="p-4 rounded-2xl bg-surface-subtle border border-border text-xs text-muted-foreground space-y-2.5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground text-[11px] uppercase tracking-wider">
              Markdown & LaTeX Syntax Reference
            </span>
            <span className="text-[10px] text-primary">KaTeX Math Enabled</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div>
              <code className="text-primary font-mono">## Heading 2</code>
            </div>
            <div>
              <code className="text-primary font-mono">**Bold Text**</code>
            </div>
            <div>
              <code className="text-primary font-mono">*Italic Text*</code>
            </div>
            <div>
              <code className="text-primary font-mono">~~Strike~~</code>
            </div>
            <div>
              <code className="text-primary font-mono">$E = mc^2$</code> (Inline)
            </div>
            <div>
              <code className="text-primary font-mono">{"$$\\int_0^\\infty e^{-x}dx$$"}</code>
            </div>
            <div>
              <code className="text-primary font-mono">[Link](https://...)</code>
            </div>
            <div>
              <code className="text-primary font-mono">![Alt](image.jpg)</code>
            </div>
            <div>
              <code className="text-primary font-mono">- [x] Done task</code>
            </div>
            <div>
              <code className="text-primary font-mono">&gt; [!NOTE]</code> (Callout)
            </div>
            <div>
              <code className="text-primary font-mono">&gt; [!WARNING]</code>
            </div>
            <div>
              <code className="text-primary font-mono">| Col 1 | Col 2 |</code> (Table)
            </div>
          </div>
        </div>
      )}

      {/* Main Container Card */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm flex flex-col flex-1">
        {/* Quick Action Toolbar */}
        {showToolbar && currentMode !== "preview" && (
          <MarkdownEditorToolbar
            insertSnippet={insertSnippet}
            onClear={() => handleTextChange("")}
          />
        )}

        {/* Content Body */}
        <div
          className={cn(
            "flex-1 grid min-h-[300px]",
            currentMode === "split"
              ? "grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border"
              : "grid-cols-1"
          )}
          style={{ minHeight }}
        >
          {/* Write Textarea Panel */}
          {(currentMode === "write" || currentMode === "split") && (
            <div className="relative h-full flex flex-col">
              <textarea
                ref={textareaRef}
                value={textValue}
                readOnly={readOnly}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className="w-full h-full min-h-[320px] p-5 bg-transparent border-0 text-xs sm:text-sm text-foreground focus:outline-none font-mono leading-relaxed resize-none selection:bg-primary/25 placeholder:text-muted-foreground/50"
              />
            </div>
          )}

          {/* Live Preview Panel */}
          {(currentMode === "preview" || currentMode === "split") && (
            <div className="h-full p-6 overflow-y-auto bg-surface-subtle/30 min-h-[320px]">
              {textValue.trim() ? (
                <MarkdownRenderer content={textValue} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-16 text-muted-foreground text-xs italic">
                  <Eye className="w-8 h-8 mb-2 opacity-30 text-primary" />
                  <span>Nothing to preview yet. Write markdown content to see live output.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Metrics */}
      {showWordCount && (
        <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground px-1">
          <span>{helperText || "Full GFM + KaTeX Math formulas ($...$ & $$...$$) supported."}</span>
          <div className="flex items-center gap-3">
            <span>{wordMetrics.words} words</span>
            <span>{wordMetrics.chars} characters</span>
            <span>{wordMetrics.lines} lines</span>
            <span>~{wordMetrics.readingTime} min read</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Alias for seamless drop-in backwards compatibility with elsesourav
export const AdminMarkdownEditor = MarkdownEditor;
