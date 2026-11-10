'use client';

import React, {
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { VolumeHighIcon, VolumeLowIcon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import {
  ELASTIC_ROOT_CLASS,
  ELASTIC_VALUE_LABEL_CLASS,
  ELASTIC_BODY_CLASS,
  ELASTIC_ICON_WRAPPER_CLASS,
  ELASTIC_ICON_INNER_CLASS,
  ELASTIC_HIT_AREA_CLASS,
  ELASTIC_TRACK_CLASS,
  ELASTIC_RANGE_FILL_CLASS,
  ELASTIC_CONTENT_CLASS,
  ELASTIC_ACTIVE_CONTENT_CLASS,
  ELASTIC_TICK_MARK_CLASS,
  ELASTIC_ACTIVE_TICK_CLASS,
  ELASTIC_THUMB_CLASS,
  ELASTIC_VALUE_BUBBLE_CLASS,
  ELASTIC_BUBBLE_TEXT_CLASS,
  VALID_VALUE_POSITIONS,
  clampNumber,
  getDecimalPlaces,
} from './elastic-slider-physics';
import { useElasticSliderPhysics } from './use-elastic-slider-physics';

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
  trackColor = 'hsl(var(--muted) / 0.65)',
  rangeColor = 'hsl(var(--primary))',
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

  const resolvedMin = Math.min(startingValue, maxValue);
  const resolvedMax = Math.max(startingValue, maxValue);
  const totalRange = resolvedMax - resolvedMin || 1;
  const effectiveStep = isStepped && stepSize > 0 ? stepSize : 0;
  const isVertical = orientation === 'vertical';
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = clampNumber(isControlled ? value : internalValue, resolvedMin, resolvedMax);

  const {
    motionPhysicsRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerRelease,
    handleKeyDown,
    refreshActiveGoal,
    computeAutomaticInkColor,
  } = useElasticSliderPhysics({
    resolvedMin,
    resolvedMax,
    totalRange,
    effectiveStep,
    isVertical,
    isControlled,
    currentValue,
    setInternalValue,
    fillFrom,
    thickness,
    activeThickness,
    radius,
    restOpacity,
    growOnHover,
    maxStretch,
    bounce,
    jumpToClick,
    wheel,
    disabled,
    fillContentColor,
    onChange,
    onChangeEnd,
    rootElementRef,
    hitAreaRef,
    bodyElementRef,
    trackElementRef,
    rangeElementRef,
    thumbElementRef,
    bubbleElementRef,
    startIconRef,
    endIconRef,
  });

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

export default ElasticSlider;
