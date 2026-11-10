export const BOARD_SCOPED_STYLES = `
  .rudder-board :is(button,input,select,summary):focus-visible { outline: 2px solid var(--mova-ai-accent,#c2c2c2); outline-offset: 2px; }
  .rudder-board { container-type: inline-size; }
  .rudder-board .motion-kanban-lane[data-status] { position: relative; overflow: hidden; }
  .rudder-board .motion-kanban-lane[data-status] { background: color-mix(in srgb, var(--lane-tint) 30%, var(--mova-ai-canvas,#202020)); border-color: color-mix(in srgb, var(--lane-status) 38%, var(--mova-ai-border,#3b3b3b)); }
  .rudder-board .motion-kanban-lane[data-status][data-over="true"] { background: color-mix(in srgb, var(--lane-tint) 48%, var(--mova-ai-hover,#2d2d2d)); border-color: color-mix(in srgb, var(--lane-status) 68%, var(--mova-ai-border-strong,#505050)); }
  .rudder-board .motion-kanban-lane[data-status]::after { content: ""; position: absolute; inset-inline: 7px; bottom: 0; height: 2px; border-radius: 999px; background: var(--lane-status); opacity: .82; pointer-events: none; }
  .rudder-board .motion-kanban-lane[data-status][data-over="true"]::after { opacity: 1; height: 3px; }
  .rudder-list-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 40%); align-items: start; gap: 16px; }
  .rudder-list-meta { justify-content: flex-end; padding-top: 2px; }
  @container (max-width: 640px) {
    .rudder-list-row { grid-template-columns: minmax(0, 1fr); gap: 8px; }
    .rudder-list-meta { justify-content: flex-start; padding-left: 26px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .motion-kanban-card,
    .motion-kanban-lane {
      animation: none !important;
      transition: none !important;
    }
  }
`;
