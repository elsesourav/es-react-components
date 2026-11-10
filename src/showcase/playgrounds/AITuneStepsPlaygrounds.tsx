import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  AIFineTuneCard,
  TaskSteps,
  useToast,
} from '@/components/ui';
import { Sparkles, Monitor, Tablet, Smartphone, RefreshCw } from 'lucide-react';

export const AiFineTuneCardPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [fineTuneTheme, setFineTuneTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [fineTuneDevice, setFineTuneDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [fineTuneKey, setFineTuneKey] = useState(0);
  const [fineTuneLastState, setFineTuneLastState] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" />
          Fine-Tune Inspector Playground
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Theme:</span>
          {(['auto', 'light', 'dark'] as const).map((t) => (
            <Button
              key={t}
              size="xs"
              variant={fineTuneTheme === t ? 'primary' : 'outline'}
              className="capitalize"
              onClick={() => setFineTuneTheme(t)}
            >
              {t === 'auto' ? 'Auto (Preset)' : t}
            </Button>
          ))}

          <div className="h-4 w-px bg-border mx-1" />

          <div className="flex items-center bg-surface-subtle p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setFineTuneDevice('desktop')}
              title="Desktop (Full)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                fineTuneDevice === 'desktop'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setFineTuneDevice('tablet')}
              title="Tablet Viewport (768px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                fineTuneDevice === 'tablet'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setFineTuneDevice('mobile')}
              title="Mobile Viewport (390px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                fineTuneDevice === 'mobile'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>

          <Button
            size="xs"
            variant="outline"
            leftIcon={<RefreshCw className="size-3" />}
            onClick={() => {
              setFineTuneKey((k) => k + 1);
              setFineTuneLastState(null);
              addToast({
                title: 'Inspector Reset',
                description: 'Parameters reset to default.',
                type: 'info',
              });
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300 mx-auto',
          fineTuneDevice === 'mobile' &&
            'max-w-[390px] border-[6px] border-neutral-700/80 rounded-[40px] p-4 shadow-2xl bg-surface/40',
          fineTuneDevice === 'tablet' &&
            'max-w-[768px] border-2 border-neutral-600/60 rounded-[32px] p-6 shadow-xl bg-surface/40',
          fineTuneDevice === 'desktop' && 'w-full'
        )}
      >
        {fineTuneDevice !== 'desktop' && (
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
            <span>{fineTuneDevice === 'mobile' ? 'Mobile Viewport (390px)' : 'Tablet Viewport (768px)'}</span>
            <span className="capitalize">Theme: {fineTuneTheme}</span>
          </div>
        )}

        <div className="p-6 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[380px]">
          <AIFineTuneCard
            key={fineTuneKey}
            theme={fineTuneTheme === 'auto' ? undefined : fineTuneTheme}
            onChange={(state) => {
              setFineTuneLastState(state);
            }}
          />
          {fineTuneLastState && (
            <div className="mt-6 p-3.5 rounded-xl bg-surface border border-border text-xs text-muted-foreground max-w-sm w-full">
              <div className="font-semibold text-foreground mb-1.5">Live Parameter State:</div>
              <div className="grid grid-cols-2 gap-1 font-mono text-[11px]">
                <div>Layout Seg: <span className="text-primary font-bold">{fineTuneLastState.segment}</span></div>
                <div>Type: <span className="text-primary font-bold">{fineTuneLastState.type}</span></div>
                {Object.entries(fineTuneLastState.values).map(([k, v]) => (
                  <div key={k}>{k}: <span className="text-foreground font-semibold">{String(v)}</span></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TaskStepsPlayground: React.FC = () => {
  const [taskStepIdx, setTaskStepIdx] = useState(1);
  const [taskFailed, setTaskFailed] = useState(false);

  const deploySteps = [
    { id: 'queue', label: 'Queued', description: 'Worker node assigned' },
    { id: 'build', label: 'Building', description: 'Compiling TS bundle' },
    { id: 'test', label: 'Running checks', description: 'Unit & e2e suites' },
    { id: 'deploy', label: 'Deploying', description: 'Worldwide edge sync' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pipeline Stage Controls
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTaskStepIdx((i) => Math.max(0, i - 1))}
            disabled={taskStepIdx === 0}
            className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => setTaskStepIdx((i) => Math.min(deploySteps.length - 1, i + 1))}
            disabled={taskStepIdx === deploySteps.length - 1}
            className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground disabled:opacity-40"
          >
            Next
          </button>
          <button
            onClick={() => setTaskFailed(!taskFailed)}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
              taskFailed
                ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                : 'border-border text-muted-foreground'
            }`}
          >
            {taskFailed ? 'Resolve Error' : 'Simulate Failure'}
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto p-6 rounded-2xl border border-border bg-surface-subtle/50 space-y-6">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Deploy run #89410</span>
          <span className="font-mono text-muted-foreground">Stage {taskStepIdx + 1} of {deploySteps.length}</span>
        </div>

        <TaskSteps
          steps={deploySteps}
          current={taskStepIdx}
          failed={taskFailed}
          label="Deploy progress"
        />
      </div>
    </div>
  );
};
