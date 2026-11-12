import type { ComponentDoc } from './types';

export const SURFACES_EXTRA_COMPONENTS: ComponentDoc[] = [
{
    id: 'tree-view',
    name: 'Tree View',
    category: 'Navigation & Menus',
    description:
      'Hierarchical collapsible tree view with rotating spring carets, vertical connecting branch lines, and full WAI-ARIA keyboard navigation (Arrow keys, Home, End, and letter typeahead).',
    importCode: `import { TreeView, useTreeView } from 'es-react-components';`,
    usageCode: `<TreeView
  label="File Explorer"
  defaultExpanded={['src', 'components']}
  defaultSelected="button.tsx"
  nodes={[
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            { id: 'button.tsx', label: 'button.tsx', meta: '2.4kb' },
            { id: 'input.tsx', label: 'input.tsx', meta: '4.8kb' },
          ],
        },
        { id: 'App.tsx', label: 'App.tsx', meta: '1.2kb' },
      ],
    },
    { id: 'package.json', label: 'package.json', meta: '1.1kb' },
  ]}
/>`,
    props: [
      { name: 'nodes', type: 'TreeNode[]', defaultVal: '[]', description: 'Tree nodes hierarchy with id, label, optional meta, icon, and children.' },
      { name: 'label', type: 'string', defaultVal: "''", description: 'Accessible label for the treeview.' },
      { name: 'expanded', type: 'string[]', defaultVal: 'undefined', description: 'Controlled expanded folder ids.' },
      { name: 'defaultExpanded', type: 'string[]', defaultVal: '[]', description: 'Initially expanded folder ids.' },
      { name: 'selected', type: 'string | null', defaultVal: 'undefined', description: 'Controlled selected node id.' },
      { name: 'onSelectedChange', type: '(id: string) => void', defaultVal: 'undefined', description: 'Callback when node is selected.' },
    ],
    themeTokens: ['--primary', '--surface-elevated', '--border', '--foreground', '--radius'],
  },
{
    id: 'sticky-header',
    name: 'Sticky Header',
    category: 'Scroll & Viewport',
    description:
      'Scroll-condensing responsive header container featuring spring-interpolated title scaling, floating border elevation, leading/trailing action slots, and gradient bottom edge fading.',
    importCode: `import { StickyHeader, useCondense } from 'es-react-components';`,
    usageCode: `<StickyHeader
  title="Deployment Pipelines"
  subtitle="Production clusters in us-east-1 and eu-central-1"
  expandedHeight={68}
  compactHeight={48}
  maxHeight={320}
>
  <div className="p-4 space-y-4">
    {/* Scrollable list content */}
  </div>
</StickyHeader>`,
    props: [
      { name: 'title', type: 'string', defaultVal: "''", description: 'Main header title text.' },
      { name: 'subtitle', type: 'string', defaultVal: 'undefined', description: 'Secondary descriptive caption in expanded state.' },
      { name: 'leading', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Left prefix icon or badge slot.' },
      { name: 'actions', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Right action buttons container.' },
      { name: 'expandedHeight', type: 'number', defaultVal: '68', description: 'Header height in pixels when unscrolled.' },
      { name: 'compactHeight', type: 'number', defaultVal: '48', description: 'Header height in pixels when condensed.' },
      { name: 'maxHeight', type: 'number | string', defaultVal: '320', description: 'Scroll container max height constraint.' },
      { name: 'children', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Scrollable content area.' },
    ],
    themeTokens: ['--surface-elevated', '--border', '--foreground', '--muted-foreground', '--radius'],
  },
{
    id: 'hide-on-scroll',
    name: 'Hide On Scroll',
    category: 'Scroll & Viewport',
    description:
      'Dynamic sticky action bar that auto-collapses on downward scroll and reappears on upward scroll, with focus-within auto-pinning for keyboard accessibility.',
    importCode: `import { HideOnScroll, useHideOnScroll } from 'es-react-components';`,
    usageCode: `<HideOnScroll
  barHeight={44}
  hideAfter={14}
  revealAfter={10}
  bar={
    <div className="flex items-center justify-between w-full">
      <span className="font-semibold text-xs">Live Actions</span>
      <button className="px-2 py-1 bg-primary text-white rounded text-xs">Deploy</button>
    </div>
  }
>
  <div className="p-4 space-y-4">
    {/* Scrollable feed content */}
  </div>
</HideOnScroll>`,
    props: [
      { name: 'bar', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Content rendered inside the collapsable sticky bar.' },
      { name: 'children', type: 'React.ReactNode', defaultVal: 'undefined', description: 'Scrollable content inside container.' },
      { name: 'barHeight', type: 'number', defaultVal: '44', description: 'Height of sticky bar in pixels.' },
      { name: 'hideAfter', type: 'number', defaultVal: '14', description: 'Pixels of downward scroll travel before hiding.' },
      { name: 'revealAfter', type: 'number', defaultVal: '10', description: 'Pixels of upward scroll travel before revealing.' },
      { name: 'topGuard', type: 'number', defaultVal: '24', description: 'Threshold at top where bar remains permanently visible.' },
      { name: 'pinned', type: 'boolean', defaultVal: 'false', description: 'Forces bar to stay visible regardless of scroll.' },
      { name: 'maxHeight', type: 'number | string', defaultVal: '320', description: 'Max height of scroll container.' },
    ],
    themeTokens: ['--surface-elevated', '--border', '--primary', '--foreground', '--radius'],
  },
{
    id: 'filter-grid',
    name: 'Filter Grid',
    category: 'Surfaces & Cards',
    description:
      'Animated categorical item filtering grid with popLayout transitions, dynamic item count badges, radiogroup chip navigation, and responsive multi-column layouts.',
    importCode: `import { FilterGrid, useFilterGrid } from 'es-react-components';`,
    usageCode: `<FilterGrid
  label="Resource Types"
  items={items}
  filters={[
    { id: 'all', label: 'All', match: () => true },
    { id: 'api', label: 'APIs', match: (item) => item.type === 'api' },
    { id: 'db', label: 'Databases', match: (item) => item.type === 'db' },
  ]}
  getKey={(item) => item.id}
  renderItem={(item) => <div>{item.name}</div>}
/>`,
    props: [
      { name: 'items', type: 'readonly T[]', defaultVal: '[]', description: 'Full dataset collection to filter.' },
      { name: 'filters', type: 'FilterDefinition<T>[]', defaultVal: '[]', description: 'Filter predicates with id, label, and match callback.' },
      { name: 'getKey', type: '(item: T) => string', defaultVal: 'undefined', description: 'Unique identifier generator per item.' },
      { name: 'renderItem', type: '(item: T) => ReactNode', defaultVal: 'undefined', description: 'Item card renderer.' },
      { name: 'columns', type: 'number', defaultVal: '3', description: 'Grid column count.' },
      { name: 'rowHeight', type: 'number', defaultVal: '72', description: 'Height of each grid row in pixels.' },
    ],
    themeTokens: ['--primary', '--border', '--surface-elevated', '--radius'],
  },
{
    id: 'reorder-list',
    name: 'Reorder List',
    category: 'Surfaces & Cards',
    description:
      'Smooth physics-driven drag-and-drop sortable list with complete keyboard accessibility (Space to grab/drop, ArrowUp/Down to move, Escape to revert) and live screen reader feedback.',
    importCode: `import { ReorderList, useReorderList } from 'es-react-components';`,
    usageCode: `<ReorderList
  label="Deployment Priorities"
  items={items}
  getId={(item) => item.id}
  getLabel={(item) => item.title}
  onReorder={setItems}
>
  {(item) => <div>{item.title}</div>}
</ReorderList>`,
    props: [
      { name: 'items', type: 'readonly T[]', defaultVal: '[]', description: 'Collection of reorderable records.' },
      { name: 'getId', type: '(item: T) => string', defaultVal: 'undefined', description: 'Item key resolver.' },
      { name: 'getLabel', type: '(item: T) => string', defaultVal: 'undefined', description: 'Accessibility label resolver for ARIA announcements.' },
      { name: 'onReorder', type: '(next: T[]) => void', defaultVal: 'undefined', description: 'Callback when list order changes during drag or key press.' },
      { name: 'onCommit', type: '(next: T[]) => void', defaultVal: 'undefined', description: 'Fired when drag finishes or item is dropped.' },
    ],
    themeTokens: ['--primary', '--border', '--surface-elevated', '--foreground', '--radius'],
  },
{
    id: 'lightbox',
    name: 'Lightbox',
    category: 'Feedback & Overlays',
    description:
      'Zoomable modal image inspector with origin-element morph transitions, wheel zoom toward cursor, drag panning with velocity bounds, keyboard shortcuts (+, -, 0, Escape), and portal overlay.',
    importCode: `import { Lightbox, useLightbox } from 'es-react-components';`,
    usageCode: `<button ref={thumbnailRef} onClick={() => setOpen(true)}>
  <img src="/sample.jpg" alt="Preview" className="rounded" />
</button>

<Lightbox
  open={open}
  onClose={() => setOpen(false)}
  originRef={thumbnailRef}
  src="/sample-hd.jpg"
  alt="High Definition Architecture"
  caption="Global Edge Distribution Architecture (4K Preview)"
/>`,
    props: [
      { name: 'open', type: 'boolean', defaultVal: 'false', description: 'Visibility state.' },
      { name: 'onClose', type: '() => void', defaultVal: 'undefined', description: 'Callback fired on close or outside click.' },
      { name: 'src', type: 'string', defaultVal: "''", description: 'Full image URL.' },
      { name: 'alt', type: 'string', defaultVal: "''", description: 'Accessible image description.' },
      { name: 'originRef', type: 'RefObject<HTMLElement>', defaultVal: 'undefined', description: 'Thumbnail element ref for morph zoom transition.' },
      { name: 'maxScale', type: 'number', defaultVal: '4', description: 'Maximum zoom level multiplier.' },
    ],
    themeTokens: ['--background', '--surface-elevated', '--border', '--foreground', '--radius'],
  },
{
    id: 'blur-up-image',
    name: 'Blur-Up Image',
    category: 'Surfaces & Cards',
    description:
      'Progressive image loading component with blurred low-res placeholder, async decode detection, smooth spring unblur reveal, and fallback handling.',
    importCode: `import { BlurUpImage, useBlurUpImage } from 'es-react-components';`,
    usageCode: `<BlurUpImage
  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200"
  placeholder="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=32"
  alt="Gradient mesh artwork"
  width={16}
  height={9}
/>`,
    props: [
      { name: 'src', type: 'string', defaultVal: 'undefined', description: 'Full-resolution image source URL.' },
      { name: 'placeholder', type: 'string', defaultVal: 'undefined', description: 'Low-resolution thumbnail or data URI placeholder.' },
      { name: 'alt', type: 'string', defaultVal: "''", description: 'Accessible image alternative description.' },
      { name: 'width', type: 'number', defaultVal: 'required', description: 'Aspect ratio width component.' },
      { name: 'height', type: 'number', defaultVal: 'required', description: 'Aspect ratio height component.' },
      { name: 'blur', type: 'number', defaultVal: '14', description: 'Initial Gaussian blur radius in pixels.' },
      { name: 'loading', type: "'lazy' | 'eager'", defaultVal: "'lazy'", description: 'HTML image loading attribute.' },
    ],
    themeTokens: ['--surface-subtle', '--border', '--surface', '--radius'],
  },
{
    id: 'show-more',
    name: 'Show More',
    category: 'Surfaces & Cards',
    description:
      'Smooth collapsible content disclosure with dynamic line-height calculation, spring height transitions, gradient fade veil, and full ARIA keyboard control.',
    importCode: `import { ShowMore, useShowMore } from 'es-react-components';`,
    usageCode: `<ShowMore lines={3} maxHeight={320} moreLabel="Show more" lessLabel="Show less">
  <p>Long paragraph or complex dashboard text content...</p>
</ShowMore>`,
    props: [
      { name: 'children', type: 'ReactNode', defaultVal: 'required', description: 'Content to clamp and disclose.' },
      { name: 'lines', type: 'number', defaultVal: '3', description: 'Number of text lines shown in collapsed state.' },
      { name: 'maxHeight', type: 'number', defaultVal: '320', description: 'Maximum height ceiling in expanded state before scrolling.' },
      { name: 'defaultExpanded', type: 'boolean', defaultVal: 'false', description: 'Initial expanded state.' },
      { name: 'moreLabel', type: 'string', defaultVal: "'Show more'", description: 'Button label when collapsed.' },
      { name: 'lessLabel', type: 'string', defaultVal: "'Show less'", description: 'Button label when expanded.' },
      { name: 'onExpandedChange', type: '(expanded: boolean) => void', defaultVal: 'undefined', description: 'State change callback.' },
    ],
    themeTokens: ['--foreground', '--surface', '--border', '--primary', '--radius'],
  },
  {
    id: 'leaderboard-table',
    name: 'Leaderboard Table (Arcade Ranking)',
    category: 'Surfaces & Cards',
    description:
      'Breakout Ball inspired competitive arcade high-score ranking table with golden trophy header, podium crown/medal badges (#1, #2, #3), completion stopwatch times, live search filtering, column sort toggling, and current-user row illumination.',
    importCode: `import { LeaderboardTable } from 'es-react-components';`,
    usageCode: `<LeaderboardTable
  title="Players Ranking"
  subtitle="Global Breakout Ball Leaderboard"
  searchable
  highlightPodium
  maxRows={8}
  onSelectPlayer={(player) => console.log('Selected player:', player)}
/>`,
    props: [
      { name: 'title', type: 'string', defaultVal: "'Players Ranking'", description: 'Header title text with trophy icon.' },
      { name: 'subtitle', type: 'string', defaultVal: "'Global Breakout Ball Leaderboard'", description: 'Subtext displayed below the title.' },
      { name: 'items', type: 'LeaderboardItem[]', defaultVal: 'DEFAULT_PLAYERS', description: 'Array of player ranking items.' },
      { name: 'currentUserId', type: 'string', defaultVal: 'undefined', description: 'ID of player to highlight with glowing "YOU" badge.' },
      { name: 'searchable', type: 'boolean', defaultVal: 'true', description: 'Renders player search input filter in the table header.' },
      { name: 'highlightPodium', type: 'boolean', defaultVal: 'true', description: 'Enables gold, silver, and bronze medal badges for top 3.' },
      { name: 'maxRows', type: 'number', defaultVal: '8', description: 'Maximum visible rows before scrolling.' },
      { name: 'onSelectPlayer', type: '(player: LeaderboardItem) => void', defaultVal: 'undefined', description: 'Callback fired when a player row is clicked.' },
    ],
    themeTokens: ['--surface', '--surface-elevated', '--border', '--foreground', '--primary'],
  }
];
