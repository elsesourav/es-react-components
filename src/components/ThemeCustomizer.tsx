import React, { useState } from 'react';
import {
  Palette,
  X,
  Copy,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemePresetKey } from '@/theme/ThemeContext';
import { useToast } from '@/components/ui/toast';

export const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'export'>('presets');
  const [copied, setCopied] = useState(false);
  const {
    preset,
    setPreset,
    colors,
    updateColor,
    isDark,
    toggleDark,
    resetTheme,
  } = useTheme();
  const { addToast } = useToast();

  const handleCopyConfig = () => {
    const cssConfig = `/* Custom Theme Tokens */
:root {
  --primary: ${colors.primary};
  --background: ${colors.background};
  --surface: ${colors.surface};
  --foreground: ${colors.foreground};
  --border: ${colors.border};
  --accent: ${colors.accent};
  --radius: ${colors.radius}px;
}`;

    navigator.clipboard.writeText(cssConfig);
    setCopied(true);
    addToast({
      title: 'Theme Copied!',
      description: 'CSS variables copied to your clipboard.',
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Launcher Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group border border-primary/20"
        title="Customize Theme & Colors"
      >
        <Palette className="h-5 w-5 animate-pulse" />
        <span className="text-sm font-semibold hidden sm:inline">Theme Editor</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface-elevated border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Theme Customizer</h3>
              <p className="text-xs text-muted-foreground">
                Live reactive theming & tokens
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg bg-surface border border-border text-foreground hover:bg-surface-subtle transition-colors"
              title="Toggle Light / Dark"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-surface/50 p-1.5 gap-1">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'presets'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'custom'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Color Pickers
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'export'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Export CSS
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select a Design Preset
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(
                  Object.keys(THEME_PRESETS) as Array<
                    Exclude<ThemePresetKey, 'custom'>
                  >
                ).map((key) => {
                  const p = THEME_PRESETS[key];
                  const isSelected = preset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setPreset(key)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/30 bg-surface'
                          : 'border-border bg-surface hover:border-border-strong hover:bg-surface-subtle'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: p.colors.primary }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: p.colors.surface }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: p.colors.background }}
                        />
                      </div>
                      <div className="text-xs font-bold text-foreground">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {p.isDark ? 'Dark Theme' : 'Light Theme'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Custom Color Palette
                </span>
                <button
                  onClick={resetTheme}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>

              {/* Color Controls */}
              <div className="space-y-3.5">
                {[
                  { key: 'primary', label: 'Primary Brand Color' },
                  { key: 'accent', label: 'Accent Highlight' },
                  { key: 'background', label: 'Background Canvas' },
                  { key: 'surface', label: 'Surface & Cards' },
                  { key: 'foreground', label: 'Foreground & Text' },
                  { key: 'border', label: 'Border Stroke' },
                ].map(({ key, label }) => {
                  const val = colors[key as keyof typeof colors] as string;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border"
                    >
                      <div>
                        <div className="text-xs font-medium text-foreground">
                          {label}
                        </div>
                        <div className="text-[11px] font-mono text-muted-foreground uppercase">
                          {val}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={val}
                          onChange={(e) =>
                            updateColor(key as any, e.target.value)
                          }
                          className="w-8 h-8 rounded-lg cursor-pointer border border-border bg-transparent p-0 overflow-hidden"
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Border Radius Slider */}
                <div className="p-3.5 rounded-xl bg-surface border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">
                      Corner Radius
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">
                      {colors.radius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="2"
                    value={colors.radius}
                    onChange={(e) =>
                      updateColor('radius', parseInt(e.target.value))
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Sharp (0px)</span>
                    <span>Smooth (12px)</span>
                    <span>Pill (24px)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                CSS Variables Code
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Copy and paste these CSS custom properties into your global CSS
                to reproduce this customized theme anywhere.
              </p>
              <div className="relative">
                <pre className="p-4 rounded-xl bg-surface font-mono text-xs text-foreground border border-border overflow-x-auto leading-relaxed">
{`:root {
  --primary: ${colors.primary};
  --background: ${colors.background};
  --surface: ${colors.surface};
  --foreground: ${colors.foreground};
  --border: ${colors.border};
  --accent: ${colors.accent};
  --radius: ${colors.radius}px;
}`}
                </pre>
                <button
                  onClick={handleCopyConfig}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-surface-elevated border border-border text-foreground hover:bg-surface-subtle transition-colors"
                  title="Copy Code"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Changes apply in real time
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};
