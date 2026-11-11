import React from 'react';
import { Logo } from '../ui';

export interface AppFooterProps {
  onSelectComponent: (id: string | null) => void;
  onOpenThemeCustomizer: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  onSelectComponent,
  onOpenThemeCustomizer,
}) => {
  return (
    <footer className="mt-auto shrink-0 border-t border-border/70 bg-surface/50 backdrop-blur-xs py-6 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <Logo size={24} variant="badge" className="shrink-0" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground text-xs sm:text-sm tracking-tight">
              es-react-components
            </span>
            <span className="px-1.5 py-0.2 rounded border border-primary/20 bg-primary/10 text-primary font-mono text-[9px] font-semibold">
              v1.0.0
            </span>
          </div>
          <span className="text-muted-foreground/60 hidden md:inline">•</span>
          <span className="text-[11px] text-muted-foreground hidden md:inline">
            Production-grade React 19 UI component library
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 text-xs">
          <button
            type="button"
            onClick={() => onSelectComponent(null)}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onSelectComponent('filter-grid')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Catalog
          </button>
          <button
            type="button"
            onClick={onOpenThemeCustomizer}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Theme Engine
          </button>
          <a
            href="https://github.com/elsesourav/es-react-components"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <span className="text-muted-foreground/60 hidden lg:inline">•</span>
          <span className="text-[11px] text-muted-foreground hidden lg:inline">
            MIT License
          </span>
        </div>
      </div>
    </footer>
  );
};
