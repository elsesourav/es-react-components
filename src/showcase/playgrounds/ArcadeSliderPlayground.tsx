import React, { useState } from 'react';
import {
  ArcadeSlider,
  ArcadeSliderVariant,
  ArcadeSliderSize,
  ParameterGrid,
  ParameterSlider,
  ParameterSwitch,
} from '@/components/ui';
import { Sliders, Sparkles, Gauge, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ArcadeSliderPlayground: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(82);
  const [variant, setVariant] = useState<ArcadeSliderVariant>('neon-green');
  const [size, setSize] = useState<ArcadeSliderSize>('md');
  const [showValue, setShowValue] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showShadow, setShowShadow] = useState(true);
  const [showGlow, setShowGlow] = useState(true);
  const [showBezel, setShowBezel] = useState(true);
  const [borderRadius, setBorderRadius] = useState<number>(21);
  const [borderPadding, setBorderPadding] = useState<number>(2.5);

  return (
    <div className="space-y-8">
      {/* 1. Live Interactive Preview Canvas */}
      <div className="p-8 sm:p-14 rounded-3xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center gap-8 shadow-sm">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            <span>Breakout Ball Wide Paddle Slider</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Tactile beveled rim, deep sunken track shadow, neon active level fill, and 3D sliding white paddle thumb knob.
          </p>
        </div>

        {/* Featured Slider Card (Matching User Image) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-border shadow-sm max-w-md w-full space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Gauge className="size-3.5 text-primary" />
              <span>Wide Paddle Slider Track (Image 2)</span>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums font-bold">
              {sliderVal > 0 ? `${sliderVal}% ENGAGED` : 'DISENGAGED'}
            </span>
          </div>

          <div className="w-full flex justify-center py-2">
            <ArcadeSlider
              id="main-paddle-slider"
              value={sliderVal}
              onChange={setSliderVal}
              variant={variant}
              size={size}
              borderRadius={borderRadius}
              borderPadding={borderPadding}
              showShadow={showShadow}
              showGlow={showGlow}
              showBezel={showBezel}
              showValue={showValue}
              disabled={disabled}
              className="w-full max-w-sm"
            />
          </div>
        </div>

        {/* Concentric Geometry Callout */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          <span>100% Concentric Radii: R_track = R_outer - Border, R_thumb = R_track - Padding</span>
        </div>
      </div>

      {/* 2. Interactive Parameter Controls */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Paddle Slider Configuration
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground mr-1">Scale Preset:</span>
            {(['sm', 'md', 'lg'] as ArcadeSliderSize[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  if (borderRadius >= 16) {
                    setBorderRadius(s === 'sm' ? 16 : s === 'md' ? 21 : 26);
                  }
                }}
                className={cn(
                  'px-3 py-1 text-xs rounded-lg border uppercase transition-all cursor-pointer font-medium',
                  size === s
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border text-muted-foreground hover:text-foreground'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Parameter Sliders to Adjust Options */}
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Paddle Slider Value"
            value={sliderVal}
            min={0}
            max={100}
            step={1}
            unit="%"
            onChange={setSliderVal}
          />

          <ParameterSlider
            label="Concentric Border Radius"
            value={borderRadius}
            min={4}
            max={size === 'sm' ? 16 : size === 'md' ? 21 : 26}
            step={1}
            unit="px"
            format={(val) => {
              const maxR = size === 'sm' ? 16 : size === 'md' ? 21 : 26;
              return val >= maxR ? `Pill (${val}px)` : `${val}px`;
            }}
            onChange={setBorderRadius}
          />

          <ParameterSlider
            label="Border Inset Padding"
            value={borderPadding}
            min={1}
            max={5}
            step={0.5}
            unit="px"
            onChange={setBorderPadding}
          />

          <div className="flex items-center gap-2 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={() => setBorderRadius(size === 'sm' ? 16 : size === 'md' ? 21 : 26)}
              className="text-xs text-primary hover:underline font-medium cursor-pointer"
            >
              Reset to Full Pill
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              type="button"
              onClick={() => setBorderRadius(10)}
              className="text-xs text-muted-foreground hover:text-foreground font-medium cursor-pointer"
            >
              Squircle (10px)
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              type="button"
              onClick={() => setBorderRadius(5)}
              className="text-xs text-muted-foreground hover:text-foreground font-medium cursor-pointer"
            >
              Rounded (5px)
            </button>
          </div>
        </ParameterGrid>

        {/* Parameter Switches */}
        <ParameterGrid columns={2}>
          <ParameterSwitch
            label="3D Box Shadow & Inset"
            checked={showShadow}
            onChange={setShowShadow}
          />
          <ParameterSwitch
            label="Neon Ambient Glow"
            checked={showGlow}
            onChange={setShowGlow}
          />
          <ParameterSwitch
            label="Specular Metallic Bezel"
            checked={showBezel}
            onChange={setShowBezel}
          />
          <ParameterSwitch
            label="Show Numeric Thumb Value"
            checked={showValue}
            onChange={setShowValue}
          />
          <ParameterSwitch
            label="Disable Interactions"
            checked={disabled}
            onChange={setDisabled}
          />
        </ParameterGrid>

        {/* Color Palette */}
        <div className="space-y-2 pt-3 border-t border-border/40">
          <span className="text-xs font-medium text-muted-foreground block">
            Color Accent Variant:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'neon-green', label: 'Neon Green' },
              { id: 'candy-pink', label: 'Candy Pink' },
              { id: 'neon-cyan', label: 'Neon Cyan' },
              { id: 'amber-gold', label: 'Amber Gold' },
              { id: 'cyber-purple', label: 'Cyber Purple' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id as ArcadeSliderVariant)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded-lg border font-medium transition-all cursor-pointer capitalize',
                  variant === v.id
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border text-muted-foreground hover:text-foreground'
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeSliderPlayground;
