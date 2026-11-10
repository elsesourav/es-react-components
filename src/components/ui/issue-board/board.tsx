"use client";

import React, {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  Plus,
  Filter,
  List,
  Columns3,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AI_THEME_STYLES } from "../ai-theme-styles";
import { BOARD_SCOPED_STYLES } from "./styles";
import {
  type BoardStatus,
  type BoardIssue,
  type RudderIssueBoardProps,
  type DisplayField,
  BOARD_STATUSES,
  STATUS_META,
  DEFAULT_ISSUES,
  DISPLAY_FIELDS,
  DisplayContext,
} from "./types";
import { StatusIcon } from "./icons";
import {
  IssueListRow,
  IssueCardBody,
  LocalSortableIssueCard,
  ToolbarPopover,
} from "./card";

export function RudderIssueBoard({
  theme = "dark",
  className = "",
  initialIssues = DEFAULT_ISSUES,
  onIssuesChange,
}: RudderIssueBoardProps) {
  const rootRef = useRef<HTMLElement>(null);
  const sortGroupId = useId();
  const [issues, setIssues] = useState<BoardIssue[]>(() => [...initialIssues]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("Manual");
  const [descending, setDescending] = useState(false);
  const [view, setView] = useState<"board" | "list">("board");
  const [display, setDisplay] = useState<DisplayField[]>(
    DISPLAY_FIELDS.filter((field) => field !== "Updated")
  );
  const [creating, setCreating] = useState<BoardStatus | null>(null);
  const [draft, setDraft] = useState("");
  const createInputRef = useRef<HTMLInputElement>(null);
  const createTriggerRef = useRef<HTMLElement | null>(null);
  const listCreateRef = useRef<HTMLButtonElement>(null);
  const statusFilterRef = useRef<HTMLButtonElement>(null);
  const createOpen = creating !== null;

  const restoreCreateFocus = () =>
    requestAnimationFrame(() => {
      const original = createTriggerRef.current;
      (original?.isConnected
        ? original
        : listCreateRef.current ?? statusFilterRef.current
      )?.focus();
    });

  const openCreate = (status: BoardStatus, trigger: HTMLElement) => {
    createTriggerRef.current = trigger;
    setCreating(status);
    setDraft("");
  };

  const closeCreate = () => {
    setCreating(null);
    restoreCreateFocus();
  };

  useEffect(() => {
    if (createOpen) createInputRef.current?.focus();
  }, [createOpen]);

  const orderedIssues = useMemo(() => {
    const matches = issues;
    if (sort === "Manual") return matches;
    const dateValue = (value: string): string | number => {
      const timestamp = Date.parse(value);
      return Number.isNaN(timestamp) ? value : timestamp;
    };
    return [...matches].sort((a, b) => {
      const value = (issue: BoardIssue): string | number =>
        sort === "Status"
          ? BOARD_STATUSES.indexOf(issue.status)
          : sort === "Priority"
          ? ["critical", "high", "medium", "low"].indexOf(issue.priority)
          : sort === "Title"
          ? issue.title
          : dateValue(sort === "Updated" ? issue.updated ?? issue.created : issue.created);
      const av = value(a),
        bv = value(b);
      const delta =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, { numeric: true });
      return descending ? -delta : delta;
    });
  }, [issues, sort, descending]);

  const filtered = useMemo(
    () =>
      orderedIssues.filter(
        (issue) => statusFilter === "all" || issue.status === statusFilter
      ),
    [orderedIssues, statusFilter]
  );

  const grouped = useMemo(
    () =>
      Object.fromEntries(
        BOARD_STATUSES.map((status) => [
          status,
          filtered.filter((issue) => issue.status === status),
        ])
      ) as Record<BoardStatus, BoardIssue[]>,
    [filtered]
  );

  const visibleStatuses = BOARD_STATUSES.filter((status) => grouped[status].length > 0);
  const hiddenStatuses = BOARD_STATUSES.filter((status) => grouped[status].length === 0);

  // Drag & Drop State
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<BoardStatus | null>(null);
  const [overIssueId, setOverIssueId] = useState<string | null>(null);
  const [overlayPos, setOverlayPos] = useState<{ x: number; y: number } | null>(null);
  const dragStartPos = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);
  const [announcement, setAnnouncement] = useState(
    "Issue board ready. Pick up a card to move it between status columns."
  );
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const activeIssue = activeId
    ? issues.find((issue) => issue.id === activeId) ?? null
    : null;

  const commitMove = (
    movingId: string,
    targetStatus: BoardStatus,
    targetBeforeIssueId?: string | null
  ) => {
    const movingIssue = issues.find((issue) => issue.id === movingId);
    if (!movingIssue) return;

    const sourceStatus = movingIssue.status;
    const allGrouped = Object.fromEntries(
      BOARD_STATUSES.map((status) => [
        status,
        orderedIssues.filter((issue) => issue.status === status),
      ])
    ) as Record<BoardStatus, BoardIssue[]>;

    const targetLaneBeforeMove = allGrouped[targetStatus];
    const nextByStatus = Object.fromEntries(
      BOARD_STATUSES.map((status) => [
        status,
        allGrouped[status].filter((issue) => issue.id !== movingId),
      ])
    ) as Record<BoardStatus, BoardIssue[]>;

    const targetLane = nextByStatus[targetStatus];
    const overIndex = targetBeforeIssueId
      ? targetLaneBeforeMove.findIndex((issue) => issue.id === targetBeforeIssueId)
      : -1;
    const insertAt =
      overIndex >= 0 ? Math.min(overIndex, targetLane.length) : targetLane.length;

    targetLane.splice(insertAt, 0, { ...movingIssue, status: targetStatus });
    const nextIssues = BOARD_STATUSES.flatMap((status) => nextByStatus[status]);

    if (
      sourceStatus !== targetStatus ||
      nextIssues.map((issue) => issue.id).join("|") !==
        issues.map((issue) => issue.id).join("|")
    ) {
      setSort("Manual");
      setIssues(nextIssues);
      onIssuesChange?.(nextIssues);
      setAnnouncement(`${movingIssue.id} moved to ${STATUS_META[targetStatus].label}.`);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const movedCard = Array.from(
            rootRef.current?.querySelectorAll<HTMLElement>("[data-issue-id]") ?? []
          ).find((card) => card.dataset.issueId === movingId);
          (movedCard ?? statusFilterRef.current)?.focus({ preventScroll: true });
        })
      );
    } else {
      setAnnouncement(`${movingIssue.id} stayed in ${STATUS_META[targetStatus].label}.`);
    }
  };

  const handlePointerDownCard = (
    e: ReactPointerEvent<HTMLElement>,
    issue: BoardIssue
  ) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, select, textarea")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    let isDraggingInitiated = false;
    const currentIssueId = issue.id;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!dragStartPos.current) return;
      const dx = moveEvent.clientX - dragStartPos.current.x;
      const dy = moveEvent.clientY - dragStartPos.current.y;
      const distance = Math.hypot(dx, dy);

      if (!isDraggingInitiated && distance > 5) {
        isDraggingInitiated = true;
        setActiveId(currentIssueId);
        setAnnouncement(
          `Picked up ${issue.id}. Current status: ${STATUS_META[issue.status].label}.`
        );
      }

      if (isDraggingInitiated) {
        setOverlayPos({
          x: moveEvent.clientX - dragStartPos.current.offsetX,
          y: moveEvent.clientY - dragStartPos.current.offsetY,
        });

        const elementsUnder = document.elementsFromPoint(
          moveEvent.clientX,
          moveEvent.clientY
        );
        let foundStatus: BoardStatus | null = null;
        let foundIssueId: string | null = null;

        for (const el of elementsUnder) {
          const targetCard = el.closest<HTMLElement>("[data-issue-id]");
          if (targetCard && targetCard.dataset.issueId !== currentIssueId) {
            foundIssueId = targetCard.dataset.issueId ?? null;
            const cardStatus = targetCard.dataset.status as BoardStatus | undefined;
            if (cardStatus && BOARD_STATUSES.includes(cardStatus)) {
              foundStatus = cardStatus;
            }
            break;
          }
          const lane = el.closest<HTMLElement>("[data-status]");
          if (lane) {
            const laneStatus = lane.dataset.status as BoardStatus | undefined;
            if (laneStatus && BOARD_STATUSES.includes(laneStatus)) {
              foundStatus = laneStatus;
              break;
            }
          }
        }

        setOverStatus(foundStatus);
        setOverIssueId(foundIssueId);
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);

      if (isDraggingInitiated) {
        if (overStatus) {
          commitMove(currentIssueId, overStatus, overIssueId);
        } else {
          setAnnouncement("Move cancelled.");
        }
      }

      dragStartPos.current = null;
      setActiveId(null);
      setOverStatus(null);
      setOverIssueId(null);
      setOverlayPos(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  };

  const handleKeyDownCard = (e: ReactKeyboardEvent<HTMLElement>, issue: BoardIssue) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (activeId === issue.id) {
        if (overStatus) {
          commitMove(issue.id, overStatus, overIssueId);
        } else {
          setAnnouncement(`${issue.id} placed in ${STATUS_META[issue.status].label}.`);
        }
        setActiveId(null);
        setOverStatus(null);
        setOverIssueId(null);
      } else {
        setActiveId(issue.id);
        setOverStatus(issue.status);
        setAnnouncement(
          `Picked up ${issue.id}. Current status: ${STATUS_META[issue.status].label}. Use Left and Right arrows to move between columns, Up and Down to reorder, Space or Enter to drop.`
        );
      }
      return;
    }

    if (e.key === "Escape" && activeId === issue.id) {
      e.preventDefault();
      setActiveId(null);
      setOverStatus(null);
      setOverIssueId(null);
      setAnnouncement("Move cancelled.");
      return;
    }

    if (activeId === issue.id) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const currentLane = overStatus ?? issue.status;
        const currentIndex = BOARD_STATUSES.indexOf(currentLane);
        const nextIndex =
          e.key === "ArrowRight"
            ? (currentIndex + 1) % BOARD_STATUSES.length
            : (currentIndex - 1 + BOARD_STATUSES.length) % BOARD_STATUSES.length;
        const nextStatus = BOARD_STATUSES[nextIndex];
        setOverStatus(nextStatus);
        setAnnouncement(`Over ${STATUS_META[nextStatus].label} column.`);
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const targetLane = overStatus ?? issue.status;
        const laneCards = grouped[targetLane] || [];
        const currentIndex = laneCards.findIndex((i) => i.id === issue.id);
        const newIndex =
          e.key === "ArrowDown"
            ? Math.min(currentIndex + 1, laneCards.length - 1)
            : Math.max(currentIndex - 1, 0);
        const targetBefore = laneCards[newIndex]?.id ?? null;
        setOverIssueId(targetBefore);
        setAnnouncement(
          `Position ${newIndex + 1} of ${Math.max(1, laneCards.length)}.`
        );
      }
    }
  };

  return (
    <section
      ref={rootRef}
      data-theme={theme}
      className={`mova-ai-theme rudder-board w-full min-w-0 min-h-[620px] bg-[var(--mova-ai-canvas,#202020)] text-[color:var(--mova-ai-ink,#eeeeee)] ${className}`}
      aria-label="Rudder issue board"
    >
      <style>{AI_THEME_STYLES}{BOARD_SCOPED_STYLES}</style>
      <p className="sr-only" aria-live="assertive">
        {announcement}
      </p>

      {/* Toolbar */}
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

      {/* Creation form */}
      {creating ? (
        <form
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeCreate();
            }
          }}
          className="flex flex-wrap items-center gap-2 border-b border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-hover,#f1f1f1)] p-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.trim()) return;
            let sequence = issues.length + 1;
            while (issues.some((issue) => issue.id === `ISS-${sequence}`)) sequence++;
            const next = [
              ...issues,
              {
                id: `ISS-${sequence}`,
                title: draft.trim(),
                status: creating,
                priority: "medium" as const,
                assignee: "Unassigned",
                project: "No project",
                labels: [],
                created: new Date().toISOString().slice(0, 10),
              },
            ];
            setIssues(next);
            onIssuesChange?.(next);
            setStatusFilter("all");
            closeCreate();
            setAnnouncement("Issue created.");
          }}
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
      ) : null}

      <DisplayContext.Provider value={display}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -3 }}
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === "list" ? (
              <div className="max-h-[580px] overflow-y-auto">
                {filtered.map((issue) => (
                  <IssueListRow key={issue.id} issue={issue} />
                ))}
                {filtered.length === 0 ? (
                  <p className="py-10 text-center text-sm text-[color:var(--mova-ai-ink-secondary,#666)]">
                    No issues match this filter.
                  </p>
                ) : null}
                <button
                  ref={listCreateRef}
                  type="button"
                  onClick={(event) =>
                    openCreate(
                      statusFilter === "all" ? "backlog" : (statusFilter as BoardStatus),
                      event.currentTarget
                    )
                  }
                  className="flex items-center gap-2 px-4 py-3 text-xs text-[color:var(--mova-ai-ink-secondary,#666)] transition-colors hover:text-[color:var(--mova-ai-ink,#202020)]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add issue
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto overscroll-x-contain p-3 sm:p-4">
                <div className="flex min-h-[520px] min-w-max items-stretch gap-3">
                  {visibleStatuses.map((status) => {
                    const meta = STATUS_META[status];
                    const isLaneOver = overStatus === status;
                    const laneIssues = grouped[status];
                    return (
                      <div
                        key={status}
                        data-status={status}
                        className="flex min-h-0 w-[260px] min-w-[260px] shrink-0 flex-col"
                      >
                        <div className="mb-1 flex items-center gap-2 px-2 py-2">
                          <StatusIcon status={status} />
                          <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mova-ai-ink-secondary,#666)]">
                            {meta.label}
                          </span>
                          <span className="ml-auto text-xs tabular-nums text-[color:var(--mova-ai-ink-muted,#858585)]">
                            {laneIssues.length}
                          </span>
                          <button
                            type="button"
                            onClick={(event) => openCreate(status, event.currentTarget)}
                            aria-label={`Create issue in ${meta.label}`}
                            className="rounded p-1 hover:bg-[var(--mova-ai-hover-strong,#e9e9e9)] focus-visible:ring-2 focus-visible:ring-[var(--mova-ai-border-strong,#c8c8c8)]"
                          >
                            <Plus
                              className="h-3.5 w-3.5 text-[color:var(--mova-ai-ink-muted,#858585)]"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <div
                          className={`motion-kanban-lane min-h-[160px] flex-1 space-y-1.5 overflow-y-auto rounded-[9px] border p-1.5 transition-colors motion-reduce:transition-none ${
                            isLaneOver ? meta.laneOver : meta.lane
                          }`}
                          data-over={isLaneOver ? "true" : "false"}
                          data-status={status}
                          style={
                            {
                              "--lane-status": meta.color,
                              "--lane-tint": meta.tint,
                            } as CSSProperties
                          }
                          data-testid={`kanban-column-${status}`}
                        >
                          {laneIssues.map((issue) => (
                            <Fragment key={issue.id}>
                              <LocalSortableIssueCard
                                issue={issue}
                                isDragging={activeId === issue.id}
                                onPointerDownCard={handlePointerDownCard}
                                onKeyDownCard={handleKeyDownCard}
                              />
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {hiddenStatuses.length > 0 ? (
                    <div
                      className={`motion-kanban-lane flex min-h-0 w-[228px] min-w-[228px] shrink-0 flex-col rounded-[10px] border p-2 transition-colors motion-reduce:transition-none ${
                        overStatus && hiddenStatuses.includes(overStatus)
                          ? "border-[var(--mova-ai-border-strong,#c8c8c8)] bg-[var(--mova-ai-hover,#f1f1f1)]"
                          : "border-[var(--mova-ai-border,#dedede)] bg-[var(--mova-ai-canvas,#f4f4f4)]"
                      }`}
                      data-testid="kanban-hidden-columns"
                    >
                      <div className="mb-2 flex items-center gap-2 px-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--mova-ai-ink-muted,#858585)]">
                          Hidden columns
                        </span>
                        <span className="ml-auto text-xs tabular-nums text-[color:var(--mova-ai-ink-muted,#858585)]">
                          {hiddenStatuses.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {hiddenStatuses.map((status) => {
                          const meta = STATUS_META[status];
                          const isOver = overStatus === status;
                          return (
                            <div
                              key={status}
                              data-status={status}
                              className={`motion-kanban-lane flex items-center gap-2 rounded-[9px] border px-2 py-2 transition-colors motion-reduce:transition-none ${
                                isOver ? meta.laneOver : meta.lane
                              }`}
                              data-over={isOver ? "true" : "false"}
                              style={
                                {
                                  "--lane-status": meta.color,
                                  "--lane-tint": meta.tint,
                                } as CSSProperties
                              }
                              data-testid={`kanban-hidden-column-${status}`}
                            >
                              <StatusIcon status={status} />
                              <span className="min-w-0 flex-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--mova-ai-ink-secondary,#666)]">
                                {meta.label}
                              </span>
                              <span className="text-xs tabular-nums text-[color:var(--mova-ai-ink-muted,#858585)]">
                                0
                              </span>
                              <button
                                type="button"
                                onClick={(event) =>
                                  openCreate(status, event.currentTarget)
                                }
                                aria-label={`Create issue in ${meta.label}`}
                                className="rounded p-1 hover:bg-[var(--mova-ai-hover-strong,#e9e9e9)] focus-visible:ring-2 focus-visible:ring-[var(--mova-ai-border-strong,#c8c8c8)]"
                              >
                                <Plus
                                  className="h-3.5 w-3.5 text-[color:var(--mova-ai-ink-muted,#858585)]"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </DisplayContext.Provider>

      {/* Local DragOverlay following pointer */}
      {activeIssue && overlayPos ? (
        <div
          style={{
            position: "fixed",
            left: overlayPos.x,
            top: overlayPos.y,
            pointerEvents: "none",
            zIndex: 9999,
            transform: "rotate(0.4deg) scale(1.015)",
            transition: reduceMotion ? "none" : "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <article className="w-[247px] overflow-hidden rounded-[9px] border border-[var(--mova-ai-border-strong,#c8c8c8)] bg-[var(--mova-ai-surface,#fff)] p-2.5 shadow-[0_18px_48px_rgba(0,0,0,.48)]">
            <IssueCardBody issue={activeIssue} />
          </article>
        </div>
      ) : null}
    </section>
  );
}
