"use client";

import React, { useId, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useIsMobile } from '../../hooks/useIsMobile';
import { cn } from '../../lib/utils';
import {
  useResolvedChartTheme,
  MonoChartTooltipContent,
  type MonoChartTheme,
} from './mono-chart-shared';

export interface StreamPoint {
  t: string;
  w1: number;
  w2: number;
  [key: string]: any;
}

export const DEFAULT_MONO_STREAM_DATA: StreamPoint[] = [
  { t: '01', w1: 20, w2: 15 },
  { t: '02', w1: 45, w2: 30 },
  { t: '03', w1: 30, w2: 50 },
  { t: '04', w1: 70, w2: 35 },
  { t: '05', w1: 55, w2: 60 },
  { t: '06', w1: 85, w2: 40 },
];

export interface MonoRoundedStreamChartProps {
  data?: StreamPoint[];
  title?: string;
  badge?: string;
  metric?: string | number;
  unit?: string;
  footerLabel?: string;
  footerValue?: string;
  theme?: MonoChartTheme;
  compact?: boolean;
  className?: string;
  height?: number;
}

export function MonoRoundedStreamChart({
  data = DEFAULT_MONO_STREAM_DATA,
  title = 'Stream Wave',
  badge = 'Fluid',
  metric,
  unit = 'peak flow',
  footerLabel = 'Rounded Natural Spline',
  footerValue = 'Dual Stream Wave',
  theme = 'auto',
  compact = false,
  className,
  height,
}: MonoRoundedStreamChartProps) {
  const isDark = useResolvedChartTheme(theme);
  const isMobile = useIsMobile();
  const idPrefix = useId().replace(/:/g, '');

  const peakMetric = useMemo(() => {
    if (metric !== undefined) return metric;
    const maxVal = Math.max(...data.flatMap((d) => [d.w1, d.w2]), 0);
    return maxVal;
  }, [metric, data]);

  const chartHeight = height ?? (compact ? (isMobile ? 120 : 130) : isMobile ? 150 : 170);

  return (
    <div
      className={cn(
        'relative w-full rounded-[24px] transition-all duration-300 group flex flex-col justify-between overflow-hidden p-4 sm:p-5',
        compact ? 'h-[230px] sm:h-[268px]' : 'min-h-[295px]',
        'bg-surface border border-border text-foreground shadow-md transition-colors',
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
            {peakMetric} <span className="text-xs font-normal opacity-70 font-mono">{unit}</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div
        className={cn(
          'relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 touch-pan-y min-h-[130px]',
          'bg-surface-sunken/60 border border-border/40'
        )}
      >
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <linearGradient id={`${idPrefix}stream-g1`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#FFFFFF' : '#09090B'}
                stopOpacity={isDark ? 0.4 : 0.28}
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#FFFFFF' : '#09090B'}
                stopOpacity={isDark ? 0.05 : 0.02}
              />
            </linearGradient>
            <linearGradient id={`${idPrefix}stream-g2`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#FFFFFF' : '#09090B'}
                stopOpacity={isDark ? 0.2 : 0.14}
              />
              <stop offset="100%" stopColor={isDark ? '#FFFFFF' : '#09090B'} stopOpacity={0.0} />
            </linearGradient>
          </defs>
        </svg>

        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart
            data={data}
            margin={{
              top: 12,
              right: 12,
              left: isMobile ? -16 : -22,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="t"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#71717A' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#71717A' }}
            />
            <Tooltip content={<MonoChartTooltipContent theme={isDark ? 'dark' : 'light'} indicator="dot" />} />
            <Area
              type="natural"
              dataKey="w1"
              name="Wave 1"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`url(#${idPrefix}stream-g1)`}
              isAnimationActive={!isMobile}
              animationDuration={isMobile ? 0 : 800}
            />
            <Area
              type="natural"
              dataKey="w2"
              name="Wave 2"
              stroke={isDark ? '#A1A1AA' : '#71717A'}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`url(#${idPrefix}stream-g2)`}
              isAnimationActive={!isMobile}
              animationDuration={isMobile ? 0 : 900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
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
