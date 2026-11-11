#!/usr/bin/env node

/**
 * sync_component_sources.cjs
 *
 * Automatically scans UI components in `src/components/ui/`, validates mappings against
 * showcase data definitions, and ensures all component source code is verified and synced.
 */

const fs = require('fs');
const path = require('path');

const UI_DIR = path.resolve(__dirname, '../src/components/ui');
const DATA_DIR = path.resolve(__dirname, '../src/showcase/data');
const OUTPUT_INFO = path.resolve(__dirname, '../src/showcase/data/componentSourceMap.json');

const OVERRIDES = {
  'floating-input': 'floating-label-input.tsx',
  'inline-validation': 'inline-validation-input.tsx',
};

function main() {
  console.log('🔄 Scanning UI component sources in src/components/ui...');
  const uiFiles = fs.readdirSync(UI_DIR);

  // Scan all data files for component IDs
  const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.ts') && f !== 'types.ts');
  const components = [];

  for (const file of dataFiles) {
    const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    const regex = /id:\s*['"]([a-zA-Z0-9_-]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*category:/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      components.push({
        id: match[1],
        name: match[2],
        sourceDataFile: file,
      });
    }
  }

  console.log(`📦 Found ${components.length} registered showcase components.`);

  const report = {};
  let resolvedCount = 0;
  let missingCount = 0;

  for (const comp of components) {
    const filename = OVERRIDES[comp.id] || `${comp.id}.tsx`;
    let targetPath = path.join(UI_DIR, filename);

    if (!fs.existsSync(targetPath)) {
      const tsVariant = `${comp.id}.ts`;
      if (fs.existsSync(path.join(UI_DIR, tsVariant))) {
        targetPath = path.join(UI_DIR, tsVariant);
      }
    }

    if (fs.existsSync(targetPath)) {
      const stats = fs.statSync(targetPath);
      const lines = fs.readFileSync(targetPath, 'utf8').split('\n').length;
      report[comp.id] = {
        name: comp.name,
        filename: path.basename(targetPath),
        filepath: path.relative(path.resolve(__dirname, '..'), targetPath),
        lines,
        bytes: stats.size,
      };
      resolvedCount++;
    } else {
      console.warn(`⚠️ Warning: No source code file found for component ID "${comp.id}" (${comp.name})`);
      missingCount++;
    }
  }

  // Write index metadata
  fs.writeFileSync(OUTPUT_INFO, JSON.stringify(report, null, 2), 'utf8');
  console.log(`✅ Synced ${resolvedCount} component source code mappings -> ${path.relative(process.cwd(), OUTPUT_INFO)}`);
  if (missingCount > 0) {
    console.warn(`⚠️ ${missingCount} components had missing source mappings.`);
  } else {
    console.log('✨ All showcase components have verified source files.');
  }
}

main();
