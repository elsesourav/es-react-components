import React from 'react';
import { Badge, TreeView, TreeNode } from '../ui';

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
  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-[4.5rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto space-y-3 pr-2">
        <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center justify-between">
          <span>Component Tree</span>
          <Badge size="sm" variant="outline" className="font-mono text-[10px]">
            {totalComponents}
          </Badge>
        </div>

        <div className="p-2 rounded-2xl bg-surface/60 border border-border shadow-xs">
          <TreeView
            label="Component Directory Tree"
            nodes={treeNodes}
            selected={selectedId || '__overview__'}
            onSelectedChange={onSelect}
            expanded={expandedCategories}
            onExpandedChange={onExpandedChange}
          />
        </div>
      </div>
    </aside>
  );
};
