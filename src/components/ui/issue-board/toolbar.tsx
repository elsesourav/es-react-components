"use client";

import React from "react";
import {
  Filter,
  List,
  Columns3,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
} from "lucide-react";
import {
  type BoardStatus,
  type BoardIssue,
  type DisplayField,
  BOARD_STATUSES,
  STATUS_META,
  DISPLAY_FIELDS,
} from "./types";
import { ToolbarPopover } from "./card";

export interface BoardToolbarProps {
  issues: BoardIssue[];
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  view: "board" | "list";
  setView: React.Dispatch<React.SetStateAction<"board" | "list">>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  descending: boolean;
  setDescending: React.Dispatch<React.SetStateAction<boolean>>;
  display: DisplayField[];
  setDisplay: React.Dispatch<React.SetStateAction<DisplayField[]>>;
  sortGroupId: string;
  statusFilterRef: React.RefObject<HTMLButtonElement | null>;
}

export function BoardToolbar({
  issues,
  statusFilter,
  setStatusFilter,
  view,
  setView,
  sort,
  setSort,
  descending,
  setDescending,
  display,
  setDisplay,
  sortGroupId,
  statusFilterRef,
}: BoardToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[var(--mova-ai-border,#dedede)] px-4 py-3 text-xs text-[color:var(--mova-ai-ink-secondary,#666)]">
      <h2 className="mr-auto text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--mova-ai-ink-secondary,#666)]">
        Issues
      </h2>
      <div className="flex flex-wrap items-center justify-end gap-1">
        <button
          type="button"
          aria-label="Show working issues"
          aria-pressed={statusFilter === "in_progress"}
          onClick={() =>
            setStatusFilter((value) =>
              value === "in_progress" ? "all" : "in_progress"
            )
          }
          className={`mr-1 rounded-md border border-[var(--mova-ai-border,#dedede)] px-2.5 py-1.5 tabular-nums transition-colors hover:bg-[var(--mova-ai-hover,#f1f1f1)] ${
            statusFilter === "in_progress"
              ? "bg-[var(--mova-ai-hover-strong,#e9e9e9)] text-[color:var(--mova-ai-ink,#202020)]"
              : ""
          }`}
        >
          {issues.filter((issue) => issue.status === "in_progress").length} working
        </button>
        <div className="mr-1 flex rounded-md border border-[var(--mova-ai-border,#dedede)] p-0.5">
          <button
            type="button"
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className={`rounded p-1 transition-colors ${
              view === "list"
                ? "bg-[var(--mova-ai-hover-strong,#e9e9e9)] text-[color:var(--mova-ai-ink,#202020)]"
                : ""
            }`}
          >
            <List className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Board view"
            aria-pressed={view === "board"}
            onClick={() => setView("board")}
            className={`rounded p-1 transition-colors ${
              view === "board"
                ? "bg-[var(--mova-ai-hover-strong,#e9e9e9)] text-[color:var(--mova-ai-ink,#202020)]"
                : ""
            }`}
          >
            <Columns3 className="h-3.5 w-3.5" />
          </button>
        </div>
        <ToolbarPopover
          label="Filter"
          triggerRef={statusFilterRef}
          icon={<Filter className="h-3 w-3" />}
        >
          <div role="radiogroup" aria-label="Issue status">
            {["all", ...BOARD_STATUSES].map((status) => (
              <label
                key={status}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-[var(--mova-ai-hover,#f1f1f1)]"
              >
                <input
                  type="radio"
                  className="accent-[var(--mova-ai-accent,#454545)]"
                  name={`${sortGroupId}-status`}
                  checked={statusFilter === status}
                  onChange={() => setStatusFilter(status)}
                />
                {status === "all" ? "All statuses" : STATUS_META[status as BoardStatus].label}
              </label>
            ))}
          </div>
        </ToolbarPopover>
        <ToolbarPopover label="Sort" icon={<ArrowUpDown className="h-3 w-3" />}>
          <div role="radiogroup" aria-label="Sort field">
            {["Manual", "Status", "Priority", "Title", "Created", "Updated"].map(
              (value) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-[var(--mova-ai-hover,#f1f1f1)] ${
                    sort === value
                      ? "bg-[var(--mova-ai-hover,#f1f1f1)] text-[color:var(--mova-ai-ink,#202020)]"
                      : ""
                  }`}
                >
                  <input
                    className="accent-[var(--mova-ai-accent,#454545)]"
                    type="radio"
                    name={sortGroupId}
                    checked={sort === value}
                    onChange={() => setSort(value)}
                  />
                  {value}
                  {sort === value ? <Check className="ml-auto h-3 w-3" /> : null}
                </label>
              )
            )}
          </div>
          <button
            type="button"
            disabled={sort === "Manual"}
            onClick={() => setDescending((value) => !value)}
            aria-label="Toggle sort direction"
            className="flex w-full items-center gap-2 border-t border-[var(--mova-ai-border,#dedede)] px-2 py-2 text-left disabled:opacity-40"
          >
            <ArrowUpDown className="h-3 w-3" />
            {descending ? "Descending" : "Ascending"}
          </button>
        </ToolbarPopover>
        <ToolbarPopover
          label="Display"
          icon={<SlidersHorizontal className="h-3 w-3" />}
        >
          {DISPLAY_FIELDS.map((field) => (
            <label
              key={field}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-[var(--mova-ai-hover,#f1f1f1)]"
            >
              <input
                className="accent-[var(--mova-ai-accent,#454545)]"
                type="checkbox"
                checked={display.includes(field)}
                onChange={() =>
                  setDisplay((fields) =>
                    fields.includes(field)
                      ? fields.filter((value) => value !== field)
                      : [...fields, field]
                  )
                }
              />
              {field}
            </label>
          ))}
        </ToolbarPopover>
      </div>
    </div>
  );
}

export interface BoardCreateFormProps {
  creating: BoardStatus;
  draft: string;
  setDraft: React.Dispatch<React.SetStateAction<string>>;
  setCreating: React.Dispatch<React.SetStateAction<BoardStatus | null>>;
  createInputRef: React.RefObject<HTMLInputElement | null>;
  closeCreate: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BoardCreateForm({
  creating,
  draft,
  setDraft,
  setCreating,
  createInputRef,
  closeCreate,
  onSubmit,
}: BoardCreateFormProps) {
  return (
    <form
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeCreate();
        }
      }}
      className="flex flex-wrap items-center gap-2 border-b border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-hover,#f1f1f1)] p-3"
      onSubmit={onSubmit}
    >
      <input
        ref={createInputRef}
        required
        aria-label="New issue title"
        placeholder="Issue title"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        className="min-w-0 flex-1 rounded border border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-field,#f6f6f6)] px-2 py-1.5 text-sm"
      />
      <select
        aria-label="New issue status"
        value={creating}
        onChange={(event) => setCreating(event.target.value as BoardStatus)}
        className="rounded bg-[var(--mova-ai-canvas,#f4f4f4)] p-1 text-xs"
      >
        {BOARD_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_META[status].label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded bg-[var(--mova-ai-accent,#454545)] px-3 py-1.5 text-xs text-[color:var(--mova-ai-accent-foreground,#fff)]"
      >
        Create
      </button>
      <button type="button" onClick={closeCreate} className="px-2 text-xs">
        Cancel
      </button>
    </form>
  );
}
