"use client";

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
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

export interface LinePoint {
  label: string;
  value: number;
  secondary?: number;
  [key: string]: any;
}

export const DEFAULT_MONO_LINE_DATA: LinePoint[] = [
  { label: 'Jan', value: 24, secondary: 18 },
  { label: 'Feb', value: 45, secondary: 32 },
  { label: 'Mar', value: 38, secondary: 29 },
  { label: 'Apr', value: 65, secondary: 48 },
  { label: 'May', value: 52, secondary: 41 },
  { label: 'Jun', value: 84, secondary: 62 },
];

export interface MonoRoundedLineChartProps {
  data?: LinePoint[];
  title?: string;
  badge?: string;
  metric?: string | number;
  unit?: string;
  footerLabel?: string;
  footerValue?: string;
  theme?: MonoChartTheme;
  compact?: boolean;
  activeSeries?: 'all' | 'value';
  onActiveSeriesChange?: (series: 'all' | 'value') => void;
  showSeriesToggle?: boolean;
  className?: string;
  height?: number;
}

export function MonoRoundedLineChart({
  data = DEFAULT_MONO_LINE_DATA,
  title = 'Spline Dynamics',
  badge = 'Line',
  metric,
  unit = 'nodes',
  footerLabel = 'Rounded Caps',
  footerValue,
  theme = 'auto',
  compact = false,
  activeSeries: controlledSeries,
  onActiveSeriesChange,
  showSeriesToggle = true,
  className,
  height,
}: MonoRoundedLineChartProps) {
  const isDark = useResolvedChartTheme(theme);
  const isMobile = useIsMobile();
  const [internalSeries, setInternalSeries] = useState<'value' | 'all'>('all');

  const activeSeries = controlledSeries ?? internalSeries;
  const handleSeriesChange = (s: 'value' | 'all') => {
    setInternalSeries(s);
    onActiveSeriesChange?.(s);
  };

  const latestVal = useMemo(() => {
    if (metric !== undefined) return metric;
    const last = data[data.length - 1];
    return last ? `${last.value}k` : '0';
  }, [metric, data]);

  const peakVal = useMemo(() => {
    if (footerValue !== undefined) return footerValue;
    const maxVal = Math.max(...data.map((d) => d.value), 0);
    return `${maxVal}k Peak`;
  }, [footerValue, data]);

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
            {latestVal} <span className="text-xs font-normal opacity-70 font-mono">{unit}</span>
          </div>
        </div>

        {/* Series Filter Toggle */}
        {showSeriesToggle && (
          <div
            className={cn(
              'p-0.5 rounded-full border flex items-center gap-0.5 shrink-0',
              isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
            )}
          >
            {(['all', 'value'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSeriesChange(s)}
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer',
                  activeSeries === s
                    ? isDark
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-black text-white font-semibold shadow-sm'
                    : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                )}
              >
                {s === 'all' ? 'Dual' : 'Single'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Minimalist Recharts Stage */}
      <div
        className={cn(
          'relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 touch-pan-y min-h-[130px]',
          'bg-surface-sunken/60 border border-border/40'
        )}
      >
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart
            data={data}
            margin={{
              top: 12,
              right: 12,
              left: isMobile ? -16 : -22,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#71717A' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#71717A' }}
            />
            <Tooltip content={<MonoChartTooltipContent theme={isDark ? 'dark' : 'light'} indicator="dot" />} />

            {activeSeries === 'all' && (
              <Line
                type="monotone"
                dataKey="secondary"
                name="Baseline"
                stroke={isDark ? '#52525B' : '#A1A1AA'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={!isMobile}
                animationDuration={isMobile ? 0 : 700}
              />
            )}

            <Line
              type="monotone"
              dataKey="value"
              name="Active"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={{
                r: 4,
                fill: isDark ? '#FFFFFF' : '#09090B',
                stroke: isDark ? '#111322' : '#FFFFFF',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: isDark ? '#FFFFFF' : '#09090B',
                stroke: isDark ? '#A1A1AA' : '#52525B',
                strokeWidth: 2,
              }}
              isAnimationActive={!isMobile}
              animationDuration={isMobile ? 0 : 800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics */}
      <div
        className={cn(
          'flex items-center justify-between mt-3 pt-2 border-t text-[11px] font-mono',
          isDark ? 'border-white/5 text-neutral-400' : 'border-neutral-200/60 text-neutral-600'
        )}
      >
        <span>{footerLabel}</span>
        <span className={cn('font-medium', isDark ? 'text-white' : 'text-black')}>{peakVal}</span>
      </div>
    </div>
  );
}
