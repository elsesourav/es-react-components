"use client";

import React, { useState, useMemo } from "react";
import katex from "katex";
import {
  Check,
  Copy,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Validates URLs against XSS patterns (e.g. javascript:, data:, vbscript:).
 */
export function isSafeUrl(url: string): boolean {
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
 * High-performance, zero-dependency multi-language syntax highlighter (TSX, TS, JS, BASH, CSS, JSON).
 */
function highlightCodeLine(line: string, lang = "js"): React.ReactNode[] {
  if (!line) return [<span key="empty"> </span>];
  const l = lang.toLowerCase().trim();

  // 1. Bash / Shell scripts
  if (l === "bash" || l === "sh" || l === "shell" || l === "zsh") {
    const BASH_REGEX = /(\b(?:pnpm|npm|yarn|bun|npx|git|cd|mkdir|rm|curl|node|export)\b|\b(?:add|install|run|build|dev|init|commit|push|pull|clone|checkout)\b|--?[a-zA-Z0-9_-]+|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^$]*$)/g;
    const nodes: React.ReactNode[] = [];
    let last = 0;
    let k = 0;
    for (const match of line.matchAll(BASH_REGEX)) {
      const idx = match.index ?? 0;
      const t = match[0];
      if (idx > last) nodes.push(<span key={k++} className="text-zinc-300">{line.slice(last, idx)}</span>);
      if (t.startsWith("#")) {
        nodes.push(<span key={k++} className="text-zinc-500 italic">{t}</span>);
      } else if (/^(?:pnpm|npm|yarn|bun|npx|git|curl|node)$/.test(t)) {
        nodes.push(<span key={k++} className="text-emerald-400 font-bold">{t}</span>);
      } else if (/^(?:add|install|run|build|dev|commit|push|pull|clone)$/.test(t)) {
        nodes.push(<span key={k++} className="text-cyan-400 font-semibold">{t}</span>);
      } else if (t.startsWith("-")) {
        nodes.push(<span key={k++} className="text-amber-400 font-mono">{t}</span>);
      } else {
        nodes.push(<span key={k++} className="text-emerald-300">{t}</span>);
      }
      last = idx + t.length;
    }
    if (last < line.length) nodes.push(<span key={k++} className="text-purple-300 font-medium">{line.slice(last)}</span>);
    return nodes;
  }

  // 2. CSS / SCSS
  if (l === "css" || l === "scss") {
    const CSS_REGEX = /(\/\*[\s\S]*?\*\/|--[a-zA-Z0-9_-]+|:[a-zA-Z-]+|\b[a-zA-Z-]+(?=\s*:)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:px|rem|em|%|vh|vw|s|ms)?\b|var\([^)]+\))/g;
    const nodes: React.ReactNode[] = [];
    let last = 0;
    let k = 0;
    for (const match of line.matchAll(CSS_REGEX)) {
      const idx = match.index ?? 0;
      const t = match[0];
      if (idx > last) nodes.push(<span key={k++} className="text-zinc-300">{line.slice(last, idx)}</span>);
      if (t.startsWith("/*")) nodes.push(<span key={k++} className="text-zinc-500 italic">{t}</span>);
      else if (t.startsWith("--") || t.startsWith("var(")) nodes.push(<span key={k++} className="text-purple-400 font-semibold">{t}</span>);
      else if (/^\d/.test(t)) nodes.push(<span key={k++} className="text-amber-300">{t}</span>);
      else nodes.push(<span key={k++} className="text-cyan-400">{t}</span>);
      last = idx + t.length;
    }
    if (last < line.length) nodes.push(<span key={k++} className="text-zinc-300">{line.slice(last)}</span>);
    return nodes;
  }

  // 3. JSON
  if (l === "json") {
    const JSON_REGEX = /("(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|\b\d+(?:\.\d+)?\b)/g;
    const nodes: React.ReactNode[] = [];
    let last = 0;
    let k = 0;
    for (const match of line.matchAll(JSON_REGEX)) {
      const idx = match.index ?? 0;
      const t = match[0];
      if (idx > last) nodes.push(<span key={k++} className="text-zinc-400">{line.slice(last, idx)}</span>);
      if (t.endsWith('"') && line[idx + t.length] === ':') nodes.push(<span key={k++} className="text-cyan-400 font-medium">{t}</span>);
      else if (t.startsWith('"')) nodes.push(<span key={k++} className="text-emerald-400">{t}</span>);
      else if (/^(?:true|false|null)$/.test(t)) nodes.push(<span key={k++} className="text-purple-400 font-semibold">{t}</span>);
      else nodes.push(<span key={k++} className="text-amber-300">{t}</span>);
      last = idx + t.length;
    }
    if (last < line.length) nodes.push(<span key={k++} className="text-zinc-400">{line.slice(last)}</span>);
    return nodes;
  }

  // 4. TSX / TS / JSX / JS (Default)
  const commentMatch = line.match(/^(\s*)(\/\/.*)$/);
  if (commentMatch) {
    return [
      <span key="lead">{commentMatch[1]}</span>,
      <span key="comment" className="text-zinc-500 italic">{commentMatch[2]}</span>,
    ];
  }

  const REGEX = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|<\/?[A-Za-z][\w.-]*|\/?>|\b(?:import|from|export|default|async|await|function|const|let|var|return|if|else|for|while|type|interface|as|typeof)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*(?=\s*\()|=>|\/\/.*$)/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of line.matchAll(REGEX)) {
    const idx = match.index ?? 0;
    const token = match[0];

    if (idx > lastIndex) {
      nodes.push(
        <span key={key++} className="text-zinc-300">
          {line.slice(lastIndex, idx)}
        </span>
      );
    }

    if (token.startsWith("//")) {
      nodes.push(
        <span key={key++} className="text-zinc-500 italic">
          {token}
        </span>
      );
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
      nodes.push(
        <span key={key++} className="text-emerald-400">
          {token}
        </span>
      );
    } else if (token.startsWith("<") || token === ">" || token === "/>") {
      nodes.push(
        <span key={key++} className="text-cyan-400 font-medium">
          {token}
        </span>
      );
    } else if (
      /^(?:import|from|export|default|async|await|function|const|let|var|return|if|else|for|while|type|interface|as|typeof)$/.test(
        token
      )
    ) {
      nodes.push(
        <span key={key++} className="text-purple-400 font-semibold">
          {token}
        </span>
      );
    } else if (/^(?:true|false|null|undefined)$/.test(token)) {
      nodes.push(
        <span key={key++} className="text-amber-400 font-mono">
          {token}
        </span>
      );
    } else if (/^\d/.test(token)) {
      nodes.push(
        <span key={key++} className="text-amber-300">
          {token}
        </span>
      );
    } else if (token === "=>") {
      nodes.push(
        <span key={key++} className="text-pink-400 font-bold">
          {token}
        </span>
      );
    } else {
      nodes.push(
        <span key={key++} className="text-blue-400 font-medium">
          {token}
        </span>
      );
    }

    lastIndex = idx + token.length;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <span key={key++} className="text-zinc-300">
        {line.slice(lastIndex)}
      </span>
    );
  }

  return nodes;
}

/**
 * Performant Code Block with copy-to-clipboard functionality and live syntax highlighting.
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

  const lines = code.split("\n");

  return (
    <div className="my-5 rounded-2xl overflow-hidden border border-border bg-zinc-950 text-zinc-100 font-mono text-xs shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400 text-[11px]">
        <span className="uppercase tracking-wider font-semibold text-zinc-300 flex items-center gap-1.5 font-mono">
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
      <pre className="p-4 overflow-x-auto max-h-[560px] overflow-y-auto max-w-full text-zinc-200 leading-relaxed font-mono selection:bg-primary/30 text-[12px] scrollbar-thin">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="table-row">
              <span className="table-cell pr-4 select-none text-right font-mono text-[11px] text-zinc-600">
                {idx + 1}
              </span>
              <span className="table-cell">
                {highlightCodeLine(line, language)}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/**
 * Parses inline Markdown tokens including Math, Bold, Italic, Strikethrough, Code, Links, Images.
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return "";

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
