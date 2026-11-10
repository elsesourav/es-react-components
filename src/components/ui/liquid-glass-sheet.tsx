"use client";

import * as React from "react";
import {
  type LiquidGlassSheetProps,
  DEFAULT_BACKGROUND_IMAGE,
  DEFAULT_LINK,
  GlassMaterialFilter,
  GlassIcon,
  copyTextToClipboard,
} from "./liquid-glass-filter";
import { liquidGlassSheetStyles } from "./liquid-glass-styles";

export type { LiquidGlassSheetProps };
export { DEFAULT_BACKGROUND_IMAGE, DEFAULT_LINK, GlassMaterialFilter, GlassIcon, copyTextToClipboard, liquidGlassSheetStyles };

export function LiquidGlassSheet({
  title = "Autumn forest",
  subtitle = "Liquid glass sheet",
  backgroundImage = DEFAULT_BACKGROUND_IMAGE,
  link = DEFAULT_LINK,
  linkLabel = "liquid-glass-react-studio",
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  onSaveChange,
  onShare,
  theme = "light",
  className = "",
  style,
}: LiquidGlassSheetProps = {}) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const [isMounted, setIsMounted] = React.useState(isOpen);
  const [isSaved, setIsSaved] = React.useState(false);
  const [copyStatus, setCopyStatus] = React.useState<"idle" | "copied" | "failed">("idle");
  const [hasUserInteracted, setHasUserInteracted] = React.useState(false);
  const [hoverHighlightIndex, setHoverHighlightIndex] = React.useState<number | null>(null);
  const [dragYOffset, setDragYOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isClosingAnimation, setIsClosingAnimation] = React.useState(false);

  const triggerButtonRef = React.useRef<HTMLButtonElement>(null);
  const actionListRef = React.useRef<HTMLDivElement>(null);
  const dragPointerStartYRef = React.useRef<number | null>(null);
  const currentDragDistanceRef = React.useRef(0);

  const copyStatusTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const sheetCloseTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const animationFrameIdsRef = React.useRef<number[]>([]);
  const copyAttemptCounterRef = React.useRef(0);

  const reactId = React.useId().replace(/:/g, "");
  const sheetInstanceId = `mgs-${reactId}`;
  const hasInitiallyOpenedRef = React.useRef(false);

  // Sync controlled open prop if supplied
  React.useEffect(() => {
    if (isControlled && controlledOpen !== internalOpen) {
      handleOpenTransition(controlledOpen);
    }
  }, [controlledOpen, isControlled]);

  React.useEffect(() => {
    if (isOpen && hasInitiallyOpenedRef.current) {
      actionListRef.current
        ?.querySelector<HTMLButtonElement>("button")
        ?.focus({ preventScroll: true });
    }
    hasInitiallyOpenedRef.current = true;
  }, [isOpen]);

  React.useEffect(() => {
    return () => {
      clearTimeout(copyStatusTimerRef.current);
      clearTimeout(sheetCloseTimerRef.current);
      animationFrameIdsRef.current.forEach(cancelAnimationFrame);
      copyAttemptCounterRef.current++;
    };
  }, []);

  function handleOpenTransition(nextOpenState: boolean) {
    clearTimeout(sheetCloseTimerRef.current);
    if (nextOpenState) {
      setIsMounted(true);
      setIsClosingAnimation(false);
    } else {
      setIsClosingAnimation(true);
      setHoverHighlightIndex(null);
      sheetCloseTimerRef.current = setTimeout(() => {
        setIsMounted(false);
        setIsClosingAnimation(false);
      }, 350);
    }

    if (!isControlled) {
      setInternalOpen(nextOpenState);
    }
    setDragYOffset(0);
    currentDragDistanceRef.current = 0;
    dragPointerStartYRef.current = null;
    setIsDragging(false);

    onOpenChange?.(nextOpenState);

    if (!nextOpenState) {
      requestAnimationFrame(() =>
        triggerButtonRef.current?.focus({ preventScroll: true })
      );
    }
  }

  async function handleCopyLink() {
    const currentAttemptId = ++copyAttemptCounterRef.current;
    clearTimeout(copyStatusTimerRef.current);
    animationFrameIdsRef.current.forEach(cancelAnimationFrame);

    const wasCopiedSuccessfully = await copyTextToClipboard(link);
    if (currentAttemptId !== copyAttemptCounterRef.current) return;

    setHasUserInteracted(true);
    setCopyStatus("idle");

    animationFrameIdsRef.current = [
      requestAnimationFrame(() => {
        animationFrameIdsRef.current.push(
          requestAnimationFrame(() => {
            if (currentAttemptId !== copyAttemptCounterRef.current) return;
            setCopyStatus(wasCopiedSuccessfully ? "copied" : "failed");
            copyStatusTimerRef.current = setTimeout(
              () => setCopyStatus("idle"),
              wasCopiedSuccessfully ? 1800 : 1400
            );
          })
        );
      }),
    ];
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      handleOpenTransition(false);
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    const actionButtons = Array.from(
      actionListRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []
    );
    const activeIndex = actionButtons.indexOf(
      document.activeElement as HTMLButtonElement
    );
    event.preventDefault();
    const nextIndex =
      (activeIndex + (event.key === "ArrowDown" ? 1 : -1) + actionButtons.length) %
      actionButtons.length;
    actionButtons[nextIndex]?.focus();
  }

  function handleDragEnd(isCancelled = false) {
    if (dragPointerStartYRef.current === null) return;
    dragPointerStartYRef.current = null;
    setIsDragging(false);

    if (!isCancelled && currentDragDistanceRef.current > 90) {
      handleOpenTransition(false);
    }
    currentDragDistanceRef.current = 0;
    setDragYOffset(0);
  }

  const isCopied = copyStatus === "copied";
  const isFailed = copyStatus === "failed";

  const filterStyle = {
    "--mgs-pane-filter": `url(#${sheetInstanceId}-pane)`,
    "--mgs-trigger-filter": `url(#${sheetInstanceId}-trigger)`,
  } as React.CSSProperties;

  return (
    <section
      className={`mova-glass-sheet${isOpen ? " is-open" : ""} ${className}`}
      data-theme={theme}
      onKeyDown={handleKeyDown}
      style={{
        ...filterStyle,
        backgroundImage: `url(${JSON.stringify(backgroundImage)})`,
        ...style,
      }}
      aria-label={title}
    >
      <style>{liquidGlassSheetStyles}</style>

      {/* Optical SVG displacement filter materials */}
      <GlassMaterialFilter
        filterId={`${sheetInstanceId}-pane`}
        width={304}
        height={244}
        radius={28}
        depth={30}
        refraction={78}
        dispersion={42}
        liquidity={6}
      />
      <GlassMaterialFilter
        filterId={`${sheetInstanceId}-trigger`}
        width={132}
        height={44}
        radius={22}
        depth={26}
        refraction={60}
        dispersion={30}
        liquidity={4}
      />

      {/* Background scrim */}
      <div
        className={`mgs-scrim mgs-t-modal${isOpen ? " is-open" : ""}${
          isClosingAnimation ? " is-closing" : ""
        }`}
        onClick={() => handleOpenTransition(false)}
        aria-hidden="true"
      />

      {/* Glass trigger pill */}
      <button
        type="button"
        className="mgs-trigger"
        ref={triggerButtonRef}
        aria-label="Open sheet"
        aria-expanded={isOpen}
        aria-controls={`${sheetInstanceId}-sheet`}
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
        onClick={() => handleOpenTransition(true)}
      >
        <span>Open sheet</span>
      </button>

      {/* Sheet Container */}
      <div
        className={`mgs-sheet${isDragging ? " is-dragging" : ""}`}
        role="dialog"
        aria-labelledby={`${sheetInstanceId}-title`}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        id={`${sheetInstanceId}-sheet`}
        style={{ "--drag": `${dragYOffset}px` } as React.CSSProperties}
      >
        {/* Real Liquid Glass Material Layer */}
        <div className="mgs-glass" data-open={isOpen} />

        {/* Sliding Panel Content */}
        <div className="mgs-t-panel-slide mgs-panel" data-open={isOpen}>
          {isMounted && (
            <div className="mgs-body">
              {/* Grab handle for touch dismissal */}
              <button
                type="button"
                className="mgs-grab"
                aria-label="Drag down to close"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  dragPointerStartYRef.current = event.clientY;
                  setIsDragging(true);
                }}
                onPointerMove={(event) => {
                  if (dragPointerStartYRef.current === null) return;
                  const deltaY = event.clientY - dragPointerStartYRef.current;
                  currentDragDistanceRef.current =
                    deltaY >= 0 ? deltaY : -Math.pow(-deltaY, 0.6) * 2;
                  setDragYOffset(currentDragDistanceRef.current);
                }}
                onPointerUp={() => handleDragEnd()}
                onPointerCancel={() => handleDragEnd(true)}
                onClick={(event) => {
                  if (event.detail === 0) handleOpenTransition(false);
                }}
              >
                <span />
              </button>

              {/* Sheet Header */}
              <header className="mgs-head">
                <h2 id={`${sheetInstanceId}-title`} className="mgs-title">
                  {title}
                </h2>
                <p className="mgs-meta">{subtitle}</p>
              </header>

              {/* Action Rows */}
              <div
                className="mgs-list"
                ref={actionListRef}
                onMouseLeave={() => setHoverHighlightIndex(null)}
              >
                {/* Floating highlight backdrop pill */}
                <span
                  className="mgs-hl"
                  style={{
                    transform: `translateY(${(hoverHighlightIndex ?? 0) * 44}px)`,
                    opacity: hoverHighlightIndex === null ? 0 : 1,
                  }}
                />

                {/* Share action */}
                <button
                  type="button"
                  className="mgs-row"
                  onMouseEnter={() => setHoverHighlightIndex(0)}
                  onFocus={() => setHoverHighlightIndex(0)}
                  onBlur={() => setHoverHighlightIndex(null)}
                  onClick={() => {
                    onShare?.();
                    handleOpenTransition(false);
                  }}
                >
                  <GlassIcon kind="share" />
                  <span className="mgs-label">Share</span>
                </button>

                {/* Save action with animated checkmark */}
                <button
                  type="button"
                  className={`mgs-row${isSaved ? " mgs-saved" : ""}`}
                  aria-pressed={isSaved}
                  onMouseEnter={() => setHoverHighlightIndex(1)}
                  onFocus={() => setHoverHighlightIndex(1)}
                  onBlur={() => setHoverHighlightIndex(null)}
                  onClick={() => {
                    const nextSaved = !isSaved;
                    setIsSaved(nextSaved);
                    onSaveChange?.(nextSaved);
                  }}
                >
                  <span className="mgs-slot">
                    <GlassIcon kind="save" className="mgs-icon-a" />
                    <GlassIcon kind="check" className="mgs-icon-b" strokeWidth={3} />
                  </span>
                  <span className="mgs-label">{isSaved ? "Saved" : "Save"}</span>
                </button>

                {/* Link copy row */}
                <div
                  className={`mgs-linkrow${isCopied ? " is-copied" : ""}${
                    isFailed ? " is-failed" : ""
                  }`}
                  onMouseEnter={() => setHoverHighlightIndex(2)}
                  onFocus={() => setHoverHighlightIndex(2)}
                  onBlur={() => setHoverHighlightIndex(null)}
                >
                  <button
                    type="button"
                    className="mgs-row mgs-linkmain"
                    aria-label={
                      isCopied
                        ? "Link copied"
                        : isFailed
                        ? "Copy blocked"
                        : "Copy link"
                    }
                    onClick={() => void handleCopyLink()}
                  >
                    <span className="mgs-slot">
                      <GlassIcon kind="globe" className="mgs-icon-a" />
                      <GlassIcon
                        kind="check"
                        className="mgs-icon-b"
                        strokeWidth={3}
                        draw
                      />
                    </span>
                    <span
                      key={copyStatus}
                      className={`mgs-label${
                        hasUserInteracted ? " mgs-label-anim" : ""
                      }`}
                    >
                      {isCopied
                        ? "Link copied"
                        : isFailed
                        ? "Copy blocked"
                        : linkLabel}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="mgs-copy"
                    aria-label="Copy link"
                    onClick={() => void handleCopyLink()}
                  >
                    <GlassIcon kind="copy" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screen-reader polite announcer */}
      <span className="mgs-status" role="status" aria-live="polite">
        {isCopied ? "Link copied" : isFailed ? "Copy blocked" : ""}
      </span>
    </section>
  );
}

