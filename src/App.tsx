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
  X,
  Sliders,
} from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemePresetKey } from './theme/ThemeContext';

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
  const { isDark, toggleDark, preset, setPreset } = useTheme();

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 h-16 border-b border-border bg-surface/85 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl border border-border bg-surface md:hidden text-foreground hover:bg-surface-subtle"
            title="Open Component Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={() => handleSelectComponent(null)}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="p-2 rounded-xl bg-primary text-primary-foreground font-black text-sm shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              ES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-foreground leading-none">
                  es-react-components
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-surface-subtle text-primary border border-primary/20 hidden sm:inline">
                  v1.0.0
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground hidden lg:inline">
                Theme-Driven Component System
              </span>
            </div>
          </button>
        </div>

        {/* Global Search Bar (Desktop) */}
        <div className="relative max-w-xs w-full hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${COMPONENTS_DATA.length}+ components...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Preset Switcher Pills */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-lg bg-surface border border-border">
            {(
              [
                ['midnight', 'Midnight'],
                ['minimal-light', 'Light'],
                ['cyberpunk', 'Cyberpunk'],
                ['emerald', 'Emerald'],
                ['sunset', 'Sunset'],
              ] as [ThemePresetKey, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setPreset(key)}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  preset === key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleDark}
            className="p-2 rounded-lg bg-surface border border-border text-foreground hover:bg-surface-subtle transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-surface-elevated border-r border-border h-full flex flex-col p-4 shadow-2xl z-10 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="font-bold text-sm text-foreground">Components</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="my-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Presets in Mobile Drawer */}
            <div className="mb-4 space-y-1.5">
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
                  ] as [ThemePresetKey, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setPreset(key)}
                    className={`px-2 py-1 text-xs rounded border text-center transition-colors ${
                      preset === key
                        ? 'border-primary bg-primary text-primary-foreground font-semibold'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Component List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <button
                onClick={() => handleSelectComponent(null)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                  selectedId === null
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-surface'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Showcase Overview</span>
              </button>

              {Array.from(categories.entries()).map(([category, items]) => (
                <div key={category} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                    {category}
                  </span>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectComponent(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        selectedId === item.id
                          ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                      }`}
                    >
                      <span>{item.name}</span>
                      {selectedId === item.id && (
                        <ChevronRight className="h-3.5 w-3.5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Left Sidebar (Desktop) */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-24 space-y-6">
            <button
              onClick={() => handleSelectComponent(null)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedId === null
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Showcase Overview</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            </button>

            {/* Categorized Component Links */}
            <div className="space-y-5">
              {Array.from(categories.entries()).map(([category, items]) => (
                <div key={category} className="space-y-1.5">
                  <div className="flex items-center justify-between px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    <span>{category}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {items.map((item) => {
                      const isSelected = selectedId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectComponent(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                            isSelected
                              ? 'bg-surface-elevated font-semibold text-primary border border-primary/30 shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected ? 'bg-primary' : 'bg-transparent'
                              }`}
                            />
                            <span>{item.name}</span>
                          </div>
                          {isSelected && (
                            <ChevronRight className="h-3.5 w-3.5 text-primary" />
                          )}
                        </button>
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
              <div className="p-6 sm:p-12 rounded-3xl bg-surface border border-border relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                <div className="space-y-3 relative z-10">
                  <Badge variant="primary" dot size="lg">
                    Production Ready • Tailwind CSS • React 19
                  </Badge>
                  <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl leading-tight">
                    Theme-Driven Components for Modern Applications
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    A flexible component library and live interactive showcase
                    with reactive color pickers, HSL tokens, and accessible
                    primitives.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 relative z-10 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleSelectComponent('button')}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    Browse Components
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<Palette className="h-4 w-4" />}
                    onClick={() => {
                      const trigger = document.querySelector('button[title*="Theme"]');
                      if (trigger) (trigger as HTMLElement).click();
                    }}
                  >
                    Open Theme Editor
                  </Button>
                </div>
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Stat
                  label="Production Components"
                  value="15+"
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
                  label="Bundle Size"
                  value="< 18 KB"
                  caption="Zero heavy runtime"
                  trend="up"
                  change="Light"
                />
              </div>

              {/* Interactive Component Grid Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Component Library Matrix
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Click any card to inspect its interactive playground and documentation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COMPONENTS_DATA.map((comp) => (
                    <Card
                      key={comp.id}
                      variant="interactive"
                      onClick={() => handleSelectComponent(comp.id)}
                      className="group"
                    >
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base group-hover:text-primary transition-colors">
                            {comp.name}
                          </CardTitle>
                          <Badge variant="outline" size="sm">
                            {comp.category}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2 text-xs mt-1">
                          {comp.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-5 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                        <span>{comp.props.length} configurable props</span>
                        <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
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
