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
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { Activity, Monitor, Tablet, Smartphone } from 'lucide-react';

export const MonoChartsPlayground: React.FC = () => {
  const [chartTheme, setChartTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [chartCompact, setChartCompact] = useState(false);
  const [chartDeviceView, setChartDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [chartActiveTab, setChartActiveTab] = useState<'suite' | 'line' | 'bar' | 'area' | 'donut' | 'stream'>('suite');
  const [lineActiveSeries, setLineActiveSeries] = useState<'all' | 'value'>('all');
  const [barActiveLayout, setBarActiveLayout] = useState<'vertical' | 'horizontal'>('vertical');
  const [areaActiveCurve, setAreaActiveCurve] = useState<'monotone' | 'natural'>('monotone');
  const [donutHoveredIdx, setDonutHoveredIdx] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Master Control Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-base font-semibold text-foreground flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Mono Rounded Charts (5 Components + Suite)
          </div>
          <p className="text-xs text-muted-foreground">
            Minimalist monochrome Recharts with rounded corners, theme reactivity, and responsive adaptation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Theme Override */}
          <div className="flex items-center gap-1.5 bg-surface-subtle p-1 rounded-xl border border-border">
            <span className="text-[11px] font-medium text-muted-foreground px-1.5">Theme:</span>
            {(['auto', 'dark', 'light'] as const).map((t) => (
              <Button
                key={t}
                size="xs"
                variant={chartTheme === t ? 'primary' : 'ghost'}
                onClick={() => setChartTheme(t)}
                className="capitalize"
              >
                {t}
              </Button>
            ))}
          </div>

          {/* Compact Toggle */}
          <Button
            size="xs"
            variant={chartCompact ? 'primary' : 'outline'}
            onClick={() => setChartCompact(!chartCompact)}
          >
            {chartCompact ? 'Compact: On' : 'Compact: Off'}
          </Button>

          {/* Device Viewport Simulation */}
          <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-xl border border-border">
            <button
              type="button"
              onClick={() => setChartDeviceView('desktop')}
              title="Desktop (Full)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                chartDeviceView === 'desktop'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setChartDeviceView('tablet')}
              title="Tablet Viewport (768px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                chartDeviceView === 'tablet'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setChartDeviceView('mobile')}
              title="Mobile Viewport (375px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                chartDeviceView === 'mobile'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs between Suite view and Individual Chart playgrounds */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        {[
          { id: 'suite', label: 'Suite Grid (All 5)' },
          { id: 'line', label: '1. Spline Dynamics (Line)' },
          { id: 'bar', label: '2. Pill Pillars (Bar)' },
          { id: 'area', label: '3. Curved Wave (Area)' },
          { id: 'donut', label: '4. Soft Arc (Donut)' },
          { id: 'stream', label: '5. Fluid Stream Wave' },
        ].map((tab) => (
          <Button
            key={tab.id}
            size="sm"
            variant={chartActiveTab === tab.id ? 'primary' : 'outline'}
            onClick={() => setChartActiveTab(tab.id as any)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Viewport Simulation Container */}
      <div
        className={cn(
          'transition-all duration-300 mx-auto',
          chartDeviceView === 'mobile' &&
            'max-w-[390px] border-[6px] border-neutral-700/80 rounded-[40px] p-4 shadow-2xl bg-surface/40',
          chartDeviceView === 'tablet' &&
            'max-w-[768px] border-2 border-neutral-600/60 rounded-[32px] p-5 shadow-xl bg-surface/40',
          chartDeviceView === 'desktop' && 'w-full'
        )}
      >
        {chartDeviceView !== 'desktop' && (
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
            <span>{chartDeviceView === 'mobile' ? 'Mobile Viewport (375px - 390px)' : 'Tablet Viewport (768px)'}</span>
            <span className="capitalize">Theme: {chartTheme}</span>
          </div>
        )}

        {chartActiveTab === 'suite' && (
          <MonoChartsSuite theme={chartTheme} compact={chartCompact} />
        )}

        {chartActiveTab === 'line' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-subtle border border-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground font-medium">Interactive Controls:</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Series Mode:</span>
                {(['all', 'value'] as const).map((s) => (
                  <Button
                    key={s}
                    size="xs"
                    variant={lineActiveSeries === s ? 'primary' : 'outline'}
                    onClick={() => setLineActiveSeries(s)}
                  >
                    {s === 'all' ? 'Dual Series' : 'Single Active'}
                  </Button>
                ))}
              </div>
            </div>
            <MonoRoundedLineChart
              theme={chartTheme}
              compact={chartCompact}
              activeSeries={lineActiveSeries}
              onActiveSeriesChange={setLineActiveSeries}
            />
          </div>
        )}

        {chartActiveTab === 'bar' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-subtle border border-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground font-medium">Interactive Controls:</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Bar Orientation:</span>
                {(['vertical', 'horizontal'] as const).map((l) => (
                  <Button
                    key={l}
                    size="xs"
                    variant={barActiveLayout === l ? 'primary' : 'outline'}
                    onClick={() => setBarActiveLayout(l)}
                  >
                    {l === 'vertical' ? 'Vertical (Columns)' : 'Horizontal (Rows)'}
                  </Button>
                ))}
              </div>
            </div>
            <MonoRoundedBarChart
              theme={chartTheme}
              compact={chartCompact}
              layout={barActiveLayout}
              onLayoutChange={setBarActiveLayout}
            />
          </div>
        )}

        {chartActiveTab === 'area' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-subtle border border-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground font-medium">Interactive Controls:</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Spline Curve Interpolation:</span>
                {(['monotone', 'natural'] as const).map((c) => (
                  <Button
                    key={c}
                    size="xs"
                    variant={areaActiveCurve === c ? 'primary' : 'outline'}
                    onClick={() => setAreaActiveCurve(c)}
                  >
                    {c === 'monotone' ? 'Monotone' : 'Natural Spline'}
                  </Button>
                ))}
              </div>
            </div>
            <MonoRoundedAreaChart
              theme={chartTheme}
              compact={chartCompact}
              curve={areaActiveCurve}
              onCurveChange={setAreaActiveCurve}
            />
          </div>
        )}

        {chartActiveTab === 'donut' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-subtle border border-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground font-medium">Interactive Controls:</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Highlight Segment:</span>
                <Button
                  size="xs"
                  variant={donutHoveredIdx === null ? 'primary' : 'outline'}
                  onClick={() => setDonutHoveredIdx(null)}
                >
                  Auto (Hover)
                </Button>
                {['Core', 'UI', 'Assets', 'Other'].map((name, i) => (
                  <Button
                    key={name}
                    size="xs"
                    variant={donutHoveredIdx === i ? 'primary' : 'outline'}
                    onClick={() => setDonutHoveredIdx(i)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>
            <MonoRoundedDonutChart
              theme={chartTheme}
              compact={chartCompact}
              hoverIndex={donutHoveredIdx}
              onHoverIndexChange={setDonutHoveredIdx}
            />
          </div>
        )}

        {chartActiveTab === 'stream' && (
          <MonoRoundedStreamChart theme={chartTheme} compact={chartCompact} />
        )}
      </div>
    </div>
  );
};
