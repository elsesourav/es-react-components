import React, { useState, useRef } from 'react';
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
} from '@/components/ui';
import {
  Download04Icon,
  Rocket01Icon,
  Settings02Icon,
  PaintBoardIcon,
} from '@hugeicons/core-free-icons';
import { useToast } from '@/components/ui/toast';
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
  Vote,
  GripVertical,
  Maximize2,
  Grid3X3,
} from 'lucide-react';

export const ComponentPlaygrounds: React.FC<{ componentId: string }> = ({
  componentId,
}) => {
  const { addToast } = useToast();

  // Button Playground State
  const [btnVariant, setBtnVariant] = useState<any>('primary');
  const [btnSize, setBtnSize] = useState<any>('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Badge Playground State
  const [badgeVariant, setBadgeVariant] = useState<any>('primary');
  const [badgeDot, setBadgeDot] = useState(true);

  // Card Playground State
  const [cardVariant, setCardVariant] = useState<any>('default');

  // Input Playground State
  const [inputVal, setInputVal] = useState('Antigravity Design Engine');
  const [inputError, setInputError] = useState('');
  const [inputSize, setInputSize] = useState<any>('md');
  const [inputTab, setInputTab] = useState<
    'floating' | 'inline' | 'password' | 'otp' | 'tag' | 'search' | 'standard'
  >('floating');

  // Specific Input Variants State
  const [floatEmail, setFloatEmail] = useState('alex.chen@acme.corp');
  const [floatRef, setFloatRef] = useState('INV-2026-9041');
  const [floatTouched, setFloatTouched] = useState(false);
  const isFloatBad = floatTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(floatEmail);

  const [inlineEmail, setInlineEmail] = useState('');
  const checkEmail = (v: string) => {
    if (v.trim() === '') return 'A valid work email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a complete email address (e.g. name@company.com).';
    return null;
  };

  const [passVal, setPassVal] = useState('SuperSecret!2026');
  const [passReqs, setPassReqs] = useState(true);

  const [otpVal, setOtpVal] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const [tagsVal, setTagsVal] = useState<string[]>(['react', 'tailwind', 'motion', 'theming']);
  const [searchVal, setSearchVal] = useState('');

  // Select / Dropdown Playground State
  const [selectTab, setSelectTab] = useState<'animated' | 'native'>('animated');
  const [dropdownVal, setDropdownVal] = useState('us-east');
  const [nativeSelectVal, setNativeSelectVal] = useState('us-east-1');

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);

  // LoadMore state
  const [loadMoreItems, setLoadMoreItems] = useState([
    { id: '1', customer: 'Acme Corp', total: '$1,240.00', status: 'Settled' },
    { id: '2', customer: 'Stripe Payments', total: '$890.50', status: 'Settled' },
    { id: '3', customer: 'Linear App', total: '$420.00', status: 'Pending' },
  ]);
  const loadMorePage = useRef(1);

  // StreamingText state
  const sampleStreamingReply =
    "Antigravity components are built on dynamic HSL design tokens, supporting zero-flash dark mode, spring physics via motion/react, and seamless keyboard accessibility.";
  const [streamPacing, setStreamPacing] = useState(24);
  const [streamKey, setStreamKey] = useState(0);

  // TaskSteps state
  const [taskStepIdx, setTaskStepIdx] = useState(1);
  const [taskFailed, setTaskFailed] = useState(false);

  // CollapsibleBanner state
  const [bannerVar, setBannerVar] = useState<'warning' | 'destructive' | 'info' | 'success'>('warning');

  // Presence state
  const [presenceSlots, setPresenceSlots] = useState(4);
  const presencePeople = [
    { id: '1', name: 'Elena Rostova', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80' },
    { id: '2', name: 'Marcus Sterling', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80' },
    { id: '3', name: 'Devin Vance' },
    { id: '4', name: 'Sarah Connor', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80' },
    { id: '5', name: 'Kenji Sato' },
    { id: '6', name: 'Alex Rivera' },
  ];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // CommandPalette state
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const sampleCommands = [
    { id: 'deploy', label: 'Deploy Project to Production', shortcut: ['⌘', 'D'], hint: 'Edge v2.4' },
    { id: 'settings', label: 'Open Workspace Settings', shortcut: ['⌘', ','], hint: 'Preferences' },
    { id: 'keys', label: 'Rotate API Access Keys', shortcut: ['⌘', 'K'], hint: 'Security' },
    { id: 'theme', label: 'Switch Theme Preset', hint: 'Theming' },
    { id: 'export', label: 'Export Audit Event Logs', hint: 'Compliance' },
  ];

  // Alert State
  const [alertVariant, setAlertVariant] = useState<any>('info');
  const [showAlert, setShowAlert] = useState(true);

  // Tabs State
  const [activeTab, setActiveTab] = useState('tab1');
  const [tabVariant, setTabVariant] = useState<any>('plateau');

  // SegmentedControl State
  const [segmentedVal, setSegmentedVal] = useState('weekly');
  const [segmentedVariant, setSegmentedVariant] = useState<'primary' | 'surface'>('primary');

  // Accordion State
  const [accordionType, setAccordionType] = useState<'single' | 'multiple'>('single');
  const [accordionCollapsible, setAccordionCollapsible] = useState(true);

  // WizardSteps State
  const [wizardComplete, setWizardComplete] = useState(false);

  // Pagination State
  const [pagPage, setPagPage] = useState(4);
  const [pagCount, setPagCount] = useState(24);

  // TreeView State
  const [treeSelected, setTreeSelected] = useState<string | null>('button.tsx');
  const [treeExpanded, setTreeExpanded] = useState<string[]>(['src', 'components']);

  // StickyHeader State
  const [stickyExpandedH, setStickyExpandedH] = useState(68);
  const [stickyCompactH, setStickyCompactH] = useState(48);

  // ReadingProgress State
  const readingScrollerRef = useRef<HTMLDivElement>(null);
  const [readingWords, setReadingWords] = useState(1400);
  const [readingWpm, setReadingWpm] = useState(220);

  // ScrollSpy State
  const scrollSpyRootRef = useRef<HTMLDivElement>(null);
  const [scrollSpyActive, setScrollSpyActive] = useState('section-1');

  // HideOnScroll State
  const [hidePinned, setHidePinned] = useState(false);
  const [hideIsHidden, setHideIsHidden] = useState(false);

  // FilterGrid State
  const [filterGridCat, setFilterGridCat] = useState('all');
  const [filterGridCols, setFilterGridCols] = useState(3);

  // PollResults State
  const [pollVotedId, setPollVotedId] = useState<string | null>(null);

  // SliderDetents State
  const [sliderDetentsVal, setSliderDetentsVal] = useState(4);

  // ReorderList State
  const [reorderItems, setReorderItems] = useState([
    { id: 'r1', title: 'Edge Routing Ingress Gateway', badge: 'Critical', latency: '8ms' },
    { id: 'r2', title: 'Zero-Trust Identity Verifier', badge: 'High', latency: '14ms' },
    { id: 'r3', title: 'Distributed Cache Invalidation', badge: 'Normal', latency: '28ms' },
    { id: 'r4', title: 'Prometheus Telemetry Collector', badge: 'Low', latency: '42ms' },
  ]);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxThumbRef = useRef<HTMLButtonElement>(null);

  // Switch State
  const [switchChecked, setSwitchChecked] = useState(true);

  // Checkbox State
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  // TextLoop State
  const [loopText, setLoopText] = useState('React ✦ Bits');
  const [loopShape, setLoopShape] = useState<any>('wave');
  const [loopSpeed, setLoopSpeed] = useState(90);
  const [loopDirection, setLoopDirection] = useState<'forward' | 'reverse'>('forward');
  const [loopCurviness, setLoopCurviness] = useState(90);
  const [loopTilt, setLoopTilt] = useState(0);
  const [loopFontSize, setLoopFontSize] = useState(46);
  const [loopRibbon, setLoopRibbon] = useState(true);
  const [loopRibbonColor, setLoopRibbonColor] = useState('#5227FF');
  const [loopRibbonWidth, setLoopRibbonWidth] = useState(86);
  const [loopCross, setLoopCross] = useState(false);
  const [loopCrossAngle, setLoopCrossAngle] = useState(16);
  const [loopDraggable, setLoopDraggable] = useState(true);
  const [loopOutline, setLoopOutline] = useState(false);
  const [loopPauseOnHover, setLoopPauseOnHover] = useState(true);

  // SplitFlapText State
  const [flapWords] = useState<string[]>([
    'LAUNCH READY',
    'SYNC ONLINE',
    'SIGNAL LIVE',
  ]);
  const [flapDuration, setFlapDuration] = useState(0.12);
  const [flapStagger, setFlapStagger] = useState(0.06);
  const [flapCycleDelay, setFlapCycleDelay] = useState(2400);
  const [flapFlipsPerChar, setFlapFlipsPerChar] = useState(8);
  const [flapOrder, setFlapOrder] = useState<any>('left');
  const [flapTileStyle, setFlapTileStyle] = useState<any>('board');
  const [flapDepth, setFlapDepth] = useState(0.5);
  const [flapGlare, setFlapGlare] = useState(0);

  // BranchedMenu State
  const [menuActive, setMenuActive] = useState('quick');
  const [menuWidth, setMenuWidth] = useState(240);
  const [menuRowHeight, setMenuRowHeight] = useState(36);
  const [menuIndent, setMenuIndent] = useState(40);
  const [menuTrunk, setMenuTrunk] = useState(14);
  const [menuRadius, setMenuRadius] = useState(10);
  const [menuLineWidth, setMenuLineWidth] = useState(1.5);

  // PeekRating State
  const [ratingVal, setRatingVal] = useState(4);
  const [ratingCount, setRatingCount] = useState(5);
  const [ratingShape, setRatingShape] = useState<any>('star');
  const [ratingSize, setRatingSize] = useState(28);
  const [ratingLift, setRatingLift] = useState(6);
  const [ratingMagnify, setRatingMagnify] = useState(1.15);
  const [ratingPopScale, setRatingPopScale] = useState(1.3);
  const [ratingShowTip, setRatingShowTip] = useState(true);
  const [ratingAllowClear, setRatingAllowClear] = useState(true);
  const [ratingActiveColor, setRatingActiveColor] = useState('#f5b400');

  // LiquidGlassSheet State
  const [glassTitle, setGlassTitle] = useState('Autumn forest');
  const [glassSubtitle, setGlassSubtitle] = useState('Liquid glass sheet');
  const [glassTheme, setGlassTheme] = useState<'light' | 'dark'>('light');

  // CardCoverFlow State
  const [coverflowMonochrome, setCoverflowMonochrome] = useState(false);
  const [coverflowIndex, setCoverflowIndex] = useState(2);

  // CardCarousel State
  const [carouselMonochrome, setCarouselMonochrome] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(2);

  // Interactive Micro-Controls State
  const [microTheme, setMicroTheme] = useState<'dark' | 'light'>('dark');
  const [stepperVal, setStepperVal] = useState(3);
  const [counterVal, setCounterVal] = useState(4);
  const [segmentedTabVal, setSegmentedTabVal] = useState<'A' | 'B'>('A');
  const [viewModeVal, setViewModeVal] = useState<'grid' | 'list'>('grid');
  const [isFollowingVal, setIsFollowingVal] = useState(false);
  const [compactModeVal, setCompactModeVal] = useState<'grid' | 'list'>('grid');

  // Motion Loaders State
  const [loaderSize, setLoaderSize] = useState<'sm' | 'md' | 'lg'>('md');

  // AI & Workspace Components State
  const [boardTheme, setBoardTheme] = useState<'dark' | 'light'>('dark');
  const [boardKey, setBoardKey] = useState(0);

  const [approvalTheme, setApprovalTheme] = useState<'light' | 'dark'>('light');
  const [approvalSubmissions, setApprovalSubmissions] = useState<string | null>(null);
  const [approvalKey, setApprovalKey] = useState(0);

  const [promptTheme, setPromptTheme] = useState<'dark' | 'light'>('dark');
  const [promptVariant, setPromptVariant] = useState<'Rounded' | 'Pill'>('Rounded');
  const [promptDemo, setPromptDemo] = useState(true);
  const [promptTall, setPromptTall] = useState(false);
  const [promptLastSent, setPromptLastSent] = useState<string | null>(null);

  const [codeTheme, setCodeTheme] = useState<'light' | 'dark'>('light');
  const [codeVariant, setCodeVariant] = useState<'auto' | 'Code' | 'Diff'>('auto');
  const [codeCopiedNotice, setCodeCopiedNotice] = useState<string | null>(null);

  const [fineTuneTheme, setFineTuneTheme] = useState<'light' | 'dark'>('light');
  const [fineTuneLastState, setFineTuneLastState] = useState<any>(null);

  // Sample dropdown items
  const regionItems = [
    { value: 'us-east', label: 'US East (N. Virginia)', hint: '14ms', icon: <Server className="size-4" /> },
    { value: 'us-west', label: 'US West (Oregon)', hint: '38ms', icon: <Server className="size-4" /> },
    { value: 'eu-west', label: 'Europe (Frankfurt)', hint: '82ms', icon: <Globe className="size-4" /> },
    { value: 'ap-tokyo', label: 'Asia Pacific (Tokyo)', hint: '124ms', icon: <Globe className="size-4" /> },
    { value: 'ap-singapore', label: 'Asia Pacific (Singapore)', hint: '110ms', icon: <Globe className="size-4" /> },
    { value: 'sa-east', label: 'South America (São Paulo)', hint: '145ms', disabled: true, icon: <Server className="size-4" /> },
  ];

  /* =========================================================================
     BUTTON
     ========================================================================= */
  if (componentId === 'button') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Controls
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={btnLoading}
                  onChange={(e) => setBtnLoading(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Loading State
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={btnDisabled}
                  onChange={(e) => setBtnDisabled(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Disabled
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">
                Variant
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'primary',
                  'secondary',
                  'outline',
                  'ghost',
                  'danger',
                  'success',
                  'subtle',
                ].map((v) => (
                  <button
                    key={v}
                    onClick={() => setBtnVariant(v)}
                    className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors ${
                      btnVariant === v
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['xs', 'sm', 'md', 'lg', 'icon'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setBtnSize(s)}
                    className={`px-3 py-1 text-xs rounded-lg border uppercase transition-colors ${
                      btnSize === s
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-10 rounded-xl bg-surface-subtle/50 border border-border/60 flex flex-col items-center justify-center min-h-[160px] gap-4">
            <Button
              variant={btnVariant}
              size={btnSize}
              isLoading={btnLoading}
              disabled={btnDisabled}
              leftIcon={btnSize !== 'icon' ? <Sparkles className="h-4 w-4" /> : undefined}
              rightIcon={btnSize !== 'icon' ? <ArrowRight className="h-4 w-4" /> : undefined}
              onClick={() =>
                addToast({
                  title: 'Button Clicked!',
                  description: `Triggered variant="${btnVariant}" size="${btnSize}"`,
                  type: 'info',
                })
              }
            >
              {btnSize === 'icon' ? <Sparkles className="h-4 w-4" /> : 'Button Action'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Click the button above to test interaction feedback
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            All Variant Types
          </h4>
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap gap-3 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     BADGE
     ========================================================================= */
  if (componentId === 'badge') {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Controls
            </span>
            <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={badgeDot}
                onChange={(e) => setBadgeDot(e.target.checked)}
                className="rounded border-border text-primary"
              />
              Show Status Dot
            </label>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Variant
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'default',
                'primary',
                'secondary',
                'outline',
                'success',
                'warning',
                'danger',
                'info',
              ].map((v) => (
                <button
                  key={v}
                  onClick={() => setBadgeVariant(v)}
                  className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors ${
                    badgeVariant === v
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-xl bg-surface-subtle/50 border border-border/60 flex items-center justify-center min-h-[140px]">
            <Badge variant={badgeVariant} dot={badgeDot} size="md">
              {badgeVariant} status
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     CARD
     ========================================================================= */
  if (componentId === 'card') {
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
  }

  /* =========================================================================
     FLOATING LABEL INPUT (Dedicated Page)
     ========================================================================= */
  if (componentId === 'floating-input') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto space-y-5">
          <FloatingLabelInput
            label="Work Email Address"
            type="email"
            value={floatEmail}
            onChange={setFloatEmail}
            onBlur={() => setFloatTouched(true)}
            invalid={isFloatBad}
            hint={isFloatBad ? "Needs to look like name@company.com" : "Official business receipts are sent here."}
            required
          />

          <FloatingLabelInput
            label="Invoice Reference ID"
            value={floatRef}
            onChange={setFloatRef}
            maxLength={18}
            hint="Printed directly on the quarterly statement header."
          />

          <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs space-y-1.5 font-mono">
            <div className="text-muted-foreground font-semibold">Live State:</div>
            <div>email: <span className="text-primary">{floatEmail || '(empty)'}</span></div>
            <div>reference: <span className="text-primary">{floatRef}</span></div>
            <div>invalid: <span className={isFloatBad ? "text-destructive" : "text-success"}>{String(isFloatBad)}</span></div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     OTP INPUT (Dedicated Page)
     ========================================================================= */
  if (componentId === 'otp-input') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            OTP Controls & Actions
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setOtpStatus(otpStatus === 'error' ? 'idle' : 'error');
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                otpStatus === 'error'
                  ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {otpStatus === 'error' ? 'Clear Error' : 'Simulate Rejection'}
            </button>
            <button
              onClick={() => {
                setOtpVal('');
                setOtpStatus('idle');
              }}
              className="px-3 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto flex flex-col items-center justify-center p-6 space-y-4">
          <p className="text-sm font-medium text-foreground text-center">
            Enter 6-digit confirmation code
          </p>
          <OtpInput
            length={6}
            value={otpVal}
            onChange={(code) => {
              setOtpVal(code);
              if (otpStatus === 'error') setOtpStatus('idle');
            }}
            status={otpStatus}
            errorMessage="That authentication code is incorrect. Please verify."
            hint="Tip: You can paste all 6 digits into any cell."
            onComplete={(fullCode) => {
              addToast({
                title: 'Code Verified!',
                description: `Received full OTP: ${fullCode}`,
                type: 'success',
              });
            }}
          />

          <div className="text-xs text-muted-foreground font-mono mt-2">
            Entered: <span className="text-primary font-bold">{otpVal || '—'}</span> (length: {otpVal.length}/6)
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     TAG INPUT (Dedicated Page)
     ========================================================================= */
  if (componentId === 'tag-input') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto space-y-4">
          <TagInput
            label="Repository Topics"
            value={tagsVal}
            onChange={setTagsVal}
            max={8}
            separators={[',', ';']}
            validate={(tag) => tag.length <= 20}
            hint="Press Enter or comma (,) to add · Backspace highlights then removes"
          />

          <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs space-y-1 font-mono">
            <span className="text-muted-foreground font-semibold">Active Tag Tokens ({tagsVal.length}/8):</span>
            <div className="text-primary truncate">{JSON.stringify(tagsVal)}</div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     PASSWORD INPUT & STRENGTH (Dedicated Page)
     ========================================================================= */
  if (componentId === 'password-input') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Display Settings
          </span>
          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={passReqs}
              onChange={(e) => setPassReqs(e.target.checked)}
              className="rounded border-border text-primary"
            />
            Show Requirements Checklist
          </label>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <PasswordInput
            label="Master Password"
            value={passVal}
            onChange={setPassVal}
            showStrengthMeter
            showRequirements={passReqs}
            placeholder="Type your secure password..."
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     EXPANDING SEARCH (Dedicated Page)
     ========================================================================= */
  if (componentId === 'expanding-search') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto p-6 rounded-xl bg-surface-subtle/50 border border-border/60 flex flex-col items-center gap-6">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Collapsible Spring Search Bar:
            </span>
            <span className="text-xs font-mono text-muted-foreground">Click icon to expand</span>
          </div>

          <div className="w-full flex justify-end">
            <ExpandingSearch
              label="Global Search"
              placeholder="Search components, APIs, tokens..."
              value={searchVal}
              onChange={setSearchVal}
              resultCount={searchVal ? 8 : undefined}
            />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[10px]">Esc</kbd> to clear query or collapse back to the trigger icon.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================================
     INPUT (All-in-One Master Playground)
     ========================================================================= */
  if (componentId === 'input') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          {/* Sub-variant Tabs Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Input Variant:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'floating', label: 'Floating Label' },
                { id: 'inline', label: 'Inline Validation' },
                { id: 'password', label: 'Password + Strength' },
                { id: 'otp', label: 'OTP Code' },
                { id: 'tag', label: 'Tags / Chips' },
                { id: 'search', label: 'Expanding Search' },
                { id: 'standard', label: 'Standard Input' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInputTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium ${
                    inputTab === tab.id
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Variant Interactive Preview Area */}
          <div className="p-6 sm:p-8 rounded-xl bg-surface-subtle/40 border border-border/60 min-h-[220px] flex items-center justify-center">
            <div className="w-full max-w-md space-y-4">
              {inputTab === 'floating' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Floating Label Variant</span>
                    <button
                      onClick={() => setFloatTouched(!floatTouched)}
                      className="text-primary hover:underline"
                    >
                      Toggle touched ({String(floatTouched)})
                    </button>
                  </div>
                  <Input
                    variant="floating"
                    label="Corporate Email"
                    type="email"
                    value={floatEmail}
                    onChange={setFloatEmail}
                    onBlur={() => setFloatTouched(true)}
                    invalid={isFloatBad}
                    hint={isFloatBad ? "Must follow user@company.com format" : "Floating label elevates automatically on focus or text."}
                  />
                  <Input
                    variant="floating"
                    label="Transaction Code"
                    value={floatRef}
                    onChange={setFloatRef}
                    maxLength={16}
                    hint="Length limit indicators stick to bottom right."
                  />
                </div>
              )}

              {inputTab === 'inline' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="text-xs text-muted-foreground mb-1">
                    Instant validation callback with live status icon
                  </div>
                  <Input
                    variant="inline-validation"
                    label="Team Invite Email"
                    type="email"
                    value={inlineEmail}
                    onChange={setInlineEmail}
                    validate={checkEmail}
                    placeholder="teammate@company.com"
                    hint="Type an invalid email, then a valid email to observe live reactive feedback."
                  />
                </div>
              )}

              {inputTab === 'password' && (
                <div className="space-y-4 animate-in fade-in">
                  <Input
                    variant="password"
                    label="Create Account Password"
                    value={passVal}
                    onChange={setPassVal}
                    showStrengthMeter
                    showRequirements
                  />
                </div>
              )}

              {inputTab === 'otp' && (
                <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                  <p className="text-xs text-muted-foreground text-center">
                    Segmented 6-digit verification code with clipboard paste
                  </p>
                  <Input
                    variant="otp"
                    length={6}
                    value={otpVal}
                    onChange={(code) => {
                      setOtpVal(code);
                      if (otpStatus === 'error') setOtpStatus('idle');
                    }}
                    status={otpStatus}
                    errorMessage="That verification token is invalid."
                    hint="Auto-advances to next input & handles backspace"
                    onComplete={(code) => {
                      addToast({
                        title: 'OTP Completed',
                        description: `Entered code: ${code}`,
                        type: 'success',
                      });
                    }}
                  />
                  <button
                    onClick={() => setOtpStatus(otpStatus === 'error' ? 'idle' : 'error')}
                    className="text-xs px-2.5 py-1 rounded border border-border text-muted-foreground hover:text-foreground"
                  >
                    {otpStatus === 'error' ? 'Clear Error Shake' : 'Simulate Code Failure'}
                  </button>
                </div>
              )}

              {inputTab === 'tag' && (
                <div className="space-y-4 animate-in fade-in">
                  <Input
                    variant="tag"
                    label="Project Keywords"
                    value={tagsVal}
                    onChange={setTagsVal}
                    max={6}
                    separators={[',', ';']}
                    hint="Type a keyword and press Enter or comma. Backspace to delete."
                  />
                </div>
              )}

              {inputTab === 'search' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Spring Physics Collapsible Search</span>
                    <span className="font-mono">{searchVal ? `"${searchVal}"` : 'idle'}</span>
                  </div>
                  <div className="flex justify-end">
                    <Input
                      variant="search"
                      label="Documentation Search"
                      placeholder="Type to search library..."
                      value={searchVal}
                      onChange={setSearchVal}
                      resultCount={searchVal ? 12 : undefined}
                    />
                  </div>
                </div>
              )}

              {inputTab === 'standard' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex justify-between items-center border-b border-border/40 pb-2">
                    <span className="text-xs text-muted-foreground">Standard Form Field</span>
                    <button
                      onClick={() => setInputError(inputError ? '' : 'This field is required.')}
                      className={`text-xs px-2 py-0.5 rounded border ${
                        inputError ? 'border-destructive text-destructive' : 'border-border text-muted-foreground'
                      }`}
                    >
                      {inputError ? 'Clear Error' : 'Trigger Error'}
                    </button>
                  </div>
                  <Input
                    label="Application Domain"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    error={inputError}
                    helperText="Configured via your workspace DNS records."
                    leftIcon={<Globe className="h-4 w-4" />}
                  />
                  <Input
                    label="Read-only API Key"
                    defaultValue="pk_live_891249120491"
                    disabled
                    leftIcon={<Key className="h-4 w-4" />}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Code Usage Tip */}
          <div className="p-4 rounded-xl bg-surface border border-border/80 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Zap className="size-3.5 text-primary" />
              <span>Unified Component or Dedicated Imports</span>
            </div>
            <p className="text-muted-foreground">
              You can either use the all-in-one <code className="text-primary font-mono bg-surface-subtle px-1 py-0.5 rounded">&lt;Input variant="{inputTab}" /&gt;</code> or import dedicated components directly: <code className="text-primary font-mono bg-surface-subtle px-1 py-0.5 rounded">import &#123; FloatingLabelInput, OtpInput, TagInput &#125; from 'es-react-components'</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     TEXTAREA
     ========================================================================= */
  if (componentId === 'textarea') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="max-w-lg mx-auto">
          <Textarea
            label="Product Roadmap Summary"
            placeholder="Outline your architectural specifications here..."
            maxLength={250}
            characterCount
            rows={5}
            helperText="Supports markdown formatting and line breaks."
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     DROPDOWN (Dedicated Page)
     ========================================================================= */
  if (componentId === 'dropdown') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <Dropdown
              label="Select Active Deployment Zone"
              items={regionItems}
              value={dropdownVal}
              onChange={setDropdownVal}
              fullWidth
            />
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs space-y-2 font-mono">
            <div className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
              Active Selection:
            </div>
            <div className="flex items-center justify-between">
              <span>Value: <strong className="text-primary">{dropdownVal}</strong></span>
              <span className="text-muted-foreground">Spring physics motion/react</span>
            </div>
            <p className="text-muted-foreground font-sans text-xs">
              Supports ArrowUp, ArrowDown, Enter, Esc, and character-key typeahead!
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     SELECT (Unified & Dual-Mode Playground)
     ========================================================================= */
  if (componentId === 'select') {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Component Type:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectTab('animated')}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium ${
                  selectTab === 'animated'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                Spring Dropdown (Animated)
              </button>
              <button
                onClick={() => setSelectTab('native')}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium ${
                  selectTab === 'native'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                Native HTML5 Select
              </button>
            </div>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-xl bg-surface-subtle/40 border border-border/60 min-h-[220px] flex items-center justify-center">
            <div className="w-full space-y-4">
              {selectTab === 'animated' ? (
                <div className="space-y-3 animate-in fade-in">
                  <Dropdown
                    label="Cloud Infrastructure Region"
                    items={regionItems}
                    value={dropdownVal}
                    onChange={setDropdownVal}
                    fullWidth
                  />
                  <div className="text-xs text-muted-foreground flex items-center justify-between pt-2">
                    <span>Selected: <strong className="text-primary font-mono">{dropdownVal}</strong></span>
                    <span className="text-[11px] font-mono">Sliding pill indicator</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in">
                  <Select
                    label="Production Hosting Region"
                    helperText="Standard browser select dropdown for simple lightweight forms."
                    value={nativeSelectVal}
                    onChange={(e: any) => setNativeSelectVal(e.target.value)}
                    options={[
                      { label: 'US East (N. Virginia)', value: 'us-east-1' },
                      { label: 'Europe Central (Frankfurt)', value: 'eu-central-1' },
                      { label: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1' },
                      { label: 'South America (São Paulo)', value: 'sa-east-1' },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     SWITCH
     ========================================================================= */
  if (componentId === 'switch') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="max-w-md mx-auto space-y-5">
          <Switch
            label="Real-time Synchronization"
            description="Broadcast state updates over WebSockets automatically."
            checked={switchChecked}
            onChange={(e) => setSwitchChecked(e.target.checked)}
          />
          <Switch
            label="Two-Factor Authentication"
            description="Require authenticator OTP on login from new devices."
            defaultChecked={false}
          />
          <Switch
            label="Maintenance Mode"
            description="Diverts inbound public requests to the maintenance holding page."
            disabled
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     CHECKBOX
     ========================================================================= */
  if (componentId === 'checkbox') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div className="max-w-md mx-auto space-y-4">
          <Checkbox
            label="Subscribe to Security Advisories"
            description="Get notified immediately about critical CVE patches."
            checked={checkboxChecked}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
          />
          <Checkbox
            label="Enable Automated Daily Backups"
            description="Snapshots retained for 30 rolling calendar days."
            defaultChecked
          />
          <Checkbox
            label="Strict Content Security Policy (CSP)"
            description="Disallows inline script tags and remote unsafe evaluations."
            disabled
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     DIALOG
     ========================================================================= */
  if (componentId === 'dialog') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[200px] gap-4">
        <Button variant="primary" onClick={() => setDialogOpen(true)}>
          Open Modal Dialog
        </Button>
        <Dialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Deploy Production Release"
          description="You are about to roll out tag v2.4.0 to 18 worldwide edge edge locations."
        >
          <div className="space-y-4 py-2">
            <div className="p-3.5 rounded-xl bg-surface-subtle border border-border/80 text-xs space-y-1">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" /> Verification Checklist
              </div>
              <ul className="text-muted-foreground list-disc pl-4 space-y-0.5">
                <li>Automated e2e regression suite passed (412 tests)</li>
                <li>Zero database migration schema conflicts</li>
                <li>Zero-downtime rolling deployment enabled</li>
              </ul>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setDialogOpen(false);
                  addToast({
                    title: 'Deployment Initiated',
                    description: 'Rolling build v2.4.0 to edge cluster.',
                    type: 'success',
                  });
                }}
              >
                Confirm Release
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  /* =========================================================================
     ALERT
     ========================================================================= */
  if (componentId === 'alert') {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex items-center gap-2 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
              Alert Variant:
            </span>
            {['info', 'success', 'warning', 'danger'].map((v) => (
              <button
                key={v}
                onClick={() => {
                  setAlertVariant(v);
                  setShowAlert(true);
                }}
                className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors ${
                  alertVariant === v
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto space-y-3">
            {showAlert ? (
              <Alert
                variant={alertVariant}
                title={`${alertVariant.toUpperCase()} Alert Box`}
                onDismiss={() => setShowAlert(false)}
              >
                Reactive notifications styled with HSL status tokens. Supports inline dismiss controls.
              </Alert>
            ) : (
              <div className="text-center py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAlert(true)}
                >
                  Restore Dismissed Alert
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     TABS
     ========================================================================= */
  if (componentId === 'tabs') {
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
  }

  /* =========================================================================
     AVATAR
     ========================================================================= */
  if (componentId === 'avatar') {
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
  }

  /* =========================================================================
     STAT
     ========================================================================= */
  if (componentId === 'stat') {
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
  }

  /* =========================================================================
     TOAST
     ========================================================================= */
  if (componentId === 'toast') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-center gap-3 min-h-[160px]">
        <Button
          variant="primary"
          onClick={() =>
            addToast({
              title: 'Changes Saved',
              description: 'Profile configurations synchronized with edge storage.',
              type: 'success',
            })
          }
        >
          Success Toast
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            addToast({
              title: 'Connection Dropped',
              description: 'Retrying socket handshake in 3 seconds...',
              type: 'error',
            })
          }
        >
          Danger Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            addToast({
              title: 'Maintenance Advisory',
              description: 'Scheduled edge upgrades tonight at 02:00 UTC.',
              type: 'info',
            })
          }
        >
          Info Toast
        </Button>
      </div>
    );
  }

  /* =========================================================================
     SPINNER & SKELETON
     ========================================================================= */
  if (componentId === 'spinner') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-8 py-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
        <div className="max-w-md mx-auto space-y-3 pt-4 border-t border-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Skeleton Pulse Shimmer
          </span>
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  /* =========================================================================
     TEXT LOOP (CURVED RIBBON MARQUEE)
     ========================================================================= */
  if (componentId === 'text-loop') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Path & Ribbon Controls
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={loopRibbon}
                  onChange={(e) => setLoopRibbon(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Ribbon Band
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={loopCross}
                  onChange={(e) => setLoopCross(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Cross Ribbon
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={loopDraggable}
                  onChange={(e) => setLoopDraggable(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Draggable
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={loopPauseOnHover}
                  onChange={(e) => setLoopPauseOnHover(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Pause on Hover
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={loopOutline}
                  onChange={(e) => setLoopOutline(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Outline Text
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Display Text
              </label>
              <input
                type="text"
                value={loopText}
                onChange={(e) => setLoopText(e.target.value)}
                className="w-full h-8 px-2.5 text-xs rounded-md bg-surface-elevated border border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Guide Path Shape
              </label>
              <select
                value={loopShape}
                onChange={(e) => setLoopShape(e.target.value as any)}
                className="w-full h-8 px-2 text-xs rounded-md bg-surface-elevated border border-border text-foreground"
              >
                <option value="wave">Wave</option>
                <option value="circle">Circle</option>
                <option value="infinity">Infinity</option>
                <option value="arch">Arch</option>
                <option value="line">Line</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Flow Direction
              </label>
              <div className="flex gap-1">
                {(['forward', 'reverse'] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setLoopDirection(dir)}
                    className={`flex-1 h-8 rounded-md text-xs font-medium capitalize border transition-all ${
                      loopDirection === dir
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-surface-elevated text-muted-foreground border-border'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Ribbon Color
              </label>
              <div className="flex items-center gap-1.5">
                {['#5227FF', '#6366f1', '#06b6d4', '#10b981', '#f97316', '#ec4899'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setLoopRibbonColor(c)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      loopRibbonColor === c ? 'scale-110 border-white shadow-sm' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-border/40">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Speed ({loopSpeed}px/s)</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                value={loopSpeed}
                onChange={(e) => setLoopSpeed(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Curviness ({loopCurviness})</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={loopCurviness}
                onChange={(e) => setLoopCurviness(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Tilt Angle ({loopTilt}°)</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={loopTilt}
                onChange={(e) => setLoopTilt(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Font Size ({loopFontSize}px)</span>
              </div>
              <input
                type="range"
                min="24"
                max="72"
                value={loopFontSize}
                onChange={(e) => setLoopFontSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Live Canvas Box */}
        <div className="p-6 rounded-2xl bg-surface-sunken/40 border border-border flex items-center justify-center overflow-hidden min-h-[340px]">
          <TextLoop
            text={loopText}
            shape={loopShape}
            speed={loopSpeed}
            direction={loopDirection}
            separator="✦"
            curviness={loopCurviness}
            tilt={loopTilt}
            fontSize={loopFontSize}
            fontWeight={800}
            letterSpacing={2}
            uppercase
            ribbon={loopRibbon}
            ribbonColor={loopRibbonColor}
            ribbonWidth={loopRibbonWidth}
            edgeFade={0}
            cross={loopCross}
            crossAngle={loopCrossAngle}
            draggable={loopDraggable}
            scrollBoost={0}
            outline={loopOutline}
            pauseOnHover={loopPauseOnHover}
            outlineWidth={1.5}
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     SPLIT FLAP TEXT (MECHANICAL DEPARTURE BOARD)
     ========================================================================= */
  if (componentId === 'split-flap-text') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Mechanical Split-Tile Controls
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Tile Style:</span>
              {(['board', 'minimal'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFlapTileStyle(st)}
                  className={`h-7 px-2.5 rounded-md text-xs font-medium capitalize border transition-all ${
                    flapTileStyle === st
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-surface-elevated text-muted-foreground border-border'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Flip Speed ({flapDuration}s)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.01"
                value={flapDuration}
                onChange={(e) => setFlapDuration(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Stagger Delay ({flapStagger}s)</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.15"
                step="0.01"
                value={flapStagger}
                onChange={(e) => setFlapStagger(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Cycle Hold ({(flapCycleDelay / 1000).toFixed(1)}s)</span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="200"
                value={flapCycleDelay}
                onChange={(e) => setFlapCycleDelay(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Flips Per Slot ({flapFlipsPerChar})</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="1"
                value={flapFlipsPerChar}
                onChange={(e) => setFlapFlipsPerChar(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/40">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Cascade Transition Order
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['left', 'right', 'center', 'random'] as const).map((ord) => (
                  <button
                    key={ord}
                    onClick={() => setFlapOrder(ord)}
                    className={`h-7 rounded-md text-xs font-medium capitalize border transition-all ${
                      flapOrder === ord
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-surface-elevated text-muted-foreground border-border'
                    }`}
                  >
                    {ord}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Bevel Depth ({flapDepth})</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={flapDepth}
                onChange={(e) => setFlapDepth(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Glare Sheen ({flapGlare})</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={flapGlare}
                onChange={(e) => setFlapGlare(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Live Flap Display */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#090d16] border border-border shadow-inner flex flex-col items-center justify-center overflow-x-auto min-h-[220px]">
          <SplitFlapText
            words={flapWords}
            flipDuration={flapDuration}
            stagger={flapStagger}
            cycleDelay={flapCycleDelay}
            charset="alphanumeric"
            flipsPerChar={flapFlipsPerChar}
            order={flapOrder}
            align="left"
            tileStyle={flapTileStyle}
            tileColor="#111827"
            textColor="#f8fafc"
            glare={flapGlare}
            depth={flapDepth}
            tileRadius={8}
            gap={6}
            fontSize={52}
            loop
            padTo={12}
            intro
          />
          <span className="text-[11px] text-muted-foreground mt-4 font-mono tracking-wider">
            AUTOMATIC MECHANICAL SPLIT-FLAP TRANSITION
          </span>
        </div>
      </div>
    );
  }

  /* =========================================================================
     BRANCHED MENU (TREE NAVIGATION)
     ========================================================================= */
  if (componentId === 'branched-menu') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tree Geometry & Layout Settings
            </span>
            <div className="text-xs text-muted-foreground font-mono">
              Active Value: <span className="text-primary font-semibold">"{menuActive}"</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Row Height ({menuRowHeight}px)</span>
              </div>
              <input
                type="range"
                min="28"
                max="48"
                value={menuRowHeight}
                onChange={(e) => setMenuRowHeight(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Child Indent ({menuIndent}px)</span>
              </div>
              <input
                type="range"
                min="24"
                max="60"
                value={menuIndent}
                onChange={(e) => setMenuIndent(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Arc Radius ({menuRadius}px)</span>
              </div>
              <input
                type="range"
                min="4"
                max="16"
                value={menuRadius}
                onChange={(e) => setMenuRadius(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Line Width ({menuLineWidth}px)</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.5"
                value={menuLineWidth}
                onChange={(e) => setMenuLineWidth(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Live Tree Preview */}
        <div className="p-8 rounded-2xl bg-surface border border-border flex justify-center min-h-[300px]">
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
            width={menuWidth}
            rowHeight={menuRowHeight}
            indent={menuIndent}
            trunk={menuTrunk}
            radius={menuRadius}
            lineWidth={menuLineWidth}
            fontSize={14}
            drawDuration={400}
            foldDuration={300}
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     PEEK RATING (INTERACTIVE STAR & SHAPE RATER)
     ========================================================================= */
  if (componentId === 'peek-rating') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Rating Props
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={ratingShowTip}
                  onChange={(e) => setRatingShowTip(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Show Floating Tip
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={ratingAllowClear}
                  onChange={(e) => setRatingAllowClear(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Allow Clear
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Rating Glyph Shape
              </label>
              <div className="flex gap-1">
                {(['star', 'heart', 'bolt'] as const).map((shp) => (
                  <button
                    key={shp}
                    onClick={() => setRatingShape(shp)}
                    className={`flex-1 h-8 rounded-md text-xs font-medium capitalize border transition-all ${
                      ratingShape === shp
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-surface-elevated text-muted-foreground border-border'
                    }`}
                  >
                    {shp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Active Fill Color
              </label>
              <div className="flex items-center gap-2 pt-1">
                {['#f5b400', '#f43f5e', '#6366f1', '#10b981', '#06b6d4'].map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setRatingActiveColor(col)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      ratingActiveColor === col ? 'scale-110 border-white shadow-sm' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Unit Count ({ratingCount})</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={ratingCount}
                onChange={(e) => setRatingCount(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Icon Size ({ratingSize}px)</span>
              </div>
              <input
                type="range"
                min="20"
                max="44"
                value={ratingSize}
                onChange={(e) => setRatingSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/40">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Hover Lift ({ratingLift}px)</span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                value={ratingLift}
                onChange={(e) => setRatingLift(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Magnify Scale ({ratingMagnify}x)</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="1.4"
                step="0.05"
                value={ratingMagnify}
                onChange={(e) => setRatingMagnify(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Commit Pop Bounce ({ratingPopScale}x)</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="1.6"
                step="0.05"
                value={ratingPopScale}
                onChange={(e) => setRatingPopScale(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Live Rating Box */}
        <div className="p-10 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center space-y-4 min-h-[220px]">
          <PeekRating
            value={ratingVal}
            onChange={(val) => {
              setRatingVal(val);
              addToast({
                title: 'Rating Updated',
                description: `Selected ${val} of ${ratingCount} ${ratingShape}s`,
                type: 'success',
              });
            }}
            count={ratingCount}
            shape={ratingShape}
            activeColor={ratingActiveColor}
            idleColor="#52525b"
            tipColor="#27272a"
            tipTextColor="#f5f5f5"
            size={ratingSize}
            lift={ratingLift}
            magnify={ratingMagnify}
            popScale={ratingPopScale}
            showTip={ratingShowTip}
            allowClear={ratingAllowClear}
            labels={['Awful', 'Poor', 'Average', 'Great', 'Exceptional', 'Legendary', 'Flawless', 'Supreme', 'Godlike', 'Infinite']}
          />
          <div className="text-xs text-muted-foreground font-mono">
            Current Score: <span className="font-semibold text-foreground">{ratingVal}</span> / {ratingCount}
          </div>
        </div>
      </div>
    );
  }

  // ───────── LiquidGlassSheet Playground ─────────
  if (componentId === 'liquid-glass-sheet') {
    return (
      <div className="space-y-8">
        {/* Controls */}
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Liquid Glass Sheet Configuration
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5 font-medium">
                Sheet Title
              </label>
              <Input
                value={glassTitle}
                onChange={(e) => setGlassTitle(e.target.value)}
                placeholder="Enter sheet title"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5 font-medium">
                Subtitle
              </label>
              <Input
                value={glassSubtitle}
                onChange={(e) => setGlassSubtitle(e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5 font-medium">
                Theme Variant
              </label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={glassTheme === 'light' ? 'primary' : 'outline'}
                  onClick={() => setGlassTheme('light')}
                  className="flex-1"
                >
                  Light
                </Button>
                <Button
                  size="sm"
                  variant={glassTheme === 'dark' ? 'primary' : 'outline'}
                  onClick={() => setGlassTheme('dark')}
                  className="flex-1"
                >
                  Dark
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden">
          <LiquidGlassSheet
            title={glassTitle}
            subtitle={glassSubtitle}
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
  }

  // ───────── CardCoverFlow Playground ─────────
  if (componentId === 'card-coverflow') {
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
  }

  // ───────── CardCarousel Playground ─────────
  if (componentId === 'card-carousel') {
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
  }

  // ───────── Interactive Micro-Controls Playground ─────────
  if (componentId === 'interactive-controls') {
    return (
      <div className="space-y-8">
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Interactive Micro-Controls (11 Components)
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Theme:</span>
            <Button
              size="sm"
              variant={microTheme === 'dark' ? 'primary' : 'outline'}
              onClick={() => setMicroTheme('dark')}
            >
              Dark
            </Button>
            <Button
              size="sm"
              variant={microTheme === 'light' ? 'primary' : 'outline'}
              onClick={() => setMicroTheme('light')}
            >
              Light
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 10. Context Menu */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">10. Context Menu</span>
            <ContextMenuEditDelete
              theme={microTheme}
              onEdit={() => addToast({ title: 'Edit Action', description: 'User triggered edit.', type: 'info' })}
              onDelete={() => addToast({ title: 'Delete Action', description: 'Item marked for deletion.', type: 'error' })}
            />
          </div>

          {/* 11. Tooltip */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">11. Info Tooltip</span>
            <QuestionTooltip theme={microTheme} text="Explore spring animations & micro-gestures" />
          </div>

          {/* 12. Animated Download */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">12. Animated Download</span>
            <DownloadAnimatedIcons
              theme={microTheme}
              onDownload={() => addToast({ title: 'Download Started', description: 'Asset package downloading...', type: 'success' })}
            />
          </div>

          {/* 13. PiP Mode */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">13. Picture-in-Picture</span>
            <PipModeIcons
              theme={microTheme}
              onToggle={(active) => addToast({ title: 'PiP Toggled', description: `Picture-in-picture is ${active ? 'Active' : 'Disabled'}`, type: 'info' })}
            />
          </div>

          {/* 14. Stepper Buttons */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">14. Stepper Buttons ({stepperVal})</span>
            <SimplePlusMinusBtn
              theme={microTheme}
              value={stepperVal}
              onChange={(val) => setStepperVal(val)}
            />
          </div>

          {/* 15. A / B Segmented Tabs */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">15. Segmented A/B Tabs</span>
            <SegmentedABTabs
              theme={microTheme}
              value={segmentedTabVal}
              onChange={(tab) => setSegmentedTabVal(tab as 'A' | 'B')}
            />
          </div>

          {/* 16. Quantity Counter */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">16. Quantity Counter</span>
            <QuantityCounter
              theme={microTheme}
              value={counterVal}
              onChange={(qty) => setCounterVal(qty)}
            />
          </div>

          {/* 17. List / Column View Toggle */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">17. List / Column Toggle</span>
            <ListColumnToggle
              theme={microTheme}
              view={viewModeVal}
              onChange={(view) => setViewModeVal(view)}
            />
          </div>

          {/* 18. Follow Button */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">18. Follow Check Button</span>
            <FollowCheckButton
              theme={microTheme}
              isFollowing={isFollowingVal}
              onToggle={(following) => setIsFollowingVal(following)}
            />
          </div>

          {/* 19. Menu Dots */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">19. Pulse Menu Dots</span>
            <MenuDotsExpand
              theme={microTheme}
              onClick={() => addToast({ title: 'Menu Dots Clicked', description: 'Expanding options...', type: 'info' })}
            />
          </div>

          {/* 20. Compact Mode Switch */}
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center gap-3 min-h-[160px]">
            <span className="text-xs font-medium text-muted-foreground">20. Compact Grid/List Switch</span>
            <CompactModeSwitch
              theme={microTheme}
              mode={compactModeVal}
              onChange={(mode) => setCompactModeVal(mode)}
            />
          </div>
        </div>
      </div>
    );
  }

  // ───────── Motion Loaders Playground ─────────
  if (componentId === 'motion-loaders') {
    return (
      <div className="space-y-8">
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Motion Loaders Configuration
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Size Scale:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <Button
                key={s}
                size="sm"
                variant={loaderSize === s ? 'primary' : 'outline'}
                onClick={() => setLoaderSize(s)}
              >
                {s.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SquareSnake */}
          <div className="p-10 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center space-y-4 min-h-[220px]">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              SquareSnake (3x3 Staggered Matrix)
            </div>
            <div className="p-6 rounded-2xl bg-surface-subtle/50 border border-border flex items-center justify-center">
              <SquareSnake size={loaderSize} />
            </div>
            <div className="text-xs text-muted-foreground text-center max-w-xs">
              Fluid opacity wave propagation across a 3x3 matrix based on diagonal coordinate delay.
            </div>
          </div>

          {/* BobbingDots */}
          <div className="p-10 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center space-y-4 min-h-[220px]">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              BobbingDots (Harmonic Wave)
            </div>
            <div className="p-6 rounded-2xl bg-surface-subtle/50 border border-border flex items-center justify-center h-24">
              <BobbingDots size={loaderSize} />
            </div>
            <div className="text-xs text-muted-foreground text-center max-w-xs">
              Continuous harmonic sine-bounce wave with staggering and smooth easing.
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     LOAD MORE (Infinite Scroll Sentinel)
     ========================================================================= */
  if (componentId === 'load-more') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Infinite Scroll Order Feed
          </span>
          <button
            onClick={() => {
              loadMorePage.current = 1;
              setLoadMoreItems([
                { id: '1', customer: 'Acme Corp', total: '$1,240.00', status: 'Settled' },
                { id: '2', customer: 'Stripe Payments', total: '$890.50', status: 'Settled' },
                { id: '3', customer: 'Linear App', total: '$420.00', status: 'Pending' },
              ]);
            }}
            className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground"
          >
            Reset Feed
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <div className="h-72 overflow-y-auto overscroll-contain rounded-xl border border-border bg-surface-subtle/50 p-2 space-y-2">
            {loadMoreItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-surface text-xs"
              >
                <div>
                  <div className="font-semibold text-foreground">{item.customer}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">Order #{item.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-foreground">{item.total}</div>
                  <span className="text-[10px] text-success font-medium">{item.status}</span>
                </div>
              </div>
            ))}

            <LoadMore
              onLoad={async () => {
                await new Promise((r) => setTimeout(r, 800));
                if (loadMorePage.current >= 3) return false;
                loadMorePage.current += 1;
                const p = loadMorePage.current;
                setLoadMoreItems((prev) => [
                  ...prev,
                  { id: String(p * 3 - 2), customer: `Customer ${p}A`, total: '$650.00', status: 'Settled' },
                  { id: String(p * 3 - 1), customer: `Customer ${p}B`, total: '$1,120.00', status: 'Settled' },
                  { id: String(p * 3), customer: `Customer ${p}C`, total: '$340.00', status: 'Pending' },
                ]);
                return p < 3;
              }}
              rootMargin="100px 0px"
              exhaustedLabel="All 9 transactions loaded."
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Scroll inside the box above to trigger the next page of transactions automatically.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================================
     STREAMING TEXT (AI Typewriter)
     ========================================================================= */
  if (componentId === 'streaming-text') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Streaming Pacing: {streamPacing} tokens/s
          </span>
          <div className="flex items-center gap-2">
            {[12, 24, 48].map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  setStreamPacing(speed);
                  setStreamKey((k) => k + 1);
                }}
                className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                  streamPacing === speed
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {speed} t/s
              </button>
            ))}
            <button
              onClick={() => setStreamKey((k) => k + 1)}
              className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground"
            >
              Replay Stream
            </button>
          </div>
        </div>

        <div className="max-w-lg mx-auto p-5 rounded-2xl border border-border bg-surface-subtle/50 space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Assistant Response:</span>
            <span className="text-[11px] font-mono">Click text to skip</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface">
            <StreamingText
              key={streamKey}
              text={sampleStreamingReply}
              tokensPerSecond={streamPacing}
              label="AI Assistant"
              onDone={() => {
                addToast({
                  title: 'Streaming Complete',
                  description: 'Full assistant token output received.',
                  type: 'success',
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     TASK STEPS (Deployment Pipeline)
     ========================================================================= */
  if (componentId === 'task-steps') {
    const deploySteps = [
      { id: 'queue', label: 'Queued', description: 'Worker node assigned' },
      { id: 'build', label: 'Building', description: 'Compiling TS bundle' },
      { id: 'test', label: 'Running checks', description: 'Unit & e2e suites' },
      { id: 'deploy', label: 'Deploying', description: 'Worldwide edge sync' },
    ];

    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pipeline Stage Controls
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTaskStepIdx((i) => Math.max(0, i - 1))}
              disabled={taskStepIdx === 0}
              className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={() => setTaskStepIdx((i) => Math.min(deploySteps.length - 1, i + 1))}
              disabled={taskStepIdx === deploySteps.length - 1}
              className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground disabled:opacity-40"
            >
              Next
            </button>
            <button
              onClick={() => setTaskFailed(!taskFailed)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                taskFailed
                  ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {taskFailed ? 'Resolve Error' : 'Simulate Failure'}
            </button>
          </div>
        </div>

        <div className="max-w-xl mx-auto p-6 rounded-2xl border border-border bg-surface-subtle/50 space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Deploy run #89410</span>
            <span className="font-mono text-muted-foreground">Stage {taskStepIdx + 1} of {deploySteps.length}</span>
          </div>

          <TaskSteps
            steps={deploySteps}
            current={taskStepIdx}
            failed={taskFailed}
            label="Deploy progress"
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     COLLAPSIBLE BANNER
     ========================================================================= */
  if (componentId === 'collapsible-banner') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Banner Variant:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['warning', 'destructive', 'info', 'success', 'default'].map((v) => (
              <button
                key={v}
                onClick={() => setBannerVar(v as any)}
                className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors ${
                  bannerVar === v
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-3">
          <CollapsibleBanner
            variant={bannerVar}
            title={
              bannerVar === 'destructive'
                ? 'Your card was declined'
                : bannerVar === 'warning'
                  ? 'Payments are degraded'
                  : bannerVar === 'success'
                    ? 'Security compliance verified'
                    : 'Scheduled maintenance notification'
            }
            description={
              bannerVar === 'destructive'
                ? 'We retry automatically on the 14th. Invoices stay open until it clears.'
                : 'Charges are queued and settle automatically once the upstream payment provider recovers.'
            }
            action={
              <button
                type="button"
                onClick={() =>
                  addToast({
                    title: 'Action Triggered',
                    description: 'Opening settings dialog.',
                    type: 'info',
                  })
                }
                className="px-2.5 py-1 rounded-[var(--radius)] border border-border bg-surface text-foreground font-medium text-[11px] hover:border-primary/50 transition-colors"
              >
                Update Details
              </button>
            }
          />

          <CollapsibleBanner
            variant="default"
            dismissible={false}
            title="Read-only incident record"
            description="Active emergency banners can be configured with dismissible={false} to ensure users do not close them accidentally."
          />
        </div>
      </div>
    );
  }

  /* =========================================================================
     PRESENCE AVATARS (Active User Rail)
     ========================================================================= */
  if (componentId === 'presence-avatars') {
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
  }

  /* =========================================================================
     MODAL (Spring-Animated Dialog)
     ========================================================================= */
  if (componentId === 'modal') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[220px] gap-4">
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Launch Modal Dialog
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Includes body scroll lock, backdrop blur, focus trap, and Escape key stacking.
        </p>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Scale Deployment Infrastructure"
          description="Allocate dynamic GPU cluster slices across 3 geographical regions."
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setModalOpen(false);
                  addToast({
                    title: 'Cluster Provisioned',
                    description: 'Provisioning 32 H100 instances...',
                    type: 'success',
                  });
                }}
              >
                Confirm Scaling
              </Button>
            </>
          }
        >
          <div className="space-y-3 py-1 text-xs">
            <p className="text-muted-foreground">
              By confirming, the cluster will automatically provision isolated network VPCs and execute rolling zero-downtime health probes.
            </p>
            <div className="p-3 rounded-xl bg-surface-subtle border border-border font-mono text-[11px] space-y-1">
              <div>Nodes: <span className="text-primary font-bold">32x Nvidia H100</span></div>
              <div>Target Region: <span className="text-foreground">us-east-1 (N. Virginia)</span></div>
              <div>Estimated Cost: <span className="text-foreground">$4.80 / hr</span></div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  /* =========================================================================
     TOOLTIP & TOOLTIP GROUP
     ========================================================================= */
  if (componentId === 'tooltip') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto p-10 rounded-2xl border border-border bg-surface-subtle/50 flex flex-col items-center justify-center space-y-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Grouped Fast-Travel Tooltip Toolbar
          </div>

          <TooltipGroup openDelay={150} skipDelay={400}>
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-surface">
              <Tooltip label="Copy Document (⌘C)">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Copy className="size-4" />
                </button>
              </Tooltip>

              <Tooltip label="Share with Team (⌘S)">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Users className="size-4" />
                </button>
              </Tooltip>

              <Tooltip label="Security & Keys">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Key className="size-4" />
                </button>
              </Tooltip>

              <Tooltip label="Global Sync">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Globe className="size-4" />
                </button>
              </Tooltip>
            </div>
          </TooltipGroup>

          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Hover over any button, then slide across to neighbors to witness the smooth warm-travel glide transition.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================================
     COMMAND PALETTE (Spotlight ⌘K)
     ========================================================================= */
  if (componentId === 'command-palette') {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Interactive Spotlight Palette
          </span>
          <Button variant="primary" size="sm" onClick={() => setCmdPaletteOpen(true)}>
            Open Palette (⌘K)
          </Button>
        </div>

        <div className="max-w-lg mx-auto">
          <CommandPalette
            items={sampleCommands}
            onSelect={(cmd) => {
              addToast({
                title: 'Command Executed',
                description: `Triggered: ${cmd.label}`,
                type: 'info',
              });
            }}
          />
        </div>

        <CommandPalette
          open={cmdPaletteOpen}
          onDismiss={() => setCmdPaletteOpen(false)}
          items={sampleCommands}
          onSelect={(cmd) => {
            setCmdPaletteOpen(false);
            addToast({
              title: 'Command Executed',
              description: `Triggered: ${cmd.label}`,
              type: 'info',
            });
          }}
        />
      </div>
    );
  }

  // ───────── Issue Board (Kanban) Playground ─────────
  if (componentId === 'issue-board') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            Issue Board Playground
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Board Theme:</span>
            <Button
              size="xs"
              variant={boardTheme === 'dark' ? 'primary' : 'outline'}
              onClick={() => setBoardTheme('dark')}
            >
              Dark
            </Button>
            <Button
              size="xs"
              variant={boardTheme === 'light' ? 'primary' : 'outline'}
              onClick={() => setBoardTheme('light')}
            >
              Light
            </Button>
            <Button
              size="xs"
              variant="outline"
              leftIcon={<RefreshCw className="size-3" />}
              onClick={() => {
                setBoardKey((k) => k + 1);
                addToast({
                  title: 'Board Reset',
                  description: 'Reset issues to default state.',
                  type: 'info',
                });
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden shadow-lg bg-surface-elevated">
          <RudderIssueBoard
            key={boardKey}
            theme={boardTheme}
            onIssuesChange={(next) => {
              addToast({
                title: 'Board Updated',
                description: `${next.length} issues in board`,
                type: 'success',
              });
            }}
          />
        </div>
      </div>
    );
  }

  // ───────── AI Approval Card Playground ─────────
  if (componentId === 'ai-approval-card') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            Approval Card Configuration
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Theme:</span>
            <Button
              size="xs"
              variant={approvalTheme === 'light' ? 'primary' : 'outline'}
              onClick={() => setApprovalTheme('light')}
            >
              Light
            </Button>
            <Button
              size="xs"
              variant={approvalTheme === 'dark' ? 'primary' : 'outline'}
              onClick={() => setApprovalTheme('dark')}
            >
              Dark
            </Button>
            <Button
              size="xs"
              variant="outline"
              leftIcon={<RefreshCw className="size-3" />}
              onClick={() => {
                setApprovalKey((k) => k + 1);
                setApprovalSubmissions(null);
                addToast({
                  title: 'Approval Card Reset',
                  description: 'Card restarted from step 1.',
                  type: 'info',
                });
              }}
            >
              Restart
            </Button>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[380px]">
          <AIApprovalCard
            key={approvalKey}
            theme={approvalTheme}
            onSubmitted={(answers, custom) => {
              const summary = JSON.stringify({ answers, custom });
              setApprovalSubmissions(summary);
              addToast({
                title: 'Workflow Approved',
                description: 'Answers recorded successfully.',
                type: 'success',
              });
            }}
          />
          {approvalSubmissions && (
            <div className="mt-6 p-3 rounded-xl bg-surface border border-border text-xs font-mono text-muted-foreground max-w-sm overflow-x-auto">
              <span className="font-semibold text-foreground">Submitted Payload:</span>
              <pre className="mt-1 whitespace-pre-wrap">{approvalSubmissions}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ───────── AI Prompt Bar Playground ─────────
  if (componentId === 'ai-prompt-bar') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            Prompt Bar Options
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Theme:</span>
            <Button
              size="xs"
              variant={promptTheme === 'dark' ? 'primary' : 'outline'}
              onClick={() => setPromptTheme('dark')}
            >
              Dark
            </Button>
            <Button
              size="xs"
              variant={promptTheme === 'light' ? 'primary' : 'outline'}
              onClick={() => setPromptTheme('light')}
            >
              Light
            </Button>
            <span className="text-xs text-muted-foreground ml-2">Variant:</span>
            <Button
              size="xs"
              variant={promptVariant === 'Rounded' ? 'primary' : 'outline'}
              onClick={() => setPromptVariant('Rounded')}
            >
              Rounded
            </Button>
            <Button
              size="xs"
              variant={promptVariant === 'Pill' ? 'primary' : 'outline'}
              onClick={() => setPromptVariant('Pill')}
            >
              Pill
            </Button>
            <Button
              size="xs"
              variant={promptTall ? 'primary' : 'outline'}
              onClick={() => setPromptTall((v) => !v)}
            >
              Tall Layout
            </Button>
            <Button
              size="xs"
              variant={promptDemo ? 'subtle' : 'outline'}
              onClick={() => setPromptDemo((v) => !v)}
            >
              {promptDemo ? 'Autoplay: ON' : 'Autoplay: OFF'}
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[440px]">
          <AIPromptBar
            theme={promptTheme}
            variant={promptVariant}
            tall={promptTall}
            demo={promptDemo}
            onSend={(text, details) => {
              setPromptLastSent(text || 'Sent with attachments');
              addToast({
                title: 'Prompt Sent',
                description: `Model: ${details.model.name} • ${details.files.length} files`,
                type: 'success',
              });
            }}
          />
          {promptLastSent && (
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Last submission: <span className="font-semibold text-foreground">{promptLastSent}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ───────── AI Code & Diff Block Playground ─────────
  if (componentId === 'ai-code-block') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            Code Block Controls
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Theme:</span>
            <Button
              size="xs"
              variant={codeTheme === 'light' ? 'primary' : 'outline'}
              onClick={() => setCodeTheme('light')}
            >
              Light
            </Button>
            <Button
              size="xs"
              variant={codeTheme === 'dark' ? 'primary' : 'outline'}
              onClick={() => setCodeTheme('dark')}
            >
              Dark
            </Button>
            <span className="text-xs text-muted-foreground ml-2">Mode:</span>
            {(['auto', 'Code', 'Diff'] as const).map((m) => (
              <Button
                key={m}
                size="xs"
                variant={codeVariant === m ? 'primary' : 'outline'}
                onClick={() => setCodeVariant(m)}
              >
                {m === 'auto' ? 'Interactive' : m}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[380px]">
          <AICodeBlock
            theme={codeTheme}
            variant={codeVariant === 'auto' ? undefined : codeVariant}
            filename="churn.ts"
            onCopy={() => {
              setCodeCopiedNotice('Copied snippet to clipboard');
              addToast({
                title: 'Copied to Clipboard',
                description: 'Ready to paste into your editor.',
                type: 'success',
              });
            }}
          />
          {codeCopiedNotice && (
            <div className="mt-4 text-xs text-success flex items-center gap-1.5 font-medium">
              <Check className="size-3.5" />
              {codeCopiedNotice}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ───────── AI Fine-Tune Card Playground ─────────
  if (componentId === 'ai-fine-tune-card') {
    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            Fine-Tune Inspector Playground
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Theme:</span>
            <Button
              size="xs"
              variant={fineTuneTheme === 'light' ? 'primary' : 'outline'}
              onClick={() => setFineTuneTheme('light')}
            >
              Light
            </Button>
            <Button
              size="xs"
              variant={fineTuneTheme === 'dark' ? 'primary' : 'outline'}
              onClick={() => setFineTuneTheme('dark')}
            >
              Dark
            </Button>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[380px]">
          <AIFineTuneCard
            theme={fineTuneTheme}
            onChange={(state) => {
              setFineTuneLastState(state);
            }}
          />
          {fineTuneLastState && (
            <div className="mt-6 p-3.5 rounded-xl bg-surface border border-border text-xs text-muted-foreground max-w-sm w-full">
              <div className="font-semibold text-foreground mb-1.5">Live Parameter State:</div>
              <div className="grid grid-cols-2 gap-1 font-mono text-[11px]">
                <div>Layout Seg: <span className="text-primary font-bold">{fineTuneLastState.segment}</span></div>
                <div>Type: <span className="text-primary font-bold">{fineTuneLastState.type}</span></div>
                {Object.entries(fineTuneLastState.values).map(([k, v]) => (
                  <div key={k}>{k}: <span className="text-foreground font-semibold">{String(v)}</span></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ───────── Segmented Control Playground ─────────
  if (componentId === 'segmented-control') {
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
  }

  // ───────── Accordion Playground ─────────
  if (componentId === 'accordion') {
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
  }

  // ───────── Wizard Steps Playground ─────────
  if (componentId === 'wizard-steps') {
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
                      <div className="space-y-1.5 text-muted-foreground">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded text-primary" />
                          <span>Enable zero-trust identity token verification</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded text-primary" />
                          <span>Enforce TLS 1.3 encryption for edge connections</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded text-primary" />
                          <span>Automate SOC2 compliance audit log exports</span>
                        </label>
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
  }

  // ───────── Pagination Playground ─────────
  if (componentId === 'pagination') {
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
  }

  // ───────── Tree View Playground ─────────
  if (componentId === 'tree-view') {
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
  }

  // ───────── Sticky Header Playground ─────────
  if (componentId === 'sticky-header') {
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
  }

  // ───────── Reading Progress Playground ─────────
  if (componentId === 'reading-progress') {
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
  }

  // ───────── Scroll Spy Playground ─────────
  if (componentId === 'scroll-spy') {
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
  }

  // ───────── Hide On Scroll Playground ─────────
  if (componentId === 'hide-on-scroll') {
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
  }

  // FilterGrid Playground
  if (componentId === 'filter-grid') {
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
  }

  // PollResults Playground
  if (componentId === 'poll-results') {
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
  }

  // SliderDetents Playground
  if (componentId === 'slider-detents') {
    const vcpuDetents = [
      { value: 1, label: '1 Core (Dev)' },
      { value: 2, label: '2 Cores (Small)' },
      { value: 4, label: '4 Cores (Medium)' },
      { value: 8, label: '8 Cores (Large)' },
      { value: 16, label: '16 Cores (Cluster)' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            <span className="text-xs font-medium text-foreground">
              Allocated vCPU: <span className="font-mono font-bold text-primary">{sliderDetentsVal} Cores</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 4, 8, 16].map((v) => (
              <Button
                key={v}
                size="xs"
                variant={sliderDetentsVal === v ? 'primary' : 'outline'}
                onClick={() => setSliderDetentsVal(v)}
              >
                {v}x
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex justify-center">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Compute Instance Sizing</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Drag the thumb or use Left/Right arrows. Shift+Arrow jumps directly to detents with magnetic haptic snap.
              </p>
            </div>

            <SliderDetents
              label="Compute vCPU Sizing"
              value={sliderDetentsVal}
              onValueChange={setSliderDetentsVal}
              min={1}
              max={16}
              step={1}
              detents={vcpuDetents}
              pull={18}
              format={(v) => `${v} vCPU`}
            />

            <div className="p-3.5 rounded-xl bg-surface-subtle border border-border/80 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Estimated Monthly Tier:</span>
              <span className="font-mono font-semibold text-foreground">
                ${sliderDetentsVal * 18}.00 / month
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ReorderList Playground
  if (componentId === 'reorder-list') {
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
  }

  // Lightbox Playground
  if (componentId === 'lightbox') {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-2">
            <Maximize2 className="size-4 text-primary" />
            <span className="text-xs font-medium text-foreground">
              Status: <span className="text-primary font-bold">{lightboxOpen ? 'Modal Active' : 'Thumbnail Preview'}</span>
            </span>
          </div>

          <Button
            size="xs"
            variant="primary"
            onClick={() => setLightboxOpen(true)}
          >
            Open Lightbox
          </Button>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
          <div className="w-full max-w-md flex flex-col items-center gap-3">
            <button
              ref={lightboxThumbRef}
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-md hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-zoom-in"
            >
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                alt="Tropical beach coast"
                className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="flex items-center justify-between w-full text-white">
                  <div>
                    <div className="text-xs font-semibold">Pacific Coastal Sunset</div>
                    <div className="text-[11px] text-white/80">Click thumbnail to inspect full-res</div>
                  </div>
                  <div className="size-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Maximize2 className="size-3.5" />
                  </div>
                </div>
              </div>
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Click thumbnail above to expand with landing morph physics, wheel zoom, and drag panning.
            </p>
          </div>

          <Lightbox
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90"
            alt="Pacific coastal sunset in 4K resolution"
            caption="Pacific Coastal Sunset — 4K High Resolution Inspector"
            originRef={lightboxThumbRef}
            maxScale={5}
          />
        </div>
      </div>
    );
  }

  return null;
};
