import React, { useState } from 'react';
import {
  Palette,
  X,
  RotateCcw,
  Sun,
  Moon,
  Sparkles,
  Sliders,
  Wand2,
} from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemePresetKey } from '@/theme/ThemeContext';
import { useToast } from '@/components/ui/toast';
import { lockScroll } from '@/lib/scrollLock';
import {
  Button,
  Badge,
  Tabs,
  Dropdown,
  AICodeBlock,
  Tooltip,
  ParameterSlider,
  ParameterColor,
  ParameterSwitch,
} from '@/components/ui';

export interface ThemeCustomizerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showFloatingTrigger?: boolean;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  open,
  onOpenChange,
  showFloatingTrigger = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'export'>('presets');
  const [exportFormat, setExportFormat] = useState<'css' | 'react' | 'tailwind' | 'json'>('css');

  const {
    preset,
    setPreset,
    colors,
    updateColor,
    harmonizeWithPrimary,
    isDark,
    toggleDark,
    resetTheme,
    tactileShadows,
    toggleTactileShadows,
  } = useTheme();

  const { addToast } = useToast();

  React.useEffect(() => {
    if (!isOpen) return;
    return lockScroll();
  }, [isOpen]);

  const cssLines = [
    '/* Custom Theme Tokens (Auto-Generated) */',
    ':root {',
    `  --primary: ${colors.primary};`,
    `  --accent: ${colors.accent};`,
    `  --background: ${colors.background};`,
    `  --surface: ${colors.surface};`,
    `  --foreground: ${colors.foreground};`,
    `  --border: ${colors.border};`,
    `  --radius: ${colors.radius}px;`,
    '}',
  ];

  const reactLines = [
    "import { ThemeProvider } from '@elsesourav/react-ui';",
    '',
    'export default function App() {',
    '  return (',
    '    <ThemeProvider',
    `      defaultPreset="${preset}"`,
    '      defaultColors={{',
    `        primary: '${colors.primary}',`,
    `        accent: '${colors.accent}',`,
    `        background: '${colors.background}',`,
    `        surface: '${colors.surface}',`,
    `        foreground: '${colors.foreground}',`,
    `        border: '${colors.border}',`,
    `        radius: ${colors.radius},`,
    '      }}',
    `      defaultTactileShadows={${tactileShadows}}`,
    '    >',
    '      <YourApplication />',
    '    </ThemeProvider>',
    '  );',
    '}',
  ];

  const tailwindLines = [
    '// tailwind.config.js - theme.extend.colors',
    'module.exports = {',
    '  theme: {',
    '    extend: {',
    '      colors: {',
    `        primary: '${colors.primary}',`,
    `        accent: '${colors.accent}',`,
    `        background: '${colors.background}',`,
    `        surface: '${colors.surface}',`,
    `        border: '${colors.border}',`,
    '      },',
    '      borderRadius: {',
    `        DEFAULT: '${colors.radius}px',`,
    '      },',
    '    },',
    '  },',
    '};',
  ];

  const jsonLines = JSON.stringify(
    {
      name: preset === 'custom' ? 'My Custom Theme' : THEME_PRESETS[preset as Exclude<ThemePresetKey, 'custom'>]?.name || preset,
      isDark,
      tactileShadows,
      colors,
    },
    null,
    2
  ).split('\n');

  const currentCodeLines =
    exportFormat === 'css'
      ? cssLines
      : exportFormat === 'react'
      ? reactLines
      : exportFormat === 'tailwind'
      ? tailwindLines
      : jsonLines;

  const currentFilename =
    exportFormat === 'css'
      ? 'theme.css'
      : exportFormat === 'react'
      ? 'ThemeProvider.tsx'
      : exportFormat === 'tailwind'
      ? 'tailwind.config.js'
      : 'theme.json';

  const handleHarmonize = () => {
    harmonizeWithPrimary();
    addToast({
      title: 'Palette Harmonized',
      description: `Generated cohesive ${isDark ? 'dark' : 'light'} palette from primary color.`,
      type: 'success',
    });
  };

  return (
    <>
      {showFloatingTrigger && (
        <Tooltip label="Customize Colors & Theme Tokens" side="top">
          <Button
            size="md"
            variant="primary"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 shadow-xl shadow-primary/25 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            leftIcon={<Palette className="size-4 animate-pulse" />}
          >
            <span className="hidden sm:inline">Theme Editor</span>
          </Button>
        </Tooltip>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity"
          style={{ touchAction: 'none' }}
          onTouchMove={(e) => e.preventDefault()}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface-elevated border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Theme Customizer</h3>
              <p className="text-xs text-muted-foreground">
                Real-time reactive HSL token engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip label="Toggle Light / Dark Mode">
              <Button size="xs" variant="outline" onClick={toggleDark}>
                {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              </Button>
            </Tooltip>
            <Tooltip label="Close Editor">
              <Button size="xs" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="size-4" />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Live Mini Preview Bar */}
        <div className="px-5 py-3 border-b border-border/60 bg-surface-subtle/50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button size="xs" variant="primary">
              Primary
            </Button>
            <Badge variant="outline" size="sm">
              Live Preview
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <span className="size-2 rounded-full bg-primary" />
            <span>radius: {colors.radius}px</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="p-3 border-b border-border bg-surface/50">
          <Tabs
            variant="segmented"
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId as any)}
            tabs={[
              { id: 'presets', label: 'Presets' },
              { id: 'custom', label: 'Color Palette' },
              { id: 'export', label: 'Export' },
            ]}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'presets' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Select a Design Preset
                  </span>
                  <Badge variant="outline" size="sm">
                    {Object.keys(THEME_PRESETS).length} Presets
                  </Badge>
                </div>

                <Dropdown
                  items={(
                    Object.keys(THEME_PRESETS) as Array<
                      Exclude<ThemePresetKey, 'custom'>
                    >
                  ).map((key) => ({
                    value: key,
                    label: THEME_PRESETS[key].name,
                    hint: THEME_PRESETS[key].isDark ? 'Dark Mode' : 'Light Mode',
                  }))}
                  value={preset}
                  onChange={(val) => {
                    setPreset(val as ThemePresetKey);
                    addToast({
                      title: 'Theme Applied',
                      description: `Switched to ${THEME_PRESETS[val as keyof typeof THEME_PRESETS]?.name || val}`,
                      type: 'success',
                    });
                  }}
                  placeholder="Choose design preset..."
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
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
                      onClick={() => {
                        setPreset(key);
                        addToast({ title: 'Theme Applied', description: `Switched to ${p.name}`, type: 'success' });
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/30 bg-surface shadow-sm'
                          : 'border-border bg-surface hover:border-primary/40 hover:bg-surface-subtle'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="size-3 rounded-full border border-black/20" style={{ backgroundColor: p.colors.primary }} />
                        <span className="size-3 rounded-full border border-black/20" style={{ backgroundColor: p.colors.surface }} />
                        <span className="size-3 rounded-full border border-black/20" style={{ backgroundColor: p.colors.background }} />
                      </div>
                      <div className="text-xs font-bold text-foreground">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{p.isDark ? 'Dark Mode' : 'Light Mode'}</div>
                    </button>
                  );
                })}
              </div>

              {/* Tactile Specular Shadows Toggle */}
              <div className="pt-2 border-t border-border">
                <ParameterSwitch
                  label="Tactile Specular Shadows"
                  checked={tactileShadows}
                  onChange={toggleTactileShadows}
                />
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Custom Color Palette
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={handleHarmonize}
                    leftIcon={<Wand2 className="size-3 text-primary" />}
                    title="Auto-generate matching palette from primary color"
                  >
                    Harmonize
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => {
                      resetTheme();
                      addToast({ title: 'Theme Reset', description: 'Restored default color tokens.', type: 'info' });
                    }}
                    leftIcon={<RotateCcw className="size-3" />}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Color Controls */}
              <div className="space-y-2.5">
                {[
                  { key: 'primary', label: 'Primary Brand' },
                  { key: 'accent', label: 'Accent Highlight' },
                  { key: 'background', label: 'Background' },
                  { key: 'surface', label: 'Surface & Cards' },
                  { key: 'foreground', label: 'Foreground Text' },
                  { key: 'border', label: 'Border Stroke' },
                ].map(({ key, label }) => {
                  const val = colors[key as keyof typeof colors] as string;
                  return (
                    <ParameterColor
                      key={key}
                      label={label}
                      value={val}
                      onChange={(c) => updateColor(key as any, c)}
                    />
                  );
                })}

                <ParameterSlider
                  label="Corner Radius"
                  value={colors.radius}
                  onChange={(r) => updateColor('radius', r)}
                  min={0}
                  max={28}
                  step={2}
                  unit="px"
                />
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Export Theme Code
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Choose a format to copy into your application or design system.
                </p>
              </div>

              {/* Format Selector */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-surface border border-border">
                {[
                  { id: 'css', label: 'CSS' },
                  { id: 'react', label: 'React' },
                  { id: 'tailwind', label: 'Tailwind' },
                  { id: 'json', label: 'JSON' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setExportFormat(fmt.id as any)}
                    className={`text-xs py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      exportFormat === fmt.id
                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>

              <AICodeBlock filename={currentFilename} lines={currentCodeLines} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Tokens apply in real time
          </span>
          <Button size="sm" variant="primary" onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </div>
      </div>
    </>
  );
};
