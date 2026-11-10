"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { cn } from '../../lib/utils';

export type MonoChartTheme = 'dark' | 'light' | 'auto';

/**
 * Hook to resolve whether chart should render in dark mode.
 * Respects explicit prop ('dark' | 'light'), otherwise falls back to ThemeContext.isDark,
 * and finally checks DOM classList.contains('dark').
 */
export function useResolvedChartTheme(theme: MonoChartTheme = 'auto'): boolean {
  let isDarkContext: boolean | undefined;
  try {
    const ctx = useTheme();
    isDarkContext = ctx?.isDark;
  } catch {
    isDarkContext = undefined;
  }

  const [domIsDark, setDomIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const update = () => {
      setDomIsDark(document.documentElement.classList.contains('dark'));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  if (typeof isDarkContext === 'boolean') {
    return isDarkContext;
  }
  return domIsDark;
}

/* ==========================================================================
   Shared Tooltip Component
   ========================================================================== */
export interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  fill?: string;
  dataKey?: string;
}

export interface MonoChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  theme?: MonoChartTheme;
  indicator?: 'dot' | 'line';
}

export function MonoChartTooltipContent({
  active,
  payload,
  label,
  theme = 'auto',
  indicator = 'dot',
}: MonoChartTooltipProps) {
  const isDark = useResolvedChartTheme(theme);

  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className={cn(
        'rounded-xl px-3 py-2 text-xs shadow-xl backdrop-blur-md border font-sans transition-all z-50 pointer-events-none',
        'bg-surface-elevated/95 border-border text-foreground shadow-2xl',
      )}
    >
      {label && (
        <div
          className={cn(
            'font-mono text-[10px] mb-1 pb-1 border-b tracking-wide',
            isDark ? 'text-neutral-400 border-white/10' : 'text-neutral-500 border-neutral-100'
          )}
        >
          {label}
        </div>
      )}
      <div className="flex flex-col gap-1.5 min-w-[100px]">
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {indicator === 'dot' && (
                <span
                  className="w-2 h-2 rounded-full inline-block shrink-0"
                  style={{
                    backgroundColor: item.color || item.fill || (isDark ? '#FFFFFF' : '#09090B'),
                  }}
                />
              )}
              <span
                className={cn(
                  'text-[11px] font-medium truncate max-w-[110px]',
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                )}
              >
                {item.name || item.dataKey}
              </span>
            </div>
            <span
              className={cn(
                'font-mono font-semibold tabular-nums text-[11px]',
                isDark ? 'text-white' : 'text-black'
              )}
            >
              {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Backwards compatibility alias for external imports
export const DitherChartTooltipContent = MonoChartTooltipContent;
