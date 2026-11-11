import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  QuantityCounter,
  Badge,
  useToast,
} from '@/components/ui';
import { Sparkles, Hash } from 'lucide-react';

export const QuantityCounterPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [featuredQty, setFeaturedQty] = useState(4);
  const [cartQty, setCartQty] = useState(2);
  const [ramAllocation, setRamAllocation] = useState(16);
  const [audioChannels, setAudioChannels] = useState(2);
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. Featured Showcase Card (Preview First) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border flex flex-col items-center justify-center gap-5 text-center relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-2">
          <Hash className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            16. Quantity Counter
          </span>
        </div>

        <div className="py-4">
          <QuantityCounter
            value={featuredQty}
            min={1}
            max={10}
            step={1}
            size={selectedSize}
            disabled={isDisabled}
            onChange={(val) => {
              setFeaturedQty(val);
              addToast({
                title: `Quantity: ${val}`,
                description: `Updated quantity count to ${val}.`,
                type: 'info',
              });
            }}
          />
        </div>

        <p className="text-xs text-muted-foreground max-w-sm">
          Rounded pill counter container with tactile button press physics, spring animated numeric digit transitions, accessible spinbutton ARIA, and boundary enforcement.
        </p>
      </div>

      {/* 2. Configuration Toolbar (Controls Second) */}
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Quantity Counter Controls</span>
          <Badge size="sm" variant="outline" className="font-mono text-[10px]">
            Value: {featuredQty}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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

      {/* 3. Practical Production Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Variant 1: Shopping Cart Items */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-between gap-4 min-h-[180px]">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Order Basket
            </span>
            <p className="text-[11px] text-muted-foreground">Unit suffix with item bounds</p>
          </div>

          <QuantityCounter
            value={cartQty}
            min={1}
            max={20}
            step={1}
            unit="x"
            size={selectedSize}
            disabled={isDisabled}
            onChange={(val) => setCartQty(val)}
          />

          <span className="font-mono text-xs text-foreground font-semibold">
            In Cart: {cartQty} items
          </span>
        </div>

        {/* Variant 2: Stepped Memory Allocation */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-between gap-4 min-h-[180px]">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              RAM Stepper (+4 GB)
            </span>
            <p className="text-[11px] text-muted-foreground">Discrete step increments</p>
          </div>

          <QuantityCounter
            value={ramAllocation}
            min={4}
            max={64}
            step={4}
            unit="GB"
            size={selectedSize}
            disabled={isDisabled}
            onChange={(val) => setRamAllocation(val)}
          />

          <span className="font-mono text-xs text-foreground font-semibold">
            Allocated: {ramAllocation} GB
          </span>
        </div>

        {/* Variant 3: Audio Channel Matrix */}
        <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-between gap-4 min-h-[180px]">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Audio Bus Channels
            </span>
            <p className="text-[11px] text-muted-foreground">Multi-channel routing (1-8)</p>
          </div>

          <QuantityCounter
            value={audioChannels}
            min={1}
            max={8}
            step={1}
            size={selectedSize}
            disabled={isDisabled}
            onChange={(val) => setAudioChannels(val)}
          />

          <span className="font-mono text-xs text-foreground font-semibold">
            Active: {audioChannels} Ch
          </span>
        </div>
      </div>
    </div>
  );
};
