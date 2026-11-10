import React, { useState, useMemo, useEffect, useRef } from 'react';
import { COMPONENTS_DATA, ComponentDoc } from './showcase/componentsData';
import { ComponentDocView } from './showcase/ComponentDocView';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import {
  Button,
  ReadingProgress,
  CollapsibleBanner,
  CommandPalette,
  CommandItem,
  Modal,
  TreeView,
  TreeNode,
  Logo,
} from './components/ui';
import { AppNavbar } from './components/app/AppNavbar';
import { AppSidebar } from './components/app/AppSidebar';
import { AppHero } from './components/app/AppHero';
import { AppFooter } from './components/app/AppFooter';
import { useSeoMetadata } from './hooks/useSeoMetadata';
import {
  Search,
  Sparkles,
  Layers,
  Sun,
  Palette,
  Zap,
  Globe,
  SlidersHorizontal,
  Folder,
  LayoutGrid,
  Cpu,
} from 'lucide-react';
import { useTheme } from './theme/ThemeContext';

export const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('component');
      if (c === 'overview' || c === 'all') return null;
      if (c && COMPONENTS_DATA.some((comp) => comp.id === c)) {
        return c;
      }
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#/', '').replace('#', '');
        if (hashId === 'overview' || hashId === 'all') return null;
        if (COMPONENTS_DATA.some((comp) => comp.id === hashId)) {
          return hashId;
        }
      }
      if (params.has('component') && !c) return null;
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [themeCustomizerOpen, setThemeCustomizerOpen] = useState(false);
  const { toggleDark, setPreset } = useTheme();

  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (selectedId) {
        url.searchParams.set('component', selectedId);
      } else {
        url.searchParams.delete('component');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedId]);

  const filteredComponents = useMemo(() => {
    return COMPONENTS_DATA.filter((comp) => {
      const q = searchQuery.toLowerCase();
      return (
        comp.name.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const categories = useMemo(() => {
    const map = new Map<string, ComponentDoc[]>();
    for (const comp of filteredComponents) {
      if (!map.has(comp.category)) {
        map.set(comp.category, []);
      }
      map.get(comp.category)!.push(comp);
    }
    return map;
  }, [filteredComponents]);

  const activeComponent = useMemo(() => {
    return COMPONENTS_DATA.find((c) => c.id === selectedId) || null;
  }, [selectedId]);

  useSeoMetadata(activeComponent);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('component');
      if (c && COMPONENTS_DATA.some((comp) => comp.id === c)) {
        setSelectedId(c);
      } else {
        setSelectedId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectComponent = (id: string | null) => {
    setSelectedId(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const treeNodes: TreeNode[] = useMemo(() => {
    const nodes: TreeNode[] = [
      {
        id: '__overview__',
        label: 'Showcase Overview',
        icon: <LayoutGrid className="size-3.5 text-primary" />,
        meta: `${COMPONENTS_DATA.length}`,
      },
    ];

    const categoryIcons: Record<string, React.ReactNode> = {
      General: <Sparkles className="size-3.5 text-primary" />,
      'Surfaces & Layout': <Layers className="size-3.5 text-indigo-400" />,
      Forms: <SlidersHorizontal className="size-3.5 text-amber-400" />,
      Feedback: <Zap className="size-3.5 text-rose-400" />,
      Navigation: <Globe className="size-3.5 text-emerald-400" />,
      'AI & Agentic UX': <Cpu className="size-3.5 text-purple-400" />,
    };

    Array.from(categories.entries()).forEach(([category, items]) => {
      nodes.push({
        id: `cat-${category}`,
        label: category,
        meta: `${items.length}`,
        icon: categoryIcons[category] || <Folder className="size-3.5 text-muted-foreground" />,
        children: items.map((item) => ({
          id: item.id,
          label: item.name,
        })),
      });
    });

    return nodes;
  }, [categories]);

  const handleTreeSelect = (id: string) => {
    if (id === '__overview__') {
      handleSelectComponent(null);
    } else if (!id.startsWith('cat-')) {
      handleSelectComponent(id);
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (activeComponent) {
      const catId = `cat-${activeComponent.category}`;
      setExpandedCategories([catId]);
    }
  }, [activeComponent]);

  const handleExpandedChange = (next: string[]) => {
    if (next.length > 1) {
      const newlyAdded = next.find((id) => !expandedCategories.includes(id));
      setExpandedCategories(newlyAdded ? [newlyAdded] : [next[next.length - 1]]);
    } else {
      setExpandedCategories(next);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedCategories(Array.from(categories.keys()).map((c) => `cat-${c}`));
    }
  }, [searchQuery, categories]);

  const commandItems: CommandItem[] = useMemo(() => {
    const componentCommands: CommandItem[] = COMPONENTS_DATA.map((c) => ({
      id: `comp-${c.id}`,
      label: c.name,
      hint: c.category,
      keywords: `${c.name} ${c.category} ${c.description}`,
      icon: <Layers className="size-4 text-primary" />,
    }));

    const actionCommands: CommandItem[] = [
      {
        id: 'act-overview',
        label: 'Showcase Overview',
        hint: 'Home',
        shortcut: ['G', 'H'],
        icon: <Layers className="size-4 text-primary" />,
      },
      {
        id: 'act-toggle-dark',
        label: 'Toggle Dark / Light Theme',
        hint: 'Appearance',
        shortcut: ['T', 'D'],
        icon: <Sun className="size-4 text-warning" />,
      },
      {
        id: 'act-theme-editor',
        label: 'Open Theme Customizer',
        hint: 'Color Tokens',
        shortcut: ['T', 'E'],
        icon: <Palette className="size-4 text-primary" />,
      },
      {
        id: 'act-preset-midnight',
        label: 'Preset: Midnight Space',
        hint: 'Theme',
        icon: <Sparkles className="size-4 text-indigo-400" />,
      },
      {
        id: 'act-preset-light',
        label: 'Preset: Clean Light',
        hint: 'Theme',
        icon: <Sun className="size-4 text-amber-400" />,
      },
      {
        id: 'act-preset-cyberpunk',
        label: 'Preset: Cyberpunk Neon',
        hint: 'Theme',
        icon: <Zap className="size-4 text-cyan-400" />,
      },
    ];

    return [...actionCommands, ...componentCommands];
  }, []);

  const handleCommandSelect = (item: CommandItem) => {
    setCommandOpen(false);
    if (item.id === 'act-overview') {
      handleSelectComponent(null);
    } else if (item.id === 'act-toggle-dark') {
      toggleDark();
    } else if (item.id === 'act-theme-editor') {
      setThemeCustomizerOpen(true);
    } else if (item.id.startsWith('act-preset-')) {
      const p = item.id.replace('act-preset-', '');
      if (p === 'light') setPreset('minimal-light');
      else setPreset(p as any);
    } else if (item.id.startsWith('comp-')) {
      const compId = item.id.replace('comp-', '');
      handleSelectComponent(compId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-200">
      <AppNavbar
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onOpenCommand={() => setCommandOpen(true)}
        onSelectComponent={handleSelectComponent}
        onOpenThemeCustomizer={() => setThemeCustomizerOpen(true)}
        totalComponents={COMPONENTS_DATA.length}
      />

      <CommandPalette
        open={commandOpen}
        onDismiss={() => setCommandOpen(false)}
        items={commandItems}
        onSelect={handleCommandSelect}
        placeholder="Type a component name, category, or command..."
      />

      <Modal
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title={
          <div className="flex items-center gap-2.5">
            <Logo size={24} variant="badge" />
            <span>Component Directory</span>
          </div>
        }
        description="Select a component to inspect its interactive playground and documentation."
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold text-muted-foreground">
              {COMPONENTS_DATA.length} Components
            </span>
            {expandedCategories.length > 0 && (
              <button
                type="button"
                onClick={() => setExpandedCategories([])}
                className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
              >
                Collapse
              </button>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <TreeView
              label="Mobile Component Directory Tree"
              nodes={treeNodes}
              selected={selectedId || '__overview__'}
              onSelectedChange={handleTreeSelect}
              expanded={expandedCategories}
              onExpandedChange={handleExpandedChange}
              accordion={true}
            />
          </div>
        </div>
      </Modal>

      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        <AppSidebar
          treeNodes={treeNodes}
          selectedId={selectedId}
          onSelect={handleTreeSelect}
          expandedCategories={expandedCategories}
          onExpandedChange={handleExpandedChange}
          totalComponents={COMPONENTS_DATA.length}
        />

        <main className="flex-1 min-w-0">
          {activeComponent ? (
            <ComponentDocView
              component={activeComponent}
              onSelectOverview={() => handleSelectComponent(null)}
            />
          ) : (
            <AppHero
              components={COMPONENTS_DATA}
              onSelectComponent={handleSelectComponent}
              onOpenCommand={() => setCommandOpen(true)}
            />
          )}
        </main>
      </div>

      <AppFooter
        onSelectComponent={handleSelectComponent}
        onOpenThemeCustomizer={() => setThemeCustomizerOpen(true)}
      />

      <ThemeCustomizer
        open={themeCustomizerOpen}
        onOpenChange={setThemeCustomizerOpen}
        showFloatingTrigger={false}
      />
    </div>
  );
};
