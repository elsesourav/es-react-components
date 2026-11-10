import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  PeekRating,
  ParameterSlider,
  ParameterSwitch,
  ParameterColor,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';
import { useTheme } from '@/theme/ThemeContext';
import { Sparkles } from 'lucide-react';

export const PeekRatingPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { colors, isDark, preset } = useTheme();

  const [ratingVal, setRatingVal] = useState(4);
  const [ratingCount, setRatingCount] = useState(5);
  const [ratingShape, setRatingShape] = useState<any>('star');
  const [ratingSize, setRatingSize] = useState(28);
  const [ratingLift, setRatingLift] = useState(6);
  const [ratingMagnify, setRatingMagnify] = useState(1.15);
  const [ratingPopScale, setRatingPopScale] = useState(1.3);
  const [ratingShowTip, setRatingShowTip] = useState(true);
  const [ratingAllowClear, setRatingAllowClear] = useState(true);
  const [ratingReadOnly, setRatingReadOnly] = useState(false);
  const [ratingDisabled, setRatingDisabled] = useState(false);
  const [ratingActiveColor, setRatingActiveColor] = useState(colors.accent || colors.primary || '#f5b400');
  const [ratingIdleColor, setRatingIdleColor] = useState(isDark ? '#52525b' : '#d4d4d8');

  // Synchronize rating colors with active theme preset
  React.useEffect(() => {
    setRatingActiveColor(colors.accent || colors.primary || '#f5b400');
    setRatingIdleColor(isDark ? '#52525b' : '#d4d4d8');
  }, [colors.accent, colors.primary, isDark, preset]);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-foreground">Peek Rating Controls</h4>
            <p className="text-xs text-muted-foreground">Physics-lifted interactive rater with spring cursor tracking, pop feedback, and floating badges.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setRatingActiveColor(colors.accent || colors.primary);
                setRatingIdleColor(isDark ? '#3f3f46' : '#d4d4d8');
                addToast({
                  title: 'Theme Synchronized',
                  description: `Bound rating accent to theme (${colors.accent || colors.primary})!`,
                  type: 'info',
                });
              }}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
            >
              <Sparkles className="size-3.5" />
              <span>Sync Active Theme</span>
            </button>
          </div>
        </div>

        {/* Section 1: Glyphs & Color Parameters */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Shape & Color Styling
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Glyph Shape
              </label>
              <div className="flex gap-1.5">
                {(['star', 'heart', 'bolt'] as const).map((shp) => (
                  <button
                    key={shp}
                    onClick={() => setRatingShape(shp)}
                    className={cn(
                      "flex-1 h-9 rounded-xl text-xs font-medium capitalize border transition-all cursor-pointer",
                      ratingShape === shp
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    {shp}
                  </button>
                ))}
              </div>
            </div>

            <ParameterColor
              label="Active Color"
              value={ratingActiveColor}
              onChange={setRatingActiveColor}
            />
            <ParameterColor
              label="Idle Color"
              value={ratingIdleColor}
              onChange={setRatingIdleColor}
            />

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Color Presets
              </label>
              <div className="flex items-center gap-1.5 h-9">
                {[
                  { color: '#f5b400', label: 'Gold' },
                  { color: '#f43f5e', label: 'Ruby' },
                  { color: '#06b6d4', label: 'Cyan' },
                  { color: '#10b981', label: 'Emerald' },
                  { color: colors.primary, label: 'Theme' },
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setRatingActiveColor(p.color)}
                    title={p.label}
                    className={cn(
                      "size-6 rounded-full border-2 transition-transform cursor-pointer",
                      ratingActiveColor === p.color
                        ? "scale-110 border-white shadow-sm ring-2 ring-primary/40"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: p.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Metrics & Physics */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Dimensions & Gesture Dynamics
          </span>
          <ParameterGrid columns={4}>
            <ParameterSlider
              label="Unit Count"
              value={ratingCount}
              onChange={setRatingCount}
              min={3}
              max={10}
              step={1}
            />
            <ParameterSlider
              label="Icon Size"
              value={ratingSize}
              onChange={setRatingSize}
              min={20}
              max={44}
              step={2}
              unit="px"
            />
            <ParameterSlider
              label="Hover Lift"
              value={ratingLift}
              onChange={setRatingLift}
              min={0}
              max={16}
              step={1}
              unit="px"
            />
            <ParameterSlider
              label="Magnify Scale"
              value={ratingMagnify}
              onChange={setRatingMagnify}
              min={1.0}
              max={1.4}
              step={0.05}
              unit="x"
            />
            <ParameterSlider
              label="Commit Bounce"
              value={ratingPopScale}
              onChange={setRatingPopScale}
              min={1.0}
              max={1.6}
              step={0.05}
              unit="x"
            />
          </ParameterGrid>
        </div>

        {/* Section 3: Interactive Toggles */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Interaction Flags
          </span>
          <ParameterGrid columns={4}>
            <ParameterSwitch
              label="Show Floating Tip"
              checked={ratingShowTip}
              onChange={setRatingShowTip}
            />
            <ParameterSwitch
              label="Allow Clear"
              checked={ratingAllowClear}
              onChange={setRatingAllowClear}
            />
            <ParameterSwitch
              label="Read Only"
              checked={ratingReadOnly}
              onChange={setRatingReadOnly}
            />
            <ParameterSwitch
              label="Disabled"
              checked={ratingDisabled}
              onChange={setRatingDisabled}
            />
          </ParameterGrid>
        </div>
      </div>

      {/* Live Rating Box */}
      <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center space-y-4 min-h-[220px]">
        <PeekRating
          value={ratingVal}
          onChange={(val) => {
            setRatingVal(val);
            addToast({
              title: 'Rating Updated',
              description: `Selected ${val} of ${ratingCount} ${ratingShape}s`,
              type: 'success',
            });
          }}
          count={ratingCount}
          shape={ratingShape}
          activeColor={ratingActiveColor}
          idleColor={ratingIdleColor}
          tipColor={isDark ? '#27272a' : '#18181b'}
          tipTextColor="#f5f5f5"
          size={ratingSize}
          lift={ratingLift}
          magnify={ratingMagnify}
          popScale={ratingPopScale}
          showTip={ratingShowTip}
          allowClear={ratingAllowClear}
          readOnly={ratingReadOnly}
          disabled={ratingDisabled}
          labels={['Awful', 'Poor', 'Average', 'Great', 'Exceptional', 'Legendary', 'Flawless', 'Supreme', 'Godlike', 'Infinite']}
        />
        <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
          <span>Current Score:</span>
          <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-foreground font-semibold">
            {ratingVal} / {ratingCount}
          </span>
        </div>
      </div>
    </div>
  );
};
