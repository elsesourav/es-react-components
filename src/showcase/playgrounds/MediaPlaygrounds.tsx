import React, { useState, useRef, useEffect, useLayoutEffect, useId } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  FloatingLabelInput,
  InlineValidation,
  PasswordInput,
  PasswordStrength,
  usePasswordStrength,
  OtpInput,
  TagInput,
  ExpandingSearch,
  Textarea,
  Select,
  Dropdown,
  Switch,
  Checkbox,
  Dialog,
  Alert,
  Tabs,
  Avatar,
  Stat,
  Spinner,
  Skeleton,
  TextLoop,
  SplitFlapText,
  BranchedMenu,
  PeekRating,
  LiquidGlassSheet,
  CardCoverFlow,
  CardCarousel,
  SquareSnake,
  BobbingDots,
  ContextMenuEditDelete,
  QuestionTooltip,
  DownloadAnimatedIcons,
  PipModeIcons,
  SimplePlusMinusBtn,
  SegmentedABTabs,
  QuantityCounter,
  ListColumnToggle,
  FollowCheckButton,
  MenuDotsExpand,
  CompactModeSwitch,
  RudderIssueBoard,
  AIApprovalCard,
  AIPromptBar,
  AICodeBlock,
  AIFineTuneCard,
  LoadMore,
  StreamingText,
  useStreamingText,
  TaskSteps,
  CollapsibleBanner,
  PresenceAvatars,
  usePresence,
  Modal,
  useModal,
  Tooltip,
  TooltipGroup,
  useTooltip,
  CommandPalette,
  useCommandPalette,
  SegmentedControl,
  Accordion,
  WizardSteps,
  Pagination,
  TreeView,
  StickyHeader,
  useCondense,
  ReadingProgress,
  useReadingProgress,
  ScrollSpy,
  useScrollSpy,
  HideOnScroll,
  useHideOnScroll,
  FilterGrid,
  useFilterGrid,
  PollResults,
  usePollResults,
  SliderDetents,
  useSliderDetents,
  ReorderList,
  useReorderList,
  Lightbox,
  useLightbox,
  TextReveal,
  useTextReveal,
  LogoMarquee,
  useLogoMarquee,
  BlurUpImage,
  useBlurUpImage,
  ShowMore,
  useShowMore,
  MarkdownEditor,
  MarkdownRenderer,
  ParameterSlider,
  ParameterSwitch,
  ParameterColor,
  ParameterGrid,
  ElasticSlider,
  WakeSlider,
  Slider,
  MonoRoundedLineChart,
  MonoRoundedBarChart,
  MonoRoundedAreaChart,
  MonoRoundedDonutChart,
  MonoRoundedStreamChart,
  MonoChartsSuite,
} from '@/components/ui';
import {
  Download04Icon,
  Rocket01Icon,
  Settings02Icon,
  PaintBoardIcon,
} from '@hugeicons/core-free-icons';
import { useToast } from '@/components/ui/toast';
import { useTheme } from '@/theme/ThemeContext';
import {
  Sparkles,
  ArrowRight,
  Search,
  Bell,
  Mail,
  Users,
  Key,
  ShieldCheck,
  CheckCircle,
  Globe,
  Server,
  Zap,
  Tag,
  Hash,
  Lock,
  Check,
  RefreshCw,
  AlertCircle,
  Copy,
  Folder,
  FileText,
  Layers,
  ListTree,
  Compass,
  Rocket,
  ScrollText,
  BookmarkCheck,
  EyeOff,
  Navigation2,
  SlidersHorizontal,
  SlidersVertical,
  Volume2,
  VolumeX,
  Vote,
  GripVertical,
  Maximize2,
  Grid3X3,
  Play,
  Pause,
  RotateCcw,
  Image as ImageIcon,
  Monitor,
  Tablet,
  Smartphone,
  Activity,
  BarChart2,
} from 'lucide-react';

