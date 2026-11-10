'use client';

import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  TWO_PI,
  DARK_INK_COLOR,
  LIGHT_INK_COLOR,
  useIsomorphicLayoutEffect,
  clampNumber,
  calculateRubberBandDistance,
  checkPrefersReducedMotion,
  parseCssColorToRgba,
  applyElasticSliderVisuals,
  type ElasticMotionPhysicsState,
  type ElasticPointerDragSession,
} from './elastic-slider-physics';

export interface UseElasticPhysicsOptions {
  resolvedMin: number;
  resolvedMax: number;
  totalRange: number;
  effectiveStep: number;
  isVertical: boolean;
  isControlled: boolean;
  currentValue: number;
  setInternalValue: (v: number) => void;
  fillFrom?: number;
  thickness: number;
  activeThickness: number;
  radius?: number;
  restOpacity: number;
  growOnHover: boolean;
  maxStretch: number;
  bounce: number;
  jumpToClick: boolean;
  wheel: boolean;
  disabled: boolean;
  fillContentColor: string;
  onChange?: (v: number) => void;
  onChangeEnd?: (v: number) => void;
  rootElementRef: React.RefObject<HTMLDivElement | null>;
  hitAreaRef: React.RefObject<HTMLDivElement | null>;
  bodyElementRef: React.RefObject<HTMLDivElement | null>;
  trackElementRef: React.RefObject<HTMLDivElement | null>;
  rangeElementRef: React.RefObject<HTMLDivElement | null>;
  thumbElementRef: React.RefObject<HTMLSpanElement | null>;
  bubbleElementRef: React.RefObject<HTMLSpanElement | null>;
  startIconRef: React.RefObject<HTMLSpanElement | null>;
  endIconRef: React.RefObject<HTMLSpanElement | null>;
}

export function useElasticSliderPhysics(opts: UseElasticPhysicsOptions) {
  const {
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
  } = opts;

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
    applyElasticSliderVisuals({
      physics: motionPhysicsRef.current,
      config: sliderConfigRef.current,
      track: trackElementRef.current,
      range: rangeElementRef.current,
      thumb: thumbElementRef.current,
      bubble: bubbleElementRef.current,
      startIcon: startIconRef.current,
      endIcon: endIconRef.current,
      body: bodyElementRef.current,
    });
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

  return {
    motionPhysicsRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerRelease,
    handleKeyDown,
    refreshActiveGoal,
    computeAutomaticInkColor,
  };
}
