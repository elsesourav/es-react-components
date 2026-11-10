"use client";

import * as React from "react";

export interface LiquidGlassSheetProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  link?: string;
  linkLabel?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSaveChange?: (saved: boolean) => void;
  /** Reserved for applications that previously supplied this callback. */
  onPlay?: () => void;
  onShare?: () => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=800";
const DEFAULT_LINK = "https://liquid-glass-react-studio.vercel.app/components";

/**
 * Computes the optical surface normal map using canvas 2D pixel processing.
 * Encodes the surface normal vector into Red & Green color channels,
 * generating a high-precision rounded refraction rim and flat-face dispersion profile.
 */
function generateRefractionNormalMap(
  width: number,
  height: number,
  radius: number,
  depth: number
): string {
  if (typeof document === "undefined") return "";

  const resolution = Math.min(1, 280 / Math.max(width, height));
  const canvasWidth = Math.max(8, Math.round(width * resolution));
  const canvasHeight = Math.max(8, Math.round(height * resolution));

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const context = canvas.getContext("2d");
  if (!context) return "";

  const pixels = context.createImageData(canvasWidth, canvasHeight);
  const halfWidth = canvasWidth / 2;
  const halfHeight = canvasHeight / 2;
  const cornerRadius = Math.min(
    radius * resolution,
    halfWidth - 1,
    halfHeight - 1
  );
  const rimWidth = Math.max(
    3,
    (4 + ((depth / 100) * Math.min(canvasWidth, canvasHeight) * 0.42)) * resolution
  );

  const calculateDistance = (xCoord: number, yCoord: number) => {
    const qx = Math.abs(xCoord) - halfWidth + cornerRadius;
    const qy = Math.abs(yCoord) - halfHeight + cornerRadius;
    return (
      Math.hypot(Math.max(0, qx), Math.max(0, qy)) +
      Math.min(0, Math.max(qx, qy)) -
      cornerRadius
    );
  };

  for (let index = 0; index < canvasWidth * canvasHeight; index++) {
    const x = (index % canvasWidth) + 0.5 - halfWidth;
    const y = Math.floor(index / canvasWidth) + 0.5 - halfHeight;
    const distanceVal = calculateDistance(x, y);

    let redChannel = 128;
    let greenChannel = 128;

    if (distanceVal <= 0.5) {
      const edgeFactor = Math.pow(
        1 - Math.min(1, Math.max(0, -distanceVal) / rimWidth),
        0.72
      );
      const curvedFactor = edgeFactor * edgeFactor * (3 - 2 * edgeFactor);
      const deltaX =
        calculateDistance(x + 1, y) - calculateDistance(x - 1, y);
      const deltaY =
        calculateDistance(x, y + 1) - calculateDistance(x, y - 1);
      const normalLength = Math.hypot(deltaX, deltaY) || 1;
      const faceFactor = 0.18 * (1 - curvedFactor);

      redChannel = Math.round(
        128 + 127 * ((deltaX / normalLength) * curvedFactor + (x / halfWidth) * faceFactor)
      );
      greenChannel = Math.round(
        128 + 127 * ((deltaY / normalLength) * curvedFactor + (y / halfHeight) * faceFactor)
      );
    }

    const pixelOffset = index * 4;
    pixels.data[pixelOffset] = Math.max(0, Math.min(255, redChannel));
    pixels.data[pixelOffset + 1] = Math.max(0, Math.min(255, greenChannel));
    pixels.data[pixelOffset + 2] = 128;
    pixels.data[pixelOffset + 3] = 255;
  }

  context.putImageData(pixels, 0, 0);
  return canvas.toDataURL("image/png");
}

interface GlassMaterialFilterProps {
  filterId: string;
  width: number;
  height: number;
  radius: number;
  depth: number;
  refraction: number;
  dispersion: number;
  liquidity: number;
}

