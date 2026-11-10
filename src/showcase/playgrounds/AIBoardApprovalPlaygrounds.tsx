import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  AIApprovalCard,
  useToast,
} from '@/components/ui';
import { Sparkles, Monitor, Tablet, Smartphone, RefreshCw } from 'lucide-react';
import { useTheme } from '@/theme/ThemeContext';

export const AiApprovalCardPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { isDark } = useTheme();
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
                'p-1.5 rounded-lg transition-all cursor-pointer',
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
              title="Tablet (768px)"
              className={cn(
                'p-1.5 rounded-lg transition-all cursor-pointer',
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
              title="Mobile (390px)"
              className={cn(
                'p-1.5 rounded-lg transition-all cursor-pointer',
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
            onClick={() => {
              setApprovalKey((k) => k + 1);
              setApprovalSubmissions(null);
            }}
          >
            <RefreshCw className="size-3 mr-1" />
            Reset State
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300 mx-auto',
          approvalDevice === 'desktop' && 'w-full',
          approvalDevice === 'tablet' && 'max-w-[768px]',
          approvalDevice === 'mobile' && 'max-w-[390px]'
        )}
      >
        {approvalDevice !== 'desktop' && (
          <div className="flex items-center justify-between pb-2 mb-2 px-2 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
            <span>{approvalDevice === 'mobile' ? 'Mobile Viewport (390px)' : 'Tablet Viewport (768px)'}</span>
            <span className="capitalize">Theme: {approvalTheme}</span>
          </div>
        )}

        <div className="rounded-2xl border border-border overflow-hidden shadow-lg bg-surface-elevated flex items-center justify-center p-6 sm:p-10">
          <AIApprovalCard
            key={approvalKey}
            theme={approvalTheme === 'auto' ? (isDark ? 'dark' : 'light') : approvalTheme}
            onSubmitted={(answers) => {
              setApprovalSubmissions('Approved');
              addToast({
                title: 'Review Submitted',
                description: `Recorded feedback across ${Object.keys(answers).length} gates.`,
                type: 'success',
              });
            }}
          />
        </div>

        {approvalSubmissions && (
          <div className="mt-4 p-3 rounded-xl bg-surface border border-border text-xs text-center">
            Decision recorded:{' '}
            <strong className="text-success font-semibold">
              {approvalSubmissions}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};
