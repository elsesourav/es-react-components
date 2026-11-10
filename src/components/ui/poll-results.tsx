"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  motionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const FILL = { type: "spring", stiffness: 210, damping: 34, mass: 0.9 } as const;
const POP = { type: "spring", stiffness: 640, damping: 22, mass: 0.7 } as const;
const EASE = [0.23, 1, 0.32, 1] as const;
const ENTER = { duration: 0.2, ease: EASE } as const;
const STILL = { duration: 0 } as const;

export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type UsePollResultsOptions = {
  options: PollOption[];
  value?: string | null;
  defaultValue?: string | null;
  onVote?: (id: string) => void;
};

export function usePollResults({
  options,
  value,
  defaultValue = null,
  onVote,
}: UsePollResultsOptions) {
  const [internal, setInternal] = useState<string | null>(defaultValue);
  const controlled = value !== undefined;
  const chosen = controlled ? value : internal;

  const emit = useRef(onVote);
  emit.current = onVote;

  const vote = useCallback(
    (id: string) => {
      if (chosen !== null) return;
      if (!controlled) setInternal(id);
      emit.current?.(id);
    },
    [chosen, controlled],
  );

  const total = options.reduce((sum, o) => sum + Math.max(0, o.votes), 0);
  const top = options.reduce(
    (best, o) => (o.votes > best ? o.votes : best),
    0,
  );

  const rows = options.map((option) => ({
    ...option,
    share: total > 0 ? Math.max(0, option.votes) / total : 0,
    winner: total > 0 && option.votes === top,
    mine: option.id === chosen,
  }));

  return {
    rows,
    total,
    chosen,
    revealed: chosen !== null,
    vote,
  };
}

const Tick = (
  <svg viewBox="0 0 256 256" width="12" height="12" fill="none" aria-hidden>
    <polyline
      points="216 72 104 184 48 128"
      stroke="currentColor"
      strokeWidth="28"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type RowProps = {
  label: string;
  share: number;
  winner: boolean;
  mine: boolean;
  revealed: boolean;
  reduced: boolean;
  onPick: () => void;
};

function Row({ label, share, winner, mine, revealed, reduced, onPick }: RowProps) {
  const progress = useRef(motionValue(0)).current;
  const clipPath = useTransform(
    progress,
    (p) => `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round 6px)`,
  );

  const [landed, setLanded] = useState(false);
  const readout = useRef<HTMLSpanElement | null>(null);

  useMotionValueEvent(progress, "change", (p) => {
    const node = readout.current;
    if (!node) return;
    const next = `${Math.round(p * 100)}%`;
    if (node.textContent !== next) node.textContent = next;
  });

  useEffect(() => {
    if (!revealed) return;
    if (reduced) {
      progress.jump(share);
      setLanded(true);
      return;
    }
    const controls = animate(progress, share, FILL);
    void controls.finished.then(() => setLanded(true));
    return () => controls.stop();
  }, [revealed, share, reduced, progress]);

  return (
    <button
      type="button"
      onClick={onPick}
      aria-disabled={revealed}
      aria-pressed={revealed ? mine : undefined}
      className={cn(
        "group relative h-10 w-full overflow-hidden rounded-[var(--radius)] border text-left outline-none transition-all duration-200 cursor-pointer select-none",
        "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1",
        revealed
          ? "cursor-default border-border bg-surface-subtle/70 shadow-inner"
          : "border-border bg-surface-elevated shadow-sm hover:bg-surface-subtle active:translate-y-px"
      )}
    >
      <motion.span
        aria-hidden
        style={{ clipPath }}
        className={cn(
          "absolute inset-[2.5px] rounded-[calc(var(--radius)-2.5px)] transition-colors",
          mine
            ? "bg-primary/25 shadow-inner"
            : "bg-foreground/10 shadow-inner"
        )}
      />

      <span className="relative flex h-full items-center gap-2.5 px-3.5">
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-xs sm:text-[13px] transition-[color,font-weight] duration-200",
            revealed && winner
              ? "font-semibold text-foreground"
              : "text-foreground/80 group-hover:text-foreground"
          )}
        >
          {label}
        </span>

        <span className="grid size-4 shrink-0 place-items-center">
          <AnimatePresence initial={false}>
            {revealed && winner && landed ? (
              <motion.span
                key="win"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: STILL }}
                transition={reduced ? STILL : POP}
                className="text-primary font-bold"
              >
                {Tick}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </span>

        <span className="relative grid shrink-0 text-right">
          <span
            aria-hidden
            className="invisible col-start-1 row-start-1 font-mono text-[11px] tabular-nums"
          >
            100%
          </span>
          <motion.span
            ref={readout}
            aria-hidden
            initial={false}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={reduced ? STILL : ENTER}
            className="col-start-1 row-start-1 font-mono text-[11px] tabular-nums text-muted-foreground font-semibold"
          >
            0%
          </motion.span>
        </span>
      </span>
    </button>
  );
}

export type PollResultsProps = UsePollResultsOptions & {
  label: string;
  className?: string;
};

export function PollResults({
  options,
  value,
  defaultValue,
  onVote,
  label,
  className = "",
}: PollResultsProps) {
  const poll = usePollResults({ options, value, defaultValue, onVote });
  const reduced = useReducedMotion() === true;

  const [spoken, setSpoken] = useState("");
  useEffect(() => {
    if (!poll.revealed) return;
    const winner = poll.rows.find((r) => r.winner);
    const t = setTimeout(
      () =>
        setSpoken(
          winner
            ? `Results: ${winner.label} leads with ${Math.round(winner.share * 100)} percent of ${poll.total} votes`
            : `Results shown, ${poll.total} votes`,
        ),
      700,
    );
    return () => clearTimeout(t);
  }, [poll.revealed, poll.rows, poll.total]);

  return (
    <div role="group" aria-label={label} className={cn("w-full select-none", className)}>
      <p className="mb-2.5 text-xs sm:text-[13px] font-semibold text-foreground">
        {label}
      </p>

      <div className="space-y-2">
        {poll.rows.map((row) => (
          <Row
            key={row.id}
            label={row.label}
            share={row.share}
            winner={row.winner}
            mine={row.mine}
            revealed={poll.revealed}
            reduced={reduced}
            onPick={() => poll.vote(row.id)}
          />
        ))}
      </div>

      <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] tabular-nums text-muted-foreground">
        <motion.span
          initial={false}
          animate={{ opacity: poll.revealed ? 1 : 0 }}
          transition={reduced ? STILL : { ...ENTER, delay: 0.4 }}
          className="inline-block"
        >
          {poll.total.toLocaleString("en-US")} total votes cast
        </motion.span>

        {!poll.revealed && (
          <span className="text-[10px] text-muted-foreground/80">
            Click an option to cast your vote
          </span>
        )}
      </div>

      <span role="status" className="sr-only">
        {spoken}
      </span>
    </div>
  );
}
