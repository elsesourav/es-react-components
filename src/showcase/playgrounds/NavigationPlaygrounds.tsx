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

export const BranchedMenuPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [menuActive, setMenuActive] = useState('quick');
  const [menuWidth, setMenuWidth] = useState(240);
  const [menuRowHeight, setMenuRowHeight] = useState(36);
  const [menuIndent, setMenuIndent] = useState(40);
  const [menuTrunk, setMenuTrunk] = useState(14);
  const [menuRadius, setMenuRadius] = useState(10);
  const [menuLineWidth, setMenuLineWidth] = useState(1.5);
  const [menuDrawDuration, setMenuDrawDuration] = useState(400);
  const [menuFoldDuration, setMenuFoldDuration] = useState(300);
  const [menuLineColor, setMenuLineColor] = useState('#3f3f46');
  const [menuAccentColor, setMenuAccentColor] = useState('#6366f1');
  const [menuTextColor, setMenuTextColor] = useState('#f5f5f5');

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-foreground">Branched Tree Navigation</h4>
              <p className="text-xs text-muted-foreground">Animated curved vector hierarchy with synchronized sliding branch reach.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMenuAccentColor(colors.primary);
                  setMenuLineColor(colors.border);
                  setMenuTextColor(colors.foreground);
                  addToast({
                    title: 'Theme Synchronized',
                    description: `Tree colors bound to active ${preset} tokens!`,
                    type: 'info',
                  });
                }}
                className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="size-3.5" />
                <span>Reset to Theme ({preset})</span>
              </button>
            </div>
          </div>

          {/* Section 1: Color Tokens */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Theme Colors & Token Styling
            </span>
            <ParameterGrid columns={3}>
              <ParameterColor
                label="Accent (Active)"
                value={menuAccentColor}
                onChange={setMenuAccentColor}
              />
              <ParameterColor
                label="Branch Lines"
                value={menuLineColor}
                onChange={setMenuLineColor}
              />
              <ParameterColor
                label="Label Text"
                value={menuTextColor}
                onChange={setMenuTextColor}
              />
            </ParameterGrid>
          </div>

          {/* Section 2: Tree Geometry & Metrics */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Geometry, Spacing & Curve Radii
            </span>
            <ParameterGrid columns={3}>
              <ParameterSlider
                label="Menu Width"
                value={menuWidth}
                onChange={setMenuWidth}
                min={180}
                max={320}
                step={10}
                unit="px"
              />
              <ParameterSlider
                label="Row Height"
                value={menuRowHeight}
                onChange={setMenuRowHeight}
                min={28}
                max={48}
                step={2}
                unit="px"
              />
              <ParameterSlider
                label="Child Indent"
                value={menuIndent}
                onChange={setMenuIndent}
                min={24}
                max={60}
                step={2}
                unit="px"
              />
              <ParameterSlider
                label="Arc Radius"
                value={menuRadius}
                onChange={setMenuRadius}
                min={4}
                max={16}
                step={1}
                unit="px"
              />
              <ParameterSlider
                label="Line Width"
                value={menuLineWidth}
                onChange={setMenuLineWidth}
                min={1}
                max={3}
                step={0.5}
                unit="px"
              />
              <ParameterSlider
                label="Draw Duration"
                value={menuDrawDuration}
                onChange={setMenuDrawDuration}
                min={200}
                max={800}
                step={50}
                unit="ms"
              />
            </ParameterGrid>
          </div>
        </div>

        {/* Live Tree Preview */}
        <div className="p-6 sm:p-10 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[340px] space-y-4">
          <div className="w-full flex justify-center py-2 overflow-x-auto">
            <BranchedMenu
              items={[
                {
                  label: 'Getting started',
                  children: [
                    { value: 'install', label: 'Installation', icon: Download04Icon },
                    { value: 'quick', label: 'Quick start', icon: Rocket01Icon },
                    { value: 'config', label: 'Configuration', icon: Settings02Icon },
                    { value: 'theming', label: 'Theming', icon: PaintBoardIcon },
                  ],
                },
                {
                  label: 'Components',
                  children: [
                    { value: 'buttons', label: 'Buttons' },
                    { value: 'overlays', label: 'Overlays' },
                    { value: 'forms', label: 'Forms & Inputs' },
                  ],
                },
              ]}
              defaultOpen={[0]}
              defaultActive={menuActive}
              onSelect={(val, it) => {
                setMenuActive(val);
                addToast({
                  title: 'Item Selected',
                  description: `Navigated to ${it.label} (${val})`,
                  type: 'info',
                });
              }}
              color={menuTextColor}
              accentColor={menuAccentColor}
              lineColor={menuLineColor}
              width={menuWidth}
              rowHeight={menuRowHeight}
              indent={menuIndent}
              trunk={menuTrunk}
              radius={menuRadius}
              lineWidth={menuLineWidth}
              fontSize={14}
              drawDuration={menuDrawDuration}
              foldDuration={menuFoldDuration}
            />
          </div>
          <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
            <span>Active Target:</span>
            <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-primary font-semibold">
              "{menuActive}"
            </span>
          </div>
        </div>
      </div>
    );
};

