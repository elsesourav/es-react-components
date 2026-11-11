import React, { useState } from 'react';
import {
  ArcadeButton,
  ArcadeButtonVariant,
  ArcadeButtonSize,
  ArcadeButtonShape,
  Badge,
  useToast,
  ParameterGrid,
  ParameterSwitch,
} from '@/components/ui';
import { Sparkles, Sliders, Play, RotateCcw, ChevronRight, Home, Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ArcadeButtonPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [variant, setVariant] = useState<ArcadeButtonVariant>('candy-pink');
  const [size, setSize] = useState<ArcadeButtonSize>('lg');
  const [shape, setShape] = useState<ArcadeButtonShape>('rounded');
  const [shine, setShine] = useState(true);
  const [glow, setGlow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(1250);

  const handleStartGame = () => {
    setScore((prev) => prev + 250);
    addToast({
      title: 'Game Started!',
      description: `Breakout Ball engine initialized (+250 pts). Current score: ${score + 250}`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Live Interactive Preview Canvas (Preview First) */}
      <div className="p-8 sm:p-14 rounded-3xl bg-radial from-blue-950/70 via-zinc-950 to-zinc-950 border border-blue-500/20 flex flex-col items-center justify-center gap-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Arcade Grid Glow Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b0f_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        <div className="text-center space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="size-3.5" />
            <span>Breakout Ball Glossy Candy Button</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            High-gloss specular lens highlight with sweeping diagonal starburst reflection, spring tactile click recoil, and arcade gradients.
          </p>
        </div>

        {/* Featured Big START Button (Matching User Image 1) */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <ArcadeButton
            variant={variant}
            size={size}
            shape={shape}
            shine={shine}
            glow={glow}
            isLoading={isLoading}
            disabled={disabled}
            onClick={handleStartGame}
            leftIcon={<Play className="size-4 fill-white" />}
          >
            START
          </ArcadeButton>

          {/* Action Row: Play Again, Next Level, Home */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ArcadeButton
              variant="arcade-magenta"
              size="md"
              shape="rounded"
              shine={shine}
              glow={glow}
              onClick={() => {
                setScore(0);
                addToast({ title: 'Game Reset', description: 'Score cleared back to 0', type: 'info' });
              }}
              leftIcon={<RotateCcw className="size-3.5" />}
            >
              Play Again
            </ArcadeButton>

            <ArcadeButton
              variant="neon-cyan"
              size="md"
              shape="square"
              shine={shine}
              glow={glow}
              onClick={() => addToast({ title: 'Next Level 2', type: 'info' })}
              aria-label="Next Level"
            >
              <ChevronRight className="size-5" />
            </ArcadeButton>

            <ArcadeButton
              variant="cyber-purple"
              size="md"
              shape="square"
              shine={shine}
              glow={glow}
              onClick={() => addToast({ title: 'Home Lobby', type: 'info' })}
              aria-label="Home"
            >
              <Home className="size-5" />
            </ArcadeButton>
          </div>
        </div>

        {/* Live Score Counter Pill */}
        <div className="relative z-10 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>Current Session Score:</span>
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
            Arcade Button Parameters & Styles
          </span>
        </div>

        {/* Color Variant Palette */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground block">
            Arcade Color Theme:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'candy-pink', label: 'Candy Pink (Image 1)' },
              { id: 'arcade-magenta', label: 'Arcade Magenta' },
              { id: 'neon-cyan', label: 'Neon Cyan' },
              { id: 'arcade-green', label: 'Arcade Green' },
              { id: 'cyber-purple', label: 'Cyber Purple' },
              { id: 'amber-gold', label: 'Amber Gold' },
              { id: 'retro-silver', label: 'Retro Silver' },
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

        {/* Size & Shape Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border/40">
          <div>
            <span className="text-xs font-medium text-muted-foreground mb-2 block">
              Size
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
              Shape Silhouette
            </span>
            <div className="flex gap-1.5">
              {(['rounded', 'pill', 'square'] as ArcadeButtonShape[]).map((sh) => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => setShape(sh)}
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
        </div>

        {/* Toggles */}
        <div className="pt-3 border-t border-border/40">
          <ParameterGrid columns={4}>
            <ParameterSwitch
              label="Shine Ray Sweep"
              checked={shine}
              onChange={setShine}
            />
            <ParameterSwitch
              label="Neon Ambient Glow"
              checked={glow}
              onChange={setGlow}
            />
            <ParameterSwitch
              label="Loading Spinner"
              checked={isLoading}
              onChange={setIsLoading}
            />
            <ParameterSwitch
              label="Disabled"
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
