import type { ComponentDoc } from './types';

export const FORMS_SLIDERS_COMPONENTS: ComponentDoc[] = [
{
    id: 'slider-detents',
    name: 'Slider Detents',
    category: 'Sliders & Range',
    description:
      'Accessible numeric slider with magnetic detent snap points, spring carriage thumb, haptic feedback, and keyboard detent traversal.',
    importCode: `import { SliderDetents, useSliderDetents } from '@elsesourav/react-ui';`,
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
    id: 'parameter-slider',
    name: 'Parameter Slider',
    category: 'Sliders & Range',
    description:
      'High-precision inspector control system with multi-variant components: Continuous & Stepped Range Sliders with subtle tick ruler, glowing white needle indicator, and live numeric units (px, s, ms, %); Color Picker Pill with circular swatch and uppercase hex pill badge; and companion Pill Toggle Switches.',
    importCode: `import { ParameterSlider, ParameterSwitch, ParameterColor, ParameterGrid } from '@elsesourav/react-ui';`,
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
    category: 'Sliders & Range',
    description:
      'Organic rubber-band elastic slider with spring physics, overstretch edge resistance, auto-contrasting ink text, inside/outside icon slots, and vertical/horizontal layout modes.',
    importCode: `import { ElasticSlider } from '@elsesourav/react-ui';`,
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
    category: 'Sliders & Range',
    description:
      'Hydrodynamic waveform slider driven by spring velocity acoustics. As the user scrubs across bars, an asymmetric wake wave ripples with fluid momentum and smooth dissipation.',
    importCode: `import { WakeSlider } from '@elsesourav/react-ui';`,
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
    name: 'Slider',
    category: 'Sliders & Range',
    description:
      'Accessible multi-thumb slider powered by React Aria, supporting single (1) and double (2) thumb range selection, floating tooltip indicators, bottom labels, and keyboard accessibility.',
    importCode: `import { Slider } from '@elsesourav/react-ui';`,
    usageCode: `{/* 1. Single Thumb Mode */}
<Slider
  label="Compute Capacity"
  thumbs={1}
  value={capacity}
  onChange={setCapacity}
  min={0}
  max={100}
  labelPosition="tooltip"
  labelFormatter={(val) => \`\${val}%\`}
/>

{/* 2. Double Thumb / Range Mode */}
<Slider
  label="Price Filter Range"
  thumbs={2}
  value={priceRange}
  onChange={setPriceRange}
  min={0}
  max={100}
  labelPosition="tooltip"
  labelFormatter={(val) => \`$\${val}\`}
/>`,
    props: [
      { name: 'thumbs', type: '1 | 2', defaultVal: '1 (inferred)', description: 'Explicit number of thumbs: 1 for single thumb, 2 for double/dual thumb range.' },
      { name: 'mode', type: "'single' | 'range' | 'dual'", defaultVal: "'single'", description: "Mode alias for thumb count ('single' = 1, 'range' = 2)." },
      { name: 'value', type: 'number | number[]', defaultVal: 'undefined', description: 'Controlled slider thumb value: number for 1 thumb, [min, max] for 2 thumbs.' },
      { name: 'defaultValue', type: 'number | number[]', defaultVal: '50', description: 'Initial slider thumb value or dual-thumb array.' },
      { name: 'onChange', type: '(value: number | number[]) => void', defaultVal: 'undefined', description: 'Callback fired when thumb value changes.' },
      { name: 'min / minValue', type: 'number', defaultVal: '0', description: 'Minimum slider limit.' },
      { name: 'max / maxValue', type: 'number', defaultVal: '100', description: 'Maximum slider limit.' },
      { name: 'step', type: 'number', defaultVal: '1', description: 'Value granularity step size.' },
      { name: 'label', type: 'ReactNode', defaultVal: 'undefined', description: 'Label rendered above track.' },
      { name: 'labelPosition', type: "'tooltip' | 'top-floating' | 'bottom' | 'hidden'", defaultVal: "'hidden'", description: 'Value output label display mode.' },
      { name: 'labelFormatter', type: '(val: number) => string', defaultVal: 'undefined', description: 'Custom string formatter for thumb values.' },
      { name: 'disabled / isDisabled', type: 'boolean', defaultVal: 'false', description: 'Disables slider interaction.' },
    ],
    themeTokens: ['--primary', '--surface-elevated', '--border', '--muted', '--foreground', '--radius'],
  },
  {
    id: 'arcade-switch',
    name: 'Arcade Switch',
    category: 'Checkbox & Switch',
    description:
      'Tactile retro arcade toggle switch featuring metallic silver beveled rim, multi-layered inset track shadows, neon active glow, concentric border radii, and 3D white thumb with engraved ON/OFF indicators.',
    importCode: `import { ArcadeSwitch } from '@elsesourav/react-ui';`,
    usageCode: `<ArcadeSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  variant="neon-green"
  size="md"
  showText
/>`,
    props: [
      { name: 'checked', type: 'boolean', defaultVal: 'false', description: 'Controlled on/off boolean state.' },
      { name: 'defaultChecked', type: 'boolean', defaultVal: 'false', description: 'Initial uncontrolled boolean state.' },
      { name: 'onChange', type: '(checked: boolean) => void', defaultVal: 'undefined', description: 'Callback fired when toggle state changes.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Preset dimensions.' },
      { name: 'variant', type: "'neon-green' | 'candy-pink' | 'neon-cyan' | 'amber-gold' | 'cyber-purple'", defaultVal: "'neon-green'", description: 'Active track color hue.' },
      { name: 'borderRadius', type: 'number', defaultVal: 'height / 2', description: 'Outer border radius with 100% mathematically concentric track and thumb rounding.' },
      { name: 'borderPadding', type: 'number', defaultVal: '2.5', description: 'Subpixel padding between metallic bezel and sliding thumb.' },
      { name: 'showShadow', type: 'boolean', defaultVal: 'true', description: 'Toggles 3D inset track shadows and tactile thumb shadows.' },
      { name: 'showGlow', type: 'boolean', defaultVal: 'true', description: 'Toggles ambient neon active glow.' },
      { name: 'showBezel', type: 'boolean', defaultVal: 'true', description: 'Toggles specular metallic outer bevel rim.' },
      { name: 'showText', type: 'boolean', defaultVal: 'true', description: 'Renders engraved ON/OFF text on the white thumb.' },
      { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables user interactions and dims opacity.' },
    ],
    themeTokens: ['--primary', '--surface', '--border', '--foreground'],
  },
  {
    id: 'arcade-slider',
    name: 'Arcade Slider',
    category: 'Sliders & Range',
    description:
      'Arcade wide paddle range slider featuring continuous pointer drag, metallic silver beveled rim, glowing active level fill, concentric border radii, and 3D white tactile thumb knob.',
    importCode: `import { ArcadeSlider } from '@elsesourav/react-ui';`,
    usageCode: `<ArcadeSlider
  value={volume}
  onChange={setVolume}
  variant="neon-green"
  size="md"
  borderRadius={21}
  showShadow
  showGlow
/>`,
    props: [
      { name: 'value', type: 'number', defaultVal: 'undefined', description: 'Controlled numeric value.' },
      { name: 'defaultValue', type: 'number', defaultVal: '82', description: 'Initial uncontrolled slider value.' },
      { name: 'onChange', type: '(val: number) => void', defaultVal: 'undefined', description: 'Callback fired when value changes.' },
      { name: 'min', type: 'number', defaultVal: '0', description: 'Minimum slider limit.' },
      { name: 'max', type: 'number', defaultVal: '100', description: 'Maximum slider limit.' },
      { name: 'step', type: 'number', defaultVal: '1', description: 'Granularity step.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Preset dimensions.' },
      { name: 'variant', type: "'neon-green' | 'candy-pink' | 'neon-cyan' | 'amber-gold' | 'cyber-purple'", defaultVal: "'neon-green'", description: 'Active fill color hue.' },
      { name: 'borderRadius', type: 'number', defaultVal: 'height / 2', description: 'Outer border radius with 100% mathematically concentric track and thumb rounding.' },
      { name: 'borderPadding', type: 'number', defaultVal: '2.5', description: 'Subpixel padding between metallic bezel and sliding thumb.' },
      { name: 'showShadow', type: 'boolean', defaultVal: 'true', description: 'Toggles 3D inset track shadows and tactile thumb shadows.' },
      { name: 'showGlow', type: 'boolean', defaultVal: 'true', description: 'Toggles ambient neon active glow.' },
      { name: 'showBezel', type: 'boolean', defaultVal: 'true', description: 'Toggles specular metallic outer bevel rim.' },
      { name: 'showValue', type: 'boolean', defaultVal: 'false', description: 'Renders numeric value directly inside the thumb knob.' },
      { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disables user interactions and dims opacity.' },
    ],
    themeTokens: ['--primary', '--surface', '--border', '--foreground'],
  }
];
