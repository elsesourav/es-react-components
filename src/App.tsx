import React, { useState, useMemo, useEffect } from 'react';
import {
  COMPONENTS_DATA,
  ComponentDoc,
} from './showcase/componentsData';
import { ComponentDocView } from './showcase/ComponentDocView';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Stat,
  ReadingProgress,
  CollapsibleBanner,
  PresenceAvatars,
  CommandPalette,
  CommandItem,
  FilterGrid,
  TextReveal,
  LogoMarquee,
  ShowMore,
  Tooltip,
  Modal,
} from './components/ui';
import {
  Search,
  Sparkles,
  Layers,
  Sun,
  Moon,
  ChevronRight,
  Palette,
  Menu,
  Zap,
  Globe,
  Rocket,
  Hash,
  Server,
  Tag,
} from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemePresetKey } from './theme/ThemeContext';

const TECH_STACK_ITEMS = [
  { id: 'react', label: 'React 19', mark: <Zap className="size-4 text-cyan-400" /> },
  { id: 'tailwind', label: 'Tailwind CSS', mark: <Sparkles className="size-4 text-sky-400" /> },
  { id: 'motion', label: 'Motion React', mark: <Rocket className="size-4 text-purple-400" /> },
  { id: 'ts', label: 'TypeScript 5.7', mark: <Hash className="size-4 text-blue-400" /> },
  { id: 'vite', label: 'Vite 6', mark: <Server className="size-4 text-amber-400" /> },
  { id: 'radix', label: 'Radix Primitives', mark: <Layers className="size-4 text-emerald-400" /> },
  { id: 'lucide', label: 'Lucide Icons', mark: <Tag className="size-4 text-rose-400" /> },
  { id: 'hsl', label: 'Dynamic HSL Engine', mark: <Palette className="size-4 text-indigo-400" /> },
];

