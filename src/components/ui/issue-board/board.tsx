"use client";

import React, {
  useEffect, useMemo, useRef, useState, useId,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AI_THEME_STYLES } from "../ai-theme-styles";
import { BOARD_SCOPED_STYLES } from "./styles";
import {
  type BoardStatus, type BoardIssue, type RudderIssueBoardProps, type DisplayField,
  BOARD_STATUSES, STATUS_META, DEFAULT_ISSUES, DISPLAY_FIELDS, DisplayContext,
} from "./types";
import { IssueListRow, IssueCardBody } from "./card";
import { BoardToolbar, BoardCreateForm } from "./toolbar";
import { KanbanBoardLanes } from "./lanes";

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

  const handleCreateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.trim() || !creating) return;
    let sequence = issues.length + 1;
    while (issues.some((issue) => issue.id === `ISS-${sequence}`)) sequence++;
    const next: BoardIssue[] = [
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
      <BoardToolbar
        issues={issues}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        view={view}
        setView={setView}
        sort={sort}
        setSort={setSort}
        descending={descending}
        setDescending={setDescending}
        display={display}
        setDisplay={setDisplay}
        sortGroupId={sortGroupId}
        statusFilterRef={statusFilterRef}
      />

      {/* Creation form */}
      {creating ? (
        <BoardCreateForm
          creating={creating}
          draft={draft}
          setDraft={setDraft}
          setCreating={setCreating}
          createInputRef={createInputRef}
          closeCreate={closeCreate}
          onSubmit={handleCreateSubmit}
        />
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
              <KanbanBoardLanes
                visibleStatuses={visibleStatuses}
                hiddenStatuses={hiddenStatuses}
                grouped={grouped}
                overStatus={overStatus}
                activeId={activeId}
                handlePointerDownCard={handlePointerDownCard}
                handleKeyDownCard={handleKeyDownCard}
                openCreate={openCreate}
              />
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
