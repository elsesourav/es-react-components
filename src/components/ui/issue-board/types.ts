"use client";

import { createContext } from "react";

export type BoardStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "in_review"
  | "blocked"
  | "done"
  | "cancelled";

export interface BoardIssue {
  assignee: string;
  created: string;
  updated?: string;
  id: string;
  labels: string[];
  priority: "critical" | "high" | "medium" | "low";
  project: string;
  reviewer?: string;
  status: BoardStatus;
  title: string;
}

export interface RudderIssueBoardProps {
  theme?: "dark" | "light";
  className?: string;
  initialIssues?: readonly BoardIssue[];
  onIssuesChange?: (issues: BoardIssue[]) => void;
}

export type IssueBoardProps = RudderIssueBoardProps;

export const BOARD_STATUSES: readonly BoardStatus[] = [
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "blocked",
  "done",
  "cancelled",
];

export const STATUS_META: Record<
  BoardStatus,
  { color: string; tint: string; label: string; lane: string; laneOver: string }
> = {
  backlog: {
    color: "var(--mova-ai-neutral-status)",
    tint: "var(--mova-ai-neutral-status)",
    label: "Backlog",
    lane: "border-[var(--mova-ai-border,#3b3b3b)] bg-[var(--mova-ai-canvas,#202020)]",
    laneOver:
      "border-[var(--mova-ai-border-strong,#505050)] bg-[var(--mova-ai-hover,#2d2d2d)]",
  },
  todo: {
    color: "var(--mova-ai-info)",
    tint: "var(--mova-ai-info-tint)",
    label: "To do",
    lane: "border-[var(--mova-ai-border,#3b3b3b)] bg-[var(--mova-ai-canvas,#202020)]",
    laneOver:
      "border-[var(--mova-ai-border-strong,#505050)] bg-[var(--mova-ai-hover,#2d2d2d)]",
  },
  in_progress: {
    color: "var(--mova-ai-warning)",
    tint: "var(--mova-ai-warning-tint)",
    label: "In progress",
    lane: "border-[var(--mova-ai-border,#3b3b3b)] bg-[var(--mova-ai-canvas,#202020)]",
    laneOver:
      "border-[var(--mova-ai-border-strong,#505050)] bg-[var(--mova-ai-hover,#2d2d2d)]",
  },
  in_review: {
    color: "#8b6bd9",
    tint: "#8b6bd9",
    label: "In review",
    lane: "border-[var(--mova-ai-border,#3b3b3b)] bg-[var(--mova-ai-canvas,#202020)]",
    laneOver:
      "border-[var(--mova-ai-border-strong,#505050)] bg-[var(--mova-ai-hover,#2d2d2d)]",
  },
  blocked: {
    color: "var(--mova-ai-danger)",
    tint: "var(--mova-ai-danger-tint)",
    label: "Blocked",
    lane: "border-[var(--mova-ai-border,#3b3b3b)] bg-[var(--mova-ai-canvas,#202020)]",
    laneOver:
      "border-[var(--mova-ai-border-strong,#505050)] bg-[var(--mova-ai-hover,#2d2d2d)]",
  },
  done: {
    color: "var(--mova-ai-success)",
    tint: "var(--mova-ai-success-tint)",
    label: "Done",
    lane: "border-[var(--mova-ai-border,#3b3b3b)] bg-[var(--mova-ai-canvas,#202020)]",
    laneOver:
      "border-[var(--mova-ai-border-strong,#505050)] bg-[var(--mova-ai-hover,#2d2d2d)]",
  },
  cancelled: {
    color: "var(--mova-ai-neutral-status)",
    tint: "var(--mova-ai-neutral-status)",
    label: "Cancelled",
    lane: "border-[var(--mova-ai-border,#3b3b3b)] bg-[var(--mova-ai-canvas,#202020)]",
    laneOver:
      "border-[var(--mova-ai-border-strong,#505050)] bg-[var(--mova-ai-hover,#2d2d2d)]",
  },
};

export const DEFAULT_ISSUES: readonly BoardIssue[] = [
  {
    id: "R6Z-141",
    title: "Retire legacy Node backend, CLI, and MCP authorities",
    status: "backlog",
    priority: "high",
    assignee: "Noah",
    project: "Rudder-dev",
    labels: ["Feature"],
    created: "Aug 20",
  },
  {
    id: "R6Z-140",
    title: "Cut over the public listener and Rust authorities",
    status: "backlog",
    priority: "high",
    assignee: "Avery",
    project: "Rudder-dev",
    labels: ["Feature"],
    created: "Aug 20",
  },
  {
    id: "R6Z-170",
    title: "Proposal: add history versions and Diff view",
    status: "todo",
    priority: "medium",
    assignee: "Luca",
    project: "Rudder-dev",
    labels: ["Feature"],
    created: "Aug 27",
  },
  {
    id: "R6Z-166",
    title: "Define the issue event contract for agent handoffs",
    status: "todo",
    priority: "medium",
    assignee: "Mira",
    project: "Rudder-dev",
    labels: ["Spec"],
    created: "Aug 26",
  },
  {
    id: "R6Z-181",
    title: "Share 500-index issue context through MCP and CLI",
    status: "in_progress",
    priority: "high",
    assignee: "Sana",
    project: "Rudder-dev",
    labels: ["Feature"],
    created: "Aug 30",
  },
  {
    id: "R6Z-210",
    title: "Re-run the Rust output spool after a capacity failure",
    status: "in_progress",
    priority: "high",
    assignee: "Noah",
    reviewer: "Mira",
    project: "Rudder-dev",
    labels: ["Bug"],
    created: "Sep 14",
  },
  {
    id: "R6Z-207",
    title: "Remove the loaded Issues hint from the shell",
    status: "done",
    priority: "medium",
    assignee: "Theo",
    project: "Rudder-dev",
    labels: ["Feature"],
    created: "Aug 19",
  },
];

export const DISPLAY_FIELDS = [
  "Identifier",
  "Priority",
  "Assignee",
  "Reviewer",
  "Labels",
  "Project",
  "Updated",
  "Created",
] as const;

export type DisplayField = (typeof DISPLAY_FIELDS)[number];

export const DisplayContext = createContext<readonly DisplayField[]>(
  DISPLAY_FIELDS.filter((field) => field !== "Updated")
);
