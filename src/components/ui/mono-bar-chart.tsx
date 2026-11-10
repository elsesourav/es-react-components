"use client";

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useIsMobile } from '../../hooks/useIsMobile';
import { cn } from '../../lib/utils';
import {
  useResolvedChartTheme,
  MonoChartTooltipContent,
  type MonoChartTheme,
} from './mono-chart-shared';

export interface BarPoint {
  label: string;
  primary: number;
  secondary?: number;
  [key: string]: any;
}

export const DEFAULT_MONO_BAR_DATA: BarPoint[] = [
  { label: 'Mon', primary: 45, secondary: 25 },
  { label: 'Tue', primary: 78, secondary: 40 },
  { label: 'Wed', primary: 62, secondary: 30 },
  { label: 'Thu', primary: 95, secondary: 55 },
  { label: 'Fri', primary: 88, secondary: 50 },
  { label: 'Sat', primary: 54, secondary: 28 },
];

export interface MonoRoundedBarChartProps {
  data?: BarPoint[];
  title?: string;
  badge?: string;
  metric?: string | number;
  unit?: string;
  footerLabel?: string;
  footerValue?: string;
  theme?: MonoChartTheme;
  compact?: boolean;
  layout?: 'vertical' | 'horizontal';
  onLayoutChange?: (layout: 'vertical' | 'horizontal') => void;
  showLayoutToggle?: boolean;
  className?: string;
  height?: number;
}

export function MonoRoundedBarChart({
  data = DEFAULT_MONO_BAR_DATA,
  title = 'Mono Pill Pillars',
  badge = 'Full Radius',
  metric,
  unit = 'units built',
  footerLabel = 'Corner Radius: 8px All',
  footerValue = 'Monochrome Fill',
  theme = 'auto',
  compact = false,
  layout: controlledLayout,
  onLayoutChange,
  showLayoutToggle = true,
  className,
  height,
}: MonoRoundedBarChartProps) {
  const isDark = useResolvedChartTheme(theme);
  const isMobile = useIsMobile();
  const [internalLayout, setInternalLayout] = useState<'vertical' | 'horizontal'>('vertical');

  const layout = controlledLayout ?? internalLayout;
  const isHorizontal = layout === 'horizontal';

  const handleLayoutChange = (l: 'vertical' | 'horizontal') => {
    setInternalLayout(l);
    onLayoutChange?.(l);
  };

  const totalPrimary = useMemo(() => {
    if (metric !== undefined) return metric;
    return data.reduce((acc, item) => acc + item.primary, 0);
  }, [metric, data]);

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
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
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
            {typeof totalPrimary === 'number' ? totalPrimary.toLocaleString() : totalPrimary}{' '}
            <span className="text-xs font-normal opacity-70 font-mono">{unit}</span>
          </div>
        </div>

        {/* Layout Switcher */}
        {showLayoutToggle && (
          <div
            className={cn(
              'p-0.5 rounded-full border flex items-center gap-0.5 shrink-0',
              isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
            )}
          >
            {(['vertical', 'horizontal'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => handleLayoutChange(l)}
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer',
                  layout === l
                    ? isDark
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-black text-white font-semibold shadow-sm'
                    : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                )}
              >
                {l === 'vertical' ? 'Col' : 'Row'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Recharts Stage */}
      <div
        className={cn(
          'relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 touch-pan-y min-h-[130px]',
          isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
        )}
      >
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={data}
            layout={isHorizontal ? 'vertical' : 'horizontal'}
            margin={{
              top: 12,
              right: 12,
              left: isHorizontal ? 0 : isMobile ? -16 : -22,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}
            />
            {isHorizontal ? (
              <>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="label"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#71717A' }}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#71717A' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#71717A' }}
                />
              </>
            )}
            <Tooltip content={<MonoChartTooltipContent theme={isDark ? 'dark' : 'light'} indicator="dot" />} />

            {/* Primary Rounded Pill Column */}
            <Bar
              dataKey="primary"
              name="Primary Output"
              fill={isDark ? '#FFFFFF' : '#09090B'}
              radius={isHorizontal ? [0, 8, 8, 0] : [8, 8, 8, 8]}
              barSize={isHorizontal ? (isMobile ? 10 : 12) : isMobile ? 12 : 16}
              isAnimationActive={!isMobile}
              animationDuration={isMobile ? 0 : 800}
            />

            {/* Muted Secondary Column */}
            <Bar
              dataKey="secondary"
              name="Secondary Output"
              fill={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)'}
              radius={isHorizontal ? [0, 8, 8, 0] : [8, 8, 8, 8]}
              barSize={isHorizontal ? (isMobile ? 10 : 12) : isMobile ? 12 : 16}
              isAnimationActive={!isMobile}
              animationDuration={isMobile ? 0 : 900}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Details */}
      <div
        className={cn(
          'flex items-center justify-between mt-3 pt-2 border-t text-[11px] font-mono',
          isDark ? 'border-white/5 text-neutral-400' : 'border-neutral-200/60 text-neutral-600'
        )}
      >
        <span>{footerLabel}</span>
        <span className={cn('font-medium', isDark ? 'text-white' : 'text-black')}>{footerValue}</span>
      </div>
    </div>
  );
}
