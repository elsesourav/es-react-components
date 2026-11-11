import React, { useState } from 'react';
import {
  Button,
  Badge,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';
import { Sparkles, ArrowRight, Sliders } from 'lucide-react';

export const ButtonPlayground: React.FC = () => {
  const { addToast } = useToast();

  const [btnVariant, setBtnVariant] = useState<any>('primary');
  const [btnSize, setBtnSize] = useState<any>('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnRadius, setBtnRadius] = useState(10);
  const [btnScale, setBtnScale] = useState(100);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border/80 flex flex-col items-center justify-center min-h-[180px] gap-4 shadow-2xs">
        <div style={{ transform: `scale(${btnScale / 100})`, transition: 'transform 0.15s ease' }}>
          <Button
            variant={btnVariant}
            size={btnSize}
            isLoading={btnLoading}
            disabled={btnDisabled}
            style={{ borderRadius: `${btnRadius}px` }}
            leftIcon={btnSize !== 'icon' ? <Sparkles className="h-4 w-4" /> : undefined}
            rightIcon={btnSize !== 'icon' ? <ArrowRight className="h-4 w-4" /> : undefined}
            onClick={() =>
              addToast({
                title: 'Button Clicked!',
                description: `Triggered variant="${btnVariant}" size="${btnSize}" radius="${btnRadius}px"`,
                type: 'info',
              })
            }
          >
            {btnSize === 'icon' ? <Sparkles className="h-4 w-4" /> : 'Button Action'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-md">
          Interactive button with spring hover feedback, loader spinner state, icon support, and radius customization.
        </p>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Interactive Parameter Controls
          </span>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Corner Radius"
            value={btnRadius}
            onChange={setBtnRadius}
            min={0}
            max={28}
            step={2}
            unit="px"
          />
          <ParameterSlider
            label="Scale / Zoom"
            value={btnScale}
            onChange={setBtnScale}
            min={80}
            max={130}
            step={5}
            unit="%"
          />
          <ParameterSwitch
            label="Loading State"
            checked={btnLoading}
            onChange={setBtnLoading}
          />
          <ParameterSwitch
            label="Disabled"
            checked={btnDisabled}
            onChange={setBtnDisabled}
          />
        </ParameterGrid>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Variant
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'primary',
                'secondary',
                'outline',
                'ghost',
                'danger',
                'success',
                'subtle',
              ].map((v) => (
                <button
                  key={v}
                  onClick={() => setBtnVariant(v)}
                  className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                    btnVariant === v
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['xs', 'sm', 'md', 'lg', 'icon'].map((s) => (
                <button
                  key={s}
                  onClick={() => setBtnSize(s)}
                  className={`px-3 py-1 text-xs rounded-lg border uppercase transition-colors cursor-pointer ${
                    btnSize === s
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          All Variant Types
        </h4>
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap gap-3 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
    </div>
  );
};

export const BadgePlayground: React.FC = () => {
  const [badgeVariant, setBadgeVariant] = useState<any>('primary');
  const [badgeDot, setBadgeDot] = useState(true);
  const [badgeScale, setBadgeScale] = useState(100);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-10 sm:p-14 rounded-2xl bg-surface-subtle/50 border border-border/70 flex flex-col items-center justify-center min-h-[160px] gap-3 shadow-2xs">
        <div style={{ transform: `scale(${badgeScale / 100})`, transition: 'transform 0.15s ease' }}>
          <Badge variant={badgeVariant} dot={badgeDot} size="md">
            {badgeVariant} status
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Real-time badge preview with dynamic variant themes, optional status indicator dot, and zoom scaling.
        </p>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Interactive Parameter Controls
          </span>
        </div>

        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Scale / Zoom"
            value={badgeScale}
            onChange={setBadgeScale}
            min={80}
            max={140}
            step={5}
            unit="%"
          />
          <ParameterSwitch
            label="Status Indicator Dot"
            checked={badgeDot}
            onChange={setBadgeDot}
          />
        </ParameterGrid>

        <div className="border-t border-border/40 pt-4">
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Variant
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              'default',
              'primary',
              'secondary',
              'outline',
              'success',
              'warning',
              'danger',
              'info',
            ].map((v) => (
              <button
                key={v}
                onClick={() => setBadgeVariant(v)}
                className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                  badgeVariant === v
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
