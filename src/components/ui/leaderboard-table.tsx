"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Medal, Crown, Timer, Search, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LeaderboardItem {
  id: string;
  rank: number;
  name: string;
  score: number;
  time?: string;
  level?: number;
  avatar?: string;
  isCurrentUser?: boolean;
  tag?: string;
}

export type LeaderboardVariant = "arcade" | "theme" | "modern" | "breakout";

export interface LeaderboardTableProps {
  variant?: LeaderboardVariant;
  title?: string;
  subtitle?: string;
  items?: LeaderboardItem[];
  currentUserId?: string;
  onSelectPlayer?: (player: LeaderboardItem) => void;
  searchable?: boolean;
  highlightPodium?: boolean;
  borderRadius?: number | string;
  className?: string;
  maxRows?: number;
}

const DEFAULT_PLAYERS: LeaderboardItem[] = [
  { id: "1", rank: 1, name: "Sourav", score: 9850, time: "18.4", level: 25, isCurrentUser: true, tag: "Champion" },
  { id: "2", rank: 2, name: "Elena_R", score: 9240, time: "21.2", level: 24, tag: "Grandmaster" },
  { id: "3", rank: 3, name: "CyberBaller", score: 8710, time: "23.8", level: 22, tag: "Pro" },
  { id: "4", rank: 4, name: "Vortex99", score: 7920, time: "27.5", level: 19 },
  { id: "5", rank: 5, name: "PixelStriker", score: 7450, time: "30.1", level: 18 },
  { id: "6", rank: 6, name: "NeonPaddle", score: 6890, time: "33.4", level: 16 },
  { id: "7", rank: 7, name: "ArcadeGhost", score: 6120, time: "38.9", level: 15 },
  { id: "8", rank: 8, name: "QuantumSpin", score: 5400, time: "42.0", level: 12 },
];

/**
 * LeaderboardTable Component
 *
 * High-impact arcade and competitive ranking table featuring fiery flame gradient headers,
 * neon-cyan scores and times, hot-pink span badges, current player highlight overlay (.me),
 * with full Tailwind customization and active theme support.
 */
