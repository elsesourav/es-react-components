import React, { useState } from 'react';
import { ComponentDoc } from './componentsData';
import { ComponentPlaygrounds } from './ComponentPlaygrounds';
import { ComponentMarkdownDoc } from './ComponentMarkdownDoc';
import {
  Tabs,
  Badge,
  Tooltip,
} from '@/components/ui';
import { Terminal, Sliders, Code2, Check, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { useTheme } from '@/theme/ThemeContext';

export interface ComponentDocViewProps {
  component: ComponentDoc;
  onSelectOverview?: () => void;
}

export const ComponentDocView: React.FC<ComponentDocViewProps> = ({
  component,
  onSelectOverview,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
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

  const handleBreadcrumbClick = () => {
    if (onSelectOverview) {
      onSelectOverview();
    } else if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('component');
      window.history.pushState({}, '', url.toString());
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* Component Hero & Title Section (Matching Reference Image 2) */}
      <div className="space-y-2.5 sm:space-y-3.5 border-b border-border/70 pb-5 sm:pb-6">
        {/* Category & Version Metadata Tag (Matching Reference Image 2: "Gesture · 09.3") */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="font-semibold text-foreground/80">{component.category}</span>
          <span className="text-muted-foreground/40 select-none">·</span>
          <span className="text-primary font-medium">v1.0</span>
          <span className="text-muted-foreground/40 select-none">·</span>
          <span className="text-muted-foreground/70">React 19</span>
        </div>

        {/* Remade Title & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {component.name}
            </h1>
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              {component.themeTokens.length} Tokens
            </Badge>
            <Badge variant="secondary" size="sm" className="font-mono text-[10px] hidden sm:inline-flex">
              {component.props.length} Props
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          {component.description}
        </p>

        {/* Quick Import Snippet Box */}
        <div className="flex items-center justify-between gap-2 p-2 px-3 sm:px-4 rounded-xl bg-surface border border-border/80 max-w-xl shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground overflow-x-auto py-0.5">
            <Terminal className="size-3.5 text-primary shrink-0" />
            <span className="text-foreground select-all whitespace-nowrap">{component.importCode}</span>
          </div>
          <Tooltip label="Copy import statement">
            <button
              type="button"
              onClick={handleCopyImport}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors shrink-0 cursor-pointer"
              aria-label="Copy import statement"
            >
              {copiedImport ? (
                <Check className="size-3.5 text-success" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Clean 2-Section Tabs Navigation (Matching User Request) */}
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
        ]}
      />

      {/* Tab Panels */}
      {activeTab === 'preview' && (
        <ComponentPlaygrounds componentId={component.id} />
      )}

      {activeTab === 'code' && (
        <ComponentMarkdownDoc component={component} />
      )}
    </div>
  );
};