export const TabsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('tab1');
  const [tabVariant, setTabVariant] = useState<any>('plateau');

  return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
                Tabs Style:
              </span>
              {(['plateau', 'segmented', 'pills', 'underline'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setTabVariant(v)}
                  className={`px-3 py-1.5 text-xs rounded-lg border capitalize transition-colors cursor-pointer ${
                    tabVariant === v
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {v === 'plateau' ? 'Plateau (Spring)' : v}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted-foreground">
              Active: <strong className="text-foreground">{activeTab}</strong>
            </span>
          </div>

          <div className="max-w-xl mx-auto">
            <Tabs
              variant={tabVariant}
              value={activeTab}
              onValueChange={setActiveTab}
              items={[
                { value: 'tab1', label: 'Overview', badge: 'v2' },
                { value: 'tab2', label: 'Security' },
                { value: 'tab3', label: 'Integrations' },
                { value: 'tab4', label: 'Billing (Disabled)', disabled: true },
              ]}
              renderPanel={(value) => (
                <div className="space-y-2">
                  {value === 'tab1' && (
                    <>
                      <h4 className="font-semibold text-foreground text-sm">Cluster Overview & Health</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Cluster metrics aggregated every 5 seconds across 48 edge nodes with 99.99% uptime.
                        Sliding plateau tabs measure tab widths via ResizeObserver with spring physics.
                      </p>
                    </>
                  )}
                  {value === 'tab2' && (
                    <>
                      <h4 className="font-semibold text-foreground text-sm">Security & Access Policies</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Mutual TLS (mTLS) ingress encryption and zero-trust policies active.
                        Rotate certificate authorities automatically every 90 days.
                      </p>
                    </>
                  )}
                  {value === 'tab3' && (
                    <>
                      <h4 className="font-semibold text-foreground text-sm">Connected Integrations</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Connected to GitHub Actions, Datadog Real User Monitoring, and Slack notification webhooks.
                      </p>
                    </>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
};

export const SegmentedControlPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [segmentedVal, setSegmentedVal] = useState('weekly');
  const [segmentedVariant, setSegmentedVariant] = useState<'primary' | 'surface'>('primary');

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Layers className="size-4 text-primary" />
            Segmented Control Options
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Thumb Variant:</span>
            <Button
              size="xs"
              variant={segmentedVariant === 'primary' ? 'primary' : 'outline'}
              onClick={() => setSegmentedVariant('primary')}
            >
              Primary (Themed)
            </Button>
            <Button
              size="xs"
              variant={segmentedVariant === 'surface' ? 'primary' : 'outline'}
              onClick={() => setSegmentedVariant('surface')}
            >
              Surface
            </Button>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[300px] space-y-6">
          <SegmentedControl
            label="Billing Interval"
            variant={segmentedVariant}
            value={segmentedVal}
            onValueChange={setSegmentedVal}
            options={[
              { value: 'daily', label: '1 Day' },
              { value: 'weekly', label: '1 Week' },
              { value: 'monthly', label: '1 Month' },
              { value: 'annual', label: '1 Year' },
              { value: 'lifetime', label: 'Enterprise', disabled: true },
            ]}
          />

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-xs text-muted-foreground">
              Selected Interval: <strong className="text-foreground uppercase">{segmentedVal}</strong>
            </div>
            <p className="text-[11px] text-muted-foreground/80 max-w-sm">
              Features spring thumb sliding with dual text-inversion mask. Navigate with <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">→</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">Home</kbd> <kbd className="px-1 py-0.5 rounded bg-surface border text-[10px]">End</kbd>.
            </p>
          </div>
        </div>
      </div>
    );
};

export const WizardStepsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [wizardComplete, setWizardComplete] = useState(false);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Rocket className="size-4 text-primary" />
            Pipeline Wizard Controller
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant={wizardComplete ? 'outline' : 'primary'}
              onClick={() => setWizardComplete(false)}
            >
              Reset Pipeline
            </Button>
            <Button
              size="xs"
              variant={wizardComplete ? 'primary' : 'outline'}
              onClick={() => setWizardComplete(true)}
            >
              Simulate Complete
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-lg">
            <WizardSteps
              complete={wizardComplete}
              onComplete={() => {
                setWizardComplete(true);
                addToast({
                  title: 'Pipeline Configured',
                  description: 'All wizard steps have been finalized successfully.',
                  type: 'success',
                });
              }}
              steps={[
                {
                  id: 'project',
                  label: 'Project Details',
                  content: (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-foreground block mb-1">
                          Workspace Name
                        </label>
                        <input
                          type="text"
                          defaultValue="enterprise-design-system"
                          className="w-full h-8 px-2.5 rounded-lg border border-border bg-surface text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Configure your project namespace and repository credentials.
                      </p>
                    </div>
                  ),
                },
                {
                  id: 'target',
                  label: 'Deployment Target',
                  content: (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-foreground">Select cloud provider:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['AWS Lambda', 'Google Cloud', 'Cloudflare'].map((c, i) => (
                          <div
                            key={c}
                            className={`p-2 rounded-lg border text-xs text-center cursor-pointer ${
                              i === 1 ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-border bg-surface text-muted-foreground'
                            }`}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-muted-foreground pt-1">
                        Edge workers replicate assets across 300+ global points of presence.
                      </p>
                    </div>
                  ),
                },
                {
                  id: 'security',
                  label: 'Security & Access',
                  content: (
                    <div className="space-y-2 text-xs">
                      <p className="font-medium text-foreground">Security Compliance Gates:</p>
                      <div className="space-y-2 pt-1">
                        <Checkbox
                          sizeVariant="sm"
                          defaultChecked
                          label="Enable zero-trust identity token verification"
                        />
                        <Checkbox
                          sizeVariant="sm"
                          defaultChecked
                          label="Enforce TLS 1.3 encryption for edge connections"
                        />
                        <Checkbox
                          sizeVariant="sm"
                          label="Automate SOC2 compliance audit log exports"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'review',
                  label: 'Review & Launch',
                  content: (
                    <div className="space-y-2 text-xs">
                      <p className="font-semibold text-foreground">Review Summary:</p>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        <li>Workspace: <strong className="text-foreground">enterprise-design-system</strong></li>
                        <li>Provider: <strong className="text-foreground">Google Cloud Platform</strong></li>
                        <li>Zero-Trust security headers enforced</li>
                      </ul>
                      <p className="text-[11px] text-muted-foreground pt-2">
                        Click Finish below to spin up edge instances.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
};

export const PaginationPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [pagPage, setPagPage] = useState(4);
  const [pagCount, setPagCount] = useState(24);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Compass className="size-4 text-primary" />
            Pagination Controls
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Total Pages:</span>
            {[8, 24, 100].map((n) => (
              <Button
                key={n}
                size="xs"
                variant={pagCount === n ? 'primary' : 'outline'}
                onClick={() => {
                  setPagCount(n);
                  if (pagPage > n) setPagPage(n);
                }}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[300px] space-y-6">
          <Pagination
            count={pagCount}
            page={pagPage}
            onPageChange={setPagPage}
            siblings={1}
            boundaries={1}
          />

          <div className="p-3 rounded-xl bg-surface border border-border text-xs text-center max-w-xs w-full space-y-1">
            <div className="text-muted-foreground">
              Current Page: <strong className="text-foreground font-semibold">{pagPage}</strong> of{' '}
              <strong className="text-foreground font-semibold">{pagCount}</strong>
            </div>
            <p className="text-[11px] text-muted-foreground/80">
              Features spring-animated sliding indicator thumb, rolling number transitions, and live screen-reader announcements.
            </p>
          </div>
        </div>
      </div>
    );
};

export const TreeViewPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [treeSelected, setTreeSelected] = useState<string | null>('button.tsx');
  const [treeExpanded, setTreeExpanded] = useState<string[]>(['src', 'components']);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ListTree className="size-4 text-primary" />
            Tree View File Explorer
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant="outline"
              onClick={() => setTreeExpanded(['src', 'components', 'ui', 'showcase'])}
            >
              Expand All
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setTreeExpanded([])}
            >
              Collapse All
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-sm">
            <TreeView
              label="Project Files"
              expanded={treeExpanded}
              onExpandedChange={setTreeExpanded}
              selected={treeSelected}
              onSelectedChange={setTreeSelected}
              nodes={[
                {
                  id: 'src',
                  label: 'src',
                  children: [
                    {
                      id: 'components',
                      label: 'components',
                      children: [
                        {
                          id: 'ui',
                          label: 'ui',
                          children: [
                            { id: 'button.tsx', label: 'button.tsx', meta: '2.8kb' },
                            { id: 'tabs.tsx', label: 'tabs.tsx', meta: '7.4kb' },
                            { id: 'accordion.tsx', label: 'accordion.tsx', meta: '5.1kb' },
                            { id: 'wizard-steps.tsx', label: 'wizard-steps.tsx', meta: '6.2kb' },
                            { id: 'pagination.tsx', label: 'pagination.tsx', meta: '4.9kb' },
                            { id: 'tree-view.tsx', label: 'tree-view.tsx', meta: '5.6kb' },
                          ],
                        },
                        {
                          id: 'showcase',
                          label: 'showcase',
                          children: [
                            { id: 'componentsData.tsx', label: 'componentsData.tsx', meta: '42kb' },
                            { id: 'ComponentPlaygrounds.tsx', label: 'ComponentPlaygrounds.tsx', meta: '58kb' },
                          ],
                        },
                      ],
                    },
                    { id: 'App.tsx', label: 'App.tsx', meta: '1.8kb' },
                    { id: 'main.tsx', label: 'main.tsx', meta: '0.4kb' },
                  ],
                },
                { id: 'package.json', label: 'package.json', meta: '1.2kb' },
                { id: 'tsconfig.json', label: 'tsconfig.json', meta: '0.8kb' },
              ]}
            />

            {treeSelected && (
              <div className="mt-4 p-3 rounded-xl bg-surface border border-border text-xs text-muted-foreground flex items-center justify-between">
                <span>Selected item:</span>
                <span className="font-mono font-semibold text-primary">{treeSelected}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export const StickyHeaderPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [stickyExpandedH, setStickyExpandedH] = useState(68);
  const [stickyCompactH, setStickyCompactH] = useState(48);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ScrollText className="size-4 text-primary" />
            Sticky Header Controls
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Expanded Height:</span>
            {[68, 84].map((h) => (
              <Button
                key={h}
                size="xs"
                variant={stickyExpandedH === h ? 'primary' : 'outline'}
                onClick={() => setStickyExpandedH(h)}
              >
                {h}px
              </Button>
            ))}
            <span className="text-xs text-muted-foreground ml-2">Compact Height:</span>
            {[40, 48].map((h) => (
              <Button
                key={h}
                size="xs"
                variant={stickyCompactH === h ? 'primary' : 'outline'}
                onClick={() => setStickyCompactH(h)}
              >
                {h}px
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-lg">
            <StickyHeader
              title="Deployment Pipelines"
              subtitle="3 active production clusters in us-east-1 and eu-central-1"
              expandedHeight={stickyExpandedH}
              compactHeight={stickyCompactH}
              maxHeight={320}
              leading={<Rocket className="size-4 text-primary" />}
              actions={
                <Button size="xs" variant="primary" onClick={() => addToast({ title: 'Deploy Triggered', description: 'Queued rollout to edge nodes.', type: 'info' })}>
                  Rollout
                </Button>
              }
            >
              <div className="p-4 space-y-3">
                {[
                  { name: 'api-gateway', status: 'Healthy', version: 'v2.14.0', uptime: '99.99%', latency: '24ms' },
                  { name: 'auth-service', status: 'Healthy', version: 'v3.1.2', uptime: '100.0%', latency: '12ms' },
                  { name: 'billing-worker', status: 'Syncing', version: 'v1.8.6', uptime: '99.95%', latency: '65ms' },
                  { name: 'event-streaming', status: 'Healthy', version: 'v4.0.0', uptime: '99.98%', latency: '18ms' },
                  { name: 'search-indexer', status: 'Healthy', version: 'v2.9.1', uptime: '99.91%', latency: '42ms' },
                  { name: 'recommendation-engine', status: 'Healthy', version: 'v1.4.3', uptime: '99.89%', latency: '54ms' },
                  { name: 'notification-router', status: 'Healthy', version: 'v2.0.7', uptime: '100.0%', latency: '15ms' },
                  { name: 'analytics-pipeline', status: 'Healthy', version: 'v5.2.0', uptime: '99.97%', latency: '38ms' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{item.name}</div>
                      <div className="text-[11px] text-muted-foreground">{item.version} · {item.uptime} uptime</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-muted-foreground">{item.latency}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Healthy' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </StickyHeader>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Scroll the container above to test spring-interpolated title condensing and header border reveal.
            </p>
          </div>
        </div>
      </div>
    );
};

export const ReadingProgressPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const readingScrollerRef = useRef<HTMLDivElement>(null);
  const [readingWords, setReadingWords] = useState(1400);
  const [readingWpm, setReadingWpm] = useState(220);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BookmarkCheck className="size-4 text-primary" />
            Reading Progress Benchmark
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Word Count:</span>
            {[800, 1500, 3000].map((w) => (
              <Button
                key={w}
                size="xs"
                variant={readingWords === w ? 'primary' : 'outline'}
                onClick={() => setReadingWords(w)}
              >
                {w} words
              </Button>
            ))}
            <span className="text-xs text-muted-foreground ml-2">WPM:</span>
            {[180, 220, 280].map((spd) => (
              <Button
                key={spd}
                size="xs"
                variant={readingWpm === spd ? 'primary' : 'outline'}
                onClick={() => setReadingWpm(spd)}
              >
                {spd}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-xl rounded-[var(--radius)] border border-border bg-surface-elevated p-5 shadow-sm space-y-4">
            {/* Top Reading Progress Bar */}
            <ReadingProgress
              scroller={readingScrollerRef}
              words={readingWords}
              wordsPerMinute={readingWpm}
              label="Design System Article"
              doneLabel="Completed"
            />

            {/* Scrollable Article Area */}
            <div
              ref={readingScrollerRef}
              className="h-64 overflow-y-auto overscroll-contain pr-2 space-y-3.5 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3"
            >
              <h3 className="text-sm font-semibold text-foreground">1. Dynamic Design Token Architecture</h3>
              <p>
                Modern component architectures require fluid theming without coupling to a single global stylesheet.
                In es-react-components, every visual primitive reads from raw HSL CSS variables, allowing real-time
                color space transformations across dark, light, high-contrast, and custom user palettes.
              </p>
              <h3 className="text-sm font-semibold text-foreground">2. Spring Physics & Performance</h3>
              <p>
                Unlike CSS keyframe transitions that lock into fixed durations regardless of gesture velocity,
                spring-based physics calculate acceleration and damping dynamically. This ensures that rapid scroll
                flicks decelerate naturally while honoring reduced-motion preferences when requested.
              </p>
              <h3 className="text-sm font-semibold text-foreground">3. Accessibility as a First-Class Citizen</h3>
              <p>
                Screen reader users benefit from live aria-valuetext updates and landmark navigation tags.
                All progress meters expose standard progressbar roles with min, max, and current numeric attributes.
              </p>
              <h3 className="text-sm font-semibold text-foreground">4. Edge Distribution & Zero Layout Shift</h3>
              <p>
                By reserving layout height with scroll padding and placeholder geometry, containers avoid
                cumulative layout shift (CLS) when sticky headers condense or expanding menus open.
              </p>
              <div className="p-3 rounded-lg bg-surface-subtle border border-border text-center font-medium text-foreground">
                🎉 You have reached the end of the article!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export const ScrollSpyPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const scrollSpyRootRef = useRef<HTMLDivElement>(null);
  const [scrollSpyActive, setScrollSpyActive] = useState('section-1');

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Navigation2 className="size-4 text-primary" />
            Scroll Spy On-Page Navigator
          </div>
          <div className="text-xs text-muted-foreground">
            Active Section: <strong className="text-foreground uppercase font-mono">{scrollSpyActive}</strong>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-xl space-y-4">
            {/* ScrollSpy Navigation Chip Rail */}
            <ScrollSpy
              root={scrollSpyRootRef}
              offset={40}
              onChange={setScrollSpyActive}
              sections={[
                { id: 'spy-overview', label: 'Overview' },
                { id: 'spy-architecture', label: 'Architecture' },
                { id: 'spy-security', label: 'Security' },
                { id: 'spy-benchmarks', label: 'Benchmarks' },
              ]}
            />

            {/* Scroll Container */}
            <div
              ref={scrollSpyRootRef}
              className="h-72 overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-border bg-surface-elevated p-5 space-y-8 scroll-smooth"
            >
              <section id="spy-overview" className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">01</span>
                  <h4 className="font-semibold text-foreground text-sm">System Overview</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The design system powers mission-critical edge dashboards and real-time developer workflows.
                  Components are fully decoupled and export type-safe React 19 primitives with zero external stylesheet dependencies.
                </p>
              </section>

              <section id="spy-architecture" className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">02</span>
                  <h4 className="font-semibold text-foreground text-sm">Layered Architecture</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Built atop modern CSS custom properties and Motion React. All components isolate side-effects
                  and utilize ResizeObserver observers for precise layout geometry and responsive adaptations.
                </p>
              </section>

              <section id="spy-security" className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">03</span>
                  <h4 className="font-semibold text-foreground text-sm">Zero-Trust Security</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Includes strict Content Security Policy (CSP) compatibility, sanitization hooks for rich markup,
                  and automatic focus-trapping overlays with inert containment for modal dialogs.
                </p>
              </section>

              <section id="spy-benchmarks" className="space-y-2 pb-6">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">04</span>
                  <h4 className="font-semibold text-foreground text-sm">Performance Benchmarks</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sub-millisecond input response time, sub-5kb bundle footprints per component, and 60fps hardware-accelerated
                  compositor transitions even during high-frequency gesture scrolling.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
};

export const HideOnScrollPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [hidePinned, setHidePinned] = useState(false);
  const [hideIsHidden, setHideIsHidden] = useState(false);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <EyeOff className="size-4 text-primary" />
            Hide On Scroll Configuration
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="xs"
              variant={hidePinned ? 'primary' : 'outline'}
              onClick={() => setHidePinned(!hidePinned)}
            >
              {hidePinned ? 'Pinned (Always Visible)' : 'Auto-Collapse on Scroll'}
            </Button>
            <span className="text-xs text-muted-foreground">
              State: <strong className={hideIsHidden ? 'text-warning' : 'text-success'}>{hideIsHidden ? 'Hidden' : 'Visible'}</strong>
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-lg">
            <HideOnScroll
              pinned={hidePinned}
              onHiddenChange={setHideIsHidden}
              barHeight={44}
              maxHeight={320}
              bar={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-semibold text-foreground">Active Feed Monitor</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button size="xs" variant="outline" onClick={() => addToast({ title: 'Exported Feed', description: 'Downloaded telemetry logs.', type: 'info' })}>
                      Export
                    </Button>
                    <Button size="xs" variant="primary" onClick={() => addToast({ title: 'Refreshed Feed', description: 'Latest telemetry synchronized.', type: 'success' })}>
                      Sync
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="p-4 space-y-3">
                {[
                  { id: 'EVT-101', type: 'Ingress Auth', time: '10:41:02', desc: 'mTLS handshake verified for node us-east-1a' },
                  { id: 'EVT-102', type: 'Deploy Gate', time: '10:41:15', desc: 'Container image signature verified with cosign' },
                  { id: 'EVT-103', type: 'Health Probe', time: '10:41:30', desc: 'Liveness check passed across all 12 worker replicas' },
                  { id: 'EVT-104', type: 'Traffic Split', time: '10:41:48', desc: 'Canary weight increased from 10% to 25%' },
                  { id: 'EVT-105', type: 'Cache Invalidate', time: '10:42:01', desc: 'Purged edge cache tags for customer portal' },
                  { id: 'EVT-106', type: 'Database Backup', time: '10:42:19', desc: 'Incremental snapshot completed in 4.2 seconds' },
                  { id: 'EVT-107', type: 'Rate Limit', time: '10:42:35', desc: 'Throttled 14 requests exceeding 1,000 req/sec threshold' },
                  { id: 'EVT-108', type: 'Telemetry Sync', time: '10:42:50', desc: 'Exported OpenTelemetry metrics to Prometheus collector' },
                ].map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-surface border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-primary font-semibold">{item.id}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{item.time}</span>
                    </div>
                    <div className="font-medium text-foreground">{item.type}</div>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </HideOnScroll>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Scroll down inside the feed to hide the top bar; scroll up slightly to reveal it instantly.
            </p>
          </div>
        </div>
      </div>
    );
};
