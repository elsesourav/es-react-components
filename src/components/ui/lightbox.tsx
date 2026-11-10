"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

import {
  CELL,
  HOME,
  VEIL,
  EASE,
  EXIT,
  GLYPH,
  TOGGLE,
  KEY_ZOOM,
  KEY_PAN,
  WHEEL_RATE,
  SLOP,
  NEAR_HOME,
  SNAP_HOME,
  CHROME_BUTTON,
  clamp,
  type Spring,
  type Drag,
  type UseLightboxOptions,
  useLightbox,
} from "./use-lightbox";

export { useLightbox, type UseLightboxOptions };

export type LightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  originRef?: React.RefObject<HTMLElement | null>;
  caption?: string;
  width?: number;
  height?: number;
  maxScale?: number;
  className?: string;
};

type Landing = { dx: number; dy: number; s: number; o: number; r: number };

function Stage({
  onClose,
  src,
  alt,
  originRef,
  caption,
  width,
  height,
  maxScale = 4,
  className = "",
}: LightboxProps) {
  const reduced = useReducedMotion();
  const titleId = useId();
  const hintId = useId();

  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const fs = useMotionValue(1);
  const fo = useMotionValue(0);
  const fr = useMotionValue(14);

  const {
    frameRef,
    contentRef,
    bind,
    scale,
    x,
    y,
    zoomed,
    settledZoom,
    reset,
    zoomAt,
  } = useLightbox({ maxScale, onDismiss: onClose });

  const shellRef = useRef<HTMLDivElement>(null);

  const toggleZoom = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (zoomed) {
      reset();
      return;
    }
    const r = frame.getBoundingClientRect();
    zoomAt(
      Math.min(TOGGLE, Math.max(1.1, maxScale)),
      r.left + r.width / 2,
      r.top + r.height / 2,
      true,
    );
  }, [frameRef, maxScale, reset, zoomAt, zoomed]);

  const landing = useCallback((): Landing => {
    const frame = frameRef.current;
    const content = contentRef.current;
    const origin = originRef?.current;
    if (frame && content && origin && content.offsetWidth > 0) {
      const r = frame.getBoundingClientRect();
      const o = origin.getBoundingClientRect();
      if (o.width > 0) {
        const s = o.width / content.offsetWidth;
        const rad =
          Number.parseFloat(getComputedStyle(origin).borderTopLeftRadius) || 9;
        return {
          dx: o.left + o.width / 2 - (r.left + r.width / 2),
          dy: o.top + o.height / 2 - (r.top + r.height / 2),
          s,
          o: 1,
          r: rad / s,
        };
      }
    }
    return { dx: 0, dy: 10, s: 0.97, o: 0, r: 14 };
  }, [contentRef, frameRef, originRef]);

  useLayoutEffect(() => {
    if (reduced) {
      fx.set(0);
      fy.set(0);
      fs.set(1);
      fo.set(1);
      fr.set(14);
      return;
    }
    const d = landing();
    fx.set(d.dx);
    fy.set(d.dy);
    fs.set(d.s);
    fo.set(d.o);
    fr.set(d.r);

    const runs = [
      animate(fx, 0, HOME),
      animate(fy, 0, HOME),
      animate(fs, 1, HOME),
      animate(fo, 1, HOME),
      animate(fr, 14, HOME),
    ];
    return () => runs.forEach((r) => r.stop());
  }, [fo, fr, fs, fx, fy, landing, reduced]);

  const away = useCallback(() => {
    if (reduced) return { opacity: 0, transition: { duration: 0.12 } };
    const d = landing();
    animate(fr, d.r, HOME);
    return {
      x: d.dx,
      y: d.dy,
      scale: d.s,
      opacity: d.o,
      filter: "blur(4px)",
      transition: HOME,
    };
  }, [fr, landing, reduced]);

  const unwind = useCallback(
    () => ({
      x: 0,
      y: 0,
      scale: 1,
      transition: reduced ? { duration: 0 } : HOME,
    }),
    [reduced],
  );

  useEffect(() => {
    const frame = frameRef.current;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const body = document.body;
    const overflow = body.style.overflow;
    const padding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const base = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${base + gap}px`;
    frame?.focus({ preventScroll: true });
    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = padding;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [frameRef]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomed) return;
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(
        shell.querySelectorAll<HTMLElement>('[data-lightbox-focus="1"]'),
      );
      if (nodes.length === 0) return;
      e.preventDefault();
      const here =
        document.activeElement instanceof HTMLElement
          ? nodes.indexOf(document.activeElement)
          : -1;
      const next = e.shiftKey
        ? here <= 0
          ? nodes.length - 1
          : here - 1
        : here === -1 || here === nodes.length - 1
          ? 0
          : here + 1;
      nodes[next]?.focus();
    };

    shell.addEventListener("keydown", onKeyDown as any);
    return () => shell.removeEventListener("keydown", onKeyDown as any);
  }, [onClose, zoomed]);

  return (
    <div
      ref={shellRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn("fixed inset-0 z-50", className)}
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: reduced ? { duration: 0 } : { duration: 0.3, ease: EASE },
        }}
        transition={reduced ? { duration: 0 } : VEIL}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      <div
        ref={frameRef}
        data-lightbox-focus="1"
        tabIndex={-1}
        role="group"
        aria-labelledby={titleId}
        aria-describedby={hintId}
        style={{ touchAction: "none", WebkitTouchCallout: "none" }}
        className={cn(
          "absolute inset-0 overflow-hidden outline-none select-none",
          zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        )}
        {...bind}
      >
        <motion.div
          style={{ x: fx, y: fy, scale: fs, opacity: fo }}
          initial={reduced ? false : { filter: "blur(6px)" }}
          animate={{ filter: "blur(0px)" }}
          variants={{ away }}
          exit="away"
          transition={
            reduced
              ? { duration: 0 }
              : { filter: { duration: 0.35, ease: EASE } }
          }
          className="absolute inset-0 flex items-center justify-center p-4 sm:p-14"
        >
          <motion.img
            ref={contentRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            draggable={false}
            style={{ x, y, scale, borderRadius: fr }}
            variants={{ away: unwind }}
            exit="away"
            className="max-h-full max-w-full object-contain shadow-2xl rounded-[var(--radius)]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: reduced ? { duration: 0 } : EXIT }}
        transition={reduced ? { duration: 0 } : VEIL}
        className="pointer-events-none absolute inset-0 flex items-start justify-between gap-3 p-3.5 sm:p-5"
      >
        <p
          id={titleId}
          className="pointer-events-auto max-w-[65%] truncate rounded-[var(--radius)] border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
        >
          {caption ?? alt}
        </p>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            data-lightbox-focus="1"
            type="button"
            onClick={toggleZoom}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            className={CHROME_BUTTON}
          >
            <svg
              viewBox="0 0 256 256"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="116" cy="116" r="84" />
              <path d="M175.4 175.4 224 224M84 116h64" />
              <motion.path
                d="M116 84v64"
                initial={false}
                animate={{ opacity: zoomed ? 0 : 1 }}
                transition={reduced ? { duration: 0 } : GLYPH}
              />
            </svg>
          </button>

          <button
            data-lightbox-focus="1"
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={CHROME_BUTTON}
          >
            <svg
              viewBox="0 0 256 256"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={20}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M200 56 56 200M200 200 56 56" />
            </svg>
          </button>
        </div>
      </motion.div>

      <p id={hintId} className="sr-only">
        Scroll to zoom toward the pointer, or press plus and minus. Drag or use
        the arrow keys to pan, and double-click to switch between fit and
        close-up. Press zero to return to the starting frame; Escape returns
        home first, then closes.
      </p>

      <p role="status" className="sr-only">
        Zoom {settledZoom.toFixed(1)} times
      </p>
    </div>
  );
}

export function Lightbox(props: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {props.open ? <Stage key="lightbox" {...props} /> : null}
    </AnimatePresence>,
    document.body,
  );
}
