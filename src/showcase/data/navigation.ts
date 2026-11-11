import type { ComponentDoc } from './types';

export const NAVIGATION_COMPONENTS: ComponentDoc[] = [
{
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation & Menus',
    description:
      'Spring-indicator sliding plateau tabs with automatic/manual keyboard activation, directional panel transition animations, and backwards-compatible segmented, pills, and underline variants.',
    importCode: `import { Tabs, useTabs } from 'es-react-components';`,
    usageCode: `<Tabs
  variant="plateau"
  defaultValue="overview"
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'security', label: 'Security' },
    { value: 'integrations', label: 'Integrations' },
    { value: 'billing', label: 'Billing', disabled: true },
  ]}
  renderPanel={(value) => (
    <div className="p-4">Active pane: {value}</div>
  )}
/>`,
    props: [
      {
        name: 'variant',
        type: `'plateau' | 'pills' | 'underline' | 'segmented'`,
        defaultVal: `'plateau'`,
        description: 'Visual presentation variant of the tab navigation rail.',
      },
      {
        name: 'items',
        type: 'TabItem[]',
        defaultVal: '[]',
        description: 'Array of tabs with value, label, optional icon, badge, and disabled state.',
      },
      {
        name: 'value',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Controlled active tab value (or activeTab for legacy compatibility).',
      },
      {
        name: 'defaultValue',
        type: 'string',
        defaultVal: 'first enabled',
        description: 'Initial selected tab for uncontrolled mode.',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        defaultVal: 'undefined',
        description: 'Event callback triggered when a tab is selected.',
      },
      {
        name: 'activation',
        type: `'automatic' | 'manual'`,
        defaultVal: `'automatic'`,
        description: 'Keyboard navigation selection mode on arrow press.',
      },
      {
        name: 'renderPanel',
        type: '(value: string) => React.ReactNode',
        defaultVal: 'undefined',
        description: 'Direction-aware spring animated panel renderer.',
      },
    ],
    themeTokens: ['--primary', '--border', '--surface-elevated', '--surface-subtle', '--radius'],
  },
{
    id: 'branched-menu',
    name: 'Branched Menu (Tree Navigation)',
    category: 'Navigation & Menus',
    description:
      'Tree structure navigation menu with curved SVG vector branches and animated path stroke drawing. Features sliding section indicator pills, accordion folding, and responsive custom dimensions.',
    importCode: `import { BranchedMenu } from 'es-react-components';
import { Download04Icon, Rocket01Icon, Settings02Icon } from '@hugeicons/core-free-icons';`,
    usageCode: `<BranchedMenu
  items={[
    {
      label: 'Getting started',
      children: [
        { value: 'install', label: 'Installation', icon: Download04Icon },
        { value: 'quick', label: 'Quick start', icon: Rocket01Icon },
        { value: 'config', label: 'Configuration', icon: Settings02Icon },
      ],
    },
    {
      label: 'Components',
      children: [
        { value: 'buttons', label: 'Buttons' },
        { value: 'overlays', label: 'Overlays' },
      ],
    },
  ]}
  defaultOpen={[0]}
  defaultActive="quick"
  onSelect={(value, item) => console.log(value, item)}
  color="#f5f5f5"
  accentColor="#f5f5f5"
  lineColor="#3f3f46"
  width={240}
  rowHeight={36}
  indent={40}
  trunk={14}
  radius={10}
  lineWidth={1.5}
  fontSize={14}
  drawDuration={400}
  foldDuration={300}
/>`,
    props: [
      {
        name: 'items',
        type: 'BranchedMenuItem[]',
        defaultVal: 'DEFAULT_ITEMS',
        description: 'Hierarchical navigation items with label, value, children, and icons.',
      },
      {
        name: 'defaultOpen',
        type: 'number | number[]',
        defaultVal: '0',
        description: 'Index or indices of sections expanded initially.',
      },
      {
        name: 'defaultActive',
        type: 'string',
        defaultVal: `''`,
        description: 'Value of the initially highlighted active leaf child item.',
      },
      {
        name: 'onSelect',
        type: '(value: string, item: BranchedMenuItem | BranchedMenuItemChild) => void',
        defaultVal: 'undefined',
        description: 'Callback fired when a leaf or section item is clicked.',
      },
      {
        name: 'onToggle',
        type: '(index: number, isOpen: boolean) => void',
        defaultVal: 'undefined',
        description: 'Callback fired when a parent section is expanded or collapsed.',
      },
      {
        name: 'color',
        type: 'string',
        defaultVal: `'var(--foreground, #f5f5f5)'`,
        description: 'Standard text ink color for header and item labels.',
      },
      {
        name: 'accentColor',
        type: 'string',
        defaultVal: `'var(--primary, #6366f1)'`,
        description: 'Highlight color for active branch strokes, icons, and marker pill.',
      },
      {
        name: 'lineColor',
        type: 'string',
        defaultVal: `'var(--border, #3f3f46)'`,
        description: 'Subtle inactive tree branch connector stroke color.',
      },
      {
        name: 'width',
        type: 'number',
        defaultVal: '240',
        description: 'Maximum container width in pixels.',
      },
      {
        name: 'rowHeight',
        type: 'number',
        defaultVal: '36',
        description: 'Vertical height of each child item row in pixels.',
      },
      {
        name: 'indent',
        type: 'number',
        defaultVal: '40',
        description: 'Horizontal indentation distance for nested child items in pixels.',
      },
      {
        name: 'trunk',
        type: 'number',
        defaultVal: '14',
        description: 'X coordinate of the main vertical stem line in pixels.',
      },
      {
        name: 'radius',
        type: 'number',
        defaultVal: '10',
        description: 'Corner radius for branched curve arcs in pixels.',
      },
      {
        name: 'lineWidth',
        type: 'number',
        defaultVal: '1.5',
        description: 'SVG stroke thickness for branch lines.',
      },
      {
        name: 'fontSize',
        type: 'number',
        defaultVal: '14',
        description: 'Font size in pixels for navigation labels.',
      },
      {
        name: 'drawDuration',
        type: 'number',
        defaultVal: '400',
        description: 'Animation duration in milliseconds for the active line draw stroke.',
      },
      {
        name: 'foldDuration',
        type: 'number',
        defaultVal: '300',
        description: 'Accordion fold/unfold animation duration in milliseconds.',
      },
    ],
    themeTokens: ['--foreground', '--primary', '--border', '--surface-subtle'],
  },
{
    id: 'streaming-text',
    name: 'Streaming Text',
    category: 'Typography & Content',
    description:
      'Real-time token typewriter animation for LLM and assistant responses. Features configurable token pacing, pulsing cursor, click-to-skip, and status callbacks.',
    importCode: `import { StreamingText, useStreamingText } from 'es-react-components';`,
    usageCode: `<StreamingText
  text="Deploying neural weights to 14 distributed edge regions..."
  tokensPerSecond={22}
  label="AI generation"
  onDone={() => setSettled(true)}
/>

// Or hook:
const { visible, status, skip } = useStreamingText({ text, tokensPerSecond: 24 });`,
    props: [
      { name: 'text', type: 'string', defaultVal: "''", description: 'Full text response to stream.' },
      { name: 'tokensPerSecond', type: 'number', defaultVal: '20', description: 'Pacing speed for token generation.' },
      { name: 'onDone', type: '() => void', defaultVal: 'undefined', description: 'Fired when the entire text finishes streaming.' },
      { name: 'allowSkipOnClick', type: 'boolean', defaultVal: 'true', description: 'Instantly reveals full text when clicked.' },
    ],
    themeTokens: ['--foreground', '--primary', '--surface'],
  },
{
    id: 'command-palette',
    name: 'Command Palette',
    category: 'Navigation & Menus',
    description:
      'Spotlight-style fuzzy search command palette (⌘K) with real-time scoring, keyboard arrow navigation, shortcut badges, and overlay portal.',
    importCode: `import { CommandPalette, useCommandPalette } from 'es-react-components';`,
    usageCode: `<CommandPalette
  open={isOpen}
  onDismiss={() => setIsOpen(false)}
  onSelect={(item) => executeCommand(item)}
  items={[
    { id: 'deploy', label: 'Deploy to Production', shortcut: ['⌘', 'D'], hint: 'Rollout' },
    { id: 'settings', label: 'Open Workspace Settings', shortcut: ['⌘', ','] },
    { id: 'keys', label: 'Rotate API Keys' },
  ]}
/>`,
    props: [
      { name: 'open', type: 'boolean', defaultVal: 'undefined', description: 'When provided, renders as an overlay portal.' },
      { name: 'items', type: 'CommandItem[]', defaultVal: '[]', description: 'Selectable commands with label, hint, shortcut, and keywords.' },
      { name: 'onSelect', type: '(item: CommandItem) => void', defaultVal: 'undefined', description: 'Invoked when Enter is pressed or item clicked.' },
      { name: 'onDismiss', type: '() => void', defaultVal: 'undefined', description: 'Invoked on Escape or outside click.' },
    ],
    themeTokens: ['--surface-elevated', '--border', '--primary', '--foreground', '--radius'],
  },
{
    id: 'segmented-control',
    name: 'Segmented Control',
    category: 'Checkbox & Switch',
    description:
      'Spring-sliding radio group with text inversion mask effect, keyboard navigation (Arrow keys, Home, End), and theme token adaptation.',
    importCode: `import { SegmentedControl } from 'es-react-components';`,
    usageCode: `<SegmentedControl
  label="Time Horizon"
  options={[
    { value: 'day', label: '1 Day' },
    { value: 'week', label: '1 Week' },
    { value: 'month', label: '1 Month' },
    { value: 'year', label: '1 Year' },
  ]}
  value={horizon}
  onValueChange={setHorizon}
/>`,
    props: [
      { name: 'options', type: 'SegmentedOption[]', defaultVal: '[]', description: 'List of options with value, label, and optional disabled state.' },
      { name: 'label', type: 'string', defaultVal: "''", description: 'Accessible label for the radiogroup.' },
      { name: 'value', type: 'string', defaultVal: 'undefined', description: 'Controlled active value.' },
      { name: 'defaultValue', type: 'string', defaultVal: 'first option', description: 'Initial value for uncontrolled mode.' },
      { name: 'onValueChange', type: '(value: string) => void', defaultVal: 'undefined', description: 'Callback fired when an option is selected.' },
      { name: 'variant', type: "'primary' | 'surface'", defaultVal: "'primary'", description: 'Active thumb pill color theme.' },
    ],
    themeTokens: ['--primary', '--surface-subtle', '--border', '--radius'],
  },
{
    id: 'wizard-steps',
    name: 'Wizard Steps',
    category: 'Navigation & Menus',
    description:
      'Multi-step pipeline wizard featuring connected track progress bar, direction-aware sliding step panels, keyboard navigation, and completion state.',
    importCode: `import { WizardSteps, useWizard } from 'es-react-components';`,
    usageCode: `<WizardSteps
  steps={[
    { id: 'account', label: 'Account Details', content: <AccountForm /> },
    { id: 'billing', label: 'Payment Method', content: <BillingForm /> },
    { id: 'review', label: 'Review & Confirm', content: <ReviewPane /> },
  ]}
  onComplete={() => console.log('All steps completed!')}
/>`,
    props: [
      { name: 'steps', type: 'WizardStep[]', defaultVal: '[]', description: 'Steps array with id, label, and content element.' },
      { name: 'index', type: 'number', defaultVal: 'undefined', description: 'Controlled active step index.' },
      { name: 'defaultIndex', type: 'number', defaultVal: '0', description: 'Default step index.' },
      { name: 'onIndexChange', type: '(index: number, direction: 1 | -1) => void', defaultVal: 'undefined', description: 'Step index change callback.' },
      { name: 'onComplete', type: '() => void', defaultVal: 'undefined', description: 'Triggered when the final step advances.' },
      { name: 'complete', type: 'boolean', defaultVal: 'false', description: 'Whether the entire wizard is completed.' },
    ],
    themeTokens: ['--primary', '--surface-elevated', '--border', '--foreground', '--radius'],
  },
{
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation & Menus',
    description:
      'Compact smart pagination with spring-animated sliding pill thumb, rolling page number transitions, automatic boundary/sibling truncation, and screen-reader announcements.',
    importCode: `import { Pagination, usePagination, paginate } from 'es-react-components';`,
    usageCode: `<Pagination
  count={25}
  page={currentPage}
  onPageChange={setCurrentPage}
  siblings={1}
  boundaries={1}
/>`,
    props: [
      { name: 'count', type: 'number', defaultVal: '1', description: 'Total number of pages available.' },
      { name: 'page', type: 'number', defaultVal: 'undefined', description: 'Controlled current page (1-based).' },
      { name: 'defaultPage', type: 'number', defaultVal: '1', description: 'Initial page in uncontrolled mode.' },
      { name: 'siblings', type: 'number', defaultVal: '1', description: 'Number of page buttons to show adjacent to current page.' },
      { name: 'boundaries', type: 'number', defaultVal: '1', description: 'Number of page buttons to show at starts and ends.' },
      { name: 'onPageChange', type: '(page: number) => void', defaultVal: 'undefined', description: 'Callback fired when page is selected.' },
    ],
    themeTokens: ['--primary', '--surface-subtle', '--foreground', '--radius'],
  },
{
    id: 'scroll-spy',
    name: 'Scroll Spy',
    category: 'Scroll & Viewport',
    description:
      'On-page section tracker with spring-animated sliding pill thumb (layoutId), programmatic smooth scroll with lock suppression, horizontal chip auto-scroll, and ARIA announcements.',
    importCode: `import { ScrollSpy, useScrollSpy } from 'es-react-components';`,
    usageCode: `<ScrollSpy
  sections={[
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'security', label: 'Security' },
    { id: 'benchmarks', label: 'Benchmarks' },
  ]}
  root={containerRef}
  offset={96}
/>`,
    props: [
      { name: 'sections', type: 'ScrollSpySection[]', defaultVal: '[]', description: 'Target sections array with id and label.' },
      { name: 'offset', type: 'number', defaultVal: '96', description: 'Pixel offset from viewport top for active trigger threshold.' },
      { name: 'root', type: 'React.RefObject<HTMLElement | null>', defaultVal: 'undefined', description: 'Scroll container ref (defaults to window).' },
      { name: 'onChange', type: '(id: string) => void', defaultVal: 'undefined', description: 'Callback fired when active section changes.' },
      { name: 'label', type: 'string', defaultVal: "'On this page'", description: 'Accessible navigation landmark label.' },
    ],
    themeTokens: ['--primary', '--primary-foreground', '--surface-subtle', '--border', '--radius'],
  },
  {
    id: 'segmented-ab-tabs',
    name: 'Segmented A/B Tabs',
    category: 'Navigation & Menus',
    description:
      'High-contrast pill tabs with smooth spring layout physics, active pill halo ring outline, tactile click transitions, ARIA tablist/tab accessibility, and size variations (sm, md, lg).',
    importCode: `import { SegmentedABTabs } from 'es-react-components';`,
    usageCode: `<SegmentedABTabs
  options={['A', 'B']}
  defaultValue="A"
  onChange={(tab) => console.log('Selected:', tab)}
/>`,
    props: [
      { name: 'options', type: '[string, string] | string[]', defaultVal: "['A', 'B']", description: 'Array of tab labels or binary options.' },
      { name: 'value', type: 'string', defaultVal: 'undefined', description: 'Controlled active tab identifier.' },
      { name: 'defaultValue', type: 'string', defaultVal: "'A'", description: 'Uncontrolled initial selected tab.' },
      { name: 'onChange', type: '(tab: string) => void', defaultVal: 'undefined', description: 'Callback fired on tab change.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Visual sizing scale.' },
      { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables all tab selection actions.' },
    ],
    themeTokens: ['--primary', '--primary-foreground', '--surface-subtle', '--border', '--foreground'],
  }
];