function GlassMaterialFilter({
  filterId,
  width,
  height,
  radius,
  depth,
  refraction,
  dispersion,
  liquidity,
}: GlassMaterialFilterProps) {
  const [normalMapDataUrl, setNormalMapDataUrl] = React.useState("");

  React.useEffect(() => {
    setNormalMapDataUrl(generateRefractionNormalMap(width, height, radius, depth));
  }, [width, height, radius, depth]);

  const bendFactor = (refraction / 100) * 0.36;
  const spreadFactor = ((bendFactor * dispersion) / 100) * 0.4;
  const wobbleFactor = (liquidity / 100) * 0.06;
  const displacementChannelMap = wobbleFactor > 0.002 ? "warped" : "normal";

  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      focusable="false"
    >
      <filter
        id={filterId}
        x="-0.08"
        y="-0.08"
        width="1.16"
        height="1.16"
        filterUnits="objectBoundingBox"
        primitiveUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        {normalMapDataUrl && (
          <>
            <feImage
              href={normalMapDataUrl}
              x="0"
              y="0"
              width="1"
              height="1"
              preserveAspectRatio="none"
              result="normal"
            />
            {wobbleFactor > 0.002 && (
              <>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.016"
                  numOctaves={1}
                  seed={7}
                  result="noise"
                />
                <feDisplacementMap
                  in="normal"
                  in2="noise"
                  scale={wobbleFactor}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="warped"
                />
              </>
            )}
            <feDisplacementMap
              in="SourceGraphic"
              in2={displacementChannelMap}
              scale={Math.max(0, bendFactor - spreadFactor)}
              xChannelSelector="R"
              yChannelSelector="G"
              result="red"
            />
            <feColorMatrix
              in="red"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="redOnly"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2={displacementChannelMap}
              scale={bendFactor}
              xChannelSelector="R"
              yChannelSelector="G"
              result="green"
            />
            <feColorMatrix
              in="green"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="greenOnly"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2={displacementChannelMap}
              scale={bendFactor + spreadFactor * 1.15}
              xChannelSelector="R"
              yChannelSelector="G"
              result="blue"
            />
            <feColorMatrix
              in="blue"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blueOnly"
            />
            <feComposite
              in="redOnly"
              in2="greenOnly"
              operator="arithmetic"
              k2="1"
              k3="1"
              result="redGreen"
            />
            <feComposite in="redGreen" in2="blueOnly" operator="arithmetic" k2="1" k3="1" />
          </>
        )}
      </filter>
    </svg>
  );
}

