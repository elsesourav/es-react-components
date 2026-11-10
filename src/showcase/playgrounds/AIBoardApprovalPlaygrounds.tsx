import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  RudderIssueBoard,
  AIApprovalCard,
  useToast,
} from '@/components/ui';
import { Sparkles, Monitor, Tablet, Smartphone, RefreshCw } from 'lucide-react';

export const IssueBoardPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [boardTheme, setBoardTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [boardDevice, setBoardDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [boardKey, setBoardKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" />
          Issue Board Playground
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Theme:</span>
          {(['auto', 'dark', 'light'] as const).map((t) => (
            <Button
              key={t}
              size="xs"
              variant={boardTheme === t ? 'primary' : 'outline'}
              className="capitalize"
              onClick={() => setBoardTheme(t)}
            >
              {t === 'auto' ? 'Auto (Preset)' : t}
            </Button>
          ))}

          <div className="h-4 w-px bg-border mx-1" />

          <div className="flex items-center bg-surface-subtle p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setBoardDevice('desktop')}
              title="Desktop (Full)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                boardDevice === 'desktop'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setBoardDevice('tablet')}
              title="Tablet Viewport (768px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                boardDevice === 'tablet'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setBoardDevice('mobile')}
              title="Mobile Viewport (390px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                boardDevice === 'mobile'
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
              setBoardKey((k) => k + 1);
              addToast({
                title: 'Board Reset',
                description: 'Reset issues to default state.',
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
          boardDevice === 'mobile' &&
            'max-w-[390px] border-[6px] border-neutral-700/80 rounded-[40px] p-2 shadow-2xl bg-surface/40',
          boardDevice === 'tablet' &&
            'max-w-[768px] border-2 border-neutral-600/60 rounded-[32px] p-3 shadow-xl bg-surface/40',
          boardDevice === 'desktop' && 'w-full'
        )}
      >
        {boardDevice !== 'desktop' && (
          <div className="flex items-center justify-between pb-2 mb-2 px-2 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
            <span>{boardDevice === 'mobile' ? 'Mobile Viewport (390px)' : 'Tablet Viewport (768px)'}</span>
            <span className="capitalize">Theme: {boardTheme}</span>
          </div>
        )}

        <div className="rounded-2xl border border-border overflow-hidden shadow-lg bg-surface-elevated">
          <RudderIssueBoard
            key={boardKey}
            theme={boardTheme === 'auto' ? undefined : boardTheme}
            onIssuesChange={(next) => {
              addToast({
                title: 'Board Updated',
                description: `${next.length} issues in board`,
                type: 'success',
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const AiApprovalCardPlayground: React.FC = () => {
  const { addToast } = useToast();
  const [approvalTheme, setApprovalTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [approvalDevice, setApprovalDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [approvalSubmissions, setApprovalSubmissions] = useState<string | null>(null);
  const [approvalKey, setApprovalKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" />
          Approval Card Configuration
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Theme:</span>
          {(['auto', 'light', 'dark'] as const).map((t) => (
            <Button
              key={t}
              size="xs"
              variant={approvalTheme === t ? 'primary' : 'outline'}
              className="capitalize"
              onClick={() => setApprovalTheme(t)}
            >
              {t === 'auto' ? 'Auto (Preset)' : t}
            </Button>
          ))}

          <div className="h-4 w-px bg-border mx-1" />

          <div className="flex items-center bg-surface-subtle p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setApprovalDevice('desktop')}
              title="Desktop (Full)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                approvalDevice === 'desktop'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setApprovalDevice('tablet')}
              title="Tablet Viewport (768px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                approvalDevice === 'tablet'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setApprovalDevice('mobile')}
              title="Mobile Viewport (390px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                approvalDevice === 'mobile'
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
              setApprovalKey((k) => k + 1);
              setApprovalSubmissions(null);
              addToast({
                title: 'Approval Card Reset',
                description: 'Card restarted from step 1.',
                type: 'info',
              });
            }}
          >
            Restart
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300 mx-auto',
          approvalDevice === 'mobile' &&
            'max-w-[390px] border-[6px] border-neutral-700/80 rounded-[40px] p-4 shadow-2xl bg-surface/40',
          approvalDevice === 'tablet' &&
            'max-w-[768px] border-2 border-neutral-600/60 rounded-[32px] p-6 shadow-xl bg-surface/40',
          approvalDevice === 'desktop' && 'w-full'
        )}
      >
        {approvalDevice !== 'desktop' && (
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
            <span>{approvalDevice === 'mobile' ? 'Mobile Viewport (390px)' : 'Tablet Viewport (768px)'}</span>
            <span className="capitalize">Theme: {approvalTheme}</span>
          </div>
        )}

        <div className="p-6 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[380px]">
          <AIApprovalCard
            key={approvalKey}
            theme={approvalTheme === 'auto' ? undefined : approvalTheme}
            onSubmitted={(answers, custom) => {
              const summary = JSON.stringify({ answers, custom });
              setApprovalSubmissions(summary);
              addToast({
                title: 'Workflow Approved',
                description: 'Answers recorded successfully.',
                type: 'success',
              });
            }}
          />
          {approvalSubmissions && (
            <div className="mt-6 p-3 rounded-xl bg-surface border border-border text-xs font-mono text-muted-foreground max-w-sm w-full overflow-x-auto">
              <span className="font-semibold text-foreground">Submitted Payload:</span>
              <pre className="mt-1 whitespace-pre-wrap">{approvalSubmissions}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
