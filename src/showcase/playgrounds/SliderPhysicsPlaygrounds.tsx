import React, { useState } from 'react';
import {
  Button,
  ElasticSlider,
  WakeSlider,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export const ElasticSliderPlayground: React.FC = () => {
  const [elasticVal, setElasticVal] = useState(65);
  const [elasticThumb, setElasticThumb] = useState(true);
  const [elasticTicks, setElasticTicks] = useState(true);
  const [elasticPlacement, setElasticPlacement] = useState<'outside' | 'inside'>('outside');
  const [elasticPosition, setElasticPosition] = useState<'top' | 'bubble' | 'inside' | 'none'>('bubble');
  const [elasticBounce, setElasticBounce] = useState(0.5);
  const [elasticMaxStretch, setElasticMaxStretch] = useState(50);
  const [elasticOrientation, setElasticOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Elastic Rubber-Band Slider
          </div>
          <p className="text-xs text-muted-foreground">
            Spring-physics slider with overstretch edge resistance, auto-contrasting text, inside/outside icon slots, and multi-orientation support.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="xs"
            variant={elasticVal === 0 ? 'primary' : 'outline'}
            onClick={() => setElasticVal(0)}
          >
            Mute 0%
          </Button>
          <Button
            size="xs"
            variant={elasticVal === 30 ? 'primary' : 'outline'}
            onClick={() => setElasticVal(30)}
          >
            30%
          </Button>
          <Button
            size="xs"
            variant={elasticVal === 65 ? 'primary' : 'outline'}
            onClick={() => setElasticVal(65)}
          >
            65%
          </Button>
          <Button
            size="xs"
            variant={elasticVal === 100 ? 'primary' : 'outline'}
            onClick={() => setElasticVal(100)}
          >
            100% Max
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Spring Dynamics & Stretch Parameters
        </span>
        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Bounce Coefficient"
            value={elasticBounce}
            onChange={setElasticBounce}
            min={0.1}
            max={0.9}
            step={0.05}
          />
          <ParameterSlider
            label="Max Edge Stretch"
            value={elasticMaxStretch}
            onChange={setElasticMaxStretch}
            min={10}
            max={100}
            step={5}
            unit="px"
          />
          <ParameterSwitch
            label="Show Drag Thumb"
            checked={elasticThumb}
            onChange={setElasticThumb}
          />
        </ParameterGrid>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[320px] gap-8">
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          <ElasticSlider
            value={elasticVal}
            onChange={setElasticVal}
            orientation={elasticOrientation}
            valuePosition={elasticPosition}
            iconPlacement={elasticPlacement}
            thumb={elasticThumb}
            ticks={elasticTicks}
            bounce={elasticBounce}
            maxStretch={elasticMaxStretch}
            thickness={6}
            activeThickness={14}
            wheel
            className="text-primary"
          />
        </div>

        <div className="text-xs font-mono text-muted-foreground bg-surface-subtle px-3 py-1.5 rounded-lg border border-border/80">
          Current Position: <span className="text-foreground font-semibold">{Math.round(elasticVal)}%</span>
          {elasticVal === 0 ? ' (Muted)' : elasticVal > 80 ? ' (High Output)' : ''}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Configuration & Physics Tuning
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-muted-foreground font-medium">Orientation</label>
            <div className="flex gap-1.5">
              {(['horizontal', 'vertical'] as const).map((o) => (
                <Button
                  key={o}
                  size="xs"
                  variant={elasticOrientation === o ? 'primary' : 'outline'}
                  className="flex-1 capitalize"
                  onClick={() => setElasticOrientation(o)}
                >
                  {o}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground font-medium">Label Position</label>
            <div className="flex gap-1">
              {(['bubble', 'top', 'inside', 'none'] as const).map((pos) => (
                <Button
                  key={pos}
                  size="xs"
                  variant={elasticPosition === pos ? 'primary' : 'outline'}
                  className="flex-1 capitalize px-1.5"
                  onClick={() => setElasticPosition(pos)}
                >
                  {pos}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground font-medium">Icon Placement</label>
            <div className="flex gap-1.5">
              {(['outside', 'inside'] as const).map((plc) => (
                <Button
                  key={plc}
                  size="xs"
                  variant={elasticPlacement === plc ? 'primary' : 'outline'}
                  className="flex-1 capitalize"
                  onClick={() => setElasticPlacement(plc)}
                >
                  {plc}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground font-medium">Handle & Marks</label>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant={elasticThumb ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setElasticThumb(!elasticThumb)}
              >
                Thumb {elasticThumb ? 'On' : 'Off'}
              </Button>
              <Button
                size="xs"
                variant={elasticTicks ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setElasticTicks(!elasticTicks)}
              >
                Ticks {elasticTicks ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WakeSliderPlayground: React.FC = () => {
  const [wakeVal, setWakeVal] = useState(48);
  const [wakeBars, setWakeBars] = useState(32);
  const [wakeHeight, setWakeHeight] = useState(56);
  const [wakeReach, setWakeReach] = useState(6);
  const [wakeSkew, setWakeSkew] = useState(0.6);
  const [wakeGlide, setWakeGlide] = useState(0.3);
  const [wakeShowValue, setWakeShowValue] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            Wake Acoustic Fluid Slider
          </div>
          <p className="text-xs text-muted-foreground">
            Drag or scrub across the bar array to observe velocity-induced hydrodynamic wake waves with directional asymmetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[20, 48, 72, 95].map((lvl) => (
            <Button
              key={lvl}
              size="xs"
              variant={wakeVal === lvl ? 'primary' : 'outline'}
              onClick={() => setWakeVal(lvl)}
            >
              {lvl}%
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Acoustic Wake Dynamics
        </span>
        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Bar Count"
            value={wakeBars}
            onChange={setWakeBars}
            min={16}
            max={64}
            step={4}
          />
          <ParameterSlider
            label="Wave Reach"
            value={wakeReach}
            onChange={setWakeReach}
            min={2}
            max={12}
            step={1}
          />
          <ParameterSlider
            label="Glide Duration"
            value={wakeGlide}
            onChange={setWakeGlide}
            min={0.1}
            max={1.0}
            step={0.05}
            unit="s"
          />
        </ParameterGrid>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[280px] gap-6">
        <div className="w-full max-w-lg">
          <WakeSlider
            value={wakeVal}
            onChange={setWakeVal}
            bars={wakeBars}
            height={wakeHeight}
            reach={wakeReach}
            skew={wakeSkew}
            glide={wakeGlide}
            showValue={wakeShowValue}
            fillColor="hsl(var(--primary))"
            trackColor="hsl(var(--muted) / 0.35)"
            crestColor="hsl(var(--primary))"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground bg-surface-subtle px-4 py-2 rounded-xl border border-border/80">
          <span>Level: <span className="text-foreground font-semibold">{wakeVal}%</span></span>
          <span>•</span>
          <span>Bars: <span className="text-foreground font-semibold">{wakeBars}</span></span>
          <span>•</span>
          <span>Glide: <span className="text-foreground font-semibold">{wakeGlide}s</span></span>
          <span>•</span>
          <span>Reach: <span className="text-foreground font-semibold">{wakeReach}</span></span>
        </div>
      </div>
    </div>
  );
};
