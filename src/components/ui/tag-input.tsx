"use client";

import React, { useId, useRef, useState } from "react";
import { X } from "lucide-react";

export interface TagInputProps {
  label?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  max?: number;
  separators?: string[];
  validate?: (tag: string) => boolean;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export function TagInput({
  label,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Add tag...",
  max,
  separators = [",", ";"],
  validate,
  hint,
  disabled = false,
  className = "",
}: TagInputProps) {
  const autoId = useId();
  const [uncontrolledTags, setUncontrolledTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tags = value !== undefined ? value : uncontrolledTags;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateTags = (newTags: string[]) => {
    if (value === undefined) {
      setUncontrolledTags(newTags);
    }
    onChange?.(newTags);
    setPendingDeleteIndex(null);
    setErrorMessage(null);
  };

  const addTag = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    if (max && tags.length >= max) {
      setErrorMessage(`Maximum of ${max} tags allowed.`);
      return;
    }

    if (tags.includes(trimmed)) {
      setErrorMessage(`Tag "${trimmed}" already added.`);
      return;
    }

    if (validate && !validate(trimmed)) {
      setErrorMessage(`Invalid tag format.`);
      return;
    }

    updateTags([...tags, trimmed]);
    setInputValue("");
    setErrorMessage(null);
  };

  const removeTag = (indexToRemove: number) => {
    updateTags(tags.filter((_, i) => i !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (separators.includes(e.key)) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "") {
      if (tags.length === 0) return;
      if (pendingDeleteIndex === tags.length - 1) {
        removeTag(tags.length - 1);
        setPendingDeleteIndex(null);
      } else {
        setPendingDeleteIndex(tags.length - 1);
      }
    } else {
      if (pendingDeleteIndex !== null) {
        setPendingDeleteIndex(null);
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const isAtMax = Boolean(max && tags.length >= max);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={autoId}
            className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
          >
            {label}
          </label>
          {max && (
            <span className="text-[11px] font-mono text-muted-foreground">
              {tags.length}/{max}
            </span>
          )}
        </div>
      )}

      <div
        onClick={handleContainerClick}
        className={`min-h-[42px] w-full flex flex-wrap items-center gap-1.5 rounded-[var(--radius)] border bg-surface p-1.5 transition-[border-color,box-shadow] cursor-text ${
          disabled
            ? "border-border/60 bg-surface/50 opacity-60 cursor-not-allowed"
            : errorMessage
              ? "border-destructive ring-2 ring-destructive/20"
              : "border-border hover:border-border-strong focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 shadow-xs"
        }`}
      >
        {tags.map((tag, idx) => {
          const isPendingDelete = pendingDeleteIndex === idx;
          return (
            <span
              key={`${tag}-${idx}`}
              className={`inline-flex items-center gap-1.5 rounded-[calc(var(--radius)-4px)] px-2.5 py-1 text-xs font-medium transition-colors ${
                isPendingDelete
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-surface-elevated border border-border text-foreground hover:border-primary/40"
              }`}
            >
              <span>{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(idx);
                  }}
                  className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="size-3" />
                </button>
              )}
            </span>
          );
        })}

        {!isAtMax && !disabled && (
          <input
            ref={inputRef}
            id={autoId}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[100px] bg-transparent px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground outline-none border-none focus:ring-0"
          />
        )}
      </div>

      {errorMessage ? (
        <p className="mt-1.5 text-xs text-destructive font-medium animate-in fade-in">
          {errorMessage}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
