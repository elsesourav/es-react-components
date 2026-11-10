const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/showcase/ComponentPlaygrounds.tsx');
// Read the original backup or read from git if needed
let content;
try {
  content = fs.readFileSync(path.join(__dirname, '../src/showcase/ComponentPlaygrounds.original.tsx'), 'utf8');
} catch {
  // If not backed up, let's read via git show
  const { execSync } = require('child_process');
  content = execSync('git show HEAD:src/showcase/ComponentPlaygrounds.tsx', { encoding: 'utf8' });
  fs.writeFileSync(path.join(__dirname, '../src/showcase/ComponentPlaygrounds.original.tsx'), content, 'utf8');
}

const sourceFile = ts.createSourceFile('ComponentPlaygrounds.tsx', content, ts.ScriptTarget.Latest, true);

// 1. Extract imports from sourceFile (excluding react import so we don't duplicate)
const importNodes = [];
let funcBody = null;

ts.forEachChild(sourceFile, node => {
  if (ts.isImportDeclaration(node)) {
    const text = node.getText(sourceFile);
    if (!text.includes("from 'react'") && !text.includes('from "react"')) {
      importNodes.push(text);
    }
  } else if (ts.isVariableStatement(node)) {
    for (const decl of node.declarationList.declarations) {
      if (decl.name.text === 'ComponentPlaygrounds') {
        funcBody = decl.initializer.body;
      }
    }
  }
});

const allImportsText = [
  "import React, { useState, useRef, useEffect, useLayoutEffect, useId } from 'react';",
  ...importNodes
].join('\n');

// 2. Extract topVarStmts and ifStmts
const topVarStmts = [];
const ifStmts = [];

let idx = 0;
funcBody.statements.forEach(stmt => {
  if (ts.isIfStatement(stmt)) {
    const cond = stmt.expression.getText(sourceFile);
    const m = cond.match(/componentId === '([^']+)'/);
    if (m) {
      // The body of the if statement
      let bodyText = stmt.thenStatement.getText(sourceFile);
      if (bodyText.startsWith('{') && bodyText.endsWith('}')) {
        bodyText = bodyText.slice(1, -1).trim();
      }
      ifStmts.push({ id: m[1], bodyText });
    }
  } else if (ts.isVariableStatement(stmt)) {
    const names = [];
    for (const decl of stmt.declarationList.declarations) {
      if (ts.isIdentifier(decl.name)) {
        names.push(decl.name.text);
      } else if (ts.isArrayBindingPattern(decl.name)) {
        for (const elem of decl.name.elements) {
          if (ts.isBindingElement(elem) && ts.isIdentifier(elem.name)) {
            names.push(elem.name.text);
          }
        }
      } else if (ts.isObjectBindingPattern(decl.name)) {
        for (const elem of decl.name.elements) {
          if (ts.isBindingElement(elem) && ts.isIdentifier(elem.name)) {
            names.push(elem.name.text);
          }
        }
      }
    }
    topVarStmts.push({ index: idx++, stmt, names, text: stmt.getText(sourceFile) });
  }
});

// Helper to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Playground';
}

// 3. Define Categories
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

const playgroundsDir = path.join(__dirname, '../src/showcase/playgrounds');
fs.mkdirSync(playgroundsDir, { recursive: true });

const exportsPerFile = {};

for (const [fileName, compIds] of Object.entries(CATEGORIES)) {
  const componentOutputs = [];
  exportsPerFile[fileName] = [];

  for (const compId of compIds) {
    const compObj = ifStmts.find(c => c.id === compId);
    if (!compObj) {
      console.error(`Component not found: ${compId}`);
      continue;
    }

    const compName = toPascalCase(compId);
    exportsPerFile[fileName].push({ compId, compName });

    // Find used variables
    let usedVars = topVarStmts.filter(v => {
      if (v.names.includes('addToast') || v.names.includes('preset') || v.names.includes('colors') || v.names.includes('isDark')) {
        return false;
      }
      return v.names.some(name => new RegExp('\\b' + name + '\\b').test(compObj.bodyText));
    });

    let changed = true;
    while (changed) {
      changed = false;
      for (const v of topVarStmts) {
        if (!usedVars.includes(v) && !v.names.includes('addToast') && !v.names.includes('preset')) {
          const needed = usedVars.some(uv => v.names.some(name => new RegExp('\\b' + name + '\\b').test(uv.text)));
          if (needed) {
            usedVars.push(v);
            changed = true;
          }
        }
      }
    }

    usedVars.sort((a, b) => a.index - b.index);
    const varDeclsText = usedVars.map(v => v.text).join('\n  ');

    // Build playground component
    const compCode = `export const ${compName}: React.FC = () => {
  const { addToast } = useToast();
  const { preset, colors, isDark } = useTheme();

  ${varDeclsText}

  ${compObj.bodyText}
};`;

    componentOutputs.push(compCode);
  }

  // Write file
  const fullFileContent = `${allImportsText}

${componentOutputs.join('\n\n')}
`;

  fs.writeFileSync(path.join(playgroundsDir, `${fileName}.tsx`), fullFileContent, 'utf8');
  console.log(`Generated ${fileName}.tsx with ${compIds.length} components`);
}

// 4. Generate src/showcase/playgrounds/index.ts
const indexExports = [];
for (const [fileName, items] of Object.entries(exportsPerFile)) {
  const names = items.map(i => i.compName).join(', ');
  indexExports.push(`export { ${names} } from './${fileName}';`);
}
fs.writeFileSync(path.join(playgroundsDir, 'index.ts'), indexExports.join('\n') + '\n', 'utf8');
console.log('Generated index.ts');

// 5. Generate new slim src/showcase/ComponentPlaygrounds.tsx
const allExportsList = [];
for (const items of Object.values(exportsPerFile)) {
  for (const item of items) {
    allExportsList.push(item);
  }
}

const routerCases = allExportsList
  .map(i => `    case '${i.compId}':\n      return <${i.compName} />;`)
  .join('\n');

const slimComponentPlaygrounds = `import React from 'react';
import {
  ${allExportsList.map(i => i.compName).join(',\n  ')}
} from './playgrounds';

export interface ComponentPlaygroundsProps {
  componentId: string;
}

export const ComponentPlaygrounds: React.FC<ComponentPlaygroundsProps> = ({ componentId }) => {
  switch (componentId) {
${routerCases}
    default:
      return null;
  }
};
`;

fs.writeFileSync(srcPath, slimComponentPlaygrounds, 'utf8');
console.log('Successfully rewrote ComponentPlaygrounds.tsx into a slim modular router!');
