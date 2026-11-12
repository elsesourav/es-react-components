import type { ComponentDoc } from './types';

export const DATA_ANALYTICS_COMPONENTS: ComponentDoc[] = [
  {
    id: 'mono-charts',
    name: 'Mono Charts Suite (All-in-One)',
    category: 'Data & Analytics',
    description:
      'Complete responsive monochrome Recharts dashboard suite combining all 5 charts (Line, Bar, Area, Donut, Stream) into an adaptive grid with synchronized theme switching and compact density modes.',
    importCode: `import { MonoChartsSuite } from 'es-react-components';`,
    usageCode: `<MonoChartsSuite theme="auto" compact={false} />`,
    props: [
      { name: 'theme', type: "'dark' | 'light' | 'auto'", defaultVal: "'auto'", description: 'Color theme styling. Respects active ThemeContext or DOM class.' },
      { name: 'compact', type: 'boolean', defaultVal: 'false', description: 'Reduced vertical height for dense dashboard cards.' },
      { name: 'className', type: 'string', defaultVal: 'undefined', description: 'Optional CSS class for grid layout styling.' },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary', '--card'],
  },
  {
    id: 'mono-line-chart',
    name: 'Mono Rounded Line Chart',
    category: 'Data & Analytics',
    description:
      'Minimalist monochrome spline line chart featuring dual/single series toggles, rounded data point markers, hover tooltip cards, and responsive container resizing.',
    importCode: `import { MonoRoundedLineChart } from 'es-react-components';`,
    usageCode: `<MonoRoundedLineChart
  theme="auto"
  activeSeries="all"
  compact={false}
/>`,
    props: [
      { name: 'data', type: 'LinePoint[]', defaultVal: 'DEFAULT_MONO_LINE_DATA', description: 'Array of data points with label, value, and optional secondary series.' },
      { name: 'title', type: 'string', defaultVal: "'Spline Dynamics'", description: 'Card title header.' },
      { name: 'badge', type: 'string', defaultVal: "'Line'", description: 'Pill badge shown in the top header.' },
      { name: 'metric', type: 'string | number', defaultVal: 'Computed sum', description: 'Primary focal number callout.' },
      { name: 'unit', type: 'string', defaultVal: "'nodes'", description: 'Unit descriptor for primary metric.' },
      { name: 'theme', type: "'dark' | 'light' | 'auto'", defaultVal: "'auto'", description: 'Color theme mode.' },
      { name: 'compact', type: 'boolean', defaultVal: 'false', description: 'Reduced vertical height mode.' },
      { name: 'activeSeries', type: "'all' | 'value'", defaultVal: "'all'", description: 'Toggles between Dual line baseline and Single line.' },
      { name: 'onActiveSeriesChange', type: '(series: "all" | "value") => void', defaultVal: 'undefined', description: 'Callback fired when series mode changes.' },
      { name: 'showSeriesToggle', type: 'boolean', defaultVal: 'true', description: 'Whether to show the dual/single series toggle pill in header.' },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary', '--card'],
  },
  {
    id: 'mono-bar-chart',
    name: 'Mono Rounded Bar Chart',
    category: 'Data & Analytics',
    description:
      'Monochrome pill pillar bar chart with full-radius caps, vertical column or horizontal row orientations, segmented layout selector, and hover tooltips.',
    importCode: `import { MonoRoundedBarChart } from 'es-react-components';`,
    usageCode: `<MonoRoundedBarChart
  theme="auto"
  layout="vertical"
  compact={false}
/>`,
    props: [
      { name: 'data', type: 'BarPoint[]', defaultVal: 'DEFAULT_MONO_BAR_DATA', description: 'Array of data points with primary and secondary values.' },
      { name: 'title', type: 'string', defaultVal: "'Mono Pill Pillars'", description: 'Headline label in card header.' },
      { name: 'badge', type: 'string', defaultVal: "'Full Radius'", description: 'Monospace pill badge in header.' },
      { name: 'metric', type: 'string | number', defaultVal: 'Computed total', description: 'Primary metric value callout.' },
      { name: 'unit', type: 'string', defaultVal: "'units built'", description: 'Unit label for primary metric.' },
      { name: 'theme', type: "'dark' | 'light' | 'auto'", defaultVal: "'auto'", description: 'Color theme mode.' },
      { name: 'compact', type: 'boolean', defaultVal: 'false', description: 'Reduced vertical height mode.' },
      { name: 'layout', type: "'vertical' | 'horizontal'", defaultVal: "'vertical'", description: 'Column vs row orientation layout.' },
      { name: 'onLayoutChange', type: '(layout: "vertical" | "horizontal") => void', defaultVal: 'undefined', description: 'Callback fired on layout toggle.' },
      { name: 'showLayoutToggle', type: 'boolean', defaultVal: 'true', description: 'Whether to show the Col/Row layout toggle pill in header.' },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary', '--card'],
  },
  {
    id: 'mono-area-chart',
    name: 'Mono Rounded Area Chart',
    category: 'Data & Analytics',
    description:
      'Smooth gradient-filled monochrome area chart with monotone or natural spline curve interpolation, hover gradients, and metric indicators.',
    importCode: `import { MonoRoundedAreaChart } from 'es-react-components';`,
    usageCode: `<MonoRoundedAreaChart
  theme="auto"
  curve="monotone"
  compact={false}
/>`,
    props: [
      { name: 'data', type: 'AreaPoint[]', defaultVal: 'DEFAULT_MONO_AREA_DATA', description: 'Array of data points with time and volume.' },
      { name: 'title', type: 'string', defaultVal: "'Mono Curved Wave'", description: 'Card title header.' },
      { name: 'badge', type: 'string', defaultVal: "'Soft Gradient'", description: 'Pill badge in card header.' },
      { name: 'metric', type: 'string | number', defaultVal: "'48%'", description: 'Primary metric callout.' },
      { name: 'unit', type: 'string', defaultVal: "'peak throughput'", description: 'Unit label for metric.' },
      { name: 'theme', type: "'dark' | 'light' | 'auto'", defaultVal: "'auto'", description: 'Color theme mode.' },
      { name: 'compact', type: 'boolean', defaultVal: 'false', description: 'Reduced vertical height mode.' },
      { name: 'curve', type: "'monotone' | 'natural'", defaultVal: "'monotone'", description: 'Spline interpolation algorithm for area curves.' },
      { name: 'onCurveChange', type: '(curve: "monotone" | "natural") => void', defaultVal: 'undefined', description: 'Callback fired on curve algorithm change.' },
      { name: 'showCurveToggle', type: 'boolean', defaultVal: 'true', description: 'Whether to show the curve toggle pill in header.' },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary', '--card'],
  },
  {
    id: 'mono-donut-chart',
    name: 'Mono Rounded Donut Chart',
    category: 'Data & Analytics',
    description:
      'Radial monochrome donut chart with soft arc caps, interactive segment slice hover highlights, center allocation metric callout, and legend chips.',
    importCode: `import { MonoRoundedDonutChart } from 'es-react-components';`,
    usageCode: `<MonoRoundedDonutChart
  theme="auto"
  compact={false}
/>`,
    props: [
      { name: 'data', type: 'DonutSegment[]', defaultVal: 'DEFAULT_MONO_DONUT_DATA', description: 'Array of donut segments with name, value, and shade.' },
      { name: 'title', type: 'string', defaultVal: "'Mono Rounded Donut'", description: 'Card title header.' },
      { name: 'badge', type: 'string', defaultVal: "'Soft Arc Caps'", description: 'Pill badge in card header.' },
      { name: 'metric', type: 'string | number', defaultVal: 'Total or hovered value', description: 'Center metric callout.' },
      { name: 'unit', type: 'string', defaultVal: "'allocation'", description: 'Unit label for center metric.' },
      { name: 'theme', type: "'dark' | 'light' | 'auto'", defaultVal: "'auto'", description: 'Color theme mode.' },
      { name: 'compact', type: 'boolean', defaultVal: 'false', description: 'Reduced vertical height mode.' },
      { name: 'hoverIndex', type: 'number | null', defaultVal: 'null', description: 'Controlled active hovered segment index.' },
      { name: 'onHoverIndexChange', type: '(index: number | null) => void', defaultVal: 'undefined', description: 'Callback fired when hovered segment changes.' },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary', '--card'],
  },
  {
    id: 'mono-stream-chart',
    name: 'Mono Rounded Stream Chart',
    category: 'Data & Analytics',
    description:
      'Fluid stream wave chart with bi-directional ribbon curves, organic wave motion aesthetics, rounded borders, and real-time theme adaptation.',
    importCode: `import { MonoRoundedStreamChart } from 'es-react-components';`,
    usageCode: `<MonoRoundedStreamChart
  theme="auto"
  compact={false}
/>`,
    props: [
      { name: 'data', type: 'StreamPoint[]', defaultVal: 'DEFAULT_MONO_STREAM_DATA', description: 'Array of stream data points.' },
      { name: 'title', type: 'string', defaultVal: "'Stream Wave'", description: 'Card title header.' },
      { name: 'badge', type: 'string', defaultVal: "'Fluid'", description: 'Pill badge in card header.' },
      { name: 'metric', type: 'string | number', defaultVal: 'Peak flow metric', description: 'Primary metric callout.' },
      { name: 'unit', type: 'string', defaultVal: "'peak flow'", description: 'Unit label for metric.' },
      { name: 'theme', type: "'dark' | 'light' | 'auto'", defaultVal: "'auto'", description: 'Color theme mode.' },
      { name: 'compact', type: 'boolean', defaultVal: 'false', description: 'Reduced vertical height mode.' },
    ],
    themeTokens: ['--surface', '--foreground', '--border', '--primary', '--card'],
  },
];
