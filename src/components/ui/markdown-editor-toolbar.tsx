"use client";

import React from "react";
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
  Trash2,
  Sigma,
  Variable,
} from "lucide-react";

export interface MarkdownEditorToolbarProps {
  insertSnippet: (before: string, after?: string, defaultContent?: string) => void;
  onClear: () => void;
}

export function MarkdownEditorToolbar({
  insertSnippet,
  onClear,
}: MarkdownEditorToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-subtle border-b border-border text-muted-foreground">
      {/* Headings */}
      <button
        type="button"
        onClick={() => insertSnippet("# ", "", "Heading 1")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Heading 1 (# )"
      >
        <Heading1 className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => insertSnippet("## ", "", "Heading 2")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Heading 2 (## )"
      >
        <Heading2 className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => insertSnippet("### ", "", "Heading 3")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Heading 3 (### )"
      >
        <Heading3 className="w-3.5 h-3.5" />
      </button>

      <span className="w-px h-4 bg-border mx-1" />

      {/* Typography Formatting */}
      <button
        type="button"
        onClick={() => insertSnippet("**", "**", "bold text")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Bold (**text**)"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => insertSnippet("*", "*", "italic text")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Italic (*text*)"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => insertSnippet("~~", "~~", "strikethrough text")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Strikethrough (~~text~~)"
      >
        <Strikethrough className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => insertSnippet("`", "`", "code")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Inline Code (`code`)"
      >
        <Code className="w-3.5 h-3.5" />
      </button>

      <span className="w-px h-4 bg-border mx-1" />

      {/* Math Formula Insertion Buttons */}
      <button
        type="button"
        onClick={() => insertSnippet("$", "$", "E = mc^2")}
        className="flex items-center gap-1 px-2 py-1 text-xs font-semibold hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer text-primary"
        title="Insert Inline Math ($formula$)"
      >
        <Variable className="w-3.5 h-3.5" />
        <span className="text-[11px] font-mono">$f(x)$</span>
      </button>

      <button
        type="button"
        onClick={() =>
          insertSnippet(
            "$$\n",
            "\n$$\n",
            "\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"
          )
        }
        className="flex items-center gap-1 px-2 py-1 text-xs font-semibold hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer text-primary"
        title="Insert Display Math Block ($$ ... $$)"
      >
        <Sigma className="w-3.5 h-3.5" />
        <span className="text-[11px] font-mono">$$\Sigma$$</span>
      </button>

      <span className="w-px h-4 bg-border mx-1" />

      {/* Blockquote & Alerts */}
      <button
        type="button"
        onClick={() => insertSnippet("> ", "", "quoted text")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Blockquote (> text)"
      >
        <Quote className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() =>
          insertSnippet("> [!NOTE]\n> ", "", "Helpful context or note.")
        }
        className="px-2 py-1 text-[11px] font-medium hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Callout Alert (> [!NOTE])"
      >
        Alert
      </button>

      <span className="w-px h-4 bg-border mx-1" />

      {/* Lists & Checklists */}
      <button
        type="button"
        onClick={() => insertSnippet("- ", "", "item")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Bullet list (- item)"
      >
        <List className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => insertSnippet("1. ", "", "item")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Numbered list (1. item)"
      >
        <ListOrdered className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => insertSnippet("- [ ] ", "", "task")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Checklist (- [ ] task)"
      >
        <CheckSquare className="w-3.5 h-3.5" />
      </button>

      <span className="w-px h-4 bg-border mx-1" />

      {/* Links & Tables */}
      <button
        type="button"
        onClick={() => insertSnippet("[", "](https://example.com)", "link title")}
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Link"
      >
        <LinkIcon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() =>
          insertSnippet(
            "![",
            "](https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80)",
            "Image description"
          )
        }
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Image"
      >
        <ImageIcon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() =>
          insertSnippet(
            "| Parameter | Type | Description |\n| :--- | :--- | :--- |\n| `id` | string | Unique identifier |\n| `value` | number | Numeric metric |\n",
            ""
          )
        }
        className="p-1.5 hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Markdown Table"
      >
        <TableIcon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() =>
          insertSnippet("```typescript\n", "\n```\n", "// Code block")
        }
        className="px-2 py-1 text-[11px] font-mono hover:bg-surface hover:text-foreground rounded-lg transition-colors cursor-pointer"
        title="Code Block"
      >
        &lt;/&gt;
      </button>

      {/* Clear Button */}
      <div className="ml-auto">
        <button
          type="button"
          onClick={onClear}
          className="p-1.5 text-muted-foreground hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
          title="Clear all content"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
