import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  SegmentedABTabs,
  Badge,
  useToast,
} from '@/components/ui';
import { Sliders, Sparkles, Layers } from 'lucide-react';

export const SegmentedABTabsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [tabAB, setTabAB] = useState('A');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [envMode, setEnvMode] = useState('Staging');
  const [viewFormat, setViewFormat] = useState('Preview');
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. Featured Showcase Card (Preview First) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center gap-5 text-center relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            15. Segmented A/B Tabs
          </span>
        </div>

        <div className="py-4">
          <SegmentedABTabs
            options={['A', 'B']}
            value={tabAB}
            size={selectedSize}
            disabled={isDisabled}
            onChange={(selected) => {
              setTabAB(selected);
              addToast({
                title: `Selected Tab: ${selected}`,
                description: `Switched active segment to ${selected}.`,
                type: 'info',
              });
            }}
          />
        </div>

        <p className="text-xs text-muted-foreground max-w-sm">
          Pill slider with spring layout physics, prominent contrast ring outline, tactile click response, and full keyboard navigation (arrow keys & Enter).
        </p>
      </div>

      {/* 2. Configuration Toolbar (Controls Second) */}
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Segmented A/B Tabs Controls</span>
          <Badge size="sm" variant="outline" className="font-mono text-[10px]">
            Active: {tabAB}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Size:</span>
            <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-all cursor-pointer",
                    selectedSize === s
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDisabled((prev) => !prev)}
            className={cn(
              "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer",
              isDisabled
                ? "bg-destructive/15 border-destructive text-destructive font-semibold"
                : "border-border text-muted-foreground hover:text-foreground bg-surface-subtle/40"
            )}
          >
            {isDisabled ? "Disabled: ON" : "Disabled: OFF"}
          </button>
        </div>
      </div>

      {/* 3. Practical Production Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Variant 1: Billing Frequency */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-between gap-4 min-h-[180px]">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Billing Frequency
            </span>
            <p className="text-[11px] text-muted-foreground">Monthly vs Annual discount</p>
          </div>

          <SegmentedABTabs
            options={['Monthly', 'Annual (-20%)']}
            value={billingCycle}
            size={selectedSize}
            disabled={isDisabled}
            onChange={(val) => setBillingCycle(val)}
          />

          <span className="font-mono text-xs text-foreground font-semibold">
            Plan: {billingCycle}
          </span>
        </div>

        {/* Variant 2: Environment Selector */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-between gap-4 min-h-[180px]">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Deployment Target
            </span>
            <p className="text-[11px] text-muted-foreground">Instant environment routing</p>
          </div>

          <SegmentedABTabs
            options={['Staging', 'Production']}
            value={envMode}
            size={selectedSize}
            disabled={isDisabled}
            onChange={(val) => setEnvMode(val)}
          />

          <span className="font-mono text-xs text-foreground font-semibold">
            Target: {envMode}
          </span>
        </div>

        {/* Variant 3: Workspace View Mode */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-between gap-4 min-h-[180px]">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Canvas Mode
            </span>
            <p className="text-[11px] text-muted-foreground">Code and live preview</p>
          </div>

          <SegmentedABTabs
            options={['Preview', 'Code']}
            value={viewFormat}
            size={selectedSize}
            disabled={isDisabled}
            onChange={(val) => setViewFormat(val)}
          />

          <span className="font-mono text-xs text-foreground font-semibold">
            Mode: {viewFormat}
          </span>
        </div>
      </div>
    </div>
  );
};
