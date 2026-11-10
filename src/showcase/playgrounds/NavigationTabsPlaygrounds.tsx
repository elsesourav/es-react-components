import React, { useState } from 'react';
import {
  Tabs,
  SegmentedControl,
  BranchedMenu,
  ParameterSlider,
  ParameterSwitch,
  ParameterColor,
  ParameterGrid,
} from '@/components/ui';
import {
  Download04Icon,
  Rocket01Icon,
  Settings02Icon,
  PaintBoardIcon,
} from '@hugeicons/core-free-icons';
import { useToast } from '@/components/ui';
import { useTheme } from '@/theme/ThemeContext';
import { Sparkles, Layers } from 'lucide-react';

export const BranchedMenuPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors } = useTheme();

  const [menuActive, setMenuActive] = useState('quick');
  const [menuWidth, setMenuWidth] = useState(240);
  const [menuRowHeight, setMenuRowHeight] = useState(36);
  const [menuIndent, setMenuIndent] = useState(40);
  const [menuTrunk] = useState(14);
  const [menuRadius, setMenuRadius] = useState(10);
  const [menuLineWidth, setMenuLineWidth] = useState(1.5);
  const [menuDrawDuration, setMenuDrawDuration] = useState(400);
  const [menuFoldDuration] = useState(300);
  const [menuLineColor, setMenuLineColor] = useState('#3f3f46');
  const [menuAccentColor, setMenuAccentColor] = useState('#6366f1');
  const [menuTextColor, setMenuTextColor] = useState('#f5f5f5');

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-foreground">Branched Tree Navigation</h4>
            <p className="text-xs text-muted-foreground">Animated curved vector hierarchy with synchronized sliding branch reach.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMenuAccentColor(colors.primary);
                setMenuLineColor(colors.border);
                setMenuTextColor(colors.foreground);
                addToast({
                  title: 'Theme Synchronized',
                  description: `Tree colors bound to active ${preset} tokens!`,
                  type: 'info',
                });
              }}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
            >
              <Sparkles className="size-3.5" />
              <span>Reset to Theme ({preset})</span>
            </button>
          </div>
        </div>

        {/* Section 1: Color Tokens */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Theme Colors & Token Styling
          </span>
          <ParameterGrid columns={3}>
            <ParameterColor
              label="Accent (Active)"
              value={menuAccentColor}
              onChange={setMenuAccentColor}
            />
            <ParameterColor
              label="Branch Lines"
              value={menuLineColor}
              onChange={setMenuLineColor}
            />
            <ParameterColor
              label="Label Text"
              value={menuTextColor}
              onChange={setMenuTextColor}
            />
          </ParameterGrid>
        </div>

        {/* Section 2: Tree Geometry & Metrics */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Geometry, Spacing & Curve Radii
          </span>
          <ParameterGrid columns={3}>
            <ParameterSlider
              label="Menu Width"
              value={menuWidth}
              onChange={setMenuWidth}
              min={180}
              max={320}
              step={10}
              unit="px"
            />
            <ParameterSlider
              label="Row Height"
              value={menuRowHeight}
              onChange={setMenuRowHeight}
              min={28}
              max={48}
              step={2}
              unit="px"
            />
            <ParameterSlider
              label="Child Indent"
              value={menuIndent}
              onChange={setMenuIndent}
              min={24}
              max={60}
              step={2}
              unit="px"
            />
            <ParameterSlider
              label="Arc Radius"
              value={menuRadius}
              onChange={setMenuRadius}
              min={4}
              max={16}
              step={1}
              unit="px"
            />
            <ParameterSlider
              label="Line Width"
              value={menuLineWidth}
              onChange={setMenuLineWidth}
              min={1}
              max={3}
              step={0.5}
              unit="px"
            />
            <ParameterSlider
              label="Draw Duration"
              value={menuDrawDuration}
              onChange={setMenuDrawDuration}
              min={200}
              max={800}
              step={50}
              unit="ms"
            />
          </ParameterGrid>
        </div>
      </div>

      {/* Live Tree Preview */}
      <div className="p-6 sm:p-10 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[340px] space-y-4">
        <div className="w-full flex justify-center py-2 overflow-x-auto">
          <BranchedMenu
            items={[
              {
                label: 'Getting started',
                children: [
                  { value: 'install', label: 'Installation', icon: Download04Icon },
                  { value: 'quick', label: 'Quick start', icon: Rocket01Icon },
                  { value: 'config', label: 'Configuration', icon: Settings02Icon },
                  { value: 'theming', label: 'Theming', icon: PaintBoardIcon },
                ],
              },
              {
                label: 'Components',
                children: [
                  { value: 'buttons', label: 'Buttons' },
                  { value: 'overlays', label: 'Overlays' },
                  { value: 'forms', label: 'Forms & Inputs' },
                ],
              },
            ]}
            defaultOpen={[0]}
            defaultActive={menuActive}
            onSelect={(val, it) => {
              setMenuActive(val);
              addToast({
                title: 'Item Selected',
                description: `Navigated to ${it.label} (${val})`,
                type: 'info',
              });
            }}
            color={menuTextColor}
            accentColor={menuAccentColor}
            lineColor={menuLineColor}
            width={menuWidth}
            rowHeight={menuRowHeight}
            indent={menuIndent}
            trunk={menuTrunk}
            radius={menuRadius}
            lineWidth={menuLineWidth}
            fontSize={14}
            drawDuration={menuDrawDuration}
            foldDuration={menuFoldDuration}
          />
        </div>
        <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
          <span>Active Target:</span>
          <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-primary font-semibold">
            "{menuActive}"
          </span>
        </div>
      </div>
    </div>
  );
};

