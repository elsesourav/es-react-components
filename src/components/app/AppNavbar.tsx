import React, { useState, useRef, useEffect } from 'react';
import { Badge, Tooltip, Logo, Dropdown, SearchButton, useToast } from '../ui';
import { cn } from '@/lib/utils';
import {
  Sun,
  Moon,
  Palette,
  Menu,
  ChevronDown,
  Copy,
  ExternalLink,
  Check,
  Package,
} from 'lucide-react';
import { useTheme, ThemePresetKey } from '../../theme/ThemeContext';
import type { ComponentDoc } from '../../showcase/componentsData';

export interface AppNavbarProps {
  onOpenMobileMenu: () => void;
  onOpenCommand: () => void;
  onSelectComponent: (id: string | null) => void;
  onOpenThemeCustomizer: () => void;
  totalComponents: number;
  activeComponent?: ComponentDoc | null;
}

const PRESET_OPTIONS = [
  { value: 'midnight', label: 'Midnight' },
  { value: 'minimal-light', label: 'Minimal Light' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'ocean', label: 'Ocean' },
];

export const AppNavbar: React.FC<AppNavbarProps> = ({
  onOpenMobileMenu,
  onOpenCommand,
  onSelectComponent,
  onOpenThemeCustomizer,
  totalComponents,
  activeComponent,
}) => {
  const { isDark, toggleDark, preset, setPreset } = useTheme();
  const { addToast } = useToast();
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const versionMenuRef = useRef<HTMLDivElement>(null);

  const currentVersion = "1.0.0";
  const packageName = "@elsesourav/react-ui";

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (versionMenuRef.current && !versionMenuRef.current.contains(e.target as Node)) {
        setShowVersionMenu(false);
      }
    };
    if (showVersionMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showVersionMenu]);

  const handleCopyInstall = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast({
      title: 'Command Copied!',
      description: cmd,
      type: 'success',
    });
  };

  return (
    <header className="sticky top-0 z-20 h-14 shrink-0 w-full border-b border-border/80 bg-background/95 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 lg:px-8 transition-colors select-none">
      {/* Left: Mobile Menu Trigger + Brand & Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        {/* Mobile Hamburger Trigger (< md) */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden size-8 shrink-0 flex items-center justify-center rounded-lg border border-border/80 bg-surface text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </button>

        {/* Mobile Brand */}
        <div className="md:hidden flex items-center gap-1.5 min-w-0">
          <Logo size={20} variant="badge" className="shrink-0" />
          <span className="font-bold text-xs text-foreground truncate">
            es-react
          </span>
        </div>

        {/* Version Update Control Pill (Desktop & Mobile) */}
        <div className="relative" ref={versionMenuRef}>
          <button
            type="button"
            onClick={() => setShowVersionMenu(!showVersionMenu)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 text-[11px] font-mono font-semibold transition-all cursor-pointer shadow-2xs"
            aria-label="Version update control and package details"
          >
            <span>v{currentVersion}</span>
            <ChevronDown className="size-3 opacity-70" />
          </button>

          {/* Version Update Control Popover */}
          {showVersionMenu && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-border bg-surface-elevated/95 p-3.5 shadow-xl backdrop-blur-xl z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold">
                    <Package className="size-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{packageName}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">v{currentVersion} (Latest Release)</div>
                  </div>
                </div>
                <Badge variant="success" size="sm">Stable</Badge>
              </div>

              {/* Install Command */}
              <div className="space-y-1.5 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                  Install Package:
                </span>
                <div
                  onClick={() => handleCopyInstall(`npm i ${packageName}`)}
                  className="flex items-center justify-between p-2 rounded-xl bg-surface border border-border/80 font-mono text-[11px] text-foreground hover:border-primary/50 transition-colors cursor-pointer group"
                >
                  <span className="truncate">npm i {packageName}</span>
                  {copied ? (
                    <Check className="size-3 text-emerald-500 shrink-0" />
                  ) : (
                    <Copy className="size-3 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  )}
                </div>
              </div>

              {/* Upgrade Command */}
              <div className="space-y-1.5 mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                  Update to Latest:
                </span>
                <div
                  onClick={() => handleCopyInstall(`npm i ${packageName}@latest`)}
                  className="flex items-center justify-between p-2 rounded-xl bg-surface border border-border/80 font-mono text-[11px] text-foreground hover:border-primary/50 transition-colors cursor-pointer group"
                >
                  <span className="truncate">npm i {packageName}@latest</span>
                  <Copy className="size-3 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                <a
                  href={`https://www.npmjs.com/package/${packageName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  <span>NPM Registry</span>
                  <ExternalLink className="size-3" />
                </a>
                <a
                  href="https://github.com/elsesourav/es-react-components/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                  <span>Changelog</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Breadcrumb Path */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground min-w-0 truncate ml-1">
          <button
            type="button"
            onClick={() => onSelectComponent(null)}
            className="hover:text-foreground transition-colors cursor-pointer truncate"
          >
            Components
          </button>

          <span className="text-muted-foreground/40 font-mono">·</span>

          {activeComponent ? (
            <>
              <span className="text-muted-foreground truncate max-w-[140px] lg:max-w-none">
                {activeComponent.category}
              </span>
              <span className="text-muted-foreground/40 font-mono">·</span>
              <span className="text-foreground font-semibold truncate max-w-[180px] lg:max-w-none">
                {activeComponent.name}
              </span>
            </>
          ) : (
            <span className="text-foreground font-semibold">
              Showcase Overview
            </span>
          )}
        </nav>
      </div>

      {/* Right: Search + Theme Preset Dropdown + Theme Customizer + Dark Mode */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-2">
        {/* Top Search Button Trigger */}
        <div className="w-44 sm:w-56 lg:w-64 shrink-0">
          <SearchButton
            onClick={onOpenCommand}
            prefix="Search "
            words={[
              `${totalComponents}+ components`,
              'buttons & inputs',
              'sliders & range',
              'tabs & navigation',
              'AI & agentic UX',
            ]}
            shortcutText="⌘ K"
            size="sm"
            variant="pill"
            className="w-full"
          />
        </div>

        {/* Library's Animated Dropdown for Theme Presets */}
        <div className="hidden sm:block w-36">
          <Dropdown
            items={PRESET_OPTIONS}
            value={preset}
            onChange={(val) => setPreset(val as ThemePresetKey)}
            placeholder="Theme Preset"
            aria-label="Theme Preset"
            className="w-full text-xs"
          />
        </div>

        {/* Redesigned Theme Customizer Button */}
        <Tooltip label="Customize Theme Tokens & Presets">
          <button
            type="button"
            onClick={onOpenThemeCustomizer}
            className="h-8 px-2.5 text-xs font-semibold rounded-lg border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            aria-label="Open theme customizer"
          >
            <Palette className="size-3.5 text-primary" />
            <span className="hidden sm:inline">Theme</span>
          </button>
        </Tooltip>

        {/* Light / Dark Mode Toggle */}
        <Tooltip label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}>
          <button
            type="button"
            onClick={toggleDark}
            className="size-8 flex items-center justify-center rounded-lg border border-border/80 bg-surface text-foreground hover:bg-surface-subtle hover:border-border-strong transition-colors cursor-pointer"
            aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-primary" />}
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default AppNavbar;
