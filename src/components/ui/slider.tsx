'use client';

import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { VolumeHighIcon, VolumeLowIcon } from '@hugeicons/core-free-icons';
import {
  frame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useVelocity,
} from 'motion/react';
import type { SliderProps as AriaSliderProps } from 'react-aria-components';
import {
  Label as AriaLabel,
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from 'react-aria-components';
import { cn } from '@/lib/utils';

// ══════════════════════════════════════════════════════════════════════════
// 1. ELASTIC SLIDER
// ══════════════════════════════════════════════════════════════════════════

export interface ElasticSliderProps {
  value?: number;
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  isStepped?: boolean;
  stepSize?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  orientation?: 'horizontal' | 'vertical';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconPlacement?: 'outside' | 'inside';
  valuePosition?: 'top' | 'bubble' | 'inside' | 'none';
  formatValue?: (value: number) => string;
  ticks?: boolean | number[];
  thumb?: boolean;
  fillFrom?: number;
  thickness?: number;
  activeThickness?: number;
  radius?: number;
  restOpacity?: number;
  growOnHover?: boolean;
  maxStretch?: number;
  bounce?: number;
  jumpToClick?: boolean;
  wheel?: boolean;
  trackColor?: string;
  rangeColor?: string;
  iconColor?: string;
  contentColor?: string;
  fillContentColor?: string;
  thumbColor?: string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

interface ElasticMotionPhysicsState {
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

interface ElasticPointerDragSession {
  pointerId: number;
  startClientCoord: number;
  initialProgress: number | null;
}

const ELASTIC_ROOT_CLASS =
  'group/es flex w-48 touch-none flex-col items-center gap-2 text-inherit select-none [-webkit-tap-highlight-color:transparent] data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-auto';
const ELASTIC_VALUE_LABEL_CLASS = 'text-xs leading-none font-medium tabular-nums opacity-60';
const ELASTIC_BODY_CLASS =
  'flex min-h-0 w-full flex-1 items-center gap-3 group-data-[orientation=vertical]/es:h-full group-data-[orientation=vertical]/es:w-auto group-data-[orientation=vertical]/es:flex-col-reverse';
const ELASTIC_ICON_WRAPPER_CLASS =
  'grid shrink-0 place-items-center text-[color:var(--elastic-slider-icon,currentColor)] will-change-transform';
const ELASTIC_ICON_INNER_CLASS = 'grid place-items-center';
const ELASTIC_HIT_AREA_CLASS =
  'group/hit relative flex h-[var(--elastic-slider-hit,34px)] min-w-0 flex-1 cursor-grab touch-none items-center outline-none data-[dragging]:cursor-grabbing group-data-[orientation=vertical]/es:h-auto group-data-[orientation=vertical]/es:min-h-0 group-data-[orientation=vertical]/es:w-[var(--elastic-slider-hit,34px)] group-data-[orientation=vertical]/es:flex-col group-data-[orientation=vertical]/es:justify-end';
const ELASTIC_TRACK_CLASS =
  'relative h-1.5 w-full shrink-0 overflow-hidden rounded-[var(--elastic-slider-radius,999px)] [background:var(--elastic-slider-track)] will-change-transform group-focus-visible/hit:outline-2 group-focus-visible/hit:outline-offset-3 group-focus-visible/hit:outline-current group-data-[orientation=vertical]/es:h-full group-data-[orientation=vertical]/es:w-1.5';
const ELASTIC_RANGE_FILL_CLASS =
  'absolute inset-0 [background:var(--elastic-slider-range)] [clip-path:inset(0_100%_0_0)]';
const ELASTIC_CONTENT_CLASS =
  'pointer-events-none absolute inset-0 flex items-center justify-between px-[var(--elastic-slider-pad,12px)] text-[13px] leading-none font-semibold tabular-nums opacity-[var(--elastic-slider-reveal,1)] *:grid *:place-items-center *:[transform:var(--elastic-slider-unscale,none)] group-data-[orientation=vertical]/es:flex-col-reverse group-data-[orientation=vertical]/es:px-0 group-data-[orientation=vertical]/es:py-[var(--elastic-slider-pad,12px)] text-[color:var(--elastic-slider-content)]';
const ELASTIC_ACTIVE_CONTENT_CLASS =
  'pointer-events-none absolute inset-0 flex items-center justify-between px-[var(--elastic-slider-pad,12px)] text-[13px] leading-none font-semibold tabular-nums opacity-[var(--elastic-slider-reveal,1)] *:grid *:place-items-center *:[transform:var(--elastic-slider-unscale,none)] group-data-[orientation=vertical]/es:flex-col-reverse group-data-[orientation=vertical]/es:px-0 group-data-[orientation=vertical]/es:py-[var(--elastic-slider-pad,12px)] text-[color:var(--elastic-slider-fill-content)]';
const ELASTIC_TICK_MARK_CLASS =
  'absolute top-1/2 -mt-[1.5px] -ml-[1.5px] size-[3px] rounded-full group-data-[orientation=vertical]/es:top-auto group-data-[orientation=vertical]/es:left-1/2 group-data-[orientation=vertical]/es:mt-0 group-data-[orientation=vertical]/es:-mb-[1.5px] [background:var(--elastic-slider-content)] opacity-40';
const ELASTIC_ACTIVE_TICK_CLASS =
  'absolute top-1/2 -mt-[1.5px] -ml-[1.5px] size-[3px] rounded-full group-data-[orientation=vertical]/es:top-auto group-data-[orientation=vertical]/es:left-1/2 group-data-[orientation=vertical]/es:mt-0 group-data-[orientation=vertical]/es:-mb-[1.5px] [background:var(--elastic-slider-fill-content)] opacity-50';
const ELASTIC_THUMB_CLASS =
  'pointer-events-none absolute top-1/2 left-0 mt-[calc(var(--elastic-slider-thumb-size,18px)/-2)] ml-[calc(var(--elastic-slider-thumb-size,18px)/-2)] size-[var(--elastic-slider-thumb-size,18px)] rounded-full [background:var(--elastic-slider-thumb,#ffffff)] shadow-[0_1px_4px_rgba(0,0,0,0.28),0_0_0_0.5px_rgba(0,0,0,0.12)] will-change-transform group-data-[orientation=vertical]/es:top-auto group-data-[orientation=vertical]/es:bottom-0 group-data-[orientation=vertical]/es:left-1/2 group-data-[orientation=vertical]/es:mt-0 group-data-[orientation=vertical]/es:mb-[calc(var(--elastic-slider-thumb-size,18px)/-2)]';
const ELASTIC_VALUE_BUBBLE_CLASS =
  'pointer-events-none absolute bottom-[calc(50%+var(--elastic-slider-bubble-offset,14px))] left-0 origin-bottom rounded-lg px-2 py-[5px] text-xs leading-[1.2] font-semibold whitespace-nowrap tabular-nums opacity-0 [background:var(--elastic-slider-range)] will-change-[transform,opacity] group-data-[orientation=vertical]/es:bottom-0 group-data-[orientation=vertical]/es:left-[calc(50%+var(--elastic-slider-bubble-offset,14px))] group-data-[orientation=vertical]/es:origin-left';
const ELASTIC_BUBBLE_TEXT_CLASS = 'text-[color:var(--elastic-slider-fill-content)]';

const TWO_PI = Math.PI * 2;
const VALID_VALUE_POSITIONS = ['top', 'bubble', 'inside', 'none'] as const;
const DARK_INK_COLOR = 'rgba(18, 15, 23, 0.86)';
const LIGHT_INK_COLOR = 'rgba(255, 255, 255, 0.94)';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getDecimalPlaces = (step: number) => {
  const text = String(step);
  return text.includes('.') ? text.split('.')[1].length : 0;
};

const calculateRubberBandDistance = (distance: number, limit: number) =>
  limit > 0 ? 2 * (1 / (1 + Math.exp(-distance / limit)) - 0.5) * limit : 0;

const checkPrefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

let canvasProbeContext: CanvasRenderingContext2D | null = null;

const parseCssColorToRgba = (colorString: string): number[] | null => {
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

export function ElasticSlider({
  value,
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  isStepped = false,
  stepSize = 1,
  onChange,
  onChangeEnd,
  orientation = 'horizontal',
  leftIcon = <HugeiconsIcon icon={VolumeLowIcon} size={20} strokeWidth={1.75} />,
  rightIcon = <HugeiconsIcon icon={VolumeHighIcon} size={20} strokeWidth={1.75} />,
  iconPlacement = 'outside',
  valuePosition = 'top',
  formatValue,
  ticks = false,
  thumb = false,
  fillFrom,
  thickness = 6,
  activeThickness = 12,
  radius,
  restOpacity = 0.7,
  growOnHover = true,
  maxStretch = 50,
  bounce = 0.5,
  jumpToClick = true,
  wheel = false,
  trackColor = 'color-mix(in srgb, currentColor 18%, transparent)',
  rangeColor = 'currentColor',
  iconColor = 'currentColor',
  contentColor = 'currentColor',
  fillContentColor = 'auto',
  thumbColor = '#ffffff',
  disabled = false,
  ariaLabel = 'Slider',
  className = '',
  style,
}: ElasticSliderProps) {
  const rootElementRef = useRef<HTMLDivElement>(null);
  const hitAreaRef = useRef<HTMLDivElement>(null);
  const bodyElementRef = useRef<HTMLDivElement>(null);
  const trackElementRef = useRef<HTMLDivElement>(null);
  const rangeElementRef = useRef<HTMLDivElement>(null);
  const thumbElementRef = useRef<HTMLSpanElement>(null);
  const bubbleElementRef = useRef<HTMLSpanElement>(null);
  const startIconRef = useRef<HTMLSpanElement>(null);
  const endIconRef = useRef<HTMLSpanElement>(null);

  const motionPhysicsRef = useRef<ElasticMotionPhysicsState>({
    progress: 0,
    progressVelocity: 0,
    targetProgress: 0,
    stretchOffset: 0,
    stretchVelocity: 0,
    stretchDirection: 1,
    isOverstretched: false,
    activeTransition: 0,
    activeVelocity: 0,
    activeGoal: 0,
    trackLengthPx: 0,
    isDragging: false,
    isHovered: false,
    isFocused: false,
    rafHandle: 0,
    lastFrameTime: 0,
    isInitialized: false,
  });
  const dragSessionRef = useRef<ElasticPointerDragSession | null>(null);

  const resolvedMin = Math.min(startingValue, maxValue);
  const resolvedMax = Math.max(startingValue, maxValue);
  const totalRange = resolvedMax - resolvedMin || 1;
  const effectiveStep = isStepped && stepSize > 0 ? stepSize : 0;
  const isVertical = orientation === 'vertical';
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = clampNumber(isControlled ? value : internalValue, resolvedMin, resolvedMax);
  const currentValueRef = useRef(currentValue);

  const sliderConfig = {
    minVal: resolvedMin,
    maxVal: resolvedMax,
    rangeSpan: totalRange,
    stepIncrement: effectiveStep,
    isVerticalOrientation: isVertical,
    originFraction: clampNumber(((fillFrom ?? resolvedMin) - resolvedMin) / totalRange, 0, 1),
    baseThickness: Math.max(1, thickness),
    expandedThickness: Math.max(1, activeThickness),
    cornerRadius: radius,
    idleOpacity: clampNumber(restOpacity, 0, 1),
    enableGrowOnHover: growOnHover,
    stretchLimit: Math.max(0, maxStretch),
    elasticBounce: clampNumber(bounce, 0, 0.95),
    enableJumpToClick: jumpToClick,
    isControlledValue: isControlled,
    onValueChange: onChange,
    onValueChangeEnd: onChangeEnd,
  };
  const sliderConfigRef = useRef(sliderConfig);
  sliderConfigRef.current = sliderConfig;

  const snapValueToStep = (raw: number) => {
    const config = sliderConfigRef.current;
    let next = clampNumber(raw, config.minVal, config.maxVal);
    if (config.stepIncrement) {
      next = clampNumber(
        config.minVal + Math.round((next - config.minVal) / config.stepIncrement) * config.stepIncrement,
        config.minVal,
        config.maxVal
      );
    }
    return Number(next.toFixed(10));
  };

  const updateVisualStyles = () => {
    const physics = motionPhysicsRef.current;
    const config = sliderConfigRef.current;
    const track = trackElementRef.current;
    const range = rangeElementRef.current;
    if (!track || !range) return;

    const dynamicThickness = config.baseThickness + (config.expandedThickness - config.baseThickness) * physics.activeTransition;
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

    if (thumbElementRef.current) {
      thumbElementRef.current.style.transform = `${thumbShift} scale(${(1 + 0.12 * physics.activeTransition).toFixed(3)})`;
    }
    if (bubbleElementRef.current) {
      const bubbleCenter = config.isVerticalOrientation ? 'translate(0, 50%)' : 'translate(-50%, 0)';
      bubbleElementRef.current.style.transform = `${thumbShift} ${bubbleCenter} scale(${(0.7 + 0.3 * physics.activeTransition).toFixed(3)})`;
      bubbleElementRef.current.style.opacity = clampNumber(physics.activeTransition * 1.4 - 0.2, 0, 1).toFixed(3);
    }

    const startOffset = isAtEnd ? 0 : physics.stretchOffset;
    const endOffset = isAtEnd ? physics.stretchOffset : 0;
    const iconScale = (1 + 0.08 * physics.activeTransition).toFixed(3);

    if (startIconRef.current) {
      startIconRef.current.style.transform = config.isVerticalOrientation
        ? `translate3d(0, ${startOffset.toFixed(2)}px, 0) scale(${iconScale})`
        : `translate3d(${(-startOffset).toFixed(2)}px, 0, 0) scale(${iconScale})`;
    }
    if (endIconRef.current) {
      endIconRef.current.style.transform = config.isVerticalOrientation
        ? `translate3d(0, ${(-endOffset).toFixed(2)}px, 0) scale(${iconScale})`
        : `translate3d(${endOffset.toFixed(2)}px, 0, 0) scale(${iconScale})`;
    }
    if (bodyElementRef.current) {
      bodyElementRef.current.style.opacity =
        config.idleOpacity < 1
          ? (config.idleOpacity + (1 - config.idleOpacity) * physics.activeTransition).toFixed(3)
          : '';
    }
  };

  const animationLoopFrame = (timestamp: number) => {
    const physics = motionPhysicsRef.current;
    physics.rafHandle = 0;
    const config = sliderConfigRef.current;
    const elapsedSeconds = clampNumber((timestamp - physics.lastFrameTime) / 1000, 0, 1 / 20);
    physics.lastFrameTime = timestamp;

    if (checkPrefersReducedMotion()) {
      physics.progress = physics.targetProgress;
      physics.progressVelocity = 0;
      if (!physics.isOverstretched) {
        physics.stretchOffset = 0;
        physics.stretchVelocity = 0;
      }
      physics.activeTransition = physics.activeGoal;
      physics.activeVelocity = 0;
    } else {
      const subSteps = Math.max(1, Math.ceil(elapsedSeconds / (1 / 240)));
      const deltaT = elapsedSeconds / subSteps;
      const fillAngularFreq = TWO_PI / (physics.isDragging ? 0.09 : 0.3);
      const fillDampingRatio = physics.isDragging ? 1 : 0.86;
      const stretchAngularFreq = TWO_PI / 0.42;
      const stretchDampingRatio = 1 - 0.9 * config.elasticBounce;
      const activeAngularFreq = TWO_PI / 0.32;

      for (let i = 0; i < subSteps; i++) {
        physics.progressVelocity +=
          (-fillAngularFreq * fillAngularFreq * (physics.progress - physics.targetProgress) -
            2 * fillDampingRatio * fillAngularFreq * physics.progressVelocity) *
          deltaT;
        physics.progress += physics.progressVelocity * deltaT;

        if (!physics.isOverstretched) {
          physics.stretchVelocity +=
            (-stretchAngularFreq * stretchAngularFreq * physics.stretchOffset -
              2 * stretchDampingRatio * stretchAngularFreq * physics.stretchVelocity) *
            deltaT;
          physics.stretchOffset += physics.stretchVelocity * deltaT;
        }

        physics.activeVelocity +=
          (-activeAngularFreq * activeAngularFreq * (physics.activeTransition - physics.activeGoal) -
            2 * 0.9 * activeAngularFreq * physics.activeVelocity) *
          deltaT;
        physics.activeTransition += physics.activeVelocity * deltaT;
      }
    }

    const hasSettled =
      Math.abs(physics.progress - physics.targetProgress) < 0.0004 &&
      Math.abs(physics.progressVelocity) < 0.002 &&
      (physics.isOverstretched || (Math.abs(physics.stretchOffset) < 0.05 && Math.abs(physics.stretchVelocity) < 0.5)) &&
      Math.abs(physics.activeTransition - physics.activeGoal) < 0.002 &&
      Math.abs(physics.activeVelocity) < 0.005;

    if (hasSettled) {
      physics.progress = physics.targetProgress;
      physics.progressVelocity = 0;
      physics.activeTransition = physics.activeGoal;
      physics.activeVelocity = 0;
      if (!physics.isOverstretched) {
        physics.stretchOffset = 0;
        physics.stretchVelocity = 0;
      }
    }

    updateVisualStyles();

    if (!hasSettled || physics.isDragging) {
      physics.rafHandle = requestAnimationFrame(animationLoopFrame);
    }
  };

  const requestPhysicsLoop = () => {
    const physics = motionPhysicsRef.current;
    if (physics.rafHandle || typeof window === 'undefined') return;
    physics.lastFrameTime = performance.now();
    physics.rafHandle = requestAnimationFrame(animationLoopFrame);
  };

  const computeAutomaticInkColor = () => {
    const root = rootElementRef.current;
    const range = rangeElementRef.current;
    if (!root || !range || fillContentColor !== 'auto') return;
    const colorRgba = parseCssColorToRgba(getComputedStyle(range).backgroundColor);
    const ink =
      !colorRgba || colorRgba[3] < 0.5
        ? 'var(--elastic-slider-content)'
        : (0.2126 * colorRgba[0] + 0.7152 * colorRgba[1] + 0.0722 * colorRgba[2]) / 255 > 0.55
          ? DARK_INK_COLOR
          : LIGHT_INK_COLOR;
    root.style.setProperty('--elastic-slider-fill-content', ink);
  };

  const refreshActiveGoal = () => {
    const physics = motionPhysicsRef.current;
    physics.activeGoal =
      (physics.isHovered && sliderConfigRef.current.enableGrowOnHover) || physics.isDragging || physics.isFocused ? 1 : 0;
    requestPhysicsLoop();
  };

  const triggerPulseAnimation = (directionSign: number) => {
    const iconElement = (directionSign > 0 ? endIconRef : startIconRef).current?.firstElementChild;
    if (!iconElement || checkPrefersReducedMotion()) return;
    iconElement.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], {
      duration: 280,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  };

  const triggerEdgeBump = (directionSign: number) => {
    const physics = motionPhysicsRef.current;
    const config = sliderConfigRef.current;
    if (!config.stretchLimit || physics.isOverstretched || Math.abs(physics.stretchVelocity) > 40 || Math.abs(physics.stretchOffset) > 2) return;
    physics.stretchDirection = directionSign;
    physics.stretchVelocity = config.stretchLimit * 5.5;
    triggerPulseAnimation(directionSign);
    requestPhysicsLoop();
  };

  const commitSliderValue = (nextVal: number) => {
    const config = sliderConfigRef.current;
    motionPhysicsRef.current.targetProgress = (nextVal - config.minVal) / config.rangeSpan;
    requestPhysicsLoop();
    if (nextVal === currentValueRef.current) return;
    currentValueRef.current = nextVal;
    if (!config.isControlledValue) setInternalValue(nextVal);
    config.onValueChange?.(nextVal);
  };

  const snapValueRef = useRef(snapValueToStep);
  snapValueRef.current = snapValueToStep;
  const bumpEdgeRef = useRef(triggerEdgeBump);
  bumpEdgeRef.current = triggerEdgeBump;
  const commitValueRef = useRef(commitSliderValue);
  commitValueRef.current = commitSliderValue;
  const goalUpdaterRef = useRef(refreshActiveGoal);
  goalUpdaterRef.current = refreshActiveGoal;

  useIsomorphicLayoutEffect(() => {
    const physics = motionPhysicsRef.current;
    currentValueRef.current = currentValue;
    const fraction = (currentValue - resolvedMin) / totalRange;
    if (!physics.isDragging) physics.targetProgress = fraction;
    if (!physics.isInitialized) {
      physics.isInitialized = true;
      physics.progress = fraction;
      updateVisualStyles();
      return;
    }
    requestPhysicsLoop();
  }, [currentValue, resolvedMin, totalRange]);

  useIsomorphicLayoutEffect(() => {
    const hitArea = hitAreaRef.current;
    if (!hitArea) return undefined;
    const measureTrack = () => {
      motionPhysicsRef.current.trackLengthPx = sliderConfigRef.current.isVerticalOrientation
        ? hitArea.clientHeight
        : hitArea.clientWidth;
      updateVisualStyles();
    };
    measureTrack();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measureTrack);
    observer.observe(hitArea);
    return () => observer.disconnect();
  }, [isVertical]);

  useIsomorphicLayoutEffect(() => {
    computeAutomaticInkColor();
    updateVisualStyles();
  });

  useEffect(() => {
    goalUpdaterRef.current();
  }, [growOnHover]);

  useEffect(() => {
    const hitArea = hitAreaRef.current;
    if (!hitArea || !wheel || disabled) return undefined;
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    const handleWheelEvent = (event: WheelEvent) => {
      event.preventDefault();
      const config = sliderConfigRef.current;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? -event.deltaY : event.deltaX;
      if (!delta) return;
      const amount = config.stepIncrement ? Math.sign(delta) * config.stepIncrement : (delta * config.rangeSpan) / 800;
      const nextSnapped = snapValueRef.current(currentValueRef.current + amount);
      if (nextSnapped === currentValueRef.current) {
        bumpEdgeRef.current(Math.sign(delta));
        return;
      }
      commitValueRef.current(nextSnapped);
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => sliderConfigRef.current.onValueChangeEnd?.(currentValueRef.current), 200);
    };

    hitArea.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => {
      clearTimeout(debounceTimer);
      hitArea.removeEventListener('wheel', handleWheelEvent);
    };
  }, [wheel, disabled]);

  useEffect(() => {
    const physics = motionPhysicsRef.current;
    return () => cancelAnimationFrame(physics.rafHandle);
  }, []);

  const getAlongAxisPosition = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = hitAreaRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return sliderConfigRef.current.isVerticalOrientation ? rect.bottom - event.clientY : event.clientX - rect.left;
  };

  const handlePointerMoveTrack = (event: ReactPointerEvent<HTMLDivElement>) => {
    const session = dragSessionRef.current;
    if (!session) return;
    const physics = motionPhysicsRef.current;
    const config = sliderConfigRef.current;
    const trackPx = Math.max(1, physics.trackLengthPx);
    const pos = getAlongAxisPosition(event);
    const rawFraction = session.initialProgress === null ? pos / trackPx : session.initialProgress + (pos - session.startClientCoord) / trackPx;
    const overdragDistance = rawFraction < 0 ? -rawFraction * trackPx : rawFraction > 1 ? (rawFraction - 1) * trackPx : 0;

    if (overdragDistance > 0 && config.stretchLimit > 0) {
      const side = rawFraction < 0 ? -1 : 1;
      if (!physics.isOverstretched || physics.stretchDirection !== side) triggerPulseAnimation(side);
      physics.isOverstretched = true;
      physics.stretchDirection = side;
      physics.stretchOffset = calculateRubberBandDistance(overdragDistance, config.stretchLimit);
      physics.stretchVelocity = 0;
    } else if (physics.isOverstretched) {
      physics.isOverstretched = false;
    }
    commitSliderValue(snapValueToStep(config.minVal + clampNumber(rawFraction, 0, 1) * config.rangeSpan));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const hitArea = hitAreaRef.current;
    if (disabled || event.button !== 0 || !hitArea) return;
    hitArea.setPointerCapture(event.pointerId);
    const physics = motionPhysicsRef.current;
    const config = sliderConfigRef.current;
    dragSessionRef.current = {
      pointerId: event.pointerId,
      startClientCoord: getAlongAxisPosition(event),
      initialProgress: config.enableJumpToClick ? null : physics.targetProgress,
    };
    physics.isDragging = true;
    hitArea.setAttribute('data-dragging', '');
    refreshActiveGoal();
    if (config.enableJumpToClick) {
      commitSliderValue(snapValueToStep(config.minVal + clampNumber(getAlongAxisPosition(event) / Math.max(1, physics.trackLengthPx), 0, 1) * config.rangeSpan));
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragSessionRef.current || dragSessionRef.current.pointerId !== event.pointerId) return;
    handlePointerMoveTrack(event);
  };

  const handlePointerRelease = () => {
    if (!dragSessionRef.current) return;
    const physics = motionPhysicsRef.current;
    dragSessionRef.current = null;
    physics.isDragging = false;
    physics.isOverstretched = false;
    hitAreaRef.current?.removeAttribute('data-dragging');
    refreshActiveGoal();
    sliderConfigRef.current.onValueChangeEnd?.(currentValueRef.current);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const config = sliderConfigRef.current;
    const unitStep = config.stepIncrement || config.rangeSpan / 100;
    const largeStep = Math.max(unitStep, config.rangeSpan / 10);
    const nowVal = currentValueRef.current;
    const keyStepMap: Record<string, number> = {
      ArrowRight: nowVal + unitStep,
      ArrowUp: nowVal + unitStep,
      ArrowLeft: nowVal - unitStep,
      ArrowDown: nowVal - unitStep,
      PageUp: nowVal + largeStep,
      PageDown: nowVal - largeStep,
      Home: config.minVal,
      End: config.maxVal,
    };
    if (!(event.key in keyStepMap)) return;
    event.preventDefault();
    const desiredVal = keyStepMap[event.key];
    const nextVal = snapValueToStep(desiredVal);
    if (nextVal === nowVal) {
      if (desiredVal !== nowVal) triggerEdgeBump(desiredVal > nowVal ? 1 : -1);
      return;
    }
    commitSliderValue(nextVal);
    config.onValueChangeEnd?.(nextVal);
  };

  const formattedDisplayLabel = formatValue
    ? formatValue(currentValue)
    : effectiveStep
      ? currentValue.toFixed(getDecimalPlaces(effectiveStep))
      : String(Math.round(currentValue));

  const resolvedLabelPosition = VALID_VALUE_POSITIONS.includes(valuePosition as any) ? valuePosition : 'top';
  const isInsideIconPlacement = iconPlacement === 'inside';
  const insideStartContent = isInsideIconPlacement ? leftIcon : null;
  const insideEndContent =
    resolvedLabelPosition === 'inside' ? <span>{formattedDisplayLabel}</span> : isInsideIconPlacement ? rightIcon : null;
  const totalStepCount = effectiveStep ? Math.round((resolvedMax - resolvedMin) / effectiveStep) : 0;

  const tickFractions = Array.isArray(ticks)
    ? ticks
    : ticks
      ? totalStepCount > 0 && totalStepCount <= 40
        ? Array.from({ length: totalStepCount + 1 }, (_, index) => resolvedMin + index * effectiveStep)
        : Array.from({ length: 11 }, (_, index) => resolvedMin + (index / 10) * (resolvedMax - resolvedMin))
      : [];

  const markFractions = tickFractions
    .map((tick) => (tick - resolvedMin) / totalRange)
    .filter((fraction) => fraction > 0.001 && fraction < 0.999);

  const renderTickMarks = (classNameStyle: string) =>
    markFractions.map((fraction) => (
      <span
        key={fraction}
        className={classNameStyle}
        style={isVertical ? { bottom: `${fraction * 100}%` } : { left: `${fraction * 100}%` }}
      />
    ));

  const renderInsideContent = (classNameStyle: string) =>
    insideStartContent || insideEndContent ? (
      <span className={classNameStyle}>
        <span>{insideStartContent}</span>
        <span>{insideEndContent}</span>
      </span>
    ) : null;

  const resolvedThumbSize = clampNumber(activeThickness + 6, 16, 28);

  return (
    <div
      ref={rootElementRef}
      className={cn(ELASTIC_ROOT_CLASS, className)}
      style={
        {
          '--elastic-slider-track': trackColor,
          '--elastic-slider-range': rangeColor,
          '--elastic-slider-icon': iconColor,
          '--elastic-slider-content': contentColor,
          ...(fillContentColor !== 'auto' ? { '--elastic-slider-fill-content': fillContentColor } : {}),
          '--elastic-slider-thumb': thumbColor,
          '--elastic-slider-thumb-size': `${resolvedThumbSize}px`,
          '--elastic-slider-hit': `${Math.max(34, thickness, activeThickness)}px`,
          '--elastic-slider-pad': `${Math.max(8, Math.round(thickness * 0.32))}px`,
          '--elastic-slider-bubble-offset': `${(thumb ? resolvedThumbSize * 1.12 : activeThickness) / 2 + 8}px`,
          ...(radius !== undefined ? { '--elastic-slider-radius': `${radius}px` } : {}),
          ...style,
        } as CSSProperties
      }
      data-orientation={isVertical ? 'vertical' : 'horizontal'}
      data-disabled={disabled ? '' : undefined}
      onPointerEnter={() => {
        motionPhysicsRef.current.isHovered = true;
        computeAutomaticInkColor();
        refreshActiveGoal();
      }}
      onPointerLeave={() => {
        motionPhysicsRef.current.isHovered = false;
        refreshActiveGoal();
      }}
    >
      {resolvedLabelPosition === 'top' && (
        <span className={ELASTIC_VALUE_LABEL_CLASS} aria-hidden="true">
          {formattedDisplayLabel}
        </span>
      )}
      <div className={ELASTIC_BODY_CLASS} ref={bodyElementRef}>
        {!isInsideIconPlacement && leftIcon && (
          <span className={ELASTIC_ICON_WRAPPER_CLASS} ref={startIconRef} aria-hidden="true">
            <span className={ELASTIC_ICON_INNER_CLASS}>{leftIcon}</span>
          </span>
        )}
        <div
          ref={hitAreaRef}
          className={ELASTIC_HIT_AREA_CLASS}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          aria-valuemin={resolvedMin}
          aria-valuemax={resolvedMax}
          aria-valuenow={currentValue}
          aria-valuetext={formattedDisplayLabel}
          aria-orientation={isVertical ? 'vertical' : 'horizontal'}
          aria-disabled={disabled || undefined}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerRelease}
          onPointerCancel={handlePointerRelease}
          onLostPointerCapture={handlePointerRelease}
          onKeyDown={handleKeyDown}
          onFocus={(event) => {
            motionPhysicsRef.current.isFocused = event.currentTarget.matches(':focus-visible');
            refreshActiveGoal();
          }}
          onBlur={() => {
            motionPhysicsRef.current.isFocused = false;
            refreshActiveGoal();
          }}
        >
          <div className={ELASTIC_TRACK_CLASS} ref={trackElementRef}>
            {renderTickMarks(ELASTIC_TICK_MARK_CLASS)}
            {renderInsideContent(ELASTIC_CONTENT_CLASS)}
            <div className={ELASTIC_RANGE_FILL_CLASS} ref={rangeElementRef}>
              {renderTickMarks(ELASTIC_ACTIVE_TICK_CLASS)}
              {renderInsideContent(ELASTIC_ACTIVE_CONTENT_CLASS)}
            </div>
          </div>
          {thumb && <span className={ELASTIC_THUMB_CLASS} ref={thumbElementRef} aria-hidden="true" />}
          {resolvedLabelPosition === 'bubble' && (
            <span className={ELASTIC_VALUE_BUBBLE_CLASS} ref={bubbleElementRef} aria-hidden="true">
              <span className={ELASTIC_BUBBLE_TEXT_CLASS}>{formattedDisplayLabel}</span>
            </span>
          )}
        </div>
        {!isInsideIconPlacement && rightIcon && (
          <span className={ELASTIC_ICON_WRAPPER_CLASS} ref={endIconRef} aria-hidden="true">
            <span className={ELASTIC_ICON_INNER_CLASS}>{rightIcon}</span>
          </span>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 2. WAKE SLIDER
// ══════════════════════════════════════════════════════════════════════════

const WAKE_SETTLE_CONSTANT = 9.23;
const WAKE_FULL_SPEED_REFERENCE = 320;
const WAKE_MIN_REACH_RADIUS = 1.5;
const WAKE_FLAT_EPSILON = 0.002;

export interface WakeSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  bars?: number;
  height?: number;
  restHeight?: number;
  gap?: number;
  fillColor?: string;
  trackColor?: string;
  crestColor?: string;
  sensitivity?: number;
  reach?: number;
  skew?: number;
  glide?: number;
  smoothing?: number;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const smoothstepInterpolation = (s: number) => s * s * (3 - 2 * s);
const calculatePercentageProgress = (val: number, min: number, max: number) =>
  max > min ? ((val - min) / (max - min)) * 100 : 0;
const snapValueToGrid = (val: number, min: number, max: number, step: number) => {
  if (!(max > min)) return min;
  if (!(step > 0)) return clampNumber(val, min, max);
  const lastWhole = min + Math.floor(+((max - min) / step).toFixed(6)) * step;
  const grid = clampNumber(Math.round((val - min) / step) * step + min, min, lastWhole);
  return +(lastWhole < max && Math.abs(val - max) <= Math.abs(val - grid) ? max : grid).toFixed(6);
};

export const WakeSlider: React.FC<WakeSliderProps> = ({
  value: valueProp,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  bars = 32,
  height = 56,
  restHeight = 12,
  gap = 4,
  fillColor = '#f5f5f5',
  trackColor = '#27272a',
  crestColor = '',
  sensitivity = 1,
  reach = 6,
  skew = 0.6,
  glide = 0.3,
  smoothing = 100,
  showValue = false,
  formatValue,
  disabled = false,
  ariaLabel = 'Value',
  className = '',
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const resolvedValue = clampNumber(valueProp ?? uncontrolledValue, min, max);
  const percentageProgress = calculatePercentageProgress(resolvedValue, min, max);
  const prefersReducedMotion = useReducedMotion();
  const formatDisplayValue = formatValue ?? String;
  const normalizedRestScale = Math.min(restHeight, height - 1) / height;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const hiddenHandleRef = useRef<HTMLButtonElement>(null);
  const barElementRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const crestElementRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activePointerIdRef = useRef<number | null>(null);
  const lastAmplitudeRef = useRef(0);
  const latestValueRef = useRef(resolvedValue);
  latestValueRef.current = resolvedValue;

  const targetPercentageMotionValue = useMotionValue(percentageProgress);
  const glideNaturalFrequency = WAKE_SETTLE_CONSTANT / glide;
  const springHeadMotionValue = useSpring(targetPercentageMotionValue, {
    stiffness: glideNaturalFrequency * glideNaturalFrequency,
    damping: 2 * glideNaturalFrequency,
    mass: 1,
  });
  const rawHeadVelocityMotionValue = useVelocity(springHeadMotionValue);
  const smoothingFrequency = 2000 / smoothing;
  const springSpeedMotionValue = useSpring(rawHeadVelocityMotionValue, {
    stiffness: smoothingFrequency * smoothingFrequency,
    damping: 2.5 * smoothingFrequency,
    mass: 1,
  });

  useEffect(() => {
    targetPercentageMotionValue.set(percentageProgress);
  }, [percentageProgress, targetPercentageMotionValue]);

  const updateBarVisuals = (forceRedraw = false) => {
    const headBarPosition =
      ((prefersReducedMotion ? targetPercentageMotionValue.get() : springHeadMotionValue.get()) / 100) * (bars - 1);
    const currentSpeed = prefersReducedMotion ? 0 : springSpeedMotionValue.get();
    const waveAmplitude = smoothstepInterpolation(clampNumber((Math.abs(currentSpeed) * sensitivity) / WAKE_FULL_SPEED_REFERENCE, 0, 1));
    const movementDirection = Math.sign(currentSpeed) || 1;
    const dynamicReach = WAKE_MIN_REACH_RADIUS + (reach - WAKE_MIN_REACH_RADIUS) * waveAmplitude;
    const behindReach = dynamicReach * (1 + skew);
    const aheadReach = dynamicReach * (1 - 0.5 * skew);
    const activeBarIndex = Math.round(headBarPosition);
    const isMotionSettled = !forceRedraw && waveAmplitude < WAKE_FLAT_EPSILON && lastAmplitudeRef.current < WAKE_FLAT_EPSILON;

    for (let i = 0; i < bars; i++) {
      const barElement = barElementRefs.current[i];
      if (!barElement) continue;
      const isBarActive = i <= activeBarIndex ? 'true' : 'false';
      if (barElement.dataset.on !== isBarActive) barElement.dataset.on = isBarActive;
      if (isMotionSettled) continue;
      const offsetFromHead = i - headBarPosition;
      const effectiveInfluenceRadius = offsetFromHead * movementDirection < 0 ? behindReach : aheadReach;
      const waveLift =
        Math.abs(offsetFromHead) < effectiveInfluenceRadius
          ? waveAmplitude * Math.cos((Math.PI * offsetFromHead) / (2 * effectiveInfluenceRadius)) ** 2
          : 0;
      barElement.style.transform = `scaleY(${normalizedRestScale + waveLift * (1 - normalizedRestScale)})`;
      const crestElement = crestElementRefs.current[i];
      if (crestElement) crestElement.style.opacity = String(waveLift);
    }
    lastAmplitudeRef.current = waveAmplitude;
  };

  const updateVisualsRef = useRef(updateBarVisuals);
  updateVisualsRef.current = updateBarVisuals;
  const triggerVisualUpdate = useCallback(() => updateVisualsRef.current(), []);
  const scheduleVisualRender = useCallback(() => frame.render(triggerVisualUpdate, false, true), [triggerVisualUpdate]);

  useMotionValueEvent(springHeadMotionValue, 'change', scheduleVisualRender);
  useMotionValueEvent(springSpeedMotionValue, 'change', scheduleVisualRender);

  useLayoutEffect(() => {
    updateVisualsRef.current(true);
  });

  const commitSnappedValue = (nextVal: number) => {
    const cleanValue = snapValueToGrid(nextVal, min, max, step);
    if (cleanValue === latestValueRef.current) return;
    latestValueRef.current = cleanValue;
    if (valueProp === undefined) setUncontrolledValue(cleanValue);
    onChange?.(cleanValue);
  };

  const commitFromClientX = (clientX: number) => {
    const track = trackContainerRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (!rect.width) return;
    let ratio = clampNumber((clientX - rect.left) / rect.width, 0, 1);
    if (getComputedStyle(track).direction === 'rtl') ratio = 1 - ratio;
    commitSnappedValue(min + ratio * (max - min));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || activePointerIdRef.current !== null) return;
    activePointerIdRef.current = event.pointerId;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
    containerRef.current?.removeAttribute('data-instant');
    hiddenHandleRef.current?.focus({ preventScroll: true });
    commitFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId === activePointerIdRef.current) commitFromClientX(event.clientX);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== activePointerIdRef.current) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}
    activePointerIdRef.current = null;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const keyJumps: Record<string, number> = {
      ArrowRight: resolvedValue + step,
      ArrowUp: resolvedValue + step,
      ArrowLeft: resolvedValue - step,
      ArrowDown: resolvedValue - step,
      PageUp: resolvedValue + step * 10,
      PageDown: resolvedValue - step * 10,
      Home: min,
      End: max,
    };
    if (!(event.key in keyJumps)) return;
    event.preventDefault();
    const cleanValue = snapValueToGrid(keyJumps[event.key], min, max, step);
    const nextPercent = calculatePercentageProgress(cleanValue, min, max);
    containerRef.current?.setAttribute('data-instant', 'true');
    springHeadMotionValue.jump(nextPercent);
    springSpeedMotionValue.jump(0);
    targetPercentageMotionValue.jump(nextPercent);
    commitSnappedValue(cleanValue);
  };

  const barNodes = useMemo(() => {
    barElementRefs.current.length = bars;
    crestElementRefs.current.length = bars;
    return Array.from({ length: bars }, (_, i) => (
      <span
        key={i}
        ref={(el) => {
          barElementRefs.current[i] = el;
        }}
        className="relative h-[var(--ws-height)] min-w-0 flex-1 origin-center rounded-full bg-[var(--ws-track)] [transform:scaleY(var(--ws-rest))] [transition:background-color_120ms_ease] data-[on=true]:bg-[var(--ws-fill)] group-data-[instant=true]:[transition-duration:0ms] motion-reduce:[transform:scaleY(var(--ws-rest))]!"
      >
        {crestColor ? (
          <span
            ref={(el) => {
              crestElementRefs.current[i] = el;
            }}
            className="absolute inset-0 rounded-[inherit] bg-[var(--ws-crest)] opacity-0"
          />
        ) : null}
      </span>
    ));
  }, [bars, crestColor]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'group inline-flex w-full items-center gap-3 [color:inherit] aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className
      )}
      aria-disabled={disabled || undefined}
      style={
        {
          '--ws-fill': fillColor,
          '--ws-track': trackColor,
          '--ws-crest': crestColor || fillColor,
          '--ws-height': `${height}px`,
          '--ws-gap': `${gap}px`,
          '--ws-rest': normalizedRestScale,
        } as CSSProperties
      }
    >
      <div
        ref={trackContainerRef}
        className="relative flex h-[var(--ws-height)] min-h-11 flex-1 touch-none items-center gap-[var(--ws-gap)] select-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] [@media(hover:hover)_and_(pointer:fine)]:cursor-grab [@media(hover:hover)_and_(pointer:fine)]:active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        {barNodes}
        <button
          ref={hiddenHandleRef}
          type="button"
          role="slider"
          className="absolute inset-0 m-0 cursor-[inherit] touch-none rounded-xl border-0 bg-transparent p-0 outline-none [-webkit-tap-highlight-color:transparent]"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={resolvedValue}
          aria-valuetext={formatDisplayValue(resolvedValue)}
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showValue ? (
        <span className="min-w-[3ch] text-right text-[13px] tabular-nums opacity-60" aria-hidden="true">
          {formatDisplayValue(resolvedValue)}
        </span>
      ) : null}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// 3. ARIA SLIDER
