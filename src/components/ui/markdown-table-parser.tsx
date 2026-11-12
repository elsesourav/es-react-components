import React from "react";
import { cn } from "@/lib/utils";
import { renderInlineMarkdown } from "./markdown-inline";

/**
 * Accurately parses a Markdown table row into individual cell strings.
 * Handles:
 * - Leading / trailing pipe boundaries
 * - Pipes inside inline code spans (`...`) without false splitting
 * - Escaped pipes (\|) without false splitting, unescaping them for cell content
 */
export function splitMarkdownTableRow(line: string): string[] {
  let cleanLine = line.trim();
  if (cleanLine.startsWith("|")) {
    cleanLine = cleanLine.slice(1);
  }
  if (cleanLine.endsWith("|") && !cleanLine.endsWith("\\|")) {
    cleanLine = cleanLine.slice(0, -1);
  }

  const cells: string[] = [];
  let current = "";
  let inCode = false;
  let isEscaped = false;

  for (let i = 0; i < cleanLine.length; i++) {
    const char = cleanLine[i];

    if (isEscaped) {
      if (char === "|") {
        current += "|";
      } else {
        current += "\\" + char;
      }
      isEscaped = false;
      continue;
    }

    if (char === "\\") {
      isEscaped = true;
      continue;
    }

    if (char === "`") {
      inCode = !inCode;
      current += char;
      continue;
    }

    if (char === "|" && !inCode) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (isEscaped) {
    current += "\\";
  }

  cells.push(current.trim());
  return cells;
}

export function isMarkdownTableSeparator(line?: string): boolean {
  return Boolean(line && line.includes("|") && /^\s*\|?\s*:?-+:?\s*\|/.test(line));
}

export interface MarkdownTableProps {
  tableLines: string[];
}

export const MarkdownTable: React.FC<MarkdownTableProps> = ({ tableLines }) => {
  if (tableLines.length < 2) return null;

  const headerCells = splitMarkdownTableRow(tableLines[0]!);

  const alignDefs = splitMarkdownTableRow(tableLines[1]!).map((c) => {
    const trimmed = c.trim();
    if (trimmed.startsWith(":") && trimmed.endsWith(":")) return "center";
    if (trimmed.endsWith(":")) return "right";
    return "left";
  });

  const bodyRows = tableLines
    .slice(2)
    .filter((rowLine) => rowLine.trim().length > 0)
    .map((rowLine) => splitMarkdownTableRow(rowLine));

  const isPropTable =
    headerCells.length === 4 &&
    headerCells[0]?.toLowerCase().includes("prop") &&
    headerCells[1]?.toLowerCase().includes("type");

  return (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border bg-surface/40 shadow-sm">
      <table className="w-full border-collapse text-xs sm:text-sm text-left">
        <thead>
          <tr className="bg-surface-subtle/80 border-b border-border/80">
            {headerCells.map((header, idx) => {
              const align = alignDefs[idx] || "left";
              return (
                <th
                  key={idx}
                  className={cn(
                    "px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider text-[11px] sm:text-xs select-none",
                    align === "center"
                      ? "text-center"
                      : align === "right"
                      ? "text-right"
                      : "text-left",
                    isPropTable && idx === 0 && "w-[18%] min-w-[130px]",
                    isPropTable && idx === 1 && "w-[34%] min-w-[180px]",
                    isPropTable && idx === 2 && "w-[16%] min-w-[110px]",
                    isPropTable && idx === 3 && "w-[32%] min-w-[220px]"
                  )}
                >
                  {renderInlineMarkdown(header)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 bg-surface/30">
          {bodyRows.map((row, rIdx) => {
            const normalizedRow = headerCells.map((_, cIdx) => row[cIdx] ?? "");
            return (
              <tr
                key={rIdx}
                className="hover:bg-surface-subtle/40 transition-colors"
              >
                {normalizedRow.map((cell, cIdx) => {
                  const align = alignDefs[cIdx] || "left";
                  return (
                    <td
                      key={cIdx}
                      className={cn(
                        "px-4 py-2.5 text-foreground leading-relaxed align-top",
                        align === "center"
                          ? "text-center"
                          : align === "right"
                          ? "text-right"
                          : "text-left",
                        isPropTable && cIdx === 0 && "font-mono font-medium text-xs text-primary/95",
                        isPropTable && cIdx === 2 && "font-mono text-xs text-muted-foreground",
                        isPropTable && cIdx === 3 && "text-xs sm:text-sm text-foreground/85"
                      )}
                    >
                      {renderInlineMarkdown(cell)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
