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

export const TextLoopPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

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
  const [loopDraggable, setLoopDraggable] = useState(false);
  const [loopOutline, setLoopOutline] = useState(false);
  const [loopPauseOnHover, setLoopPauseOnHover] = useState(true);

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-foreground">Interactive Text Loop Controls</h4>
              <p className="text-xs text-muted-foreground">Continuous marquee ribbon curving across dynamic SVG vector geometry.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setLoopRibbonColor(colors.primary);
                  addToast({
                    title: 'Theme Synchronized',
                    description: `Text loop ribbon color set to theme primary (${colors.primary})`,
                    type: 'info',
                  });
                }}
                className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="size-3.5" />
                <span>Match Theme ({preset})</span>
              </button>
            </div>
          </div>

          {/* Section 1: Path & Vector Shape */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Guide Path & Typography
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Display Text
                </label>
                <input
                  type="text"
                  value={loopText}
                  onChange={(e) => setLoopText(e.target.value)}
                  className="w-full h-9 px-3 text-xs rounded-xl bg-surface-elevated border border-border text-foreground focus:border-primary focus:outline-none"
                  placeholder="Loop text content..."
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Guide Path Shape
                </label>
                <select
                  value={loopShape}
                  onChange={(e) => setLoopShape(e.target.value as any)}
                  className="w-full h-9 px-2.5 text-xs rounded-xl bg-surface-elevated border border-border text-foreground focus:border-primary focus:outline-none"
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
                <div className="flex gap-1.5">
                  {(['forward', 'reverse'] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setLoopDirection(dir)}
                      className={cn(
                        "flex-1 h-9 rounded-xl text-xs font-medium capitalize border transition-all",
                        loopDirection === dir
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                      )}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              <ParameterColor
                label="Ribbon Color"
                value={loopRibbonColor}
                onChange={setLoopRibbonColor}
                disabled={!loopRibbon}
              />
            </div>

            <ParameterGrid columns={4}>
              <ParameterSlider
                label="Curviness"
                value={loopCurviness}
                onChange={setLoopCurviness}
                min={0}
                max={180}
                step={5}
              />
              <ParameterSlider
                label="Tilt Angle"
                value={loopTilt}
                onChange={setLoopTilt}
                min={-45}
                max={45}
                step={1}
                unit="°"
              />
              <ParameterSlider
                label="Font Size"
                value={loopFontSize}
                onChange={setLoopFontSize}
                min={24}
                max={72}
                step={2}
                unit="px"
              />
              <ParameterSlider
                label="Speed"
                value={loopSpeed}
                onChange={setLoopSpeed}
                min={20}
                max={300}
                step={5}
                unit="px/s"
              />
            </ParameterGrid>
          </div>

          {/* Section 2: Ribbon Styling & Physics */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Ribbon Band & Motion Parameters
            </span>
            <ParameterGrid columns={4}>
              <ParameterSwitch
                label="Ribbon Band"
                checked={loopRibbon}
                onChange={setLoopRibbon}
              />
              <ParameterSwitch
                label="Pause on Hover"
                checked={loopPauseOnHover}
                onChange={setLoopPauseOnHover}
              />
              <ParameterSwitch
                label="Interactive Drag"
                checked={loopDraggable}
                onChange={setLoopDraggable}
              />
              <ParameterSwitch
                label="Outline Font"
                checked={loopOutline}
                onChange={setLoopOutline}
              />
              <ParameterSwitch
                label="Cross Ribbon"
                checked={loopCross}
                onChange={setLoopCross}
              />
              <ParameterSlider
                label="Ribbon Width"
                value={loopRibbonWidth}
                onChange={setLoopRibbonWidth}
                min={40}
                max={140}
                step={4}
                unit="px"
                disabled={!loopRibbon}
              />
              <ParameterSlider
                label="Cross Angle"
                value={loopCrossAngle}
                onChange={setLoopCrossAngle}
                min={0}
                max={60}
                step={2}
                unit="°"
                disabled={!loopCross}
              />
            </ParameterGrid>
          </div>

          {/* Color Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs text-muted-foreground mr-1">Palette Presets:</span>
            {[
              { name: 'Theme', color: colors.primary },
              { name: 'Violet', color: '#5227FF' },
              { name: 'Cyan', color: '#06b6d4' },
              { name: 'Emerald', color: '#10b981' },
              { name: 'Orange', color: '#f97316' },
              { name: 'Pink', color: '#ec4899' },
            ].map((swatch) => (
              <button
                key={swatch.name}
                type="button"
                onClick={() => setLoopRibbonColor(swatch.color)}
                className={cn(
                  "h-6 px-2.5 rounded-full text-[11px] font-medium border flex items-center gap-1.5 transition-all",
                  loopRibbonColor === swatch.color
                    ? "border-primary ring-2 ring-primary/20 bg-surface-elevated text-foreground"
                    : "border-border bg-surface-subtle text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                )}
              >
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: swatch.color }}
                />
                <span>{swatch.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Canvas Box */}
        <div className="p-4 sm:p-8 rounded-2xl bg-surface-sunken/40 border border-border flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[380px]">
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
};

export const SplitFlapTextPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [flapWords, setFlapWords] = useState<string[]>([
    'LAUNCH READY',
    'SYNC ONLINE',
    'SIGNAL LIVE',
  ]);
  const [flapPreset, setFlapPreset] = useState<'launch' | 'terminal' | 'crypto' | 'cities'>('launch');
  const [flapDuration, setFlapDuration] = useState(0.12);
  const [flapStagger, setFlapStagger] = useState(0.06);
  const [flapCycleDelay, setFlapCycleDelay] = useState(2400);
  const [flapFlipsPerChar, setFlapFlipsPerChar] = useState(8);
  const [flapOrder, setFlapOrder] = useState<any>('left');
  const [flapTileStyle, setFlapTileStyle] = useState<any>('board');
  const [flapDepth, setFlapDepth] = useState(0.5);
  const [flapGlare, setFlapGlare] = useState(0);
  const [flapFontSize, setFlapFontSize] = useState(42);
  const [flapTileColor, setFlapTileColor] = useState('#111827');
  const [flapTextColor, setFlapTextColor] = useState('#f8fafc');
  const [flapBoardBg, setFlapBoardBg] = useState<'dark' | 'surface' | 'slate'>('dark');

  return (
      <div className="space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-foreground">Split-Flap Board Controls</h4>
              <p className="text-xs text-muted-foreground">Electromechanical flip-tile ticker inspired by classic departure boards.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setFlapTileColor(isDark ? colors.surface : '#ffffff');
                  setFlapTextColor(colors.foreground);
                  setFlapBoardBg('surface');
                  addToast({
                    title: 'Theme Synchronized',
                    description: `Adapted tiles and typography to ${preset} theme!`,
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

          {/* Section 1: Presets & Layout Modes */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Word Sequences & Display Modes
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Message Sequence
                </label>
                <select
                  value={flapPreset}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setFlapPreset(val);
                    if (val === 'launch') setFlapWords(['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']);
                    else if (val === 'terminal') setFlapWords(['GATE 14 OPEN', 'BOARDING NOW', 'DEPARTED NYC']);
                    else if (val === 'crypto') setFlapWords(['BITCOIN 96K', 'ETHEREUM 3K', 'SOLANA 240$']);
                    else if (val === 'cities') setFlapWords(['TOKYO 23:45', 'PARIS 15:45', 'LONDON 14:45']);
                  }}
                  className="w-full h-9 px-2.5 text-xs rounded-xl bg-surface-elevated border border-border text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="launch">Aerospace Launch</option>
                  <option value="terminal">Airport Terminal</option>
                  <option value="crypto">Finance Ticker</option>
                  <option value="cities">World Time Hub</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Tile Style
                </label>
                <div className="flex gap-1.5">
                  {(['board', 'minimal'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFlapTileStyle(st)}
                      className={cn(
                        "flex-1 h-9 rounded-xl text-xs font-medium capitalize border transition-all",
                        flapTileStyle === st
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Cascade Flip Order
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['left', 'right', 'center', 'random'] as const).map((ord) => (
                    <button
                      key={ord}
                      onClick={() => setFlapOrder(ord)}
                      className={cn(
                        "h-9 rounded-lg text-[11px] font-medium capitalize border transition-all",
                        flapOrder === ord
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                      )}
                    >
                      {ord}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Stage Theme
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'dark', label: 'Noir' },
                    { id: 'surface', label: 'Theme' },
                    { id: 'slate', label: 'Slate' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => {
                        setFlapBoardBg(bg.id as any);
                        if (bg.id === 'dark') {
                          setFlapTileColor('#111827');
                          setFlapTextColor('#f8fafc');
                        } else if (bg.id === 'surface') {
                          setFlapTileColor(isDark ? colors.surface : '#ffffff');
                          setFlapTextColor(colors.foreground);
                        } else if (bg.id === 'slate') {
                          setFlapTileColor('#1e293b');
                          setFlapTextColor('#f1f5f9');
                        }
                      }}
                      className={cn(
                        "h-9 rounded-lg text-[11px] font-medium border transition-all",
                        flapBoardBg === bg.id
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-surface-elevated text-muted-foreground border-border hover:text-foreground"
                      )}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Colors & Tile Dimensions */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Colors & Tile Geometry
            </span>
            <ParameterGrid columns={3}>
              <ParameterColor
                label="Tile Color"
                value={flapTileColor}
                onChange={setFlapTileColor}
              />
              <ParameterColor
                label="Text Color"
                value={flapTextColor}
                onChange={setFlapTextColor}
              />
              <ParameterSlider
                label="Font Size"
                value={flapFontSize}
                onChange={setFlapFontSize}
                min={22}
                max={64}
                step={2}
                unit="px"
              />
            </ParameterGrid>
          </div>

          {/* Section 3: Physics & Timing */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Animation Physics & Flip Cadence
            </span>
            <ParameterGrid columns={4}>
              <ParameterSlider
                label="Flip Speed"
                value={flapDuration}
                onChange={setFlapDuration}
                min={0.05}
                max={0.3}
                step={0.01}
                unit="s"
              />
              <ParameterSlider
                label="Stagger Delay"
                value={flapStagger}
                onChange={setFlapStagger}
                min={0.01}
                max={0.15}
                step={0.01}
                unit="s"
              />
              <ParameterSlider
                label="Cycle Hold"
                value={flapCycleDelay / 1000}
                onChange={(val) => setFlapCycleDelay(Math.round(val * 1000))}
                min={1.0}
                max={5.0}
                step={0.2}
                unit="s"
              />
              <ParameterSlider
                label="Flips / Slot"
                value={flapFlipsPerChar}
                onChange={setFlapFlipsPerChar}
                min={2}
                max={16}
                step={1}
              />
              <ParameterSlider
                label="Bevel Depth"
                value={flapDepth}
                onChange={setFlapDepth}
                min={0}
                max={1}
                step={0.1}
              />
              <ParameterSlider
                label="Glare Sheen"
                value={flapGlare}
                onChange={setFlapGlare}
                min={0}
                max={1}
                step={0.1}
              />
            </ParameterGrid>
          </div>
        </div>

        {/* Live Flap Display */}
        <div
          className={cn(
            "p-6 sm:p-10 rounded-2xl border transition-colors flex flex-col items-center justify-center overflow-x-auto min-h-[220px]",
            flapBoardBg === 'dark'
              ? "bg-[#090d16] border-[#1e293b]"
              : flapBoardBg === 'slate'
              ? "bg-slate-900 border-slate-800 text-slate-100"
              : "bg-surface border-border shadow-xs"
          )}
        >
          <div className="w-full flex justify-center overflow-x-auto py-2">
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
              tileColor={flapTileColor}
              textColor={flapTextColor}
              glare={flapGlare}
              depth={flapDepth}
              tileRadius={8}
              gap={6}
              fontSize={flapFontSize}
              loop
              padTo={12}
              intro
            />
          </div>
          <span className="text-[11px] text-muted-foreground mt-4 font-mono tracking-wider text-center">
            AUTOMATIC MECHANICAL SPLIT-FLAP TRANSITION • {flapWords.length} PHRASES
          </span>
        </div>
      </div>
    );
};

export const TextRevealPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const [textRevealBy, setTextRevealBy] = useState<'word' | 'character'>('word');
  const [textRevealKey, setTextRevealKey] = useState(0);

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-foreground">Split Mode:</span>
            <div className="flex items-center gap-1.5">
              {(['word', 'character'] as const).map((mode) => (
                <Button
                  key={mode}
                  size="xs"
                  variant={textRevealBy === mode ? 'primary' : 'outline'}
                  onClick={() => setTextRevealBy(mode)}
                >
                  By {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setTextRevealKey((k) => k + 1);
                addToast({ title: 'Replayed Animation', description: `Text reveal triggered (${textRevealBy} split)`, type: 'info' });
              }}
            >
              <RotateCcw className="size-3.5 mr-1" />
              Replay Animation
            </Button>
          </div>
        </div>

        <div className="p-8 sm:p-14 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center text-center">
          <div className="max-w-xl space-y-4">
            <Badge variant="primary" size="sm">
              Motion Physics Text Pipeline
            </Badge>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-snug">
              <TextReveal
                key={textRevealKey}
                text="Engineered for mission-critical interfaces with fluid kinetic physics and accessible motion fallback."
                by={textRevealBy}
                stagger={textRevealBy === 'character' ? 0.025 : 0.065}
              />
            </h2>

            <p className="text-sm text-muted-foreground pt-2">
              Words fade and blur upward into focus using a cubic-bezier ease with automatic viewport detection and reduced-motion fallback.
            </p>
          </div>
        </div>
      </div>
    );
};

export const StreamingTextPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const sampleStreamingReply =
    "Antigravity components are built on dynamic HSL design tokens, supporting zero-flash dark mode, spring physics via motion/react, and seamless keyboard accessibility.";
  const [streamPacing, setStreamPacing] = useState(24);
  const [streamKey, setStreamKey] = useState(0);

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
};

export const MarkdownEditorPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  const defaultMarkdownContent = `# Quantum Mechanics & Relativistic Physics

This document showcases **live Markdown rendering** with full **KaTeX LaTeX math support** built completely from scratch.

> [!NOTE]
> Math formulas render synchronously using KaTeX with zero latency and high fidelity.

### Core Mathematical Formulations

Here is Einstein's famous mass-energy-momentum invariant relation:

$$E^2 = (m_0 c^2)^2 + (pc)^2$$

And the time-dependent **Schrödinger Equation** describing quantum state evolution:

$$i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t)$$

You can also write inline math formulas such as $e^{i\\pi} + 1 = 0$, or standard deviations $\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^N (x_i - \\mu)^2}$.

### Gaussian Integral

$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

> [!TIP]
> Hover any block equation above to copy its raw TeX source!

### Engineering Task Checklist
- [x] Implement from-scratch optical Markdown block parser
- [x] Embed KaTeX LaTeX mathematical typography
- [x] Support GitHub-flavored alerts (Note, Tip, Important, Warning)
- [ ] Connect remote collaborative WebSocket operational transforms

### System Performance Comparison

| Metric | Legacy Engine | Antigravity Engine | Speedup |
| :--- | :---: | :---: | ---: |
| First Paint | 142ms | 18ms | 7.8x |
| Formula Parse | 88ms | 1.2ms | 73x |
| Bundle Overhead | 480KB | 42KB | 11.4x |

\`\`\`typescript
// Clean TypeScript integration
import { MarkdownEditor, MarkdownRenderer } from 'es-react-components';

export function PhysicsNote() {
  return <MarkdownEditor mode="split" defaultValue="# Hello KaTeX" />;
}
\`\`\`
`;
  const [markdownVal, setMarkdownVal] = useState(defaultMarkdownContent);
  const [markdownMode, setMarkdownMode] = useState<any>('split');

  return (
      <div className="space-y-6">
        {/* Controls Card */}
        <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="font-semibold text-foreground">Markdown & KaTeX Math Editor</span>
            <Badge size="sm" variant="outline" className="font-mono text-[10px]">Split View</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setMarkdownVal(defaultMarkdownContent);
                addToast({
                  title: 'Template Reset',
                  description: 'Loaded Quantum Mechanics & Math demo document.',
                  type: 'info',
                });
              }}
            >
              Reset Demo
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setMarkdownVal(
                  `# Quick KaTeX Math Cheatsheet\n\n- Inline: $f(x) = ax^2 + bx + c$\n- Binomial: $(x+y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k$\n- Limits: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$\n\n$$\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}$$`
                );
              }}
            >
              Math Cheat
            </Button>
          </div>
        </div>

        {/* Live Editor */}
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border min-h-[520px]">
          <MarkdownEditor
            label="Technical Document Editor"
            value={markdownVal}
            onChange={(val) => setMarkdownVal(val)}
            mode={markdownMode}
            onModeChange={(m) => setMarkdownMode(m)}
            minHeight="480px"
            helperText="Full GitHub-flavored Markdown with KaTeX math rendering ($inline$ & $$block$$)."
          />
        </div>
      </div>
    );
};