export const CardPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [cardVariant, setCardVariant] = useState<any>('default');

  return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex items-center gap-2 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
              Card Style:
            </span>
            {['default', 'elevated', 'glass', 'outline', 'subtle'].map((v) => (
              <button
                key={v}
                onClick={() => setCardVariant(v)}
                className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors ${
                  cardVariant === v
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <Card variant={cardVariant}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="primary" dot size="sm">
                    Live Cluster
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    us-east-1a
                  </span>
                </div>
                <CardTitle>Distributed Compute Engine</CardTitle>
                <CardDescription>
                  High-throughput, event-driven reactive microservice pool.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-xs py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Health Status</span>
                  <span className="text-success font-semibold flex items-center gap-1">
                    <CheckCircle className="size-3" /> Operational
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-muted-foreground">Average Latency</span>
                  <span className="font-mono font-semibold text-foreground">
                    14.2 ms
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  View Logs
                </Button>
                <Button variant="primary" size="sm">
                  Scale Cluster
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
};

export const AvatarPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  

  return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 py-6">
          <Avatar
            size="xl"
            fallback="SG"
            status="online"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
          />
          <Avatar size="lg" fallback="AC" status="busy" />
          <Avatar size="md" fallback="ES" status="away" />
          <Avatar size="sm" fallback="JD" status="offline" />
          <Avatar size="xs" fallback="AI" />
        </div>
      </div>
    );
};

export const StatPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  

  return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat
            label="Total Revenue"
            value="$128,430"
            change="+18.2%"
            trend="up"
            caption="vs previous month"
          />
          <Stat
            label="Active Subscribers"
            value="14,290"
            change="+4.8%"
            trend="up"
            caption="99.4% retention"
          />
          <Stat
            label="P99 Latency"
            value="14.8 ms"
            change="-2.1%"
            trend="down"
            caption="Edge routing"
          />
        </div>
      </div>
    );
};

