'use client';

import React, {
  CSSProperties,
  SVGProps,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type TextLoopShape,
  type TextLoopDirection,
  type TextLoopProps,
  type PathMetrics,
  type FadeGradientStop,
  VIEWBOX_WIDTH,
  VIEWBOX_HEIGHT,
  CENTER_X,
  CENTER_Y,
  useIsomorphicLayoutEffect,
  resolveCssColor,
  generateSvgPath,
  generateFadeStops,
  lightenColor,
  calculateContrastingTextColor,
} from './text-loop-geometry';
import { useTextLoopEngine } from './use-text-loop-engine';

export type { TextLoopShape, TextLoopDirection, TextLoopProps, PathMetrics, FadeGradientStop };
export {
  VIEWBOX_WIDTH,
  VIEWBOX_HEIGHT,
  CENTER_X,
  CENTER_Y,
  generateSvgPath,
  generateFadeStops,
  resolveCssColor,
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

  useTextLoopEngine({
    rootContainer: containerRootRef.current,
    svgElement: svgElementRef.current,
    primaryHead: primaryHeadPathRef.current,
    primaryTail: primaryTailPathRef.current,
    crossHead: crossHeadPathRef.current,
    crossTail: crossTailPathRef.current,
    primaryPathLength: pathMetrics.length,
    crossPathLength: pathMetrics.crossLength,
    travelProgressRef,
    speed,
    direction,
    pauseOnHover,
    draggable,
    scrollBoost,
    primaryRotationAngle,
    isCustomPath,
    shape,
    curviness,
    ribbonWidth,
  });

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
