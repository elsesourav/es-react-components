import React, { useState } from 'react';
import {
  Button,
  Slider,
  SliderDetents,
} from '@/components/ui';
import { SlidersHorizontal } from 'lucide-react';

export const SliderPlayground: React.FC = () => {
  const [singleSliderVal, setSingleSliderVal] = useState(45);
  const [rangeSliderVal, setRangeSliderVal] = useState<number[]>([25, 75]);
  const [sliderLabelPos, setSliderLabelPos] = useState<'default' | 'bottom' | 'top-floating'>('top-floating');

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            Accessible Slider & Multi-Thumb Range
          </div>
          <p className="text-xs text-muted-foreground">
            Accessible React Aria slider supporting single and dual thumbs, tooltip value bubbles, bottom readouts, and keyboard controls.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground mr-1">Tooltip:</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="border-b border-border/50 pb-3 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Single Thumb • CPU Utilization
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">Continuous percentage scrubbing</p>
            </div>
            <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-surface-subtle border border-border">
              {singleSliderVal}%
            </span>
          </div>

          <div className="py-6 px-2">
            <Slider
              label="Maximum Compute Threshold"
              value={singleSliderVal}
              onChange={(val) => setSingleSliderVal(val as number)}
              labelPosition={sliderLabelPos}
              labelFormatter={(v) => `${v}%`}
            />
          </div>

          <div className="flex gap-2">
            {[10, 25, 50, 75, 90].map((preset) => (
              <Button
                key={preset}
                size="xs"
                variant={singleSliderVal === preset ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setSingleSliderVal(preset)}
              >
                {preset}%
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="border-b border-border/50 pb-3 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Dual Thumb • Price Filter Range
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">Two-handle bounded selection</p>
            </div>
            <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-surface-subtle border border-border">
              ${rangeSliderVal[0]} — ${rangeSliderVal[1]}
            </span>
          </div>

          <div className="py-6 px-2">
            <Slider
              label="Budget Window ($USD)"
              value={rangeSliderVal}
              onChange={(val) => setRangeSliderVal(val as number[])}
              minValue={0}
              maxValue={100}
              labelPosition={sliderLabelPos}
              labelFormatter={(v) => `$${v}`}
            />
          </div>

          <div className="flex gap-2">
            <Button
              size="xs"
              variant="outline"
              className="flex-1"
              onClick={() => setRangeSliderVal([10, 40])}
            >
              Economy ($10-$40)
            </Button>
            <Button
              size="xs"
              variant="outline"
              className="flex-1"
              onClick={() => setRangeSliderVal([25, 75])}
            >
              Standard ($25-$75)
            </Button>
            <Button
              size="xs"
              variant="outline"
              className="flex-1"
              onClick={() => setRangeSliderVal([50, 100])}
            >
              Premium ($50-$100)
            </Button>
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
    </div>
  );
};
