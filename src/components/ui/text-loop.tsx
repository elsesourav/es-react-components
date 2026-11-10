'use client';

import React, {
  CSSProperties,
  SVGProps,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';

export type TextLoopShape = 'wave' | 'circle' | 'infinity' | 'arch' | 'line';
export type TextLoopDirection = 'forward' | 'reverse';

export interface TextLoopProps {
  text?: string;
  shape?: TextLoopShape;
  path?: string;
  speed?: number;
  direction?: TextLoopDirection;
  separator?: string;
  curviness?: number;
  tilt?: number;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  edgeFade?: number;
  pauseOnHover?: boolean;
  cross?: boolean;
  crossColor?: string;
  crossAngle?: number;
  draggable?: boolean;
  scrollBoost?: number;
  outline?: boolean;
  outlineWidth?: number;
  className?: string;
  style?: CSSProperties;
}

interface PathMetrics {
  length: number;
  reps: number;
  crossLength: number;
  crossReps: number;
}

interface FadeGradientStop {
  offset: number;
  opacity: number;
}

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 520;
const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = VIEWBOX_HEIGHT / 2;
const EDGE_PADDING = 6;
const FADE_RESOLUTION_STEPS = 8;
const MAX_FLING_VELOCITY = 2600;
const MAX_SCROLL_BOOST = 1600;

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const calculateSmoothStep = (normalizedProgress: number) =>
  normalizedProgress *
  normalizedProgress *
  normalizedProgress *
  (normalizedProgress * (normalizedProgress * 6 - 15) + 10);

const clampValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const resolveCssColor = (colorString?: string): string => {
  if (!colorString) return '';
  const trimmed = colorString.trim();
  if (trimmed.startsWith('var(--') && !trimmed.startsWith('hsl(')) {
    return `hsl(${trimmed})`;
  }
  return trimmed;
};

const wrapOffset = (value: number, totalLength: number) =>
  ((value % totalLength) + totalLength) % totalLength;

const calculateCircleRadius = (curviness: number, ribbonWidth: number) =>
  Math.min(
    90 + Math.max(0, curviness) * 0.95,
    Math.max(20, CENTER_Y - Math.max(0, ribbonWidth) / 2 - EDGE_PADDING)
  );

const generateSvgPath = (
  shape: TextLoopShape,
  curviness: number,
  ribbonWidth: number,
  isMirrored = false
): string => {
  const curveFactor = Math.max(0, curviness);
  const verticalAllowance = Math.max(
    20,
    CENTER_Y - Math.max(0, ribbonWidth) / 2 - EDGE_PADDING
  );
  const mirrorMultiplier = isMirrored ? -1 : 1;

  switch (shape) {
    case 'circle': {
      const radius = calculateCircleRadius(curviness, ribbonWidth);
      if (isMirrored) {
        const radiusX = radius * 1.22;
        const radiusY = radius * 0.42;
        return `M ${CENTER_X - radiusX} ${CENTER_Y} A ${radiusX} ${radiusY} 0 1 1 ${
          CENTER_X + radiusX
        } ${CENTER_Y} A ${radiusX} ${radiusY} 0 1 1 ${
          CENTER_X - radiusX
        } ${CENTER_Y} Z`;
      }
      return `M ${CENTER_X - radius} ${CENTER_Y} A ${radius} ${radius} 0 1 1 ${
        CENTER_X + radius
      } ${CENTER_Y} A ${radius} ${radius} 0 1 1 ${CENTER_X - radius} ${CENTER_Y} Z`;
    }
    case 'infinity': {
      const radiusX = 150 + curveFactor * 1.4;
      const heightY = Math.min(60 + curveFactor * 0.95, verticalAllowance);
      return [
        `M ${CENTER_X} ${CENTER_Y}`,
        `C ${CENTER_X + radiusX * 0.55} ${CENTER_Y - heightY} ${
          CENTER_X + radiusX
        } ${CENTER_Y - heightY} ${CENTER_X + radiusX} ${CENTER_Y}`,
        `C ${CENTER_X + radiusX} ${CENTER_Y + heightY} ${
          CENTER_X + radiusX * 0.55
        } ${CENTER_Y + heightY} ${CENTER_X} ${CENTER_Y}`,
        `C ${CENTER_X - radiusX * 0.55} ${CENTER_Y - heightY} ${
          CENTER_X - radiusX
        } ${CENTER_Y - heightY} ${CENTER_X - radiusX} ${CENTER_Y}`,
        `C ${CENTER_X - radiusX} ${CENTER_Y + heightY} ${
          CENTER_X - radiusX * 0.55
        } ${CENTER_Y + heightY} ${CENTER_X} ${CENTER_Y}`,
        'Z',
      ].join(' ');
    }
    case 'arch': {
      const riseHeight =
        Math.min(120 + curveFactor * 1.1, verticalAllowance * 2) *
        mirrorMultiplier;
      return `M 120 ${CENTER_Y + riseHeight / 2} Q ${CENTER_X} ${
        CENTER_Y - riseHeight * 1.5
      } ${VIEWBOX_WIDTH - 120} ${CENTER_Y + riseHeight / 2}`;
    }
    case 'line':
      return `M -320 ${CENTER_Y} L ${VIEWBOX_WIDTH + 320} ${CENTER_Y}`;
    case 'wave':
    default: {
      const waveAmplitude =
        Math.min(curveFactor * 2.2, verticalAllowance * 2) * mirrorMultiplier;
      return `M -320 ${CENTER_Y} Q -160 ${
        CENTER_Y - waveAmplitude
      } 0 ${CENTER_Y} T 320 ${CENTER_Y} T 640 ${CENTER_Y} T 960 ${CENTER_Y} T 1280 ${CENTER_Y} T ${
        VIEWBOX_WIDTH + 320
      } ${CENTER_Y}`;
    }
  }
};

const generateFadeStops = (edgeFadeRatio: number): FadeGradientStop[] => {
  const fadeWidth = Math.min(1, Math.max(0, edgeFadeRatio)) * 0.3;
  if (fadeWidth <= 0) return [];
  const stops: FadeGradientStop[] = [];
  for (let i = 0; i <= FADE_RESOLUTION_STEPS; i++) {
    const progress = i / FADE_RESOLUTION_STEPS;
    stops.push({
      offset: progress * fadeWidth,
      opacity: calculateSmoothStep(progress),
    });
  }
  for (let i = FADE_RESOLUTION_STEPS; i >= 0; i--) {
    const progress = i / FADE_RESOLUTION_STEPS;
    stops.push({
      offset: 1 - progress * fadeWidth,
      opacity: calculateSmoothStep(progress),
    });
  }
  return stops;
};

const parseHexRgb = (colorString?: string): [number, number, number] | null => {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(
    String(colorString || '').trim()
  );
  if (!match) return null;
  const hex =
    match[1].length === 3
      ? match[1].replace(/./g, (ch) => ch + ch)
      : match[1];
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
};

const lightenColor = (colorHex: string, amount: number): string => {
  const rgb = parseHexRgb(colorHex);
  if (!rgb) return colorHex;
  return `#${rgb
    .map((channel) =>
      Math.round(channel + (255 - channel) * amount)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
};

const calculateContrastingTextColor = (bgColorHex: string): string => {
  const rgb = parseHexRgb(bgColorHex);
  if (!rgb) return '#ffffff';
  const [r, g, b] = rgb.map((channel) => {
    const linear = channel / 255;
    return linear <= 0.04045
      ? linear / 12.92
      : ((linear + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.2 ? '#120f17' : '#ffffff';
};

export const TextLoop: React.FC<TextLoopProps> = ({
  text = 'React ✦ Bits',
  shape = 'wave',
  path,
  speed = 90,
  direction = 'forward',
  separator = '✦',
  curviness = 90,
  tilt = 0,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color,
  ribbon = true,
  ribbonColor = '#5227FF',
  ribbonWidth = 86,
  edgeFade = 0,
  pauseOnHover = true,
  cross = false,
  crossColor,
  crossAngle = 16,
  draggable = false,
  scrollBoost = 0,
  outline = false,
  outlineWidth = 1.5,
  className = '',
  style = {},
}) => {
  const containerRootRef = useRef<HTMLDivElement | null>(null);
  const svgElementRef = useRef<SVGSVGElement | null>(null);
  const primaryPathElementRef = useRef<SVGPathElement | null>(null);
  const crossPathElementRef = useRef<SVGPathElement | null>(null);
  const measureTextElementRef = useRef<SVGTextElement | null>(null);
  const primaryHeadPathRef = useRef<SVGTextPathElement | null>(null);
  const primaryTailPathRef = useRef<SVGTextPathElement | null>(null);
  const crossHeadPathRef = useRef<SVGTextPathElement | null>(null);
  const crossTailPathRef = useRef<SVGTextPathElement | null>(null);
  const travelProgressRef = useRef(0);

  const [pathMetrics, setPathMetrics] = useState<PathMetrics>({
    length: 0,
    reps: 1,
    crossLength: 0,
    crossReps: 1,
  });

  const uniqueComponentId = useId();
  const sanitizedId = uniqueComponentId.replace(/[^a-zA-Z0-9_-]/g, '');
  const primaryPathId = `text-loop-path-${sanitizedId}`;
  const crossPathId = `${primaryPathId}-cross`;
  const fadeGradientId = `${primaryPathId}-fade`;
  const fadeMaskId = `${primaryPathId}-mask`;
  const dropShadowFilterId = `${primaryPathId}-shadow`;
  const ribbonUnderMaskId = `${primaryPathId}-under`;

  const isCustomPath = Boolean(path);
  const mainPathData = useMemo(
    () => path || generateSvgPath(shape, curviness, ribbonWidth),
    [path, shape, curviness, ribbonWidth]
  );

  const crossPathData = useMemo(() => {
    if (!cross) return '';
    if (path) return path;
    return generateSvgPath(
      shape,
      curviness,
      ribbonWidth,
      shape === 'wave' || shape === 'arch' || shape === 'circle'
    );
  }, [cross, path, shape, curviness, ribbonWidth]);

  const fadeStopsList = useMemo(() => generateFadeStops(edgeFade), [edgeFade]);
  const resolvedRibbonColor = resolveCssColor(ribbonColor);
  const primaryTextColor = resolveCssColor(color) || (ribbon ? '#ffffff' : 'currentColor');

  const halfCrossAngle = cross ? crossAngle / 2 : 0;
  const primaryRotationAngle = tilt + halfCrossAngle;
  const crossRotationAngle = tilt - halfCrossAngle;
  const primaryTransform = primaryRotationAngle
    ? `rotate(${primaryRotationAngle} ${CENTER_X} ${CENTER_Y})`
    : undefined;
  const crossTransform = crossRotationAngle
    ? `rotate(${crossRotationAngle} ${CENTER_X} ${CENTER_Y})`
    : undefined;

  const resolvedCrossRibbonColor =
    resolveCssColor(crossColor) || lightenColor(resolvedRibbonColor, 0.62);
  const resolvedCrossTextColor = ribbon
    ? calculateContrastingTextColor(resolvedCrossRibbonColor)
    : crossColor || 'currentColor';
  const crossTextOpacity = !ribbon && !crossColor ? 0.45 : 1;

  const singleUnitText = useMemo(() => {
    const baseText = uppercase ? String(text).toUpperCase() : String(text);
    const separatorString = separator
      ? `\u00A0${separator}\u00A0`
      : '\u00A0\u00A0\u00A0';
    return `${baseText}${separatorString}`;
  }, [text, separator, uppercase]);

  const sharedTextStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  useIsomorphicLayoutEffect(() => {
    const pathEl = primaryPathElementRef.current;
    const measureEl = measureTextElementRef.current;
    if (!pathEl || !measureEl) return undefined;

    let isDisposed = false;

    const measureGeometry = () => {
      if (isDisposed) return;
      let totalLength = 0;
      let unitTextWidth = 0;
      let crossTotalLength = 0;
      try {
        totalLength = pathEl.getTotalLength();
        unitTextWidth = measureEl.getComputedTextLength();
        crossTotalLength = crossPathElementRef.current
          ? crossPathElementRef.current.getTotalLength()
          : 0;
      } catch {
        return;
      }
      if (!totalLength) return;

      const calculateRepetitions = (pathLen: number) =>
        unitTextWidth > 0 ? Math.max(1, Math.round(pathLen / unitTextWidth)) : 1;

      const nextMetrics: PathMetrics = {
        length: totalLength,
        reps: calculateRepetitions(totalLength),
        crossLength: crossTotalLength,
        crossReps: calculateRepetitions(crossTotalLength),
      };

      setPathMetrics((previous) =>
        previous.length === nextMetrics.length &&
        previous.reps === nextMetrics.reps &&
        previous.crossLength === nextMetrics.crossLength &&
        previous.crossReps === nextMetrics.crossReps
          ? previous
          : nextMetrics
      );
    };

    measureGeometry();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measureGeometry).catch(() => {});
    }

    return () => {
      isDisposed = true;
    };
  }, [mainPathData, crossPathData, singleUnitText, fontSize, fontWeight, letterSpacing]);

  useIsomorphicLayoutEffect(() => {
    const { length: totalPathLength, crossLength: crossPathLength } =
      pathMetrics;
    const primaryHead = primaryHeadPathRef.current;
    const primaryTail = primaryTailPathRef.current;
    const rootContainer = containerRootRef.current;
    const svgElement = svgElementRef.current;
    if (
      !primaryHead ||
      !primaryTail ||
      !rootContainer ||
      !svgElement ||
      !totalPathLength
    )
      return undefined;

    const crossHead = crossHeadPathRef.current;
    const crossTail = crossTailPathRef.current;
    const crossPathElements =
      cross && crossHead && crossTail && crossPathLength > 0
        ? [crossHead, crossTail]
        : null;

    let currentDistance = travelProgressRef.current * totalPathLength;

    const applyOffsets = () => {
      const wrappedOffset = wrapOffset(currentDistance, totalPathLength);
      travelProgressRef.current = wrappedOffset / totalPathLength;
      primaryHead.setAttribute('startOffset', String(wrappedOffset));
      primaryTail.setAttribute(
        'startOffset',
        String(wrappedOffset - totalPathLength)
      );
      if (crossPathElements) {
        const crossWrappedOffset = wrapOffset(
          -currentDistance,
          crossPathLength
        );
        crossPathElements[0].setAttribute(
          'startOffset',
          String(crossWrappedOffset)
        );
        crossPathElements[1].setAttribute(
          'startOffset',
          String(crossWrappedOffset - crossPathLength)
        );
      }
    };
    applyOffsets();

    const isReducedMotion = Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    );
    const motionSign = direction === 'reverse' ? -1 : 1;
    const baseSpeed = isReducedMotion
      ? 0
      : Math.max(0, speed) * motionSign;
    const hoverScaleTracker = { scale: 1 };
    const primaryAngleRad = (primaryRotationAngle * Math.PI) / 180;
    const isCircular = !isCustomPath && shape === 'circle';
    const circleRad = calculateCircleRadius(curviness, ribbonWidth);
    const isScrollBoostActive = scrollBoost > 0 && !isReducedMotion;

    let inertialFlingVelocity = 0;
    let dynamicScrollBoost = 0;
    let observedScrollVelocity = 0;
    let lastScrollTimestamp = 0;
    let lastScrollPosition = 0;
    let activeScrollSource: EventTarget | null = null;
    let isCurrentlyDragging = false;
    let activePointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPointerTimestamp = 0;
    let dragVelocity = 0;
    let svgCenterCoordinates = { x: 0, y: 0 };
    let isTickerActive = false;

    const animationTick = (_: number, deltaMs: number) => {
      if (isCurrentlyDragging) return;
      const deltaTimeSeconds = Math.min(0.05, deltaMs / 1000);
      inertialFlingVelocity *= Math.exp(-deltaTimeSeconds / 0.55);

      if (isScrollBoostActive) {
        if (performance.now() - lastScrollTimestamp > 90) {
          observedScrollVelocity *= Math.exp(-deltaTimeSeconds / 0.12);
        }
        const boostTarget = clampValue(
          observedScrollVelocity * scrollBoost * 0.35 * motionSign,
          -MAX_SCROLL_BOOST,
          MAX_SCROLL_BOOST
        );
        dynamicScrollBoost +=
          (boostTarget - dynamicScrollBoost) *
          (1 - Math.exp(-deltaTimeSeconds / 0.18));
      }

      const totalVelocity =
        baseSpeed * hoverScaleTracker.scale +
        inertialFlingVelocity +
        dynamicScrollBoost;
      if (Math.abs(totalVelocity) < 0.01) return;

      currentDistance += totalVelocity * deltaTimeSeconds;
      applyOffsets();
    };

    const startTicker = () => {
      if (isTickerActive || isReducedMotion) return;
      isTickerActive = true;
      gsap.ticker.add(animationTick);
    };

    const stopTicker = () => {
      if (!isTickerActive) return;
      isTickerActive = false;
      gsap.ticker.remove(animationTick);
    };

    const animateHoverGlide = (isHovered: boolean) =>
      gsap.to(hoverScaleTracker, {
        scale: isHovered ? 0 : 1,
        duration: isHovered ? 0.6 : 0.9,
        ease: isHovered ? 'power2.out' : 'power2.inOut',
        overwrite: true,
      });

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') animateHoverGlide(true);
    };

    const handlePointerLeave = () => animateHoverGlide(false);

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      isCurrentlyDragging = true;
      activePointerId = event.pointerId;
      rootContainer.setPointerCapture?.(event.pointerId);
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      lastPointerTimestamp = performance.now();
      dragVelocity =
        baseSpeed * hoverScaleTracker.scale +
        inertialFlingVelocity +
        dynamicScrollBoost;

      const rect = svgElement.getBoundingClientRect();
      svgCenterCoordinates = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      rootContainer.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isCurrentlyDragging || event.pointerId !== activePointerId) return;
      const now = performance.now();
      let travelDelta: number;

      if (isCircular) {
        let angleTurn =
          Math.atan2(
            event.clientY - svgCenterCoordinates.y,
            event.clientX - svgCenterCoordinates.x
          ) -
          Math.atan2(
            lastPointerY - svgCenterCoordinates.y,
            lastPointerX - svgCenterCoordinates.x
          );
        if (angleTurn > Math.PI) angleTurn -= Math.PI * 2;
        if (angleTurn < -Math.PI) angleTurn += Math.PI * 2;
        travelDelta = angleTurn * circleRad;
      } else {
        const svgBoundingRect = svgElement.getBoundingClientRect();
        const coordinateScale =
          VIEWBOX_WIDTH / (svgBoundingRect.width || VIEWBOX_WIDTH);
        travelDelta =
          ((event.clientX - lastPointerX) * Math.cos(primaryAngleRad) +
            (event.clientY - lastPointerY) * Math.sin(primaryAngleRad)) *
          coordinateScale;
      }

      currentDistance += travelDelta;
      applyOffsets();

      const timeDeltaSeconds = Math.max(1, now - lastPointerTimestamp) / 1000;
      dragVelocity =
        dragVelocity * 0.6 + (travelDelta / timeDeltaSeconds) * 0.4;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      lastPointerTimestamp = now;
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isCurrentlyDragging || event.pointerId !== activePointerId) return;
      isCurrentlyDragging = false;
      activePointerId = null;
      rootContainer.style.cursor = '';
      if (isReducedMotion) return;

      const releaseVelocity =
        performance.now() - lastPointerTimestamp > 90
          ? 0
          : clampValue(dragVelocity, -MAX_FLING_VELOCITY, MAX_FLING_VELOCITY);
      inertialFlingVelocity =
        releaseVelocity -
        (baseSpeed * hoverScaleTracker.scale + dynamicScrollBoost);
    };

    const handleWindowScroll = (event: Event) => {
      const scrollTarget = event.target;
      const isDocumentScroll =
        scrollTarget === document ||
        scrollTarget === document.documentElement ||
        scrollTarget === document.body;

      if (
        !isDocumentScroll &&
        !(scrollTarget instanceof Node && scrollTarget.contains(rootContainer))
      )
        return;

      const scrollOffsetY = isDocumentScroll
        ? window.scrollY
        : (scrollTarget as Element).scrollTop;
      const currentTime = performance.now();

      if (
        scrollTarget !== activeScrollSource ||
        currentTime - lastScrollTimestamp > 200
      ) {
        activeScrollSource = scrollTarget;
        lastScrollPosition = scrollOffsetY;
        lastScrollTimestamp = currentTime;
        return;
      }

      const instantaneousVelocity =
        (scrollOffsetY - lastScrollPosition) /
        (Math.max(8, currentTime - lastScrollTimestamp) / 1000);
      observedScrollVelocity =
        observedScrollVelocity * 0.5 + instantaneousVelocity * 0.5;
      lastScrollPosition = scrollOffsetY;
      lastScrollTimestamp = currentTime;
    };

    if (pauseOnHover) {
      rootContainer.addEventListener('pointerenter', handlePointerEnter);
      rootContainer.addEventListener('pointerleave', handlePointerLeave);
    }
    if (draggable) {
      rootContainer.addEventListener('pointerdown', handlePointerDown);
      rootContainer.addEventListener('pointermove', handlePointerMove);
      rootContainer.addEventListener('pointerup', handlePointerUp);
      rootContainer.addEventListener('pointercancel', handlePointerUp);
    }
    if (isScrollBoostActive) {
      window.addEventListener('scroll', handleWindowScroll, {
        capture: true,
        passive: true,
      });
    }

    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) startTicker();
            else stopTicker();
          })
        : null;

    if (intersectionObserver) intersectionObserver.observe(rootContainer);
    else startTicker();

    return () => {
      intersectionObserver?.disconnect();
      stopTicker();
      gsap.killTweensOf(hoverScaleTracker);
      rootContainer.style.cursor = '';
      rootContainer.removeEventListener('pointerenter', handlePointerEnter);
      rootContainer.removeEventListener('pointerleave', handlePointerLeave);
      rootContainer.removeEventListener('pointerdown', handlePointerDown);
      rootContainer.removeEventListener('pointermove', handlePointerMove);
      rootContainer.removeEventListener('pointerup', handlePointerUp);
      rootContainer.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('scroll', handleWindowScroll, {
        capture: true,
      });
    };
  }, [
    pathMetrics,
    speed,
    direction,
    pauseOnHover,
    draggable,
    scrollBoost,
    cross,
    isCustomPath,
    shape,
    primaryRotationAngle,
    curviness,
    ribbonWidth,
  ]);

  const fullRepeatedLoopText = singleUnitText.repeat(pathMetrics.reps);
  const fullRepeatedCrossText = singleUnitText.repeat(pathMetrics.crossReps);
  const primaryPathLengthValue = pathMetrics.length || undefined;
  const crossPathLengthValue = pathMetrics.crossLength || undefined;

  const buildTextPaintAttributes = (
    strokeOrFillColor: string,
    opacityRatio: number
  ): SVGProps<SVGTextElement> =>
    outline
      ? {
          fill: 'none',
          stroke: strokeOrFillColor,
          strokeOpacity: opacityRatio,
          strokeWidth: outlineWidth,
          strokeLinejoin: 'round',
        }
      : { fill: strokeOrFillColor, fillOpacity: opacityRatio };

  const primaryTextPaint = buildTextPaintAttributes(primaryTextColor, 1);
  const crossTextPaint = buildTextPaintAttributes(
    resolvedCrossTextColor,
    crossTextOpacity
  );

  return (
    <div
      ref={containerRootRef}
      className={`relative w-full overflow-hidden ${
        draggable ? 'cursor-grab touch-pan-y' : ''
      } ${className}`.trim()}
      style={style}
    >
      <svg
        ref={svgElementRef}
        className="block w-full h-auto"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <defs>
          {fadeStopsList.length > 0 && (
            <linearGradient id={fadeGradientId} x1="0" y1="0" x2="1" y2="0">
              {fadeStopsList.map((stopItem, index) => (
                <stop
                  key={index}
                  offset={stopItem.offset}
                  stopColor="#ffffff"
                  stopOpacity={stopItem.opacity}
                />
              ))}
            </linearGradient>
          )}

          {fadeStopsList.length > 0 && (
            <mask
              id={fadeMaskId}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={VIEWBOX_WIDTH}
              height={VIEWBOX_HEIGHT}
            >
              <rect
                width={VIEWBOX_WIDTH}
                height={VIEWBOX_HEIGHT}
                fill={`url(#${fadeGradientId})`}
              />
            </mask>
          )}

          {cross && ribbon && (
            <filter
              id={dropShadowFilterId}
              filterUnits="userSpaceOnUse"
              x={-VIEWBOX_WIDTH}
              y={-VIEWBOX_HEIGHT}
              width={VIEWBOX_WIDTH * 3}
              height={VIEWBOX_HEIGHT * 3}
            >
              <feGaussianBlur stdDeviation={Math.max(4, ribbonWidth * 0.11)} />
            </filter>
          )}

          {cross && ribbon && (
            <mask
              id={ribbonUnderMaskId}
              maskUnits="userSpaceOnUse"
              x={-VIEWBOX_WIDTH}
              y={-VIEWBOX_HEIGHT}
              width={VIEWBOX_WIDTH * 3}
              height={VIEWBOX_HEIGHT * 3}
            >
              <g transform={crossTransform}>
                <path
                  d={crossPathData}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={ribbonWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </mask>
          )}
        </defs>

        <text
          ref={measureTextElementRef}
          className="invisible pointer-events-none"
          style={sharedTextStyle}
          aria-hidden="true"
        >
          {singleUnitText}
        </text>

        <g mask={fadeStopsList.length > 0 ? `url(#${fadeMaskId})` : undefined}>
          {cross && (
            <g transform={crossTransform}>
              <path
                ref={crossPathElementRef}
                id={crossPathId}
                d={crossPathData}
                fill="none"
                stroke={ribbon ? resolvedCrossRibbonColor : 'none'}
                strokeWidth={ribbon ? ribbonWidth : 0}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <text
                className="select-none"
                style={sharedTextStyle}
                {...crossTextPaint}
                dominantBaseline="central"
                aria-hidden="true"
                textLength={crossPathLengthValue}
                lengthAdjust="spacing"
              >
                <textPath
                  ref={crossHeadPathRef}
                  href={`#${crossPathId}`}
                  startOffset={0}
                >
                  {fullRepeatedCrossText}
                </textPath>
              </text>

              <text
                className="select-none"
                style={sharedTextStyle}
                {...crossTextPaint}
                dominantBaseline="central"
                aria-hidden="true"
                textLength={crossPathLengthValue}
                lengthAdjust="spacing"
              >
                <textPath
                  ref={crossTailPathRef}
                  href={`#${crossPathId}`}
                  startOffset={0}
                >
                  {fullRepeatedCrossText}
                </textPath>
              </text>
            </g>
          )}

          {cross && ribbon && (
            <g mask={`url(#${ribbonUnderMaskId})`}>
              <g
                filter={`url(#${dropShadowFilterId})`}
                transform={`translate(0 ${Math.max(4, ribbonWidth * 0.08)})`}
              >
                <g transform={primaryTransform}>
                  <path
                    d={mainPathData}
                    fill="none"
                    stroke="#000000"
                    strokeOpacity={0.42}
                    strokeWidth={ribbonWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </g>
          )}

          <g transform={primaryTransform}>
            <path
              ref={primaryPathElementRef}
              id={primaryPathId}
              d={mainPathData}
              fill="none"
              stroke={ribbon ? resolvedRibbonColor : 'none'}
              strokeWidth={ribbon ? ribbonWidth : 0}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text
              className="select-none"
              style={sharedTextStyle}
              {...primaryTextPaint}
              dominantBaseline="central"
              aria-hidden="true"
              textLength={primaryPathLengthValue}
              lengthAdjust="spacing"
            >
              <textPath
                ref={primaryHeadPathRef}
                href={`#${primaryPathId}`}
                startOffset={0}
              >
                {fullRepeatedLoopText}
              </textPath>
            </text>

            <text
              className="select-none"
              style={sharedTextStyle}
              {...primaryTextPaint}
              dominantBaseline="central"
              aria-hidden="true"
              textLength={primaryPathLengthValue}
              lengthAdjust="spacing"
            >
              <textPath
                ref={primaryTailPathRef}
                href={`#${primaryPathId}`}
                startOffset={0}
              >
                {fullRepeatedLoopText}
              </textPath>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export { TextLoop as TextMarqueeLoop };
export default TextLoop;
