import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  TextLoop,
  ParameterSlider,
  ParameterSwitch,
  ParameterColor,
  ParameterGrid,
  NativeSelect,
  useToast,
} from '@/components/ui';
import { Sparkles } from 'lucide-react';
import { useTheme } from '@/theme/ThemeContext';

export const TextLoopPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors } = useTheme();

  const [loopText, setLoopText] = useState('React ✦ Bits');
  const [loopShape, setLoopShape] = useState<any>('wave');
  const [loopSpeed, setLoopSpeed] = useState(90);
  const [loopDirection, setLoopDirection] = useState<'forward' | 'reverse'>('forward');
  const [loopCurviness, setLoopCurviness] = useState(90);
  const [loopTilt, setLoopTilt] = useState(0);
  const [loopFontSize, setLoopFontSize] = useState(46);
  const [loopRibbon, setLoopRibbon] = useState(true);
  const [loopRibbonColor, setLoopRibbonColor] = useState('#5227FF');
  const [loopRibbonWidth, setLoopRibbonWidth] = useState(86);
  const [loopCross, setLoopCross] = useState(false);
  const [loopCrossAngle, setLoopCrossAngle] = useState(16);
  const [loopDraggable, setLoopDraggable] = useState(false);
  const [loopOutline, setLoopOutline] = useState(false);
  const [loopPauseOnHover, setLoopPauseOnHover] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-foreground">Interactive Text Loop Controls</h4>
            <p className="text-xs text-muted-foreground">Continuous marquee ribbon curving across dynamic SVG vector geometry.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setLoopRibbonColor(colors.primary);
                addToast({
                  title: 'Theme Synchronized',
                  description: `Text loop ribbon color set to theme primary (${colors.primary})`,
                  type: 'info',
                });
              }}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <Sparkles className="size-3.5" />
              <span>Match Theme ({preset})</span>
            </button>
          </div>
        </div>

        {/* Section 1: Path & Vector Shape */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Guide Path & Typography
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Display Text
              </label>
              <input
                type="text"
                value={loopText}
                onChange={(e) => setLoopText(e.target.value)}
                className="w-full h-9 px-3 text-xs rounded-xl bg-surface-elevated border border-border text-foreground focus:border-primary focus:outline-none"
                placeholder="Loop text content..."
              />
            </div>

            <NativeSelect
              label="Guide Path Shape"
              value={loopShape}
              onChange={(e) => setLoopShape(e.target.value as any)}
              sizeVariant="sm"
              options={[
                { value: 'wave', label: 'Wave' },
                { value: 'circle', label: 'Circle' },
                { value: 'infinity', label: 'Infinity' },
                { value: 'arch', label: 'Arch' },
                { value: 'line', label: 'Line' },
              ]}
            />

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Flow Direction
              </label>
              <div className="flex gap-1.5">
                {(['forward', 'reverse'] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setLoopDirection(dir)}
                    className={cn(
                      "flex-1 h-9 rounded-xl text-xs font-medium capitalize border transition-all",
                      loopDirection === dir
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            <ParameterColor
              label="Ribbon Color"
              value={loopRibbonColor}
              onChange={setLoopRibbonColor}
              disabled={!loopRibbon}
            />
          </div>

          <ParameterGrid columns={4}>
            <ParameterSlider
              label="Curviness"
              value={loopCurviness}
              onChange={setLoopCurviness}
              min={0}
              max={180}
              step={5}
            />
            <ParameterSlider
              label="Tilt Angle"
              value={loopTilt}
              onChange={setLoopTilt}
              min={-45}
              max={45}
              step={1}
              unit="°"
            />
            <ParameterSlider
              label="Font Size"
              value={loopFontSize}
              onChange={setLoopFontSize}
              min={24}
              max={72}
              step={2}
              unit="px"
            />
            <ParameterSlider
              label="Speed"
              value={loopSpeed}
              onChange={setLoopSpeed}
              min={20}
              max={300}
              step={5}
              unit="px/s"
            />
          </ParameterGrid>
        </div>

        {/* Section 2: Ribbon Styling & Physics */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Ribbon Band & Motion Parameters
          </span>
          <ParameterGrid columns={4}>
            <ParameterSwitch
              label="Ribbon Band"
              checked={loopRibbon}
              onChange={setLoopRibbon}
            />
            <ParameterSwitch
              label="Pause on Hover"
              checked={loopPauseOnHover}
              onChange={setLoopPauseOnHover}
            />
            <ParameterSwitch
              label="Interactive Drag"
              checked={loopDraggable}
              onChange={setLoopDraggable}
            />
            <ParameterSwitch
              label="Outline Font"
              checked={loopOutline}
              onChange={setLoopOutline}
            />
            <ParameterSwitch
              label="Cross Ribbon"
              checked={loopCross}
              onChange={setLoopCross}
            />
            <ParameterSlider
              label="Ribbon Width"
              value={loopRibbonWidth}
              onChange={setLoopRibbonWidth}
              min={40}
              max={140}
              step={4}
              unit="px"
              disabled={!loopRibbon}
            />
            <ParameterSlider
              label="Cross Angle"
              value={loopCrossAngle}
              onChange={setLoopCrossAngle}
              min={0}
              max={60}
              step={2}
              unit="°"
              disabled={!loopCross}
            />
          </ParameterGrid>
        </div>

        {/* Color Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
          <span className="text-xs text-muted-foreground mr-1">Palette Presets:</span>
          {[
            { name: 'Theme', color: colors.primary },
            { name: 'Violet', color: '#5227FF' },
            { name: 'Cyan', color: '#06b6d4' },
            { name: 'Emerald', color: '#10b981' },
            { name: 'Orange', color: '#f97316' },
            { name: 'Pink', color: '#ec4899' },
          ].map((swatch) => (
            <button
              key={swatch.name}
              type="button"
              onClick={() => setLoopRibbonColor(swatch.color)}
              className={cn(
                "h-6 px-2.5 rounded-full text-[11px] font-medium border flex items-center gap-1.5 transition-all",
                loopRibbonColor === swatch.color
                  ? "border-primary ring-2 ring-primary/20 bg-surface-elevated text-foreground"
                  : "border-border bg-surface-subtle text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
              )}
            >
              <span
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: swatch.color }}
              />
              <span>{swatch.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Canvas Box */}
      <div className="p-4 sm:p-8 rounded-2xl bg-surface-sunken/40 border border-border flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[380px]">
        <TextLoop
          text={loopText}
          shape={loopShape}
          speed={loopSpeed}
          direction={loopDirection}
          separator="✦"
          curviness={loopCurviness}
          tilt={loopTilt}
          fontSize={loopFontSize}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          ribbon={loopRibbon}
          ribbonColor={loopRibbonColor}
          ribbonWidth={loopRibbonWidth}
          edgeFade={0}
          cross={loopCross}
          crossAngle={loopCrossAngle}
          draggable={loopDraggable}
          scrollBoost={0}
          outline={loopOutline}
          pauseOnHover={loopPauseOnHover}
          outlineWidth={1.5}
        />
      </div>
    </div>
  );
};
