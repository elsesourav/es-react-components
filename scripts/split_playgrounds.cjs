const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/showcase/ComponentPlaygrounds.tsx');
const content = fs.readFileSync(srcPath, 'utf8');

// 1. Extract imports (lines 1 to 175)
const lines = content.split('\n');
let importEndLine = 0;
for (let i = 0; i < 200; i++) {
  if (lines[i].includes('export const ComponentPlaygrounds')) {
    importEndLine = i;
    break;
  }
}
const importHeader = lines.slice(0, importEndLine).join('\n');

// 2. Extract top block (state & helpers between line importEndLine and the first `if (componentId ===`)
const firstIfIndex = content.indexOf("if (componentId === 'button')");
const topBlock = content.slice(content.indexOf('{', content.indexOf('export const ComponentPlaygrounds')) + 1, firstIfIndex);

// 3. Extract all component blocks
const regex = /if \(componentId === '([^']+)'\) \{([\s\S]*?)(?=(?:\n  if \(componentId === ')|(?:\n  return null;\s*\n\}\;))/g;
let match;
const components = {};
while ((match = regex.exec(content)) !== null) {
  components[match[1]] = match[2];
}

console.log('Found components:', Object.keys(components).length);

// Define categories
const CATEGORIES = {
  TextPlaygrounds: ['text-loop', 'split-flap-text', 'text-reveal', 'streaming-text', 'markdown-editor'],
  SliderPlaygrounds: ['parameter-slider', 'elastic-slider', 'wake-slider', 'slider', 'slider-detents'],
  NavigationPlaygrounds: [
    'branched-menu',
    'tabs',
    'segmented-control',
    'wizard-steps',
    'pagination',
    'tree-view',
    'sticky-header',
    'reading-progress',
    'scroll-spy',
    'hide-on-scroll'
  ],
  FormPlaygrounds: [
    'button',
    'badge',
    'peek-rating',
    'floating-input',
    'otp-input',
    'tag-input',
    'password-input',
    'expanding-search',
    'input',
    'textarea',
    'dropdown',
    'select',
    'switch',
    'checkbox'
  ],
  FeedbackPlaygrounds: [
    'dialog',
    'alert',
    'toast',
    'spinner',
    'modal',
    'tooltip',
    'command-palette',
    'collapsible-banner',
    'lightbox'
  ],
  AIPlaygrounds: [
    'issue-board',
    'ai-approval-card',
    'ai-prompt-bar',
    'ai-code-block',
    'ai-fine-tune-card',
    'task-steps'
  ],
  MediaPlaygrounds: [
    'card',
    'avatar',
    'stat',
    'liquid-glass-sheet',
    'card-coverflow',
    'card-carousel',
    'presence-avatars',
    'accordion',
    'filter-grid',
    'poll-results',
    'reorder-list',
    'logo-marquee',
    'blur-up-image',
    'show-more'
  ],
  ChartPlaygrounds: [
    'interactive-controls',
    'motion-loaders',
    'load-more',
    'mono-charts'
  ]
};

// Check that every component is assigned
const assigned = new Set();
for (const cat in CATEGORIES) {
  for (const id of CATEGORIES[cat]) {
    if (!components[id]) {
      console.error(`Component not found in file: ${id}`);
    }
    assigned.add(id);
  }
}
for (const id in components) {
  if (!assigned.has(id)) {
    console.error(`Unassigned component: ${id}`);
  }
}
console.log('All components assigned properly! Total:', assigned.size);
