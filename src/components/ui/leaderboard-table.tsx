"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Medal, Crown, Timer, Search, ArrowUpDown, Flame, User } from "lucide-react";
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

export interface LeaderboardTableProps {
  title?: string;
  subtitle?: string;
  items?: LeaderboardItem[];
  currentUserId?: string;
  onSelectPlayer?: (player: LeaderboardItem) => void;
  searchable?: boolean;
  highlightPodium?: boolean;
  className?: string;
  maxRows?: number;
}

const DEFAULT_PLAYERS: LeaderboardItem[] = [
  { id: "1", rank: 1, name: "Sourav", score: 9850, time: "18.4s", level: 25, isCurrentUser: true, tag: "Champion" },
  { id: "2", rank: 2, name: "Elena_R", score: 9240, time: "21.2s", level: 24, tag: "Grandmaster" },
  { id: "3", rank: 3, name: "CyberBaller", score: 8710, time: "23.8s", level: 22, tag: "Pro" },
  { id: "4", rank: 4, name: "Vortex99", score: 7920, time: "27.5s", level: 19 },
  { id: "5", rank: 5, name: "PixelStriker", score: 7450, time: "30.1s", level: 18 },
  { id: "6", rank: 6, name: "NeonPaddle", score: 6890, time: "33.4s", level: 16 },
  { id: "7", rank: 7, name: "ArcadeGhost", score: 6120, time: "38.9s", level: 15 },
  { id: "8", rank: 8, name: "QuantumSpin", score: 5400, time: "42.0s", level: 12 },
];

/**
 * LeaderboardTable Component
 *
 * Arcade and competitive ranking table inspired by Breakout Ball game scores,
 * featuring gold-gradient trophy headers, podium badges, time/score records,
 * and current user row illumination.
 */
export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  title = "Players Ranking",
  subtitle = "Global Breakout Ball Leaderboard",
  items = DEFAULT_PLAYERS,
  currentUserId,
  onSelectPlayer,
  searchable = true,
  highlightPodium = true,
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
      list = list.filter((p) => p.name.toLowerCase().includes(q) || (p.tag && p.tag.toLowerCase().includes(q)));
    }

    list.sort((a, b) => {
      if (sortBy === "rank") return sortAsc ? a.rank - b.rank : b.rank - a.rank;
      if (sortBy === "score") return sortAsc ? b.score - a.score : a.score - b.score;
      if (sortBy === "time") {
        const tA = parseFloat(a.time || "999");
        const tB = parseFloat(b.time || "999");
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

  const getRankBadge = (rank: number) => {
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

  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden border border-border/80 bg-surface/90 text-foreground shadow-float backdrop-blur-md",
        className
      )}
    >
      {/* Breakout Header with Trophy & Flame Gradient */}
      <div className="relative p-5 sm:p-6 border-b border-border/60 bg-gradient-to-b from-surface-elevated/90 to-surface-subtle/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-cap flex items-center justify-center">
              <Trophy className="size-5 text-zinc-950 fill-zinc-950" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {searchable && (
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search player or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface border border-border text-xs text-foreground placeholder:text-muted-foreground shadow-well focus:outline-none focus:border-amber-400 focus:shadow-lift transition-all"
              />
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard Table Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/80 bg-surface-subtle/60 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <th
                className="py-3 px-4 sm:px-6 cursor-pointer hover:text-amber-500 transition-colors"
                onClick={() => handleSortToggle("rank")}
              >
                <div className="flex items-center gap-1.5">
                  <span>Rank</span>
                  <ArrowUpDown className="size-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 sm:px-6">Player</th>
              <th
                className="py-3 px-4 sm:px-6 cursor-pointer hover:text-amber-500 transition-colors text-right"
                onClick={() => handleSortToggle("score")}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Score</span>
                  <ArrowUpDown className="size-3 opacity-60" />
                </div>
              </th>
              <th
                className="py-3 px-4 sm:px-6 cursor-pointer hover:text-amber-500 transition-colors text-right"
                onClick={() => handleSortToggle("time")}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Time</span>
                  <ArrowUpDown className="size-3 opacity-60" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            <AnimatePresence>
              {filteredItems.map((player) => {
                const isCurrent = player.isCurrentUser || player.id === currentUserId;

                return (
                  <motion.tr
                    key={player.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    onClick={() => onSelectPlayer?.(player)}
                    className={cn(
                      "group transition-colors duration-150 cursor-pointer shadow-row",
                      isCurrent
                        ? "bg-amber-500/10 hover:bg-amber-500/15 border-l-4 border-l-amber-500"
                        : "hover:bg-surface-subtle/70"
                    )}
                  >
                    {/* Rank */}
                    <td className="py-3 px-4 sm:px-6 font-mono font-bold whitespace-nowrap">
                      {getRankBadge(player.rank)}
                    </td>

                    {/* Player Info */}
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "size-7 rounded-full flex items-center justify-center font-bold text-xs ring-1 ring-border/50 shrink-0 shadow-cap",
                            isCurrent
                              ? "bg-amber-400 text-zinc-950 font-black ring-amber-400/50"
                              : "bg-surface-elevated text-foreground"
                          )}
                        >
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-foreground group-hover:text-amber-500 transition-colors">
                              {player.name}
                            </span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-500 border border-amber-400/30 text-[9px] font-mono font-bold uppercase tracking-wider">
                                YOU
                              </span>
                            )}
                          </div>
                          {player.tag && (
                            <span className="text-[10px] font-mono text-muted-foreground">
                              @{player.tag.toLowerCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4 sm:px-6 text-right font-mono font-bold whitespace-nowrap">
                      <span className="text-foreground tracking-tight text-sm font-semibold">
                        {player.score.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-1">pts</span>
                    </td>

                    {/* Time */}
                    <td className="py-3 px-4 sm:px-6 text-right font-mono whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-cyan-500 dark:text-cyan-400 font-semibold bg-cyan-500/10 dark:bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-500/20 text-[11px] shadow-well">
                        <Timer className="size-3 text-cyan-500 dark:text-cyan-400" />
                        <span>{player.time || "--"}</span>
                      </span>
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