function GlassIcon({
  kind,
  className = "",
  strokeWidth = 2.25,
  draw = false,
}: {
  kind: "share" | "save" | "check" | "globe" | "copy";
  className?: string;
  strokeWidth?: number;
  draw?: boolean;
}) {
  const iconPaths = {
    share:
      "M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z",
    save:
      "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z",
    check: "M5.25 12.7033 9.40385 17.37 18.75 6.87",
    globe:
      "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
    copy:
      "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75",
  };

  return (
    <svg
      className={`mgs-icon ${className}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path
        className={draw ? "mgs-tick" : undefined}
        pathLength={kind === "check" ? 1 : undefined}
        d={iconPaths[kind]}
      />
    </svg>
  );
}

async function copyTextToClipboard(textToCopy: string): Promise<boolean> {
  if (typeof document === "undefined") return false;

  const previousActiveElement = document.activeElement as HTMLElement | null;
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  textarea.readOnly = true;
  Object.assign(textarea.style, {
    position: "fixed",
    top: "0",
    left: "0",
    opacity: "0",
    pointerEvents: "none",
  });
  document.body.append(textarea);
  textarea.select();

  let isCopied = false;
  try {
    isCopied = document.execCommand("copy");
  } catch {
    // Proceed to modern clipboard API fallback below
  }
  textarea.remove();
  previousActiveElement?.focus({ preventScroll: true });

  if (isCopied) return true;

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

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

const liquidGlassSheetStyles = `
.mova-glass-sheet{
  --panel-open-dur: 400ms;
  --panel-close-dur: 350ms;
  --panel-translate-y: 100px;
  --panel-blur: 2px;
  --panel-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --modal-open-dur: 250ms;
  --modal-close-dur: 150ms;
  --modal-scale: 0.96;
  --modal-scale-close: 0.96;
  --modal-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --scrim-dur: 150ms;
  --hl-dur: 250ms;
  --hl-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --icon-dur: 250ms;
  --press-scale: 0.97;
  --press-dur: 150ms;
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --mgs-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --mgs-ease-liquid: cubic-bezier(0.16, 1, 0.3, 1);
  --mgs-press: 160ms;
}

.mova-glass-sheet{
  position: relative;
  box-sizing: border-box;
  width: 320px;
  max-width: 100%;
  height: 360px;
  font: 400 13px/20px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  border-radius: 24px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 0 1px rgba(0,0,0,.04), 0 8px 32px -4px rgba(0,0,0,.06), 0 1px 3px 0 rgba(0,0,0,.04);
  color: #fff;
}
.mova-glass-sheet :is(button, a){font: inherit; color: inherit; text-decoration: none}
.mova-glass-sheet :where(button){border: 0; background: none; padding: 0; cursor: pointer}
.mgs-scrim{position: absolute; inset: 0; background: rgba(0, 0, 0, 0.28)}

/* Glass trigger capsule */
.mova-glass-sheet .mgs-trigger{
  position: absolute;
  left: 50%;
  bottom: 28px;
  translate: -50% 0;
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;
  width: auto;
  height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  color: #fff;
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
  background: rgb(255 255 255 / 0.10);
  -webkit-backdrop-filter: var(--mgs-trigger-filter) blur(2px) saturate(170%);
  backdrop-filter: var(--mgs-trigger-filter) blur(2px) saturate(170%);
  box-shadow:
    inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.12),
    inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.04),
    inset 0 0 0 1px rgb(255 255 255 / 0.18),
    0 0 0 0.5px rgb(255 255 255 / 0.22),
    0 8px 24px rgb(0 0 0 / 0.18);
  transition:
    transform 380ms var(--ease-spring),
    box-shadow var(--mgs-press) var(--mgs-ease-out),
    opacity var(--scrim-dur) var(--ease-smooth-out);
}
.mgs-trigger::before{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(70% 55% at 69.8% 30.2%, rgb(255 255 255 / 0.035) 0%, transparent 46%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transition: opacity 240ms var(--mgs-ease-out);
}
.mgs-trigger:hover::before{opacity: 1}
.mgs-trigger::after{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0.95) 0%, rgb(255 255 255 / 0.48) 22%, rgb(255 255 255 / 0.1) 48%, transparent 65%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transform: scale(0.65);
  transition: opacity var(--mgs-press) var(--mgs-ease-out), transform var(--mgs-press) var(--mgs-ease-out);
}
.mgs-trigger:active{transform: scale(0.94)}
.mgs-trigger:active::before{opacity: 1}
.mgs-trigger:active::after{opacity: 0.110; transform: scale(1)}
.mova-glass-sheet.is-open .mgs-trigger{opacity: 0; pointer-events: none}

@supports not (backdrop-filter: url(#mgs-filter)){
  .mova-glass-sheet .mgs-trigger{
    -webkit-backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    background: linear-gradient(145deg, rgb(255 255 255 / 0.015) 0%, rgb(255 255 255 / 0.004) 45%, rgb(255 255 255 / 0.096) 100%);
    box-shadow:
      inset 2px 2px 1px -0.5px rgb(255 255 255 / 0.066),
      inset -1.5px -1.5px 1px -0.5px rgb(255 255 255 / 0.025),
      inset 0 0 0 1.2px rgb(255 255 255 / 0.224),
      0 20px 48px rgb(0 0 0 / 0.24);
  }
  .mgs-trigger::before{opacity: 0.75}
}
@media (prefers-reduced-transparency: reduce){
  .mova-glass-sheet .mgs-trigger{-webkit-backdrop-filter: none; backdrop-filter: none; background: rgb(255 255 255 / 0.88); color: #111; text-shadow: none}
}

/* Sheet Structure */
.mgs-sheet{
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  height: 244px;
  border-radius: 28px;
  transform: translateY(var(--drag, 0px));
  transition: transform var(--panel-open-dur) var(--panel-ease);
  touch-action: none;
  pointer-events: none;
}
.mova-glass-sheet.is-open .mgs-sheet{pointer-events: auto}
.mgs-panel{position: absolute; inset: 0}
.mgs-sheet.is-dragging{transition: none !important}

/* Real Liquid Glass Material Layer */
.mgs-glass{
  position: absolute;
  inset: 0;
  isolation: isolate;
  overflow: hidden;
  border-radius: 28px;
  corner-shape: squircle;
  pointer-events: none;
  background: rgb(255 255 255 / 0.080);
  -webkit-backdrop-filter: var(--mgs-pane-filter) blur(3px) saturate(160%);
  backdrop-filter: var(--mgs-pane-filter) blur(3px) saturate(160%);
  box-shadow:
    inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.055),
    inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.018),
    inset 0 0 0 1.2px rgb(255 255 255 / 0.140),
    0 0 0 0.5px rgb(255 255 255 / 0.22),
    0 18px 40px rgb(0 0 0 / 0.2);
  transform: translateY(var(--panel-translate-y));
  opacity: 0;
  transition:
    transform var(--panel-close-dur) var(--panel-ease),
    opacity var(--panel-close-dur) var(--panel-ease),
    box-shadow var(--mgs-press) var(--mgs-ease-out);
}
.mgs-glass[data-open="true"]{
  transform: none;
  opacity: 1;
  transition:
    transform var(--panel-open-dur) var(--panel-ease),
    opacity var(--panel-open-dur) var(--panel-ease),
    box-shadow var(--mgs-press) var(--mgs-ease-out);
}
.mgs-glass::before{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(70% 55% at 69.8% 30.2%, rgb(255 255 255 / 0.035) 0%, transparent 46%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transition: opacity 240ms var(--mgs-ease-out);
}
.mgs-sheet:hover .mgs-glass::before{opacity: 1}
.mgs-glass::after{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0.95) 0%, rgb(255 255 255 / 0.48) 22%, rgb(255 255 255 / 0.1) 48%, transparent 65%);
  mix-blend-mode: plus-lighter;
  opacity: 0;
  transform: scale(0.65);
  transition: opacity var(--mgs-press) var(--mgs-ease-out), transform var(--mgs-press) var(--mgs-ease-out);
}
.mgs-sheet:active .mgs-glass::before{opacity: 1}
.mgs-sheet:active .mgs-glass::after{opacity: 0.110; transform: scale(1)}

