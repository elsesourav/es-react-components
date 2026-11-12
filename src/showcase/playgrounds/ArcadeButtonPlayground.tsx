import React, { useState } from 'react';
import {
  ArcadeButton,
  ArcadeButtonVariant,
  ArcadeButtonSize,
  ArcadeButtonShape,
  ArcadeButtonShineMode,
  useToast,
  ParameterGrid,
  ParameterSlider,
  ParameterSwitch,
} from '@/components/ui';
import { Sliders, Play, RotateCcw, ChevronRight, Home, Flame, Sparkles, Layers, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ArcadeButtonPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [variant, setVariant] = useState<ArcadeButtonVariant>('magenta');
  const [size, setSize] = useState<ArcadeButtonSize>('lg');
  const [shape, setShape] = useState<ArcadeButtonShape>('rounded');

  // Border Controls (Border color is always a deep shade of the background color)
  const [hasBorder, setHasBorder] = useState(true);
  const [borderWidth, setBorderWidth] = useState(1.5);
  const [borderColor, setBorderColor] = useState('');
  const [borderRadius, setBorderRadius] = useState<number>(18);
  const [useCustomRadius, setUseCustomRadius] = useState(true);

  // Specular Mask Controls
  const [mask, setMask] = useState(true);
  const [maskHeight, setMaskHeight] = useState(40);
  const [maskOpacity, setMaskOpacity] = useState(0.2);
  const [maskInset, setMaskInset] = useState(4);
  const [maskMatchParent, setMaskMatchParent] = useState(true);
  const [customMaskRadius, setCustomMaskRadius] = useState(14);

  // Animation & Interactive States
  const [shine, setShine] = useState(true);
  const [shineMode, setShineMode] = useState<ArcadeButtonShineMode>('starburst');
  const [glow, setGlow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(1250);

  const handleStartGame = () => {
    setScore((prev) => prev + 250);
    addToast({
      title: 'Action Triggered!',
      description: `Button clicked (+250 score). Current score: ${score + 250}`,
      type: 'success',
    });
  };

  const handlePlayAgain = () => {
    setScore(0);
    addToast({
      title: 'Reset Triggered',
      description: 'Score reset to 0.',
      type: 'info',
    });
  };

  const activeRadius = useCustomRadius ? borderRadius : undefined;
  const activeMaskRadius = maskMatchParent ? undefined : customMaskRadius;

  return (
    <div className="space-y-8">
      {/* 1. Live Interactive Preview Canvas (Preview First) */}
      <div className="p-8 sm:p-14 rounded-3xl bg-radial from-blue-950/80 via-zinc-950 to-zinc-950 border border-blue-500/20 flex flex-col items-center justify-center gap-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Arcade Grid Glow Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b0f_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        <div className="text-center space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="size-3.5" />
            <span>Arcade Button</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Glossy 3D push button with specular glass highlight, deep beveled border (always matching a deep shade of the background color), starburst gleam animation, and theme reactivity.
          </p>
        </div>

        {/* Featured Buttons */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ArcadeButton
              variant={variant}
              size={size}
              shape={shape}
              border={hasBorder}
              borderWidth={borderWidth}
              borderColor={borderColor || undefined}
              borderRadius={activeRadius}
              mask={mask}
              maskHeight={`${maskHeight}%`}
              maskOpacity={maskOpacity}
              maskInset={maskInset}
              maskMatchParent={maskMatchParent}
              maskBorderRadius={activeMaskRadius}
              shine={shine}
              shineMode={shineMode}
              glow={glow}
              isLoading={isLoading}
              disabled={disabled}
              onClick={handleStartGame}
              leftIcon={<Play className="size-4 fill-white" />}
            >
              START
            </ArcadeButton>

            <ArcadeButton
              variant="magenta"
              size={size}
              shape={shape}
              border={hasBorder}
              borderWidth={borderWidth}
              borderColor={borderColor || undefined}
              borderRadius={activeRadius}
              mask={mask}
              maskHeight={`${maskHeight}%`}
              maskOpacity={maskOpacity}
              maskInset={maskInset}
              maskMatchParent={maskMatchParent}
              maskBorderRadius={activeMaskRadius}
              shine={shine}
              shineMode={shineMode}
              glow={glow}
              onClick={handlePlayAgain}
              leftIcon={<RotateCcw className="size-4" />}
            >
              PLAY AGAIN
            </ArcadeButton>
          </div>

          {/* Action Row: Next, Home, Theme-bound */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ArcadeButton
              variant="cyan"
              size="md"
              shape="square"
              border={hasBorder}
              borderWidth={borderWidth}
              borderColor={borderColor || undefined}
              borderRadius={activeRadius}
              mask={mask}
              maskHeight={`${maskHeight}%`}
              maskOpacity={maskOpacity}
              maskInset={maskInset}
              maskMatchParent={maskMatchParent}
              maskBorderRadius={activeMaskRadius}
              shine={shine}
              shineMode={shineMode}
              glow={glow}
              onClick={() => addToast({ title: 'Next Level Action', type: 'info' })}
              aria-label="Next"
            >
              <ChevronRight className="size-5" />
            </ArcadeButton>

            <ArcadeButton
              variant="cyan"
              size="md"
              shape="square"
              border={hasBorder}
              borderWidth={borderWidth}
              borderColor={borderColor || undefined}
              borderRadius={activeRadius}
              mask={mask}
              maskHeight={`${maskHeight}%`}
              maskOpacity={maskOpacity}
              maskInset={maskInset}
              maskMatchParent={maskMatchParent}
              maskBorderRadius={activeMaskRadius}
              shine={shine}
              shineMode={shineMode}
              glow={glow}
              onClick={() => addToast({ title: 'Home Lobby Action', type: 'info' })}
              aria-label="Home"
            >
              <Home className="size-5" />
            </ArcadeButton>

            <ArcadeButton
              variant="theme"
              size="md"
              shape="rounded"
              border={hasBorder}
              borderWidth={borderWidth}
              borderColor={borderColor || undefined}
              borderRadius={activeRadius}
              mask={mask}
              maskHeight={`${maskHeight}%`}
              maskOpacity={maskOpacity}
              maskInset={maskInset}
              maskMatchParent={maskMatchParent}
              maskBorderRadius={activeMaskRadius}
              shine={shine}
              shineMode={shineMode}
              glow={glow}
              onClick={() => addToast({ title: 'Theme Reactive Button', description: 'Adapts to your active color theme with a deep theme border!', type: 'success' })}
              leftIcon={<Sparkles className="size-3.5" />}
            >
              THEME ADAPTIVE
            </ArcadeButton>
          </div>
        </div>

        {/* Live Score Counter Pill */}
        <div className="relative z-10 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>Current Score:</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-surface border border-border text-primary font-bold">
            {score.toLocaleString()} pts
          </span>
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Button Parameters & Styles
          </span>
        </div>

        {/* Color Variant Palette */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground block">
            Color Variant:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'magenta', label: 'Magenta' },
              { id: 'cyan', label: 'Cyan' },
              { id: 'blue', label: 'Blue' },
              { id: 'theme', label: 'Theme Adaptive' },
              { id: 'pink', label: 'Pink' },
              { id: 'neon-cyan', label: 'Neon Cyan' },
              { id: 'green', label: 'Green' },
              { id: 'gold', label: 'Gold' },
              { id: 'silver', label: 'Silver' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id as ArcadeButtonVariant)}
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

        {/* Border Controls Section */}
        <div className="pt-3 border-t border-border/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Border Controls (Border is always a deep shade of background color)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setHasBorder(!hasBorder)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-lg border font-medium transition-all",
                hasBorder
                  ? "bg-primary/10 border-primary text-primary font-bold"
                  : "bg-surface-subtle border-border text-muted-foreground"
              )}
            >
              {hasBorder ? 'Deep Border Active' : 'No Border'}
            </button>
          </div>

          <ParameterGrid columns={hasBorder ? 3 : 2}>
            <ParameterSlider
              label="Border Radius (px)"
              value={borderRadius}
              onChange={setBorderRadius}
              min={0}
              max={40}
              step={2}
            />
            {hasBorder && (
              <ParameterSlider
                label="Border Width (px)"
                value={borderWidth}
                onChange={setBorderWidth}
                min={1}
                max={6}
                step={0.5}
              />
            )}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground block">
                Shape Preset
              </span>
              <div className="flex gap-1.5">
                {(['rounded', 'pill', 'square'] as ArcadeButtonShape[]).map((sh) => (
                  <button
                    key={sh}
                    type="button"
                    onClick={() => {
                      setShape(sh);
                      if (sh === 'pill') setBorderRadius(999);
                      else if (sh === 'square') setBorderRadius(12);
                      else setBorderRadius(18);
                    }}
                    className={cn(
                      'px-3 py-1 text-xs rounded-lg border capitalize transition-all cursor-pointer font-medium',
                      shape === sh
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {sh}
                  </button>
                ))}
              </div>
            </div>
          </ParameterGrid>
        </div>

        {/* Specular Mask Controls Section */}
        <div className="pt-3 border-t border-border/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Specular Mask Controls (Parent-to-Child Matching)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMaskMatchParent(!maskMatchParent)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-lg border font-medium transition-all",
                maskMatchParent
                  ? "bg-primary/10 border-primary text-primary font-bold"
                  : "bg-surface-subtle border-border text-muted-foreground"
              )}
            >
              {maskMatchParent ? 'Mask Matches Parent Radius' : 'Custom Mask Radius'}
            </button>
          </div>

          <ParameterGrid columns={4}>
            <ParameterSwitch
              label="Enable Specular Mask"
              checked={mask}
              onChange={setMask}
            />
            <ParameterSlider
              label="Mask Height (%)"
              value={maskHeight}
              onChange={setMaskHeight}
              min={10}
              max={70}
              step={5}
            />
            <ParameterSlider
              label="Mask Opacity (%)"
              value={Math.round(maskOpacity * 100)}
              onChange={(val) => setMaskOpacity(val / 100)}
              min={5}
              max={50}
              step={5}
            />
            <ParameterSlider
              label="Mask Inset (px)"
              value={maskInset}
              onChange={setMaskInset}
              min={0}
              max={8}
              step={1}
            />
            {!maskMatchParent && (
              <ParameterSlider
                label="Custom Child Radius"
                value={customMaskRadius}
                onChange={setCustomMaskRadius}
                min={0}
                max={40}
                step={2}
              />
            )}
          </ParameterGrid>
        </div>

        {/* Animation & Size Controls */}
        <div className="pt-3 border-t border-border/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-medium text-muted-foreground mb-2 block">
                Button Sizing
              </span>
              <div className="flex gap-1.5">
                {(['sm', 'md', 'lg', 'xl'] as ArcadeButtonSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
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

            <div>
              <span className="text-xs font-medium text-muted-foreground mb-2 block">
                Shine Animation Mode
              </span>
              <div className="flex gap-1.5">
                {[
                  { id: 'starburst', label: 'Starburst (shiny-btn1)' },
                  { id: 'sweep', label: 'Diagonal Sweep' },
                  { id: 'none', label: 'None' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setShineMode(m.id as ArcadeButtonShineMode)}
                    className={cn(
                      'px-3 py-1 text-xs rounded-lg border transition-all cursor-pointer font-medium',
                      shineMode === m.id
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ParameterGrid columns={4}>
            <ParameterSwitch
              label="Shine Animation"
              checked={shine}
              onChange={setShine}
            />
            <ParameterSwitch
              label="Ambient Glow"
              checked={glow}
              onChange={setGlow}
            />
            <ParameterSwitch
              label="Loading State"
              checked={isLoading}
              onChange={setIsLoading}
            />
            <ParameterSwitch
              label="Disabled State"
              checked={disabled}
              onChange={setDisabled}
            />
          </ParameterGrid>
        </div>
      </div>
    </div>
  );
};

export default ArcadeButtonPlayground;
