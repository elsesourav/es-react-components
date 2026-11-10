import type { CommandItem } from "./types";

const BOUNDARY = /[\s\-_/.:]/;

export function scoreOne(text: string, query: string): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase();

  // Exact match gets highest priority
  if (t === q) return 100;
  // Prefix match gets very high priority
  if (t.startsWith(q)) return 85 + (q.length / t.length) * 10;
  // Substring match gets strong priority
  const subIdx = t.indexOf(q);
  if (subIdx >= 0) {
    const isBoundary = subIdx === 0 || BOUNDARY.test(t[subIdx - 1]);
    return 60 + (isBoundary ? 20 : 0) - subIdx * 0.5;
  }

  // Fuzzy subsequence match
  let cursor = 0;
  let total = 0;
  let streak = 0;

  for (let i = 0; i < q.length; i++) {
    const at = t.indexOf(q[i], cursor);
    if (at < 0) return -1;
    streak = at === cursor && i > 0 ? streak + 1 : 0;
    total += 2 + streak * 4;
    if (at === 0) total += 12;
    else if (BOUNDARY.test(t[at - 1])) total += 8;
    cursor = at + 1;
  }

  return total;
}

export function rank(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  const scored: { item: CommandItem; score: number; order: number }[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const direct = scoreOne(item.label, q);
    const hintScore = item.hint ? scoreOne(item.hint, q) - 5 : -1;
    const aliased = item.keywords ? scoreOne(item.keywords, q) - 3 : -1;
    const best = Math.max(direct, hintScore, aliased);
    if (best < 0) continue;
    scored.push({ item, score: best - item.label.length * 0.05, order: i });
  }

  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  return scored.map((s) => s.item);
}
