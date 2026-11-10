import React from 'react';
import { Badge, Tooltip, Logo } from '../ui';
import {
  Search,
  Sun,
  Moon,
  ChevronDown,
  Palette,
  Menu,
} from 'lucide-react';
import { useTheme, ThemePresetKey } from '../../theme/ThemeContext';

export interface AppNavbarProps {
  onOpenMobileMenu: () => void;
  onOpenCommand: () => void;
  onSelectComponent: (id: string | null) => void;
  onOpenThemeCustomizer: () => void;
  totalComponents: number;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  onOpenMobileMenu,
  onOpenCommand,
  onSelectComponent,
  onOpenThemeCustomizer,
  totalComponents,
}) => {
  const { isDark, toggleDark, preset, setPreset } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-border/80 bg-surface/90 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 lg:px-8 transition-colors">
      {/* Left: Hamburger (mobile) + Brand Lockup */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden size-8 flex items-center justify-center rounded-lg border border-border/80 bg-surface text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => onSelectComponent(null)}
          className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer select-none"
          aria-label="es-react-components home"
        >
          <Logo
            size={30}
            variant="badge"
            className="shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-foreground tracking-tight leading-none">
              es-react-components
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-primary/20 bg-primary/10 text-primary font-mono text-[10px] font-bold leading-none">
              v1.0
            </span>
          </div>
        </button>
      </div>

      {/* Center: Global Search Trigger (Desktop & Tablet) */}
      <div className="relative max-w-xs w-full hidden md:block mx-4">
        <button
          type="button"
          onClick={onOpenCommand}
          className="w-full h-8 bg-surface border border-border/80 rounded-lg pl-8 pr-2.5 text-xs text-muted-foreground hover:border-primary/50 focus:outline-none flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
          aria-label="Search components"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="size-3.5 text-muted-foreground absolute left-2.5" />
            <span className="truncate">Search {totalComponents}+ components...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded border border-border/80 bg-surface-subtle font-mono text-[9px] text-muted-foreground font-semibold shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions & Theme Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Mobile Search Icon Button */}
        <button
          type="button"
          onClick={onOpenCommand}
          className="md:hidden size-8 flex items-center justify-center rounded-lg border border-border/80 bg-surface text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
          aria-label="Search components"
        >
          <Search className="size-3.5 text-muted-foreground" />
        </button>

        {/* Theme Preset Selector */}
        <div className="relative flex items-center">
          <Palette className="absolute left-2 size-3 text-primary pointer-events-none hidden sm:block" />
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value as ThemePresetKey)}
            className="h-8 sm:pl-7 pl-2.5 pr-6 text-xs font-medium rounded-lg bg-surface border border-border/80 text-foreground hover:bg-surface-subtle focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer appearance-none transition-colors shadow-2xs"
            aria-label="Theme Preset"
          >
            <option value="midnight">Midnight</option>
            <option value="minimal-light">Minimal Light</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="emerald">Emerald</option>
            <option value="sunset">Sunset</option>
            <option value="ocean">Ocean</option>
          </select>
          <ChevronDown className="absolute right-2 size-3 text-muted-foreground pointer-events-none" />
        </div>

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

        {/* Theme Tokens Trigger Button */}
        <Tooltip label="Design Tokens Editor">
          <button
            type="button"
            onClick={onOpenThemeCustomizer}
            className="h-8 px-2.5 text-xs font-medium rounded-lg border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Tokens</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
};
