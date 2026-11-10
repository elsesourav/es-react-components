'use client';

import { useEffect, useLayoutEffect } from 'react';

export interface ElasticMotionPhysicsState {
  progress: number;
  progressVelocity: number;
  targetProgress: number;
  stretchOffset: number;
  stretchVelocity: number;
  stretchDirection: number;
  isOverstretched: boolean;
  activeTransition: number;
  activeVelocity: number;
  activeGoal: number;
  trackLengthPx: number;
  isDragging: boolean;
  isHovered: boolean;
  isFocused: boolean;
  rafHandle: number;
  lastFrameTime: number;
  isInitialized: boolean;
}

export interface ElasticPointerDragSession {
  pointerId: number;
  startClientCoord: number;
  initialProgress: number | null;
}

export const ELASTIC_ROOT_CLASS =
  'group/es flex w-full max-w-xs touch-none flex-col items-center gap-2 text-inherit select-none [-webkit-tap-highlight-color:transparent] data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[orientation=vertical]:h-56 data-[orientation=vertical]:w-auto';
export const ELASTIC_VALUE_LABEL_CLASS = 'text-xs leading-none font-medium tabular-nums opacity-60';
export const ELASTIC_BODY_CLASS =
  'flex min-h-0 w-full flex-1 items-center gap-3 group-data-[orientation=vertical]/es:h-full group-data-[orientation=vertical]/es:w-auto group-data-[orientation=vertical]/es:flex-col-reverse';
export const ELASTIC_ICON_WRAPPER_CLASS =
  'grid shrink-0 place-items-center text-[color:var(--elastic-slider-icon,currentColor)] will-change-transform';
export const ELASTIC_ICON_INNER_CLASS = 'grid place-items-center';
export const ELASTIC_HIT_AREA_CLASS =
  'group/hit relative flex h-[var(--elastic-slider-hit,34px)] min-w-0 flex-1 cursor-grab touch-none items-center outline-none data-[dragging]:cursor-grabbing group-data-[orientation=vertical]/es:h-auto group-data-[orientation=vertical]/es:min-h-0 group-data-[orientation=vertical]/es:w-[var(--elastic-slider-hit,34px)] group-data-[orientation=vertical]/es:flex-col group-data-[orientation=vertical]/es:justify-end';
export const ELASTIC_TRACK_CLASS =
  'relative h-1.5 w-full shrink-0 overflow-hidden rounded-[var(--elastic-slider-radius,999px)] [background:var(--elastic-slider-track)] will-change-transform group-focus-visible/hit:outline-2 group-focus-visible/hit:outline-offset-3 group-focus-visible/hit:outline-current group-data-[orientation=vertical]/es:h-full group-data-[orientation=vertical]/es:w-1.5';
export const ELASTIC_RANGE_FILL_CLASS =
  'absolute inset-0 [background:var(--elastic-slider-range)] [clip-path:inset(0_100%_0_0)]';
export const ELASTIC_CONTENT_CLASS =
  'pointer-events-none absolute inset-0 flex items-center justify-between px-[var(--elastic-slider-pad,12px)] text-[13px] leading-none font-semibold tabular-nums opacity-[var(--elastic-slider-reveal,1)] *:grid *:place-items-center *:[transform:var(--elastic-slider-unscale,none)] group-data-[orientation=vertical]/es:flex-col-reverse group-data-[orientation=vertical]/es:px-0 group-data-[orientation=vertical]/es:py-[var(--elastic-slider-pad,12px)] text-[color:var(--elastic-slider-content)]';
export const ELASTIC_ACTIVE_CONTENT_CLASS =
  'pointer-events-none absolute inset-0 flex items-center justify-between px-[var(--elastic-slider-pad,12px)] text-[13px] leading-none font-semibold tabular-nums opacity-[var(--elastic-slider-reveal,1)] *:grid *:place-items-center *:[transform:var(--elastic-slider-unscale,none)] group-data-[orientation=vertical]/es:flex-col-reverse group-data-[orientation=vertical]/es:px-0 group-data-[orientation=vertical]/es:py-[var(--elastic-slider-pad,12px)] text-[color:var(--elastic-slider-fill-content)]';
export const ELASTIC_TICK_MARK_CLASS =
  'absolute top-1/2 -mt-[1.5px] -ml-[1.5px] size-[3px] rounded-full group-data-[orientation=vertical]/es:top-auto group-data-[orientation=vertical]/es:left-1/2 group-data-[orientation=vertical]/es:mt-0 group-data-[orientation=vertical]/es:-mb-[1.5px] [background:var(--elastic-slider-content)] opacity-40';
