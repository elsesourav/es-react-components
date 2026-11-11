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
  MousePointerClick,
  FileText,
  ToggleLeft,
  ScrollText,
  Type,
  BarChart2,
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
  const [activeScope, setActiveScope] = useState('All');
  const [themeCustomizerOpen, setThemeCustomizerOpen] = useState(false);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const { toggleDark, setPreset } = useTheme();

  const scopes = useMemo(
    () => [
      'All',
      'Buttons & Actions',
      'Inputs & Fields',
      'Checkbox & Switch',
      'Sliders & Range',
      'Navigation & Menus',
      'Surfaces & Cards',
      'AI & Agentic UX',
    ],
    []
  );

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
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
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
      'Buttons & Actions': <MousePointerClick className="size-3.5 text-primary" />,
      'Inputs & Fields': <FileText className="size-3.5 text-blue-400" />,
      'Checkbox & Switch': <ToggleLeft className="size-3.5 text-amber-400" />,
      'Sliders & Range': <SlidersHorizontal className="size-3.5 text-orange-400" />,
      'Navigation & Menus': <Globe className="size-3.5 text-emerald-400" />,
      'Scroll & Viewport': <ScrollText className="size-3.5 text-teal-400" />,
      'Feedback & Overlays': <Zap className="size-3.5 text-rose-400" />,
      'Typography & Content': <Type className="size-3.5 text-violet-400" />,
      'Surfaces & Cards': <Layers className="size-3.5 text-indigo-400" />,
      'Data & Analytics': <BarChart2 className="size-3.5 text-cyan-400" />,
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
      setExpandedCategories((prev) => (prev.includes(catId) ? prev : [...prev, catId]));
    }
  }, [activeComponent]);

  const handleExpandedChange = (next: string[]) => {
    setExpandedCategories(next);
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

  const scopedCommandItems = useMemo(() => {
    if (activeScope === 'All') return commandItems;
    return commandItems.filter((item) => {
      if (item.id.startsWith('act-')) return true;
      return item.hint === activeScope;
    });
  }, [commandItems, activeScope]);

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
    <div className="h-screen w-full bg-background text-foreground flex flex-row font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-200 overflow-hidden">
      {/* 1. Permanent Left Sidebar (Flush Left, Full Height, Matching Reference Image 2) */}
      <AppSidebar
        treeNodes={treeNodes}
        selectedId={selectedId}
        onSelect={handleTreeSelect}
        expandedCategories={expandedCategories}
        onExpandedChange={handleExpandedChange}
        totalComponents={COMPONENTS_DATA.length}
      />

      {/* 2. Main Content Column on the Right */}
      <div
        ref={mainScrollRef}
        id="main-scroll-container"
        className="flex-1 min-w-0 h-screen flex flex-col bg-background overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-border/80 hover:scrollbar-thumb-primary/50"
      >
        <AppNavbar
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenCommand={() => setCommandOpen(true)}
          onSelectComponent={handleSelectComponent}
          onOpenThemeCustomizer={() => setThemeCustomizerOpen(true)}
          totalComponents={COMPONENTS_DATA.length}
          activeComponent={activeComponent}
        />

        <main className="flex-1 w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-8">
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

        <AppFooter
          onSelectComponent={handleSelectComponent}
          onOpenThemeCustomizer={() => setThemeCustomizerOpen(true)}
        />
      </div>

      <CommandPalette
        open={commandOpen}
        onDismiss={() => setCommandOpen(false)}
        items={scopedCommandItems}
        onSelect={handleCommandSelect}
        scopes={scopes}
        activeScope={activeScope}
        onScopeChange={setActiveScope}
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
              accordion={false}
            />
          </div>
        </div>
      </Modal>

      <ThemeCustomizer
        open={themeCustomizerOpen}
        onOpenChange={setThemeCustomizerOpen}
        showFloatingTrigger={false}
      />
    </div>
  );
};
