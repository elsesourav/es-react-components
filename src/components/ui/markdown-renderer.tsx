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
function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("vbscript:")
  ) {
    return false;
  }
  return true;
}

/**
 * Renders LaTeX math safely using KaTeX.
 */
export function MathFormula({
  math,
  displayMode = false,
  className = "",
}: {
  math: string;
  displayMode?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode,
        throwOnError: false,
        output: "htmlAndMathml",
      });
    } catch {
      return null;
    }
  }, [math, displayMode]);

  const handleCopyTeX = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(math);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  if (!html) {
    return (
      <code className="text-rose-400 font-mono text-xs bg-rose-500/10 px-1.5 py-0.5 rounded">
        {math}
      </code>
    );
  }

  if (displayMode) {
    return (
      <div
        className={cn(
          "group relative my-5 p-4 rounded-2xl bg-surface-subtle border border-border overflow-x-auto text-center shadow-sm select-text",
          className
        )}
      >
        <button
          type="button"
          onClick={handleCopyTeX}
          aria-label="Copy TeX equation"
          className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-surface border border-border text-xs text-muted-foreground hover:text-foreground shadow-sm flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span className="text-[10px]">TeX</span>
            </>
          )}
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="inline-block max-w-full text-foreground py-1 text-[1.05em]"
        />
      </div>
    );
  }

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className={cn("inline-block px-1 align-baseline text-foreground", className)}
    />
  );
}

/**
 * Performant Code Block with copy-to-clipboard functionality.
 */
export function MarkdownCodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-5 rounded-2xl overflow-hidden border border-border bg-zinc-950 text-zinc-100 font-mono text-xs shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-zinc-400 text-[11px]">
        <span className="uppercase tracking-wider font-semibold text-zinc-300 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span>{language || "code"}</span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-[11px] cursor-pointer"
          aria-label="Copy code snippet to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto max-w-full text-zinc-200 leading-relaxed font-mono selection:bg-primary/30">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Parses inline Markdown tokens including Math, Bold, Italic, Strikethrough, Code, Links, Images.
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return "";

  // Token regex for:
  // 1: Inline Math $...$
  // 2: Image ![]() or Link []()
  // 3: Inline Code `...`
  // 4: Bold **...**
  // 5: Italic *...* or _..._
  // 6: Strikethrough ~~...~~
  const inlinePattern =
    /(\$([^\$\n]+)\$)|(!?\[([^\]]*)\]\(([^)]+)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*|_([^_]+)_)|(~~([^~]+)~~)/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = inlinePattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.substring(lastIndex, match.index));
    }

    const [, , mathExpr, isLinkOrImg, linkText, linkUrl, , codeText, , boldText, , italicTextStar, italicTextUnder, , strikeText] =
      match;

    const italicText = italicTextStar || italicTextUnder;

    if (mathExpr) {
      // 1. Inline Math: $...$
      nodes.push(
        <MathFormula
          key={`math-inline-${keyIndex++}`}
          math={mathExpr}
          displayMode={false}
        />
      );
    } else if (isLinkOrImg) {
      const isImg = isLinkOrImg.startsWith("!");
      const rawUrl = linkUrl || "";
      const isSafe = isSafeUrl(rawUrl);

      if (isImg) {
        if (isSafe) {
          nodes.push(
            <span
              key={`img-${keyIndex++}`}
              className="inline-block my-4 rounded-xl overflow-hidden border border-border shadow-sm max-w-full"
            >
              <img
                src={rawUrl}
                alt={linkText || "Embedded graphic"}
                className="w-full h-auto max-h-[480px] object-cover"
                loading="lazy"
              />
              {linkText && (
                <span className="block px-3 py-1.5 text-center text-xs text-muted-foreground italic bg-surface-subtle border-t border-border">
                  {linkText}
                </span>
              )}
            </span>
          );
        }
      } else {
        if (isSafe) {
          const isExternal = rawUrl.startsWith("http://") || rawUrl.startsWith("https://");
          nodes.push(
            <a
              key={`link-${keyIndex++}`}
              href={rawUrl}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-primary hover:underline font-medium inline-flex items-center gap-0.5 transition-colors"
            >
              <span>{linkText || rawUrl}</span>
              {isExternal && <ExternalLink className="w-3 h-3 opacity-60 inline" />}
            </a>
          );
        } else {
          nodes.push(linkText || rawUrl);
        }
      }
    } else if (codeText) {
      nodes.push(
        <code
          key={`code-${keyIndex++}`}
          className="px-1.5 py-0.5 rounded-md bg-surface-subtle border border-border text-primary text-xs font-mono break-words"
        >
          {codeText}
        </code>
      );
    } else if (boldText) {
      nodes.push(
        <strong key={`bold-${keyIndex++}`} className="font-bold text-foreground">
          {boldText}
        </strong>
      );
    } else if (italicText) {
      nodes.push(
        <em key={`italic-${keyIndex++}`} className="italic text-foreground">
          {italicText}
        </em>
      );
    } else if (strikeText) {
      nodes.push(
        <del key={`strike-${keyIndex++}`} className="line-through text-muted-foreground">
          {strikeText}
        </del>
      );
    }

    lastIndex = inlinePattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.substring(lastIndex));
  }

  return nodes;
}

