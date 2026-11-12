import React, { useState } from 'react';
import {
  WizardSteps,
  Pagination,
  TreeView,
  Checkbox,
  ParameterSlider,
  ParameterSwitch,
  ParameterGrid,
} from '@/components/ui';
import { useToast } from '@/components/ui';
import { Rocket, Compass, ListTree } from 'lucide-react';

export const WizardStepsPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [wizardComplete, setWizardComplete] = useState(false);
  const [wizardMaxWidth, setWizardMaxWidth] = useState(512);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full" style={{ maxWidth: `${wizardMaxWidth}px` }}>
          <WizardSteps
            complete={wizardComplete}
            onComplete={() => {
              setWizardComplete(true);
              addToast({
                title: 'Pipeline Configured',
                description: 'All wizard steps have been finalized successfully.',
                type: 'success',
              });
            }}
            steps={[
              {
                id: 'project',
                label: 'Project Details',
                content: (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-foreground block mb-1">
                        Workspace Name
                      </label>
                      <input
                        type="text"
                        defaultValue="enterprise-design-system"
                        className="w-full h-8 px-2.5 rounded-lg border border-border bg-surface text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Configure your project namespace and repository credentials.
                    </p>
                  </div>
                ),
              },
              {
                id: 'target',
                label: 'Deployment Target',
                content: (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-foreground">Select cloud provider:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['AWS Lambda', 'Google Cloud', 'Cloudflare'].map((c, i) => (
                        <div
                          key={c}
                          className={`p-2 rounded-lg border text-xs text-center cursor-pointer ${
                            i === 1 ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-border bg-surface text-muted-foreground'
                          }`}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground pt-1">
                      Edge workers replicate assets across 300+ global points of presence.
                    </p>
                  </div>
                ),
              },
              {
                id: 'security',
                label: 'Security & Access',
                content: (
                  <div className="space-y-2 text-xs">
                    <p className="font-medium text-foreground">Security Compliance Gates:</p>
                    <div className="space-y-2 pt-1">
                      <Checkbox
                        sizeVariant="sm"
                        defaultChecked
                        label="Enable zero-trust identity token verification"
                      />
                      <Checkbox
                        sizeVariant="sm"
                        defaultChecked
                        label="Enforce TLS 1.3 encryption for edge connections"
                      />
                      <Checkbox
                        sizeVariant="sm"
                        label="Automate SOC2 compliance audit log exports"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: 'review',
                label: 'Review & Launch',
                content: (
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-foreground">Review Summary:</p>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                      <li>Workspace: <strong className="text-foreground">enterprise-design-system</strong></li>
                      <li>Provider: <strong className="text-foreground">Google Cloud Platform</strong></li>
                      <li>Zero-Trust security headers enforced</li>
                    </ul>
                    <p className="text-[11px] text-muted-foreground pt-2">
                      Click Finish below to spin up edge instances.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <Rocket className="size-4 text-primary" />
          Pipeline Wizard Controller & Parameters
        </div>

        <ParameterGrid columns={3}>
          <ParameterSlider
            label="Container Max Width"
            value={wizardMaxWidth}
            onChange={setWizardMaxWidth}
            min={360}
            max={680}
            step={20}
            unit="px"
          />
          <ParameterSwitch
            label="Simulate Complete State"
            checked={wizardComplete}
            onChange={setWizardComplete}
          />
        </ParameterGrid>
      </div>

    </div>
  );
};

export const PaginationPlayground: React.FC = () => {
  const [pagPage, setPagPage] = useState(4);
  const [pagCount, setPagCount] = useState(24);
  const [pagSiblings, setPagSiblings] = useState(1);
  const [pagBoundaries, setPagBoundaries] = useState(1);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-8 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[260px] space-y-6">
        <Pagination
          count={pagCount}
          page={pagPage}
          onPageChange={setPagPage}
          siblings={pagSiblings}
          boundaries={pagBoundaries}
        />

        <div className="p-3 rounded-xl bg-surface border border-border text-xs text-center max-w-xs w-full space-y-1">
          <div className="text-muted-foreground">
            Current Page: <strong className="text-foreground font-semibold">{pagPage}</strong> of{' '}
            <strong className="text-foreground font-semibold">{pagCount}</strong>
          </div>
          <p className="text-[11px] text-muted-foreground/80">
            Features spring-animated sliding indicator thumb, rolling number transitions, and live screen-reader announcements.
          </p>
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <Compass className="size-4 text-primary" />
          Pagination Range & Detents Controls
        </div>

        <ParameterGrid columns={4}>
          <ParameterSlider
            label="Current Page"
            value={pagPage}
            onChange={(p) => setPagPage(Math.min(p, pagCount))}
            min={1}
            max={pagCount}
            step={1}
          />
          <ParameterSlider
            label="Total Pages"
            value={pagCount}
            onChange={(c) => {
              setPagCount(c);
              if (pagPage > c) setPagPage(c);
            }}
            min={5}
            max={50}
            step={1}
          />
          <ParameterSlider
            label="Sibling Count"
            value={pagSiblings}
            onChange={setPagSiblings}
            min={1}
            max={3}
            step={1}
          />
          <ParameterSlider
            label="Boundary Count"
            value={pagBoundaries}
            onChange={setPagBoundaries}
            min={1}
            max={2}
            step={1}
          />
        </ParameterGrid>
      </div>

    </div>
  );
};

export const TreeViewPlayground: React.FC = () => {
  const [treeSelected, setTreeSelected] = useState<string | null>('button.tsx');
  const [treeExpanded, setTreeExpanded] = useState<string[]>(['src', 'components']);
  const [showMeta, setShowMeta] = useState(true);

  return (
    <div className="space-y-6">
      {/* 1. Live Interactive Preview (Preview First) */}
      <div className="p-6 sm:p-10 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <TreeView
            label="Project Files"
            expanded={treeExpanded}
            onExpandedChange={setTreeExpanded}
            selected={treeSelected}
            onSelectedChange={setTreeSelected}
            nodes={[
              {
                id: 'src',
                label: 'src',
                children: [
                  {
                    id: 'components',
                    label: 'components',
                    children: [
                      {
                        id: 'ui',
                        label: 'ui',
                        children: [
                          { id: 'button.tsx', label: 'button.tsx', meta: showMeta ? '2.8kb' : undefined },
                          { id: 'tabs.tsx', label: 'tabs.tsx', meta: showMeta ? '7.4kb' : undefined },
                          { id: 'accordion.tsx', label: 'accordion.tsx', meta: showMeta ? '5.1kb' : undefined },
                          { id: 'wizard-steps.tsx', label: 'wizard-steps.tsx', meta: showMeta ? '6.2kb' : undefined },
                          { id: 'pagination.tsx', label: 'pagination.tsx', meta: showMeta ? '4.9kb' : undefined },
                          { id: 'tree-view.tsx', label: 'tree-view.tsx', meta: showMeta ? '5.6kb' : undefined },
                        ],
                      },
                      {
                        id: 'showcase',
                        label: 'showcase',
                        children: [
                          { id: 'componentsData.tsx', label: 'componentsData.tsx', meta: showMeta ? '42kb' : undefined },
                          { id: 'ComponentPlaygrounds.tsx', label: 'ComponentPlaygrounds.tsx', meta: showMeta ? '58kb' : undefined },
                        ],
                      },
                    ],
                  },
                  { id: 'App.tsx', label: 'App.tsx', meta: showMeta ? '1.8kb' : undefined },
                  { id: 'main.tsx', label: 'main.tsx', meta: showMeta ? '0.4kb' : undefined },
                ],
              },
              { id: 'package.json', label: 'package.json', meta: showMeta ? '1.2kb' : undefined },
              { id: 'tsconfig.json', label: 'tsconfig.json', meta: showMeta ? '0.8kb' : undefined },
            ]}
          />

          {treeSelected && (
            <div className="mt-4 p-3 rounded-xl bg-surface border border-border text-xs text-muted-foreground flex items-center justify-between">
              <span>Selected item:</span>
              <span className="font-mono font-semibold text-primary">{treeSelected}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Interactive Parameter Controls (Controls Second) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-3">
          <ListTree className="size-4 text-primary" />
          Tree View File Explorer Controls
        </div>

        <ParameterGrid columns={3}>
          <ParameterSwitch
            label="Show File Size Metadata"
            checked={showMeta}
            onChange={setShowMeta}
          />
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setTreeExpanded(['src', 'components', 'ui', 'showcase'])}
              className="px-3 py-1.5 text-xs rounded-lg border border-border bg-surface text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={() => setTreeExpanded([])}
              className="px-3 py-1.5 text-xs rounded-lg border border-border bg-surface text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </ParameterGrid>
      </div>

    </div>
  );
};
