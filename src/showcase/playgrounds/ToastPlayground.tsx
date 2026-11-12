import React, { useState } from 'react';
import {
  Button,
  SwipeToast,
  type SwipeToastFuse,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';

export const ToastPlayground: React.FC = () => {
  const { addToast, clearToasts } = useToast();
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

      {/* 2. Imperative Floating Toasts (useToast Hook) */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Floating Notifications Queue (useToast)</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click to dispatch real-time kinetic toasts to the viewport bottom-right corner.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearToasts} className="text-muted-foreground hover:text-foreground">
            Clear Queue
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            onClick={() =>
              addToast({
                title: 'Changes Synchronized',
                description: 'Profile configurations pushed to distributed cluster.',
                type: 'success',
                duration: toastDuration,
                fuse: fusePosition,
                actionLabel: 'Details',
                onAction: () => console.log('Details clicked'),
              })
            }
          >
            Success Toast
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              addToast({
                title: 'Connection Dropped',
                description: 'Socket peer unreachable. Retrying handshake...',
                type: 'error',
                duration: toastDuration,
                fuse: fusePosition,
                actionLabel: 'Retry Now',
                onAction: () => console.log('Retry clicked'),
              })
            }
          >
            Danger Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              addToast({
                title: 'Memory Threshold Warning',
                description: 'V8 heap allocation crossed 85% safety boundary.',
                type: 'warning',
                duration: toastDuration,
                fuse: fusePosition,
              })
            }
          >
            Warning Toast
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              addToast({
                title: 'Edge Cluster Advisory',
                description: 'Scheduled maintenance tonight at 02:00 UTC.',
                type: 'info',
                duration: toastDuration,
                fuse: fusePosition,
              })
            }
          >
            Info Toast
          </Button>
        </div>
      </div>
      {/* 3. Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Kinetic SwipeToast Parameters
          </span>
          <span className="text-[11px] text-primary bg-primary/10 px-2.5 py-0.5 rounded-full font-mono">
            Physics: Inertia + Velocity Rubberband
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
