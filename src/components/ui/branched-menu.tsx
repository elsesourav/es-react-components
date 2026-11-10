'use client';

import React, {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  type BranchedMenuItemChild,
  type BranchedMenuItem,
  type BranchedMenuProps,
  DEFAULT_BRANCHED_ITEMS,
  BRANCH_PADDING_VERTICAL,
  ACTIVE_MARKER_HEIGHT,
  renderIconElement,
  normalizeOpenSectionsToSet,
  BRANCHED_MENU_STYLES,
  resolveCssColor,
} from './branched-menu-styles';

export type { BranchedMenuItemChild, BranchedMenuItem, BranchedMenuProps };
export { DEFAULT_BRANCHED_ITEMS };

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
    ...(color ? { '--bm-ink': resolveCssColor(color) } : {}),
    ...(accentColor ? { '--bm-accent': resolveCssColor(accentColor) } : {}),
    ...(lineColor ? { '--bm-line': resolveCssColor(lineColor) } : {}),
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
