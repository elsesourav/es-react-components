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

export const ButtonPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [btnVariant, setBtnVariant] = useState<any>('primary');
  const [btnSize, setBtnSize] = useState<any>('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnRadius, setBtnRadius] = useState(10);
  const [btnScale, setBtnScale] = useState(100);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="border-b border-border/50 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Parameter Controls
            </span>
          </div>

          <ParameterGrid columns={3}>
            <ParameterSlider
              label="Corner Radius"
              value={btnRadius}
              onChange={setBtnRadius}
              min={0}
              max={28}
              step={2}
              unit="px"
            />
            <ParameterSlider
              label="Scale / Zoom"
              value={btnScale}
              onChange={setBtnScale}
              min={80}
              max={130}
              step={5}
              unit="%"
            />
            <ParameterSwitch
              label="Loading State"
              checked={btnLoading}
              onChange={setBtnLoading}
            />
            <ParameterSwitch
              label="Disabled"
              checked={btnDisabled}
              onChange={setBtnDisabled}
            />
          </ParameterGrid>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
            <div style={{ transform: `scale(${btnScale / 100})`, transition: 'transform 0.15s ease' }}>
              <Button
                variant={btnVariant}
                size={btnSize}
                isLoading={btnLoading}
                disabled={btnDisabled}
                style={{ borderRadius: `${btnRadius}px` }}
                leftIcon={btnSize !== 'icon' ? <Sparkles className="h-4 w-4" /> : undefined}
                rightIcon={btnSize !== 'icon' ? <ArrowRight className="h-4 w-4" /> : undefined}
                onClick={() =>
                  addToast({
                    title: 'Button Clicked!',
                    description: `Triggered variant="${btnVariant}" size="${btnSize}" radius="${btnRadius}px"`,
                    type: 'info',
                  })
                }
              >
                {btnSize === 'icon' ? <Sparkles className="h-4 w-4" /> : 'Button Action'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Adjust corner radius, scale, loading, or disabled state in real time with the parameter controls above.
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
};

export const BadgePlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [badgeVariant, setBadgeVariant] = useState<any>('primary');
  const [badgeDot, setBadgeDot] = useState(true);

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
};

