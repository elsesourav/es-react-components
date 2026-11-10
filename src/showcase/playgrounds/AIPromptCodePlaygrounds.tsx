import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Button,
  AIPromptBar,
  AICodeBlock,
  useToast,
} from '@/components/ui';
import { Sparkles, Monitor, Tablet, Smartphone, Check } from 'lucide-react';
import { useTheme } from '@/theme/ThemeContext';

export const AiPromptBarPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { isDark } = useTheme();
  const [promptTheme, setPromptTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  const [promptDevice, setPromptDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [promptVariant, setPromptVariant] = useState<'Rounded' | 'Pill'>('Rounded');
  const [promptDemo, setPromptDemo] = useState(true);
  const [promptTall, setPromptTall] = useState(false);
  const [promptLastSent, setPromptLastSent] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" />
          Prompt Bar Options
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Theme:</span>
          {(['auto', 'dark', 'light'] as const).map((t) => (
            <Button
              key={t}
              size="xs"
              variant={promptTheme === t ? 'primary' : 'outline'}
              className="capitalize"
              onClick={() => setPromptTheme(t)}
            >
              {t === 'auto' ? 'Auto (Preset)' : t}
            </Button>
          ))}

          <div className="h-4 w-px bg-border mx-1" />

          <div className="flex items-center bg-surface-subtle p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setPromptDevice('desktop')}
              title="Desktop (Full)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                promptDevice === 'desktop'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPromptDevice('tablet')}
              title="Tablet Viewport (768px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                promptDevice === 'tablet'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPromptDevice('mobile')}
              title="Mobile Viewport (390px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                promptDevice === 'mobile'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>

          <span className="text-xs text-muted-foreground ml-1">Variant:</span>
          <Button
            size="xs"
            variant={promptVariant === 'Rounded' ? 'primary' : 'outline'}
            onClick={() => setPromptVariant('Rounded')}
          >
            Rounded
          </Button>
          <Button
            size="xs"
            variant={promptVariant === 'Pill' ? 'primary' : 'outline'}
            onClick={() => setPromptVariant('Pill')}
          >
            Pill
          </Button>
          <Button
            size="xs"
            variant={promptTall ? 'primary' : 'outline'}
            onClick={() => setPromptTall((v) => !v)}
          >
            Tall
          </Button>
          <Button
            size="xs"
            variant={promptDemo ? 'subtle' : 'outline'}
            onClick={() => setPromptDemo((v) => !v)}
          >
            {promptDemo ? 'Autoplay: ON' : 'Autoplay: OFF'}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300 mx-auto',
          promptDevice === 'mobile' &&
            'max-w-[390px] border-[6px] border-neutral-700/80 rounded-[40px] p-4 shadow-2xl bg-surface/40',
          promptDevice === 'tablet' &&
            'max-w-[768px] border-2 border-neutral-600/60 rounded-[32px] p-6 shadow-xl bg-surface/40',
          promptDevice === 'desktop' && 'w-full'
        )}
      >
        {promptDevice !== 'desktop' && (
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
            <span>{promptDevice === 'mobile' ? 'Mobile Viewport (390px)' : 'Tablet Viewport (768px)'}</span>
            <span className="capitalize">Theme: {promptTheme}</span>
          </div>
        )}

        <div className="p-6 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[440px]">
          <AIPromptBar
            theme={promptTheme === 'auto' ? (isDark ? 'dark' : 'light') : promptTheme}
            variant={promptVariant}
            tall={promptTall}
            demo={promptDemo}
            onSend={(text, details) => {
              setPromptLastSent(text || 'Sent with attachments');
              const modelName = details?.model?.name ?? 'Default';
              const fileCount = details?.files?.length ?? 0;
              addToast({
                title: 'Prompt Sent',
                description: `Model: ${modelName} • ${fileCount} files`,
                type: 'success',
              });
            }}
          />
          {promptLastSent && (
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Last submission: <span className="font-semibold text-foreground">{promptLastSent}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AiCodeBlockPlayground: React.FC = () => {
  const { addToast } = useToast();
  const { isDark } = useTheme();
  const [codeTheme, setCodeTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [codeDevice, setCodeDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [codeVariant, setCodeVariant] = useState<'auto' | 'Code' | 'Diff'>('auto');
  const [codeCopiedNotice, setCodeCopiedNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" />
          Code Block Controls
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Theme:</span>
          {(['auto', 'light', 'dark'] as const).map((t) => (
            <Button
              key={t}
              size="xs"
              variant={codeTheme === t ? 'primary' : 'outline'}
              className="capitalize"
              onClick={() => setCodeTheme(t)}
            >
              {t === 'auto' ? 'Auto (Preset)' : t}
            </Button>
          ))}

          <div className="h-4 w-px bg-border mx-1" />

          <div className="flex items-center bg-surface-subtle p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setCodeDevice('desktop')}
              title="Desktop (Full)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                codeDevice === 'desktop'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCodeDevice('tablet')}
              title="Tablet Viewport (768px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                codeDevice === 'tablet'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCodeDevice('mobile')}
              title="Mobile Viewport (390px)"
              className={cn(
                'p-1.5 rounded-lg transition-all',
                codeDevice === 'mobile'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>

          <span className="text-xs text-muted-foreground ml-1">Mode:</span>
          {(['auto', 'Code', 'Diff'] as const).map((m) => (
            <Button
              key={m}
              size="xs"
              variant={codeVariant === m ? 'primary' : 'outline'}
              onClick={() => setCodeVariant(m)}
            >
              {m === 'auto' ? 'Interactive' : m}
            </Button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'transition-all duration-300 mx-auto',
          codeDevice === 'mobile' &&
            'max-w-[390px] border-[6px] border-neutral-700/80 rounded-[40px] p-4 shadow-2xl bg-surface/40',
          codeDevice === 'tablet' &&
            'max-w-[768px] border-2 border-neutral-600/60 rounded-[32px] p-6 shadow-xl bg-surface/40',
          codeDevice === 'desktop' && 'w-full'
        )}
      >
        {codeDevice !== 'desktop' && (
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50 text-[11px] font-mono text-muted-foreground">
            <span>{codeDevice === 'mobile' ? 'Mobile Viewport (390px)' : 'Tablet Viewport (768px)'}</span>
            <span className="capitalize">Theme: {codeTheme}</span>
          </div>
        )}

        <div className="p-6 sm:p-12 rounded-2xl bg-surface-subtle/50 border border-border flex flex-col items-center justify-center min-h-[380px]">
          <AICodeBlock
            theme={codeTheme === 'auto' ? (isDark ? 'dark' : 'light') : codeTheme}
            variant={codeVariant === 'auto' ? undefined : codeVariant}
            filename="churn.ts"
            onCopy={() => {
              setCodeCopiedNotice('Copied snippet to clipboard');
              addToast({
                title: 'Copied to Clipboard',
                description: 'Ready to paste into your editor.',
                type: 'success',
              });
            }}
          />
          {codeCopiedNotice && (
            <div className="mt-4 text-xs text-success flex items-center gap-1.5 font-medium">
              <Check className="size-3.5" />
              {codeCopiedNotice}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
