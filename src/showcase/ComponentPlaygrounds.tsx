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
  const [tabVariant, setTabVariant] = useState<any>('pills');

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
          <div className="flex items-center gap-2 border-b border-border/50 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
              Tabs Style:
            </span>
            {['pills', 'underline', 'boxed'].map((v) => (
              <button
                key={v}
                onClick={() => setTabVariant(v)}
                className={`px-2.5 py-1 text-xs rounded-lg border capitalize transition-colors ${
                  tabVariant === v
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <Tabs
              variant={tabVariant === 'boxed' ? 'segmented' : tabVariant}
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: 'tab1', label: 'Overview' },
                { id: 'tab2', label: 'Security' },
                { id: 'tab3', label: 'Integrations' },
              ]}
            />
            <div className="p-4 rounded-xl bg-surface-subtle text-xs text-muted-foreground mt-3">
              {activeTab === 'tab1' && 'Cluster metrics aggregated every 5 seconds across edge nodes.'}
              {activeTab === 'tab2' && 'mTLS ingress encryption and zero-trust policies active.'}
              {activeTab === 'tab3' && 'Connected to GitHub Actions, Datadog, and Slack Webhooks.'}
            </div>
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

  return null;
};
