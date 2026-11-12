import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  MonoRoundedLineChart,
  MonoRoundedBarChart,
  MonoRoundedAreaChart,
  MonoRoundedDonutChart,
  MonoRoundedStreamChart,
  MonoChartsSuite,
} from '@/components/ui';
import { Monitor, Tablet, Smartphone, SlidersHorizontal } from 'lucide-react';

interface SharedChartControlsProps {
  theme: 'auto' | 'dark' | 'light';
  onThemeChange: (t: 'auto' | 'dark' | 'light') => void;
  compact: boolean;
  onCompactChange: (c: boolean) => void;
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onDeviceViewChange: (v: 'desktop' | 'tablet' | 'mobile') => void;
  children?: React.ReactNode;
}

const SharedChartControls: React.FC<SharedChartControlsProps> = ({
  theme,
  onThemeChange,
  compact,
  onCompactChange,
  deviceView,
  onDeviceViewChange,
  children,
}) => (
  <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border/80 space-y-3.5 shadow-2xs">
    <div className="flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <SlidersHorizontal className="size-3.5 text-primary" />
        <span>INTERACTIVE PARAMETER CONTROLS</span>
      </div>
      <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
        Preview-Driven State
      </span>
    </div>

    {children && (
      <div className="pt-2 border-t border-border/60 flex flex-wrap items-center gap-2.5">
        {children}
      </div>
    )}

    <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Theme Selection */}
      <div className="flex items-center gap-1.5 bg-surface-subtle p-1 rounded-xl border border-border">
        <span className="text-[11px] font-medium text-muted-foreground px-1.5">Theme:</span>
        {(['auto', 'dark', 'light'] as const).map((t) => (
          <Button
            key={t}
            size="xs"
            variant={theme === t ? 'primary' : 'ghost'}
            onClick={() => onThemeChange(t)}
            className="capitalize"
          >
            {t}
          </Button>
        ))}
      </div>

      {/* Compact Density */}
      <Button
        size="xs"
        variant={compact ? 'primary' : 'outline'}
        onClick={() => onCompactChange(!compact)}
      >
        {compact ? 'Compact: On' : 'Compact: Off'}
      </Button>

      {/* Viewport Simulation */}
      <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-xl border border-border">
        <button
          type="button"
          onClick={() => onDeviceViewChange('desktop')}
          title="Desktop Full"
          className={cn(
            'p-1.5 rounded-lg transition-all',
            deviceView === 'desktop'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Monitor className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDeviceViewChange('tablet')}
          title="Tablet Viewport (768px)"
          className={cn(
            'p-1.5 rounded-lg transition-all',
            deviceView === 'tablet'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Tablet className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDeviceViewChange('mobile')}
          title="Mobile Viewport (390px)"
          className={cn(
            'p-1.5 rounded-lg transition-all',
            deviceView === 'mobile'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Smartphone className="size-3.5" />
        </button>
      </div>
    </div>
  </div>
);

// 1. Mono Rounded Line Chart Playground (Preview First, Controls Below)
export const MonoLineChartPlayground: React.FC = () => {
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [compact, setCompact] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeSeries, setActiveSeries] = useState<'all' | 'value'>('all');

  return (
    <div className="space-y-6">
      {/* 1. INTERACTIVE PREVIEW FIRST */}
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'w-full transition-all duration-300',
            deviceView === 'mobile' && 'max-w-[390px] border-2 border-border/80 rounded-[32px] p-4 bg-surface/30 shadow-lg',
            deviceView === 'tablet' && 'max-w-[768px] border-2 border-border/80 rounded-[28px] p-5 bg-surface/30 shadow-lg',
            deviceView === 'desktop' && 'max-w-full'
          )}
        >
          <MonoRoundedLineChart
            theme={theme}
            compact={compact}
            activeSeries={activeSeries}
            onActiveSeriesChange={setActiveSeries}
          />
        </div>
      </div>

      {/* 2. PARAMETER CONTROLS BELOW */}
      <SharedChartControls
        theme={theme}
        onThemeChange={setTheme}
        compact={compact}
        onCompactChange={setCompact}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
      >
        <span className="text-muted-foreground font-medium mr-1">Series Mode:</span>
        {(['all', 'value'] as const).map((s) => (
          <Button
            key={s}
            size="xs"
            variant={activeSeries === s ? 'primary' : 'outline'}
            onClick={() => setActiveSeries(s)}
          >
            {s === 'all' ? 'Dual Series Baseline' : 'Single Active Series'}
          </Button>
        ))}
      </SharedChartControls>
    </div>
  );
};

