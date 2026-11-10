import React from 'react';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Stat,
  FilterGrid,
  TextReveal,
  LogoMarquee,
  ShowMore,
} from '../ui';
import {
  ChevronRight,
  Palette,
  Zap,
  Sparkles,
  Rocket,
  Hash,
  Server,
  Layers,
  Tag,
} from 'lucide-react';
import type { ComponentDoc } from '../../showcase/componentsData';

export interface AppHeroProps {
  components: ComponentDoc[];
  onSelectComponent: (id: string | null) => void;
  onOpenCommand: () => void;
}

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

export const AppHero: React.FC<AppHeroProps> = ({
  components,
  onSelectComponent,
  onOpenCommand,
}) => {
  const categoryFilters = React.useMemo(() => {
    const categories = [
      'Buttons & Actions',
      'Inputs & Fields',
      'Checkbox & Switch',
      'Sliders & Range',
      'Navigation & Menus',
      'Scroll & Viewport',
      'Feedback & Overlays',
      'Typography & Content',
      'Surfaces & Cards',
      'Data & Analytics',
      'AI & Agentic UX',
    ] as const;

    return [
      { id: 'all', label: 'All Components', match: () => true },
      ...categories.map((cat) => ({
        id: cat,
        label: cat,
        match: (c: ComponentDoc) => c.category === cat,
      })),
    ];
  }, []);

  return (
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
            onClick={() => onSelectComponent('filter-grid')}
            rightIcon={<ChevronRight className="size-4" />}
          >
            Explore {components.length} Components
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<Palette className="size-4" />}
            onClick={() => {
              const trigger =
                document.querySelector('button[title*="Theme"]') ||
                document.querySelector('button[aria-label*="Theme"]');
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
          onSelect={() => {
            onOpenCommand();
          }}
        />
      </div>

      {/* Live Metric Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat
          label="Production Components"
          value={`${components.length}`}
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
          items={components}
          filters={categoryFilters}
          getKey={(comp) => comp.id}
          label="Component Library Matrix"
          columns={3}
          renderItem={(comp) => (
            <Card
              key={comp.id}
              variant="interactive"
              onClick={() => onSelectComponent(comp.id)}
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
  );
};
