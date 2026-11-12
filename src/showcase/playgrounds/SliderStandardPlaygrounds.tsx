import React, { useState } from 'react';
import {
  Button,
  Slider,
  SliderDetents,
} from '@/components/ui';
import { SlidersHorizontal } from 'lucide-react';

export const SliderPlayground: React.FC = () => {
  const [thumbsCount, setThumbsCount] = useState<1 | 2>(1);
  const [singleSliderVal, setSingleSliderVal] = useState(45);
  const [rangeSliderVal, setRangeSliderVal] = useState<number[]>([25, 75]);
  const [sliderLabelPos, setSliderLabelPos] = useState<'default' | 'bottom' | 'top-floating'>('top-floating');
  const [stepSize, setStepSize] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* 1. Main Unified Component Card (Preview First) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-6 shadow-sm">
        {/* Header with active mode indicator and live value badge */}
        <div className="border-b border-border/50 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {thumbsCount === 1
                  ? 'Single Thumb Mode • Compute Capacity Threshold'
                  : 'Double Thumb Mode • Budget Filter Range'}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {thumbsCount === 1
                ? 'Continuous percentage scrubbing with high-precision drag and keyboard controls'
                : 'Two-handle bounded range selection for dual-ended numeric windowing'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-primary px-3 py-1 rounded-lg bg-surface-subtle border border-border">
              {thumbsCount === 1
                ? `${singleSliderVal}%`
                : `$${rangeSliderVal[0]} — $${rangeSliderVal[1]}`}
            </span>
          </div>
        </div>

        {/* Central Slider Display */}
        <div className="py-8 px-4 sm:px-6 bg-surface-subtle/30 rounded-xl border border-border/30">
          <Slider
            label={thumbsCount === 1 ? 'Maximum Compute Threshold' : 'Budget Window ($USD)'}
            thumbs={thumbsCount}
            value={thumbsCount === 1 ? singleSliderVal : rangeSliderVal}
            onChange={(val) => {
              if (thumbsCount === 1) {
                setSingleSliderVal(val as number);
              } else {
                setRangeSliderVal(val as number[]);
              }
            }}
            minValue={0}
            maxValue={100}
            step={stepSize}
            disabled={isDisabled}
            labelPosition={sliderLabelPos}
            labelFormatter={(v) => (thumbsCount === 1 ? `${v}%` : `$${v}`)}
          />
        </div>

        {/* Dynamic Presets Bar */}
        <div className="space-y-2">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Quick Presets
          </div>
          {thumbsCount === 1 ? (
            <div className="flex flex-wrap gap-2">
              {[10, 25, 50, 75, 90].map((preset) => (
                <Button
                  key={preset}
                  size="xs"
                  variant={singleSliderVal === preset ? 'primary' : 'outline'}
                  className="flex-1 min-w-[60px]"
                  onClick={() => setSingleSliderVal(preset)}
                >
                  {preset}%
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Economy ($10-$40)', val: [10, 40] },
                { label: 'Standard ($25-$75)', val: [25, 75] },
                { label: 'Premium ($50-$90)', val: [50, 90] },
                { label: 'Full Spectrum ($0-$100)', val: [0, 100] },
              ].map((preset) => {
                const isActive =
                  rangeSliderVal[0] === preset.val[0] &&
                  rangeSliderVal[1] === preset.val[1];
                return (
                  <Button
                    key={preset.label}
                    size="xs"
                    variant={isActive ? 'primary' : 'outline'}
                    className="flex-1 min-w-[130px]"
                    onClick={() => setRangeSliderVal(preset.val)}
                  >
                    {preset.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Controls Toolbar */}
        <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Granularity Step:</span>
            {[1, 5, 10].map((s) => (
              <Button
                key={s}
                size="xs"
                variant={stepSize === s ? 'secondary' : 'outline'}
                onClick={() => setStepSize(s)}
              >
                {s}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant={isDisabled ? 'danger' : 'outline'}
              onClick={() => setIsDisabled(!isDisabled)}
            >
              {isDisabled ? 'Disabled' : 'Interactive'}
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setSingleSliderVal(45);
                setRangeSliderVal([25, 75]);
                setStepSize(1);
                setIsDisabled(false);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      {/* 2. Interactive Controls Toolbar (Controls Second) */}
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            Accessible Slider & Range System
          </div>
          <p className="text-xs text-muted-foreground">
            Unified React Aria slider supporting single and double thumbs, tooltip value bubbles, bottom readouts, and keyboard controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Thumb Mode Option: 1 or 2 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground mr-1">Thumbs:</span>
            <Button
              size="xs"
              variant={thumbsCount === 1 ? 'primary' : 'outline'}
              onClick={() => setThumbsCount(1)}
              className="font-medium"
            >
              1 (Single)
            </Button>
            <Button
              size="xs"
              variant={thumbsCount === 2 ? 'primary' : 'outline'}
              onClick={() => setThumbsCount(2)}
              className="font-medium"
            >
              2 (Double)
            </Button>
          </div>

          <div className="h-4 w-px bg-border/60 hidden sm:block" />

          {/* Tooltip Position Option */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground mr-1">Tooltip:</span>
            {(['top-floating', 'bottom', 'default'] as const).map((pos) => (
              <Button
                key={pos}
                size="xs"
                variant={sliderLabelPos === pos ? 'primary' : 'outline'}
                className="capitalize"
                onClick={() => setSliderLabelPos(pos)}
              >
                {pos === 'default' ? 'Hidden' : pos === 'top-floating' ? 'Tooltip' : 'Bottom'}
              </Button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export const SliderDetentsPlayground: React.FC = () => {
  const [sliderDetentsVal, setSliderDetentsVal] = useState(4);

  const vcpuDetents = [
    { value: 1, label: '1 Core (Dev)' },
    { value: 2, label: '2 Cores (Small)' },
    { value: 4, label: '4 Cores (Medium)' },
    { value: 8, label: '8 Cores (Large)' },
    { value: 16, label: '16 Cores (Cluster)' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
        <div className="w-full max-w-lg p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Compute Instance Sizing</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag the thumb or use Left/Right arrows. Shift+Arrow jumps directly to detents with magnetic haptic snap.
            </p>
          </div>

          <SliderDetents
            label="Compute vCPU Sizing"
            value={sliderDetentsVal}
            onValueChange={setSliderDetentsVal}
            min={1}
            max={16}
            step={1}
            detents={vcpuDetents}
            pull={18}
            format={(v) => `${v} vCPU`}
          />

          <div className="p-3.5 rounded-xl bg-surface-subtle border border-border/80 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Estimated Monthly Tier:</span>
            <span className="font-mono font-semibold text-foreground">
              ${sliderDetentsVal * 18}.00 / month
            </span>
          </div>
        </div>
      </div>
<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <span className="text-xs font-medium text-foreground">
            Allocated vCPU: <span className="font-mono font-bold text-primary">{sliderDetentsVal} Cores</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {[1, 2, 4, 8, 16].map((v) => (
            <Button
              key={v}
              size="xs"
              variant={sliderDetentsVal === v ? 'primary' : 'outline'}
              onClick={() => setSliderDetentsVal(v)}
            >
              {v}x
            </Button>
          ))}
        </div>
      </div>

          </div>
  );
};