@supports not (backdrop-filter: url(#mgs-filter)){
  .mgs-glass{
    -webkit-backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    backdrop-filter: blur(25px) saturate(160%) brightness(1.06);
    background: linear-gradient(145deg, rgb(255 255 255 / 0.015) 0%, rgb(255 255 255 / 0.004) 45%, rgb(255 255 255 / 0.096) 100%);
    box-shadow:
      inset 2px 2px 1px -0.5px rgb(255 255 255 / 0.066),
      inset -1.5px -1.5px 1px -0.5px rgb(255 255 255 / 0.025),
      inset 0 0 0 1.2px rgb(255 255 255 / 0.224),
      0 20px 48px rgb(0 0 0 / 0.24);
  }
  .mgs-glass::before{opacity: 0.75}
}
@media (prefers-reduced-transparency: reduce){
  .mgs-glass{-webkit-backdrop-filter: none; backdrop-filter: none; background: rgb(255 255 255 / 0.88)}
}

/* Grab handle & Header */
.mgs-body{position: relative; padding: 0 8px 8px}
.mgs-grab{display: flex; justify-content: center; width: 100%; height: 24px; align-items: center; cursor: grab; touch-action: none}
.mgs-grab:is(:active, .is-pressed){cursor: grabbing}
.mgs-grab span{width: 36px; height: 5px; border-radius: 5px; background: rgba(255, 255, 255, 0.7)}
.mgs-head{padding: 0 12px 8px}
.mgs-title{margin: 0; font-size: 16px; line-height: 22px; font-weight: 500}
.mgs-meta{margin: 0; font-size: 12px; line-height: 16px; color: rgba(255, 255, 255, 0.85)}

/* List & Action Rows */
.mgs-list{position: relative; display: flex; flex-direction: column; margin-top: 4px}
.mgs-hl{position: absolute; left: 0; right: 0; top: 0; height: 44px; border-radius: 16px; background: rgba(255, 255, 255, 0.2); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18); opacity: 0; transition: transform var(--hl-dur) var(--hl-ease), opacity var(--hl-dur) var(--hl-ease); pointer-events: none}
.mgs-row{box-sizing: border-box; position: relative; display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 12px 0 10px; border-radius: 16px; font-size: 13px; line-height: 20px; text-align: left; width: 100%; outline: none}
.mgs-row .mgs-label{flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis}
.mgs-row:focus-visible{box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9)}
.mgs-row .mgs-icon{flex: none}
.mgs-slot{position: relative; width: 16px; height: 16px; flex: none}
.mgs-slot .mgs-icon{position: absolute; inset: 0; transition: opacity var(--icon-dur) ease-in-out, transform var(--icon-dur) ease-in-out, filter var(--icon-dur) ease-in-out}
.mgs-slot .mgs-icon-b{opacity: 0; transform: scale(0.25); filter: blur(2px)}
.mgs-saved .mgs-slot .mgs-icon-a{opacity: 0; transform: scale(0.25); filter: blur(2px)}
.mgs-saved .mgs-slot .mgs-icon-b{opacity: 1; transform: scale(1); filter: blur(0)}

