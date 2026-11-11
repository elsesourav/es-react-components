import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  SearchButton,
  AnimatedSearchPlaceholder,
  Badge,
  useToast,
  CommandPalette,
  type CommandItem,
} from '@/components/ui';
import { Search, Sparkles, Layers, Sliders, Command } from 'lucide-react';

export const SearchButtonPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedVariant, setSelectedVariant] = useState<'pill' | 'rounded'>('pill');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeScope, setActiveScope] = useState('All');

  const demoItems: CommandItem[] = [
    { id: '1', label: 'Button & Action System', hint: 'Buttons & Actions', icon: <Layers className="size-4 text-primary" /> },
    { id: '2', label: 'Parameter Slider & Scrubber', hint: 'Sliders & Range', icon: <Sliders className="size-4 text-primary" /> },
    { id: '3', label: 'Segmented A/B Tabs', hint: 'Navigation & Menus', icon: <Layers className="size-4 text-primary" /> },
    { id: '4', label: 'Quantity Counter Pill', hint: 'Checkbox & Switch', icon: <Layers className="size-4 text-primary" /> },
    { id: '5', label: 'Universal Markdown Editor', hint: 'Typography & Content', icon: <Layers className="size-4 text-primary" /> },
  ];

  const handleOpenSearch = () => {
    setIsCommandOpen(true);
    addToast({
      title: 'Global Search Triggered',
      description: 'Activated command overlay with animated placeholder.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Featured Search Component Card (Preview First) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center gap-6 text-center relative overflow-hidden shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Header Search Bar Trigger
            </span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md">
            Click the button below or press <kbd className="px-1.5 py-0.5 rounded bg-surface-subtle border border-border font-mono text-[10px]">⌘K</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-surface-subtle border border-border font-mono text-[10px]">/</kbd> anywhere on the page.
          </p>
        </div>

        <div className="w-full max-w-md py-2">
          <SearchButton
            onClick={handleOpenSearch}
            size={selectedSize}
            variant={selectedVariant}
            disabled={isDisabled}
            prefix="Search "
            words={[
              "69+ components",
              "buttons & inputs",
              "sliders & range",
              "charts & analytics",
              "AI & agentic UX",
              "spring modals",
            ]}
            sectionLabel="Components >"
            className="w-full"
          />
        </div>

        <p className="text-[11px] font-mono text-muted-foreground">
          Features vertical spring text carousel with reduced-motion fallback & theme token styling.
        </p>
      </div>

      {/* 2. Controls Toolbar (Controls Second) */}
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Search className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Top Search Controls</span>
          <Badge size="sm" variant="outline" className="font-mono text-[10px]">
            Global ⌘K
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Size Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Size:</span>
            <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-all cursor-pointer",
                    selectedSize === s
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Shape Variant Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Shape:</span>
            <div className="inline-flex rounded-lg border border-border bg-surface-subtle/50 p-0.5">
              {(['pill', 'rounded'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer",
                    selectedVariant === v
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Disabled State Toggle */}
          <button
            type="button"
            onClick={() => setIsDisabled((prev) => !prev)}
            className={cn(
              "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer",
              isDisabled
                ? "bg-destructive/15 border-destructive text-destructive font-semibold"
                : "border-border text-muted-foreground hover:text-foreground bg-surface-subtle/40"
            )}
          >
            {isDisabled ? "Disabled: ON" : "Disabled: OFF"}
          </button>
        </div>
      </div>

      {/* Production Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Variation 1: Contextual Section Scope */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-foreground">
              1. Breadcrumb / Scope Prefix
            </span>
            <p className="text-[11px] text-muted-foreground">
              Displays contextual hierarchy badges for nested workspace sections.
            </p>
          </div>

          <SearchButton
            onClick={handleOpenSearch}
            size="md"
            variant="pill"
            prefix="Search "
            words={["profile", "security keys", "billing", "sessions"]}
            sectionLabel="Account >"
          />

          <span className="text-[11px] font-mono text-muted-foreground">
            Prefix: Account &gt;
          </span>
        </div>

        {/* Variation 2: Minimal Rounded Input Style */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-foreground">
              2. Rounded Rectangular Variant
            </span>
            <p className="text-[11px] text-muted-foreground">
              Traditional input box border radius (`rounded-xl`) with shortcut badge.
            </p>
          </div>

          <SearchButton
            onClick={handleOpenSearch}
            size="md"
            variant="rounded"
            prefix="Find "
            words={["documentation", "API reference", "release notes"]}
          />

          <span className="text-[11px] font-mono text-muted-foreground">
            Shape: Rounded-XL
          </span>
        </div>

        {/* Variation 3: Standalone Animated Placeholder */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-foreground">
              3. Standalone Animated Placeholder
            </span>
            <p className="text-[11px] text-muted-foreground">
              Reusable rotating text ticker for custom banners, inputs, or hero headers.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-border/80 flex items-center justify-center font-medium text-xs text-foreground">
            <AnimatedSearchPlaceholder
              prefix="Explore "
              words={["Next.js apps", "React 19 widgets", "Tailwind tokens", "micro-gestures"]}
              interval={2000}
              className="text-primary font-semibold"
            />
          </div>

          <span className="text-[11px] font-mono text-muted-foreground">
            Interval: 2000ms
          </span>
        </div>
      </div>

      {/* Embedded Command Palette Demonstration */}
      <CommandPalette
        open={isCommandOpen}
        onDismiss={() => setIsCommandOpen(false)}
        items={demoItems}
        onSelect={(item) => {
          setIsCommandOpen(false);
          addToast({
            title: `Selected: ${item.label}`,
            description: `Navigating to ${item.hint}...`,
            type: 'success',
          });
        }}
        scopes={['All', 'Buttons & Actions', 'Sliders & Range', 'Navigation & Menus', 'Checkbox & Switch', 'Typography & Content']}
        activeScope={activeScope}
        onScopeChange={setActiveScope}
        placeholder="Type a component name or keyword..."
      />
    </div>
  );
};
