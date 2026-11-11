import type { ComponentDoc } from './types';

export const FORMS_AI_CONTROLS_COMPONENTS: ComponentDoc[] = [
  {
    id: 'ai-prompt-bar',
    name: 'AI Prompt Bar',
    category: 'AI & Agentic UX',
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
    category: 'AI & Agentic UX',
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
];