export const TabsPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [tabVariant, setTabVariant] = useState<'plateau' | 'segmented' | 'pills' | 'underline'>('plateau');
  const [tabScale, setTabScale] = useState(100);
  const [panelPadding, setPanelPadding] = useState(16);
  const [showBadges, setShowBadges] = useState(true);
  const [disabledTab, setDisabledTab] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="border-b border-border/50 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Interactive Parameter Controls
          </span>
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Scale / Zoom"
            value={tabScale}
            onChange={setTabScale}
            min={80}
            max={120}
            step={5}
            unit="%"
          />
          <ParameterSlider
            label="Panel Padding"
            value={panelPadding}
            onChange={setPanelPadding}
            min={8}
            max={32}
            step={4}
            unit="px"
          />
          <ParameterSwitch
            label="Show Badges"
            checked={showBadges}
            onChange={setShowBadges}
          />
          <ParameterSwitch
            label="Disable Billing Tab"
            checked={disabledTab}
            onChange={setDisabledTab}
          />
        </ParameterGrid>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
              Tabs Style:
            </span>
            {(['plateau', 'segmented', 'pills', 'underline'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setTabVariant(v)}
                className={`px-3 py-1.5 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                  tabVariant === v
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {v === 'plateau' ? 'Plateau (Spring)' : v}
              </button>
            ))}
          </div>

          <span className="text-xs text-muted-foreground">
            Active: <strong className="text-foreground">{activeTab}</strong>
          </span>
        </div>

        <div
          className="max-w-xl mx-auto transition-transform"
          style={{ transform: `scale(${tabScale / 100})`, transformOrigin: 'top center' }}
        >
          <Tabs
            variant={tabVariant}
            value={activeTab}
            onValueChange={setActiveTab}
            items={[
              { value: 'tab1', label: 'Overview', badge: showBadges ? 'v2' : undefined },
              { value: 'tab2', label: 'Security' },
              { value: 'tab3', label: 'Integrations' },
              { value: 'tab4', label: 'Billing (Disabled)', disabled: disabledTab },
            ]}
            renderPanel={(value) => (
              <div className="space-y-2" style={{ padding: `${panelPadding}px` }}>
                {value === 'tab1' && (
                  <>
                    <h4 className="font-semibold text-foreground text-sm">Cluster Overview & Health</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Cluster metrics aggregated every 5 seconds across 48 edge nodes with 99.99% uptime.
                      Sliding plateau tabs measure tab widths via ResizeObserver with spring physics.
                    </p>
                  </>
                )}
                {value === 'tab2' && (
                  <>
                    <h4 className="font-semibold text-foreground text-sm">Security & Access Policies</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Mutual TLS (mTLS) ingress encryption and zero-trust policies active.
                      Rotate certificate authorities automatically every 90 days.
                    </p>
                  </>
                )}
                {value === 'tab3' && (
                  <>
                    <h4 className="font-semibold text-foreground text-sm">Connected Integrations</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Connected to GitHub Actions, Datadog Real User Monitoring, and Slack notification webhooks.
                    </p>
                  </>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export const SegmentedControlPlayground: React.FC = () => {
  const [segmentedVal, setSegmentedVal] = useState('weekly');
  const [segmentedVariant, setSegmentedVariant] = useState<'primary' | 'surface'>('primary');
  const [controlScale, setControlScale] = useState(100);
  const [disabledOption, setDisabledOption] = useState(true);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <Layers className="size-4 text-primary" />
          Segmented Control Options & Range Slider
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Scale / Zoom"
            value={controlScale}
            onChange={setControlScale}
            min={80}
            max={130}
            step={5}
            unit="%"
          />
          <ParameterSwitch
            label="Disable Enterprise Option"
            checked={disabledOption}
            onChange={setDisabledOption}
          />
        </ParameterGrid>

        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs text-muted-foreground">Thumb Variant:</span>
          {(['primary', 'surface'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSegmentedVariant(v)}
              className={`px-3 py-1.5 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                segmentedVariant === v
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {v === 'primary' ? 'Primary (Themed)' : 'Surface'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[300px] space-y-6">
        <div style={{ transform: `scale(${controlScale / 100})`, transformOrigin: 'center' }}>
          <SegmentedControl
            label="Billing Interval"
            variant={segmentedVariant}
            value={segmentedVal}
            onValueChange={setSegmentedVal}
            options={[
              { value: 'daily', label: '1 Day' },
              { value: 'weekly', label: '1 Week' },
              { value: 'monthly', label: '1 Month' },
              { value: 'annual', label: '1 Year' },
              { value: 'lifetime', label: 'Enterprise', disabled: disabledOption },
            ]}
          />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-xs text-muted-foreground">
            Selected Interval: <strong className="text-foreground uppercase">{segmentedVal}</strong>
          </div>
          <p className="text-[11px] text-muted-foreground/80 max-w-sm">
            Features spring thumb sliding with dual text-inversion mask. Navigate with <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">→</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">Home</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">End</kbd>.
          </p>
        </div>
      </div>
    </div>
  );
};
