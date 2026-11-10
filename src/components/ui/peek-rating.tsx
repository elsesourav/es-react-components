'use client';

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import { FavouriteIcon, FlashIcon, StarIcon } from '@hugeicons/core-free-icons';

export type PeekRatingShape = 'star' | 'heart' | 'bolt';

export interface PeekRatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onPreview?: (value: number | null) => void;
  count?: number;
  shape?: PeekRatingShape;
  icon?: ReactNode;
  labels?: string[];
  activeColor?: string;
  idleColor?: string;
  tipColor?: string;
  tipTextColor?: string;
  size?: number;
  lift?: number;
  magnify?: number;
  riseDuration?: number;
  popScale?: number;
  showTip?: boolean;
  allowClear?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

interface GestureInteractionState {
  hoveredIndex: number | null;
  isPointerPressed: boolean;
  activePointerId: number | null;
  isSettled: boolean;
  boundingRect: DOMRect | null;
  isRightToLeft: boolean;
}

const EASE_OUT_CUBIC = 'cubic-bezier(0.23, 1, 0.32, 1)';

const PRESET_SHAPE_ICONS: Record<PeekRatingShape, IconSvgElement> = {
  star: StarIcon,
  heart: FavouriteIcon,
  bolt: FlashIcon,
};

const clampNumericRange = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const resolveCssColor = (colorString?: string) => {
  if (!colorString) return colorString;
  const trimmed = colorString.trim();
  if (trimmed.startsWith('var(--') && !trimmed.startsWith('hsl(')) {
    return `hsl(${trimmed})`;
  }
  return trimmed;
};