export const ELASTIC_ACTIVE_TICK_CLASS =
  'absolute top-1/2 -mt-[1.5px] -ml-[1.5px] size-[3px] rounded-full group-data-[orientation=vertical]/es:top-auto group-data-[orientation=vertical]/es:left-1/2 group-data-[orientation=vertical]/es:mt-0 group-data-[orientation=vertical]/es:-mb-[1.5px] [background:var(--elastic-slider-fill-content)] opacity-50';
export const ELASTIC_THUMB_CLASS =
  'pointer-events-none absolute top-1/2 left-0 mt-[calc(var(--elastic-slider-thumb-size,18px)/-2)] ml-[calc(var(--elastic-slider-thumb-size,18px)/-2)] size-[var(--elastic-slider-thumb-size,18px)] rounded-full [background:var(--elastic-slider-thumb,#ffffff)] shadow-[0_1px_4px_rgba(0,0,0,0.28),0_0_0_0.5px_rgba(0,0,0,0.12)] ring-1 ring-black/15 dark:ring-white/25 will-change-transform group-data-[orientation=vertical]/es:top-auto group-data-[orientation=vertical]/es:bottom-0 group-data-[orientation=vertical]/es:left-1/2 group-data-[orientation=vertical]/es:mt-0 group-data-[orientation=vertical]/es:mb-[calc(var(--elastic-slider-thumb-size,18px)/-2)]';
export const ELASTIC_VALUE_BUBBLE_CLASS =
  'pointer-events-none absolute bottom-[calc(50%+var(--elastic-slider-bubble-offset,14px))] left-0 origin-bottom rounded-lg px-2.5 py-1 text-xs leading-[1.2] font-semibold whitespace-nowrap tabular-nums opacity-0 [background:var(--elastic-slider-range)] shadow-lg ring-1 ring-black/10 dark:ring-white/20 will-change-[transform,opacity] group-data-[orientation=vertical]/es:bottom-0 group-data-[orientation=vertical]/es:left-[calc(50%+var(--elastic-slider-bubble-offset,14px))] group-data-[orientation=vertical]/es:origin-left';
export const ELASTIC_BUBBLE_TEXT_CLASS = 'text-[color:var(--elastic-slider-fill-content)] font-mono text-xs';

export const TWO_PI = Math.PI * 2;
export const VALID_VALUE_POSITIONS = ['top', 'bubble', 'inside', 'none'] as const;
export const DARK_INK_COLOR = 'rgba(18, 15, 23, 0.86)';
export const LIGHT_INK_COLOR = 'rgba(255, 255, 255, 0.94)';

export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const getDecimalPlaces = (step: number) => {
  const text = String(step);
  return text.includes('.') ? text.split('.')[1].length : 0;
};

export const calculateRubberBandDistance = (distance: number, limit: number) =>
  limit > 0 ? 2 * (1 / (1 + Math.exp(-distance / limit)) - 0.5) * limit : 0;

export const checkPrefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

let canvasProbeContext: CanvasRenderingContext2D | null = null;

export const parseCssColorToRgba = (colorString: string): number[] | null => {
  const match = /^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/.exec(colorString);
  if (match) {
    return [
      Number(match[1]),
      Number(match[2]),
      Number(match[3]),
      match[4] === undefined ? 1 : Number(match[4]),
    ];
  }
  if (typeof document === 'undefined') return null;
  if (!canvasProbeContext) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvasProbeContext = canvas.getContext('2d', { willReadFrequently: true });
  }
  if (!canvasProbeContext) return null;
  canvasProbeContext.clearRect(0, 0, 1, 1);
  canvasProbeContext.fillStyle = '#000000';
  canvasProbeContext.fillStyle = colorString;
  canvasProbeContext.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = canvasProbeContext.getImageData(0, 0, 1, 1).data;
  return [r, g, b, a / 255];
};

