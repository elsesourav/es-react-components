'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { HardDrive, ClipboardPaste, Upload, X, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '../button';
import { Card } from '../card';

export interface ImageUploadSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: File) => void;
  title?: string;
  description?: string;
}

export function ImageUploadSourceModal({
  isOpen,
  onClose,
  onSelectFile,
  title = 'Upload Image',
  description = 'Choose how you want to add this image',
}: ImageUploadSourceModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const [clipboardError, setClipboardError] = React.useState<string | null>(null);
  const [isReadingClipboard, setIsReadingClipboard] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while modal is open
  React.useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Handle global paste event (Cmd+V / Ctrl+V)
  React.useEffect(() => {
    if (!isOpen) return;

    const handleWindowPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            e.stopPropagation();
            onSelectFile(file);
            onClose();
            return;
          }
        }
      }

      setClipboardError('Pasted content did not contain an image. Please copy an image first.');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('paste', handleWindowPaste);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('paste', handleWindowPaste);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onSelectFile, onClose]);

  if (!isOpen || !mounted) return null;
  const targetHost = typeof document !== 'undefined' ? document.body : null;
  if (!targetHost) return null;

  // Handler for device file picker
  const handleDeviceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setClipboardError('Please select a valid image file');
      return;
    }

    onSelectFile(file);
    onClose();
  };

  // Handler for clipboard read button
  const handlePasteFromClipboard = async () => {
    setIsReadingClipboard(true);
    setClipboardError(null);

    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
          const imageType = item.types.find((type) => type.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const ext = imageType.split('/')[1] || 'png';
            const file = new File([blob], `clipboard-${Date.now()}.${ext}`, {
              type: imageType,
            });
            onSelectFile(file);
            onClose();
            return;
          }
        }
        setClipboardError(
          'No image found in clipboard. Copy an image first, or press ⌘V / Ctrl+V to paste.'
        );
      } else {
        setClipboardError(
          'Direct clipboard reading is not supported by your browser. Please press ⌘V / Ctrl+V to paste.'
        );
      }
    } catch {
      setClipboardError(
        'Clipboard permission denied or unavailable. Please press ⌘V / Ctrl+V to paste your image directly.'
      );
    } finally {
      setIsReadingClipboard(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-source-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[99995] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-elevated text-foreground border border-border/80 dark:border-border/60 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Upload className="size-4" />
            </div>
            <div>
              <h3
                id="upload-source-modal-title"
                className="text-sm font-bold text-foreground"
              >
                {title}
              </h3>
              <p className="text-[11px] text-muted-foreground">{description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Hidden device input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleDeviceFileChange}
        />

        {clipboardError && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="size-4 shrink-0" />
            <span className="leading-tight">{clipboardError}</span>
          </div>
        )}

        {/* Source Selection Buttons */}
        <div className="grid grid-cols-1 gap-3 pt-1">
          {/* 1. Upload from Device */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex items-center gap-3.5 p-3.5 rounded-2xl border border-border bg-surface hover:bg-surface-subtle hover:border-primary/50 transition-all text-left cursor-pointer"
          >
            <div className="size-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-foreground group-hover:text-primary group-hover:scale-105 transition-all shrink-0 shadow-xs">
              <HardDrive className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                  Upload from Device
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-subtle text-muted-foreground">
                  Files
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                Browse images from computer or phone storage
              </p>
            </div>
          </button>

          {/* 2. Upload from Clipboard */}
          <button
            type="button"
            onClick={handlePasteFromClipboard}
            disabled={isReadingClipboard}
            className="group relative flex items-center gap-3.5 p-3.5 rounded-2xl border border-border bg-surface hover:bg-surface-subtle hover:border-emerald-500/50 transition-all text-left cursor-pointer"
          >
            <div className="size-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-foreground group-hover:text-emerald-500 group-hover:scale-105 transition-all shrink-0 shadow-xs">
              <ClipboardPaste className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground group-hover:text-emerald-500 transition-colors flex items-center gap-1.5">
                  <span>Upload from Clipboard</span>
                  <Sparkles className="size-3 text-emerald-500" />
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  ⌘V / Ctrl+V
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                Paste copied screenshot or image from clipboard
              </p>
            </div>
          </button>
        </div>

        {/* Quick Paste Dropzone Hint */}
        <div
          tabIndex={0}
          onClick={handlePasteFromClipboard}
          className="p-3 rounded-2xl border border-dashed border-border bg-surface-subtle/50 text-center cursor-pointer hover:border-primary transition-colors select-none focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <p className="text-[11px] font-medium text-muted-foreground">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded-md bg-surface border border-border text-[10px] font-mono text-foreground font-bold shadow-xs">⌘V</kbd> or <kbd className="px-1.5 py-0.5 rounded-md bg-surface border border-border text-[10px] font-mono text-foreground font-bold shadow-xs">Ctrl+V</kbd> anywhere in this popup to upload immediately
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end pt-2 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>,
    targetHost
  );
}

export default ImageUploadSourceModal;