export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  variant = "arcade",
  title = "Players Ranking",
  subtitle = "Global High Scores & Rankings",
  items = DEFAULT_PLAYERS,
  currentUserId,
  onSelectPlayer,
  searchable = true,
  highlightPodium = true,
  borderRadius,
  className,
  maxRows = 8,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"rank" | "score" | "time">("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredItems = useMemo(() => {
    let list = [...items];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      if (sortBy === "rank") return sortAsc ? a.rank - b.rank : b.rank - a.rank;
      if (sortBy === "score") return sortAsc ? b.score - a.score : a.score - b.score;
      if (sortBy === "time") {
        const tA = parseFloat(a.time?.replace("s", "") || "999");
        const tB = parseFloat(b.time?.replace("s", "") || "999");
        return sortAsc ? tA - tB : tB - tA;
      }
      return 0;
    });

    return list.slice(0, maxRows);
  }, [items, searchQuery, sortBy, sortAsc, maxRows]);

  const handleSortToggle = (type: "rank" | "score" | "time") => {
    if (sortBy === type) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(type);
      setSortAsc(type === "rank" || type === "time");
    }
  };

  const isArcade = variant === "arcade" || variant === "breakout";

  const getRankBadge = (rank: number) => {
    if (isArcade) {
      return (
        <span className="font-mono font-bold text-[#00f2ff] tracking-wider text-sm drop-shadow-sm">
          {rank}
        </span>
      );
    }

    if (!highlightPodium) return `#${rank}`;
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 font-bold text-amber-400 drop-shadow-sm">
          <Crown className="size-4 text-amber-400 fill-amber-400" />
          <span>1st</span>
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 font-bold text-slate-300 drop-shadow-sm">
          <Medal className="size-4 text-slate-300 fill-slate-300" />
          <span>2nd</span>
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 font-bold text-amber-600 drop-shadow-sm">
          <Medal className="size-4 text-amber-600 fill-amber-600" />
          <span>3rd</span>
        </span>
      );
    }
    return <span className="font-mono text-cyan-400 font-semibold">#{rank}</span>;
  };

  const resolvedBorderRadius =
    borderRadius !== undefined
      ? typeof borderRadius === "number"
        ? `${borderRadius}px`
        : borderRadius
      : undefined;

  return (
    <div
      style={{ borderRadius: resolvedBorderRadius }}
      className={cn(
        "relative overflow-hidden transition-all shadow-xl",
        isArcade &&
          "bg-[#070b19]/90 border-2 border-[#0d0098] text-white shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md rounded-2xl",
        variant === "theme" &&
          "bg-surface/90 border border-primary/30 text-foreground shadow-float backdrop-blur-md rounded-2xl",
        variant === "modern" &&
          "bg-surface/90 border border-border/80 text-foreground shadow-float backdrop-blur-md rounded-3xl",
        className
      )}
    >
      {/* Title Header */}
      <div
        className={cn(
          "relative p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
          isArcade &&
            "border-b-[3px] border-black/40 bg-black/30",
          variant === "theme" &&
            "border-b border-primary/20 bg-primary/5",
          variant === "modern" &&
            "border-b border-border/60 bg-gradient-to-b from-surface-elevated/90 to-surface-subtle/70"
        )}
      >
        <div className="flex items-center gap-2.5">
          {isArcade ? (
            <div className="flex items-center gap-2.5">
              <Trophy
                className="size-6 text-[#ff5500] fill-[#ff5500] drop-shadow-[0_1px_3px_#000]"
              />
              <div>
                <h3
                  className="text-lg sm:text-xl font-black uppercase tracking-wider select-none"
                  style={{
                    background: "linear-gradient(180deg, #ff0000 0%, #ffee00 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
                  }}
                >
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-[11px] text-zinc-400 font-mono tracking-tight">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "size-9 rounded-xl p-0.5 shadow-cap flex items-center justify-center",
                  variant === "theme"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-950"
                )}
              >
                <Trophy className="size-4.5 fill-current" />
              </div>
              <div>
                <h3
                  className={cn(
                    "text-lg sm:text-xl font-black uppercase tracking-wider",
                    variant === "theme"
                      ? "text-primary"
                      : "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent"
                  )}
                >
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {searchable && (
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search player or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-8 pr-3 py-1.5 rounded-xl text-xs placeholder:text-muted-foreground transition-all focus:outline-none",
                isArcade
                  ? "bg-black/40 border border-blue-500/40 text-cyan-300 focus:border-cyan-400 focus:bg-black/60 shadow-inner"
                  : "bg-surface border border-border text-foreground focus:border-primary shadow-well"
              )}
            />
          </div>
        )}
      </div>

      {/* Table Grid (Breakout Ball 3-column Layout) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr
              className={cn(
                "border-b uppercase tracking-widest font-mono text-[11px]",
                isArcade
                  ? "bg-black/40 border-black/60 text-white font-bold"
                  : "bg-surface-subtle/60 border-border/80 text-muted-foreground"
              )}
            >
              <th
                className="py-2.5 px-4 sm:px-6 cursor-pointer hover:text-cyan-400 transition-colors w-24 text-center"
                onClick={() => handleSortToggle("rank")}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>RANK</span>
                  <ArrowUpDown className="size-3 opacity-60" />
                </div>
              </th>
              <th className="py-2.5 px-4 sm:px-6">PLAYER</th>
              <th
                className="py-2.5 px-4 sm:px-6 cursor-pointer hover:text-cyan-400 transition-colors text-right"
                onClick={() => handleSortToggle("score")}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>SCORE</span>
                  <ArrowUpDown className="size-3 opacity-60" />
                </div>
              </th>
              <th
                className="py-2.5 px-4 sm:px-6 cursor-pointer hover:text-cyan-400 transition-colors text-right w-28"
                onClick={() => handleSortToggle("time")}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>TIME</span>
                  <ArrowUpDown className="size-3 opacity-60" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody
            className={cn(
              "divide-y",
              isArcade
                ? "divide-white/5"
                : "divide-border/50"
            )}
          >
            <AnimatePresence>
              {filteredItems.map((player) => {
                const isCurrent = player.isCurrentUser || player.id === currentUserId;

                return (
                  <motion.tr
                    key={player.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    onClick={() => onSelectPlayer?.(player)}
                    className={cn(
                      "relative group transition-colors duration-150 cursor-pointer",
                      // Current player highlight cap overlay: background: #fff4
                      isArcade &&
                        isCurrent &&
                        "bg-white/[0.18] shadow-[inset_0_0_12px_rgba(255,255,255,0.15)] font-bold text-white",
                      isArcade &&
                        !isCurrent &&
                        "hover:bg-white/[0.06]",
                      variant === "theme" &&
                        isCurrent &&
                        "bg-primary/15 border-l-4 border-l-primary",
                      variant === "theme" &&
                        !isCurrent &&
                        "hover:bg-surface-subtle/70",
                      variant === "modern" &&
                        isCurrent &&
                        "bg-amber-500/10 hover:bg-amber-500/15 border-l-4 border-l-amber-500",
                      variant === "modern" &&
                        !isCurrent &&
                        "hover:bg-surface-subtle/70"
                    )}
                  >
                    {/* Rank */}
                    <td className="py-2.5 px-4 sm:px-6 text-center whitespace-nowrap">
                      {getRankBadge(player.rank)}
                    </td>

                    {/* Player Name */}
                    <td className="py-2.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-semibold tracking-wide",
                            isArcade ? "text-white" : "text-foreground",
                            isCurrent && isArcade && "text-white drop-shadow-sm"
                          )}
                        >
                          {player.name}
                        </span>
                        {player.tag && (
                          <span
                            className={cn(
                              "text-[10px] font-mono font-bold tracking-tight px-1.5 py-0.5 rounded",
                              isArcade
                                ? "text-[#ff0084] bg-[#ff0084]/10 border border-[#ff0084]/30"
                                : "text-muted-foreground bg-surface-subtle"
                            )}
                          >
                            @{player.tag}
                          </span>
                        )}
                        {isCurrent && (
                          <span
                            className={cn(
                              "text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded tracking-widest",
                              isArcade
                                ? "bg-[#00f2ff] text-zinc-950 shadow-sm"
                                : "bg-primary text-primary-foreground"
                            )}
                          >
                            YOU
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-2.5 px-4 sm:px-6 text-right font-mono whitespace-nowrap">
                      <span
                        className={cn(
                          "font-bold text-sm",
                          isArcade ? "text-[#00f2ff]" : "text-foreground"
                        )}
                      >
                        {player.score.toLocaleString()}
                      </span>
                    </td>

                    {/* Time (with neon cyan + pink badge) */}
                    <td className="py-2.5 px-4 sm:px-6 text-right font-mono whitespace-nowrap">
                      {isArcade ? (
                        <div className="inline-flex items-center justify-end gap-0.5 font-bold text-[#00f2ff] text-sm">
                          <span>{player.time || "--"}</span>
                          <span className="text-[#ff0084] font-black">s</span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-cyan-500 dark:text-cyan-400 font-semibold bg-cyan-500/10 dark:bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-500/20 text-[11px] shadow-well">
                          <Timer className="size-3 text-cyan-500 dark:text-cyan-400" />
                          <span>{player.time ? `${player.time}s` : "--"}</span>
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