export const LiquidGlassSheetPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [glassTitle, setGlassTitle] = useState('Autumn forest');
  const [glassSubtitle, setGlassSubtitle] = useState('Liquid glass sheet');
  const [glassTheme, setGlassTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [glassImage, setGlassImage] = useState(
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=800'
  );

  const wallpapers = [
      { id: 'forest', name: 'Forest', url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=800' },
      { id: 'nordic', name: 'Villa', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800' },
      { id: 'tokyo', name: 'Tokyo', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800' },
      { id: 'coast', name: 'Coast', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800' },
    ];

    return (
      <div className="space-y-6">
        {/* Sleek Compact Toolbar */}
        <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="font-semibold text-foreground">Liquid Glass Sheet</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-[11px]">Theme:</span>
              <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
                {(['auto', 'light', 'dark'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setGlassTheme(t)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all",
                      glassTheme === t
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Backdrop Wallpaper */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-[11px]">Backdrop:</span>
              <div className="flex items-center gap-1">
                {wallpapers.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setGlassImage(w.url)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg border text-xs font-medium transition-all",
                      glassImage === w.url
                        ? "bg-primary/15 text-primary border-primary/40 font-semibold"
                        : "bg-surface-subtle/40 border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {w.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="p-4 sm:p-10 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center min-h-[440px] relative overflow-hidden">
          <LiquidGlassSheet
            title={glassTitle}
            subtitle={glassSubtitle}
            backgroundImage={glassImage}
            theme={glassTheme}
            defaultOpen={true}
            onShare={() => {
              addToast({
                title: 'Share Triggered',
                description: 'Share sheet dialog invoked successfully.',
                type: 'info',
              });
            }}
            onSaveChange={(saved) => {
              addToast({
                title: saved ? 'Bookmark Saved' : 'Bookmark Removed',
                description: saved ? 'Sheet added to favorites.' : 'Sheet removed from favorites.',
                type: saved ? 'success' : 'info',
              });
            }}
          />
        </div>
      </div>
    );
};

export const CardCoverflowPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [coverflowMonochrome, setCoverflowMonochrome] = useState(false);
  const [coverflowIndex, setCoverflowIndex] = useState(2);

  return (
      <div className="space-y-8">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
          <div className="text-sm font-semibold text-foreground flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Card CoverFlow Configuration
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Active Slide: {coverflowIndex + 1} / 5
            </span>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={coverflowMonochrome}
                onChange={(e) => setCoverflowMonochrome(e.target.checked)}
                className="rounded accent-primary"
              />
              Monochrome Slate Style
            </label>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-full max-w-xl">
            <CardCoverFlow
              isMonochrome={coverflowMonochrome}
              initialIndex={coverflowIndex}
              onIndexChange={(idx) => setCoverflowIndex(idx)}
            />
          </div>
        </div>
      </div>
    );
};

export const CardCarouselPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [carouselMonochrome, setCarouselMonochrome] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(2);

  return (
      <div className="space-y-8">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
          <div className="text-sm font-semibold text-foreground flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Card Carousel Configuration
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Active Slide: {carouselIndex + 1} / 5
            </span>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={carouselMonochrome}
                onChange={(e) => setCarouselMonochrome(e.target.checked)}
                className="rounded accent-primary"
              />
              Monochrome Slate Style
            </label>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[320px]">
          <div className="w-full max-w-xl">
            <CardCarousel
              isMonochrome={carouselMonochrome}
              initialIndex={carouselIndex}
              onIndexChange={(idx) => setCarouselIndex(idx)}
            />
          </div>
        </div>
      </div>
    );
};

export const PresenceAvatarsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [presenceSlots, setPresenceSlots] = useState(4);
  const presencePeople = [
    { id: '1', name: 'Elena Rostova', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80' },
    { id: '2', name: 'Marcus Sterling', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80' },
    { id: '3', name: 'Devin Vance' },
    { id: '4', name: 'Sarah Connor', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80' },
    { id: '5', name: 'Kenji Sato' },
    { id: '6', name: 'Alex Rivera' },
  ];

  return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Max Visible Slots: {presenceSlots}
          </span>
          <div className="flex items-center gap-1.5">
            {[2, 3, 4, 5, 6].map((count) => (
              <button
                key={count}
                onClick={() => setPresenceSlots(count)}
                className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                  presenceSlots === count
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md mx-auto p-8 rounded-2xl border border-border bg-surface-subtle/50 flex flex-col items-center justify-center space-y-4">
          <div className="text-xs text-muted-foreground">Active Collaborators in Document:</div>
          <PresenceAvatars
            people={presencePeople}
            max={presenceSlots}
            size={36}
            overlap={11}
            onOverflowSelect={(hidden) => {
              addToast({
                title: 'Hidden Collaborators',
                description: `${hidden.map((p) => p.name).join(', ')}`,
                type: 'info',
              });
            }}
          />
          <div className="text-xs text-muted-foreground text-center font-mono pt-2">
            Click the +N badge to reveal the overflow roster callback!
          </div>
        </div>
      </div>
    );
};

export const AccordionPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [accordionType, setAccordionType] = useState<'single' | 'multiple'>('single');
  const [accordionCollapsible, setAccordionCollapsible] = useState(true);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ListTree className="size-4 text-primary" />
            Accordion Settings
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Mode:</span>
            <Button
              size="xs"
              variant={accordionType === 'single' ? 'primary' : 'outline'}
              onClick={() => setAccordionType('single')}
            >
              Single
            </Button>
            <Button
              size="xs"
              variant={accordionType === 'multiple' ? 'primary' : 'outline'}
              onClick={() => setAccordionType('multiple')}
            >
              Multiple
            </Button>
            <span className="text-xs text-muted-foreground ml-2">Collapsible:</span>
            <Button
              size="xs"
              variant={accordionCollapsible ? 'primary' : 'outline'}
              onClick={() => setAccordionCollapsible(!accordionCollapsible)}
            >
              {accordionCollapsible ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-xl">
            <Accordion
              type={accordionType}
              collapsible={accordionCollapsible}
              defaultOpen={['item-1']}
              items={[
                {
                  id: 'item-1',
                  title: 'How does dynamic design token theming work?',
                  meta: 'v2.4',
                  content:
                    'All components read CSS custom properties (HSL variables) such as --primary, --surface, --surface-elevated, and --radius. Switching themes or adjusting color pickers automatically triggers instantaneous live CSS restyling with zero JavaScript rerenders.',
                },
                {
                  id: 'item-2',
                  title: 'Are layout transitions smooth on variable-length content?',
                  meta: 'ResizeObserver',
                  content:
                    'Yes! Under the hood, useAutoHeight uses a performant ResizeObserver to measure the exact bounding box height of panel content, driving spring physics without hardcoded max-height jumps.',
                },
                {
                  id: 'item-3',
                  title: 'What accessibility standards are supported?',
                  meta: 'WAI-ARIA',
                  content:
                    'Accordions use semantic heading tags, aria-expanded, aria-controls, and full arrow key navigation (ArrowUp, ArrowDown, Home, End). Inactive panels are marked inert for assistive screen readers.',
                },
                {
                  id: 'item-4',
                  title: 'Can users navigate with prefers-reduced-motion?',
                  meta: 'A11y',
                  content:
                    'Whenever users have reduced motion enabled in their operating system, all height and rotation animations seamlessly collapse into instant switches.',
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
};

export const FilterGridPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [filterGridCat, setFilterGridCat] = useState('all');
  const [filterGridCols, setFilterGridCols] = useState(3);

  const services = [
      { id: 'srv-1', name: 'API Gateway', category: 'compute', status: 'Healthy', latency: '4ms', load: '32%' },
      { id: 'srv-2', name: 'PostgreSQL Primary', category: 'database', status: 'Healthy', latency: '12ms', load: '64%' },
      { id: 'srv-3', name: 'Redis Cache Cluster', category: 'database', status: 'Healthy', latency: '1ms', load: '18%' },
      { id: 'srv-4', name: 'OAuth2 / mTLS Auth', category: 'security', status: 'Protected', latency: '8ms', load: '45%' },
      { id: 'srv-5', name: 'Edge V8 Workers', category: 'compute', status: 'Healthy', latency: '2ms', load: '78%' },
      { id: 'srv-6', name: 'Blob Storage S3', category: 'storage', status: 'Healthy', latency: '24ms', load: '52%' },
      { id: 'srv-7', name: 'KMS Secret Vault', category: 'security', status: 'Protected', latency: '6ms', load: '11%' },
      { id: 'srv-8', name: 'Kafka Event Bus', category: 'compute', status: 'Healthy', latency: '9ms', load: '89%' },
    ];

    const filters = [
      { id: 'all', label: 'All Services', match: () => true },
      { id: 'compute', label: 'Compute', match: (s: (typeof services)[0]) => s.category === 'compute' },
      { id: 'database', label: 'Database', match: (s: (typeof services)[0]) => s.category === 'database' },
      { id: 'security', label: 'Security & Auth', match: (s: (typeof services)[0]) => s.category === 'security' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Columns:</span>
            {[2, 3, 4].map((cols) => (
              <Button
                key={cols}
                size="xs"
                variant={filterGridCols === cols ? 'primary' : 'outline'}
                onClick={() => setFilterGridCols(cols)}
              >
                {cols} Cols
              </Button>
            ))}
          </div>

          <Button
            size="xs"
            variant="ghost"
            onClick={() => {
              setFilterGridCat('all');
              addToast({ title: 'Filters Reset', description: 'Showing all service cards', type: 'info' });
            }}
          >
            Reset Filter
          </Button>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface-subtle/50 border border-border">
          <FilterGrid
            items={services}
            filters={filters}
            value={filterGridCat}
            onValueChange={(id) => {
              setFilterGridCat(id);
              addToast({ title: 'Filter Applied', description: `Filtered by: ${id}`, type: 'info' });
            }}
            label="Service Inventory"
            columns={filterGridCols}
            getKey={(s) => s.id}
            renderItem={(s) => (
              <div className="p-4 rounded-xl bg-surface border border-border shadow-xs hover:border-primary/40 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{s.id}</span>
                    <Badge variant={s.category === 'security' ? 'secondary' : 'default'} size="sm">
                      {s.category}
                    </Badge>
                  </div>
                  <div className="font-semibold text-sm text-foreground">{s.name}</div>
                </div>
                <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Latency: <strong className="text-foreground">{s.latency}</strong></span>
                  <span>Load: <strong className="text-foreground">{s.load}</strong></span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    );
};

export const PollResultsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [pollVotedId, setPollVotedId] = useState<string | null>(null);

  const pollOptions = [
      { id: 'opt-react-state', label: 'React Context + Hooks', votes: 142 },
      { id: 'opt-zustand', label: 'Zustand Store', votes: 318 },
      { id: 'opt-tanstack', label: 'TanStack Query (React Query)', votes: 412 },
      { id: 'opt-redux', label: 'Redux Toolkit / RTK Query', votes: 98 },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="text-xs text-muted-foreground">
            Current Status: <strong className="text-foreground">{pollVotedId ? 'Vote Recorded' : 'Awaiting Vote'}</strong>
          </div>

          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setPollVotedId(null);
              addToast({ title: 'Poll Reset', description: 'You can now cast your vote again.', type: 'info' });
            }}
          >
            Reset Vote
          </Button>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
          <div className="w-full max-w-md p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
            <div>
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                <Vote className="size-3.5" />
                <span>Developer Survey 2026</span>
              </div>
              <h3 className="text-base font-semibold text-foreground">
                What is your primary state management library in production?
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click an option below to reveal live spring percentage distributions.
              </p>
            </div>

            <PollResults
              label="Primary State Management Tool"
              options={pollOptions}
              value={pollVotedId}
              onVote={(id) => {
                setPollVotedId(id);
                const match = pollOptions.find((o) => o.id === id);
                addToast({
                  title: 'Vote Counted!',
                  description: `You voted for: ${match?.label}`,
                  type: 'success',
                });
              }}
            />
          </div>
        </div>
      </div>
    );
};

export const ReorderListPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [reorderItems, setReorderItems] = useState([
    { id: 'r1', title: 'Edge Routing Ingress Gateway', badge: 'Critical', latency: '8ms' },
    { id: 'r2', title: 'Zero-Trust Identity Verifier', badge: 'High', latency: '14ms' },
    { id: 'r3', title: 'Distributed Cache Invalidation', badge: 'Normal', latency: '28ms' },
    { id: 'r4', title: 'Prometheus Telemetry Collector', badge: 'Low', latency: '42ms' },
  ]);

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="text-xs text-muted-foreground">
            Sort Priority: <span className="text-foreground font-semibold">Top item has highest execution precedence</span>
          </div>

          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setReorderItems([
                { id: 'r1', title: 'Edge Routing Ingress Gateway', badge: 'Critical', latency: '8ms' },
                { id: 'r2', title: 'Zero-Trust Identity Verifier', badge: 'High', latency: '14ms' },
                { id: 'r3', title: 'Distributed Cache Invalidation', badge: 'Normal', latency: '28ms' },
                { id: 'r4', title: 'Prometheus Telemetry Collector', badge: 'Low', latency: '42ms' },
              ]);
              addToast({ title: 'List Reset', description: 'Restored default routing order.', type: 'info' });
            }}
          >
            Reset Order
          </Button>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
          <div className="w-full max-w-lg space-y-3">
            <ReorderList
              label="Ingress Pipeline Tasks"
              items={reorderItems}
              getId={(item) => item.id}
              getLabel={(item) => item.title}
              onReorder={setReorderItems}
              onCommit={(items) => {
                addToast({
                  title: 'Order Updated',
                  description: `New top task: ${items[0]?.title}`,
                  type: 'success',
                });
              }}
            >
              {(item) => (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3 min-w-0">
                    <GripVertical className="size-4 text-muted-foreground/60 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate">{item.title}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">Ping: {item.latency}</div>
                    </div>
                  </div>
                  <Badge
                    variant={item.badge === 'Critical' ? 'danger' : item.badge === 'High' ? 'warning' : 'outline'}
                    size="sm"
                  >
                    {item.badge}
                  </Badge>
                </div>
              )}
            </ReorderList>

            <p className="text-center text-xs text-muted-foreground">
              Drag items with mouse/touch, or press Space/Enter on a row and use Up/Down arrows to move.
            </p>
          </div>
        </div>
      </div>
    );
};

export const LogoMarqueePlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [marqueeSpeed, setMarqueeSpeed] = useState(44);
  const [marqueeDirection, setMarqueeDirection] = useState<'left' | 'right'>('left');
  const [marqueePaused, setMarqueePaused] = useState(false);

  const brands = [
      { id: 'react', label: 'React 19', mark: <Zap className="size-4 text-cyan-400" /> },
      { id: 'next', label: 'Next.js 15', mark: <Globe className="size-4 text-foreground" /> },
      { id: 'tailwind', label: 'Tailwind CSS', mark: <Sparkles className="size-4 text-sky-400" /> },
      { id: 'motion', label: 'Motion React', mark: <Rocket className="size-4 text-purple-400" /> },
      { id: 'ts', label: 'TypeScript 5.7', mark: <Hash className="size-4 text-blue-400" /> },
      { id: 'vite', label: 'Vite 6', mark: <Server className="size-4 text-amber-400" /> },
      { id: 'radix', label: 'Radix Primitives', mark: <Layers className="size-4 text-emerald-400" /> },
      { id: 'lucide', label: 'Lucide Icons', mark: <Tag className="size-4 text-rose-400" /> },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-foreground">Speed:</span>
            {[24, 44, 72].map((s) => (
              <Button
                key={s}
                size="xs"
                variant={marqueeSpeed === s ? 'primary' : 'outline'}
                onClick={() => setMarqueeSpeed(s)}
              >
                {s} px/s
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant="outline"
              onClick={() => setMarqueeDirection((d) => (d === 'left' ? 'right' : 'left'))}
            >
              Dir: {marqueeDirection === 'left' ? '← Left' : '→ Right'}
            </Button>
            <Button
              size="xs"
              variant={marqueePaused ? 'primary' : 'outline'}
              onClick={() => setMarqueePaused((p) => !p)}
            >
              {marqueePaused ? <Play className="size-3.5 mr-1" /> : <Pause className="size-3.5 mr-1" />}
              {marqueePaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Supported Enterprise Platforms</h3>
            <p className="text-xs text-muted-foreground">
              Hover to halt scrolling. Click any pill to trigger callback. Focus with Tab to automatically center item.
            </p>
          </div>

          <LogoMarquee
            items={brands}
            speed={marqueeSpeed}
            direction={marqueeDirection}
            paused={marqueePaused}
            gap={24}
            onSelect={(b) => {
              addToast({ title: 'Brand Selected', description: `Interacted with: ${b.label}`, type: 'info' });
            }}
          />
        </div>
      </div>
    );
};

export const BlurUpImagePlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [blurUpKey, setBlurUpKey] = useState(0);
  const [blurUpError, setBlurUpError] = useState(false);

  const sampleSrc = blurUpError
      ? 'https://invalid-broken-domain-url-404.jpg'
      : `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1400&q=80&r=${blurUpKey}`;
    const placeholder = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=32&q=20';

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-2">
            <ImageIcon className="size-4 text-primary" />
            <span className="text-xs font-medium text-foreground">
              Status: <span className="font-semibold text-primary">{blurUpError ? 'Simulating Error Fallback' : 'Active Decode Loader'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant={blurUpError ? 'danger' : 'outline'}
              onClick={() => {
                setBlurUpError((err) => !err);
                setBlurUpKey((k) => k + 1);
              }}
            >
              {blurUpError ? 'Restore Normal Image' : 'Simulate Error'}
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setBlurUpKey((k) => k + 1);
                addToast({ title: 'Image Reloaded', description: 'Re-triggered progressive decode unblur', type: 'info' });
              }}
            >
              <RotateCcw className="size-3.5 mr-1" />
              Reload
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-lg space-y-3">
            <div className="overflow-hidden rounded-2xl border border-border shadow-md">
              <BlurUpImage
                key={`${blurUpKey}-${blurUpError}`}
                src={sampleSrc}
                placeholder={placeholder}
                alt="Colorful abstract gradient mesh"
                width={16}
                height={9}
                blur={16}
                onReady={() => {
                  addToast({ title: 'Image Decoded', description: 'Progressive spring unblur completed.', type: 'success' });
                }}
                onError={() => {
                  addToast({ title: 'Decode Failed', description: 'Gracefully rendered fallback state.', type: 'error' });
                }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Loads low-resolution micro-thumbnail first, waits for browser async image decoding, then gracefully unblurs and saturates into focus.
            </p>
          </div>
        </div>
      </div>
    );
};

export const ShowMorePlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [showMoreExpanded, setShowMoreExpanded] = useState(false);
  const [showMoreLines, setShowMoreLines] = useState(3);

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-foreground">Collapsed Lines:</span>
            {[2, 3, 5].map((l) => (
              <Button
                key={l}
                size="xs"
                variant={showMoreLines === l ? 'primary' : 'outline'}
                onClick={() => setShowMoreLines(l)}
              >
                {l} Lines
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground">
            Status: <span className="font-semibold text-foreground">{showMoreExpanded ? 'Expanded' : 'Clamped'}</span>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
          <div className="w-full max-w-xl p-6 rounded-2xl bg-surface border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="size-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Global Data Residency & Compliance Policy</h3>
            </div>

            <ShowMore
              lines={showMoreLines}
              maxHeight={340}
              expanded={showMoreExpanded}
              onExpandedChange={(exp) => {
                setShowMoreExpanded(exp);
                addToast({
                  title: exp ? 'Disclosed Content' : 'Collapsed Content',
                  description: `Section ${exp ? 'expanded to full height' : `clamped to ${showMoreLines} lines`}`,
                  type: 'info',
                });
              }}
              moreLabel="Read Full Compliance Terms"
              lessLabel="Show Fewer Lines"
            >
              <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                <p>
                  All customer telemetry data, session storage tokens, and encryption payloads are segregated
                  across isolated sovereign compute zones. Primary relational replicas are deployed across
                  multi-AZ Frankfurt (eu-central-1), Northern Virginia (us-east-1), and Tokyo (ap-northeast-1)
                  clusters with automated synchronous mTLS cross-region failover.
                </p>
                <p>
                  Zero-trust identity verification is strictly enforced on every internal RPC boundary using
                  ephemeral SPIFFE/SPIRE X.509 certificates rotated every 60 minutes. Encryption at rest is
                  secured using FIPS 140-3 Level 3 Hardware Security Modules (HSMs) with customer-managed keys (BYOK).
                </p>
                <p>
                  Audit logs are immutably streamed to append-only tamper-evident cold storage with WORM (Write Once,
                  Read Many) retention locks conforming to SOC 2 Type II, ISO 27001, and HIPAA compliance specifications.
                </p>
                <p>
                  Third-party vulnerability assessments and continuous red-team pen testing reports are published
                  quarterly in the customer trust portal with real-time SOC incident telemetry feeds.
                </p>
              </div>
            </ShowMore>
          </div>
        </div>
      </div>
    );
};
