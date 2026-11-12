import React, { useMemo } from 'react';
import { ComponentDoc } from './data/types';
import { getComponentSource } from './data/componentSources';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Card } from '@/components/ui/card';

export interface ComponentMarkdownDocProps {
  component: ComponentDoc;
}

export const ComponentMarkdownDoc: React.FC<ComponentMarkdownDocProps> = ({ component }) => {
  const sourceInfo = useMemo(() => getComponentSource(component.id), [component.id]);

  const markdownContent = useMemo(() => {
    const propsRows = component.props && component.props.length > 0
      ? component.props.map((p) => {
          const propName = p.name ? `\`${p.name}\`` : '`-`';
          const propType = p.type ? `\`${p.type}\`` : '`-`';
          const propDefault = p.defaultVal ? `\`${p.defaultVal}\`` : '`-`';
          const propDesc = (p.description || '-').replace(/\|/g, '\\|');
          return `| ${propName} | ${propType} | ${propDefault} | ${propDesc} |`;
        }).join('\n')
      : '| `className` | `string` | `-` | Optional CSS class styling |';

    const sourceCode = sourceInfo?.code || component.usageCode;
    const sourceFilename = sourceInfo?.filename || `${component.id}.tsx`;
    const sourceFilepath = sourceInfo?.filepath || `src/components/ui/${sourceFilename}`;
    const lineCount = sourceInfo?.lineCount || sourceCode.split('\n').length;

    // Use 4 backticks if inner code contains triple backticks to prevent premature fence closing
    const fence = sourceCode.includes('```') ? '````' : '```';

    return `
## 1. Installation & Import

\`\`\`bash
npm i @elsesourav/react-ui
\`\`\`

\`\`\`tsx
${component.importCode}
\`\`\`

## 2. Usage Example

\`\`\`tsx
${component.usageCode}
\`\`\`

## 3. Source Code (\`${sourceFilepath}\` · ${lineCount} lines)

${fence}tsx
${sourceCode}
${fence}

## 4. Properties & API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
${propsRows}
`.trim();
  }, [component, sourceInfo]);

  return (
    <div className="space-y-4">
      <Card className="p-5 sm:p-7 bg-surface/50 border border-border/80">
        <MarkdownRenderer
          content={markdownContent}
          className="text-foreground max-w-none"
        />
      </Card>
    </div>
  );
};
