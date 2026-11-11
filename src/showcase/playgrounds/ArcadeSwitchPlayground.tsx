import React, { useState } from 'react';
import {
  ArcadeSwitch,
  ArcadeSwitchVariant,
  ArcadeSwitchSize,
  Badge,
  useToast,
  ParameterGrid,
  ParameterSwitch,
} from '@/components/ui';
import { Sliders, Sparkles, Volume2, Smartphone, ShieldCheck, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ArcadeSwitchPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [active, setActive] = useState(true);
  const [soundActive, setSoundActive] = useState(true);
  const [vibrateActive, setVibrateActive] = useState(false);
  const [sliderToggle, setSliderToggle] = useState(true);
  const [variant, setVariant] = useState<ArcadeSwitchVariant>('neon-green');
  const [size, setSize] = useState<ArcadeSwitchSize>('md');
  const [showText, setShowText] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. Live Interactive Preview Canvas (Preview First) */}
      <div className="p-8 sm:p-14 rounded-3xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center gap-8 shadow-sm">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            <span>Breakout Ball Beveled Arcade Switch</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Deep inset track shadow, metallic specular rim, 3D tactile white thumb, and engraved ON/OFF typography.
          </p>
        </div>

        {/* Featured Arcade Switch (Matching User Image 3) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-border shadow-sm max-w-md w-full space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-foreground">
                Tactile Bezel Switch
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Current state: <strong className={active ? 'text-emerald-400' : 'text-muted-foreground'}>{active ? 'ON' : 'OFF'}</strong>
              </div>
            </div>

            <ArcadeSwitch
              checked={active}
              onChange={(next) => {
                setActive(next);
                addToast({
                  title: next ? 'Power Activated (ON)' : 'Power Deactivated (OFF)',
                  description: 'Toggled retro arcade switch with spring physics.',
                  type: next ? 'success' : 'info',
                });
              }}
              size={size}
              variant={variant}
              showText={showText}
              disabled={disabled}
            />
          </div>

          <div className="border-t border-border/50" />

          {/* Wide Track Slider Variant (Matching User Image 2) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Gauge className="size-3.5 text-primary" />
                <span>Wide Paddle Slider Track (Image 2)</span>
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {sliderToggle ? 'ENGAGED' : 'DISENGAGED'}
              </span>
            </div>

            <div className="w-full flex justify-center py-2">
              <ArcadeSwitch
                sliderMode
                checked={sliderToggle}
                onChange={setSliderToggle}
                variant={variant}
                size="md"
                showText={false}
                disabled={disabled}
                className="w-full max-w-sm"
              />
            </div>
          </div>

          <div className="border-t border-border/50" />

          {/* Breakout Ball Settings Demos */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="size-4 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">Retro 8-Bit Audio FX</span>
              </div>
              <ArcadeSwitch
                checked={soundActive}
                onChange={setSoundActive}
                size="sm"
                variant="neon-cyan"
                showText
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="size-4 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">Haptic Vibration Shock</span>
              </div>
              <ArcadeSwitch
                checked={vibrateActive}
                onChange={setVibrateActive}
                size="sm"
                variant="candy-pink"
                showText
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <Sliders className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Arcade Switch Configuration
          </span>
        </div>

        {/* Color Palette */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground block">
            Color Accent:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'neon-green', label: 'Neon Green (Image 3)' },
              { id: 'candy-pink', label: 'Candy Pink' },
              { id: 'neon-cyan', label: 'Neon Cyan' },
              { id: 'amber-gold', label: 'Amber Gold' },
              { id: 'cyber-purple', label: 'Cyber Purple' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id as ArcadeSwitchVariant)}
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

        {/* Size & Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border/40">
          <div>
            <span className="text-xs font-medium text-muted-foreground mb-2 block">
              Size Preset
            </span>
            <div className="flex gap-1.5">
              {(['sm', 'md', 'lg'] as ArcadeSwitchSize[]).map((s) => (
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
            <ParameterGrid columns={2}>
              <ParameterSwitch
                label="Engraved ON / OFF"
                checked={showText}
                onChange={setShowText}
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
    </div>
  );
};

export default ArcadeSwitchPlayground;
