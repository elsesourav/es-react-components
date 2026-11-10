"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

export type StreamingStatus = "idle" | "streaming" | "done";

export interface UseStreamingTextOptions {
  text: string;
  tokensPerSecond?: number;
  onDone?: () => void;
  autoStart?: boolean;
}

export interface UseStreamingTextReturn {
  visible: string;
  status: StreamingStatus;
  progress: number; // 0 to 1
  skip: () => void;
  restart: () => void;
}

export function useStreamingText({
  text,
  tokensPerSecond = 24,
  onDone,
  autoStart = true,
}: UseStreamingTextOptions): UseStreamingTextReturn {
  const [tokenIndex, setTokenIndex] = useState(0);
  const [status, setStatus] = useState<StreamingStatus>(autoStart ? "streaming" : "idle");

  const onDoneLatest = useRef(onDone);
  onDoneLatest.current = onDone;

  // Split text into word tokens preserving punctuation and whitespace
  const tokens = useMemo(() => {
    if (!text) return [];
    // Match words with trailing spaces or punctuation
    return text.match(/(\S+\s*|\s+)/g) || [text];
  }, [text]);

  const totalTokens = tokens.length;

  useEffect(() => {
    setTokenIndex(0);
    setStatus("streaming");
  }, [text]);

  useEffect(() => {
    if (status !== "streaming" || totalTokens === 0) return;

    if (tokenIndex >= totalTokens) {
      setStatus("done");
      queueMicrotask(() => {
        onDoneLatest.current?.();
      });
      return;
    }

    const intervalMs = Math.max(10, Math.floor(1000 / tokensPerSecond));
    const timer = setTimeout(() => {
      setTokenIndex((prev) => Math.min(totalTokens, prev + 1));
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [status, tokenIndex, totalTokens, tokensPerSecond]);

  const skip = useCallback(() => {
    setTokenIndex(totalTokens);
    setStatus("done");
    onDoneLatest.current?.();
  }, [totalTokens]);

  const restart = useCallback(() => {
    setTokenIndex(0);
    setStatus("streaming");
  }, []);

  const visible = useMemo(() => {
    if (status === "done" || tokenIndex >= totalTokens) return text;
    return tokens.slice(0, tokenIndex).join("");
  }, [text, tokens, tokenIndex, status, totalTokens]);

  const progress = totalTokens > 0 ? Math.min(1, tokenIndex / totalTokens) : 1;

  return { visible, status, progress, skip, restart };
}

export interface StreamingTextProps {
  text: string;
  tokensPerSecond?: number;
  label?: string;
  onDone?: () => void;
  showCursor?: boolean;
  cursor?: React.ReactNode;
  allowSkipOnClick?: boolean;
  className?: string;
}

export function StreamingText({
  text,
  tokensPerSecond = 20,
  label,
  onDone,
  showCursor = true,
  cursor,
  allowSkipOnClick = true,
  className = "",
}: StreamingTextProps) {
  const { visible, status, skip } = useStreamingText({
    text,
    tokensPerSecond,
    onDone,
  });

  const isStreaming = status === "streaming";

  return (
    <div
      role="region"
      aria-label={label}
      aria-live="polite"
      onClick={allowSkipOnClick && isStreaming ? skip : undefined}
      className={`relative text-sm text-foreground leading-relaxed ${
        allowSkipOnClick && isStreaming ? "cursor-pointer select-none" : ""
      } ${className}`}
      title={allowSkipOnClick && isStreaming ? "Click to reveal all text" : undefined}
    >
      <span>{visible}</span>
      {showCursor && isStreaming && (
        <span
          aria-hidden="true"
          className="inline-block ml-0.5 text-primary font-mono animate-pulse"
        >
          {cursor ?? "▏"}
        </span>
      )}
    </div>
  );
}
