import React, { useMemo } from 'react';
import { ComponentDoc } from './data/types';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Card } from '@/components/ui/card';

export interface ComponentMarkdownDocProps {
  component: ComponentDoc;
}

export const ComponentMarkdownDoc: React.FC<ComponentMarkdownDocProps> = ({ component }) => {
  const markdownContent = useMemo(() => {
    const propsRows = component.props && component.props.length > 0
      ? component.props.map((p) => `| \`${p.name}\` | \`${p.type}\` | \`${p.defaultVal || '-'}\` | ${p.description} |`).join('\n')
      : '| `className` | `string` | `-` | Optional CSS class styling |';

    return `
## 1. Installation & Import

\`\`\`bash
pnpm add es-react-components motion
\`\`\`

\`\`\`tsx
${component.importCode}
\`\`\`

## 2. Usage Example

\`\`\`tsx
${component.usageCode}
\`\`\`

## 3. Properties & API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
${propsRows}
`.trim();
  }, [component]);

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
