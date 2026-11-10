"use client";

import React, { useState, useId, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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

export interface AreaPoint {
  time: string;
  volume: number;
  [key: string]: any;
}

export const DEFAULT_MONO_AREA_DATA: AreaPoint[] = [
  { time: '02:00', volume: 18 },
  { time: '06:00', volume: 34 },
  { time: '10:00', volume: 72 },
  { time: '14:00', volume: 89 },
  { time: '18:00', volume: 64 },
  { time: '22:00', volume: 48 },
];

export interface MonoRoundedAreaChartProps {
  data?: AreaPoint[];
  title?: string;
  badge?: string;
  metric?: string | number;
  unit?: string;
  footerLabel?: string;
  footerValue?: string;
  theme?: MonoChartTheme;
  compact?: boolean;
  curve?: 'monotone' | 'natural';
  onCurveChange?: (curve: 'monotone' | 'natural') => void;
  showCurveToggle?: boolean;
  className?: string;
  height?: number;
}

export function MonoRoundedAreaChart({
  data = DEFAULT_MONO_AREA_DATA,
  title = 'Mono Curved Wave',
  badge = 'Soft Gradient',
  metric,
  unit = 'peak throughput',
  footerLabel = 'Minimalist Spline Shading',
  footerValue = '99.9% Linear Flow',
  theme = 'auto',
  compact = false,
  curve: controlledCurve,
  onCurveChange,
  showCurveToggle = true,
  className,
  height,
}: MonoRoundedAreaChartProps) {
  const isDark = useResolvedChartTheme(theme);
  const isMobile = useIsMobile();
  const idPrefix = useId().replace(/:/g, '');
  const [internalCurve, setInternalCurve] = useState<'monotone' | 'natural'>('monotone');

  const curve = controlledCurve ?? internalCurve;
  const handleCurveChange = (c: 'monotone' | 'natural') => {
    setInternalCurve(c);
    onCurveChange?.(c);
  };

  const latestVal = useMemo(() => {
    if (metric !== undefined) return metric;
    const last = data[data.length - 1];
    return last ? `${last.volume}%` : '0%';
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
            {latestVal} <span className="text-xs font-normal opacity-70 font-mono">{unit}</span>
          </div>
        </div>

        {/* Curve Toggle */}
        {showCurveToggle && (
          <div
            className={cn(
              'p-0.5 rounded-full border flex items-center gap-0.5 shrink-0',
              isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
            )}
          >
            {(['monotone', 'natural'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCurveChange(c)}
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer',
                  curve === c
                    ? isDark
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-black text-white font-semibold shadow-sm'
                    : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                )}
              >
                {c}
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
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <linearGradient id={`${idPrefix}mono-area-gradient`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isDark ? '#FFFFFF' : '#09090B'}
                stopOpacity={isDark ? 0.35 : 0.22}
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
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}
            />
            <XAxis
              dataKey="time"
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
              type={curve}
              dataKey="volume"
              name="Volume Flow"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`url(#${idPrefix}mono-area-gradient)`}
              isAnimationActive={!isMobile}
              animationDuration={isMobile ? 0 : 800}
            />
          </AreaChart>
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
        <span className={cn('font-medium', isDark ? 'text-white' : 'text-black')}>{footerValue}</span>
      </div>
    </div>
  );
}
