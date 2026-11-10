import type { ComponentDoc } from './types';

export const FEEDBACK_COMPONENTS: ComponentDoc[] = [
{
    id: 'dialog',
    name: 'Dialog',
    category: 'Feedback',
    description:
      'Accessible modal overlay with backdrop blur, keyboard ESC dismissal, and focus trapping.',
    importCode: `import { Dialog } from 'es-react-components';`,
    usageCode: `<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Deployment"
  description="Roll out v2.4.0 to worldwide edge cluster?"
>
  <Button onClick={() => setIsOpen(false)}>Proceed</Button>
</Dialog>`,
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Controls modal visibility.',
      },
      {
        name: 'onClose',
        type: '() => void',
        defaultVal: '() => {}',
        description: 'Invoked on backdrop click or ESC press.',
      },
      {
        name: 'title',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Modal header heading.',
      },
    ],
    themeTokens: ['--surface-elevated', '--border', '--radius-xl', '--foreground'],
  },
{
    id: 'alert',
    name: 'Alert',
    category: 'Feedback',
    description:
      'Banner callout for critical user feedback across 4 semantic states: info, success, warning, danger.',
    importCode: `import { Alert } from 'es-react-components';`,
    usageCode: `<Alert variant="success" title="Backup Complete">
  32.4 GB archived to distributed object storage.
</Alert>`,
    props: [
      {
        name: 'variant',
        type: `'info' | 'success' | 'warning' | 'danger'`,
        defaultVal: `'info'`,
        description: 'Visual accent and status iconography.',
      },
      {
        name: 'title',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Bold callout title.',
      },
      {
        name: 'onClose',
        type: '() => void',
        defaultVal: 'undefined',
        description: 'Adds an inline close/dismiss button.',
      },
    ],
    themeTokens: [
      '--info',
      '--success',
      '--warning',
      '--destructive',
      '--border-subtle',
    ],
  },
{
    id: 'toast',
    name: 'Toast (SwipeToast)',
    category: 'Feedback',
    description:
      'Kinetic swipe-to-dismiss toast notifications featuring spring physics, rubberband drag resistance, linear burning fuse progress indicator, pause-on-hover, and WAI-ARIA politeness. Supports both declarative inline/floating mounting (<SwipeToast />) and imperative queuing (useToast().addToast()).',
    importCode: `import { Toast, SwipeToast, ToastProvider, useToast } from 'es-react-components';`,
    usageCode: `// 1. Declarative inline / floating component:
<SwipeToast
  title="File archived"
  description="Stored in cold vault"
  actionLabel="Undo"
  onAction={() => restoreFile()}
  fuse="bottom"
  duration={4000}
  pauseOnHover
/>

// 2. Imperative hook queue:
const { addToast } = useToast();

addToast({
  title: 'Repository Forked',
  description: 'Created remote fork under org/demo.',
  type: 'success',
  actionLabel: 'View PR',
  onAction: () => navigate('/prs'),
  fuse: 'bottom',
  duration: 4500,
});`,
    props: [
      {
        name: 'title',
        type: 'ReactNode',
        defaultVal: '"File archived"',
        description: 'Main notification headline or heading element.',
      },
      {
        name: 'description',
        type: 'ReactNode',
        defaultVal: '""',
        description: 'Supporting descriptive body text.',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        defaultVal: 'undefined',
        description: 'Leading status icon or glyph element.',
      },
      {
        name: 'actionLabel',
        type: 'ReactNode',
        defaultVal: '""',
        description: 'Text label for interactive action button (e.g. "Undo", "Retry").',
      },
      {
        name: 'onAction',
        type: '() => void',
        defaultVal: 'undefined',
        description: 'Callback fired when action button is clicked.',
      },
      {
        name: 'duration',
        type: 'number',
        defaultVal: '4000',
        description: 'Burning fuse countdown in milliseconds before auto-dismiss (0 for persistent).',
      },
      {
        name: 'fuse',
        type: `'bottom' | 'top' | 'none'`,
        defaultVal: `'bottom'`,
        description: 'Placement of linear countdown progress bar.',
      },
      {
        name: 'pauseOnHover',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Whether countdown freezes when mouse pointer enters card.',
      },
      {
        name: 'closeButton',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Whether to show the dismiss close icon button.',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultVal: 'false',
        description: 'If true, renders inline in the flow layout with animated grid-rows height collapse.',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Enables gesture drag-to-dismiss and Escape key close.',
      },
      {
        name: 'settleBounce',
        type: 'number',
        defaultVal: '0.2',
        description: 'Spring settle bounce coefficient for released drag gesture.',
      },
      {
        name: 'swipeDistance',
        type: 'number',
        defaultVal: '40',
        description: 'Drag threshold in pixels required to trigger swipe dismissal.',
      },
      {
        name: 'fuseColor',
        type: 'string',
        defaultVal: `'var(--primary, #f5a524)'`,
        description: 'Custom CSS color or gradient token for burning fuse line.',
      },
    ],
    themeTokens: [
      '--surface-elevated',
      '--border',
      '--foreground',
      '--muted-foreground',
      '--primary',
      '--radius',
    ],
  },
{
    id: 'spinner',
    name: 'Spinner & Skeleton',
    category: 'Feedback',
    description:
      'Animated loading indicators including continuous radial CSS spinner and shimmer skeleton pulses.',
    importCode: `import { Spinner, Skeleton } from 'es-react-components';`,
    usageCode: `<Spinner size="md" />

<Skeleton className="h-4 w-3/4 rounded" />`,
    props: [
      {
        name: 'size',
        type: `'sm' | 'md' | 'lg' | 'xl'`,
        defaultVal: `'md'`,
        description: 'Spinner diameter scale.',
      },
    ],
    themeTokens: ['--primary', '--border', '--surface-subtle'],
  },
{
    id: 'motion-loaders',
    name: 'Motion Loaders',
    category: 'Feedback',
    description:
      'Smooth, accessible motion loaders powered by Framer Motion: SquareSnake 3x3 staggered wave matrix and BobbingDots harmonic bounce wave.',
    importCode: `import { SquareSnake, BobbingDots } from 'es-react-components';`,
    usageCode: `<div className="flex items-center gap-8">
  <SquareSnake size="md" />
  <BobbingDots size="md" />
</div>`,
    props: [
      {
        name: 'size',
        type: `'sm' | 'md' | 'lg'`,
        defaultVal: `'md'`,
        description: 'Scale dimension of the loader indicator.',
      },
      {
        name: 'duration',
        type: 'number',
        defaultVal: '1.5 (SquareSnake) / 1.2 (BobbingDots)',
        description: 'Full cycle animation duration in seconds.',
      },
      {
        name: 'label',
        type: 'string',
        defaultVal: `'Loading...'`,
        description: 'Accessible screen-reader announcement label.',
      },
    ],
    themeTokens: ['--foreground', '--primary'],
  },
{
    id: 'ai-approval-card',
    name: 'AI Approval Card',
    category: 'Feedback',
    description:
      'Human-in-the-loop approval workflow card with sliding questions, rolling digit odometer counters, glide hover highlights, and single/multi-choice controls.',
    importCode: `import { AIApprovalCard, ApprovalQuestion } from 'es-react-components';`,
    usageCode: `<AIApprovalCard
  theme="light"
  questions={[
    { q: 'How many flavors?', type: 'radio', options: ['Three', 'Five', 'One'] },
    { q: 'Which mix-ins?', type: 'check', options: ['Chips', 'Waffle', 'Sprinkles'] }
  ]}
  onSubmitted={(answers, custom) => console.log('Approved:', answers, custom)}
/>`,
    props: [
      {
        name: 'theme',
        type: `'light' | 'dark'`,
        defaultVal: `'light'`,
        description: 'Card color scheme theme.',
      },
      {
        name: 'questions',
        type: 'ApprovalQuestion[]',
        defaultVal: 'DEFAULT_APPROVAL_QUESTIONS',
        description: 'Array of interactive approval questions.',
      },
      {
        name: 'labels',
        type: 'Partial<ApprovalLabels>',
        defaultVal: 'DEFAULT_APPROVAL_LABELS',
        description: 'Customizable button and message labels.',
      },
      {
        name: 'onSubmitted',
        type: '(answers: Record<number, number[]>, custom: Record<number, string>) => void',
        defaultVal: 'undefined',
        description: 'Callback triggered when all approval questions are completed.',
      },
      {
        name: 'resettable',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Allows starting over once submitted.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--success'],
  },
{
    id: 'task-steps',
    name: 'Task Steps',
    category: 'Feedback',
    description:
      'Multi-stage pipeline indicator with connected track lines, completed badges, active pulsating rings, and failure state alerts.',
    importCode: `import { TaskSteps } from 'es-react-components';`,
    usageCode: `<TaskSteps
  steps={[
    { id: 'queue', label: 'Queued' },
    { id: 'build', label: 'Building' },
    { id: 'test', label: 'Running checks' },
    { id: 'deploy', label: 'Deploying' },
  ]}
  current={2}
  failed={false}
  label="Deployment pipeline"
/>`,
    props: [
      { name: 'steps', type: 'TaskStepItem[]', defaultVal: '[]', description: 'Stage items with id, label, and description.' },
      { name: 'current', type: 'number', defaultVal: '0', description: '0-based index of the currently active stage.' },
      { name: 'failed', type: 'boolean', defaultVal: 'false', description: 'Marks the current stage as failed with destructive alert styling.' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", defaultVal: "'horizontal'", description: 'Layout axis.' },
    ],
    themeTokens: ['--primary', '--primary-foreground', '--border', '--destructive', '--surface'],
  },
{
    id: 'collapsible-banner',
    name: 'Collapsible Banner',
    category: 'Feedback',
    description:
      'Foldable announcement and incident banner with spring accordion height collapse, inline action triggers, and dismissal controls.',
    importCode: `import { CollapsibleBanner } from 'es-react-components';`,
    usageCode: `<CollapsibleBanner
  title="Payments are degraded"
  description="Charges are queued and settle automatically once the provider recovers."
  dismissible={false}
  variant="warning"
/>

<CollapsibleBanner
  title="Your card was declined"
  description="Invoices stay open until it clears."
  variant="destructive"
  action={<Button size="xs">Update method</Button>}
/>`,
    props: [
      { name: 'title', type: 'React.ReactNode', defaultVal: "''", description: 'Banner headline.' },
      { name: 'description', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Foldable details text.' },
      { name: 'variant', type: "'default' | 'warning' | 'destructive' | 'info' | 'success'", defaultVal: "'warning'", description: 'Color scheme and status icon.' },
      { name: 'dismissible', type: 'boolean', defaultVal: 'true', description: 'Shows close button.' },
      { name: 'action', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Inline trailing button slot.' },
    ],
    themeTokens: ['--warning', '--destructive', '--info', '--success', '--border', '--surface'],
  },
{
    id: 'modal',
    name: 'Modal',
    category: 'Feedback',
    description:
      'Accessible dialog window with backdrop blur, scroll locking, Escape key stacking, outside-click detection, and spring scale entrance.',
    importCode: `import { Modal, useModal } from 'es-react-components';`,
    usageCode: `<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  footer={<Button onClick={() => setIsOpen(false)}>Done</Button>}
>
  <p>Modal body content...</p>
</Modal>`,
    props: [
      { name: 'open', type: 'boolean', defaultVal: 'false', description: 'Visibility state.' },
      { name: 'onClose', type: '() => void', defaultVal: 'undefined', description: 'Callback fired on close or dismissal.' },
      { name: 'title', type: 'React.ReactNode', defaultVal: "''", description: 'Modal title heading.' },
      { name: 'description', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Supplementary description.' },
      { name: 'footer', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Action buttons container.' },
    ],
    themeTokens: ['--surface', '--border', '--foreground', '--radius', '--primary'],
  },
{
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    description:
      'High-performance warm-start tooltips with spring glide transitions, grouping contexts, keyboard focus detection, and blur reveal.',
    importCode: `import { Tooltip, TooltipGroup, useTooltip } from 'es-react-components';`,
    usageCode: `<Tooltip label="Copy API Key" side="top">
  <button className="p-2 border rounded">Copy</button>
</Tooltip>

// Grouped tooltips with instant warm-travel:
<TooltipGroup openDelay={200} skipDelay={400}>
  <Tooltip label="Bold"><button>B</button></Tooltip>
  <Tooltip label="Italic"><button>I</button></Tooltip>
</TooltipGroup>`,
    props: [
      { name: 'label', type: 'React.ReactNode', defaultVal: "''", description: 'Tooltip text or element.' },
      { name: 'side', type: "'top' | 'bottom'", defaultVal: "'top'", description: 'Placement relative to trigger.' },
      { name: 'openDelay', type: 'number', defaultVal: '200', description: 'Hover delay in milliseconds.' },
      { name: 'children', type: 'React.ReactElement', defaultVal: 'undefined', description: 'Trigger child element.' },
    ],
    themeTokens: ['--surface-elevated', '--border', '--foreground', '--radius'],
  },
{
    id: 'reading-progress',
    name: 'Reading Progress',
    category: 'Feedback',
    description:
      'Scroll-tracked reading progress meter with estimated minutes remaining calculation, spring fill animations, and animated completion checkmark.',
    importCode: `import { ReadingProgress, useReadingProgress } from 'es-react-components';`,
    usageCode: `<ReadingProgress
  words={1200}
  wordsPerMinute={220}
  scroller={containerRef}
  label="Article Progress"
  doneLabel="Finished"
/>`,
    props: [
      { name: 'words', type: 'number', defaultVal: '0', description: 'Total word count used for reading time estimate.' },
      { name: 'wordsPerMinute', type: 'number', defaultVal: '220', description: 'Reading speed benchmark.' },
      { name: 'steps', type: 'number', defaultVal: '24', description: 'Discrete animation milestones.' },
      { name: 'scroller', type: 'ScrollRef', defaultVal: 'undefined', description: 'Scroll container ref (defaults to window).' },
      { name: 'target', type: 'ScrollRef', defaultVal: 'undefined', description: 'Specific target element ref to track.' },
      { name: 'doneLabel', type: 'string', defaultVal: "'Completed'", description: 'Label displayed upon reaching 100% completion.' },
    ],
    themeTokens: ['--primary', '--surface-subtle', '--border', '--foreground'],
  },
{
    id: 'poll-results',
    name: 'Poll Results',
    category: 'Feedback',
    description:
      'Interactive voting poll component featuring spring-animated clip-path progress reveals, percentage counters, winner tick pop animation, and one-vote enforcement.',
    importCode: `import { PollResults, usePollResults } from 'es-react-components';`,
    usageCode: `<PollResults
  label="Favorite Developer Tooling"
  options={[
    { id: 'react', label: 'React 19 & Vite', votes: 1420 },
    { id: 'next', label: 'Next.js App Router', votes: 980 },
    { id: 'astro', label: 'Astro Islands', votes: 640 },
  ]}
  onVote={(id) => console.log('Voted for:', id)}
/>`,
    props: [
      { name: 'options', type: 'PollOption[]', defaultVal: '[]', description: 'Array of poll options with id, label, and vote count.' },
      { name: 'label', type: 'string', defaultVal: "''", description: 'Question title for the poll.' },
      { name: 'value', type: 'string | null', defaultVal: 'undefined', description: 'Controlled chosen vote option id.' },
      { name: 'onVote', type: '(id: string) => void', defaultVal: 'undefined', description: 'Fired when user clicks an unvoted option.' },
    ],
    themeTokens: ['--primary', '--surface-elevated', '--border', '--foreground', '--radius'],
  }
];
