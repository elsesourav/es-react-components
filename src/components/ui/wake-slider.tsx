'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  frame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useVelocity,
} from 'motion/react';
import { cn } from '@/lib/utils';

const WAKE_SETTLE_CONSTANT = 9.23;
const WAKE_FULL_SPEED_REFERENCE = 320;
const WAKE_MIN_REACH_RADIUS = 1.5;
const WAKE_FLAT_EPSILON = 0.002;

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
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
  fillColor = 'hsl(var(--primary))',
  trackColor = 'hsl(var(--muted) / 0.4)',
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

export default WakeSlider;
