'use client';

import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
} from 'react';

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

export interface PathMetrics {
  length: number;
  reps: number;
  crossLength: number;
  crossReps: number;
}

export interface FadeGradientStop {
  offset: number;
  opacity: number;
}

export const VIEWBOX_WIDTH = 1200;
export const VIEWBOX_HEIGHT = 520;
export const CENTER_X = VIEWBOX_WIDTH / 2;
export const CENTER_Y = VIEWBOX_HEIGHT / 2;
export const EDGE_PADDING = 6;
export const FADE_RESOLUTION_STEPS = 8;
export const MAX_FLING_VELOCITY = 2600;
export const MAX_SCROLL_BOOST = 1600;

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const calculateSmoothStep = (normalizedProgress: number) =>
  normalizedProgress *
  normalizedProgress *
  normalizedProgress *
  (normalizedProgress * (normalizedProgress * 6 - 15) + 10);

export const clampValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const resolveCssColor = (colorString?: string): string => {
  if (!colorString) return '';
  const trimmed = colorString.trim();
  if (trimmed.startsWith('var(--') && !trimmed.startsWith('hsl(')) {
    return `hsl(${trimmed})`;
  }
  return trimmed;
};

export const wrapOffset = (value: number, totalLength: number) =>
  ((value % totalLength) + totalLength) % totalLength;

export const calculateCircleRadius = (curviness: number, ribbonWidth: number) =>
  Math.min(
    90 + Math.max(0, curviness) * 0.95,
    Math.max(20, CENTER_Y - Math.max(0, ribbonWidth) / 2 - EDGE_PADDING)
  );

export const generateSvgPath = (
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

export const generateFadeStops = (edgeFadeRatio: number): FadeGradientStop[] => {
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

export const parseHexRgb = (colorString?: string): [number, number, number] | null => {
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

export const lightenColor = (colorHex: string, amount: number): string => {
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

export const calculateContrastingTextColor = (bgColorHex: string): string => {
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
