import React from 'react';
import { Badge, TreeView, TreeNode } from '../ui';
import { ChevronsUpDown } from 'lucide-react';

export interface AppSidebarProps {
  treeNodes: TreeNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  expandedCategories: string[];
  onExpandedChange: (expanded: string[]) => void;
  totalComponents: number;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  treeNodes,
  selectedId,
  onSelect,
  expandedCategories,
  onExpandedChange,
  totalComponents,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const branchIds = React.useMemo(() => {
    return treeNodes
      .filter((n) => n.children && n.children.length > 0)
      .map((n) => n.id);
  }, [treeNodes]);

  const hasExpanded = expandedCategories.length > 0;

  const handleToggle = () => {
    if (hasExpanded) {
      onExpandedChange([]);
    } else {
      // Expand all categories for comprehensive, jump-free browsing
      onExpandedChange(branchIds);
    }
  };

  // Keep active node visible without shifting sidebar position
  React.useEffect(() => {
    if (!selectedId || !scrollContainerRef.current) return;
    const activeEl = scrollContainerRef.current.querySelector<HTMLElement>(
      `[data-id="${selectedId}"], [aria-selected="true"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedId]);

  return (
    <aside className="w-64 shrink-0 hidden md:block self-start sticky top-14 h-[calc(100vh-3.5rem)] pt-6 pb-4 z-20 box-border">
      <div className="h-full flex flex-col gap-2.5 pb-2">
        {/* Pinned Header */}
        <div className="flex items-center justify-between px-1.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
              Component Tree
            </span>
            <Badge size="sm" variant="outline" className="font-mono text-[10px] px-1.5 py-0 h-4 min-w-4 flex items-center justify-center">
              {totalComponents}
            </Badge>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className="text-[11px] text-muted-foreground hover:text-foreground font-medium flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-surface border border-transparent hover:border-border/80 transition-colors cursor-pointer select-none"
            title={hasExpanded ? 'Collapse all categories' : 'Expand all categories'}
            aria-label={hasExpanded ? 'Collapse all categories' : 'Expand all categories'}
          >
            <ChevronsUpDown className="size-3 text-muted-foreground" />
            <span>{hasExpanded ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>

        {/* Tree Container with Internal Scroll */}
        <div className="flex-1 min-h-0 rounded-2xl bg-surface/60 border border-border/80 shadow-xs flex flex-col overflow-hidden backdrop-blur-xs">
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-border/80 hover:scrollbar-thumb-primary/50 scrollbar-track-transparent"
          >
            <TreeView
              label="Component Directory Tree"
              nodes={treeNodes}
              selected={selectedId || '__overview__'}
              onSelectedChange={onSelect}
              expanded={expandedCategories}
              onExpandedChange={onExpandedChange}
              accordion={false}
              className="border-none bg-transparent p-0 shadow-none"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
