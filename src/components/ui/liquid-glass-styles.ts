export const liquidGlassSheetStyles = `
.mova-glass-sheet{
  --panel-open-dur: 400ms;
  --panel-close-dur: 350ms;
  --panel-translate-y: 100px;
  --panel-blur: 2px;
  --panel-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --modal-open-dur: 250ms;
  --modal-close-dur: 150ms;
  --modal-scale: 0.96;
  --modal-scale-close: 0.96;
  --modal-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --scrim-dur: 150ms;
  --hl-dur: 250ms;
  --hl-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --icon-dur: 250ms;
  --press-scale: 0.97;
  --press-dur: 150ms;
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --mgs-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --mgs-ease-liquid: cubic-bezier(0.16, 1, 0.3, 1);
  --mgs-press: 160ms;
}

.mova-glass-sheet{
  position: relative;
  box-sizing: border-box;
  width: 320px;
  max-width: 100%;
  height: 360px;
  font: 400 13px/20px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  border-radius: 24px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 0 1px rgba(0,0,0,.04), 0 8px 32px -4px rgba(0,0,0,.06), 0 1px 3px 0 rgba(0,0,0,.04);
  color: #fff;
}
.mova-glass-sheet :is(button, a){font: inherit; color: inherit; text-decoration: none}
.mova-glass-sheet :where(button){border: 0; background: none; padding: 0; cursor: pointer}
.mgs-scrim{position: absolute; inset: 0; background: rgba(0, 0, 0, 0.28)}

/* Glass trigger capsule */
.mova-glass-sheet .mgs-trigger{
  position: absolute;
  left: 50%;
  bottom: 28px;
  translate: -50% 0;
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;
  width: auto;
  height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  color: #fff;
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
  background: rgb(255 255 255 / 0.10);
  -webkit-backdrop-filter: var(--mgs-trigger-filter) blur(2px) saturate(170%);
  backdrop-filter: var(--mgs-trigger-filter) blur(2px) saturate(170%);
  box-shadow:
    inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.12),
    inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.04),
    inset 0 0 0 1px rgb(255 255 255 / 0.18),
    0 0 0 0.5px rgb(255 255 255 / 0.22),
    0 8px 24px rgb(0 0 0 / 0.18);
  transition:
    transform 380ms var(--ease-spring),
    box-shadow var(--mgs-press) var(--mgs-ease-out),
    opacity var(--scrim-dur) var(--ease-smooth-out);
}
.mgs-trigger::before{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(70% 55% at 69.8% 30.2%, rgb(255 255 255 / 0.035) 0%, transparent 46%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transition: opacity 240ms var(--mgs-ease-out);
}
.mgs-trigger:hover::before{opacity: 1}
.mgs-trigger::after{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0.95) 0%, rgb(255 255 255 / 0.48) 22%, rgb(255 255 255 / 0.1) 48%, transparent 65%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transform: scale(0.65);
  transition: opacity var(--mgs-press) var(--mgs-ease-out), transform var(--mgs-press) var(--mgs-ease-out);
}
.mgs-trigger:active{transform: scale(0.94)}
.mgs-trigger:active::before{opacity: 1}
.mgs-trigger:active::after{opacity: 0.110; transform: scale(1)}
.mova-glass-sheet.is-open .mgs-trigger{opacity: 0; pointer-events: none}

@supports not (backdrop-filter: url(#mgs-filter)){
  .mova-glass-sheet .mgs-trigger{
    -webkit-backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    background: linear-gradient(145deg, rgb(255 255 255 / 0.015) 0%, rgb(255 255 255 / 0.004) 45%, rgb(255 255 255 / 0.096) 100%);
    box-shadow:
      inset 2px 2px 1px -0.5px rgb(255 255 255 / 0.066),
      inset -1.5px -1.5px 1px -0.5px rgb(255 255 255 / 0.025),
      inset 0 0 0 1.2px rgb(255 255 255 / 0.224),
      0 20px 48px rgb(0 0 0 / 0.24);
  }
  .mgs-trigger::before{opacity: 0.75}
}
@media (prefers-reduced-transparency: reduce){
  .mova-glass-sheet .mgs-trigger{-webkit-backdrop-filter: none; backdrop-filter: none; background: rgb(255 255 255 / 0.88); color: #111; text-shadow: none}
}

/* Sheet Structure */
.mgs-sheet{
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  height: 244px;
  border-radius: 28px;
  transform: translateY(var(--drag, 0px));
  transition: transform var(--panel-open-dur) var(--panel-ease);
  touch-action: none;
  pointer-events: none;
}
.mova-glass-sheet.is-open .mgs-sheet{pointer-events: auto}
.mgs-panel{position: absolute; inset: 0}
.mgs-sheet.is-dragging{transition: none !important}

/* Real Liquid Glass Material Layer */
.mgs-glass{
  position: absolute;
  inset: 0;
  isolation: isolate;
  overflow: hidden;
  border-radius: 28px;
  corner-shape: squircle;
  pointer-events: none;
  background: rgb(255 255 255 / 0.080);
  -webkit-backdrop-filter: var(--mgs-pane-filter) blur(3px) saturate(160%);
  backdrop-filter: var(--mgs-pane-filter) blur(3px) saturate(160%);
  box-shadow:
    inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.055),
    inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.018),
    inset 0 0 0 1.2px rgb(255 255 255 / 0.140),
    0 0 0 0.5px rgb(255 255 255 / 0.22),
    0 18px 40px rgb(0 0 0 / 0.2);
  transform: translateY(var(--panel-translate-y));
  opacity: 0;
  transition:
    transform var(--panel-close-dur) var(--panel-ease),
    opacity var(--panel-close-dur) var(--panel-ease),
    box-shadow var(--mgs-press) var(--mgs-ease-out);
}
.mgs-glass[data-open="true"]{
  transform: none;
  opacity: 1;
  transition:
    transform var(--panel-open-dur) var(--panel-ease),
    opacity var(--panel-open-dur) var(--panel-ease),
    box-shadow var(--mgs-press) var(--mgs-ease-out);
}
.mgs-glass::before{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(70% 55% at 69.8% 30.2%, rgb(255 255 255 / 0.035) 0%, transparent 46%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transition: opacity 240ms var(--mgs-ease-out);
}
.mgs-sheet:hover .mgs-glass::before{opacity: 1}
.mgs-glass::after{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0.95) 0%, rgb(255 255 255 / 0.48) 22%, rgb(255 255 255 / 0.1) 48%, transparent 65%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transform: scale(0.65);
  transition: opacity var(--mgs-press) var(--mgs-ease-out), transform var(--mgs-press) var(--mgs-ease-out);
}
.mgs-sheet:active .mgs-glass::before{opacity: 1}
.mgs-sheet:active .mgs-glass::after{opacity: 0.110; transform: scale(1)}

@supports not (backdrop-filter: url(#mgs-filter)){
  .mgs-glass{
    -webkit-backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    background: linear-gradient(145deg, rgb(255 255 255 / 0.015) 0%, rgb(255 255 255 / 0.004) 45%, rgb(255 255 255 / 0.096) 100%);
    box-shadow:
      inset 2px 2px 1px -0.5px rgb(255 255 255 / 0.066),
      inset -1.5px -1.5px 1px -0.5px rgb(255 255 255 / 0.025),
      inset 0 0 0 1.2px rgb(255 255 255 / 0.224),
      0 20px 48px rgb(0 0 0 / 0.24);
  }
  .mgs-glass::before{opacity: 0.75}
}
@media (prefers-reduced-transparency: reduce){
  .mgs-glass{-webkit-backdrop-filter: none; backdrop-filter: none; background: rgb(255 255 255 / 0.88)}
}

/* Grab handle & Header */
.mgs-body{position: relative; padding: 0 8px 8px}
.mgs-grab{display: flex; justify-content: center; width: 100%; height: 24px; align-items: center; cursor: grab; touch-action: none}
.mgs-grab:is(:active, .is-pressed){cursor: grabbing}
.mgs-grab span{width: 36px; height: 5px; border-radius: 5px; background: rgba(255, 255, 255, 0.7)}
.mgs-head{padding: 0 12px 8px}
.mgs-title{margin: 0; font-size: 16px; line-height: 22px; font-weight: 500}
.mgs-meta{margin: 0; font-size: 12px; line-height: 16px; color: rgba(255, 255, 255, 0.85)}

/* List & Action Rows */
.mgs-list{position: relative; display: flex; flex-direction: column; margin-top: 4px}
.mgs-hl{position: absolute; left: 0; right: 0; top: 0; height: 44px; border-radius: 16px; background: rgba(255, 255, 255, 0.2); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18); opacity: 0; transition: transform var(--hl-dur) var(--hl-ease), opacity var(--hl-dur) var(--hl-ease); pointer-events: none}
.mgs-row{box-sizing: border-box; position: relative; display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 12px 0 10px; border-radius: 16px; font-size: 13px; line-height: 20px; text-align: left; width: 100%; outline: none}
.mgs-row .mgs-label{flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis}
.mgs-row:focus-visible{box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9)}
.mgs-row .mgs-icon{flex: none}
.mgs-slot{position: relative; width: 16px; height: 16px; flex: none}
.mgs-slot .mgs-icon{position: absolute; inset: 0; transition: opacity var(--icon-dur) ease-in-out, transform var(--icon-dur) ease-in-out, filter var(--icon-dur) ease-in-out}
.mgs-slot .mgs-icon-b{opacity: 0; transform: scale(0.25); filter: blur(2px)}
.mgs-saved .mgs-slot .mgs-icon-a{opacity: 0; transform: scale(0.25); filter: blur(2px)}
.mgs-saved .mgs-slot .mgs-icon-b{opacity: 1; transform: scale(1); filter: blur(0)}

/* Link row */
.mgs-linkrow{position: relative; display: flex; align-items: center; height: 44px; border-radius: 16px}
.mgs-linkrow .mgs-row{flex: 1; min-width: 0; width: auto; padding-right: 6px}

.mgs-linkmain{cursor: pointer; transition: transform 380ms var(--ease-spring)}
.mgs-linkmain:active{transform: scale(var(--press-scale))}
.mgs-linkrow.is-copied .mgs-linkmain{animation: mgs-row-flash 700ms var(--mgs-ease-out)}
.mgs-linkrow.is-failed .mgs-linkmain{animation: mgs-copy-shake 420ms var(--mgs-ease-out)}

.mgs-linkrow.is-copied .mgs-linkmain .mgs-slot .mgs-icon-a{opacity: 0; transform: scale(0.25) rotate(-25deg); filter: blur(2px)}
.mgs-linkrow.is-copied .mgs-linkmain .mgs-slot .mgs-icon-b{opacity: 1; transform: scale(1); filter: blur(0)}
.mgs-tick{stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 380ms var(--mgs-ease-out)}
.mgs-linkrow.is-copied .mgs-linkmain .mgs-tick{stroke-dashoffset: 0; transition-delay: 140ms}

.mgs-linkrow .mgs-copy{
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  margin-right: 6px;
  border-radius: 11px;
  corner-shape: squircle;
  outline: none;
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
}
@media (hover: hover) and (pointer: fine){
  .mgs-linkrow .mgs-copy:hover{background: rgba(255, 255, 255, 0.18); color: #fff}
}
.mgs-linkrow .mgs-copy:focus-visible{box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9)}

.mgs-label-anim{animation: mgs-label-in 320ms var(--mgs-ease-out)}

@keyframes mgs-copy-shake{
  0%, 100%{transform: translateX(0)}
  20%{transform: translateX(-4px)}
  40%{transform: translateX(4px)}
  60%{transform: translateX(-3px)}
  80%{transform: translateX(2px)}
}
@keyframes mgs-label-in{
  from{opacity: 0; transform: translateY(6px); filter: blur(3px)}
  to{opacity: 1; transform: none; filter: blur(0)}
}
@keyframes mgs-row-flash{
  0%{background: rgba(255, 255, 255, 0.26)}
  100%{background: rgba(255, 255, 255, 0)}
}

/* Motion Transitions */
.mgs-t-panel-slide{
  transform: translateY(var(--panel-translate-y));
  opacity: 0;
  filter: blur(var(--panel-blur));
  pointer-events: none;
  transition:
    transform var(--panel-close-dur) var(--panel-ease),
    opacity var(--panel-close-dur) var(--panel-ease),
    filter var(--panel-close-dur) var(--panel-ease);
}
.mgs-t-panel-slide[data-open="true"]{
  transform: translateY(0);
  opacity: 1;
  filter: none;
  pointer-events: auto;
  transition:
    transform var(--panel-open-dur) var(--panel-ease),
    opacity var(--panel-open-dur) var(--panel-ease),
    filter var(--panel-open-dur) var(--panel-ease);
}
.mgs-t-modal{
  transform-origin: center;
  transform: scale(var(--modal-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-open-dur) var(--modal-ease),
    opacity var(--modal-open-dur) var(--modal-ease);
}
.mgs-t-modal.is-open{transform: scale(1); opacity: 1; pointer-events: auto}
.mgs-t-modal.is-closing{
  transform: scale(var(--modal-scale-close));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-close-dur) var(--modal-ease),
    opacity var(--modal-close-dur) var(--modal-ease);
}
@media (prefers-reduced-motion: reduce){
  .mgs-sheet, .mgs-t-panel-slide, .mgs-t-modal, .mgs-hl, .mgs-scrim, .mgs-trigger,
  .mgs-trigger::before, .mgs-trigger::after, .mgs-slot .mgs-icon, .mgs-glass,
  .mgs-glass::before, .mgs-glass::after, .mgs-linkmain, .mgs-tick{transition: none !important}
  .mgs-label-anim, .mgs-linkrow.is-copied .mgs-linkmain, .mgs-linkrow.is-failed .mgs-linkmain{animation: none !important}
}

.mova-glass-sheet :where(button, [role="button"]){
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
}
.mova-glass-sheet *{box-sizing: border-box}
.mgs-trigger:focus-visible, .mgs-grab:focus-visible{outline: 2px solid #fff; outline-offset: -3px}
.mgs-status{
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
`;
