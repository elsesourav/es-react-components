'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import {
  type TextLoopShape,
  type TextLoopDirection,
  VIEWBOX_WIDTH,
  MAX_FLING_VELOCITY,
  MAX_SCROLL_BOOST,
  clampValue,
  wrapOffset,
  calculateCircleRadius,
} from './text-loop-geometry';

export interface UseTextLoopEngineOptions {
  rootContainer: HTMLDivElement | null;
  svgElement: SVGSVGElement | null;
  primaryHead: SVGTextPathElement | null;
  primaryTail: SVGTextPathElement | null;
  crossHead: SVGTextPathElement | null;
  crossTail: SVGTextPathElement | null;
  primaryPathLength: number;
  crossPathLength: number;
  travelProgressRef: React.MutableRefObject<number>;
  speed: number;
  direction: TextLoopDirection;
  pauseOnHover: boolean;
  draggable: boolean;
  scrollBoost: number;
  primaryRotationAngle: number;
  isCustomPath: boolean;
  shape: TextLoopShape;
  curviness: number;
  ribbonWidth: number;
}

export function useTextLoopEngine({
  rootContainer,
  svgElement,
  primaryHead,
  primaryTail,
  crossHead,
  crossTail,
  primaryPathLength,
  crossPathLength,
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
}: UseTextLoopEngineOptions) {
  useEffect(() => {
    if (!rootContainer || !svgElement || !primaryPathLength) return undefined;

    const primaryPathElements = primaryHead && primaryTail ? [primaryHead, primaryTail] : null;
    const crossPathElements = crossHead && crossTail && crossPathLength ? [crossHead, crossTail] : null;
    if (!primaryPathElements) return undefined;

    let currentDistance = travelProgressRef.current;

    const applyOffsets = () => {
      travelProgressRef.current = currentDistance;
      const primaryWrappedOffset = wrapOffset(-currentDistance, primaryPathLength);
      primaryPathElements[0].setAttribute('startOffset', String(primaryWrappedOffset));
      primaryPathElements[1].setAttribute('startOffset', String(primaryWrappedOffset - primaryPathLength));

      if (crossPathElements) {
        const crossWrappedOffset = wrapOffset(-currentDistance, crossPathLength);
        crossPathElements[0].setAttribute('startOffset', String(crossWrappedOffset));
        crossPathElements[1].setAttribute('startOffset', String(crossWrappedOffset - crossPathLength));
      }
    };
    applyOffsets();

    const isReducedMotion = Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    );
    const motionSign = direction === 'reverse' ? -1 : 1;
    const baseSpeed = isReducedMotion ? 0 : Math.max(0, speed) * motionSign;
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
      if (isScrollBoostActive) {
        window.removeEventListener('scroll', handleWindowScroll, { capture: true });
      }
    };
  }, [
    rootContainer,
    svgElement,
    primaryHead,
    primaryTail,
    crossHead,
    crossTail,
    primaryPathLength,
    crossPathLength,
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
  ]);
}
