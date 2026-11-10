import type { ComponentDoc } from './types';

export const SURFACES_COMPONENTS: ComponentDoc[] = [
{
    id: 'card',
    name: 'Card',
    category: 'Surfaces & Layout',
    description:
      'Structured content container with compound components: CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.',
    importCode: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from 'es-react-components';`,
    usageCode: `<Card variant="default">
  <CardHeader>
    <CardTitle>Distributed Database Cluster</CardTitle>
    <CardDescription>Multi-region replicated Postgres instance.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Read replica healthy in ap-southeast-1.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Manage Replicas</Button>
  </CardFooter>
</Card>`,
    props: [
      {
        name: 'variant',
        type: `'default' | 'elevated' | 'glass' | 'outline' | 'subtle'`,
        defaultVal: `'default'`,
        description: 'Elevation, border, and backdrop blur characteristics.',
      },
    ],
    themeTokens: [
      '--card',
      '--card-foreground',
      '--border',
      '--radius',
      '--surface-elevated',
    ],
  },
{
    id: 'stat',
    name: 'Stat',
    category: 'Surfaces & Layout',
    description:
      'Dashboard metric indicator showing numeric figures, positive/negative delta trend indicators, and caption notes.',
    importCode: `import { Stat } from 'es-react-components';`,
    usageCode: `<Stat
  title="Monthly Recurring Revenue"
  value="$148,200"
  trend={{ value: 12.4, isPositive: true }}
  description="vs last billing cycle"
/>`,
    props: [
      {
        name: 'title',
        type: 'string',
        defaultVal: '""',
        description: 'Metric category header.',
      },
      {
        name: 'value',
        type: 'string | number',
        defaultVal: '""',
        description: 'Primary highlighted figure.',
      },
      {
        name: 'trend',
        type: '{ value: number, isPositive: boolean }',
        defaultVal: 'undefined',
        description: 'Percentage change trend with up/down arrows.',
      },
      {
        name: 'description',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Contextual sub-label.',
      },
    ],
    themeTokens: ['--card', '--foreground', '--success', '--destructive', '--muted-foreground'],
  },
{
    id: 'liquid-glass-sheet',
    name: 'Liquid Glass Sheet',
    category: 'Surfaces & Layout',
    description:
      'Ultra-smooth iOS liquid glass bottom drawer with optical normal-map refraction, chromatic dispersion, spring physics, touch drag-to-dismiss, and animated action rows.',
    importCode: `import { LiquidGlassSheet } from 'es-react-components';`,
    usageCode: `<LiquidGlassSheet
  title="Autumn Forest"
  subtitle="Liquid Glass Experience"
  link="https://liquid-glass-react-studio.vercel.app"
  linkLabel="liquid-glass-studio"
  defaultOpen={true}
  onShare={() => console.log('Share clicked')}
  onSaveChange={(saved) => console.log('Saved:', saved)}
/>`,
    props: [
      {
        name: 'title',
        type: 'string',
        defaultVal: `'Autumn forest'`,
        description: 'Main sheet title headline.',
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultVal: `'Liquid glass sheet'`,
        description: 'Secondary subtitle meta text.',
      },
      {
        name: 'backgroundImage',
        type: 'string',
        defaultVal: 'Unsplash Forest CDN',
        description: 'Background wallpaper refracted behind the liquid glass pane.',
      },
      {
        name: 'link',
        type: 'string',
        defaultVal: `'https://liquid-glass-react-studio.vercel.app/components'`,
        description: 'URL target copied when user clicks the copy link action row.',
      },
      {
        name: 'linkLabel',
        type: 'string',
        defaultVal: `'liquid-glass-react-studio'`,
        description: 'Human-readable label preview for the link row.',
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Initial drawer open visibility.',
      },
      {
        name: 'open',
        type: 'boolean',
        defaultVal: 'undefined',
        description: 'Controlled visibility state.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        defaultVal: 'undefined',
        description: 'Callback when sheet opens or closes.',
      },
      {
        name: 'onSaveChange',
        type: '(saved: boolean) => void',
        defaultVal: 'undefined',
        description: 'Callback when user toggles bookmark save state.',
      },
      {
        name: 'onShare',
        type: '() => void',
        defaultVal: 'undefined',
        description: 'Callback when user clicks the share action.',
      },
      {
        name: 'theme',
        type: `'light' | 'dark' | 'auto'`,
        defaultVal: `'light'`,
        description: 'Theme variation for color contrast.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--primary', '--border'],
  },
{
    id: 'card-coverflow',
    name: 'Card Coverflow',
    category: 'Surfaces & Layout',
    description:
      '3D perspective coverflow carousel featuring Spring physics, distinct architectural imagery, depth offsets, interactive slide clicks, and pill dot navigation.',
    importCode: `import { CardCoverFlow, DEFAULT_COVERFLOW_IMAGES } from 'es-react-components';`,
    usageCode: `<CardCoverFlow
  images={DEFAULT_COVERFLOW_IMAGES}
  initialIndex={2}
  isMonochrome={false}
  onIndexChange={(idx) => console.log('Active slide:', idx)}
/>`,
    props: [
      {
        name: 'images',
        type: 'Array<{ src: string; title: string; subtitle?: string }>',
        defaultVal: 'DEFAULT_COVERFLOW_IMAGES (5 architectural photos)',
        description: 'List of slide images and titles.',
      },
      {
        name: 'initialIndex',
        type: 'number',
        defaultVal: '2',
        description: 'Initial focused active slide index.',
      },
      {
        name: 'isMonochrome',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Renders minimalist numbered slate cards instead of photo textures.',
      },
      {
        name: 'onIndexChange',
        type: '(index: number) => void',
        defaultVal: 'undefined',
        description: 'Callback triggered when active slide changes.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--primary', '--border'],
  },
{
    id: 'card-carousel',
    name: 'Card Carousel',
    category: 'Surfaces & Layout',
    description:
      'Fan-out stack card carousel featuring angular tilt on hover, depth scaling, track translation, and dot controls with curated landscapes.',
    importCode: `import { CardCarousel, DEFAULT_CAROUSEL_IMAGES } from 'es-react-components';`,
    usageCode: `<CardCarousel
  images={DEFAULT_CAROUSEL_IMAGES}
  initialIndex={2}
  slideWidth={160}
  onIndexChange={(idx) => console.log('Active slide:', idx)}
/>`,
    props: [
      {
        name: 'images',
        type: 'Array<{ src: string; title: string; subtitle?: string }>',
        defaultVal: 'DEFAULT_CAROUSEL_IMAGES (5 landscape photos)',
        description: 'List of carousel card items.',
      },
      {
        name: 'initialIndex',
        type: 'number',
        defaultVal: '2',
        description: 'Initial focused card index.',
      },
      {
        name: 'slideWidth',
        type: 'number',
        defaultVal: '160',
        description: 'Width of each card column in pixels.',
      },
      {
        name: 'hovered',
        type: 'boolean',
        defaultVal: 'undefined',
        description: 'Manual override for hover fan-out state.',
      },
      {
        name: 'isMonochrome',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Renders minimalist numbered slate cards instead of photo textures.',
      },
      {
        name: 'onIndexChange',
        type: '(index: number) => void',
        defaultVal: 'undefined',
        description: 'Callback triggered when active card changes.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--primary', '--border'],
  },
{
    id: 'issue-board',
    name: 'Issue Board (Kanban)',
    category: 'Surfaces & Layout',
    description:
      'High-performance drag-and-drop Kanban board with lane status management, card sorting, keyboard accessibility, popover filters, and board/list views.',
    importCode: `import { RudderIssueBoard, BoardIssue } from 'es-react-components';`,
    usageCode: `<RudderIssueBoard
  theme="dark"
  initialIssues={issues}
  onIssuesChange={(updated) => console.log('Board updated:', updated)}
/>`,
    props: [
      {
        name: 'theme',
        type: `'light' | 'dark'`,
        defaultVal: `'dark'`,
        description: 'Color theme override for the issue board.',
      },
      {
        name: 'initialIssues',
        type: 'readonly BoardIssue[]',
        defaultVal: 'DEFAULT_ISSUES',
        description: 'Initial array of board issues to populate lanes.',
      },
      {
        name: 'onIssuesChange',
        type: '(issues: BoardIssue[]) => void',
        defaultVal: 'undefined',
        description: 'Callback invoked when cards are moved, sorted, or created.',
      },
      {
        name: 'className',
        type: 'string',
        defaultVal: `''`,
        description: 'Optional additional CSS classes for the board container.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary'],
  },
{
    id: 'ai-code-block',
    name: 'AI Code & Diff Block',
    category: 'Surfaces & Layout',
    description:
      'Editor panel with live syntax highlighting, line numbers, unified diff comparison with word-level changes, diff stat counters, and copy feedback.',
    importCode: `import { AICodeBlock, DiffRow } from 'es-react-components';`,
    usageCode: `<AICodeBlock
  theme="light"
  filename="churn.ts"
  lines={["export async function churn() {", "  return true;", "}"]}
/>`,
    props: [
      {
        name: 'theme',
        type: `'light' | 'dark'`,
        defaultVal: `'light'`,
        description: 'Light or dark color scheme.',
      },
      {
        name: 'filename',
        type: 'string',
        defaultVal: `'churn.ts'`,
        description: 'Filename displayed in header bar.',
      },
      {
        name: 'lines',
        type: 'string[]',
        defaultVal: 'DEFAULT_CODE_LINES',
        description: 'Array of code lines for Code view.',
      },
      {
        name: 'diff',
        type: 'DiffRow[]',
        defaultVal: 'DEFAULT_DIFF_ROWS',
        description: 'Unified diff rows with added, deleted, or context pieces.',
      },
      {
        name: 'variant',
        type: `'Code' | 'Diff'`,
        defaultVal: 'undefined (switchable)',
        description: 'Forces specific view mode or enables toggle control.',
      },
      {
        name: 'onCopy',
        type: '(text: string) => void',
        defaultVal: 'undefined',
        description: 'Callback when code is successfully copied to clipboard.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--success', '--destructive'],
  },
{
    id: 'load-more',
    name: 'Load More',
    category: 'Surfaces & Layout',
    description:
      'IntersectionObserver-powered sentinel for infinite lists and feeds with automatic page triggering, loading spinners, retry controls, and exhaustion labels.',
    importCode: `import { LoadMore } from 'es-react-components';`,
    usageCode: `<LoadMore
  onLoad={async () => {
    const hasNext = await fetchNextPage();
    return hasNext;
  }}
  rootRef={containerRef}
  rootMargin="600px 0px"
  onError={(err) => console.error(err)}
/>`,
    props: [
      { name: 'onLoad', type: '() => Promise<boolean>', defaultVal: 'undefined', description: 'Async function returning whether more items exist.' },
      { name: 'rootRef', type: 'React.RefObject<HTMLElement | null>', defaultVal: 'undefined', description: 'Scrollable container element reference.' },
      { name: 'rootMargin', type: 'string', defaultVal: "'400px 0px'", description: 'Viewport intersection margin triggering early preloading.' },
      { name: 'onError', type: '(error: unknown) => void', defaultVal: 'undefined', description: 'Error callback when page fetch throws.' },
    ],
    themeTokens: ['--surface', '--muted-foreground', '--destructive', '--primary'],
  },
{
    id: 'presence-avatars',
    name: 'Presence Avatars',
    category: 'Surfaces & Layout',
    description:
      'Spring-animated active user rail with image loading states, fallback initials, overflow +N chip button, and live screen-reader announcements.',
    importCode: `import { PresenceAvatars, usePresence } from 'es-react-components';`,
    usageCode: `<PresenceAvatars
  people={[
    { id: '1', name: 'Elena Rostova', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { id: '2', name: 'Marcus Sterling' },
    { id: '3', name: 'Devin Vance' },
  ]}
  max={4}
  size={32}
  onOverflowSelect={(hidden) => console.log(hidden)}
/>`,
    props: [
      { name: 'people', type: 'PresencePerson[]', defaultVal: '[]', description: 'List of active users with id, name, and optional src.' },
      { name: 'max', type: 'number', defaultVal: '5', description: 'Maximum visible avatar slots before collapsing into +N.' },
      { name: 'size', type: 'number', defaultVal: '32', description: 'Avatar diameter in pixels.' },
      { name: 'overlap', type: 'number', defaultVal: '10', description: 'Horizontal overlap spacing between avatars.' },
    ],
    themeTokens: ['--surface-elevated', '--border', '--primary', '--muted-foreground', '--radius'],
  },
{
    id: 'accordion',
    name: 'Accordion',
    category: 'Surfaces & Layout',
    description:
      'Smooth animated collapsible disclosure rows powered by ResizeObserver auto-height, spring physics, and keyboard navigation (Arrow keys, Home, End). Supports single or multiple open modes.',
    importCode: `import { Accordion, useAccordion, useAutoHeight } from 'es-react-components';`,
    usageCode: `<Accordion
  type="single"
  defaultOpen={['item-1']}
  items={[
    { id: 'item-1', title: 'What is this library?', content: 'A production-ready React 19 UI component system.' },
    { id: 'item-2', title: 'Is it theme-customizable?', content: 'Yes! Fully driven by dynamic HSL CSS tokens.' },
    { id: 'item-3', title: 'Are animations accessible?', content: 'All motion respects prefers-reduced-motion automatically.' },
  ]}
/>`,
    props: [
      { name: 'items', type: 'AccordionItem[]', defaultVal: '[]', description: 'Accordion entries with id, title, content, and optional meta.' },
      { name: 'type', type: "'single' | 'multiple'", defaultVal: "'single'", description: 'Whether only one row or multiple can be expanded at once.' },
      { name: 'defaultOpen', type: 'string[]', defaultVal: '[]', description: 'Initially expanded row ids.' },
      { name: 'collapsible', type: 'boolean', defaultVal: 'true', description: 'Whether the active single item can be collapsed.' },
      { name: 'maxPanelHeight', type: 'number', defaultVal: '320', description: 'Maximum scrollable panel height in pixels.' },
    ],
    themeTokens: ['--border', '--surface-elevated', '--surface-subtle', '--foreground', '--radius'],
  }
];