// 2. Mono Rounded Bar Chart Playground (Preview First, Controls Below)
export const MonoBarChartPlayground: React.FC = () => {
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [compact, setCompact] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');

  return (
    <div className="space-y-6">
      {/* 1. INTERACTIVE PREVIEW FIRST */}
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'w-full transition-all duration-300',
            deviceView === 'mobile' && 'max-w-[390px] border-2 border-border/80 rounded-[32px] p-4 bg-surface/30 shadow-lg',
            deviceView === 'tablet' && 'max-w-[768px] border-2 border-border/80 rounded-[28px] p-5 bg-surface/30 shadow-lg',
            deviceView === 'desktop' && 'max-w-full'
          )}
        >
          <MonoRoundedBarChart
            theme={theme}
            compact={compact}
            layout={layout}
            onLayoutChange={setLayout}
          />
        </div>
      </div>

      {/* 2. PARAMETER CONTROLS BELOW */}
      <SharedChartControls
        theme={theme}
        onThemeChange={setTheme}
        compact={compact}
        onCompactChange={setCompact}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
      >
        <span className="text-muted-foreground font-medium mr-1">Bar Layout:</span>
        {(['vertical', 'horizontal'] as const).map((l) => (
          <Button
            key={l}
            size="xs"
            variant={layout === l ? 'primary' : 'outline'}
            onClick={() => setLayout(l)}
          >
            {l === 'vertical' ? 'Vertical Columns' : 'Horizontal Rows'}
          </Button>
        ))}
      </SharedChartControls>
    </div>
  );
};

// 3. Mono Rounded Area Chart Playground (Preview First, Controls Below)
export const MonoAreaChartPlayground: React.FC = () => {
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [compact, setCompact] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [curve, setCurve] = useState<'monotone' | 'natural'>('monotone');

  return (
    <div className="space-y-6">
      {/* 1. INTERACTIVE PREVIEW FIRST */}
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'w-full transition-all duration-300',
            deviceView === 'mobile' && 'max-w-[390px] border-2 border-border/80 rounded-[32px] p-4 bg-surface/30 shadow-lg',
            deviceView === 'tablet' && 'max-w-[768px] border-2 border-border/80 rounded-[28px] p-5 bg-surface/30 shadow-lg',
            deviceView === 'desktop' && 'max-w-full'
          )}
        >
          <MonoRoundedAreaChart
            theme={theme}
            compact={compact}
            curve={curve}
            onCurveChange={setCurve}
          />
        </div>
      </div>

      {/* 2. PARAMETER CONTROLS BELOW */}
      <SharedChartControls
        theme={theme}
        onThemeChange={setTheme}
        compact={compact}
        onCompactChange={setCompact}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
      >
        <span className="text-muted-foreground font-medium mr-1">Spline Interpolation:</span>
        {(['monotone', 'natural'] as const).map((c) => (
          <Button
            key={c}
            size="xs"
            variant={curve === c ? 'primary' : 'outline'}
            onClick={() => setCurve(c)}
          >
            {c === 'monotone' ? 'Monotone Spline' : 'Natural Spline'}
          </Button>
        ))}
      </SharedChartControls>
    </div>
  );
};

