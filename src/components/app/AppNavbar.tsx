import React from 'react';
import { Badge, Tooltip, Logo, NativeSelect, SearchButton } from '../ui';
import {
  Search,
  Sun,
  Moon,
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
    <header className="sticky top-0 z-30 h-14 w-full border-b border-border/80 bg-surface/90 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 lg:px-8 transition-colors">
      {/* Left: Hamburger (mobile) + Brand Lockup */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden size-8 shrink-0 flex items-center justify-center rounded-lg border border-border/80 bg-surface text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => onSelectComponent(null)}
          className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer select-none min-w-0"
          aria-label="es-react-components home"
        >
          <Logo
            size={28}
            variant="badge"
            className="shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-bold text-sm sm:text-base text-foreground tracking-tight leading-none truncate max-w-[130px] sm:max-w-none">
              es-react-components
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md border border-primary/20 bg-primary/10 text-primary font-mono text-[10px] font-bold leading-none shrink-0">
              v1.0
            </span>
          </div>
        </button>
      </div>

      {/* Center: Global Search Trigger (Desktop & Tablet) */}
      <div className="relative max-w-xs lg:max-w-sm w-full hidden md:block mx-4">
        <SearchButton
          onClick={onOpenCommand}
          prefix="Search "
          words={[
            `${totalComponents}+ components`,
            "buttons & inputs",
            "sliders & range",
            "navigation & tabs",
            "charts & analytics",
            "AI & prompt bars",
          ]}
          sectionLabel="Components >"
          className="w-full"
        />
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

        {/* Theme Preset Selector (hidden on mobile xs, visible on sm+) */}
        <div className="relative hidden sm:flex items-center">
          <Palette className="absolute left-2.5 z-10 size-3 text-primary pointer-events-none" />
          <NativeSelect
            value={preset}
            onChange={(e) => setPreset(e.target.value as ThemePresetKey)}
            sizeVariant="sm"
            className="pl-7 pr-7 font-medium shadow-2xs"
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
            className="size-8 sm:h-8 sm:w-auto sm:px-2.5 text-xs font-medium rounded-lg border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            aria-label="Open design tokens editor"
          >
            <Palette className="size-3.5 sm:hidden text-primary" />
            <span className="hidden sm:inline">Tokens</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
};