/* Link row */
.mgs-linkrow{position: relative; display: flex; align-items: center; height: 44px; border-radius: 16px}
.mgs-linkrow .mgs-row{flex: 1; min-width: 0; width: auto; padding-right: 6px}

.mgs-linkmain{cursor: pointer; transition: transform 380ms var(--ease-spring)}
.mgs-linkmain:active{transform: scale(var(--press-scale))}
.mgs-linkrow.is-copied .mgs-linkmain{animation: mgs-row-flash 700ms var(--mgs-ease-out)}
.mgs-linkrow.is-failed .mgs-linkmain{animation: mgs-copy-shake 420ms var(--mgs-ease-out)}

.mgs-linkrow.is-copied .mgs-linkmain .mgs-slot .mgs-icon-a{opacity: 0; transform: scale(0.25) rotate(-25deg); filter: blur(2px)}
.mgs-linkrow.is-copied .mgs-linkmain .mgs-slot .mgs-icon-b{opacity: 1; transform: scale(1); filter: blur(0)}
.mgs-tick{stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 380ms var(--mgs-ease-out)}
.mgs-linkrow.is-copied .mgs-linkmain .mgs-tick{stroke-dashoffset: 0; transition-delay: 140ms}

.mgs-linkrow .mgs-copy{
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  margin-right: 6px;
  border-radius: 11px;
  corner-shape: squircle;
  outline: none;
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
}
@media (hover: hover) and (pointer: fine){
  .mgs-linkrow .mgs-copy:hover{background: rgba(255, 255, 255, 0.18); color: #fff}
}
.mgs-linkrow .mgs-copy:focus-visible{box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9)}

.mgs-label-anim{animation: mgs-label-in 320ms var(--mgs-ease-out)}

@keyframes mgs-copy-shake{
  0%, 100%{transform: translateX(0)}
  20%{transform: translateX(-4px)}
  40%{transform: translateX(4px)}
  60%{transform: translateX(-3px)}
  80%{transform: translateX(2px)}
}
@keyframes mgs-label-in{
  from{opacity: 0; transform: translateY(6px); filter: blur(3px)}
  to{opacity: 1; transform: none; filter: blur(0)}
}
@keyframes mgs-row-flash{
  0%{background: rgba(255, 255, 255, 0.26)}
  100%{background: rgba(255, 255, 255, 0)}
}

/* Motion Transitions */
.mgs-t-panel-slide{
  transform: translateY(var(--panel-translate-y));
  opacity: 0;
  filter: blur(var(--panel-blur));
  pointer-events: none;
  transition:
    transform var(--panel-close-dur) var(--panel-ease),
    opacity var(--panel-close-dur) var(--panel-ease),
    filter var(--panel-close-dur) var(--panel-ease);
}
.mgs-t-panel-slide[data-open="true"]{
  transform: translateY(0);
  opacity: 1;
  filter: none;
  pointer-events: auto;
  transition:
    transform var(--panel-open-dur) var(--panel-ease),
    opacity var(--panel-open-dur) var(--panel-ease),
    filter var(--panel-open-dur) var(--panel-ease);
}
.mgs-t-modal{
  transform-origin: center;
  transform: scale(var(--modal-scale));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-open-dur) var(--modal-ease),
    opacity var(--modal-open-dur) var(--modal-ease);
}
.mgs-t-modal.is-open{transform: scale(1); opacity: 1; pointer-events: auto}
.mgs-t-modal.is-closing{
  transform: scale(var(--modal-scale-close));
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--modal-close-dur) var(--modal-ease),
    opacity var(--modal-close-dur) var(--modal-ease);
}
@media (prefers-reduced-motion: reduce){
  .mgs-sheet, .mgs-t-panel-slide, .mgs-t-modal, .mgs-hl, .mgs-scrim, .mgs-trigger,
  .mgs-trigger::before, .mgs-trigger::after, .mgs-slot .mgs-icon, .mgs-glass,
  .mgs-glass::before, .mgs-glass::after, .mgs-linkmain, .mgs-tick{transition: none !important}
  .mgs-label-anim, .mgs-linkrow.is-copied .mgs-linkmain, .mgs-linkrow.is-failed .mgs-linkmain{animation: none !important}
}

.mova-glass-sheet :where(button, [role="button"]){
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
}
.mova-glass-sheet *{box-sizing: border-box}
.mgs-trigger:focus-visible, .mgs-grab:focus-visible{outline: 2px solid #fff; outline-offset: -3px}
.mgs-status{
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
`;
