import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  ParameterSlider,
  ParameterSwitch,
  ParameterColor,
  ParameterGrid,
  useToast,
} from '@/components/ui';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { useTheme } from '@/theme/ThemeContext';

export const ParameterSliderPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { colors, isDark, preset } = useTheme();

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

  // Synchronize parameter colors with active theme preset
  useEffect(() => {
    if (isDark) {
      setParamFill('#f5f5f5');
      setParamTrack('#27272a');
    } else {
      setParamFill(colors.primary || '#4f46e5');
      setParamTrack('#f4f4f5');
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
    addToast({
      title: 'Theme & Defaults Restored',
      description: `Reset all 15 parameters to match active ${preset} theme.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            Parameter Scrubber Toolbar • Real-Time Waveform Inspector
          </span>
        </div>

        <Button
          size="xs"
          variant="outline"
          onClick={handleReset}
        >
          Reset All 15 Parameters
        </Button>
      </div>

      {/* Live Dynamic Waveform Preview Canvas */}
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

      {/* The Exact 15-Control Parameter Panel (Matching User Image) */}
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
