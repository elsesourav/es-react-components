"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Spinner } from "./spinner";
import { AlertCircle, RefreshCw } from "lucide-react";

export interface LoadMoreProps {
  onLoad: () => Promise<boolean>; // Returns true if there are more pages, false if exhausted
  rootRef?: React.RefObject<HTMLElement | null>;
  rootMargin?: string;
  threshold?: number;
  disabled?: boolean;
  onError?: (error: unknown) => void;
  loadingLabel?: string;
  exhaustedLabel?: string;
  retryLabel?: string;
  className?: string;
}

export function LoadMore({
  onLoad,
  rootRef,
  rootMargin = "400px 0px",
  threshold = 0.1,
  disabled = false,
  onError,
  loadingLabel = "Loading more items...",
  exhaustedLabel = "You've reached the end",
  retryLabel = "Failed to load. Click to retry",
  className = "",
}: LoadMoreProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const loadLatest = useRef(onLoad);
  loadLatest.current = onLoad;
  const errorLatest = useRef(onError);
  errorLatest.current = onError;

  const triggerLoad = useCallback(async () => {
    if (loading || !hasMore || disabled) return;
    setLoading(true);
    setError(null);

    try {
      const moreAvailable = await loadLatest.current();
      setHasMore(moreAvailable);
    } catch (err) {
      setError(err);
      errorLatest.current?.(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, disabled]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || disabled || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          triggerLoad();
        }
      },
      {
        root: rootRef?.current ?? null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [triggerLoad, hasMore, disabled, error, rootRef, rootMargin, threshold]);

  return (
    <div
      ref={sentinelRef}
      className={`flex items-center justify-center py-4 text-xs ${className}`}
      role="status"
      aria-live="polite"
    >
      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
          <Spinner size="sm" />
          <span>{loadingLabel}</span>
        </div>
      )}

      {!loading && Boolean(error) && (
        <button
          type="button"
          onClick={triggerLoad}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] border border-destructive/40 bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
        >
          <AlertCircle className="size-3.5" />
          <span>{retryLabel}</span>
          <RefreshCw className="size-3 ml-0.5" />
        </button>
      )}

      {!loading && !hasMore && (
        <p className="text-muted-foreground/70 font-medium">
          {exhaustedLabel}
        </p>
      )}
    </div>
  );
}