export const PeekRatingPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [ratingVal, setRatingVal] = useState(4);
  const [ratingCount, setRatingCount] = useState(5);
  const [ratingShape, setRatingShape] = useState<any>('star');
  const [ratingSize, setRatingSize] = useState(28);
  const [ratingLift, setRatingLift] = useState(6);
  const [ratingMagnify, setRatingMagnify] = useState(1.15);
  const [ratingPopScale, setRatingPopScale] = useState(1.3);
  const [ratingShowTip, setRatingShowTip] = useState(true);
  const [ratingAllowClear, setRatingAllowClear] = useState(true);
  const [ratingReadOnly, setRatingReadOnly] = useState(false);
  const [ratingDisabled, setRatingDisabled] = useState(false);
  const [ratingActiveColor, setRatingActiveColor] = useState('#f5b400');
  const [ratingIdleColor, setRatingIdleColor] = useState('#52525b');

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-foreground">Peek Rating Controls</h4>
              <p className="text-xs text-muted-foreground">Physics-lifted interactive rater with spring cursor tracking, pop feedback, and floating badges.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setRatingActiveColor(colors.accent || colors.primary);
                  setRatingIdleColor(isDark ? '#3f3f46' : '#d4d4d8');
                  addToast({
                    title: 'Theme Synchronized',
                    description: `Bound rating accent to theme (${colors.accent || colors.primary})!`,
                    type: 'info',
                  });
                }}
                className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="size-3.5" />
                <span>Sync Active Theme</span>
              </button>
            </div>
          </div>

          {/* Section 1: Glyphs & Color Parameters */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Shape & Color Styling
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Glyph Shape
                </label>
                <div className="flex gap-1.5">
                  {(['star', 'heart', 'bolt'] as const).map((shp) => (
                    <button
                      key={shp}
                      onClick={() => setRatingShape(shp)}
                      className={cn(
                        "flex-1 h-9 rounded-xl text-xs font-medium capitalize border transition-all",
                        ratingShape === shp
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                      )}
                    >
                      {shp}
                    </button>
                  ))}
                </div>
              </div>

              <ParameterColor
                label="Active Color"
                value={ratingActiveColor}
                onChange={setRatingActiveColor}
              />
              <ParameterColor
                label="Idle Color"
                value={ratingIdleColor}
                onChange={setRatingIdleColor}
              />

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Color Presets
                </label>
                <div className="flex items-center gap-1.5 h-9">
                  {[
                    { color: '#f5b400', label: 'Gold' },
                    { color: '#f43f5e', label: 'Ruby' },
                    { color: '#06b6d4', label: 'Cyan' },
                    { color: '#10b981', label: 'Emerald' },
                    { color: colors.primary, label: 'Theme' },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setRatingActiveColor(p.color)}
                      title={p.label}
                      className={cn(
                        "size-6 rounded-full border-2 transition-transform",
                        ratingActiveColor === p.color
                          ? "scale-110 border-white shadow-sm ring-2 ring-primary/40"
                          : "border-transparent hover:scale-105"
                      )}
                      style={{ backgroundColor: p.color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Metrics & Physics */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Dimensions & Gesture Dynamics
            </span>
            <ParameterGrid columns={4}>
              <ParameterSlider
                label="Unit Count"
                value={ratingCount}
                onChange={setRatingCount}
                min={3}
                max={10}
                step={1}
              />
              <ParameterSlider
                label="Icon Size"
                value={ratingSize}
                onChange={setRatingSize}
                min={20}
                max={44}
                step={2}
                unit="px"
              />
              <ParameterSlider
                label="Hover Lift"
                value={ratingLift}
                onChange={setRatingLift}
                min={0}
                max={16}
                step={1}
                unit="px"
              />
              <ParameterSlider
                label="Magnify Scale"
                value={ratingMagnify}
                onChange={setRatingMagnify}
                min={1.0}
                max={1.4}
                step={0.05}
                unit="x"
              />
              <ParameterSlider
                label="Commit Bounce"
                value={ratingPopScale}
                onChange={setRatingPopScale}
                min={1.0}
                max={1.6}
                step={0.05}
                unit="x"
              />
            </ParameterGrid>
          </div>

          {/* Section 3: Interactive Toggles */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Interaction Flags
            </span>
            <ParameterGrid columns={4}>
              <ParameterSwitch
                label="Show Floating Tip"
                checked={ratingShowTip}
                onChange={setRatingShowTip}
              />
              <ParameterSwitch
                label="Allow Clear"
                checked={ratingAllowClear}
                onChange={setRatingAllowClear}
              />
              <ParameterSwitch
                label="Read Only"
                checked={ratingReadOnly}
                onChange={setRatingReadOnly}
              />
              <ParameterSwitch
                label="Disabled"
                checked={ratingDisabled}
                onChange={setRatingDisabled}
              />
            </ParameterGrid>
          </div>
        </div>

        {/* Live Rating Box */}
        <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center space-y-4 min-h-[220px]">
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
            idleColor={ratingIdleColor}
            tipColor={isDark ? '#27272a' : '#18181b'}
            tipTextColor="#f5f5f5"
            size={ratingSize}
            lift={ratingLift}
            magnify={ratingMagnify}
            popScale={ratingPopScale}
            showTip={ratingShowTip}
            allowClear={ratingAllowClear}
            readOnly={ratingReadOnly}
            disabled={ratingDisabled}
            labels={['Awful', 'Poor', 'Average', 'Great', 'Exceptional', 'Legendary', 'Flawless', 'Supreme', 'Godlike', 'Infinite']}
          />
          <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
            <span>Current Score:</span>
            <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-foreground font-semibold">
              {ratingVal} / {ratingCount}
            </span>
          </div>
        </div>
      </div>
    );
};

export const FloatingInputPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [floatEmail, setFloatEmail] = useState('alex.chen@acme.corp');
  const [floatRef, setFloatRef] = useState('INV-2026-9041');
  const [floatTouched, setFloatTouched] = useState(false);
  const isFloatBad = floatTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(floatEmail);

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
};

export const OtpInputPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [otpVal, setOtpVal] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'error' | 'success'>('idle');

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
};

export const TagInputPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [tagsVal, setTagsVal] = useState<string[]>(['react', 'tailwind', 'motion', 'theming']);

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
};

