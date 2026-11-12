import { GENERAL_COMPONENTS } from './general';
import { GENERAL_EXTRA_COMPONENTS } from './general-extra';
import { SURFACES_COMPONENTS } from './surfaces';
import { SURFACES_EXTRA_COMPONENTS } from './surfaces-extra';
import { FORMS_COMPONENTS } from './forms';
import { FORMS_CONTROLS_COMPONENTS } from './forms-controls';
import { FORMS_AI_CONTROLS_COMPONENTS } from './forms-ai-controls';
import { FORMS_SLIDERS_COMPONENTS } from './forms-sliders';
import { DATA_ANALYTICS_COMPONENTS } from './data-analytics';
import { FEEDBACK_COMPONENTS } from './feedback';
import { NAVIGATION_COMPONENTS } from './navigation';
import type { ComponentDoc } from './types';

export * from './types';

export const COMPONENTS_DATA: ComponentDoc[] = [
  ...GENERAL_COMPONENTS,
  ...GENERAL_EXTRA_COMPONENTS,
  ...SURFACES_COMPONENTS,
  ...SURFACES_EXTRA_COMPONENTS,
  ...FORMS_COMPONENTS,
  ...FORMS_CONTROLS_COMPONENTS,
  ...FORMS_AI_CONTROLS_COMPONENTS,
  ...FORMS_SLIDERS_COMPONENTS,
  ...DATA_ANALYTICS_COMPONENTS,
  ...FEEDBACK_COMPONENTS,
  ...NAVIGATION_COMPONENTS,
];
