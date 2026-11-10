"use client";

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { useIsMobile } from '../../hooks/useIsMobile';
import { cn } from '../../lib/utils';
import {
  useResolvedChartTheme,
  MonoChartTooltipContent,
  type MonoChartTheme,
} from './mono-chart-shared';

export interface DonutSegment {
  name: string;
  value: number;
  shade?: string;
  [key: string]: any;
}

export const DEFAULT_MONO_DONUT_DATA: DonutSegment[] = [
  { name: 'Core Engine', value: 45, shade: '#FFFFFF' },
  { name: 'UI Layer', value: 30, shade: '#CBD5E1' },
  { name: 'Assets', value: 15, shade: '#94A3B8' },
  { name: 'Other', value: 10, shade: '#64748B' },
];

export interface MonoRoundedDonutChartProps {
  data?: DonutSegment[];
  title?: string;
  badge?: string;
  metric?: string | number;
  unit?: string;
  theme?: MonoChartTheme;
  compact?: boolean;
  hoverIndex?: number | null;
  onHoverIndexChange?: (index: number | null) => void;
  className?: string;
  height?: number;
}

export function MonoRoundedDonutChart({
  data = DEFAULT_MONO_DONUT_DATA,
  title = 'Mono Rounded Donut',
  badge = 'Soft Arc Caps',
  metric,
  unit = 'allocation',
  theme = 'auto',
  compact = false,
  hoverIndex: controlledHoverIndex,
  onHoverIndexChange,
  className,
  height,
}: MonoRoundedDonutChartProps) {
  const isDark = useResolvedChartTheme(theme);
  const isMobile = useIsMobile();
  const [internalHover, setInternalHover] = useState<number | null>(null);

  const hoverIndex = controlledHoverIndex !== undefined ? controlledHoverIndex : internalHover;
  const setHover = (idx: number | null) => {
    setInternalHover(idx);
    onHoverIndexChange?.(idx);
  };

  const total = useMemo(() => {
    if (metric !== undefined) return metric;
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [metric, data]);

  const activeSegment = hoverIndex !== null && data[hoverIndex] ? data[hoverIndex] : null;

  const chartHeight = height ?? (compact ? (isMobile ? 120 : 130) : isMobile ? 150 : 170);

  return (
    <div
      className={cn(
        'relative w-full rounded-[24px] transition-all duration-300 group flex flex-col justify-between overflow-hidden p-4 sm:p-5',
        compact ? 'h-[230px] sm:h-[268px]' : 'min-h-[295px]',
        isDark
          ? 'bg-[#181818] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.4)] hover:bg-[#1e1e1e] border border-white/5 text-white'
          : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-200/80 text-black hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-xs font-semibold tracking-wider uppercase',
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              )}
            >
              {title}
            </span>
            {badge && (
              <span
                className={cn(
                  'inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono border',
                  isDark
                    ? 'bg-white/10 text-white border-white/20'
                    : 'bg-neutral-100 text-neutral-800 border-neutral-300'
                )}
              >
                {badge}
              </span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            {total}% <span className="text-xs font-normal opacity-70 font-mono">{unit}</span>
          </div>
        </div>
      </div>

      {/* Main Recharts Stage */}
      <div
        className={cn(
          'relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center touch-pan-y min-h-[130px]',
          isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
        )}
      >
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Tooltip content={<MonoChartTooltipContent theme={isDark ? 'dark' : 'light'} indicator="dot" />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={compact ? (isMobile ? 32 : 38) : isMobile ? 38 : 46}
              outerRadius={compact ? (isMobile ? 50 : 58) : isMobile ? 58 : 68}
              paddingAngle={5}
              cornerRadius={7}
              strokeLinecap="round"
              onMouseEnter={(_, idx) => setHover(idx)}
              onMouseLeave={() => setHover(null)}
              isAnimationActive={!isMobile}
              animationDuration={isMobile ? 0 : 800}
            >
              {data.map((entry, index) => {
                const isHovered = hoverIndex === index;
                const ratio = index / Math.max(data.length - 1, 1);
                const darkOpacity = Math.max(1 - ratio * 0.75, 0.2);
                const lightOpacity = Math.max(1 - ratio * 0.75, 0.2);

                const fillColor = isDark
                  ? index === 0
                    ? '#FFFFFF'
                    : `rgba(255, 255, 255, ${darkOpacity.toFixed(2)})`
                  : index === 0
                  ? '#09090B'
                  : `rgba(9, 9, 11, ${lightOpacity.toFixed(2)})`;

                return (
                  <Cell
                    key={`mono-cell-${index}`}
                    fill={entry.shade || fillColor}
                    stroke={isDark ? '#181818' : '#FFFFFF'}
                    strokeWidth={2}
                    style={{
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Stat Callout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-sm sm:text-base font-bold tabular-nums font-sans">
            {activeSegment ? `${activeSegment.value}%` : `${total}%`}
          </span>
          <span
            className={cn(
              'text-[10px] font-medium tracking-tight max-w-[80px] text-center truncate',
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            )}
          >
            {activeSegment ? activeSegment.name : 'Total Allocation'}
          </span>
        </div>
      </div>

      {/* Segment Legend Footer */}
      <div
        className={cn(
          'flex flex-wrap items-center justify-around gap-2 mt-3 pt-2 border-t text-[10px]',
          isDark ? 'border-white/5 text-neutral-400' : 'border-neutral-200/60 text-neutral-600'
        )}
      >
        {data.map((seg, idx) => (
          <button
            key={idx}
            type="button"
            onMouseEnter={() => setHover(idx)}
            onMouseLeave={() => setHover(null)}
            className={cn(
              'flex items-center gap-1.5 transition-opacity cursor-pointer',
              hoverIndex !== null && hoverIndex !== idx ? 'opacity-40' : 'opacity-100'
            )}
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full shrink-0',
                idx === 0
                  ? isDark
                    ? 'bg-white'
                    : 'bg-black'
                  : isDark
                  ? 'bg-white/60'
                  : 'bg-black/50'
              )}
            />
            <span className="truncate max-w-[80px]">{seg.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