export const PasswordInputPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [passVal, setPassVal] = useState('SuperSecret!2026');
  const [passReqs, setPassReqs] = useState(true);

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
};

export const ExpandingSearchPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [searchVal, setSearchVal] = useState('');

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
};

export const InputPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [inputVal, setInputVal] = useState('Antigravity Design Engine');
  const [inputError, setInputError] = useState('');
  const [inputTab, setInputTab] = useState<
    'floating' | 'inline' | 'password' | 'otp' | 'tag' | 'search' | 'standard'
  >('floating');
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
  const [otpVal, setOtpVal] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [tagsVal, setTagsVal] = useState<string[]>(['react', 'tailwind', 'motion', 'theming']);
  const [searchVal, setSearchVal] = useState('');

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
};

export const TextareaPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  

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
};

export const DropdownPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [dropdownVal, setDropdownVal] = useState('us-east');
  const regionItems = [
    { value: 'us-east', label: 'US East (N. Virginia)', hint: '14ms', icon: <Server className="size-4" /> },
    { value: 'us-west', label: 'US West (Oregon)', hint: '38ms', icon: <Server className="size-4" /> },
    { value: 'eu-west', label: 'Europe (Frankfurt)', hint: '82ms', icon: <Globe className="size-4" /> },
    { value: 'ap-tokyo', label: 'Asia Pacific (Tokyo)', hint: '124ms', icon: <Globe className="size-4" /> },
    { value: 'ap-singapore', label: 'Asia Pacific (Singapore)', hint: '110ms', icon: <Globe className="size-4" /> },
    { value: 'sa-east', label: 'South America (São Paulo)', hint: '145ms', disabled: true, icon: <Server className="size-4" /> },
  ];

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
};

export const SelectPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [selectTab, setSelectTab] = useState<'animated' | 'native'>('animated');
  const [dropdownVal, setDropdownVal] = useState('us-east');
  const [nativeSelectVal, setNativeSelectVal] = useState('us-east-1');
  const [selectDelay, setSelectDelay] = useState(600);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const regionItems = [
    { value: 'us-east', label: 'US East (N. Virginia)', hint: '14ms', icon: <Server className="size-4" /> },
    { value: 'us-west', label: 'US West (Oregon)', hint: '38ms', icon: <Server className="size-4" /> },
    { value: 'eu-west', label: 'Europe (Frankfurt)', hint: '82ms', icon: <Globe className="size-4" /> },
    { value: 'ap-tokyo', label: 'Asia Pacific (Tokyo)', hint: '124ms', icon: <Globe className="size-4" /> },
    { value: 'ap-singapore', label: 'Asia Pacific (Singapore)', hint: '110ms', icon: <Globe className="size-4" /> },
    { value: 'sa-east', label: 'South America (São Paulo)', hint: '145ms', disabled: true, icon: <Server className="size-4" /> },
  ];

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

          <ParameterGrid columns={2}>
            <ParameterSlider
              label="Typeahead Delay"
              value={selectDelay}
              onChange={setSelectDelay}
              min={200}
              max={1500}
              step={50}
              unit="ms"
            />
            <ParameterSwitch
              label="Disabled State"
              checked={selectDisabled}
              onChange={setSelectDisabled}
            />
          </ParameterGrid>

          <div className="max-w-md mx-auto p-6 rounded-xl bg-surface-subtle/40 border border-border/60 min-h-[220px] flex items-center justify-center">
            <div className="w-full space-y-4">
              {selectTab === 'animated' ? (
                <div className="space-y-3 animate-in fade-in">
                  <Dropdown
                    label="Cloud Infrastructure Region"
                    items={regionItems}
                    value={dropdownVal}
                    onChange={setDropdownVal}
                    disabled={selectDisabled}
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
                    disabled={selectDisabled}
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
};

export const SwitchPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [switchChecked, setSwitchChecked] = useState(true);

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
};

export const CheckboxPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [checkboxChecked, setCheckboxChecked] = useState(true);

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
};
