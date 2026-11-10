export const AI_THEME_STYLES = `/* Shared public tokens for the standalone AI component family. */
.mova-ai-theme {
  --mova-ai-font-sans: var(--font-sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  --mova-ai-font-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  font-family: var(--mova-ai-font-sans);
  line-height: 1.45;
  letter-spacing: -0.01em;

  --mova-ai-page: hsl(var(--background, 0 0% 98%));
  --mova-ai-canvas: hsl(var(--surface-sunken, 240 5% 96%));
  --mova-ai-surface: hsl(var(--surface-elevated, 0 0% 100%));
  --mova-ai-inset: hsl(var(--surface-subtle, 240 5% 94%));
  --mova-ai-hover: hsl(var(--surface-subtle, 240 5% 92%));
  --mova-ai-hover-strong: hsl(var(--border, 240 6% 88%));

  --mova-ai-ink: hsl(var(--foreground, 240 10% 3.9%));
  --mova-ai-ink-secondary: hsl(var(--muted-foreground, 240 3.8% 46%));
  --mova-ai-ink-muted: hsl(var(--subtle-foreground, 240 5% 60%));

  --mova-ai-border: hsl(var(--border, 240 5.9% 90%));
  --mova-ai-border-soft: hsl(var(--border-subtle, 240 5% 94%));
  --mova-ai-border-strong: hsl(var(--border-strong, 240 6% 80%));
  --mova-ai-field: hsl(var(--surface, 240 5% 96%));
  --mova-ai-grid: color-mix(in srgb, var(--mova-ai-border) 78%, transparent);
  --mova-ai-stripe: rgb(32 35 38 / 7%);
  --mova-ai-stripe-bg: #242424;

  --mova-ai-accent: hsl(var(--primary, 238.7 83.5% 66.7%));
  --mova-ai-accent-ink: hsl(var(--foreground, 240 10% 3.9%));
  --mova-ai-accent-foreground: hsl(var(--primary-foreground, 0 0% 100%));
  --mova-ai-accent-tint: hsl(var(--primary, 238.7 83.5% 66.7%) / 0.12);
  --mova-ai-success: hsl(var(--success, 152 69% 42%));
  --mova-ai-success-tint: hsl(var(--success, 152 69% 42%) / 0.14);
  --mova-ai-warning: hsl(var(--warning, 45 93% 47%));
  --mova-ai-warning-tint: hsl(var(--warning, 45 93% 47%) / 0.14);
  --mova-ai-danger: hsl(var(--destructive, 0 84.2% 60.2%));
  --mova-ai-danger-tint: hsl(var(--destructive, 0 84.2% 60.2%) / 0.14);
  --mova-ai-info: hsl(var(--info, 199 89% 48%));
  --mova-ai-info-tint: hsl(var(--info, 199 89% 48%) / 0.14);
  --mova-ai-neutral-status: hsl(var(--muted-foreground, 240 3.8% 46%));
  --mova-ai-status-on: #ffffff;

  --mova-ai-tooltip-bg: #292929;
  --mova-ai-tooltip-fg: #ffffff;
  --mova-ai-tooltip-muted: #c3c3c3;
  --mova-ai-tooltip-border: #484848;

  --mova-ai-radius-panel: var(--radius-lg, 8px);
  --mova-ai-radius-control: var(--radius-md, 8px);
  --mova-ai-shadow-xs: 0 1px 2px rgb(22 28 33 / 5%);
  --mova-ai-shadow-sm: 0 2px 8px rgb(22 28 33 / 7%);
  --mova-ai-shadow-md: 0 8px 20px rgb(22 28 33 / 11%);
  --mova-ai-shadow-lg: 0 14px 32px rgb(22 28 33 / 16%);
  --mova-ai-shadow-hairline: 0 0 0 1px var(--mova-ai-border);
  --mova-ai-shadow-btn: 0 0 0 1px var(--mova-ai-border-strong), var(--mova-ai-shadow-xs);
  --mova-ai-shadow-card: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-sm);
  --mova-ai-shadow-raised: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-md);
  --mova-ai-shadow-overlay: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-lg);
  --mova-ai-shadow-inset-field: inset 0 1px 2px rgb(22 28 33 / 6%);
}

.mova-ai-theme[data-theme="dark"] {
  color-scheme: dark;
  --mova-ai-page: hsl(var(--background, 240 18% 4.5%));
  --mova-ai-canvas: hsl(var(--surface-sunken, 240 18% 5%));
  --mova-ai-surface: hsl(var(--surface-elevated, 240 14% 11%));
  --mova-ai-inset: hsl(var(--surface-subtle, 240 14% 9%));
  --mova-ai-hover: hsl(var(--surface-subtle, 240 14% 12%));
  --mova-ai-hover-strong: hsl(var(--border-strong, 240 14% 22%));

  --mova-ai-ink: hsl(var(--foreground, 0 0% 98%));
  --mova-ai-ink-secondary: hsl(var(--muted-foreground, 240 5% 65%));
  --mova-ai-ink-muted: hsl(var(--subtle-foreground, 240 5% 48%));

  --mova-ai-border: hsl(var(--border, 240 14% 18%));
  --mova-ai-border-soft: hsl(var(--border-subtle, 240 14% 13%));
  --mova-ai-border-strong: hsl(var(--border-strong, 240 14% 26%));
  --mova-ai-field: hsl(var(--surface, 240 16% 8%));
  --mova-ai-grid: color-mix(in srgb, var(--mova-ai-border) 78%, transparent);
  --mova-ai-stripe: rgb(255 255 255 / 6%);
  --mova-ai-stripe-bg: #202528;

  --mova-ai-accent: hsl(var(--primary, 238.7 83.5% 66.7%));
  --mova-ai-accent-ink: hsl(var(--foreground, 0 0% 98%));
  --mova-ai-accent-foreground: hsl(var(--primary-foreground, 0 0% 100%));
  --mova-ai-accent-tint: hsl(var(--primary, 238.7 83.5% 66.7%) / 0.18);
  --mova-ai-success: hsl(var(--success, 152 69% 52%));
  --mova-ai-success-tint: hsl(var(--success, 152 69% 52%) / 0.18);
  --mova-ai-warning: hsl(var(--warning, 45 93% 58%));
  --mova-ai-warning-tint: hsl(var(--warning, 45 93% 58%) / 0.18);
  --mova-ai-danger: hsl(var(--destructive, 0 72% 51%));
  --mova-ai-danger-tint: hsl(var(--destructive, 0 72% 51%) / 0.18);
  --mova-ai-info: hsl(var(--info, 199 89% 60%));
  --mova-ai-info-tint: hsl(var(--info, 199 89% 60%) / 0.18);
  --mova-ai-neutral-status: hsl(var(--muted-foreground, 240 5% 65%));
  --mova-ai-status-on: #181818;

  --mova-ai-tooltip-bg: #121212;
  --mova-ai-tooltip-fg: #eeeeee;
  --mova-ai-tooltip-muted: #b5b5b5;
  --mova-ai-tooltip-border: #3b3b3b;

  --mova-ai-shadow-xs: 0 1px 2px rgb(0 0 0 / 22%);
  --mova-ai-shadow-sm: 0 2px 8px rgb(0 0 0 / 25%);
  --mova-ai-shadow-md: 0 8px 20px rgb(0 0 0 / 30%);
  --mova-ai-shadow-lg: 0 14px 32px rgb(0 0 0 / 38%);
  --mova-ai-shadow-hairline: 0 0 0 1px var(--mova-ai-border);
  --mova-ai-shadow-btn: 0 0 0 1px var(--mova-ai-border-strong), var(--mova-ai-shadow-xs);
  --mova-ai-shadow-card: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-sm);
  --mova-ai-shadow-raised: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-md);
  --mova-ai-shadow-overlay: 0 0 0 1px var(--mova-ai-border), var(--mova-ai-shadow-lg);
  --mova-ai-shadow-inset-field: inset 0 1px 2px rgb(0 0 0 / 42%);
}
`;
