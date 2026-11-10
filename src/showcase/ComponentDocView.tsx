import React, { useState } from 'react';
import { ComponentDoc } from './componentsData';
import { ComponentPlaygrounds } from './ComponentPlaygrounds';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Terminal, Sliders, Code2, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { useTheme } from '@/theme/ThemeContext';

export const ComponentDocView: React.FC<{ component: ComponentDoc }> = ({
  component,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'props' | 'theme'>('preview');
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);
  const { addToast } = useToast();
  const { colors } = useTheme();

  const handleCopyImport = () => {
    navigator.clipboard.writeText(component.importCode);
    setCopiedImport(true);
    addToast({
      title: 'Copied import statement!',
      description: component.importCode,
      type: 'info',
    });
    setTimeout(() => setCopiedImport(false), 2000);
  };

  const handleCopyUsage = () => {
    navigator.clipboard.writeText(component.usageCode);
    setCopiedUsage(true);
    addToast({
      title: 'Copied usage code snippet!',
      type: 'success',
    });
    setTimeout(() => setCopiedUsage(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Component Header */}
      <div className="space-y-4 border-b border-border/80 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {component.name}
          </h1>
          <Badge variant="primary">{component.category}</Badge>
        </div>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          {component.description}
        </p>

        {/* Quick Import Snippet */}
        <div className="flex items-center justify-between p-3 px-4 rounded-xl bg-surface border border-border/80 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground overflow-x-auto">
            <Terminal className="h-4 w-4 text-primary shrink-0" />
            <span className="text-foreground">{component.importCode}</span>
          </div>
          <button
            onClick={handleCopyImport}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors"
            title="Copy import statement"
          >
            {copiedImport ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs
        variant="segmented"
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId as any)}
        tabs={[
          {
            id: 'preview',
            label: 'Interactive Preview',
            icon: <Sliders className="h-4 w-4" />,
          },
          {
            id: 'code',
            label: 'Usage & Code',
            icon: <Code2 className="h-4 w-4" />,
          },
          {
            id: 'props',
            label: 'Props & API',
            icon: <BookOpen className="h-4 w-4" />,
            badge: component.props.length,
          },
          {
            id: 'theme',
            label: 'Theme Tokens',
            badge: component.themeTokens.length,
          },
        ]}
      />

      {/* Tab Panels */}
      <div>
        {activeTab === 'preview' && (
          <ComponentPlaygrounds componentId={component.id} />
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Example Implementation
              </span>
              <button
                onClick={handleCopyUsage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border hover:bg-surface-elevated text-foreground transition-colors"
              >
                {copiedUsage ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-success" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <pre className="p-5 rounded-2xl bg-surface border border-border font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
              <code>{component.usageCode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'props' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Component Properties Reference
            </span>
            <div className="rounded-2xl border border-border overflow-hidden bg-surface">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-subtle border-b border-border text-muted-foreground uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Prop</th>
                      <th className="py-3 px-4 font-semibold">Type</th>
                      <th className="py-3 px-4 font-semibold">Default</th>
                      <th className="py-3 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {component.props.map((p) => (
                      <tr key={p.name} className="hover:bg-surface-subtle/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-semibold text-primary">
                          {p.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-muted-foreground">
                          {p.type}
                        </td>
                        <td className="py-3 px-4 font-mono text-foreground/80">
                          {p.defaultVal}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground leading-relaxed">
                          {p.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Associated CSS Custom Properties
            </span>
            <p className="text-xs text-muted-foreground">
              These CSS variables govern the rendering of <span className="text-primary font-bold">{component.name}</span>. Modify them using the floating Theme Editor in the lower right.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {component.themeTokens.map((tok) => (
                <div
                  key={tok}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-border"
                >
                  <code className="text-xs font-mono font-semibold text-primary">
                    {tok}
                  </code>
                  <span className="text-xs text-muted-foreground font-mono">
                    {tok === '--primary'
                      ? colors.primary
                      : tok === '--border'
                      ? colors.border
                      : tok === '--radius-md' || tok === '--radius-xl'
                      ? `${colors.radius}px`
                      : 'CSS Token'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