export function applyElasticSliderVisuals({
  physics,
  config,
  track,
  range,
  thumb,
  bubble,
  startIcon,
  endIcon,
  body,
}: {
  physics: ElasticMotionPhysicsState;
  config: {
    baseThickness: number;
    expandedThickness: number;
    isVerticalOrientation: boolean;
    stretchLimit: number;
    originFraction: number;
    cornerRadius?: number;
    idleOpacity: number;
  };
  track: HTMLDivElement | null;
  range: HTMLDivElement | null;
  thumb: HTMLSpanElement | null;
  bubble: HTMLSpanElement | null;
  startIcon: HTMLSpanElement | null;
  endIcon: HTMLSpanElement | null;
  body: HTMLDivElement | null;
}) {
  if (!track || !range) return;

  const dynamicThickness =
    config.baseThickness + (config.expandedThickness - config.baseThickness) * physics.activeTransition;
  track.style.width = config.isVerticalOrientation ? `${dynamicThickness.toFixed(2)}px` : '';
  track.style.height = config.isVerticalOrientation ? '' : `${dynamicThickness.toFixed(2)}px`;
  track.style.setProperty('--elastic-slider-reveal', clampNumber((dynamicThickness - 14) / 10, 0, 1).toFixed(3));

  const length = Math.max(1, physics.trackLengthPx);
  const alongScale = 1 + physics.stretchOffset / length;
  const acrossScale = 1 - 0.22 * clampNumber(physics.stretchOffset / Math.max(1, config.stretchLimit), -1, 1);
  const isAtEnd = physics.stretchDirection > 0;

  track.style.transformOrigin = config.isVerticalOrientation
    ? isAtEnd
      ? '50% 100%'
      : '50% 0%'
    : isAtEnd
      ? '0% 50%'
      : '100% 50%';

  const scaleX = config.isVerticalOrientation ? acrossScale : alongScale;
  const scaleY = config.isVerticalOrientation ? alongScale : acrossScale;
  track.style.transform = `scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
  track.style.setProperty(
    '--elastic-slider-unscale',
    `scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`
  );

  const progressFraction = clampNumber(physics.progress, 0, 1);
  const fromPercent = (Math.min(config.originFraction, progressFraction) * 100).toFixed(3);
  const toPercent = ((1 - Math.max(config.originFraction, progressFraction)) * 100).toFixed(3);
  const roundedRadius = (config.cornerRadius ?? dynamicThickness / 2).toFixed(2);

  range.style.clipPath = config.isVerticalOrientation
    ? `inset(${toPercent}% 0 ${fromPercent}% 0 round ${roundedRadius}px)`
    : `inset(0 ${toPercent}% 0 ${fromPercent}% round ${roundedRadius}px)`;

  const absolutePosition = isAtEnd
    ? progressFraction * length * alongScale
    : length - (1 - progressFraction) * length * alongScale;

  const thumbShift = config.isVerticalOrientation
    ? `translate3d(0, ${(-absolutePosition).toFixed(2)}px, 0)`
    : `translate3d(${absolutePosition.toFixed(2)}px, 0, 0)`;

  if (thumb) {
    thumb.style.transform = `${thumbShift} scale(${(1 + 0.12 * physics.activeTransition).toFixed(3)})`;
  }
  if (bubble) {
    const bubbleCenter = config.isVerticalOrientation ? 'translate(0, 50%)' : 'translate(-50%, 0)';
    bubble.style.transform = `${thumbShift} ${bubbleCenter} scale(${(0.7 + 0.3 * physics.activeTransition).toFixed(3)})`;
    bubble.style.opacity = clampNumber(physics.activeTransition * 1.4 - 0.2, 0, 1).toFixed(3);
  }

  const startOffset = isAtEnd ? 0 : physics.stretchOffset;
  const endOffset = isAtEnd ? physics.stretchOffset : 0;
  const iconScale = (1 + 0.08 * physics.activeTransition).toFixed(3);

  if (startIcon) {
    startIcon.style.transform = config.isVerticalOrientation
      ? `translate3d(0, ${startOffset.toFixed(2)}px, 0) scale(${iconScale})`
      : `translate3d(${(-startOffset).toFixed(2)}px, 0, 0) scale(${iconScale})`;
  }
  if (endIcon) {
    endIcon.style.transform = config.isVerticalOrientation
      ? `translate3d(0, ${(-endOffset).toFixed(2)}px, 0) scale(${iconScale})`
      : `translate3d(${endOffset.toFixed(2)}px, 0, 0) scale(${iconScale})`;
  }
  if (body) {
    body.style.opacity =
      config.idleOpacity < 1
        ? (config.idleOpacity + (1 - config.idleOpacity) * physics.activeTransition).toFixed(3)
        : '';
  }
}
