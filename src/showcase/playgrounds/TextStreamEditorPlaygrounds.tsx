import React, { useState } from 'react';
import {
  Button,
  Badge,
  StreamingText,
  MarkdownEditor,
  useToast,
} from '@/components/ui';
import { Sparkles } from 'lucide-react';

export const StreamingTextPlayground: React.FC = () => {
  const { addToast } = useToast();

  const sampleStreamingReply =
    "Antigravity components are built on dynamic HSL design tokens, supporting zero-flash dark mode, spring physics via motion/react, and seamless keyboard accessibility.";
  const [streamPacing, setStreamPacing] = useState(24);
  const [streamKey, setStreamKey] = useState(0);

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Streaming Pacing: {streamPacing} tokens/s
        </span>
        <div className="flex items-center gap-2">
          {[12, 24, 48].map((speed) => (
            <button
              key={speed}
              onClick={() => {
                setStreamPacing(speed);
                setStreamKey((k) => k + 1);
              }}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                streamPacing === speed
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {speed} t/s
            </button>
          ))}
          <button
            onClick={() => setStreamKey((k) => k + 1)}
            className="px-2.5 py-1 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground"
          >
            Replay Stream
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-5 rounded-2xl border border-border bg-surface-subtle/50 space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Assistant Response:</span>
          <span className="text-[11px] font-mono">Click text to skip</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface">
          <StreamingText
            key={streamKey}
            text={sampleStreamingReply}
            tokensPerSecond={streamPacing}
            label="AI Assistant"
            onDone={() => {
              addToast({
                title: 'Streaming Complete',
                description: 'Full assistant token output received.',
                type: 'success',
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const MarkdownEditorPlayground: React.FC = () => {
  const { addToast } = useToast();

  const defaultMarkdownContent = `# Quantum Mechanics & Relativistic Physics

This document showcases **live Markdown rendering** with full **KaTeX LaTeX math support** built completely from scratch.

> [!NOTE]
> Math formulas render synchronously using KaTeX with zero latency and high fidelity.

### Core Mathematical Formulations

Here is Einstein's famous mass-energy-momentum invariant relation:

$$E^2 = (m_0 c^2)^2 + (pc)^2$$

And the time-dependent **Schrödinger Equation** describing quantum state evolution:

$$i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t)$$

You can also write inline math formulas such as $e^{i\\pi} + 1 = 0$, or standard deviations $\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^N (x_i - \\mu)^2}$.

### Gaussian Integral

$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

> [!TIP]
> Hover any block equation above to copy its raw TeX source!

### Engineering Task Checklist
- [x] Implement from-scratch optical Markdown block parser
- [x] Embed KaTeX LaTeX mathematical typography
- [x] Support GitHub-flavored alerts (Note, Tip, Important, Warning)
- [ ] Connect remote collaborative WebSocket operational transforms
`;

  const [markdownVal, setMarkdownVal] = useState(defaultMarkdownContent);
  const [markdownMode, setMarkdownMode] = useState<any>('split');

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold text-foreground">Markdown & KaTeX Math Editor</span>
          <Badge size="sm" variant="outline" className="font-mono text-[10px]">Split View</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setMarkdownVal(defaultMarkdownContent);
              addToast({
                title: 'Template Reset',
                description: 'Loaded Quantum Mechanics & Math demo document.',
                type: 'info',
              });
            }}
          >
            Reset Demo
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setMarkdownVal(
                `# Quick KaTeX Math Cheatsheet\n\n- Inline: $f(x) = ax^2 + bx + c$\n- Binomial: $(x+y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k$\n- Limits: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$\n\n$$\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}$$`
              );
            }}
          >
            Math Cheat
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-border min-h-[520px]">
        <MarkdownEditor
          label="Technical Document Editor"
          value={markdownVal}
          onChange={(val) => setMarkdownVal(val)}
          mode={markdownMode}
          onModeChange={(m) => setMarkdownMode(m)}
          minHeight="480px"
          helperText="Full GitHub-flavored Markdown with KaTeX math rendering ($inline$ & $$block$$)."
        />
      </div>
    </div>
  );
};
