import React, { useState } from 'react';
import {
  SquishSwitch,
  SquishSwitchSize,
  SquishSwitchVariant,
  Button,
  Badge,
  useToast,
  ParameterGrid,
  ParameterSlider,
  ParameterSwitch,
} from '@/components/ui';
import { Sparkles, Sliders, Zap, CheckCircle2 } from 'lucide-react';

export const SquishSwitchPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [active, setActive] = useState(true);
  const [debugActive, setDebugActive] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [size, setSize] = useState<SquishSwitchSize>('md');
  const [variant, setVariant] = useState<SquishSwitchVariant>('primary');
  const [showOnOffText, setShowOnOffText] = useState(true);
  const [stretch, setStretch] = useState(36);
  const [speed, setSpeed] = useState(50);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Configuration & Controls */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Physics & Style Parameters
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant={size === 'sm' ? 'primary' : 'outline'}
              onClick={() => setSize('sm')}
            >
              Small
            </Button>
            <Button
              size="xs"
              variant={size === 'md' ? 'primary' : 'outline'}
              onClick={() => setSize('md')}
            >
              Medium
            </Button>
            <Button
              size="xs"
              variant={size === 'lg' ? 'primary' : 'outline'}
              onClick={() => setSize('lg')}
            >
              Large
            </Button>
          </div>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Elastic Squish"
            value={stretch}
            min={0}
            max={80}
            step={2}
            unit="%"
            onChange={setStretch}
          />
          <ParameterSlider
            label="Spring Speed"
            value={speed}
            min={10}
            max={100}
            step={5}
            unit="vel"
            onChange={setSpeed}
          />
          <ParameterSwitch
            label="Embedded ON / OFF Badges"
            checked={showOnOffText}
            onChange={setShowOnOffText}
          />
          <ParameterSwitch
            label="Disable Interactions"
            checked={disabled}
            onChange={setDisabled}
          />
        </ParameterGrid>

        {/* Color Variants */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
          <span className="text-xs font-medium text-muted-foreground mr-2">Color Variant:</span>
          {(['primary', 'success', 'warning', 'danger', 'neutral'] as SquishSwitchVariant[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition-all cursor-pointer capitalize ${
                variant === v
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs'
                  : 'border-border/80 bg-surface-elevated text-muted-foreground hover:text-foreground'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Showcase */}
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Zap className="size-3" />
            <span>Interactive Drag & Squish Physics</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Drag the thumb horizontally with mouse or finger to feel kinetic velocity stretching, or click to snap.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-border shadow-sm max-w-lg w-full space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">
                Main Kinetic Switch
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Current state: <strong className={active ? 'text-primary' : 'text-muted-foreground'}>{active ? 'Active (ON)' : 'Inactive (OFF)'}</strong>
              </div>
            </div>

            <SquishSwitch
              checked={active}
              onChange={(next) => {
                setActive(next);
                addToast({
                  title: next ? 'Switch Activated' : 'Switch Deactivated',
                  description: `Status changed to ${next ? 'ON' : 'OFF'}`,
                  type: next ? 'success' : 'info',
                });
              }}
              size={size}
              variant={variant}
              showOnOffText={showOnOffText}
              stretch={stretch}
              speed={speed}
              disabled={disabled}
            />
          </div>

          <div className="border-t border-border/50" />

          {/* Practical Application Demos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-foreground">Global Debug Logging</div>
                <div className="text-[11px] text-muted-foreground">Verbose browser inspection stream</div>
              </div>
              <SquishSwitch
                checked={debugActive}
                onChange={setDebugActive}
                size="sm"
                variant="warning"
                showOnOffText
                onLabel="ON"
                offLabel="OFF"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-foreground">Cloud Catalog Auto-Sync</div>
                <div className="text-[11px] text-muted-foreground">Reconcile product inventory every 5m</div>
              </div>
              <SquishSwitch
                checked={autoSync}
                onChange={setAutoSync}
                size="sm"
                variant="success"
                showOnOffText
                onLabel="ON"
                offLabel="OFF"
              />
            </div>
          </div>
        </div>

        {/* Status Callout */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <CheckCircle2 className="size-3.5 text-primary" />
          <span>WAI-ARIA role=&quot;switch&quot; with pointer capture & fluid velocity springs</span>
        </div>
      </div>
    </div>
  );
};

export default SquishSwitchPlayground;
