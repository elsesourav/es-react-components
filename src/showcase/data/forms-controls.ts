import type { ComponentDoc } from './types';

export const FORMS_CONTROLS_COMPONENTS: ComponentDoc[] = [
{
    id: 'select',
    name: 'Select',
    category: 'Forms',
    description:
      'Unified Select supporting both Native HTML5 options and Spring-Animated Dropdown with icons, hints, and sliding indicator pill.',
    importCode: `// Unified syntax:
import { Select } from 'es-react-components';

// Native HTML5 Select:
<Select
  label="Region"
  options={[
    { label: 'US East', value: 'us-east' },
    { label: 'Europe', value: 'eu-west' },
  ]}
/>

// Spring Animated Dropdown:
<Select
  variant="animated"
  label="Region"
  items={[
    { label: 'US East', value: 'us-east', hint: '14ms' },
    { label: 'Europe', value: 'eu-west', hint: '82ms' },
  ]}
/>`,
    usageCode: `<Select
  label="Deployment Region"
  variant="animated"
  items={[
    { value: 'us-east-1', label: 'US East (N. Virginia)', hint: '14ms' },
    { value: 'eu-central-1', label: 'Europe Central (Frankfurt)', hint: '82ms' },
  ]}
/>`,
    props: [
      {
        name: 'variant',
        type: `'native' | 'animated'`,
        defaultVal: `'native'`,
        description: 'Select between native browser popup or animated floating dropdown.',
      },
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Field label.',
      },
      {
        name: 'items / options',
        type: 'Array<{ label: string, value: string, hint?: string, icon?: React.ReactNode, disabled?: boolean }>',
        defaultVal: '[]',
        description: 'Selectable items list.',
      },
    ],
    themeTokens: ['--surface', '--surface-elevated', '--border', '--primary', '--radius'],
  },
{
    id: 'dropdown',
    name: 'Dropdown (Animated Select)',
    category: 'Forms',
    description:
      'Rich floating dropdown menu powered by motion/react spring physics. Features active sliding indicator pill, keyboard navigation (ArrowUp, ArrowDown, Enter, Esc), typeahead search, hints, and HSL theme tokens.',
    importCode: `import { Dropdown, useDropdown } from 'es-react-components';`,
    usageCode: `<Dropdown
  label="Region Selection"
  value={region}
  onChange={setRegion}
  items={[
    { value: 'us-east', label: 'US East (N. Virginia)', hint: '14ms' },
    { value: 'us-west', label: 'US West (Oregon)', hint: '38ms' },
    { value: 'eu-west', label: 'Europe (Frankfurt)', hint: '82ms' },
    { value: 'sa-east', label: 'South America (São Paulo)', disabled: true },
  ]}
/>`,
    props: [
      {
        name: 'items',
        type: 'DropdownItem[]',
        defaultVal: '[]',
        description: 'List of items with value, label, optional hint, icon, and disabled flag.',
      },
      {
        name: 'value / defaultValue',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Controlled or uncontrolled value string.',
      },
      {
        name: 'onChange',
        type: '(value: string) => void',
        defaultVal: 'undefined',
        description: 'Triggered when an item is selected.',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Expands trigger button to fill 100% of container width.',
      },
    ],
    themeTokens: [
      '--surface',
      '--surface-elevated',
      '--border',
      '--primary',
      '--radius',
    ],
  },
{
    id: 'switch',
    name: 'Switch',
    category: 'Forms',
    description:
      'Accessible toggle switch primitive with smooth sliding thumb and keyboard spacebar activation.',
    importCode: `import { Switch } from 'es-react-components';`,
    usageCode: `<Switch
  label="Realtime Streaming"
  description="Deliver WebSocket events to browser sessions."
  defaultChecked
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Primary setting title.',
      },
      {
        name: 'description',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Optional explanatory subtitle.',
      },
      {
        name: 'checked / defaultChecked',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Active state toggle.',
      },
    ],
    themeTokens: ['--primary', '--surface-sunken', '--border', '--surface-elevated'],
  },
{
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    description:
      'High-contrast accessible checkbox with custom SVG checkmark and title/description layout slots.',
    importCode: `import { Checkbox } from 'es-react-components';`,
    usageCode: `<Checkbox
  label="Automatic Daily Snapshots"
  description="Retains rolling 30-day backups."
  defaultChecked
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Checkbox text label.',
      },
      {
        name: 'description',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Supplementary explanation text.',
      },
    ],
    themeTokens: ['--primary', '--primary-foreground', '--border', '--radius-sm'],
  },
{
    id: 'peek-rating',
    name: 'Peek Rating (Interactive Star & Shape Rater)',
    category: 'Forms',
    description:
      'Fluid gesture-driven rating selector with spring hover elevation, floating value tooltip, haptic pop animation, and keyboard accessibility. Supports stars, hearts, bolts, and custom icons.',
    importCode: `import { PeekRating } from 'es-react-components';`,
    usageCode: `<PeekRating
  value={rating}
  onChange={setRating}
  count={5}
  shape="star"
  activeColor="#f5b400"
  idleColor="#52525b"
  tipColor="#27272a"
  tipTextColor="#f5f5f5"
  size={28}
  lift={6}
  magnify={1.15}
  riseDuration={320}
  popScale={1.3}
  showTip={true}
  allowClear={true}
/>`,
    props: [
      {
        name: 'value / defaultValue',
        type: 'number',
        defaultVal: '0',
        description: 'Controlled or uncontrolled active rating score (0 to count).',
      },
      {
        name: 'onChange',
        type: '(value: number) => void',
        defaultVal: 'undefined',
        description: 'Fired when a user selects a rating via click, drag, or keyboard.',
      },
      {
        name: 'onPreview',
        type: '(value: number | null) => void',
        defaultVal: 'undefined',
        description: 'Fired during pointer hovering/scrubbing before commit.',
      },
      {
        name: 'count',
        type: 'number',
        defaultVal: '5',
        description: 'Total rating units / icons displayed in the row.',
      },
      {
        name: 'shape',
        type: `'star' | 'heart' | 'bolt'`,
        defaultVal: `'star'`,
        description: 'Predefined glyph iconography preset.',
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        defaultVal: 'undefined',
        description: 'Custom icon element replacing default shapes.',
      },
      {
        name: 'labels',
        type: 'string[]',
        defaultVal: '[]',
        description: 'Descriptive text shown in the tooltip (e.g. ["Poor", "Fair", "Good", ...]).',
      },
      {
        name: 'activeColor',
        type: 'string',
        defaultVal: `'#f5b400'`,
        description: 'Color of filled / illuminated rating units.',
      },
      {
        name: 'idleColor',
        type: 'string',
        defaultVal: `'#52525b'`,
        description: 'Color of unfilled / inactive rating units.',
      },
      {
        name: 'tipColor',
        type: 'string',
        defaultVal: `'#27272a'`,
        description: 'Background color of the floating preview tooltip.',
      },
      {
        name: 'tipTextColor',
        type: 'string',
        defaultVal: `'#f5f5f5'`,
        description: 'Text color inside the floating preview tooltip.',
      },
      {
        name: 'size',
        type: 'number',
        defaultVal: '28',
        description: 'Icon diameter in pixels.',
      },
      {
        name: 'lift',
        type: 'number',
        defaultVal: '6',
        description: 'Vertical lift displacement in pixels on hover.',
      },
      {
        name: 'magnify',
        type: 'number',
        defaultVal: '1.15',
        description: 'Scale multiplier applied to hovered rating unit.',
      },
      {
        name: 'riseDuration',
        type: 'number',
        defaultVal: '320',
        description: 'Spring rise and tooltip translation transition duration in milliseconds.',
      },
      {
        name: 'popScale',
        type: 'number',
        defaultVal: '1.3',
        description: 'Keyframe pop bounce scale on selection commit.',
      },
      {
        name: 'showTip',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Displays sliding numerical or label tooltip above hovered unit.',
      },
      {
        name: 'allowClear',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Clicking the active score clears rating back to 0.',
      },
      {
        name: 'readOnly / disabled',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Disables user interactions and pointer gesture events.',
      },
    ],
    themeTokens: ['--warning', '--muted-foreground', '--surface-elevated', '--foreground'],
  },
{
    id: 'ai-prompt-bar',
    name: 'AI Prompt Bar',
    category: 'Forms',
    description:
      'Feature-packed AI input composer with @ mentions, / commands, model picker, voice dictation, file attachments, and local rainbow canvas sweep.',
    importCode: `import { AIPromptBar } from 'es-react-components';`,
    usageCode: `<AIPromptBar
  theme="dark"
  variant="Rounded"
  placeholder="Ask anything or type / for commands..."
  onSend={(text, details) => console.log('Sent prompt:', text, details)}
/>`,
    props: [
      {
        name: 'theme',
        type: `'light' | 'dark'`,
        defaultVal: `'dark'`,
        description: 'Light or dark theme mode.',
      },
      {
        name: 'variant',
        type: `'Rounded' | 'Pill'`,
        defaultVal: `'Rounded'`,
        description: 'Border radius styling for the prompt composer.',
      },
      {
        name: 'demo',
        type: 'boolean',
        defaultVal: 'true',
        description: 'Enables self-running autoplay tutorial on mount.',
      },
      {
        name: 'tall',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Hero expanded multi-line layout with separated control row.',
      },
      {
        name: 'onSend',
        type: '(text: string, details: { files: File[]; sources: any[]; model: any }) => void',
        defaultVal: 'undefined',
        description: 'Submit callback with message text, attachments, and model info.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--accent'],
  },
{
    id: 'ai-fine-tune-card',
    name: 'AI Fine-Tune Card',
    category: 'Forms',
    description:
      'Compact interactive parameter inspector with scrubbable number sliders (drag label ↔ or use arrow keys), segmented layout selector, and dropdown menu.',
    importCode: `import { AIFineTuneCard, FineTuneField } from 'es-react-components';`,
    usageCode: `<AIFineTuneCard
  theme="light"
  onChange={(state) => console.log('Parameters changed:', state)}
/>`,
    props: [
      {
        name: 'theme',
        type: `'light' | 'dark'`,
        defaultVal: `'light'`,
        description: 'Visual theme mode.',
      },
      {
        name: 'fields',
        type: 'FineTuneField[]',
        defaultVal: 'DEFAULT_FINE_TUNE_FIELDS',
        description: 'Array of scrubbable numeric properties.',
      },
      {
        name: 'options',
        type: 'string[]',
        defaultVal: `['Seasonal', 'Classic', 'Limited']`,
        description: 'Type selector dropdown options.',
      },
      {
        name: 'onChange',
        type: '(state: FineTuneState) => void',
        defaultVal: 'undefined',
        description: 'Callback emitted when any property or layout changes.',
      },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary'],
  }
];
