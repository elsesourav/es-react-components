import React, { useState } from 'react';
import {
  Button,
  SwipeToast,
  type SwipeToastFuse,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast, type ToastPosition } from '@/components/ui';
import { Layers, Sparkles, Trash2, ArrowUpDown } from 'lucide-react';

export const ToastPlayground: React.FC = () => {
  const { addToast, clearToasts, toasts, position, setPosition, isExpanded, setIsExpanded } = useToast();
  const [toastDuration, setToastDuration] = useState(4500);
  const [fusePosition, setFusePosition] = useState<SwipeToastFuse>('bottom');
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [closeButton, setCloseButton] = useState(true);
  const [showAction, setShowAction] = useState(true);
  const [settleBounce, setSettleBounce] = useState(0.2);
  const [swipeDistance, setSwipeDistance] = useState(40);
  const [toastRadius, setToastRadius] = useState(12);
  const [toastWidth, setToastWidth] = useState(360);
  const [inlineKey, setInlineKey] = useState(0);
  const [inlineToastOpen, setInlineToastOpen] = useState(true);
  const [lastDismissReason, setLastDismissReason] = useState<string | null>(null);

  const resetInlineToast = () => {
    setInlineKey((k) => k + 1);
    setInlineToastOpen(true);
    setLastDismissReason(null);
  };

  const spawnBatchStack = () => {
    addToast({
      title: 'Database replica synced',
      description: 'Distributed cluster nodes verified at revision 104.',
      type: 'success',
      duration: toastDuration,
      fuse: fusePosition,
      actionLabel: showAction ? 'View Logs' : undefined,
    });

    setTimeout(() => {
      addToast({
        title: 'CPU load threshold 82%',
        description: 'Auto-scaling policy initiated for worker pool.',
        type: 'warning',
        duration: toastDuration,
        fuse: fusePosition,
        actionLabel: showAction ? 'Scale Up' : undefined,
      });
    }, 180);

    setTimeout(() => {
      addToast({
        title: 'New API version live',
        description: 'v2.4 endpoints now accepting traffic with zero downtime.',
        type: 'info',
        duration: toastDuration,
        fuse: fusePosition,
        actionLabel: showAction ? 'Docs' : undefined,
      });
    }, 360);
  };

  const positions: { label: string; value: ToastPosition }[] = [
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Center', value: 'bottom-center' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Center', value: 'top-center' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Interactive Inline Showcase Card (Preview First) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Interactive Inline Toast Preview</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag down with your mouse or finger to feel gesture inertia, or hover to pause the burning fuse.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetInlineToast}>
            Reset / Spawn Inline Toast
          </Button>
        </div>

        <div className="relative min-h-[140px] rounded-xl border border-dashed border-border/70 bg-surface-subtle/50 flex flex-col items-center justify-center p-6 overflow-hidden">
          {inlineToastOpen ? (
            <div className="w-full flex justify-center">
              <SwipeToast
                key={inlineKey}
                inline
                open={inlineToastOpen}
                title="Workspace backup archived"
                description="Encrypted bundle synced to edge storage"
                type="success"
                actionLabel={showAction ? 'Undo' : undefined}
                onAction={() => {
                  addToast({
                    title: 'Action Triggered',
                    description: 'Reverted archive operation successfully.',
                    type: 'info',
                  });
                }}
                closeButton={closeButton}
                pauseOnHover={pauseOnHover}
                duration={toastDuration}
                fuse={fusePosition}
                settleBounce={settleBounce}
                swipeDistance={swipeDistance}
                width={toastWidth}
                radius={toastRadius}
                onClose={(reason) => {
                  setInlineToastOpen(false);
                  setLastDismissReason(reason);
                }}
              />
            </div>
          ) : (
            <div className="text-center py-6 space-y-2 animate-fade-in">
              <p className="text-xs text-muted-foreground">
                Inline toast dismissed via{' '}
                <span className="font-semibold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                  {lastDismissReason ?? 'action'}
                </span>
              </p>
              <Button variant="primary" size="sm" onClick={resetInlineToast}>
                Spawn New Inline Toast
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Floating Card Deck Stack (Sonner-style Stack Queue) */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                3D Kinetic Notification Deck Stack
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                <Layers className="size-3" />
                {toasts.length} active
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hover over notifications to expand the stack into a full list. Older cards tuck underneath with 3D depth.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-xs"
            >
              <ArrowUpDown className="size-3.5 mr-1" />
              {isExpanded ? 'Collapse Deck' : 'Expand Deck'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearToasts}
              className="text-muted-foreground hover:text-destructive text-xs"
            >
              <Trash2 className="size-3.5 mr-1" />
              Clear Queue
            </Button>
          </div>
        </div>

        {/* Quick Batch Trigger */}
        <div className="p-4 rounded-xl bg-surface-subtle/60 border border-border/60 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              One-Click Stack Demonstration
            </span>
            <p className="text-[11px] text-muted-foreground">
              Dispatches 3 queued notifications in sequence to demonstrate Sonner card-deck stacking & expand-on-hover.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={spawnBatchStack} className="shadow-sm">
            Spawn 3x Stacked Toasts
          </Button>
        </div>

        {/* Individual Types Dispatch */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
            onClick={() =>
              addToast({
                title: 'Changes Synchronized',
                description: 'Profile configurations pushed to edge cluster.',
                type: 'success',
                duration: toastDuration,
                fuse: fusePosition,
                actionLabel: showAction ? 'Details' : undefined,
              })
            }
          >
            + Success Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
            onClick={() =>
              addToast({
                title: 'Connection Dropped',
                description: 'Socket peer unreachable. Retrying handshake...',
                type: 'error',
                duration: toastDuration,
                fuse: fusePosition,
                actionLabel: showAction ? 'Retry Now' : undefined,
              })
            }
          >
            + Danger Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
            onClick={() =>
              addToast({
                title: 'Memory Warning',
                description: 'V8 heap allocation crossed 85% safety boundary.',
                type: 'warning',
                duration: toastDuration,
                fuse: fusePosition,
                actionLabel: showAction ? 'Inspect' : undefined,
              })
            }
          >
            + Warning Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/10"
            onClick={() =>
              addToast({
                title: 'Edge Cluster Advisory',
                description: 'Scheduled maintenance tonight at 02:00 UTC.',
                type: 'info',
                duration: toastDuration,
                fuse: fusePosition,
                actionLabel: showAction ? 'Learn More' : undefined,
              })
            }
          >
            + Info Toast
          </Button>
        </div>

        {/* Viewport Position Switcher */}
        <div className="pt-3 border-t border-border/50">
          <span className="text-xs font-medium text-muted-foreground block mb-2">
            Toast Stack Screen Position:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {positions.map((pos) => (
              <button
                key={pos.value}
                type="button"
                onClick={() => setPosition(pos.value)}
                className={`px-3 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                  position === pos.value
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-surface-subtle'
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Kinetic Toast Parameters
          </span>
          <span className="text-[11px] text-primary bg-primary/10 px-2.5 py-0.5 rounded-full font-mono">
            Physics: Card Deck Stack + Rubberband Swipe
          </span>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Fuse Duration"
            value={toastDuration}
            onChange={setToastDuration}
            min={1000}
            max={8000}
            step={500}
            unit="ms"
          />
          <ParameterSlider
            label="Settle Bounce"
            value={Math.round(settleBounce * 100)}
            onChange={(v) => setSettleBounce(v / 100)}
            min={0}
            max={60}
            step={5}
            unit="%"
          />
          <ParameterSlider
            label="Swipe Trigger Distance"
            value={swipeDistance}
            onChange={setSwipeDistance}
            min={20}
            max={80}
            step={5}
            unit="px"
          />
          <ParameterSlider
            label="Card Width"
            value={toastWidth}
            onChange={setToastWidth}
            min={280}
            max={440}
            step={10}
            unit="px"
          />
          <ParameterSlider
            label="Corner Radius"
            value={toastRadius}
            onChange={setToastRadius}
            min={6}
            max={24}
            step={2}
            unit="px"
          />
        </ParameterGrid>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border/50">
          <ParameterSwitch
            label="Pause on Hover"
            checked={pauseOnHover}
            onChange={setPauseOnHover}
          />
          <ParameterSwitch
            label="Close Button"
            checked={closeButton}
            onChange={setCloseButton}
          />
          <ParameterSwitch
            label="Action Button"
            checked={showAction}
            onChange={setShowAction}
          />
        </div>

        {/* Fuse Position Selector */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <span className="text-xs font-medium text-muted-foreground mr-2">Burning Fuse:</span>
          {(['bottom', 'top', 'none'] as const).map((fuse) => (
            <button
              key={fuse}
              type="button"
              onClick={() => {
                setFusePosition(fuse);
                resetInlineToast();
              }}
              className={`px-3 py-1 text-xs rounded-lg border capitalize transition-all cursor-pointer ${
                fusePosition === fuse
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {fuse}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
