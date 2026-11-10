import React, { useState } from 'react';
import { ComponentDoc } from './componentsData';
import { ComponentPlaygrounds } from './ComponentPlaygrounds';
import {
  Tabs,
  Badge,
  Button,
  Card,
  AICodeBlock,
  Tooltip,
  Logo,
} from '@/components/ui';
import { Terminal, Sliders, Code2, BookOpen, Check, Copy, Palette, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { useTheme } from '@/theme/ThemeContext';

export const ComponentDocView: React.FC<{ component: ComponentDoc }> = ({
  component,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'props' | 'theme'>('preview');
  const [copiedImport, setCopiedImport] = useState(false);
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

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* Component Header with Brand Breadcrumbs */}
      <div className="space-y-3 sm:space-y-4 border-b border-border/80 pb-4 sm:pb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <Logo size={14} variant="badge" className="shrink-0" />
            <span>Components</span>
          </span>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <span>{component.category}</span>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <span className="text-foreground font-semibold">{component.name}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {component.name}
          </h1>
          <Badge variant="primary">{component.category}</Badge>
          <Badge variant="outline">{component.themeTokens.length} Tokens</Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          {component.description}
        </p>

        {/* Quick Import Snippet */}
        <div className="flex items-center justify-between p-2 px-3 sm:px-4 rounded-xl bg-surface border border-border/80 max-w-xl shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground overflow-x-auto py-1">
            <Terminal className="h-4 w-4 text-primary shrink-0" />
            <span className="text-foreground">{component.importCode}</span>
          </div>
          <Tooltip label="Copy import statement">
            <Button
              size="xs"
              variant="ghost"
              onClick={handleCopyImport}
              className="ml-2 shrink-0"
            >
              {copiedImport ? (
                <Check className="h-3.5 w-3.5 text-success" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </Tooltip>
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
            icon: <Palette className="h-4 w-4" />,
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Production Usage Example</h3>
                <p className="text-xs text-muted-foreground">Drop-in TypeScript JSX implementation for {component.name}.</p>
              </div>
            </div>
            <AICodeBlock
              filename={`${component.id}.example.tsx`}
              lines={component.usageCode.split('\n')}
            />
          </div>
        )}

        {activeTab === 'props' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Component Properties & Types</h3>
                <p className="text-xs text-muted-foreground">Comprehensive API interface reference for {component.name}.</p>
              </div>
              <Badge variant="outline" size="sm">{component.props.length} Properties</Badge>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-xs">
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
                          <Badge variant="secondary" size="sm" className="font-mono text-[11px]">
                            {p.type}
                          </Badge>
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
            <div>
              <h3 className="text-sm font-semibold text-foreground">Theme Token Dependencies</h3>
              <p className="text-xs text-muted-foreground">
                These CSS custom properties govern the rendering of <span className="text-primary font-bold">{component.name}</span>. Modify them dynamically in the Theme Customizer.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {component.themeTokens.map((tok) => (
                <Card key={tok} className="p-3.5 bg-surface border border-border shadow-xs">
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono font-semibold text-primary">
                      {tok}
                    </code>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                      {tok === '--primary'
                        ? colors.primary
                        : tok === '--border'
                        ? colors.border
                        : tok === '--radius' || tok === '--radius-md' || tok === '--radius-xl'
                        ? `${colors.radius}px`
                        : 'HSL Token'}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
