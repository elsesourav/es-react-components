'use client';

import React, { isValidElement, type CSSProperties, type ReactNode } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  CursorPointer01Icon,
  Download04Icon,
  Layers01Icon,
  Notification03Icon,
  PaintBoardIcon,
  Rocket01Icon,
  Settings02Icon,
  TextFontIcon,
} from '@hugeicons/core-free-icons';

export interface BranchedMenuItemChild {
  value: string;
  label: string;
  icon?: IconSvgElement | ReactNode | React.ComponentType<{ className?: string; size?: number }>;
}

export interface BranchedMenuItem {
  label: string;
  value?: string;
  children?: BranchedMenuItemChild[];
}

export interface BranchedMenuProps {
  items?: BranchedMenuItem[];
  defaultOpen?: number | number[] | Set<number>;
  openSections?: number | number[] | Set<number>;
  activeItem?: string;
  defaultActive?: string;
  onSelect?: (
    value: string,
    item: BranchedMenuItem | BranchedMenuItemChild
  ) => void;
  onToggle?: (index: number, isOpen: boolean) => void;
  color?: string;
  accentColor?: string;
  lineColor?: string;
  width?: number;
  rowHeight?: number;
  indent?: number;
  trunk?: number;
  radius?: number;
  lineWidth?: number;
  fontSize?: number;
  drawDuration?: number;
  foldDuration?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export const DEFAULT_BRANCHED_ITEMS: BranchedMenuItem[] = [
  {
    label: 'Getting started',
    children: [
      { value: 'install', label: 'Installation', icon: Download04Icon },
      { value: 'quick', label: 'Quick start', icon: Rocket01Icon },
      { value: 'config', label: 'Configuration', icon: Settings02Icon },
      { value: 'theming', label: 'Theming', icon: PaintBoardIcon },
    ],
  },
  {
    label: 'Components',
    children: [
      { value: 'buttons', label: 'Buttons', icon: CursorPointer01Icon },
      { value: 'typography', label: 'Typography', icon: TextFontIcon },
      { value: 'overlays', label: 'Overlays', icon: Layers01Icon },
      { value: 'toasts', label: 'Toasts', icon: Notification03Icon },
    ],
  },
];

export const BRANCH_PADDING_VERTICAL = 6;
export const ACTIVE_MARKER_HEIGHT = 16;

export const renderIconElement = (
  icon: IconSvgElement | ReactNode | React.ComponentType<{ className?: string; size?: number }>
): ReactNode => {
  if (isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === 'function') {
    const Component = icon;
    return <Component size={16} className="h-4 w-4" />;
  }
  if (Array.isArray(icon)) {
    return <HugeiconsIcon icon={icon as IconSvgElement} size={16} strokeWidth={1.8} />;
  }
  return null;
};

export const normalizeOpenSectionsToSet = (
  openParam: number | number[] | Set<number>
): Set<number> => {
  if (openParam instanceof Set) return openParam;
  if (Array.isArray(openParam)) return new Set(openParam);
  if (typeof openParam === 'number' && openParam >= 0) return new Set([openParam]);
  return new Set();
};

export const BRANCHED_MENU_STYLES = `
.branched-menu {
  --bm-w: 240px;
  --bm-ink: hsl(var(--foreground, 0 0% 98%));
  --bm-accent: hsl(var(--primary, 238.7 83.5% 66.7%));
  --bm-line: hsl(var(--border, 240 5.9% 90%));
  --bm-font: 14px;
  --bm-row: 36px;
  --bm-indent: 40px;
  --bm-line-w: 1.5;
  --bm-draw: 400ms;
  --bm-fold: 300ms;
  --bm-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --bm-muted: color-mix(in srgb, var(--bm-ink) 55%, transparent);

  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: min(var(--bm-w), 100%);
  padding-left: 14px;
  color: var(--bm-ink);
  font-family: inherit;
  font-size: var(--bm-font);
  line-height: 1.2;
}

.branched-menu::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 0;
  left: 0;
  width: 2px;
  border-radius: 1px;
  background: linear-gradient(to bottom, var(--bm-line) 0%, var(--bm-line) 55%, transparent 100%);
}

.branched-menu__marker {
  position: absolute;
  top: -1px;
  left: 0;
  z-index: 1;
  width: 2px;
  height: 16px;
  border-radius: 1px;
  background: var(--bm-accent);
  opacity: 0;
  transition:
    top 220ms var(--bm-ease-out),
    opacity 150ms ease;
}

.branched-menu__marker[data-on] {
  opacity: 1;
}

.branched-menu__section {
  display: flex;
  flex-direction: column;
}

.branched-menu__head {
  display: block;
  margin: 0;
  padding: 9px 0;
  border: 0;
  background: none;
  color: var(--bm-muted);
  font: inherit;
  font-size: calc(var(--bm-font) + 1px);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 200ms ease;
}

.branched-menu__section[data-open] .branched-menu__head,
.branched-menu__head[data-active] {
  color: var(--bm-ink);
}

@media (hover: hover) and (pointer: fine) {
  .branched-menu__head:hover {
    color: var(--bm-ink);
  }
}

.branched-menu__body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--bm-fold) var(--bm-ease-out);
}

.branched-menu__section[data-open] .branched-menu__body {
  grid-template-rows: 1fr;
}

.branched-menu__fold {
  min-height: 0;
  overflow: hidden;
}

.branched-menu__tree {
  position: relative;
  padding: 6px 0;
  box-sizing: border-box;
}

.branched-menu__lines {
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease;
}

.branched-menu__section[data-open] .branched-menu__lines {
  opacity: 1;
  transition: opacity 250ms ease 100ms;
}

.branched-menu__base,
.branched-menu__reach {
  fill: none;
  stroke-width: var(--bm-line-w);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.branched-menu__base {
  stroke: var(--bm-line);
}

.branched-menu__reach {
  stroke: var(--bm-accent);
  transition: stroke-dashoffset var(--bm-draw) var(--bm-ease-out);
}

.branched-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: var(--bm-row);
  margin: 0;
  padding: 0 0 0 var(--bm-indent);
  border: 0;
  background: none;
  color: var(--bm-muted);
  font: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  transition: color 200ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .branched-menu__item:hover {
    color: var(--bm-ink);
  }
}

.branched-menu__item[data-active] {
  color: var(--bm-accent);
  font-weight: 500;
}

.branched-menu__icon {
  display: inline-flex;
  flex: none;
}

.branched-menu__label {
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .branched-menu__marker {
    transition: opacity 150ms ease;
  }
  .branched-menu__body {
    transition: none;
  }
  .branched-menu__reach {
    transition: none;
  }
}
`;

export const resolveCssColor = (colorString: string) => {
  if (!colorString) return colorString;
  const trimmed = colorString.trim();
  if (trimmed.startsWith('var(--') && !trimmed.startsWith('hsl(')) {
    return `hsl(${trimmed})`;
  }
  return trimmed;
};
