import type { ComponentDoc } from './types';

export const GENERAL_EXTRA_COMPONENTS: ComponentDoc[] = [
{
    id: 'split-flap-text',
    name: 'Split Flap Text',
    category: 'Typography & Content',
    description:
      'Retro mechanical split-flap ticker replicating airport and train arrival boards. Features 3D split-tile flipping physics, cascading character staggering, specular glare reflections, custom charsets, and reduced-motion fallback.',
    importCode: `import { SplitFlapText } from '@elsesourav/react-ui';`,
    usageCode: `<SplitFlapText
  words={["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"]}
  flipDuration={0.12}
  stagger={0.06}
  cycleDelay={2400}
  charset="alphanumeric"
  flipsPerChar={8}
  order="left"
  align="left"
  tileStyle="board"
  tileColor="#111827"
  textColor="#f8fafc"
  glare={0}
  depth={0.5}
  tileRadius={8}
  gap={6}
  fontSize={52}
  loop
  padTo={12}
  intro
/>`,
    props: [
      {
        name: 'words',
        type: 'string[]',
        defaultVal: `['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']`,
        description: 'List of phrases to cycle through with mechanical flip transitions.',
      },
      {
        name: 'flipDuration',
        type: 'number',
        defaultVal: '0.12',
        description: 'Single tile half-flip duration in seconds.',
      },
      {
        name: 'stagger',
        type: 'number',
        defaultVal: '0.06',
        description: 'Delay interval between adjacent character flip starts.',
      },
      {
        name: 'cycleDelay',
        type: 'number',
        defaultVal: '2400',
        description: 'Hold duration in milliseconds before switching to the next word.',
      },
      {
        name: 'charset',
        type: `'alphanumeric' | 'alpha' | 'numeric' | string`,
        defaultVal: `'alphanumeric'`,
        description: 'Pool of characters cycled during intermediary flipping states.',
      },
      {
        name: 'flipsPerChar',
        type: 'number',
        defaultVal: '8',
        description: 'Number of random intermediary character flips before settling.',
      },
      {
        name: 'order',
        type: `'left' | 'right' | 'center' | 'random'`,
        defaultVal: `'left'`,
        description: 'Cascade direction or order across character slots.',
      },
      {
        name: 'align',
        type: `'left' | 'center' | 'right'`,
        defaultVal: `'left'`,
        description: 'Text alignment within padded character slots.',
      },
      {
        name: 'tileStyle',
        type: `'board' | 'minimal'`,
        defaultVal: `'board'`,
        description: 'Physical departure board with bevels/hinges or flat minimal typography.',
      },
      {
        name: 'tileColor',
        type: 'string',
        defaultVal: `'#111827'`,
        description: 'Split tile surface background color (supports CSS variables).',
      },
      {
        name: 'textColor',
        type: 'string',
        defaultVal: `'#f8fafc'`,
        description: 'Embossed glyph character color.',
      },
      {
        name: 'glare',
        type: 'number',
        defaultVal: '0',
        description: 'Specular lighting gloss reflection intensity (0 to 1).',
      },
      {
        name: 'depth',
        type: 'number',
        defaultVal: '0.5',
        description: 'Physical bevel depth, hinge shade, and drop shadow factor (0 to 1).',
      },
      {
        name: 'tileRadius',
        type: 'number | string',
        defaultVal: '8',
        description: 'Border radius of individual split tiles in pixels.',
      },
      {
        name: 'gap',
        type: 'number | string',
        defaultVal: '6',
        description: 'Spacing between adjacent character tiles in pixels.',
      },
      {
        name: 'fontSize',
        type: 'number | string',
        defaultVal: '52',
        description: 'Base font size in pixels determining tile dimensions.',
      },
      {
        name: 'loop',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Continuously loops through the word list indefinitely.',
      },
      {
        name: 'padTo',
        type: 'number',
        defaultVal: '12',
        description: 'Minimum tile column slot count, padded with blank split tiles.',
      },
      {
        name: 'intro',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Begins with blank tiles and flips in the initial word on mount.',
      },
    ],
    themeTokens: ['--surface-elevated', '--foreground', '--border', '--radius-md'],
  },
{
    id: 'markdown-editor',
    name: 'Markdown Editor',
    category: 'Typography & Content',
    description:
      'Universal Markdown editor and live preview with KaTeX LaTeX math support ($E=mc^2$ and $$\\int f(x)dx$$), split view, GitHub alerts, code blocks, task lists, and theme token styling.',
    importCode: `import { MarkdownEditor, MarkdownRenderer } from '@elsesourav/react-ui';`,
    usageCode: `<MarkdownEditor
  label="Article Draft"
  mode="split"
  defaultValue="# Deep Learning Physics\\n\\nHere is the relativistic energy equation:\\n\\n$$E^2 = (mc^2)^2 + (pc)^2$$\\n\\nAnd Schrödinger equation:\\n\\n$$i\\\\hbar\\\\frac{\\\\partial}{\\\\partial t}\\\\Psi = \\\\hat{H}\\\\Psi$$\\n\\n> [!TIP]\\n> Full KaTeX LaTeX math formulas render seamlessly!"
  onChange={(val) => console.log('Markdown:', val)}
/>`,
    props: [
      {
        name: 'value / defaultValue',
        type: 'string',
        defaultVal: "''",
        description: 'Controlled or uncontrolled markdown text string.',
      },
      {
        name: 'mode / defaultMode',
        type: `'write' | 'preview' | 'split'`,
        defaultVal: `'split'`,
        description: 'Active layout view presentation mode.',
      },
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Header label above editor.',
      },
      {
        name: 'placeholder',
        type: 'string',
        defaultVal: "'Write markdown with headers, code blocks...'",
        description: 'Textarea input placeholder.',
      },
      {
        name: 'rows / minHeight',
        type: 'number | string',
        defaultVal: '14 / "360px"',
        description: 'Editor panel dimensions.',
      },
      {
        name: 'showToolbar',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Displays formatting quick-action toolbar.',
      },
      {
        name: 'showWordCount',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Displays live word, character, and estimated reading time counts.',
      },
      {
        name: 'onChange',
        type: '(val: string) => void',
        defaultVal: 'undefined',
        description: 'Callback invoked on content change.',
      },
    ],
    themeTokens: ['--surface', '--surface-subtle', '--border', '--primary', '--foreground'],
  },
{
    id: 'text-reveal',
    name: 'Text Reveal',
    category: 'Typography & Content',
    description:
      'Staggered blur and fade text reveal animation by word or character with viewport scroll-triggering, duration pacing, and reduced motion fallbacks.',
    importCode: `import { TextReveal, useTextReveal } from '@elsesourav/react-ui';`,
    usageCode: `<TextReveal
  text="Deploy globally distributed edge functions with zero cold starts."
  by="word"
  stagger={0.05}
  className="text-2xl font-bold"
/>`,
    props: [
      { name: 'text', type: 'string', defaultVal: "''", description: 'Text content to split and animate.' },
      { name: 'by', type: "'word' | 'character'", defaultVal: "'word'", description: 'Splitting strategy.' },
      { name: 'stagger', type: 'number', defaultVal: '0.055', description: 'Stagger delay between adjacent units in seconds.' },
      { name: 'maxDuration', type: 'number', defaultVal: '1.6', description: 'Upper ceiling on total reveal duration in seconds.' },
      { name: 'startOnView', type: 'boolean', defaultVal: 'true', description: 'Trigger animation when element scrolls into view.' },
      { name: 'play', type: 'boolean', defaultVal: 'true', description: 'Allows manual play/pause triggering.' },
      { name: 'once', type: 'boolean', defaultVal: 'true', description: 'Only trigger once when scrolling into view.' },
    ],
    themeTokens: ['--foreground', '--muted-foreground'],
  },
{
    id: 'logo-marquee',
    name: 'Logo Marquee',
    category: 'Surfaces & Cards',
    description:
      'Hardware-accelerated continuous ticker carousel with smooth momentum decay, keyboard tab navigation, pause on hover/interaction, and adaptive multi-copy filling.',
    importCode: `import { LogoMarquee, useLogoMarquee } from '@elsesourav/react-ui';`,
    usageCode: `<LogoMarquee
  items={[
    { id: '1', label: 'React' },
    { id: '2', label: 'Next.js' },
    { id: '3', label: 'Tailwind' },
    { id: '4', label: 'TypeScript' },
  ]}
  speed={44}
  direction="left"
/>`,
    props: [
      { name: 'items', type: 'LogoMarqueeItem[]', defaultVal: '[]', description: 'Array of brand or logo records.' },
      { name: 'speed', type: 'number', defaultVal: '44', description: 'Scrolling speed in pixels per second.' },
      { name: 'direction', type: "'left' | 'right'", defaultVal: "'left'", description: 'Ticker scroll direction.' },
      { name: 'gap', type: 'number', defaultVal: '40', description: 'Gap spacing between logo items in pixels.' },
      { name: 'paused', type: 'boolean', defaultVal: 'false', description: 'Whether ticker scrolling is paused.' },
      { name: 'onSelect', type: '(item: LogoMarqueeItem) => void', defaultVal: 'undefined', description: 'Click/selection callback.' },
    ],
    themeTokens: ['--surface', '--border', '--foreground', '--muted-foreground', '--primary', '--radius'],
  },
  {
    id: 'markdown-renderer',
    name: 'Markdown Renderer',
    category: 'Typography & Content',
    description:
      'Optical markdown engine with full GitHub-flavored spec support, KaTeX client-side mathematical typesetting ($inline$ and $$block$$), fenced code syntax highlighting with copy-to-clipboard, callout alerts, tables, and auto-generated outline navigation.',
    importCode: `import { MarkdownRenderer } from '@elsesourav/react-ui';`,
    usageCode: `<MarkdownRenderer
  content="# Quantum Mechanics\\n\\nEuler: $e^{i\\pi} + 1 = 0$\\n\\n> [!NOTE]\\n> Pure client-side parsing."
  showTableOfContents
/>`,
    props: [
      { name: 'content', type: 'string', defaultVal: "''", description: 'Markdown string with inline or block LaTeX KaTeX equations.' },
      { name: 'className', type: 'string', defaultVal: "''", description: 'Custom CSS container classes.' },
      { name: 'showTableOfContents', type: 'boolean', defaultVal: 'false', description: 'Renders an interactive floating document outline sidebar.' },
    ],
    themeTokens: ['--surface', '--border', '--foreground', '--muted-foreground', '--primary', '--radius'],
  }
];
