import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Badge,
  LoadMore,
  SquareSnake,
  BobbingDots,
  ContextMenuEditDelete,
  QuestionTooltip,
  DownloadAnimatedIcons,
  PipModeIcons,
  SimplePlusMinusBtn,
  SegmentedABTabs,
  QuantityCounter,
  ListColumnToggle,
  FollowCheckButton,
  MenuDotsExpand,
  CompactModeSwitch,
  ParameterSlider,
  ParameterGrid,
  useToast,
} from '@/components/ui';
import { Sparkles } from 'lucide-react';

export const InteractiveControlsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [microTheme, setMicroTheme] = useState<'dark' | 'light' | 'auto'>('auto');
  const [stepperVal, setStepperVal] = useState(3);
  const [counterVal, setCounterVal] = useState(4);
  const [segmentedTabVal, setSegmentedTabVal] = useState<'A' | 'B'>('A');
  const [viewModeVal, setViewModeVal] = useState<'grid' | 'list'>('grid');
  const [isFollowingVal, setIsFollowingVal] = useState(false);
  const [compactModeVal, setCompactModeVal] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Interactive Micro-Controls</span>
          <Badge size="sm" variant="outline" className="font-mono text-[10px]">11 Components</Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-[11px]">Theme:</span>
          <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
            {(['auto', 'dark', 'light'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setMicroTheme(t)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all",
                  microTheme === t
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === 'auto' ? 'Auto' : t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Counter & Stepper Range Dynamics
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Stepper Value"
            value={stepperVal}
            onChange={setStepperVal}
            min={0}
            max={20}
            step={1}
          />
          <ParameterSlider
            label="Quantity Value"
            value={counterVal}
            onChange={setCounterVal}
            min={1}
            max={50}
            step={1}
          />
        </ParameterGrid>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">10. Context Menu</span>
          <ContextMenuEditDelete
            theme={microTheme}
            onEdit={() => addToast({ title: 'Edit Action', description: 'User triggered edit.', type: 'info' })}
            onDelete={() => addToast({ title: 'Delete Action', description: 'Item marked for deletion.', type: 'error' })}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">11. Info Tooltip</span>
          <QuestionTooltip theme={microTheme} text="Explore spring animations & micro-gestures" />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">12. Animated Download</span>
          <DownloadAnimatedIcons
            theme={microTheme}
            onDownload={() => {
              addToast({ title: 'Download Started', description: 'Asset package downloading...', type: 'success' });
            }}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">13. Picture-in-Picture</span>
          <PipModeIcons
            theme={microTheme}
            onToggle={(active) => addToast({ title: 'PiP Toggled', description: `Picture-in-picture is ${active ? 'Active' : 'Disabled'}`, type: 'info' })}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">14. Stepper Buttons ({stepperVal})</span>
          <SimplePlusMinusBtn
            theme={microTheme}
            value={stepperVal}
            onChange={(val) => setStepperVal(val)}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">15. Segmented A/B Tabs</span>
          <SegmentedABTabs
            theme={microTheme}
            value={segmentedTabVal}
            onChange={(tab) => setSegmentedTabVal(tab as 'A' | 'B')}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">16. Quantity Counter</span>
          <QuantityCounter
            theme={microTheme}
            value={counterVal}
            onChange={(qty) => setCounterVal(qty)}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">17. List / Column Toggle</span>
          <ListColumnToggle
            theme={microTheme}
            view={viewModeVal}
            onChange={(view) => setViewModeVal(view)}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">18. Follow Check Button</span>
          <FollowCheckButton
            theme={microTheme}
            isFollowing={isFollowingVal}
            onToggle={(following) => setIsFollowingVal(following)}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">19. Pulse Menu Dots</span>
          <MenuDotsExpand
            theme={microTheme}
            onClick={() => addToast({ title: 'Menu Dots Clicked', description: 'Expanding options...', type: 'info' })}
          />
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
          <span className="text-xs font-medium text-muted-foreground">20. Compact Grid/List Switch</span>
          <CompactModeSwitch
            theme={microTheme}
            mode={compactModeVal}
            onChange={(mode) => setCompactModeVal(mode)}
          />
        </div>
      </div>
    </div>
  );
};

export const MotionLoadersPlayground: React.FC = () => {
  const [loaderSize, setLoaderSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [loaderColor, setLoaderColor] = useState('bg-primary');

  const colorOptions = [
    { label: 'Theme', value: 'bg-primary', dot: 'bg-primary' },
    { label: 'Emerald', value: 'bg-emerald-500', dot: 'bg-emerald-500' },
    { label: 'Cyan', value: 'bg-cyan-500', dot: 'bg-cyan-500' },
    { label: 'Amber', value: 'bg-amber-500', dot: 'bg-amber-500' },
    { label: 'Rose', value: 'bg-rose-500', dot: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Motion Loaders</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Scale:</span>
            <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setLoaderSize(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-all",
                    loaderSize === s
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Color:</span>
            <div className="flex items-center gap-1">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setLoaderColor(c.value)}
                  title={c.label}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs transition-all",
                    loaderColor === c.value
                      ? "bg-primary/10 border-primary text-foreground font-semibold shadow-xs"
                      : "border-border text-muted-foreground hover:text-foreground bg-surface-subtle/40"
                  )}
                >
                  <span className={cn("size-2 rounded-full shrink-0", c.dot)} />
                  <span className="hidden sm:inline">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center space-y-4 min-h-[220px]">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            SquareSnake (3x3 Staggered Matrix)
          </div>
          <div className="p-6 rounded-2xl bg-surface-subtle/50 border border-border flex items-center justify-center">
            <SquareSnake size={loaderSize} colorClassName={loaderColor} />
          </div>
          <div className="text-xs text-muted-foreground text-center max-w-xs">
            Fluid opacity wave propagation across a 3x3 matrix based on diagonal coordinate delay.
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center space-y-4 min-h-[220px]">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            BobbingDots (Harmonic Wave)
          </div>
          <div className="p-6 rounded-2xl bg-surface-subtle/50 border border-border flex items-center justify-center h-24">
            <BobbingDots size={loaderSize} colorClassName={loaderColor} />
          </div>
          <div className="text-xs text-muted-foreground text-center max-w-xs">
            Continuous harmonic sine-bounce wave with staggering and smooth easing.
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadMorePlayground: React.FC = () => {
  const [loadMoreItems, setLoadMoreItems] = useState([
    { id: '1', customer: 'Acme Corp', total: '$1,240.00', status: 'Settled' },
    { id: '2', customer: 'Stripe Payments', total: '$890.50', status: 'Settled' },
    { id: '3', customer: 'Linear App', total: '$420.00', status: 'Pending' },
  ]);
  const loadMorePage = useRef(1);

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Infinite Scroll Order Feed
        </span>
        <button
          onClick={() => {
            loadMorePage.current = 1;
            setLoadMoreItems([
              { id: '1', customer: 'Acme Corp', total: '$1,240.00', status: 'Settled' },
              { id: '2', customer: 'Stripe Payments', total: '$890.50', status: 'Settled' },
              { id: '3', customer: 'Linear App', total: '$420.00', status: 'Pending' },
            ]);
          }}
          className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground"
        >
          Reset Feed
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <div className="h-72 overflow-y-auto overscroll-contain rounded-xl border border-border bg-surface-subtle/50 p-2 space-y-2">
          {loadMoreItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-surface text-xs"
            >
              <div>
                <div className="font-semibold text-foreground">{item.customer}</div>
                <div className="text-[11px] text-muted-foreground font-mono">Order #{item.id}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-foreground">{item.total}</div>
                <span className="text-[10px] text-success font-medium">{item.status}</span>
              </div>
            </div>
          ))}

          <LoadMore
            onLoad={async () => {
              await new Promise((r) => setTimeout(r, 800));
              if (loadMorePage.current >= 3) return false;
              loadMorePage.current += 1;
              const p = loadMorePage.current;
              setLoadMoreItems((prev) => [
                ...prev,
                { id: String(p * 3 - 2), customer: `Customer ${p}A`, total: '$650.00', status: 'Settled' },
                { id: String(p * 3 - 1), customer: `Customer ${p}B`, total: '$1,120.00', status: 'Settled' },
                { id: String(p * 3), customer: `Customer ${p}C`, total: '$340.00', status: 'Pending' },
              ]);
              return p < 3;
            }}
            rootMargin="100px 0px"
            exhaustedLabel="All 9 transactions loaded."
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Scroll inside the box above to trigger the next page of transactions automatically.
        </p>
      </div>
    </div>
  );
};
