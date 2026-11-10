export type ComponentCategory =
  | 'Buttons & Actions'
  | 'Inputs & Fields'
  | 'Checkbox & Switch'
  | 'Sliders & Range'
  | 'Navigation & Menus'
  | 'Scroll & Viewport'
  | 'Feedback & Overlays'
  | 'Typography & Content'
  | 'Surfaces & Cards'
  | 'Data & Analytics'
  | 'AI & Agentic UX';

export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultVal: string;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  importCode: string;
  usageCode: string;
  props: ComponentPropDoc[];
  themeTokens: string[];
}
