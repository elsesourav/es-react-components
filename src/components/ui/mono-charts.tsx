"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { MonoChartTheme } from './mono-chart-shared';
import { MonoRoundedLineChart } from './mono-line-chart';
import { MonoRoundedBarChart } from './mono-bar-chart';
import { MonoRoundedAreaChart } from './mono-area-chart';
import { MonoRoundedDonutChart } from './mono-donut-chart';
import { MonoRoundedStreamChart } from './mono-stream-chart';

export * from './mono-chart-shared';
export * from './mono-line-chart';
export * from './mono-bar-chart';
export * from './mono-area-chart';
export * from './mono-donut-chart';
export * from './mono-stream-chart';

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
    <div
      className={cn(
        'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',
        className
      )}
    >
      <MonoRoundedLineChart theme={theme} compact={compact} />
      <MonoRoundedBarChart theme={theme} compact={compact} />
      <MonoRoundedAreaChart theme={theme} compact={compact} />
      <MonoRoundedDonutChart theme={theme} compact={compact} />
      <MonoRoundedStreamChart theme={theme} compact={compact} />
    </div>
  );
}

export default MonoChartsSuite;
