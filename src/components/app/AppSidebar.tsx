import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Badge, TreeView, TreeNode, Logo } from '../ui';
import { Search, ChevronDown, ChevronRight, ChevronsUpDown, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [filterQuery, setFilterQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const filterInputRef = useRef<HTMLInputElement>(null);

  const branchIds = useMemo(() => {
    return treeNodes
      .filter((n) => n.children && n.children.length > 0)
      .map((n) => n.id);
  }, [treeNodes]);

  const hasExpanded = expandedCategories.length > 0;

  const handleToggleAll = () => {
    if (hasExpanded) {
      onExpandedChange([]);
    } else {
      onExpandedChange(branchIds);
    }
  };

  // Listen for '/' key to focus sidebar filter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        filterInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tree nodes based on filterQuery
  const filteredNodes = useMemo(() => {
    if (!filterQuery.trim()) return treeNodes;
    const q = filterQuery.toLowerCase();

    return treeNodes
      .map((node) => {
        if (node.id === '__overview__') {
          return node.label.toLowerCase().includes(q) ? node : null;
        }

        const matchingChildren = node.children?.filter((child) =>
          child.label.toLowerCase().includes(q)
        );

        if (matchingChildren && matchingChildren.length > 0) {
          return {
            ...node,
            children: matchingChildren,
            meta: `${matchingChildren.length}`,
          };
        }

        if (node.label.toLowerCase().includes(q)) {
          return node;
        }

        return null;
      })
      .filter(Boolean) as TreeNode[];
  }, [treeNodes, filterQuery]);

  // Auto-expand all categories when searching
  useEffect(() => {
    if (filterQuery.trim()) {
      onExpandedChange(branchIds);
    }
  }, [filterQuery, branchIds, onExpandedChange]);

  // Keep active node visible without jumping
  useEffect(() => {
    if (!selectedId || !scrollContainerRef.current) return;
    const activeEl = scrollContainerRef.current.querySelector<HTMLElement>(
      `[data-id="${selectedId}"], [aria-selected="true"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedId]);

  return (
    <aside className="w-64 lg:w-72 shrink-0 hidden md:flex flex-col h-screen sticky top-0 border-r border-border/70 bg-surface/30 backdrop-blur-md z-30 select-none">
      {/* 1. Brand Header (Matching Reference Image 2 Top-Left) */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border/60 shrink-0">
        <button
          type="button"
          onClick={() => onSelect('__overview__')}
          className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer min-w-0"
          aria-label="es-react-components overview"
        >
          <Logo
            size={24}
            variant="badge"
            className="shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs"
          />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-bold text-sm tracking-tight text-foreground truncate">
              es-react-components
            </span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded font-mono text-[9px] font-bold bg-primary/10 text-primary border border-primary/20 shrink-0">
              v1.0
            </span>
          </div>
        </button>
      </div>

      {/* 2. Quick Filter Search Bar (Matching Reference Image 2 Filter with '/' shortcut) */}
      <div className="px-3 pt-3 pb-2 shrink-0">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 size-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={filterInputRef}
            type="text"
            placeholder="Filter components..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full h-8 pl-8 pr-7 text-xs rounded-lg border border-border/70 bg-surface-subtle/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-surface transition-all"
          />
          {filterQuery ? (
            <button
              type="button"
              onClick={() => setFilterQuery('')}
              className="absolute right-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              ×
            </button>
          ) : (
            <kbd className="absolute right-2 px-1 py-0.5 rounded border border-border/80 bg-surface text-[9px] font-mono text-muted-foreground pointer-events-none">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* 3. Sub-header: Expand/Collapse All Toggle */}
      <div className="px-3.5 py-1.5 flex items-center justify-between text-xs text-muted-foreground shrink-0 border-b border-border/40">
        <button
          type="button"
          onClick={handleToggleAll}
          className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
        >
          <ChevronsUpDown className="size-3" />
          <span>{hasExpanded ? 'Collapse all' : 'Expand all'}</span>
        </button>
        <span className="text-[10px] font-mono text-muted-foreground/80">
          {totalComponents} items
        </span>
      </div>

      {/* 4. Compact Tree Navigation List */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-border/80 hover:scrollbar-thumb-primary/50 scrollbar-track-transparent space-y-0.5"
      >
        <TreeView
          label="Component Directory"
          nodes={filteredNodes}
          selected={selectedId || '__overview__'}
          onSelectedChange={onSelect}
          expanded={expandedCategories}
          onExpandedChange={onExpandedChange}
          accordion={false}
          className="border-none bg-transparent p-0 shadow-none text-xs"
        />
      </div>

      {/* 5. Minimal Sidebar Footer */}
      <div className="h-10 px-3.5 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground shrink-0 bg-surface/20">
        <span className="truncate">React 19 • Tailwind CSS</span>
        <span className="text-[10px] text-primary/80">Active</span>
      </div>
    </aside>
  );
};
