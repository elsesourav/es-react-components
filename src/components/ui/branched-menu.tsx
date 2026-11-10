'use client';

import React, {
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
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
  defaultOpen?: number | number[];
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

const DEFAULT_BRANCHED_ITEMS: BranchedMenuItem[] = [
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

const BRANCH_PADDING_VERTICAL = 6;
const ACTIVE_MARKER_HEIGHT = 16;

const renderIconElement = (
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

const normalizeOpenSectionsToSet = (
  openParam: number | number[] | Set<number>
): Set<number> => {
  if (openParam instanceof Set) return openParam;
  if (Array.isArray(openParam)) return new Set(openParam);
  if (typeof openParam === 'number' && openParam >= 0) return new Set([openParam]);
  return new Set();
};

const BRANCHED_MENU_STYLES = `
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

const resolveCssColor = (colorString: string) => {
  if (!colorString) return colorString;
  const trimmed = colorString.trim();
  if (trimmed.startsWith('var(--') && !trimmed.startsWith('hsl(')) {
    return `hsl(${trimmed})`;
  }
  return trimmed;
};

export const BranchedMenu: React.FC<BranchedMenuProps> = ({
  items = DEFAULT_BRANCHED_ITEMS,
  defaultOpen = 0,
  defaultActive = '',
  onSelect,
  onToggle,
  color = 'hsl(var(--foreground))',
  accentColor = 'hsl(var(--primary))',
  lineColor = 'hsl(var(--border-strong, var(--border)))',
  width = 240,
  rowHeight = 36,
  indent = 40,
  trunk = 14,
  radius = 10,
  lineWidth = 1.5,
  fontSize = 14,
  drawDuration = 400,
  foldDuration = 300,
  className = '',
  style = {},
}) => {
  const [expandedSectionIndices, setExpandedSectionIndices] = useState<Set<number>>(
    () => normalizeOpenSectionsToSet(defaultOpen)
  );

  const [activeItemValue, setActiveItemValue] = useState<string>(() => {
    if (defaultActive) return defaultActive;
    const initialOpenSet = normalizeOpenSectionsToSet(defaultOpen);
    const initialMatchingSection = items.find(
      (section, index) => section.children && initialOpenSet.has(index)
    );
    return initialMatchingSection?.children?.[0]?.value ?? '';
  });

  const menuContainerRef = useRef<HTMLElement | null>(null);
  const sectionHeaderButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeMarkerRef = useRef<HTMLSpanElement | null>(null);

  const callbackHandlersRef = useRef<{
    onSelect?: BranchedMenuProps['onSelect'];
    onToggle?: BranchedMenuProps['onToggle'];
  }>({});
  callbackHandlersRef.current = { onSelect, onToggle };

  const activeSectionIndex = items.findIndex((section) =>
    section.children?.some((child) => child.value === activeItemValue)
  );
  const isMarkerVisible =
    activeSectionIndex >= 0 && expandedSectionIndices.has(activeSectionIndex);

  useLayoutEffect(() => {
    const updateMarkerPosition = (enableTransition: boolean) => {
      const markerElement = activeMarkerRef.current;
      const headerElement = sectionHeaderButtonRefs.current[activeSectionIndex];
      if (!markerElement) return;

      const isPositioned = isMarkerVisible && headerElement;
      if (!enableTransition) markerElement.style.transition = 'none';

      if (isPositioned && headerElement) {
        markerElement.style.top = `${
          headerElement.offsetTop +
          (headerElement.offsetHeight - ACTIVE_MARKER_HEIGHT) / 2
        }px`;
      }
      markerElement.toggleAttribute('data-on', Boolean(isPositioned));

      if (!enableTransition) {
        void markerElement.offsetHeight;
        markerElement.style.transition = '';
      }
    };

    updateMarkerPosition(true);

    let isInitialResize = true;
    const resizeObserver = new ResizeObserver(() => {
      if (isInitialResize) {
        isInitialResize = false;
        return;
      }
      updateMarkerPosition(false);
    });

    if (menuContainerRef.current)
      resizeObserver.observe(menuContainerRef.current);

    return () => resizeObserver.disconnect();
  }, [activeSectionIndex, isMarkerVisible, items, fontSize, rowHeight]);

  const handleSelectItem = (
    value: string,
    item: BranchedMenuItem | BranchedMenuItemChild
  ) => {
    setActiveItemValue(value);
    callbackHandlersRef.current.onSelect?.(value, item);
  };

  const handleToggleSection = (sectionIndex: number) => {
    setExpandedSectionIndices((previous) => {
      const nextSet = new Set(previous);
      const isCurrentlyOpen = nextSet.has(sectionIndex);
      if (isCurrentlyOpen) nextSet.delete(sectionIndex);
      else nextSet.add(sectionIndex);
      callbackHandlersRef.current.onToggle?.(sectionIndex, !isCurrentlyOpen);
      return nextSet;
    });
  };

  const clampedArcRadius = Math.min(radius, rowHeight / 2 - 2);
  const connectorEndX = indent - 8;
  const calculateRowCenterY = (rowIndex: number) =>
    BRANCH_PADDING_VERTICAL + rowIndex * rowHeight + rowHeight / 2;

  const createBranchSvgPath = (rowIndex: number) =>
    `M ${trunk} ${
      calculateRowCenterY(rowIndex) - clampedArcRadius
    } A ${clampedArcRadius} ${clampedArcRadius} 0 0 0 ${
      trunk + clampedArcRadius
    } ${calculateRowCenterY(rowIndex)} H ${connectorEndX}`;

  const createReachSvgPath = (rowIndex: number) =>
    `M ${trunk} 0 V ${
      calculateRowCenterY(rowIndex) - clampedArcRadius
    } A ${clampedArcRadius} ${clampedArcRadius} 0 0 0 ${
      trunk + clampedArcRadius
    } ${calculateRowCenterY(rowIndex)} H ${connectorEndX}`;

  const calculateStrokePathLength = (rowIndex: number) =>
    calculateRowCenterY(rowIndex) -
    clampedArcRadius +
    (Math.PI * clampedArcRadius) / 2 +
    (connectorEndX - trunk - clampedArcRadius);

  const menuCssVariables: CSSProperties = {
    '--bm-w': `${width}px`,
    '--bm-ink': resolveCssColor(color),
    '--bm-accent': resolveCssColor(accentColor),
    '--bm-line': resolveCssColor(lineColor),
    '--bm-font': `${fontSize}px`,
    '--bm-row': `${rowHeight}px`,
    '--bm-indent': `${indent}px`,
    '--bm-line-w': lineWidth,
    '--bm-draw': `${drawDuration}ms`,
    '--bm-fold': `${foldDuration}ms`,
    ...style,
  } as CSSProperties;

  return (
    <>
      <style>{BRANCHED_MENU_STYLES}</style>
      <nav
        ref={menuContainerRef}
        className={`branched-menu${className ? ` ${className}` : ''}`}
        style={menuCssVariables}
      >
        <span
          ref={activeMarkerRef}
          className="branched-menu__marker"
          aria-hidden="true"
        />
        {items.map((sectionItem, sectionIndex) => {
          const childItems = sectionItem.children;
          const isSectionOpen = childItems
            ? expandedSectionIndices.has(sectionIndex)
            : false;
          const leafValue = sectionItem.value ?? sectionItem.label;
          const isLeafActive = !childItems && leafValue === activeItemValue;
          const sectionBodyHeight = childItems
            ? BRANCH_PADDING_VERTICAL * 2 + childItems.length * rowHeight
            : 0;

          return (
            <div
              key={sectionItem.value ?? sectionItem.label}
              className="branched-menu__section"
              data-open={isSectionOpen ? '' : undefined}
            >
              <button
                ref={(element) => {
                  sectionHeaderButtonRefs.current[sectionIndex] = element;
                }}
                type="button"
                className="branched-menu__head"
                aria-expanded={childItems ? isSectionOpen : undefined}
                aria-current={isLeafActive ? 'true' : undefined}
                data-active={isLeafActive ? '' : undefined}
                onClick={() =>
                  childItems
                    ? handleToggleSection(sectionIndex)
                    : handleSelectItem(leafValue, sectionItem)
                }
              >
                {sectionItem.label}
              </button>

              {childItems ? (
                <div className="branched-menu__body">
                  <div className="branched-menu__fold">
                    <div
                      className="branched-menu__tree"
                      style={{ height: sectionBodyHeight }}
                    >
                      <svg
                        className="branched-menu__lines"
                        width={indent}
                        height={sectionBodyHeight}
                        aria-hidden="true"
                      >
                        <path
                          className="branched-menu__base"
                          d={`M ${trunk} 0 V ${
                            calculateRowCenterY(childItems.length - 1) -
                            clampedArcRadius
                          }`}
                        />
                        {childItems.map((child, childIndex) => (
                          <path
                            key={child.value}
                            className="branched-menu__base"
                            d={createBranchSvgPath(childIndex)}
                          />
                        ))}
                        {childItems.map((child, childIndex) => (
                          <path
                            key={child.value}
                            className="branched-menu__reach"
                            d={createReachSvgPath(childIndex)}
                            style={{
                              strokeDasharray:
                                calculateStrokePathLength(childIndex),
                              strokeDashoffset:
                                child.value === activeItemValue
                                  ? 0
                                  : calculateStrokePathLength(childIndex),
                            }}
                          />
                        ))}
                      </svg>

                      {childItems.map((child) => (
                        <button
                          key={child.value}
                          type="button"
                          className="branched-menu__item"
                          aria-current={
                            child.value === activeItemValue ? 'true' : undefined
                          }
                          data-active={
                            child.value === activeItemValue ? '' : undefined
                          }
                          tabIndex={isSectionOpen ? 0 : -1}
                          onClick={() => handleSelectItem(child.value, child)}
                        >
                          {child.icon ? (
                            <span
                              className="branched-menu__icon"
                              aria-hidden="true"
                            >
                              {renderIconElement(child.icon)}
                            </span>
                          ) : null}
                          <span className="branched-menu__label">
                            {child.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </>
  );
};

export { BranchedMenu as BranchMenu };
export default BranchedMenu;
