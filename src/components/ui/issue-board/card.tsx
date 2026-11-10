"use client";

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useId,
  type ReactNode,
  type RefObject,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  CalendarClock,
  FolderKanban,
  Tags,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type BoardIssue, STATUS_META, DisplayContext } from "./types";
import { StatusIcon, PriorityIcon, MemberAvatar } from "./icons";

export function IssueListRow({ issue }: { issue: BoardIssue }) {
  const display = useContext(DisplayContext);
  return (
    <article
      className="rudder-list-row border-b border-[var(--mova-ai-border-soft,#ededed)] px-4 py-3"
      data-testid={`issue-row-${issue.id}`}
    >
      <div className="flex min-w-0 items-start gap-2.5">
        <span className="mt-0.5" title={STATUS_META[issue.status].label}>
          <span className="sr-only">{STATUS_META[issue.status].label}</span>
          <StatusIcon status={issue.status} />
        </span>
        {display.includes("Identifier") ? (
          <span className="shrink-0 pt-0.5 font-mono text-xs text-[color:var(--mova-ai-ink-muted,#858585)]">
            {issue.id}
          </span>
        ) : null}
        <h3 className="min-w-0 flex-1 break-words text-sm font-medium leading-relaxed text-[color:var(--mova-ai-ink,#202020)]">
          {issue.title}
        </h3>
      </div>
      <div className="rudder-list-meta flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[color:var(--mova-ai-ink-secondary,#666)]">
        {display.includes("Priority") ? (
          <span title={`${issue.priority} priority`}>
            <span className="sr-only">{issue.priority} priority</span>
            <PriorityIcon priority={issue.priority} />
          </span>
        ) : null}
        {display.includes("Labels")
          ? issue.labels.map((label) => (
              <span
                key={label}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[var(--mova-ai-border,#dedede)] px-2 py-0.5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mova-ai-neutral-status,#69737d)]" />
                <span className="break-words">{label}</span>
              </span>
            ))
          : null}
        {display.includes("Assignee") ? (
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <MemberAvatar name={issue.assignee} />
            <span className="break-words">{issue.assignee}</span>
          </span>
        ) : null}
        {display.includes("Reviewer") && issue.reviewer ? (
          <span className="inline-flex items-center gap-1" title="Reviewer">
            <UserCheck className="h-3 w-3 shrink-0" />
            {issue.reviewer}
          </span>
        ) : null}
        {display.includes("Project") ? (
          <span className="rudder-list-project break-words">{issue.project}</span>
        ) : null}
        {display.includes("Created") ? (
          <span className="whitespace-nowrap">{issue.created}</span>
        ) : null}
        {display.includes("Updated") ? (
          <span className="whitespace-nowrap">
            Updated {issue.updated ?? issue.created}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function IssueCardBody({ issue }: { issue: BoardIssue }) {
  const display = useContext(DisplayContext);
  return (
    <div className="min-w-0 select-none">
      <div className="flex min-w-0 items-start gap-2">
        <span className="min-w-0 flex-1 font-mono text-xs text-[color:var(--mova-ai-ink-muted,#858585)]">
          {display.includes("Identifier") ? issue.id : ""}
        </span>
        {display.includes("Assignee") ? (
          <span className="inline-flex min-w-0 max-w-[8.5rem] shrink items-center gap-1 overflow-hidden text-xs text-[color:var(--mova-ai-ink-secondary,#666)]">
            <MemberAvatar name={issue.assignee} />
            <span className="truncate">{issue.assignee}</span>
          </span>
        ) : null}
      </div>
      <p className="mt-2 break-words text-sm leading-snug text-[color:var(--mova-ai-ink,#202020)]">
        {issue.title}
      </p>
      {display.includes("Priority") ? (
        <div className="mt-2 flex min-w-0 items-center gap-1.5 overflow-hidden text-xs text-[color:var(--mova-ai-ink-muted,#858585)]">
          <PriorityIcon priority={issue.priority} />
          <span className="capitalize">{issue.priority}</span>
        </div>
      ) : null}
      <div className="mt-2 space-y-1.5 border-t border-[var(--mova-ai-border-soft,#ededed)] pt-2 text-xs text-[color:var(--mova-ai-ink-muted,#858585)]">
        {display.includes("Project") ? (
          <div className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <FolderKanban className="h-3 w-3" />
              Project
            </span>
            <span className="truncate text-right">{issue.project}</span>
          </div>
        ) : null}
        {display.includes("Reviewer") && issue.reviewer ? (
          <div className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <UserCheck className="h-3 w-3" />
              Reviewer
            </span>
            <span className="truncate text-right">{issue.reviewer}</span>
          </div>
        ) : null}
        {display.includes("Labels") ? (
          <div className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <Tags className="h-3 w-3" />
              Labels
            </span>
            <span className="truncate text-right">
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--mova-ai-border,#dedede)] px-1.5 py-0.5 text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--mova-ai-neutral-status,#69737d)]" />
                {issue.labels[0] ?? "None"}
              </span>
            </span>
          </div>
        ) : null}
        {display.includes("Created") ? (
          <div className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="h-3 w-3" />
              Created
            </span>
            <span className="truncate text-right">{issue.created}</span>
          </div>
        ) : null}
        {display.includes("Updated") ? (
          <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-2">
            <span>Updated</span>
            <span className="truncate text-right">
              {issue.updated ?? issue.created}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export interface LocalSortableCardProps {
  issue: BoardIssue;
  isDragging: boolean;
  onPointerDownCard: (e: ReactPointerEvent<HTMLElement>, issue: BoardIssue) => void;
  onKeyDownCard: (e: ReactKeyboardEvent<HTMLElement>, issue: BoardIssue) => void;
}

export function LocalSortableIssueCard({
  issue,
  isDragging,
  onPointerDownCard,
  onKeyDownCard,
}: LocalSortableCardProps) {
  return (
    <article
      tabIndex={0}
      onPointerDown={(e) => onPointerDownCard(e, issue)}
      onKeyDown={(e) => onKeyDownCard(e, issue)}
      className={`motion-kanban-card cursor-grab touch-pan-x overflow-hidden rounded-[9px] border border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-surface,#fff)] p-2.5 outline-none transition-[box-shadow,opacity,border-color] motion-reduce:transition-none focus-visible:border-[var(--mova-ai-border-strong,#c8c8c8)] focus-visible:ring-2 focus-visible:ring-[var(--mova-ai-border-strong,#c8c8c8)] active:cursor-grabbing ${
        isDragging
          ? "opacity-25"
          : "hover:border-[var(--mova-ai-border-strong,#c8c8c8)] hover:shadow-sm"
      }`}
      data-dragging={isDragging ? "true" : "false"}
      data-issue-id={issue.id}
      data-status={issue.status}
      data-testid={`kanban-card-${issue.id}`}
      aria-grabbed={isDragging}
    >
      <IssueCardBody issue={issue} />
    </article>
  );
}

export function ToolbarPopover({
  label,
  icon,
  children,
  triggerRef,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!open) return;
    const container = root.current;
    const popup = panel.current;
    const board = container?.closest<HTMLElement>(
      'section[aria-label="Rudder issue board"]'
    );
    if (!container || !popup || !board) return;
    const position = () => {
      const anchor = container.getBoundingClientRect();
      const bounds = board.getBoundingClientRect();
      const scale = container.offsetWidth ? anchor.width / container.offsetWidth : 1;
      if (!scale) return;
      const inset = 8 * scale;
      popup.style.maxWidth = `${Math.max(0, (bounds.width - inset * 2) / scale)}px`;
      const width = popup.getBoundingClientRect().width;
      const left = Math.max(
        bounds.left + inset,
        Math.min(anchor.right - width, bounds.right - inset - width)
      );
      popup.style.left = `${(left - anchor.left) / scale}px`;
      popup.style.right = "auto";
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(board);
    observer.observe(container);
    window.addEventListener("resize", position);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", position);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("input:checked, button, input")?.focus();
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        )
          setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={(node) => {
          trigger.current = node;
          if (triggerRef) triggerRef.current = node;
        }}
        type="button"
        aria-label={
          label === "Sort"
            ? "Sort issues"
            : label === "Filter"
            ? "Filter issues by status"
            : "Display fields"
        }
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:bg-[var(--mova-ai-hover,#f1f1f1)] ${
          open
            ? "bg-[var(--mova-ai-hover-strong,#e9e9e9)] text-[color:var(--mova-ai-ink,#202020)]"
            : ""
        }`}
      >
        {icon}
        {label}
        <ChevronDown className="h-3 w-3" />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            ref={panel}
            id={id}
            role="group"
            aria-label={`${label} options`}
            initial={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -3 }}
            transition={{ duration: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-30 mt-2 w-48 space-y-1 rounded-lg border border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-surface,#fff)] p-2 text-xs shadow-xl"
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
