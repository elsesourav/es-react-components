import React, { useMemo } from 'react';
import { ComponentDoc } from './data/types';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { AICodeBlock } from '@/components/ui/ai-code-block';
import { FileCode, BookOpen, Layers, Terminal } from 'lucide-react';

export interface ComponentMarkdownDocProps {
  component: ComponentDoc;
}

export const ComponentMarkdownDoc: React.FC<ComponentMarkdownDocProps> = ({ component }) => {
  const [docTab, setDocTab] = React.useState<'markdown' | 'source'>('markdown');

  const markdownContent = useMemo(() => {
    const cleanCompName = component.name.replace(/[^a-zA-Z0-9]/g, '');
    const isInteractiveTag =
      component.name.includes('Tabs') ||
      component.name.includes('Slider') ||
      component.name.includes('Switch') ||
      component.name.includes('Counter') ||
      component.name.includes('Picker');

    const componentInstanceSnippet = isInteractiveTag
      ? `<${cleanCompName} />`
      : `<${cleanCompName}>Interactive Component</${cleanCompName}>`;

    return `
# ${component.name}

> ${component.description}

---

## 1. Installation & Import

Add the component to your project or import directly from the library bundle:

\`\`\`bash
pnpm add es-react-components motion
\`\`\`

Import statement for your application components:

\`\`\`tsx
${component.importCode}
\`\`\`

---

## 2. Quick Start / How to Use

A standard, copy-paste ready example using React 19:

\`\`\`tsx
${component.usageCode}
\`\`\`

---

## 3. Real-World Use Case

This production pattern demonstrates dynamic state handling, keyboard navigation, and theme token styling:

\`\`\`tsx
import React, { useState } from 'react';
${component.importCode}

export function ${cleanCompName}Showcase() {
  const [activeValue, setActiveValue] = useState<string | number>('primary');
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <section className="p-6 rounded-2xl bg-surface border border-border space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h3 className="text-sm font-bold text-foreground">
          ${component.name} Interactive Workspace
        </h3>
        <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
          React 19 • WAI-ARIA
        </span>
      </div>

      <div className="py-2 flex items-center gap-3">
        ${componentInstanceSnippet}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Subscribes to dynamic HSL tokens. Fully accessible with keyboard navigation and fluid motion springs.
      </p>
    </section>
  );
}
\`\`\`

---

## 4. Component Properties & Types

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
${component.props.map((p) => `| \`${p.name}\` | \`${p.type}\` | \`${p.defaultVal || '-'}\` | ${p.description} |`).join('\n')}

---

## 5. Design System Tokens & Theming

This component automatically inherits colors and radius values from the design token engine:

${component.themeTokens.map((t) => `- **\`${t}\`**: Registered HSL token for theme switching and dark mode`).join('\n')}
`.trim();
  }, [component]);

  return (
    <div className="space-y-6">
      {/* Sub-Tabs for Markdown Documentation vs Raw Code View */}
      <div className="flex items-center justify-between gap-4">
        <Tabs
          variant="segmented"
          activeTab={docTab}
          onChange={(tab) => setDocTab(tab as any)}
          tabs={[
            {
              id: 'markdown',
              label: 'Markdown Guide & Use Cases',
              icon: <BookOpen className="h-3.5 w-3.5" />,
            },
            {
              id: 'source',
              label: 'Implementation Snippet',
              icon: <FileCode className="h-3.5 w-3.5" />,
            },
          ]}
        />

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Terminal className="size-3 text-primary" />
          <span>MD Format Documentation</span>
        </div>
      </div>

      {docTab === 'markdown' ? (
        <Card className="p-6 sm:p-8 bg-surface/50 border border-border/80">
          <MarkdownRenderer
            content={markdownContent}
            className="text-foreground max-w-none"
          />
        </Card>
      ) : (
        <Card className="p-4 sm:p-6 space-y-4 bg-surface/50 border border-border/80">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {component.name} Code Implementation
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {component.id}-example.tsx
            </span>
          </div>
          <AICodeBlock
            code={component.usageCode}
            filename={`${component.id}-example.tsx`}
          />
        </Card>
      )}
    </div>
  );
};
