import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  Badge,
  SplitFlapText,
  TextReveal,
  ParameterSlider,
  ParameterColor,
  ParameterGrid,
  NativeSelect,
  useToast,
} from '@/components/ui';
import { Sparkles, RotateCcw } from 'lucide-react';
import { useTheme } from '@/theme/ThemeContext';

export const SplitFlapTextPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [flapWords, setFlapWords] = useState<string[]>([
    'LAUNCH READY',
    'SYNC ONLINE',
    'SIGNAL LIVE',
  ]);
  const [flapPreset, setFlapPreset] = useState<'launch' | 'terminal' | 'crypto' | 'cities'>('launch');
  const [flapDuration, setFlapDuration] = useState(0.12);
  const [flapStagger, setFlapStagger] = useState(0.06);
  const [flapCycleDelay, setFlapCycleDelay] = useState(2400);
  const [flapFlipsPerChar, setFlapFlipsPerChar] = useState(8);
  const [flapOrder, setFlapOrder] = useState<any>('left');
  const [flapTileStyle, setFlapTileStyle] = useState<any>('board');
  const [flapDepth, setFlapDepth] = useState(0.5);
  const [flapGlare, setFlapGlare] = useState(0);
  const [flapFontSize, setFlapFontSize] = useState(42);
  const [flapTileColor, setFlapTileColor] = useState(isDark ? '#111827' : '#ffffff');
  const [flapTextColor, setFlapTextColor] = useState(isDark ? '#f8fafc' : '#0f172a');
  const [flapBoardBg, setFlapBoardBg] = useState<'dark' | 'surface' | 'slate'>(isDark ? 'dark' : 'surface');

  // Synchronize flip tile colors with active theme preset
  useEffect(() => {
    setFlapTileColor(isDark ? '#111827' : '#ffffff');
    setFlapTextColor(isDark ? '#f8fafc' : '#0f172a');
    setFlapBoardBg(isDark ? 'dark' : 'surface');
  }, [isDark, preset]);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-foreground">Split-Flap Board Controls</h4>
            <p className="text-xs text-muted-foreground">Electromechanical flip-tile ticker inspired by classic departure boards.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setFlapTileColor(isDark ? colors.surface : '#ffffff');
                setFlapTextColor(colors.foreground);
                setFlapBoardBg('surface');
                addToast({
                  title: 'Theme Synchronized',
                  description: `Adapted tiles and typography to ${preset} theme!`,
                  type: 'info',
                });
              }}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <Sparkles className="size-3.5" />
              <span>Sync Active Theme</span>
            </button>
          </div>
        </div>

        {/* Section 1: Presets & Layout Modes */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Word Sequences & Display Modes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <NativeSelect
              label="Message Sequence"
              value={flapPreset}
              onChange={(e) => {
                const val = e.target.value as any;
                setFlapPreset(val);
                if (val === 'launch') setFlapWords(['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']);
                else if (val === 'terminal') setFlapWords(['GATE 14 OPEN', 'BOARDING NOW', 'DEPARTED NYC']);
                else if (val === 'crypto') setFlapWords(['BITCOIN 96K', 'ETHEREUM 3K', 'SOLANA 240$']);
                else if (val === 'cities') setFlapWords(['TOKYO 23:45', 'PARIS 15:45', 'LONDON 14:45']);
              }}
              sizeVariant="sm"
              options={[
                { value: 'launch', label: 'Aerospace Launch' },
                { value: 'terminal', label: 'Airport Terminal' },
                { value: 'crypto', label: 'Finance Ticker' },
                { value: 'cities', label: 'World Time Hub' },
              ]}
            />

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Tile Style
              </label>
              <div className="flex gap-1.5">
                {(['board', 'minimal'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFlapTileStyle(st)}
                    className={cn(
                      "flex-1 h-9 rounded-xl text-xs font-medium capitalize border transition-all",
                      flapTileStyle === st
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Cascade Flip Order
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['left', 'right', 'center', 'random'] as const).map((ord) => (
                  <button
                    key={ord}
                    onClick={() => setFlapOrder(ord)}
                    className={cn(
                      "h-9 rounded-lg text-[11px] font-medium capitalize border transition-all",
                      flapOrder === ord
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    {ord}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Stage Theme
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'dark', label: 'Noir' },
                  { id: 'surface', label: 'Theme' },
                  { id: 'slate', label: 'Slate' },
                ].map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      setFlapBoardBg(bg.id as any);
                      if (bg.id === 'dark') {
                        setFlapTileColor('#111827');
                        setFlapTextColor('#f8fafc');
                      } else if (bg.id === 'surface') {
                        setFlapTileColor(isDark ? colors.surface : '#ffffff');
                        setFlapTextColor(colors.foreground);
                      } else if (bg.id === 'slate') {
                        setFlapTileColor('#1e293b');
                        setFlapTextColor('#f1f5f9');
                      }
                    }}
                    className={cn(
                      "h-9 rounded-lg text-[11px] font-medium border transition-all",
                      flapBoardBg === bg.id
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                    )}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Colors & Tile Dimensions */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Colors & Tile Geometry
          </span>
          <ParameterGrid columns={3}>
            <ParameterColor
              label="Tile Color"
              value={flapTileColor}
              onChange={setFlapTileColor}
            />
            <ParameterColor
              label="Text Color"
              value={flapTextColor}
              onChange={setFlapTextColor}
            />
            <ParameterSlider
              label="Font Size"
              value={flapFontSize}
              onChange={setFlapFontSize}
              min={22}
              max={64}
              step={2}
              unit="px"
            />
          </ParameterGrid>
        </div>

        {/* Section 3: Physics & Timing */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Animation Physics & Flip Cadence
          </span>
          <ParameterGrid columns={4}>
            <ParameterSlider
              label="Flip Speed"
              value={flapDuration}
              onChange={setFlapDuration}
              min={0.05}
              max={0.3}
              step={0.01}
              unit="s"
            />
            <ParameterSlider
              label="Stagger Delay"
              value={flapStagger}
              onChange={setFlapStagger}
              min={0.01}
              max={0.15}
              step={0.01}
              unit="s"
            />
            <ParameterSlider
              label="Cycle Hold"
              value={flapCycleDelay / 1000}
              onChange={(val) => setFlapCycleDelay(Math.round(val * 1000))}
              min={1.0}
              max={5.0}
              step={0.2}
              unit="s"
            />
            <ParameterSlider
              label="Flips / Slot"
              value={flapFlipsPerChar}
              onChange={setFlapFlipsPerChar}
              min={2}
              max={16}
              step={1}
            />
            <ParameterSlider
              label="Bevel Depth"
              value={flapDepth}
              onChange={setFlapDepth}
              min={0}
              max={1}
              step={0.1}
            />
            <ParameterSlider
              label="Glare Sheen"
              value={flapGlare}
              onChange={setFlapGlare}
              min={0}
              max={1}
              step={0.1}
            />
          </ParameterGrid>
        </div>
      </div>

      {/* Live Flap Display */}
      <div
        className={cn(
          "p-6 sm:p-10 rounded-2xl border transition-colors flex flex-col items-center justify-center overflow-x-auto min-h-[220px]",
          flapBoardBg === 'dark'
            ? "bg-[#090d16] border-[#1e293b]"
            : flapBoardBg === 'slate'
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-surface border-border shadow-xs"
        )}
      >
        <div className="w-full flex justify-center overflow-x-auto py-2">
          <SplitFlapText
            words={flapWords}
            flipDuration={flapDuration}
            stagger={flapStagger}
            cycleDelay={flapCycleDelay}
            charset="alphanumeric"
            flipsPerChar={flapFlipsPerChar}
            order={flapOrder}
            align="left"
            tileStyle={flapTileStyle}
            tileColor={flapTileColor}
            textColor={flapTextColor}
            glare={flapGlare}
            depth={flapDepth}
            tileRadius={8}
            gap={6}
            fontSize={flapFontSize}
            loop
            padTo={12}
            intro
          />
        </div>
        <span className="text-[11px] text-muted-foreground mt-4 font-mono tracking-wider text-center">
          AUTOMATIC MECHANICAL SPLIT-FLAP TRANSITION • {flapWords.length} PHRASES
        </span>
      </div>
    </div>
  );
};

export const TextRevealPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [textRevealBy, setTextRevealBy] = useState<'word' | 'character'>('word');
  const [textRevealKey, setTextRevealKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-foreground">Split Mode:</span>
          <div className="flex items-center gap-1.5">
            {(['word', 'character'] as const).map((mode) => (
              <Button
                key={mode}
                size="xs"
                variant={textRevealBy === mode ? 'primary' : 'outline'}
                onClick={() => setTextRevealBy(mode)}
              >
                By {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setTextRevealKey((k) => k + 1);
              addToast({ title: 'Replayed Animation', description: `Text reveal triggered (${textRevealBy} split)`, type: 'info' });
            }}
          >
            <RotateCcw className="size-3.5 mr-1" />
            Replay Animation
          </Button>
        </div>
      </div>

      <div className="p-8 sm:p-14 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center text-center">
        <div className="max-w-xl space-y-4">
          <Badge variant="primary" size="sm">
            Motion Physics Text Pipeline
          </Badge>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-snug">
            <TextReveal
              key={textRevealKey}
              text="Engineered for mission-critical interfaces with fluid kinetic physics and accessible motion fallback."
              by={textRevealBy}
              stagger={textRevealBy === 'character' ? 0.025 : 0.065}
            />
          </h2>

          <p className="text-sm text-muted-foreground pt-2">
            Words fade and blur upward into focus using a cubic-bezier ease with automatic viewport detection and reduced-motion fallback.
          </p>
        </div>
      </div>
    </div>
  );
};
