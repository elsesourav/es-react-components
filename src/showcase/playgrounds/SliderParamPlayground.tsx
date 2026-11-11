import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  ParameterSlider,
  ParameterSwitch,
  ParameterColor,
  ParameterGrid,
  Badge,
  useToast,
} from '@/components/ui';
import { SlidersHorizontal, Sparkles, Palette, ToggleLeft, Activity } from 'lucide-react';
import { useTheme } from '@/theme/ThemeContext';

export const ParameterSliderPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { colors, isDark, preset } = useTheme();

  // Primary inspector parameters
  const [paramFill, setParamFill] = useState(isDark ? '#f5f5f5' : '#4f46e5');
  const [paramTrack, setParamTrack] = useState(isDark ? '#27272a' : '#f4f4f5');
  const [paramValue, setParamValue] = useState(50);
  const [paramStep, setParamStep] = useState(1);
  const [paramShowValue, setParamShowValue] = useState(true);
  const [paramBars, setParamBars] = useState(32);
  const [paramHeight, setParamHeight] = useState(56);
  const [paramRestHeight, setParamRestHeight] = useState(18);
  const [paramGap, setParamGap] = useState(4);
  const [paramSensitivity, setParamSensitivity] = useState(1);
  const [paramReach, setParamReach] = useState(6);
  const [paramSkew, setParamSkew] = useState(0.6);
  const [paramGlide, setParamGlide] = useState(0.3);
  const [paramSmoothing, setParamSmoothing] = useState(100);
  const [paramDisabled, setParamDisabled] = useState(false);

  // Standalone variant states for dedicated showcase cards
  const [variantSliderVal, setVariantSliderVal] = useState(56);
  const [variantGlideVal, setVariantGlideVal] = useState(0.3);
  const [variantColorHex, setVariantColorHex] = useState('#F5F5F5');
  const [variantSwitchState, setVariantSwitchState] = useState(false);

  // Synchronize parameter colors with active theme preset
  useEffect(() => {
    if (isDark) {
      setParamFill('#f5f5f5');
      setParamTrack('#27272a');
      setVariantColorHex('#F5F5F5');
    } else {
      setParamFill(colors.primary || '#4f46e5');
      setParamTrack('#f4f4f5');
      setVariantColorHex(colors.primary || '#4f46e5');
    }
  }, [isDark, preset, colors.primary]);

  const handleReset = () => {
    const defaultFill = isDark ? '#f5f5f5' : (colors.primary || '#4f46e5');
    const defaultTrack = isDark ? '#27272a' : '#f4f4f5';
    setParamFill(defaultFill);
    setParamTrack(defaultTrack);
    setParamValue(50);
    setParamStep(1);
    setParamShowValue(true);
    setParamBars(32);
    setParamHeight(56);
    setParamRestHeight(18);
    setParamGap(4);
    setParamSensitivity(1);
    setParamReach(6);
    setParamSkew(0.6);
    setParamGlide(0.3);
    setParamSmoothing(100);
    setParamDisabled(false);
    setVariantSliderVal(56);
    setVariantGlideVal(0.3);
    setVariantColorHex(defaultFill);
    setVariantSwitchState(false);
    addToast({
      title: 'Theme & Defaults Restored',
      description: `Reset all parameters to match active ${preset} theme.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            Parameter Slider & Micro-Inspector System
          </span>
          <Badge size="sm" variant="outline" className="font-mono text-[10px]">
            Multiple Variants
          </Badge>
        </div>

        <Button
          size="xs"
          variant="outline"
          onClick={handleReset}
        >
          Reset All Parameters
        </Button>
      </div>

      {/* DEDICATED VARIANTS SHOWCASE (Matches User Images 1, 2, 3) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Component Variants Showcase
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">
            Range Slider • Color Picker • Toggle Switch
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Variant 1: Precision Range Slider (Matching Image 1) */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Activity className="size-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  1. Continuous Range Slider
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Ruler detents, glowing white needle bloom, live unit readouts.
              </p>
            </div>

            <div className="space-y-2.5">
              <ParameterSlider
                label="Height"
                value={variantSliderVal}
                onChange={setVariantSliderVal}
                min={24}
                max={96}
                step={2}
                unit="px"
              />
              <ParameterSlider
                label="Glide"
                value={variantGlideVal}
                onChange={setVariantGlideVal}
                min={0.1}
                max={1.5}
                step={0.1}
                unit="s"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/50">
              <span>Height: {variantSliderVal}px</span>
              <span>Glide: {variantGlideVal}s</span>
            </div>
          </div>

          {/* Variant 2: Color Picker Pill (Matching Image 2) */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Palette className="size-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  2. Color Picker Pill
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Circular swatch, uppercase hex pill badge, native color popover.
              </p>
            </div>

            <div className="space-y-2.5">
              <ParameterColor
                label="Fill"
                value={variantColorHex}
                onChange={setVariantColorHex}
              />
              <ParameterColor
                label="Track"
                value={paramTrack}
                onChange={setParamTrack}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/50">
              <span>Swatch: {variantColorHex}</span>
              <span
                style={{ backgroundColor: variantColorHex }}
                className="size-3.5 rounded-full border border-black/20"
              />
            </div>
          </div>

          {/* Variant 3: Toggle Switch Pill (Matching Image 3) */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ToggleLeft className="size-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  3. Toggle Switch Pill
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Smooth pill track with sliding thumb knob and focus ring.
              </p>
            </div>

            <div className="space-y-2.5">
              <ParameterSwitch
                label="Show Value"
                checked={paramShowValue}
                onChange={setParamShowValue}
              />
              <ParameterSwitch
                label="Disabled"
                checked={variantSwitchState}
                onChange={setVariantSwitchState}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/50">
              <span>Value Label: {paramShowValue ? 'Visible' : 'Hidden'}</span>
              <span>State: {variantSwitchState ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE WAVEFORM INSPECTOR PREVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Waveform Simulation Preview
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">
            Modulated by 15 Active Parameters
          </span>
        </div>

        <div
          style={{ backgroundColor: paramTrack }}
          className={cn(
            "relative p-6 sm:p-10 rounded-2xl border border-border flex flex-col items-center justify-center min-h-[180px] overflow-hidden transition-all duration-200",
            paramDisabled && "opacity-40 pointer-events-none"
          )}
        >
          {paramShowValue && (
            <div className="absolute top-3 right-4 px-2.5 py-1 rounded-full bg-surface-elevated/80 backdrop-blur-md border border-border text-xs font-mono font-bold text-foreground shadow-sm">
              Level: {paramValue}%
            </div>
          )}

          <div
            className="flex items-end justify-center w-full max-w-xl"
            style={{ gap: `${paramGap}px` }}
          >
            {Array.from({ length: paramBars }).map((_, i) => {
              const progress = i / Math.max(1, paramBars - 1);
              const centerDist = Math.abs(progress - 0.5) * 2;
              const bellCurve = Math.exp(-Math.pow(centerDist * (paramReach / 3), 2));
              const skewOffset = (progress - 0.5) * paramSkew;
              const amplitude = (paramValue / 100) * paramSensitivity;
              const calculatedHeight = Math.max(
                paramRestHeight,
                Math.min(
                  paramHeight,
                  paramRestHeight + (paramHeight - paramRestHeight) * bellCurve * amplitude * (1 + skewOffset)
                )
              );

              return (
                <div
                  key={i}
                  style={{
                    height: `${calculatedHeight}px`,
                    backgroundColor: paramFill,
                    transition: `height ${paramGlide}s ease, background-color 0.2s`,
                  }}
                  className="flex-1 min-w-[2px] max-w-[12px] rounded-full shadow-xs"
                />
              );
            })}
          </div>

          <p className="text-[11px] text-muted-foreground/80 mt-4 text-center font-mono">
            Modulated by Height ({paramHeight}px), Bars ({paramBars}), Gap ({paramGap}px), Skew ({paramSkew}), Reach ({paramReach}), Glide ({paramGlide}s)
          </p>
        </div>
      </div>

      {/* THE COMPLETE 15-CONTROL INSPECTOR GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Inspector Control Grid
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">
            3 Columns • 15 Interactive Scrubber Controls
          </span>
        </div>

        <ParameterGrid columns={3}>
          <ParameterColor
            label="Fill"
            value={paramFill}
            onChange={setParamFill}
            disabled={paramDisabled}
          />
          <ParameterColor
            label="Track"
            value={paramTrack}
            onChange={setParamTrack}
            disabled={paramDisabled}
          />
          <ParameterSlider
            label="Value"
            value={paramValue}
            onChange={setParamValue}
            min={0}
            max={100}
            step={paramStep}
            disabled={paramDisabled}
          />

          <ParameterSlider
            label="Step"
            value={paramStep}
            onChange={setParamStep}
            min={1}
            max={10}
            step={1}
            disabled={paramDisabled}
          />
          <ParameterSwitch
            label="Show Value"
            checked={paramShowValue}
            onChange={setParamShowValue}
            disabled={paramDisabled}
          />
          <ParameterSlider
            label="Bars"
            value={paramBars}
            onChange={setParamBars}
            min={8}
            max={64}
            step={1}
            disabled={paramDisabled}
          />

          <ParameterSlider
            label="Height"
            value={paramHeight}
            onChange={setParamHeight}
            min={24}
            max={96}
            step={2}
            unit="px"
            disabled={paramDisabled}
          />
          <ParameterSlider
            label="Rest Height"
            value={paramRestHeight}
            onChange={setParamRestHeight}
            min={8}
            max={40}
            step={1}
            unit="px"
            disabled={paramDisabled}
          />
          <ParameterSlider
            label="Gap"
            value={paramGap}
            onChange={setParamGap}
            min={1}
            max={16}
            step={1}
            unit="px"
            disabled={paramDisabled}
          />

          <ParameterSlider
            label="Sensitivity"
            value={paramSensitivity}
            onChange={setParamSensitivity}
            min={0.2}
            max={3}
            step={0.1}
            disabled={paramDisabled}
          />
          <ParameterSlider
            label="Reach"
            value={paramReach}
            onChange={setParamReach}
            min={1}
            max={12}
            step={1}
            disabled={paramDisabled}
          />
          <ParameterSlider
            label="Skew"
            value={paramSkew}
            onChange={setParamSkew}
            min={0}
            max={1}
            step={0.05}
            disabled={paramDisabled}
          />

          <ParameterSlider
            label="Glide"
            value={paramGlide}
            onChange={setParamGlide}
            min={0.1}
            max={1.5}
            step={0.1}
            unit="s"
            disabled={paramDisabled}
          />
          <ParameterSlider
            label="Smoothing"
            value={paramSmoothing}
            onChange={setParamSmoothing}
            min={20}
            max={300}
            step={10}
            unit="ms"
            disabled={paramDisabled}
          />
          <ParameterSwitch
            label="Disabled"
            checked={paramDisabled}
            onChange={setParamDisabled}
          />
        </ParameterGrid>
      </div>
    </div>
  );
};