const ACTIVE_DESIGNERS = [
  { id: 'p1', name: 'Alex Rivera' },
  { id: 'p2', name: 'Sarah Chen' },
  { id: 'p3', name: 'Marcus Vance' },
  { id: 'p4', name: 'Elena Rostova' },
  { id: 'p5', name: 'David Kim' },
];

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
    return null; // Default to full Showcase Overview!
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { isDark, toggleDark, preset, setPreset } = useTheme();

  // Global keyboard shortcut ⌘K / Ctrl+K for CommandPalette
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

  // Sync selectedId with URL query
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

  const handleSelectComponent = (id: string | null) => {
    setSelectedId(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      const trigger = document.querySelector('button[title*="Theme"]') || document.querySelector('button[aria-label*="Theme"]');
      if (trigger) (trigger as HTMLElement).click();
    } else if (item.id.startsWith('act-preset-')) {
      const p = item.id.replace('act-preset-', '');
      if (p === 'light') setPreset('minimal-light');
      else setPreset(p as any);
    } else if (item.id.startsWith('comp-')) {
      const compId = item.id.replace('comp-', '');
      handleSelectComponent(compId);
    }
  };

  const categoryFilters = useMemo(
    () => [
      { id: 'all', label: 'All Components', match: () => true },
      { id: 'General', label: 'General', match: (c: ComponentDoc) => c.category === 'General' },
      { id: 'Forms', label: 'Forms', match: (c: ComponentDoc) => c.category === 'Forms' },
      { id: 'Surfaces & Layout', label: 'Surfaces & Layout', match: (c: ComponentDoc) => c.category === 'Surfaces & Layout' },
      { id: 'Feedback', label: 'Feedback', match: (c: ComponentDoc) => c.category === 'Feedback' },
      { id: 'Navigation', label: 'Navigation', match: (c: ComponentDoc) => c.category === 'Navigation' },
      { id: 'AI & Agentic UX', label: 'AI & Agentic UX', match: (c: ComponentDoc) => c.category === 'AI & Agentic UX' },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-200">
      {/* Live Reading Progress Top Bar */}
      <ReadingProgress className="fixed top-0 inset-x-0 z-50 h-[3px] pointer-events-none" />

      {/* Release Announcement Banner */}
      <CollapsibleBanner
        variant="info"
        title="es-react-components v1.0 • Modern Theme-Driven Design System"
        description="93 production-grade React 19 components with fluid kinetic physics, full WAI-ARIA accessibility, and real-time HSL theming."
        action={
          <Button size="xs" variant="primary" onClick={() => handleSelectComponent('filter-grid')}>
            Explore Catalog
          </Button>
        }
        defaultCollapsed={false}
      />

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 h-16 border-b border-border bg-surface/85 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Hamburger */}
          <Button
            size="xs"
            variant="outline"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2"
          >
            <Menu className="size-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleSelectComponent(null)}
            className="flex items-center gap-2.5 px-1 hover:bg-transparent"
          >
            <div className="p-2 rounded-xl bg-primary text-primary-foreground font-black text-sm shadow-md shadow-primary/20 hover:scale-105 transition-transform">
              ES
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-foreground leading-none">
                  es-react-components
                </span>
                <Badge variant="outline" size="sm" className="hidden sm:inline font-mono text-[10px]">
                  v1.0.0
                </Badge>
              </div>
              <span className="text-[11px] text-muted-foreground hidden lg:inline">
                Theme-Driven Component System
              </span>
            </div>
          </Button>
        </div>

        {/* Global Spotlight Search Trigger (Desktop) */}
        <div className="relative max-w-xs w-full hidden md:block">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="w-full bg-surface border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-muted-foreground hover:border-primary/40 focus:outline-none flex items-center justify-between shadow-xs transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="size-3.5 text-muted-foreground" />
              <span>Search {COMPONENTS_DATA.length}+ components...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface-subtle font-mono text-[10px] text-muted-foreground font-semibold">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Team Presence Avatars */}
          <div className="hidden xl:flex items-center mr-2">
            <PresenceAvatars people={ACTIVE_DESIGNERS} max={3} size={26} label="Active System Collaborators" />
          </div>

          {/* Preset Switcher Pills */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-surface border border-border">
            {(
              [
                ['midnight', 'Midnight'],
                ['minimal-light', 'Light'],
                ['cyberpunk', 'Cyberpunk'],
                ['emerald', 'Emerald'],
                ['sunset', 'Sunset'],
              ] as [ThemePresetKey, string][]
            ).map(([key, label]) => (
              <Tooltip key={key} label={`Switch to ${label} theme`}>
                <Button
                  size="xs"
                  variant={preset === key ? 'primary' : 'ghost'}
                  onClick={() => setPreset(key)}
                  className="px-2.5 py-1 text-xs"
                >
                  {label}
                </Button>
              </Tooltip>
            ))}
          </div>

          <Tooltip label="Toggle Light / Dark Mode">
            <Button
              size="xs"
              variant="outline"
              onClick={toggleDark}
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </Tooltip>

          <Tooltip label="Open Theme & Token Customizer">
            <Button
              size="xs"
              variant="primary"
              onClick={() => {
                const trigger = document.querySelector('button[title*="Theme"]') || document.querySelector('button[aria-label*="Theme"]');
                if (trigger) (trigger as HTMLElement).click();
              }}
              leftIcon={<Palette className="size-3.5" />}
            >
              Theme
            </Button>
          </Tooltip>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        open={commandOpen}
        onDismiss={() => setCommandOpen(false)}
        items={commandItems}
        onSelect={handleCommandSelect}
        placeholder="Type a component name, category, or command..."
      />

      {/* Mobile Navigation Drawer Modal */}
      <Modal
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Component Directory"
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

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Theme Presets
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(
                [
                  ['midnight', 'Midnight'],
                  ['minimal-light', 'Light'],
                  ['cyberpunk', 'Cyberpunk'],
                  ['emerald', 'Emerald'],
                  ['sunset', 'Sunset'],
                ] as [ThemePresetKey, string][]
              ).map(([key, label]) => (
                <Button
                  key={key}
                  size="xs"
                  variant={preset === key ? 'primary' : 'outline'}
                  onClick={() => setPreset(key)}
                  className="w-full"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
            <Button
              variant={selectedId === null ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleSelectComponent(null)}
              className="w-full justify-start gap-2"
              leftIcon={<Layers className="size-4" />}
            >
              Showcase Overview
            </Button>

            {Array.from(categories.entries()).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                  {category}
                </span>
                {items.map((item) => (
                  <Button
                    key={item.id}
                    size="xs"
                    variant={selectedId === item.id ? 'secondary' : 'ghost'}
                    onClick={() => handleSelectComponent(item.id)}
                    className="w-full justify-between"
                  >
                    <span>{item.name}</span>
                    {selectedId === item.id && (
                      <ChevronRight className="size-3.5 text-primary" />
                    )}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Left Sidebar (Desktop) */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-24 space-y-6">
            <Button
              variant={selectedId === null ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleSelectComponent(null)}
              className="w-full justify-between shadow-xs"
              leftIcon={<Layers className="size-4" />}
              rightIcon={<ChevronRight className="size-3.5 opacity-60" />}
            >
              Showcase Overview
            </Button>

            {/* Categorized Component Links */}
            <div className="space-y-5">
              {Array.from(categories.entries()).map(([category, items]) => (
                <div key={category} className="space-y-1.5">
                  <div className="flex items-center justify-between px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    <span>{category}</span>
                    <Badge size="sm" variant="outline" className="font-mono text-[10px]">
                      {items.length}
                    </Badge>
                  </div>
                  <div className="space-y-0.5">
                    {items.map((item) => {
                      const isSelected = selectedId === item.id;
                      return (
                        <Button
                          key={item.id}
                          size="xs"
                          variant={isSelected ? 'secondary' : 'ghost'}
                          onClick={() => handleSelectComponent(item.id)}
                          className={`w-full justify-between h-8 px-2.5 text-xs ${
                            isSelected
                              ? 'font-bold text-primary border border-primary/20 shadow-xs'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`size-1.5 rounded-full shrink-0 ${
                                isSelected ? 'bg-primary' : 'bg-transparent'
                              }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>
                          {isSelected && (
                            <ChevronRight className="size-3 text-primary shrink-0" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 min-w-0">
          {activeComponent ? (
            <ComponentDocView component={activeComponent} />
          ) : (
            <div className="space-y-12 animate-fade-in pb-16">
              {/* Hero Banner */}
              <div className="p-6 sm:p-12 rounded-3xl bg-surface border border-border relative overflow-hidden space-y-6 shadow-sm">
                <div className="absolute top-0 right-0 size-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                <div className="space-y-3 relative z-10">
                  <Badge variant="primary" dot size="lg">
                    Production Ready • Tailwind CSS • React 19
                  </Badge>

                  <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl leading-tight">
                    <TextReveal
                      text="Theme-Driven Components for Modern Applications"
                      by="word"
                      stagger={0.06}
                    />
                  </h1>

                  <ShowMore
                    lines={2}
                    maxHeight={160}
                    moreLabel="Read Full Architecture Overview"
                    lessLabel="Show Less"
                    className="max-w-2xl text-muted-foreground"
                  >
                    <p className="leading-relaxed">
                      A flexible component library and live interactive showcase built with React 19,
                      Tailwind CSS, and Motion React. All components subscribe dynamically to global HSL tokens,
                      enabling instant live color and radius switching without full-page re-renders. Every primitive
                      conforms to WAI-ARIA standards with complete keyboard and screen-reader accessibility.
                    </p>
                  </ShowMore>
                </div>

                <div className="flex flex-wrap gap-3 relative z-10 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleSelectComponent('filter-grid')}
                    rightIcon={<ChevronRight className="size-4" />}
                  >
                    Explore 93 Components
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<Palette className="size-4" />}
                    onClick={() => {
                      const trigger = document.querySelector('button[title*="Theme"]') || document.querySelector('button[aria-label*="Theme"]');
                      if (trigger) (trigger as HTMLElement).click();
                    }}
                  >
                    Open Theme Editor
                  </Button>
                </div>
              </div>

              {/* Technology Ecosystem Marquee */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Core Technologies & Standards
                  </span>
                  <Badge variant="outline" size="sm">
                    Verified Zero Dependencies
                  </Badge>
                </div>
                <LogoMarquee
                  items={TECH_STACK_ITEMS}
                  speed={38}
                  gap={28}
                  onSelect={(item) => {
                    setCommandOpen(true);
                  }}
                />
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Stat
                  label="Production Components"
                  value={`${COMPONENTS_DATA.length}`}
                  caption="Accessible & typed"
                  trend="up"
                  change="v1.0"
                />
                <Stat
                  label="Dynamic Tokens"
                  value="24+"
                  caption="HSL variables"
                  trend="up"
                  change="Live"
                />
                <Stat
                  label="Base Runtime"
                  value="< 18 KB"
                  caption="Zero heavy vendor locks"
                  trend="up"
                  change="Light"
                />
              </div>

              {/* Interactive Component Grid Preview with FilterGrid */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Component Library Matrix
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Filter by domain or click any card to inspect its interactive playground and documentation.
                  </p>
                </div>

                <FilterGrid
                  items={COMPONENTS_DATA}
                  filters={categoryFilters}
                  getKey={(comp) => comp.id}
                  label="Component Library Matrix"
                  columns={3}
                  renderItem={(comp) => (
                    <Card
                      key={comp.id}
                      variant="interactive"
                      onClick={() => handleSelectComponent(comp.id)}
                      className="group h-full flex flex-col justify-between cursor-pointer"
                    >
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base group-hover:text-primary transition-colors font-bold">
                            {comp.name}
                          </CardTitle>
                          <Badge variant="outline" size="sm">
                            {comp.category}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2 text-xs mt-1.5 leading-relaxed">
                          {comp.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-5 pt-0 flex justify-between items-center text-xs text-muted-foreground border-t border-border/40 mt-3 pt-3">
                        <span>{comp.props.length} configurable props</span>
                        <ChevronRight className="size-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </CardFooter>
                    </Card>
                  )}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Theme Customizer */}
      <ThemeCustomizer />
    </div>
  );
};
