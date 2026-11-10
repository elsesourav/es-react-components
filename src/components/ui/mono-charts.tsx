"use client";

import React, { useState, useEffect, useId, useContext, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useIsMobile } from '../../hooks/useIsMobile';
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
        isDark
          ? 'bg-[#181818]/95 border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
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

/* ==========================================================================
   1. MonoRoundedLineChart (Spline Dynamics)
   ========================================================================== */
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
          isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
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
                stroke: isDark ? '#181818' : '#FFFFFF',
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

/* ==========================================================================
   2. MonoRoundedBarChart (Pill Pillars)
   ========================================================================== */
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

/* ==========================================================================
   3. MonoRoundedAreaChart (Curved Wave)
   ========================================================================== */
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

/* ==========================================================================
   4. MonoRoundedDonutChart (Soft Arc Caps)
   ========================================================================== */
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

/* ==========================================================================
   5. MonoRoundedStreamChart (Dual Natural Wave)
   ========================================================================== */
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
            {peakMetric} <span className="text-xs font-normal opacity-70 font-mono">{unit}</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div
        className={cn(
          'relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 touch-pan-y min-h-[130px]',
          isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
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

/* ==========================================================================
   Composite: MonoChartsSuite / Grid
   ========================================================================== */
export interface MonoChartsSuiteProps {
  theme?: MonoChartTheme;
  compact?: boolean;
  className?: string;
}

export function MonoChartsSuite({
  theme = 'auto',
  compact = false,
  className,
}: MonoChartsSuiteProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full', className)}>
      <MonoRoundedLineChart theme={theme} compact={compact} />
      <MonoRoundedBarChart theme={theme} compact={compact} />
      <MonoRoundedAreaChart theme={theme} compact={compact} />
      <MonoRoundedDonutChart theme={theme} compact={compact} />
      <MonoRoundedStreamChart theme={theme} compact={compact} className="md:col-span-2 xl:col-span-2" />
    </div>
  );
}
