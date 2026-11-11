/**
 * Component Source Code Registry
 *
 * Uses Vite's eager ?raw glob to automatically load live raw source code for all UI components.
 * Any code updates made in `src/components/ui/*.tsx` are instantly and automatically
 * reflected in both local dev (HMR) and production builds without manual sync.
 */

const rawModules = import.meta.glob<string>('/src/components/ui/*.{tsx,ts}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * Custom ID to filename overrides where the showcase component ID differs from the base filename.
 */
const COMPONENT_FILE_OVERRIDES: Record<string, string> = {
  'floating-input': 'floating-label-input.tsx',
  'inline-validation': 'inline-validation-input.tsx',
};

export interface ComponentSourceInfo {
  filename: string;
  filepath: string;
  code: string;
  lineCount: number;
}

/**
 * Retrieve the live raw source code for any given component ID.
 */
export function getComponentSource(componentId: string): ComponentSourceInfo | null {
  const targetFilename = COMPONENT_FILE_OVERRIDES[componentId] || `${componentId}.tsx`;
  const primaryPath = `/src/components/ui/${targetFilename}`;

  if (rawModules[primaryPath]) {
    const code = rawModules[primaryPath].trim();
    return {
      filename: targetFilename,
      filepath: `src/components/ui/${targetFilename}`,
      code,
      lineCount: code.split('\n').length,
    };
  }

  // Fallback to .ts extension if .tsx was not found
  const tsFilename = `${componentId}.ts`;
  const tsPath = `/src/components/ui/${tsFilename}`;
  if (rawModules[tsPath]) {
    const code = rawModules[tsPath].trim();
    return {
      filename: tsFilename,
      filepath: `src/components/ui/${tsFilename}`,
      code,
      lineCount: code.split('\n').length,
    };
  }

  return null;
}
