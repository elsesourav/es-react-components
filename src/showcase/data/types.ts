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
