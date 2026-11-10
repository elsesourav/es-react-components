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

export const DEFAULT_BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=800";
export const DEFAULT_LINK = "https://liquid-glass-react-studio.vercel.app/components";

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

export function GlassMaterialFilter({
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

export function GlassIcon({
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

export async function copyTextToClipboard(textToCopy: string): Promise<boolean> {
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

