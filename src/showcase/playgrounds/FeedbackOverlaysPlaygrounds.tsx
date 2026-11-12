import React, { useState, useRef } from 'react';
import {
  Button,
  Modal,
  Tooltip,
  TooltipGroup,
  CommandPalette,
  Lightbox,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
  useToast,
} from '@/components/ui';
import { Copy, Users, Key, Globe, Maximize2 } from 'lucide-react';

export const ModalPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMaxWidth, setModalMaxWidth] = useState(520);
  const [showFooter, setShowFooter] = useState(true);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[220px] gap-4">
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Launch Modal Dialog
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Includes body scroll lock, backdrop blur, focus trap, and Escape key stacking.
        </p>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Scale Deployment Infrastructure"
          description="Allocate dynamic GPU cluster slices across 3 geographical regions."
          footer={
            showFooter ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setModalOpen(false);
                    addToast({
                      title: 'Cluster Provisioned',
                      description: 'Provisioning 32 H100 instances...',
                      type: 'success',
                    });
                  }}
                >
                  Confirm Scaling
                </Button>
              </>
            ) : undefined
          }
        >
          <div style={{ maxWidth: `${modalMaxWidth}px` }} className="space-y-3 py-1 text-xs mx-auto">
            <p className="text-muted-foreground">
              By confirming, the cluster will automatically provision isolated network VPCs and execute rolling zero-downtime health probes.
            </p>
            <div className="p-3 rounded-xl bg-surface-subtle border border-border font-mono text-[11px] space-y-1">
              <div>Nodes: <span className="text-primary font-bold">32x Nvidia H100</span></div>
              <div>Target Region: <span className="text-foreground">us-east-1 (N. Virginia)</span></div>
              <div>Estimated Cost: <span className="text-foreground">$4.80 / hr</span></div>
            </div>
          </div>
        </Modal>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Modal Parameter Controls
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Max Width"
            value={modalMaxWidth}
            onChange={setModalMaxWidth}
            min={360}
            max={720}
            step={20}
            unit="px"
          />
          <ParameterSwitch
            label="Show Action Footer"
            checked={showFooter}
            onChange={setShowFooter}
          />
        </ParameterGrid>
      </div>
    </div>
  );
};

export const TooltipPlayground: React.FC = () => {
  const [openDelay, setOpenDelay] = useState(150);
  const [skipDelay, setSkipDelay] = useState(400);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="max-w-md mx-auto p-10 rounded-2xl border border-border bg-surface-subtle/50 flex flex-col items-center justify-center space-y-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Grouped Fast-Travel Tooltip Toolbar
          </div>

          <TooltipGroup openDelay={openDelay} skipDelay={skipDelay}>
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-surface">
              <Tooltip label="Copy Document (⌘C)">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Copy className="size-4" />
                </button>
              </Tooltip>

              <Tooltip label="Share with Team (⌘S)">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Users className="size-4" />
                </button>
              </Tooltip>

              <Tooltip label="Security & Keys">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Key className="size-4" />
                </button>
              </Tooltip>

              <Tooltip label="Global Sync">
                <button
                  type="button"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <Globe className="size-4" />
                </button>
              </Tooltip>
            </div>
          </TooltipGroup>

          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Hover over any button, then slide across to neighbors to witness the smooth warm-travel glide transition.
          </p>
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Tooltip Group Dynamics
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Open Delay"
            value={openDelay}
            onChange={setOpenDelay}
            min={50}
            max={600}
            step={50}
            unit="ms"
          />
          <ParameterSlider
            label="Skip Delay (Warm Glide)"
            value={skipDelay}
            onChange={setSkipDelay}
            min={100}
            max={800}
            step={50}
            unit="ms"
          />
        </ParameterGrid>
      </div>
    </div>
  );
};

export const CommandPalettePlayground: React.FC = () => {
  const { addToast } = useToast();
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const sampleCommands = [
    { id: 'deploy', label: 'Deploy Project to Production', shortcut: ['⌘', 'D'], hint: 'Edge v2.4' },
    { id: 'settings', label: 'Open Workspace Settings', shortcut: ['⌘', ','], hint: 'Preferences' },
    { id: 'keys', label: 'Rotate API Access Keys', shortcut: ['⌘', 'K'], hint: 'Security' },
    { id: 'theme', label: 'Switch Theme Preset', hint: 'Theming' },
    { id: 'export', label: 'Export Audit Event Logs', hint: 'Compliance' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Interactive Spotlight Palette
        </span>
        <Button variant="primary" size="sm" onClick={() => setCmdPaletteOpen(true)}>
          Open Palette (⌘K)
        </Button>
      </div>

      <div className="max-w-lg mx-auto">
        <CommandPalette
          items={sampleCommands}
          onSelect={(cmd) => {
            addToast({
              title: 'Command Executed',
              description: `Triggered: ${cmd.label}`,
              type: 'info',
            });
          }}
        />
      </div>

      <CommandPalette
        open={cmdPaletteOpen}
        onDismiss={() => setCmdPaletteOpen(false)}
        items={sampleCommands}
        onSelect={(cmd) => {
          setCmdPaletteOpen(false);
          addToast({
            title: 'Command Executed',
            description: `Triggered: ${cmd.label}`,
            type: 'info',
          });
        }}
      />
    </div>
  );
};

export const LightboxPlayground: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [maxScale, setMaxScale] = useState(5);
  const lightboxThumbRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-2">
          <Maximize2 className="size-4 text-primary" />
          <span className="text-xs font-medium text-foreground">
            Status: <span className="text-primary font-bold">{lightboxOpen ? 'Modal Active' : 'Thumbnail Preview'}</span>
          </span>
        </div>

        <Button
          size="xs"
          variant="primary"
          onClick={() => setLightboxOpen(true)}
        >
          Open Lightbox
        </Button>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center gap-3">
          <button
            ref={lightboxThumbRef}
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-md hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-zoom-in"
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
              alt="Tropical beach coast"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div className="flex items-center justify-between w-full text-white">
                <div>
                  <div className="text-xs font-semibold">Pacific Coastal Sunset</div>
                  <div className="text-[11px] text-white/80">Click thumbnail to inspect full-res</div>
                </div>
                <div className="size-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Maximize2 className="size-3.5" />
                </div>
              </div>
            </div>
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Click thumbnail above to expand with landing morph physics, wheel zoom, and drag panning.
          </p>
        </div>

        <Lightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90"
          alt="Pacific coastal sunset in 4K resolution"
          caption="Pacific Coastal Sunset — 4K High Resolution Inspector"
          originRef={lightboxThumbRef}
          maxScale={maxScale}
        />
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Lightbox Zoom Parameters
        </span>
        <ParameterGrid columns={2}>
          <ParameterSlider
            label="Maximum Zoom Scale"
            value={maxScale}
            onChange={setMaxScale}
            min={2}
            max={8}
            step={1}
            unit="x"
          />
        </ParameterGrid>
      </div>
    </div>
  );
};
