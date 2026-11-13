import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  TactileButton,
  TactileInput,
  TactileTextarea,
  TactileSelect,
  TactileCard,
  TactileCardHeader,
  TactileCardTitle,
  TactileCardDescription,
  TactileCardContent,
  TactileCardFooter,
  TactileBadge,
  TactileTabs,
  useToast,
} from '@/components/ui';
import {
  Sparkles,
  Layers,
  Search,
  Sliders,
  Send,
  Trash2,
  CheckCircle,
  Terminal,
  Activity,
  Cpu,
  Shield,
  Zap,
} from 'lucide-react';

export const TactilePlayground: React.FC = () => {
  const { addToast } = useToast();

  // Control state
  const [buttonSize, setButtonSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');
  const [activeTab, setActiveTab] = useState<string>('controls');
  const [inputValue, setInputValue] = useState('Tactile Physical Deck');
  const [selectValue, setSelectValue] = useState('preset-1');
  const [textareaValue, setTextareaValue] = useState(
    'Precision 3D tactile micro-depth with specular top edge highlights and physical sunken wells.'
  );
  const [clickCount, setClickCount] = useState(0);
  const [lastAction, setLastAction] = useState('Idle');
  const [isPressed, setIsPressed] = useState(false);

  const handleAction = (label: string) => {
    setClickCount((c) => c + 1);
    setLastAction(label);
    addToast({
      title: label,
      description: `Tactile physical feedback triggered (${clickCount + 1} clicks).`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Preview First: Tactile Physical Control Deck */}
      <div className="p-6 sm:p-10 rounded-3xl bg-surface border border-border shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tactile 3D Micro-Depth Suite
              </span>
              <TactileBadge variant="primary" size="sm" dot>
                Spec-Aligned
              </TactileBadge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Physical Hardware Deck
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
              Precision tactile keycaps with 1.5px physical depression, specular top hairlines, and sunken wells (<code className="text-xs font-mono">.mat-well</code>).
            </p>
          </div>

          {/* Quick status badges */}
          <div className="flex flex-wrap items-center gap-2">
            <TactileBadge variant="default" size="md">
              Clicks: {clickCount}
            </TactileBadge>
            <TactileBadge variant="sunken" size="md">
              Status: {lastAction}
            </TactileBadge>
          </div>
        </div>

        {/* Tab switcher inside the preview deck */}
        <div className="mb-6">
          <TactileTabs
            value={activeTab}
            onChange={setActiveTab}
            size="md"
            items={[
              { id: 'controls', label: 'Tactile Controls', icon: <Sliders className="size-3.5" /> },
              { id: 'inputs', label: 'Sunken Wells & Inputs', icon: <Terminal className="size-3.5" /> },
              { id: 'cards', label: 'Tactile Panels', icon: <Layers className="size-3.5" /> },
            ]}
          />
        </div>

        {/* Tab 1: Keycap Buttons */}
        {activeTab === 'controls' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl mat-lift border border-border/80">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Keycap Push-Buttons (Shadow-Cap & Specular Highlight)
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Press down for 1.5px physical travel
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <TactileButton
                  variant="default"
                  size={buttonSize}
                  onClick={() => handleAction('Default Keycap')}
                >
                  Default Cap
                </TactileButton>

                <TactileButton
                  variant="primary"
                  size={buttonSize}
                  leftIcon={<Zap className="size-4" />}
                  onClick={() => handleAction('Primary Keycap')}
                >
                  Primary Action
                </TactileButton>

                <TactileButton
                  variant="secondary"
                  size={buttonSize}
                  onClick={() => handleAction('Secondary Keycap')}
                >
                  Secondary
                </TactileButton>

                <TactileButton
                  variant="accent"
                  size={buttonSize}
                  leftIcon={<Sparkles className="size-4" />}
                  onClick={() => handleAction('Accent Keycap')}
                >
                  Accent Cap
                </TactileButton>

                <TactileButton
                  variant="destructive"
                  size={buttonSize}
                  leftIcon={<Trash2 className="size-4" />}
                  onClick={() => handleAction('Destructive Keycap')}
                >
                  Eject
                </TactileButton>

                <TactileButton
                  variant="subtle"
                  size={buttonSize}
                  onClick={() => handleAction('Subtle Keycap')}
                >
                  Subtle
                </TactileButton>

                <TactileButton
                  variant="default"
                  size={buttonSize}
                  pressed={isPressed}
                  onClick={() => {
                    setIsPressed(!isPressed);
                    handleAction(isPressed ? 'Toggle Released' : 'Toggle Depressed');
                  }}
                >
                  {isPressed ? 'Depressed (Locked)' : 'Toggle Latch'}
                </TactileButton>
              </div>
            </div>

            {/* Badges strip */}
            <div className="p-5 rounded-2xl mat-well border border-border/70 flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground mr-2">
                Tactile Badges:
              </span>
              <TactileBadge variant="default">Default</TactileBadge>
              <TactileBadge variant="primary" dot>Primary Live</TactileBadge>
              <TactileBadge variant="success" dot>Operational</TactileBadge>
              <TactileBadge variant="warning">Standby</TactileBadge>
              <TactileBadge variant="destructive">Alert</TactileBadge>
              <TactileBadge variant="sunken">Sunken Well Pill</TactileBadge>
            </div>
          </div>
        )}

        {/* Tab 2: Inputs & Textarea Wells */}
        {activeTab === 'inputs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-6 rounded-2xl mat-lift border border-border/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sunken Well Input (.mat-well)
              </span>

              <TactileInput
                label="Search Synthesizer Bank"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                leftIcon={<Search className="size-4" />}
                showClear
                onClear={() => setInputValue('')}
                helperText="Type to feel the sunken bezel and specular focus ring"
              />

              <TactileSelect
                label="Audio Detent Algorithm"
                value={selectValue}
                onChange={setSelectValue}
                options={[
                  { label: 'Discrete Step (0.5 dB)', value: 'preset-1', hint: '14ms' },
                  { label: 'Logarithmic Exponential', value: 'preset-2', hint: '28ms' },
                  { label: 'Linear Continuous Detent', value: 'preset-3', hint: '4ms' },
                  { label: 'Hardware Hybrid Sync', value: 'preset-4', hint: '60fps' },
                ]}
                searchable
                searchPlaceholder="Search detent algorithms..."
                helperText="3D keycap trigger with spring-animated floating panel & specular micro-depth"
              />
            </div>

            <div className="space-y-4 p-6 rounded-2xl mat-lift border border-border/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sunken Multiline Well (.mat-well)
              </span>

              <TactileTextarea
                label="System Firmware Log"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                characterCount
                maxLength={200}
                rows={5}
                helperText="Deep recessed chamber with physical inner bevel"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Tactile Panels & Cards */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <TactileCard variant="lifted">
              <TactileCardHeader>
                <div className="flex items-center justify-between">
                  <TactileCardTitle>Lifted Console</TactileCardTitle>
                  <Cpu className="size-4 text-primary" />
                </div>
                <TactileCardDescription>
                  Variant: <code className="font-mono text-xs">lifted</code>
                </TactileCardDescription>
              </TactileCardHeader>
              <TactileCardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Elevated keycap panel with 1px specular top highlight and perimeter hairline.
                </p>
              </TactileCardContent>
              <TactileCardFooter>
                <TactileButton variant="primary" size="xs" onClick={() => handleAction('Card 1 Trigger')}>
                  Execute
                </TactileButton>
              </TactileCardFooter>
            </TactileCard>

            <TactileCard variant="sunken">
              <TactileCardHeader>
                <div className="flex items-center justify-between">
                  <TactileCardTitle>Sunken Bay</TactileCardTitle>
                  <Activity className="size-4 text-emerald-500" />
                </div>
                <TactileCardDescription>
                  Variant: <code className="font-mono text-xs">sunken</code>
                </TactileCardDescription>
              </TactileCardHeader>
              <TactileCardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Recessed interior well providing deep visual grounding for telemetry readings.
                </p>
              </TactileCardContent>
              <TactileCardFooter>
                <TactileBadge variant="success" size="sm" dot>
                  Online
                </TactileBadge>
              </TactileCardFooter>
            </TactileCard>

            <TactileCard variant="interactive" onClick={() => handleAction('Interactive Card')}>
              <TactileCardHeader>
                <div className="flex items-center justify-between">
                  <TactileCardTitle>Interactive Cap</TactileCardTitle>
                  <Shield className="size-4 text-amber-500" />
                </div>
                <TactileCardDescription>
                  Variant: <code className="font-mono text-xs">interactive</code>
                </TactileCardDescription>
              </TactileCardHeader>
              <TactileCardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hover for elevation, click to depress. Physical haptic sensation.
                </p>
              </TactileCardContent>
              <TactileCardFooter>
                <span className="text-[11px] font-mono text-primary font-medium">Click to test →</span>
              </TactileCardFooter>
            </TactileCard>
          </div>
        )}
      </div>

      {/* 2. Controls Second: Configuration Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Tactile Deck Controls</span>
          <TactileBadge variant="outline" size="sm" className="font-mono text-[10px]">
            Size: {buttonSize}
          </TactileBadge>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[11px]">Button Scale:</span>
            <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
              {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setButtonSize(s)}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-md transition-all font-mono',
                    buttonSize === s
                      ? 'bg-surface-elevated text-foreground shadow-cap font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <TactileButton
            variant="default"
            size="xs"
            onClick={() => {
              setClickCount(0);
              setLastAction('Reset');
              setIsPressed(false);
            }}
          >
            Reset State
          </TactileButton>
        </div>
      </div>
    </div>
  );
};
