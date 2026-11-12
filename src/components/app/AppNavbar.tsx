import React from 'react';
import { Badge, Tooltip, Logo, NativeSelect, SearchButton } from '../ui';
import { cn } from '@/lib/utils';
import {
  Sun,
  Moon,
  Palette,
  Menu,
  ChevronRight,
  Layers,
  Sparkles,
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

export const AppNavbar: React.FC<AppNavbarProps> = ({
  onOpenMobileMenu,
  onOpenCommand,
  onSelectComponent,
  onOpenThemeCustomizer,
  totalComponents,
  activeComponent,
}) => {
  const {
    isDark,
    toggleDark,
    preset,
    setPreset,
    tactileShadows,
    toggleTactileShadows,
  } = useTheme();

  return (
    <header className="sticky top-0 z-20 h-14 shrink-0 w-full border-b border-border/80 bg-background/95 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 lg:px-8 transition-colors select-none">
      {/* Left: Mobile Menu Trigger + Breadcrumb (Matching Reference Image 2 Top-Left) */}
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

        {/* Mobile Brand for tiny screens when sidebar is hidden */}
        <div className="md:hidden flex items-center gap-1.5 min-w-0">
          <Logo size={20} variant="badge" className="shrink-0" />
          <span className="font-bold text-xs text-foreground truncate">
            es-react
          </span>
        </div>

        {/* Desktop Breadcrumb Path (Matching Reference Image 2: "Components · Category · Name") */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground min-w-0 truncate">
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

      {/* Right: Search + Theme Controls (Matching Reference Image 2 Top-Right) */}
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

        {/* Theme Preset Selector */}
        <div className="relative hidden sm:flex items-center">
          <Palette className="absolute left-2.5 z-10 size-3 text-primary pointer-events-none" />
          <NativeSelect
            value={preset}
            onChange={(e) => setPreset(e.target.value as ThemePresetKey)}
            sizeVariant="sm"
            className="pl-7 pr-7 font-medium shadow-2xs text-xs h-8"
            aria-label="Theme Preset"
            options={[
              { value: 'midnight', label: 'Midnight' },
              { value: 'minimal-light', label: 'Minimal Light' },
              { value: 'cyberpunk', label: 'Cyberpunk' },
              { value: 'emerald', label: 'Emerald' },
              { value: 'sunset', label: 'Sunset' },
              { value: 'ocean', label: 'Ocean' },
            ]}
          />
        </div>

        {/* Tactile Specular Shadows Toggle */}
        <Tooltip label={tactileShadows ? "Tactile Shadows: ON (Specular Depth)" : "Tactile Shadows: OFF (Flat Depth)"}>
          <button
            type="button"
            onClick={toggleTactileShadows}
            className={cn(
              "size-8 sm:h-8 sm:w-auto sm:px-2.5 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer",
              tactileShadows
                ? "border-primary/50 bg-primary/10 text-primary shadow-lift"
                : "border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-subtle"
            )}
            aria-label={tactileShadows ? "Disable tactile shadows" : "Enable tactile shadows"}
          >
            <Sparkles className={cn("size-3.5", tactileShadows ? "text-primary fill-primary/30" : "text-muted-foreground")} />
            <span className="hidden md:inline">Tactile</span>
          </button>
        </Tooltip>

        {/* Theme Tokens Customizer Button */}
        <Tooltip label="Design Tokens Customizer">
          <button
            type="button"
            onClick={onOpenThemeCustomizer}
            className="size-8 sm:h-8 sm:w-auto sm:px-2.5 text-xs font-medium rounded-lg border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            aria-label="Open design tokens editor"
          >
            <Palette className="size-3.5 sm:hidden text-primary" />
            <span className="hidden sm:inline">Tokens</span>
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