// ══════════════════════════════════════════════════════════════════════════

const sliderLabelPositionStyles = {
  default: 'hidden',
  bottom:
    'absolute top-2 left-1/2 -translate-x-1/2 translate-y-full text-xs font-medium text-foreground whitespace-nowrap pointer-events-none',
  'top-floating':
    'absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg bg-surface-elevated px-2 py-1.5 text-xs font-semibold text-foreground shadow-lg ring-1 ring-border/80 border border-border/50 whitespace-nowrap pointer-events-none',
} as const;

export interface SliderProps extends AriaSliderProps<number | number[]> {
  /** Optional label text */
  label?: ReactNode;
  /** Where the value label sits relative to the thumb. `default` hides it, `bottom` places it below, and `top-floating` shows it in a tooltip above. */
  labelPosition?: keyof typeof sliderLabelPositionStyles;
  /** Formats the value shown in the label. Called with the raw thumb value. Without it the value is formatted as a percentage. */
  labelFormatter?: (value: number) => string;
  className?: string;
}

export const Slider = ({
  label,
  labelPosition = 'default',
  minValue = 0,
  maxValue = 100,
  labelFormatter,
  formatOptions,
  className,
  ...sliderRestProps
}: SliderProps) => {
  const defaultPercentageFormatOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    maximumFractionDigits: 0,
  };

  return (
    <AriaSlider
      {...sliderRestProps}
      minValue={minValue}
      maxValue={maxValue}
      formatOptions={formatOptions ?? defaultPercentageFormatOptions}
      className={cn('flex flex-col gap-1.5 w-full select-none touch-none', className)}
    >
      {label ? (
        <AriaLabel className="text-xs font-medium text-foreground">{label}</AriaLabel>
      ) : (
        <AriaLabel className="sr-only">
          {(sliderRestProps as any)['aria-label'] || 'Slider'}
        </AriaLabel>
      )}
      <AriaSliderTrack className="relative h-6 w-full flex items-center">
        {({ state: { values, getThumbValue, getThumbPercent, getFormattedValue } }) => {
          const trackFillLeft = values.length === 1 ? 0 : getThumbPercent(0);
          const trackFillWidth = values.length === 1 ? getThumbPercent(0) : getThumbPercent(1) - trackFillLeft;

          return (
            <>
              {/* Background track */}
              <span className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-muted dark:bg-surface-sunken border border-border/40" />
              {/* Filled active range */}
              <span
                className="absolute top-1/2 h-2 rounded-full bg-primary -translate-y-1/2"
                style={{
                  left: `${trackFillLeft * 100}%`,
                  width: `${trackFillWidth * 100}%`,
                }}
              />
              {/* Thumb handles */}
              {values.map((_, thumbIndex) => {
                const currentThumbValue = getThumbValue(thumbIndex);
                const displayFormattedValue = labelFormatter
                  ? labelFormatter(currentThumbValue)
                  : getFormattedValue(currentThumbValue / 100);

                return (
                  <AriaSliderThumb
                    key={thumbIndex}
                    index={thumbIndex}
                    className={({ isFocusVisible, isDragging }) =>
                      cn(
                        'top-1/2 box-border size-5 cursor-grab rounded-full bg-surface-elevated shadow-md ring-2 ring-primary ring-inset transition-transform duration-75',
                        isFocusVisible && 'outline-2 outline-offset-2 outline-primary ring-offset-2 ring-offset-background',
                        isDragging && 'cursor-grabbing scale-110'
                      )
                    }
                  >
                    <AriaSliderOutput className={cn('whitespace-nowrap', sliderLabelPositionStyles[labelPosition])}>
                      {displayFormattedValue}
                    </AriaSliderOutput>
                  </AriaSliderThumb>
                );
              })}
            </>
          );
        }}
      </AriaSliderTrack>
    </AriaSlider>
  );
};

export default Slider;
