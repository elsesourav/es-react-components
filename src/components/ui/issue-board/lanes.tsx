"use client";

import React, { Fragment, type CSSProperties, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { type BoardStatus, type BoardIssue, STATUS_META } from "./types";
import { StatusIcon } from "./icons";
import { LocalSortableIssueCard } from "./card";

export interface KanbanBoardLanesProps {
  visibleStatuses: BoardStatus[];
  hiddenStatuses: BoardStatus[];
  grouped: Record<BoardStatus, BoardIssue[]>;
  overStatus: BoardStatus | null;
  activeId: string | null;
  handlePointerDownCard: (e: ReactPointerEvent<HTMLElement>, issue: BoardIssue) => void;
  handleKeyDownCard: (e: ReactKeyboardEvent<HTMLElement>, issue: BoardIssue) => void;
  openCreate: (status: BoardStatus, trigger: HTMLElement) => void;
}

export function KanbanBoardLanes({
  visibleStatuses,
  hiddenStatuses,
  grouped,
  overStatus,
  activeId,
  handlePointerDownCard,
  handleKeyDownCard,
  openCreate,
}: KanbanBoardLanesProps) {
  return (
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
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
