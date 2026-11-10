import type { ComponentDoc } from './types';

export const GENERAL_EXTRA_COMPONENTS: ComponentDoc[] = [
{
    id: 'split-flap-text',
    name: 'Split Flap Text (Mechanical Departure Board)',
    category: 'Typography & Content',
    description:
      'Retro mechanical split-flap ticker replicating vintage airport and train arrival boards. Features 3D split-tile flipping physics, cascading character staggering, specular glare reflections, custom charsets, and reduced-motion fallback.',
    importCode: `import { SplitFlapText } from 'es-react-components';`,
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
    id: 'interactive-controls',
    name: 'Interactive Micro-Controls',
    category: 'Buttons & Actions',
    description:
      'Suite of 11 interactive micro-components: ContextMenuEditDelete, QuestionTooltip, DownloadAnimatedIcons, PipModeIcons, SimplePlusMinusBtn, SegmentedABTabs, QuantityCounter, ListColumnToggle, FollowCheckButton, MenuDotsExpand, and CompactModeSwitch.',
    importCode: `import {
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
} from 'es-react-components';`,
    usageCode: `<div className="flex flex-wrap items-center gap-4">
  <ContextMenuEditDelete theme="dark" />
  <QuestionTooltip theme="dark" text="Helpful tooltip preview" />
  <DownloadAnimatedIcons theme="dark" />
  <PipModeIcons theme="dark" />
  <SimplePlusMinusBtn theme="dark" />
  <SegmentedABTabs theme="dark" />
  <QuantityCounter theme="dark" />
  <ListColumnToggle theme="dark" />
  <FollowCheckButton theme="dark" />
  <MenuDotsExpand theme="dark" />
  <CompactModeSwitch theme="dark" />
</div>`,
    props: [
      {
        name: 'theme',
        type: `'dark' | 'light'`,
        defaultVal: `'dark'`,
        description: 'Color theme styling for micro-controls.',
      },
      {
        name: 'onChange / onToggle / onClick',
        type: 'Function',
        defaultVal: 'undefined',
        description: 'Event callbacks specific to each interactive control.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--primary', '--border'],
  },
{
    id: 'text-reveal',
    name: 'Text Reveal',
    category: 'Typography & Content',
    description:
      'Staggered blur and fade text reveal animation by word or character with viewport scroll-triggering, duration pacing, and reduced motion fallbacks.',
    importCode: `import { TextReveal, useTextReveal } from 'es-react-components';`,
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
    importCode: `import { LogoMarquee, useLogoMarquee } from 'es-react-components';`,
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
  }
];
