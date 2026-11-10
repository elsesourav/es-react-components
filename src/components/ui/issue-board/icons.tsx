"use client";

import React from "react";
import { type BoardStatus, type BoardIssue, STATUS_META } from "./types";

export function StatusIcon({ status }: { status: BoardStatus }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
  };
  return (
    <span
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center"
      data-slot="issue-status-icon"
      data-status={status}
      style={{ color: STATUS_META[status]?.color ?? "currentColor" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="h-full w-full overflow-visible" fill="none">
        {status === "backlog" ? (
          <circle cx="8" cy="8" r="5.5" {...common} strokeDasharray="1 3" />
        ) : null}
        {status === "todo" ? <circle cx="8" cy="8" r="5.5" {...common} /> : null}
        {status === "in_progress" ? (
          <>
            <circle cx="8" cy="8" r="5.5" {...common} opacity="0.22" />
            <path d="M8 2.5a5.5 5.5 0 0 1 5.5 5.5" {...common} strokeWidth="2.4" />
            <path
              d="M13.5 8a5.5 5.5 0 0 1-5.5 5.5"
              {...common}
              strokeWidth="2.4"
              opacity="0.72"
            />
          </>
        ) : null}
        {status === "in_review" ? (
          <>
            <circle cx="8" cy="8" r="5.5" {...common} />
            <circle cx="8" cy="8" r="2" fill="currentColor" />
          </>
        ) : null}
        {status === "done" ? (
          <>
            <circle cx="8" cy="8" r="6.5" fill="currentColor" />
            <path
              d="M4.75 8.25 7 10.5l4.25-5"
              stroke="var(--mova-ai-status-on,#fff)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : null}
        {status === "cancelled" ? (
          <>
            <circle cx="8" cy="8" r="6" fill="currentColor" opacity="0.16" />
            <circle cx="8" cy="8" r="5.5" {...common} />
            <path d="m5.25 5.25 5.5 5.5m0-5.5-5.5 5.5" {...common} />
          </>
        ) : null}
        {status === "blocked" ? (
          <>
            <path
              d="M5.1 2.25h5.8l3.05 3.05v5.4l-3.05 3.05H5.1L2.05 10.7V5.3Z"
              {...common}
              strokeLinejoin="round"
            />
            <path d="m5.25 5.25 5.5 5.5" {...common} />
          </>
        ) : null}
      </svg>
    </span>
  );
}

export function PriorityIcon({ priority }: { priority: BoardIssue["priority"] }) {
  const active =
    priority === "critical" ? 4 : priority === "high" ? 3 : priority === "medium" ? 2 : 1;
  const tone =
    priority === "critical"
      ? "var(--mova-ai-danger)"
      : priority === "high"
      ? "var(--mova-ai-warning)"
      : priority === "medium"
      ? "var(--mova-ai-info)"
      : "var(--mova-ai-neutral-status)";
  const heights = [4, 6, 10, 14];
  return (
    <span
      className="inline-flex h-3.5 w-4 items-end gap-[2px]"
      style={{ color: tone }}
      aria-hidden="true"
    >
      {heights.map((height, index) => (
        <span
          className="w-[3px] rounded-[1px] bg-current"
          key={height}
          style={{ height: `${height}px`, opacity: index < active ? 1 : 0.25 }}
        />
      ))}
    </span>
  );
}

export function MemberAvatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--mova-ai-hover-strong,#e9e9e9)] text-[9px] font-semibold text-[color:var(--mova-ai-ink,#202020)]"
    >
      {name.slice(0, 1)}
    </span>
  );
}