// 4. Mono Rounded Donut Chart Playground (Preview First, Controls Below)
export const MonoDonutChartPlayground: React.FC = () => {
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [compact, setCompact] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* 1. INTERACTIVE PREVIEW FIRST */}
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'w-full transition-all duration-300',
            deviceView === 'mobile' && 'max-w-[390px] border-2 border-border/80 rounded-[32px] p-4 bg-surface/30 shadow-lg',
            deviceView === 'tablet' && 'max-w-[768px] border-2 border-border/80 rounded-[28px] p-5 bg-surface/30 shadow-lg',
            deviceView === 'desktop' && 'max-w-full'
          )}
        >
          <MonoRoundedDonutChart
            theme={theme}
            compact={compact}
            hoverIndex={hoverIndex}
            onHoverIndexChange={setHoverIndex}
          />
        </div>
      </div>

      {/* 2. PARAMETER CONTROLS BELOW */}
      <SharedChartControls
        theme={theme}
        onThemeChange={setTheme}
        compact={compact}
        onCompactChange={setCompact}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
      >
        <span className="text-muted-foreground font-medium mr-1">Highlight Slice:</span>
        <Button
          size="xs"
          variant={hoverIndex === null ? 'primary' : 'outline'}
          onClick={() => setHoverIndex(null)}
        >
          Auto (Hover)
        </Button>
        {['Core', 'UI', 'Assets', 'Other'].map((name, i) => (
          <Button
            key={name}
            size="xs"
            variant={hoverIndex === i ? 'primary' : 'outline'}
            onClick={() => setHoverIndex(i)}
          >
            {name}
          </Button>
        ))}
      </SharedChartControls>
    </div>
  );
};

// 5. Mono Rounded Stream Chart Playground (Preview First, Controls Below)
export const MonoStreamChartPlayground: React.FC = () => {
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [compact, setCompact] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="space-y-6">
      {/* 1. INTERACTIVE PREVIEW FIRST */}
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'w-full transition-all duration-300',
            deviceView === 'mobile' && 'max-w-[390px] border-2 border-border/80 rounded-[32px] p-4 bg-surface/30 shadow-lg',
            deviceView === 'tablet' && 'max-w-[768px] border-2 border-border/80 rounded-[28px] p-5 bg-surface/30 shadow-lg',
            deviceView === 'desktop' && 'max-w-full'
          )}
        >
          <MonoRoundedStreamChart
            theme={theme}
            compact={compact}
          />
        </div>
      </div>

      {/* 2. PARAMETER CONTROLS BELOW */}
      <SharedChartControls
        theme={theme}
        onThemeChange={setTheme}
        compact={compact}
        onCompactChange={setCompact}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
      />
    </div>
  );
};

// 6. Mono Charts Suite Playground (All-in-One Dashboard Suite)
export const MonoChartsSuitePlayground: React.FC = () => {
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [compact, setCompact] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="space-y-6">
      {/* 1. INTERACTIVE PREVIEW FIRST */}
      <div className="w-full flex justify-center">
        <div
          className={cn(
            'w-full transition-all duration-300',
            deviceView === 'mobile' && 'max-w-[390px] border-2 border-border/80 rounded-[32px] p-4 bg-surface/30 shadow-lg',
            deviceView === 'tablet' && 'max-w-[768px] border-2 border-border/80 rounded-[28px] p-5 bg-surface/30 shadow-lg',
            deviceView === 'desktop' && 'max-w-full'
          )}
        >
          <MonoChartsSuite theme={theme} compact={compact} />
        </div>
      </div>

      {/* 2. PARAMETER CONTROLS BELOW */}
      <SharedChartControls
        theme={theme}
        onThemeChange={setTheme}
        compact={compact}
        onCompactChange={setCompact}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
      />
    </div>
  );
};

// Backward-compatible alias
export const MonoChartsPlayground = MonoChartsSuitePlayground;
