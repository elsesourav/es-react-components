import type { ComponentDoc } from './types';

export const FORMS_COMPONENTS: ComponentDoc[] = [
{
    id: 'input',
    name: 'Input',
    category: 'Inputs & Fields',
    description:
      'Universal Form Input component supporting all standard & advanced variants: standard, floating, inline-validation, password-strength, otp, tag, and expanding-search.',
    importCode: `// Unified Component syntax:
import { Input } from '@elsesourav/react-ui';

// Or dedicated individual imports:
import {
  FloatingLabelInput,
  InlineValidation,
  PasswordInput,
  OtpInput,
  TagInput,
  ExpandingSearch,
} from '@elsesourav/react-ui';`,
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
    category: 'Inputs & Fields',
    description:
      'Animated input field with a floating label that smoothly scales up and floats to the top edge when focused or filled. Includes invalid states and character counters.',
    importCode: `import { FloatingLabelInput } from '@elsesourav/react-ui';`,
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
    id: 'inline-validation',
    name: 'Inline Validation Input',
    category: 'Inputs & Fields',
    description:
      'Live validation form field featuring real-time syntax and business rule checking, dynamic success/error status icons, animated slide-in error messages, and touch blur tracking.',
    importCode: `import { InlineValidation } from '@elsesourav/react-ui';`,
    usageCode: `<InlineValidation
  label="Work Email"
  type="email"
  validate={(val) => !val.includes('@') ? 'Valid email required' : null}
  validateOn="change"
  hint="Instant syntax verification"
/>`,
    props: [
      { name: 'label', type: 'string', defaultVal: 'undefined', description: 'Field header label.' },
      { name: 'validate', type: '(val: string) => string | null', defaultVal: 'undefined', description: 'Validation function returning error text or null for pass.' },
      { name: 'validateOn', type: "'change' | 'blur'", defaultVal: "'change'", description: 'Whether to validate as the user types or upon loss of focus.' },
      { name: 'hint', type: 'string', defaultVal: 'undefined', description: 'Supporting guidance text below input.' },
      { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables user input and dims styling.' },
    ],
    themeTokens: ['--surface', '--border', '--primary', '--destructive', '--success', '--radius'],
  },
{
    id: 'otp-input',
    name: 'OTP Input',
    category: 'Inputs & Fields',
    description:
      'Segmented multi-cell verification code input with auto-advance on typing, backspace return, full-code clipboard paste, and error vibration animation.',
    importCode: `import { OtpInput } from '@elsesourav/react-ui';`,
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
    category: 'Inputs & Fields',
    description:
      'Token and tag manager input supporting customizable separator keys (Enter, comma, semicolon), max tag limits, duplicate rejection, and two-stage backspace delete.',
    importCode: `import { TagInput } from '@elsesourav/react-ui';`,
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
    name: 'Password Input',
    category: 'Inputs & Fields',
    description:
      'Password field with show/hide password eye toggle and integrated real-time password strength meter checking character variety and length requirements.',
    importCode: `import {
  PasswordInput,
  PasswordStrength,
  usePasswordStrength
} from '@elsesourav/react-ui';`,
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
    category: 'Inputs & Fields',
    description:
      'Collapsible search bar powered by spring physics (motion/react). Smoothly expands from an icon on focus, features live debounced query updates, ESC dismiss, and result counter.',
    importCode: `import { ExpandingSearch, useExpandingSearch } from '@elsesourav/react-ui';`,
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
    category: 'Inputs & Fields',
    description:
      'Multi-line text editor with auto-resizing, character count counters, error states, and theme border focus rings.',
    importCode: `import { Textarea } from '@elsesourav/react-ui';`,
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
    id: 'image-upload',
    name: 'Image Upload',
    category: 'Inputs & Fields',
    description:
      'Production-grade image upload and cropping component with drag-and-drop, URL input, 8 aspect ratio presets, interactive zoom, 3x3 rule-of-thirds grid, and high-quality canvas export.',
    importCode: `import { ImageUpload, ImageUploadWithCrop, ImageCropperModal } from '@elsesourav/react-ui';`,
    usageCode: `<ImageUpload
  value={imageUrl}
  onChange={setImageUrl}
  label="Avatar & Cover Asset"
  helperText="Supports PNG, JPG, or WebP. Click thumbnail to crop."
  previewShape="square"
  cropShape="rect"
  aspectRatio={1}
  targetWidth={512}
  targetHeight={512}
  mimeType="image/webp"
  quality={0.92}
/>`,
    props: [
      {
        name: 'value',
        type: 'string',
        defaultVal: "''",
        description: 'Controlled image URL string or data URL.',
      },
      {
        name: 'onChange',
        type: '(url: string) => void',
        defaultVal: 'undefined',
        description: 'Callback fired when an image is uploaded, cropped, or cleared.',
      },
      {
        name: 'onUploadFile',
        type: '(file: File) => Promise<{ success: boolean; url?: string; error?: string }>',
        defaultVal: 'undefined',
        description: 'Custom server upload handler. Defaults to client blob data URL.',
      },
      {
        name: 'label',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Form label displayed above the upload bar.',
      },
      {
        name: 'helperText',
        type: 'string',
        defaultVal: 'undefined',
        description: 'Supporting caption or file constraint text.',
      },
      {
        name: 'previewShape',
        type: "'square' | 'circle' | 'banner' | 'portrait'",
        defaultVal: "'square'",
        description: 'Thumbnail geometry shape and aspect ratio.',
      },
      {
        name: 'cropShape',
        type: "'rect' | 'round'",
        defaultVal: "'rect'",
        description: 'Crop bounding box geometry (round or rectangle).',
      },
      {
        name: 'aspectRatio',
        type: 'number | string | null',
        defaultVal: '1',
        description: 'Preset or numeric aspect ratio (e.g. 1, 16/9, 4/3, "1:1", "free").',
      },
      {
        name: 'targetWidth',
        type: 'number',
        defaultVal: '512',
        description: 'Exported canvas image width in pixels.',
      },
      {
        name: 'targetHeight',
        type: 'number',
        defaultVal: '512',
        description: 'Exported canvas image height in pixels.',
      },
      {
        name: 'mimeType',
        type: "'image/webp' | 'image/png' | 'image/jpeg'",
        defaultVal: "'image/webp'",
        description: 'Compression output mime type.',
      },
      {
        name: 'quality',
        type: 'number',
        defaultVal: '0.92',
        description: 'Canvas compression quality between 0.0 and 1.0.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Disables user interactions and uploads.',
      },
      {
        name: 'required',
        type: 'boolean',
        defaultVal: 'false',
        description: 'Renders required indicator asterisk.',
      },
    ],
    themeTokens: [
      '--primary',
      '--primary-foreground',
      '--surface-elevated',
      '--surface-sunken',
      '--border',
      '--foreground',
      '--muted-foreground',
      '--radius',
    ],
  }
];