const checkReducedMotionPreference = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const PeekRating: React.FC<PeekRatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onPreview,
  count = 5,
  shape = 'star',
  icon,
  labels = [],
  activeColor = '#f5b400',
  idleColor = '#52525b',
  tipColor = '#27272a',
  tipTextColor = '#f5f5f5',
  size = 28,
  lift = 6,
  magnify = 1.15,
  riseDuration = 320,
  popScale = 1.3,
  showTip = true,
  allowClear = true,
  readOnly = false,
  disabled = false,
  ariaLabel = 'Rating',
  className = '',
  style = {},
}) => {
  const [internalRatingValue, setInternalRatingValue] = useState(defaultValue);
  const resolvedRatingValue = clampNumericRange(
    controlledValue ?? internalRatingValue,
    0,
    count
  );
  const isInteractive = !readOnly && !disabled;

  const rootContainerRef = useRef<HTMLDivElement>(null);
  const ratingRowContainerRef = useRef<HTMLDivElement>(null);
  const floatingTooltipRef = useRef<HTMLSpanElement>(null);
  const itemButtonRefs = useRef<(HTMLElement | null)[]>([]);
  const itemLiftRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const itemGlyphRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const gestureStateRef = useRef<GestureInteractionState>({
    hoveredIndex: null,
    isPointerPressed: false,
    activePointerId: null,
    isSettled: false,
    boundingRect: null,
    isRightToLeft: false,
  });

  const syncRatingVisuals = () => {
    const { hoveredIndex, isSettled, isRightToLeft } = gestureStateRef.current;
    const isCurrentlyPreviewing = hoveredIndex !== null && !isSettled;
    const visibleRatingCount = isCurrentlyPreviewing
      ? hoveredIndex + 1
      : resolvedRatingValue;
    const isReducedMotionActive = checkReducedMotionPreference();

    for (let i = 0; i < count; i++) {
      const liftElement = itemLiftRefs.current[i];
      const glyphElement = itemGlyphRefs.current[i];
      if (!liftElement || !glyphElement) continue;

      const isItemLifted =
        isCurrentlyPreviewing && !isReducedMotionActive && i <= hoveredIndex;
      liftElement.style.transform = isItemLifted
        ? `translateY(${-lift}px) scale(${i === hoveredIndex ? magnify : 1})`
        : 'translateY(0px) scale(1)';
      glyphElement.dataset.lit = String(i < visibleRatingCount);
    }

    const tooltipElement = floatingTooltipRef.current;
    if (!tooltipElement) return;

    if (isCurrentlyPreviewing && showTip) {
      const rowContainer = ratingRowContainerRef.current;
      const slotWidth = rowContainer ? rowContainer.clientWidth / count : size;
      const visualSlotIndex = isRightToLeft
        ? count - 1 - hoveredIndex
        : hoveredIndex;
      const wasPreviouslyHidden = tooltipElement.dataset.show !== 'true';

      if (wasPreviouslyHidden) tooltipElement.style.transition = 'none';
      tooltipElement.textContent =
        labels[hoveredIndex] ?? String(hoveredIndex + 1);
      tooltipElement.style.transform = `translate(calc(${
        slotWidth * (visualSlotIndex + 0.5)
      }px - 50%), 0)`;

      if (wasPreviouslyHidden) {
        void tooltipElement.offsetWidth;
        tooltipElement.style.transition = '';
      }
      tooltipElement.dataset.show = 'true';
    } else {
      tooltipElement.dataset.show = 'false';
    }
  };

  useLayoutEffect(syncRatingVisuals);

  const updateHoverState = (newHoverIndex: number | null) => {
    if (newHoverIndex === gestureStateRef.current.hoveredIndex) return;
    gestureStateRef.current.hoveredIndex = newHoverIndex;
    if (newHoverIndex !== null) gestureStateRef.current.isSettled = false;
    syncRatingVisuals();
    onPreview?.(newHoverIndex === null ? null : newHoverIndex + 1);
  };

  const updateHoverStateRef = useRef(updateHoverState);
  updateHoverStateRef.current = updateHoverState;

  const measureRowDimensions = () => {
    const rowContainer = ratingRowContainerRef.current;
    if (!rowContainer) return;
    gestureStateRef.current.boundingRect = rowContainer.getBoundingClientRect();
    gestureStateRef.current.isRightToLeft =
      getComputedStyle(rowContainer).direction === 'rtl';
  };

  const getRatingIndexAtCoordinates = (
    clientX: number,
    clientY: number
  ): number | null => {
    const { boundingRect, isPointerPressed, isRightToLeft } =
      gestureStateRef.current;
    if (!boundingRect || !boundingRect.width) return null;
    if (
      isPointerPressed &&
      (clientY < boundingRect.top - size || clientY > boundingRect.bottom + size)
    ) {
      return null;
    }
    const calculatedIndex = clampNumericRange(
      Math.floor(((clientX - boundingRect.left) / boundingRect.width) * count),
      0,
      count - 1
    );
    return isRightToLeft ? count - 1 - calculatedIndex : calculatedIndex;
  };

  const commitRatingSelection = (nextRating: number, triggerPopScale = true) => {
    if (controlledValue === undefined) setInternalRatingValue(nextRating);
    onChange?.(nextRating);
    gestureStateRef.current.isSettled = true;
    syncRatingVisuals();

    const targetGlyph = itemGlyphRefs.current[nextRating - 1];
    if (
      triggerPopScale &&
      nextRating > 0 &&
      popScale > 1 &&
      targetGlyph &&
      typeof targetGlyph.animate === 'function' &&
      !checkReducedMotionPreference()
    ) {
      targetGlyph.getAnimations().forEach((animation) => animation.cancel());
      targetGlyph.animate(
        [
          { transform: 'scale(1)', easing: EASE_OUT_CUBIC },
          {
            transform: `scale(${popScale})`,
            offset: 0.35,
            easing: EASE_OUT_CUBIC,
          },
          { transform: 'scale(1)' },
        ],
        { duration: 300 }
      );
    }
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive || event.pointerType !== 'mouse') return;
    rootContainerRef.current?.removeAttribute('data-instant');
    measureRowDimensions();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !isInteractive ||
      event.button !== 0 ||
      gestureStateRef.current.activePointerId !== null
    )
      return;
    rootContainerRef.current?.removeAttribute('data-instant');
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
    gestureStateRef.current.activePointerId = event.pointerId;
    gestureStateRef.current.isPointerPressed = true;
    measureRowDimensions();
    updateHoverState(getRatingIndexAtCoordinates(event.clientX, event.clientY));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    const { isPointerPressed, activePointerId } = gestureStateRef.current;
    if (event.pointerType !== 'mouse' && !isPointerPressed) return;
    if (isPointerPressed && event.pointerId !== activePointerId) return;
    if (!isPointerPressed && !gestureStateRef.current.boundingRect)
      measureRowDimensions();
    updateHoverState(getRatingIndexAtCoordinates(event.clientX, event.clientY));
  };

  const handlePointerRelease = (event: React.PointerEvent<HTMLDivElement>) => {
    const { isPointerPressed, activePointerId, hoveredIndex } =
      gestureStateRef.current;
    if (!isPointerPressed || event.pointerId !== activePointerId) return;

    gestureStateRef.current.isPointerPressed = false;
    gestureStateRef.current.activePointerId = null;

    if (event.type === 'pointerup' && hoveredIndex !== null) {
      const selectedRating = hoveredIndex + 1;
      commitRatingSelection(
        allowClear && selectedRating === resolvedRatingValue
          ? 0
          : selectedRating
      );
    }
    if (event.pointerType !== 'mouse') updateHoverState(null);
  };

  const handlePointerLeave = () => {
    if (!gestureStateRef.current.isPointerPressed) updateHoverState(null);
  };

  const handleKeyboardInteraction = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!isInteractive) return;
    const minimumAllowed = allowClear ? 0 : 1;
    let nextValue: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        nextValue = clampNumericRange(
          resolvedRatingValue + 1,
          minimumAllowed,
          count
        );
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        nextValue = clampNumericRange(
          resolvedRatingValue - 1,
          minimumAllowed,
          count
        );
        break;
      case 'Home':
        nextValue = 1;
        break;
      case 'End':
        nextValue = count;
        break;
      case 'Backspace':
      case 'Delete':
        if (!allowClear) return;
        nextValue = 0;
        break;
      case ' ':
      case 'Enter': {
        const itemIndex = itemButtonRefs.current.indexOf(
          event.target as HTMLElement
        );
        if (itemIndex === -1) return;
        nextValue =
          allowClear && itemIndex + 1 === resolvedRatingValue
            ? 0
            : itemIndex + 1;
        break;
      }
      default:
        return;
    }

    event.preventDefault();
    rootContainerRef.current?.setAttribute('data-instant', 'true');
    gestureStateRef.current.hoveredIndex = null;
    commitRatingSelection(nextValue, false);
    itemButtonRefs.current[Math.max(nextValue, 1) - 1]?.focus();
  };

  useEffect(() => {
    const resetGestureState = () => {
      gestureStateRef.current.isPointerPressed = false;
      gestureStateRef.current.activePointerId = null;
      updateHoverStateRef.current(null);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) resetGestureState();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', resetGestureState);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', resetGestureState);
    };
  }, []);

  const RatingItemElement = (readOnly ? 'span' : 'button') as 'button';
  const resolvedShapeIcon = PRESET_SHAPE_ICONS[shape] || PRESET_SHAPE_ICONS.star;
  const tooltipVerticalSpacing =
    isInteractive && showTip ? Math.round(size * 0.9) : 0;

  const ratingCssVariables = {
    ...(activeColor ? { '--pr-active': resolveCssColor(activeColor) } : {}),
    ...(idleColor ? { '--pr-idle': resolveCssColor(idleColor) } : {}),
    ...(tipColor ? { '--pr-tip': resolveCssColor(tipColor) } : {}),
    ...(tipTextColor ? { '--pr-tip-text': resolveCssColor(tipTextColor) } : {}),
    '--pr-size': `${size}px`,
    '--pr-gap': `${Math.round(size * 0.22)}px`,
    '--pr-room': `${lift + tooltipVerticalSpacing}px`,
    '--pr-rise': `${riseDuration}ms`,
    '--pr-ease-out': EASE_OUT_CUBIC,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={rootContainerRef}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={
        readOnly ? `${resolvedRatingValue} of ${count}` : ariaLabel
      }
      aria-disabled={disabled || undefined}
      className={`group inline-flex font-[inherit] text-inherit aria-disabled:pointer-events-none aria-disabled:opacity-50${
        className ? ` ${className}` : ''
      }`}
      style={ratingCssVariables}
      onKeyDown={readOnly ? undefined : handleKeyboardInteraction}
    >
      <div
        ref={ratingRowContainerRef}
        className="relative inline-flex touch-pan-y select-none items-end pt-[var(--pr-room)] [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]"
        onPointerEnter={handlePointerEnter}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        onLostPointerCapture={handlePointerRelease}
        onPointerLeave={handlePointerLeave}
      >
        {isInteractive && showTip ? (
          <span
            ref={floatingTooltipRef}
            className="pointer-events-none absolute left-0 top-0 inline-flex h-[calc(var(--pr-size)*0.6)] items-center whitespace-nowrap rounded-full px-[calc(var(--pr-size)*0.3)] text-[length:calc(var(--pr-size)*0.38)] font-semibold leading-none tracking-[0.01em] opacity-0 shadow-[0_2px_10px_rgba(0,0,0,0.18)] [background:var(--pr-tip)] [color:var(--pr-tip-text)] [transition:transform_var(--pr-rise)_var(--pr-ease-out),opacity_180ms_ease] data-[show=true]:opacity-100 group-data-[instant=true]:[transition-duration:0ms] motion-reduce:[transition:opacity_180ms_ease]"
            aria-hidden="true"
          />
        ) : null}

        {Array.from({ length: count }, (_, itemIndex) => {
          const isItemChecked = resolvedRatingValue === itemIndex + 1;
          const accessibleItemLabel = labels[itemIndex]
            ? `${itemIndex + 1} of ${count}, ${labels[itemIndex]}`
            : `${itemIndex + 1} of ${count}`;

          return (
            <RatingItemElement
              key={itemIndex}
              ref={(element: HTMLElement | null) => {
                itemButtonRefs.current[itemIndex] = element;
              }}
              type={readOnly ? undefined : 'button'}
              className="m-0 grid h-[calc(var(--pr-size)_+_8px)] w-[calc(var(--pr-size)_+_var(--pr-gap))] touch-manipulation place-items-center border-0 bg-transparent p-0 font-[inherit] text-inherit outline-none [@media(hover:hover)_and_(pointer:fine)]:cursor-pointer [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11 focus-visible:rounded-md focus-visible:outline-offset-2 focus-visible:[outline:2px_solid_color-mix(in_srgb,var(--pr-active)_70%,transparent)]"
              role={readOnly ? undefined : 'radio'}
              aria-checked={readOnly ? undefined : isItemChecked}
              aria-label={readOnly ? undefined : accessibleItemLabel}
              aria-hidden={readOnly || undefined}
              tabIndex={
                !isInteractive
                  ? -1
                  : (resolvedRatingValue === 0 ? itemIndex === 0 : isItemChecked)
                  ? 0
                  : -1
              }
            >
              <span
                ref={(element) => {
                  itemLiftRefs.current[itemIndex] = element;
                }}
                className="block origin-bottom [transition:transform_var(--pr-rise)_var(--pr-ease-out)] group-data-[instant=true]:[transition-duration:0ms] motion-reduce:transition-none"
              >
                <span
                  ref={(element) => {
                    itemGlyphRefs.current[itemIndex] = element;
                  }}
                  className="block h-[var(--pr-size)] w-[var(--pr-size)] text-[var(--pr-idle)] [transition:color_160ms_ease] data-[lit=true]:text-[var(--pr-active)] group-data-[instant=true]:[transition-duration:0ms] [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                >
                  {icon ?? (
                    <HugeiconsIcon
                      icon={resolvedShapeIcon}
                      size={size}
                      fill="currentColor"
                      strokeWidth={1.5}
                    />
                  )}
                </span>
              </span>
            </RatingItemElement>
          );
        })}
      </div>
    </div>
  );
};

export { PeekRating as Rating };
export default PeekRating;
