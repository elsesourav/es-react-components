import type { ComponentDoc } from './types';

export const GENERAL_COMPONENTS: ComponentDoc[] = [
{
    id: 'button',
    name: 'Button',
    category: 'Buttons & Actions',
    description:
      'Interactive button primitive supporting 7 semantic variants, 5 sizes, loading spinners, and icon slots.',
    importCode: `import { Button } from 'es-react-components';`,
    usageCode: `<Button variant="primary" size="md" onClick={() => console.log('Clicked!')}>
  Get Started
</Button>

<Button variant="outline" size="sm" isLoading>
  Deploying...
</Button>`,
    props: [
      {
        name: 'variant',
        type: `'primary' | 'secondary' | 'outline' | 'subtle' | 'ghost' | 'danger' | 'success'`,
        defaultVal: `'primary'`,
        description: 'Visual appearance variant mapped to HSL design tokens.',
      },
      {
        name: 'size',
        type: `'xs' | 'sm' | 'md' | 'lg' | 'icon'`,
        defaultVal: `'md'`,
        description: 'Dimension scale and padding.',
      },
      {
        name: 'isLoading',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Displays an animated spinner and disables pointer events.',
      },
      {
        name: 'leftIcon',
        type: 'React.ReactNode',
        defaultVal: 'undefined',
        description: 'Optional leading icon element.',
      },
      {
        name: 'rightIcon',
        type: 'React.ReactNode',
        defaultVal: 'undefined',
        description: 'Optional trailing icon element.',
      },
    ],
    themeTokens: [
      '--primary',
      '--primary-foreground',
      '--radius',
      '--border',
      '--surface',
    ],
  },
{
    id: 'badge',
    name: 'Badge',
    category: 'Typography & Content',
    description:
      'Compact status indicator pill with optional pulsing presence dot and 8 semantic variants.',
    importCode: `import { Badge } from 'es-react-components';`,
    usageCode: `<Badge variant="primary" dot size="md">
  Production v2.4
</Badge>

<Badge variant="success" size="sm">
  Operational
</Badge>`,
    props: [
      {
        name: 'variant',
        type: `'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'info'`,
        defaultVal: `'default'`,
        description: 'Color scheme styling.',
      },
      {
        name: 'size',
        type: `'sm' | 'md' | 'lg'`,
        defaultVal: `'md'`,
        description: 'Height and typography scale.',
      },
      {
        name: 'dot',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Renders a circular status dot preceding the label.',
      },
    ],
    themeTokens: ['--primary', '--success', '--warning', '--destructive', '--radius'],
  },
{
    id: 'avatar',
    name: 'Avatar',
    category: 'Surfaces & Cards',
    description:
      'Profile image representation with automatic fallback initials and online/offline status ring indicators.',
    importCode: `import { Avatar } from 'es-react-components';`,
    usageCode: `<Avatar
  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
  fallback="SC"
  status="online"
  size="lg"
/>`,
    props: [
      {
        name: 'src',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Image URL source.',
      },
      {
        name: 'fallback',
        type: 'string',
        defaultVal: "''",
        description: 'Initials displayed if image fails to load or is omitted.',
      },
      {
        name: 'size',
        type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
        defaultVal: `'md'`,
        description: 'Pixel diameter.',
      },
      {
        name: 'status',
        type: `'online' | 'offline' | 'busy' | 'away'`,
        defaultVal: 'undefined',
        description: 'Presence indicator badge on avatar perimeter.',
      },
    ],
    themeTokens: ['--surface-elevated', '--border', '--success', '--primary'],
  },
{
    id: 'text-loop',
    name: 'Text Loop (Curved Ribbon Marquee)',
    category: 'Typography & Content',
    description:
      'Continuous SVG text marquee scrolling along customizable wave, circle, infinity, arch, or line paths. Features ribbon bands, intersecting cross-ribbons, inertia drag gestures, scroll velocity boosts, and edge fade gradients.',
    importCode: `import { TextLoop } from 'es-react-components';`,
    usageCode: `<TextLoop
  text="React ✦ Bits"
  shape="wave"
  speed={90}
  direction="forward"
  separator="✦"
  curviness={90}
  tilt={0}
  fontSize={46}
  fontWeight={800}
  letterSpacing={2}
  uppercase
  ribbon
  ribbonColor="#5227FF"
  ribbonWidth={86}
  edgeFade={0}
  cross={false}
  crossAngle={16}
  draggable={false}
  scrollBoost={0}
  outline={false}
  pauseOnHover
  outlineWidth={1.5}
/>`,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultVal: `'React ✦ Bits'`,
        description: 'Text string displayed and looped along the path.',
      },
      {
        name: 'shape',
        type: `'wave' | 'circle' | 'infinity' | 'arch' | 'line'`,
        defaultVal: `'wave'`,
        description: 'Geometric SVG guide path for the repeating text.',
      },
      {
        name: 'speed',
        type: 'number',
        defaultVal: '90',
        description: 'Scrolling animation speed in pixels per second.',
      },
      {
        name: 'direction',
        type: `'forward' | 'reverse'`,
        defaultVal: `'forward'`,
        description: 'Movement flow direction along the path.',
      },
      {
        name: 'separator',
        type: 'string',
        defaultVal: `'✦'`,
        description: 'Separator glyph placed between repeating text iterations.',
      },
      {
        name: 'curviness',
        type: 'number',
        defaultVal: '90',
        description: 'Amplitude or radius intensity of the wave/curve path.',
      },
      {
        name: 'tilt',
        type: 'number',
        defaultVal: '0',
        description: 'Rotation tilt angle in degrees.',
      },
      {
        name: 'fontSize',
        type: 'number',
        defaultVal: '46',
        description: 'Text font size in pixels.',
      },
      {
        name: 'fontWeight',
        type: 'number | string',
        defaultVal: '800',
        description: 'Font weight specification.',
      },
      {
        name: 'letterSpacing',
        type: 'number',
        defaultVal: '2',
        description: 'Character tracking space in pixels.',
      },
      {
        name: 'uppercase',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Transforms string to uppercase.',
      },
      {
        name: 'ribbon',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Renders a solid colored background tape behind text.',
      },
      {
        name: 'ribbonColor',
        type: 'string',
        defaultVal: `'#5227FF'`,
        description: 'Background fill color for the ribbon band.',
      },
      {
        name: 'ribbonWidth',
        type: 'number',
        defaultVal: '86',
        description: 'Thickness / height of the ribbon band.',
      },
      {
        name: 'edgeFade',
        type: 'number',
        defaultVal: '0',
        description: 'Vignette gradient opacity mask at SVG edges (0 to 1).',
      },
      {
        name: 'cross',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Renders an intersecting counter-looping ribbon ribbon.',
      },
      {
        name: 'crossAngle',
        type: 'number',
        defaultVal: '16',
        description: 'Angular divergence between intersecting ribbons in degrees.',
      },
      {
        name: 'draggable',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Enables pointer dragging with momentum and inertial fling.',
      },
      {
        name: 'scrollBoost',
        type: 'number',
        defaultVal: '0',
        description: 'Accelerates speed dynamically proportional to page scroll velocity.',
      },
      {
        name: 'outline',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Outlines text with transparent interior fill.',
      },
      {
        name: 'pauseOnHover',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Smoothly decelerates loop to a halt on pointer hover.',
      },
      {
        name: 'outlineWidth',
        type: 'number',
        defaultVal: '1.5',
        description: 'Stroke thickness for outlined text.',
      },
    ],
    themeTokens: ['--primary', '--primary-foreground', '--foreground', '--border'],
  },
  {
    id: 'search-button',
    name: 'Top Search & Animated Placeholder',
    category: 'Buttons & Actions',
    description:
      'Theme-driven top navigation search trigger button with embedded spring-animated vertical text placeholder carousel, contextual breadcrumb scopes, global Cmd+K / Ctrl+K / "/" keyboard shortcut listeners, and pill/rounded styling variants.',
    importCode: `import { SearchButton, AnimatedSearchPlaceholder } from 'es-react-components';`,
    usageCode: `<SearchButton
  onClick={() => setOpen(true)}
  prefix="Search "
  words={["components", "buttons & inputs", "sliders & range", "charts"]}
  sectionLabel="Components >"
  shortcutText="⌘ K"
  size="md"
  variant="pill"
/>`,
    props: [
      { name: 'onClick', type: '() => void', defaultVal: 'undefined', description: 'Callback invoked when search button is clicked or activated by shortcut.' },
      { name: 'prefix', type: 'string', defaultVal: "'Search '", description: 'Fixed leading text prefix before rotating words.' },
      { name: 'words', type: 'string[]', defaultVal: 'undefined', description: 'Array of rotating suffix words animated vertically with spring physics.' },
      { name: 'interval', type: 'number', defaultVal: '2400', description: 'Hold duration in milliseconds before cycling to the next word.' },
      { name: 'shortcutText', type: 'string', defaultVal: "'⌘ K'", description: 'Keyboard shortcut pill label shown on the right.' },
      { name: 'sectionLabel', type: 'string', defaultVal: 'undefined', description: 'Optional contextual section or breadcrumb tag (e.g. "Components >").' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Visual button sizing scale.' },
      { name: 'variant', type: "'pill' | 'rounded'", defaultVal: "'pill'", description: 'Border radius shape: pill (rounded-full) or rounded (rounded-xl).' },
      { name: 'enableGlobalShortcut', type: 'boolean', defaultVal: 'true', description: 'Enables global Cmd+K, Ctrl+K, and "/" keyboard listeners.' },
      { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables button interactions.' },
    ],
    themeTokens: ['--surface', '--border', '--foreground', '--muted-foreground', '--primary', '--surface-subtle'],
  },
  {
    id: 'arcade-button',
    name: 'Arcade Button (Glossy Candy 3D)',
    category: 'Buttons & Actions',
    description:
      'Lustrous 3D jelly/arcade push button inspired by Breakout Ball. Features specular top lens reflection, animated sweeping light beam, spring press physics recoil, tactile sound-ready click feel, and rich color themes.',
    importCode: `import { ArcadeButton } from 'es-react-components';`,
    usageCode: `<ArcadeButton
  variant="candy-pink"
  size="lg"
  shape="pill"
  shine
  glow
  onClick={() => console.log('START clicked!')}
>
  START
</ArcadeButton>`,
    props: [
      { name: 'variant', type: "'candy-pink' | 'arcade-magenta' | 'neon-cyan' | 'arcade-green' | 'cyber-purple' | 'amber-gold' | 'retro-silver'", defaultVal: "'candy-pink'", description: 'Color gradient and ambient glow hue styling.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultVal: "'md'", description: 'Sizing scale with proportional typography and padding.' },
      { name: 'shape', type: "'pill' | 'rounded' | 'square'", defaultVal: "'pill'", description: 'Border curvature geometry.' },
      { name: 'shine', type: 'boolean', defaultVal: 'true', description: 'Enables diagonal sweeping light shine highlight ray.' },
      { name: 'glow', type: 'boolean', defaultVal: 'true', description: 'Displays an ambient colored backdrop neon glow.' },
      { name: 'isLoading', type: 'boolean', defaultVal: 'false', description: 'Renders loading spinner state and inhibits clicks.' },
      { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables button interaction and dims opacity.' },
    ],
    themeTokens: ['--primary', '--foreground', '--surface', '--border'],
  }
];
