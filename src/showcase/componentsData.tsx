export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultVal: string;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  category: 'General' | 'Forms' | 'Surfaces & Layout' | 'Feedback' | 'Navigation' | 'AI & Agentic UX';
  description: string;
  importCode: string;
  usageCode: string;
  props: ComponentPropDoc[];
  themeTokens: string[];
}

export const COMPONENTS_DATA: ComponentDoc[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'General',
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
    category: 'General',
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
    category: 'General',
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
    id: 'input',
    name: 'Input (All Variants)',
    category: 'Forms',
    description:
      'Universal Form Input component supporting all standard & advanced variants: standard, floating, inline-validation, password-strength, otp, tag, and expanding-search.',
    importCode: `// Unified Component syntax:
import { Input } from 'es-react-components';

// Or dedicated individual imports:
import {
  FloatingLabelInput,
  InlineValidation,
  PasswordInput,
  OtpInput,
  TagInput,
  ExpandingSearch,
} from 'es-react-components';`,
    usageCode: `// 1. Unified syntax with variant prop:
<Input variant="floating" label="Work Email" type="email" />
<Input variant="password" label="Master Password" showStrengthMeter />
<Input variant="otp" length={6} onComplete={(code) => console.log(code)} />
<Input variant="tag" label="Topics" value={['react', 'tailwind']} />
<Input variant="search" placeholder="Quick search..." />

// 2. Standard Input:
<Input
  label="API Key"
  placeholder="sk-live-..."
  helperText="Stored in encrypted vault."
/>`,
    props: [
      {
        name: 'variant',
        type: `'standard' | 'floating' | 'inline-validation' | 'password' | 'otp' | 'tag' | 'search'`,
        defaultVal: `'standard'`,
        description: 'Input variation mode.',
      },
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Field label displayed above or as floating placeholder.',
      },
      {
        name: 'error',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Validation error text displayed below input.',
      },
      {
        name: 'leftIcon / rightIcon',
        type: 'React.ReactNode',
        defaultVal: 'undefined',
        description: 'Slots for leading and trailing iconography.',
      },
      {
        name: 'sizeVariant',
        type: `'sm' | 'md' | 'lg'`,
        defaultVal: `'md'`,
        description: 'Height scale for standard inputs.',
      },
    ],
    themeTokens: ['--surface', '--border', '--primary', '--destructive', '--radius'],
  },
  {
    id: 'floating-input',
    name: 'Floating Label Input',
    category: 'Forms',
    description:
      'Animated input field with a floating label that smoothly scales up and floats to the top edge when focused or filled. Includes invalid states and character counters.',
    importCode: `import { FloatingLabelInput } from 'es-react-components';`,
    usageCode: `<FloatingLabelInput
  label="Work email"
  type="email"
  value={email}
  onChange={setEmail}
  invalid={isInvalid}
  hint={isInvalid ? "Must be a valid email." : "Receipts are sent here."}
/>

<FloatingLabelInput
  label="Invoice reference"
  value={refCode}
  onChange={setRefCode}
  maxLength={16}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultVal: '""',
        description: 'Floating label text that animates on focus/value.',
      },
      {
        name: 'value / defaultValue',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Controlled or uncontrolled text value.',
      },
      {
        name: 'invalid',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Renders border and hint text in theme destructive color.',
      },
      {
        name: 'hint',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Helpful guidance or error message below input.',
      },
      {
        name: 'maxLength',
        type: 'number',
        defaultVal: 'undefined',
        description: 'Enforces character limit and renders live count.',
      },
    ],
    themeTokens: ['--surface', '--border', '--primary', '--destructive', '--radius'],
  },
  {
    id: 'otp-input',
    name: 'OTP Input',
    category: 'Forms',
    description:
      'Segmented multi-cell verification code input with auto-advance on typing, backspace return, full-code clipboard paste, and error vibration animation.',
    importCode: `import { OtpInput } from 'es-react-components';`,
    usageCode: `<OtpInput
  length={6}
  autoFocus
  status={isError ? "error" : "idle"}
  errorMessage="Incorrect code. Please re-enter."
  hint="Paste the entire code into any box."
  onChange={(code) => setCode(code)}
  onComplete={(code) => verifyCode(code)}
/>`,
    props: [
      {
        name: 'length',
        type: 'number',
        defaultVal: '6',
        description: 'Number of individual digit cells.',
      },
      {
        name: 'status',
        type: `'idle' | 'error' | 'success'`,
        defaultVal: `'idle'`,
        description: 'Visual status indicator. "error" triggers shake animation.',
      },
      {
        name: 'onComplete',
        type: '(code: string) => void',
        defaultVal: 'undefined',
        description: 'Callback fired when all cells are completely filled.',
      },
      {
        name: 'masked',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Masks typed digits for high-security credentials.',
      },
    ],
    themeTokens: ['--surface', '--border', '--primary', '--destructive', '--success'],
  },
  {
    id: 'tag-input',
    name: 'Tag Input',
    category: 'Forms',
    description:
      'Token and tag manager input supporting customizable separator keys (Enter, comma, semicolon), max tag limits, duplicate rejection, and two-stage backspace delete.',
    importCode: `import { TagInput } from 'es-react-components';`,
    usageCode: `<TagInput
  label="Topics"
  value={tags}
  onChange={setTags}
  max={8}
  separators={[',', ';']}
  hint="Press Enter or comma to add · Backspace removes"
/>`,
    props: [
      {
        name: 'value / defaultValue',
        type: 'string[]',
        defaultVal: '[]',
        description: 'Array of active tag tokens.',
      },
      {
        name: 'onChange',
        type: '(tags: string[]) => void',
        defaultVal: 'undefined',
        description: 'Callback triggered whenever tags are added or removed.',
      },
      {
        name: 'max',
        type: 'number',
        defaultVal: 'undefined',
        description: 'Maximum allowable tag count.',
      },
      {
        name: 'separators',
        type: 'string[]',
        defaultVal: "[';', ',']",
        description: 'Key characters that commit the current input as a tag.',
      },
    ],
    themeTokens: ['--surface', '--surface-elevated', '--border', '--primary', '--destructive'],
  },
  {
    id: 'password-input',
    name: 'Password Input & Strength',
    category: 'Forms',
    description:
      'Password field with show/hide password eye toggle and integrated real-time password strength meter checking character variety and length requirements.',
    importCode: `import {
  PasswordInput,
  PasswordStrength,
  usePasswordStrength
} from 'es-react-components';`,
    usageCode: `<PasswordInput
  label="New Password"
  value={password}
  onChange={setPassword}
  showStrengthMeter
  showRequirements
/>

// Or standalone strength meter:
<PasswordStrength value={password} showRequirements />`,
    props: [
      {
        name: 'showStrengthMeter',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Renders the 4-segment reactive strength bar.',
      },
      {
        name: 'showRequirements',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Displays the checklist of security criteria.',
      },
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Field header label.',
      },
    ],
    themeTokens: ['--surface', '--border', '--primary', '--success', '--warning', '--destructive'],
  },
  {
    id: 'expanding-search',
    name: 'Expanding Search',
    category: 'Forms',
    description:
      'Collapsible search bar powered by spring physics (motion/react). Smoothly expands from an icon on focus, features live debounced query updates, ESC dismiss, and result counter.',
    importCode: `import { ExpandingSearch, useExpandingSearch } from 'es-react-components';`,
    usageCode: `<ExpandingSearch
  label="Global Search"
  placeholder="Search resources..."
  value={query}
  onChange={setQuery}
  resultCount={results.length}
  align="right"
/>`,
    props: [
      {
        name: 'value / defaultValue',
        type: 'string',
        defaultVal: '""',
        description: 'Current search text value.',
      },
      {
        name: 'resultCount',
        type: 'number',
        defaultVal: 'undefined',
        description: 'Optional count badge shown on right edge.',
      },
      {
        name: 'align',
        type: `'left' | 'right'`,
        defaultVal: `'right'`,
        description: 'Anchor side for expanding motion animation.',
      },
      {
        name: 'debounce',
        type: 'number',
        defaultVal: '220',
        description: 'Debounce timeout in milliseconds.',
      },
    ],
    themeTokens: ['--surface', '--surface-elevated', '--border', '--primary', '--radius'],
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    description:
      'Multi-line text editor with auto-resizing, character count counters, error states, and theme border focus rings.',
    importCode: `import { Textarea } from 'es-react-components';`,
    usageCode: `<Textarea
  label="Project Description"
  placeholder="Enter notes..."
  maxLength={300}
  characterCount
  rows={4}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Header label.',
      },
      {
        name: 'characterCount',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Displays current length against maxLength.',
      },
      {
        name: 'error',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Validation error text.',
      },
    ],
    themeTokens: ['--surface', '--border', '--primary', '--radius'],
  },
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
    name: 'Toast',
    category: 'Feedback',
    description:
      'Lightweight floating notification queue managed via the imperative useToast hook.',
    importCode: `import { ToastProvider, useToast } from 'es-react-components';`,
    usageCode: `const { addToast } = useToast();

addToast({
  title: 'Repository Forked',
  description: 'Created remote fork under org/demo.',
  type: 'success',
});`,
    props: [
      {
        name: 'title',
        type: 'string',
        defaultVal: '""',
        description: 'Notification headline.',
      },
      {
        name: 'type',
        type: `'info' | 'success' | 'danger'`,
        defaultVal: `'info'`,
        description: 'Accent border and status icon.',
      },
      {
        name: 'duration',
        type: 'number',
        defaultVal: '4000',
        description: 'Auto-dismiss timeout in ms.',
      },
    ],
    themeTokens: [
      '--surface-elevated',
      '--border',
      '--foreground',
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
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
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
    id: 'text-loop',
    name: 'Text Loop (Curved Ribbon Marquee)',
    category: 'General',
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
    id: 'split-flap-text',
    name: 'Split Flap Text (Mechanical Departure Board)',
    category: 'General',
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
    id: 'branched-menu',
    name: 'Branched Menu (Tree Navigation)',
    category: 'Navigation',
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
    id: 'interactive-controls',
    name: 'Interactive Micro-Controls',
    category: 'General',
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
    id: 'streaming-text',
    name: 'Streaming Text',
    category: 'AI & Agentic UX',
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
    id: 'command-palette',
    name: 'Command Palette',
    category: 'Navigation',
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
    category: 'Navigation',
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
  },
  {
    id: 'wizard-steps',
    name: 'Wizard Steps',
    category: 'Navigation',
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
    category: 'Navigation',
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
    id: 'tree-view',
    name: 'Tree View',
    category: 'Surfaces & Layout',
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
    category: 'Surfaces & Layout',
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
    id: 'scroll-spy',
    name: 'Scroll Spy',
    category: 'Navigation',
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
    id: 'hide-on-scroll',
    name: 'Hide On Scroll',
    category: 'Surfaces & Layout',
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
    category: 'Surfaces & Layout',
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
  },
  {
    id: 'slider-detents',
    name: 'Slider Detents',
    category: 'Forms',
    description:
      'Accessible numeric slider with magnetic detent snap points, spring carriage thumb, haptic feedback, and keyboard detent traversal.',
    importCode: `import { SliderDetents, useSliderDetents } from 'es-react-components';`,
    usageCode: `<SliderDetents
  label="Instance CPU Allocation"
  min={1}
  max={16}
  step={1}
  detents={[
    { value: 2, label: 'Micro' },
    { value: 4, label: 'Standard' },
    { value: 8, label: 'High-Mem' },
    { value: 16, label: 'Max' },
  ]}
  value={cores}
  onValueChange={setCores}
/>`,
    props: [
      { name: 'value', type: 'number', defaultVal: '0', description: 'Controlled slider value.' },
      { name: 'onValueChange', type: '(val: number) => void', defaultVal: 'undefined', description: 'Callback fired on value update.' },
      { name: 'detents', type: 'Array<number | SliderDetent>', defaultVal: '[]', description: 'Snap point landmarks with optional label.' },
      { name: 'pull', type: 'number', defaultVal: '4.5% range', description: 'Magnetic snap attraction radius.' },
      { name: 'haptic', type: 'boolean', defaultVal: 'true', description: 'Whether to trigger device vibration on detent hit.' },
    ],
    themeTokens: ['--primary', '--surface-subtle', '--border', '--foreground', '--radius'],
  },
  {
    id: 'reorder-list',
    name: 'Reorder List',
    category: 'Surfaces & Layout',
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
    category: 'Surfaces & Layout',
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
    id: 'text-reveal',
    name: 'Text Reveal',
    category: 'General',
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
    category: 'General',
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
  },
  {
    id: 'blur-up-image',
    name: 'Blur-Up Image',
    category: 'Surfaces & Layout',
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
    category: 'Surfaces & Layout',
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
    id: 'markdown-editor',
    name: 'Markdown Editor & Math Preview',
    category: 'Forms',
    description:
      'Universal Markdown editor and live preview built completely from scratch with KaTeX LaTeX math support ($E=mc^2$ and $$\\int f(x)dx$$), split view, GitHub alerts, code blocks, task lists, and theme token styling.',
    importCode: `import { MarkdownEditor, MarkdownRenderer } from 'es-react-components';`,
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
    id: 'parameter-slider',
    name: 'Parameter Slider & Scrubber Controls',
    category: 'Forms',
    description:
      'High-precision inspector parameter slider with subtle tick track, floating carriage thumb with inner notch indicator, live formatted value readout, and companion switch/color controls.',
    importCode: `import { ParameterSlider, ParameterSwitch, ParameterColor, ParameterGrid } from 'es-react-components';`,
    usageCode: `<ParameterGrid columns={3}>
  <ParameterSlider
    label="Height"
    value={height}
    onChange={setHeight}
    min={24}
    max={96}
    step={2}
    unit="px"
  />
  <ParameterSlider
    label="Glide"
    value={glide}
    onChange={setGlide}
    min={0.1}
    max={1.5}
    step={0.1}
    unit="s"
  />
  <ParameterSwitch
    label="Show Value"
    checked={showVal}
    onChange={setShowVal}
  />
</ParameterGrid>`,
    props: [
      { name: 'label', type: 'string', defaultVal: 'required', description: 'Parameter title displayed on the left.' },
      { name: 'value', type: 'number', defaultVal: 'required', description: 'Current numeric parameter value.' },
      { name: 'onChange', type: '(val: number) => void', defaultVal: 'required', description: 'Callback fired during drag or keyboard changes.' },
      { name: 'min', type: 'number', defaultVal: '0', description: 'Minimum slider limit.' },
      { name: 'max', type: 'number', defaultVal: '100', description: 'Maximum slider limit.' },
      { name: 'step', type: 'number', defaultVal: '1', description: 'Granularity step resolution.' },
      { name: 'unit', type: 'string', defaultVal: "''", description: 'Unit suffix label (e.g. px, s, ms, %).' },
      { name: 'ticks', type: 'number', defaultVal: '7', description: 'Number of vertical tick marks rendered along track.' },
      { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Whether control is interactive.' },
    ],
    themeTokens: ['--surface', '--surface-elevated', '--border', '--primary', '--foreground', '--radius'],
  },
  {
    id: 'elastic-slider',
    name: 'Elastic Slider',
    category: 'Forms',
    description:
      'Organic rubber-band elastic slider with spring physics, overstretch edge resistance, auto-contrasting ink text, inside/outside icon slots, and vertical/horizontal layout modes.',
    importCode: `import { ElasticSlider } from 'es-react-components';`,
    usageCode: `<ElasticSlider
  defaultValue={65}
  startingValue={0}
  maxValue={100}
  thickness={6}
  activeThickness={14}
  bounce={0.5}
  valuePosition="bubble"
  thumb
  onChange={(val) => console.log('Volume:', val)}
/>`,
    props: [
      { name: 'value', type: 'number', defaultVal: 'undefined', description: 'Controlled slider position.' },
      { name: 'defaultValue', type: 'number', defaultVal: '50', description: 'Initial uncontrolled slider value.' },
      { name: 'startingValue', type: 'number', defaultVal: '0', description: 'Minimum bound of the slider track.' },
      { name: 'maxValue', type: 'number', defaultVal: '100', description: 'Maximum bound of the slider track.' },
      { name: 'isStepped', type: 'boolean', defaultVal: 'false', description: 'Whether value snaps to discrete steps.' },
      { name: 'stepSize', type: 'number', defaultVal: '1', description: 'Discrete step increment value.' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", defaultVal: "'horizontal'", description: 'Slider axis alignment.' },
      { name: 'valuePosition', type: "'top' | 'bubble' | 'inside' | 'none'", defaultVal: "'top'", description: 'Numeric label placement mode.' },
      { name: 'iconPlacement', type: "'outside' | 'inside'", defaultVal: "'outside'", description: 'Endpoint icon placement mode.' },
      { name: 'leftIcon / rightIcon', type: 'ReactNode', defaultVal: 'Hugeicons Volume icons', description: 'Start and end endpoint icon nodes.' },
      { name: 'thickness', type: 'number', defaultVal: '6', description: 'Resting track thickness in pixels.' },
      { name: 'activeThickness', type: 'number', defaultVal: '12', description: 'Expanded hover/drag track thickness.' },
      { name: 'bounce', type: 'number', defaultVal: '0.5', description: 'Elastic spring recoil bounce factor (0 to 0.95).' },
      { name: 'maxStretch', type: 'number', defaultVal: '50', description: 'Maximum edge rubber-band stretch in pixels.' },
      { name: 'thumb', type: 'boolean', defaultVal: 'false', description: 'Renders a circular thumb handle.' },
      { name: 'ticks', type: 'boolean | number[]', defaultVal: 'false', description: 'Shows tick marks or custom values along track.' },
      { name: 'growOnHover', type: 'boolean', defaultVal: 'true', description: 'Expands thickness and shows labels on pointer hover.' },
      { name: 'wheel', type: 'boolean', defaultVal: 'false', description: 'Enables mouse wheel / trackpad scroll adjustment.' },
    ],
    themeTokens: ['--primary', '--surface-elevated', '--border', '--foreground', '--radius'],
  },
  {
    id: 'wake-slider',
    name: 'Wake Slider',
    category: 'Forms',
    description:
      'Hydrodynamic waveform slider driven by spring velocity acoustics. As the user scrubs across bars, an asymmetric wake wave ripples with fluid momentum and smooth dissipation.',
    importCode: `import { WakeSlider } from 'es-react-components';`,
    usageCode: `<WakeSlider
  defaultValue={45}
  min={0}
  max={100}
  bars={32}
  height={56}
  restHeight={12}
  reach={6}
  skew={0.6}
  glide={0.3}
  showValue
  onChange={(val) => console.log('Audio level:', val)}
/>`,
    props: [
      { name: 'value', type: 'number', defaultVal: 'undefined', description: 'Controlled slider level.' },
      { name: 'defaultValue', type: 'number', defaultVal: '50', description: 'Initial uncontrolled level.' },
      { name: 'min', type: 'number', defaultVal: '0', description: 'Minimum numerical range bound.' },
      { name: 'max', type: 'number', defaultVal: '100', description: 'Maximum numerical range bound.' },
      { name: 'step', type: 'number', defaultVal: '1', description: 'Step resolution increment.' },
      { name: 'bars', type: 'number', defaultVal: '32', description: 'Number of individual vertical wave bars.' },
      { name: 'height', type: 'number', defaultVal: '56', description: 'Maximum bar height at peak wave amplitude in px.' },
      { name: 'restHeight', type: 'number', defaultVal: '12', description: 'Resting baseline bar height in px.' },
      { name: 'gap', type: 'number', defaultVal: '4', description: 'Spacing between adjacent bars in px.' },
      { name: 'sensitivity', type: 'number', defaultVal: '1', description: 'Velocity sensitivity multiplier.' },
      { name: 'reach', type: 'number', defaultVal: '6', description: 'Spatial radius of the wake wave disturbance.' },
      { name: 'skew', type: 'number', defaultVal: '0.6', description: 'Directional asymmetry of the wave tail.' },
      { name: 'glide', type: 'number', defaultVal: '0.3', description: 'Spring response settling glide time.' },
      { name: 'smoothing', type: 'number', defaultVal: '100', description: 'Velocity smoothing factor.' },
      { name: 'showValue', type: 'boolean', defaultVal: 'false', description: 'Displays right-aligned numeric value.' },
      { name: 'fillColor / trackColor', type: 'string', defaultVal: "'#f5f5f5' / '#27272a'", description: 'Active and background bar colors.' },
    ],
    themeTokens: ['--primary', '--surface-subtle', '--border', '--foreground', '--radius'],
  },
  {
    id: 'slider',
    name: 'Slider (Single & Dual Range)',
    category: 'Forms',
    description:
      'Accessible multi-thumb slider powered by React Aria, supporting single value and dual-thumb range selection, floating tooltip indicators, bottom labels, and keyboard accessibility.',
    importCode: `import { Slider } from 'es-react-components';`,
    usageCode: `<Slider
  label="Bandwidth Allocation"
  defaultValue={[20, 80]}
  minValue={0}
  maxValue={100}
  labelPosition="top-floating"
  labelFormatter={(val) => \`\${val} Mbps\`}
/>`,
    props: [
      { name: 'value', type: 'number | number[]', defaultVal: 'undefined', description: 'Controlled slider thumb value or range array.' },
      { name: 'defaultValue', type: 'number | number[]', defaultVal: '50', description: 'Initial slider thumb value or dual-thumb array.' },
      { name: 'minValue', type: 'number', defaultVal: '0', description: 'Minimum slider limit.' },
      { name: 'maxValue', type: 'number', defaultVal: '100', description: 'Maximum slider limit.' },
      { name: 'step', type: 'number', defaultVal: '1', description: 'Value granularity step size.' },
      { name: 'label', type: 'ReactNode', defaultVal: 'undefined', description: 'Label rendered above track.' },
      { name: 'labelPosition', type: "'default' | 'bottom' | 'top-floating'", defaultVal: "'default'", description: 'Value output label display mode.' },
      { name: 'labelFormatter', type: '(val: number) => string', defaultVal: 'undefined', description: 'Custom string formatter for thumb values.' },
      { name: 'isDisabled', type: 'boolean', defaultVal: 'false', description: 'Disables slider interaction.' },
    ],
    themeTokens: ['--primary', '--surface-elevated', '--border', '--muted', '--foreground', '--radius'],
  },
  {
    id: 'mono-charts',
    name: 'Mono Rounded Charts',
    category: 'Surfaces & Layout',
    description:
      'Suite of 5 minimalist monochrome Recharts components: Spline Dynamics (Line), Mono Pill Pillars (Bar), Mono Curved Wave (Area), Mono Rounded Donut, and Fluid Stream Wave, featuring rounded caps, responsive layout adaptation, and dynamic theme switching.',
    importCode: `import {
  MonoRoundedLineChart,
  MonoRoundedBarChart,
  MonoRoundedAreaChart,
  MonoRoundedDonutChart,
  MonoRoundedStreamChart,
  MonoChartsSuite,
} from 'es-react-components';`,
    usageCode: `// 1. Individual Charts
<MonoRoundedLineChart theme="auto" compact={false} />
<MonoRoundedBarChart theme="auto" layout="vertical" />
<MonoRoundedAreaChart theme="auto" curve="monotone" />
<MonoRoundedDonutChart theme="auto" />
<MonoRoundedStreamChart theme="auto" />

// 2. Full Responsive Suite
<MonoChartsSuite theme="auto" compact={false} />`,
    props: [
      { name: 'theme', type: "'dark' | 'light' | 'auto'", defaultVal: "'auto'", description: 'Color theme styling. Respects active ThemeContext or DOM class.' },
      { name: 'compact', type: 'boolean', defaultVal: 'false', description: 'Reduced vertical height for dense dashboard cards.' },
      { name: 'data', type: 'Array<T>', defaultVal: 'DEFAULT_*_DATA', description: 'Custom array of data points matching chart series.' },
      { name: 'title', type: 'string', defaultVal: 'Chart Specific', description: 'Headline label in card header.' },
      { name: 'badge', type: 'string', defaultVal: 'Pill Tag', description: 'Monospace pill badge in header.' },
      { name: 'metric', type: 'string | number', defaultVal: 'Computed', description: 'Primary focal number callout.' },
      { name: 'unit', type: 'string', defaultVal: 'nodes / units / %', description: 'Unit descriptor for primary metric.' },
      { name: 'activeSeries (Line)', type: "'all' | 'value'", defaultVal: "'all'", description: 'Toggles between Dual line baseline and Single line.' },
      { name: 'layout (Bar)', type: "'vertical' | 'horizontal'", defaultVal: "'vertical'", description: 'Toggles between vertical columns and horizontal rows.' },
      { name: 'curve (Area)', type: "'monotone' | 'natural'", defaultVal: "'monotone'", description: 'Spline interpolation algorithm for area curves.' },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary', '--card'],
  },
];