/**
 * Full Markdown Document Renderer with Math, Alerts, Tables, Code Blocks, and Checklists.
 */
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

      // 2. Fenced Code Blocks: ``` ... ```
      if (line.startsWith("```")) {
        const language = line.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i]?.startsWith("```")) {
          codeLines.push(lines[i] ?? "");
          i++;
        }
        i++; // skip closing ```
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
      if (line.includes("|") && lines[i + 1]?.includes("|") && lines[i + 1]?.includes("-")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i]?.includes("|")) {
          tableLines.push(lines[i]!.trim());
          i++;
        }

        if (tableLines.length >= 2) {
          const headerCells = tableLines[0]!
            .split("|")
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => c.trim());

          const alignDefs = tableLines[1]!
            .split("|")
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => {
              const trimmed = c.trim();
              if (trimmed.startsWith(":") && trimmed.endsWith(":")) return "center";
              if (trimmed.endsWith(":")) return "right";
              return "left";
            });

          const bodyRows = tableLines.slice(2).map((rowLine) =>
            rowLine
              .split("|")
              .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
              .map((c) => c.trim())
          );

          result.push(
            <div
              key={`table-${blockIndex++}`}
              className="my-6 w-full overflow-x-auto rounded-2xl border border-border shadow-sm"
            >
              <table className="w-full border-collapse text-xs sm:text-sm text-left">
                <thead>
                  <tr className="bg-surface-subtle border-b border-border">
                    {headerCells.map((header, idx) => (
                      <th
                        key={idx}
                        className={cn(
                          "px-4 py-3 font-semibold text-foreground uppercase tracking-wider text-xs",
                          alignDefs[idx] === "center"
                            ? "text-center"
                            : alignDefs[idx] === "right"
                            ? "text-right"
                            : "text-left"
                        )}
                      >
                        {renderInlineMarkdown(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-surface">
                  {bodyRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-surface-subtle/50 transition-colors"
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={cn(
                            "px-4 py-2.5 text-foreground leading-relaxed",
                            alignDefs[cIdx] === "center"
                              ? "text-center"
                              : alignDefs[cIdx] === "right"
                              ? "text-right"
                              : "text-left"
                          )}
                        >
                          {renderInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                <input
                  type="checkbox"
                  checked={task.checked}
                  disabled={!interactiveChecklists}
                  onChange={(e) => onChecklistToggle?.(task.itemIdx, e.target.checked)}
                  className="mt-1 rounded accent-primary cursor-pointer size-4"
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
        !lines[i]?.includes("|")
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
