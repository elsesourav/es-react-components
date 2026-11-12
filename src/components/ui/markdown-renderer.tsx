"use client";

import React, { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Terminal,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";

export interface MarkdownRendererProps {
  content?: string | null;
  className?: string;
  fallbackText?: string;
  startHeadingLevel?: 1 | 2;
  onChecklistToggle?: (itemIndex: number, nextChecked: boolean) => void;
  interactiveChecklists?: boolean;
}

/**
 * Sanitizes URLs to prevent javascript: or malicious protocol exploits.
 */
import {
  isSafeUrl,
  MathFormula,
  MarkdownCodeBlock,
  renderInlineMarkdown,
} from "./markdown-inline";
import { splitMarkdownTableRow, isMarkdownTableSeparator, MarkdownTable } from "./markdown-table-parser";

export { isSafeUrl, MathFormula, MarkdownCodeBlock, renderInlineMarkdown, splitMarkdownTableRow, MarkdownTable };

export function MarkdownRenderer({
  content,
  className = "",
  fallbackText = "Nothing to display.",
  startHeadingLevel = 1,
  onChecklistToggle,
  interactiveChecklists = true,
}: MarkdownRendererProps) {
  const blocks = useMemo(() => {
    if (!content || typeof content !== "string" || !content.trim()) {
      return null;
    }

    const lines = content.split("\n");
    const result: React.ReactNode[] = [];
    let i = 0;
    let blockIndex = 0;
    let checklistItemIndex = 0;

    while (i < lines.length) {
      const line = lines[i] ?? "";

      // 1. Display Math Block: $$ ... $$
      if (line.trim().startsWith("$$")) {
        const mathLines: string[] = [];
        const isSingleLine =
          line.trim().length > 2 &&
          line.trim().endsWith("$$") &&
          line.trim() !== "$$";

        if (isSingleLine) {
          const stripped = line.trim().slice(2, -2);
          result.push(
            <MathFormula
              key={`math-block-${blockIndex++}`}
              math={stripped}
              displayMode={true}
            />
          );
          i++;
          continue;
        }

        i++;
        while (i < lines.length && !lines[i]?.trim().endsWith("$$")) {
          mathLines.push(lines[i] ?? "");
          i++;
        }
        i++; // skip closing $$
        result.push(
          <MathFormula
            key={`math-block-${blockIndex++}`}
            math={mathLines.join("\n")}
            displayMode={true}
          />
        );
        continue;
      }

      // 2. Fenced Code Blocks (``` or ```` or more)
      const fenceMatch = line.match(/^(`{3,})(.*)$/);
      if (fenceMatch) {
        const [_, fence, langRaw] = fenceMatch;
        const language = langRaw.trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i]?.startsWith(fence)) {
          codeLines.push(lines[i] ?? "");
          i++;
        }
        i++; // skip closing fence
        result.push(
          <MarkdownCodeBlock
            key={`code-block-${blockIndex++}`}
            code={codeLines.join("\n")}
            language={language}
          />
        );
        continue;
      }

      // 3. Headings (# H1 to ###### H6)
      if (line.startsWith("#")) {
        const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
          const level = headingMatch[1]!.length;
          const text = headingMatch[2]!;
          const headingId = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

          const effectiveLevel =
            startHeadingLevel === 2 ? Math.min(6, level + 1) : level;

          const headingStyles = {
            1: "text-2xl sm:text-3xl font-extrabold text-foreground mt-8 mb-4 pb-2 border-b border-border tracking-tight",
            2: "text-xl sm:text-2xl font-bold text-foreground mt-7 mb-3 tracking-tight pb-1.5 border-b border-border/60",
            3: "text-lg sm:text-xl font-semibold text-foreground mt-6 mb-2 tracking-tight",
            4: "text-base sm:text-lg font-semibold text-foreground mt-5 mb-2",
            5: "text-sm sm:text-base font-semibold text-foreground mt-4 mb-1.5",
            6: "text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-1",
          }[effectiveLevel as 1 | 2 | 3 | 4 | 5 | 6];

          const HeadingTag = `h${effectiveLevel}` as
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6";

          result.push(
            React.createElement(
              HeadingTag,
              {
                key: `h-${blockIndex++}`,
                id: headingId,
                className: headingStyles,
              },
              renderInlineMarkdown(text)
            )
          );
          i++;
          continue;
        }
      }

      // 4. GitHub-style Callouts / Alerts: > [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT], > [!CAUTION]
      if (line.startsWith("> [!")) {
        const alertMatch = line.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/i);
        if (alertMatch) {
          const alertType = alertMatch[1]!.toUpperCase();
          const alertLines: string[] = [];
          if (alertMatch[2]?.trim()) {
            alertLines.push(alertMatch[2].trim());
          }
          i++;
          while (i < lines.length && lines[i]?.startsWith(">")) {
            alertLines.push(lines[i]!.replace(/^>\s?/, ""));
            i++;
          }

          const alertConfig: Record<
            string,
            { label: string; icon: React.ReactNode; bg: string; border: string; text: string }
          > = {
            NOTE: {
              label: "Note",
              icon: <Info className="size-4 text-blue-500" />,
              bg: "bg-blue-500/10",
              border: "border-blue-500/30",
              text: "text-blue-500 dark:text-blue-400",
            },
            TIP: {
              label: "Tip",
              icon: <CheckCircle2 className="size-4 text-emerald-500" />,
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/30",
              text: "text-emerald-500 dark:text-emerald-400",
            },
            IMPORTANT: {
              label: "Important",
              icon: <Flame className="size-4 text-purple-500" />,
              bg: "bg-purple-500/10",
              border: "border-purple-500/30",
              text: "text-purple-500 dark:text-purple-400",
            },
            WARNING: {
              label: "Warning",
              icon: <AlertTriangle className="size-4 text-amber-500" />,
              bg: "bg-amber-500/10",
              border: "border-amber-500/30",
              text: "text-amber-500 dark:text-amber-400",
            },
            CAUTION: {
              label: "Caution",
              icon: <AlertTriangle className="size-4 text-rose-500" />,
              bg: "bg-rose-500/10",
              border: "border-rose-500/30",
              text: "text-rose-500 dark:text-rose-400",
            },
          };

          const config = alertConfig[alertType] || alertConfig.NOTE!;

          result.push(
            <div
              key={`alert-${blockIndex++}`}
              className={cn("my-5 p-4 rounded-2xl border flex gap-3.5", config.bg, config.border)}
            >
              <div className="shrink-0 mt-0.5">{config.icon}</div>
              <div className="flex-1 space-y-1 text-xs sm:text-sm text-foreground leading-relaxed">
                <div className={cn("font-bold text-xs uppercase tracking-wide", config.text)}>
                  {config.label}
                </div>
                <div>{alertLines.map((al, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>
                    {renderInlineMarkdown(al)}
                  </p>
                ))}</div>
              </div>
            </div>
          );
          continue;
        }
      }

      // 5. Standard Blockquotes: > text
      if (line.startsWith(">")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i]?.startsWith(">")) {
          quoteLines.push(lines[i]!.replace(/^>\s?/, ""));
          i++;
        }
        result.push(
          <blockquote
            key={`quote-${blockIndex++}`}
            className="my-4 pl-4 border-l-4 border-primary italic text-muted-foreground bg-surface-subtle/40 py-2 pr-3 rounded-r-xl"
          >
            {quoteLines.map((ql, idx) => (
              <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>
                {renderInlineMarkdown(ql)}
              </p>
            ))}
          </blockquote>
        );
        continue;
      }

      // 6. Horizontal Rules: --- or ***
      if (line.trim().match(/^(---|---|\*\*\*|___)$/)) {
        result.push(
          <hr
            key={`hr-${blockIndex++}`}
            className="my-8 border-t border-border"
          />
        );
        i++;
        continue;
      }

      // 7. Markdown Tables: | col | col |
      if (line.includes("|") && isMarkdownTableSeparator(lines[i + 1])) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i]?.includes("|")) {
          tableLines.push(lines[i]!.trim());
          i++;
        }

        if (tableLines.length >= 2) {
          result.push(
            <MarkdownTable
              key={`table-${blockIndex++}`}
              tableLines={tableLines}
            />
          );
          continue;
        }
      }

      // 8. Task Lists / Checklists: - [ ] or - [x]
      if (line.match(/^(\s*)[-*+]\s+\[([ xX])\]\s+(.*)$/)) {
        const taskItems: Array<{ checked: boolean; text: string; itemIdx: number }> = [];
        while (i < lines.length) {
          const taskMatch = lines[i]?.match(/^(\s*)[-*+]\s+\[([ xX])\]\s+(.*)$/);
          if (!taskMatch) break;
          const checked = taskMatch[2]!.toLowerCase() === "x";
          const text = taskMatch[3]!;
          taskItems.push({ checked, text, itemIdx: checklistItemIndex++ });
          i++;
        }

        result.push(
          <ul key={`tasks-${blockIndex++}`} className="my-3 space-y-1.5 text-xs sm:text-sm">
            {taskItems.map((task) => (
              <li key={task.itemIdx} className="flex items-start gap-2.5">
                <Checkbox
                  sizeVariant="sm"
                  checked={task.checked}
                  disabled={!interactiveChecklists}
                  onChange={(e) => onChecklistToggle?.(task.itemIdx, e.target.checked)}
                  className="mt-0.5"
                />
                <span
                  className={cn(
                    "leading-relaxed",
                    task.checked && "line-through text-muted-foreground"
                  )}
                >
                  {renderInlineMarkdown(task.text)}
                </span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // 9. Unordered Lists: - item or * item
      if (line.match(/^[-*+]\s+(.*)$/)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i]?.match(/^[-*+]\s+(.*)$/)) {
          const match = lines[i]!.match(/^[-*+]\s+(.*)$/);
          listItems.push(match![1]!);
          i++;
        }
        result.push(
          <ul
            key={`ul-${blockIndex++}`}
            className="my-3 list-disc list-outside pl-5 space-y-1 text-xs sm:text-sm text-foreground leading-relaxed"
          >
            {listItems.map((item, idx) => (
              <li key={idx}>{renderInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        continue;
      }

      // 10. Ordered Lists: 1. item
      if (line.match(/^\d+\.\s+(.*)$/)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i]?.match(/^\d+\.\s+(.*)$/)) {
          const match = lines[i]!.match(/^\d+\.\s+(.*)$/);
          listItems.push(match![1]!);
          i++;
        }
        result.push(
          <ol
            key={`ol-${blockIndex++}`}
            className="my-3 list-decimal list-outside pl-5 space-y-1 text-xs sm:text-sm text-foreground leading-relaxed"
          >
            {listItems.map((item, idx) => (
              <li key={idx}>{renderInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
        continue;
      }

      // 11. Empty lines
      if (!line.trim()) {
        i++;
        continue;
      }

      // 12. Standard Paragraph
      const paragraphLines: string[] = [];
      while (
        i < lines.length &&
        lines[i]?.trim() &&
        !lines[i]?.startsWith("#") &&
        !lines[i]?.startsWith("```") &&
        !lines[i]?.startsWith("$$") &&
        !lines[i]?.startsWith(">") &&
        !lines[i]?.match(/^[-*+]\s+/) &&
        !lines[i]?.match(/^\d+\.\s+/) &&
        !lines[i]?.match(/^(---|---|\*\*\*|___)$/) &&
        !(lines[i]?.includes("|") && isMarkdownTableSeparator(lines[i + 1]))
      ) {
        paragraphLines.push(lines[i]!);
        i++;
      }

      if (paragraphLines.length > 0) {
        result.push(
          <p
            key={`p-${blockIndex++}`}
            className="my-3 text-xs sm:text-sm text-foreground leading-relaxed break-words"
          >
            {renderInlineMarkdown(paragraphLines.join(" "))}
          </p>
        );
      } else {
        i++;
      }
    }

    return result;
  }, [content, startHeadingLevel, onChecklistToggle, interactiveChecklists]);

  if (!blocks || blocks.length === 0) {
    return (
      <div className={cn("text-xs text-muted-foreground italic py-6", className)}>
        {fallbackText}
      </div>
    );
  }

  return <div className={cn("markdown-prose max-w-full font-sans", className)}>{blocks}</div>;
}
