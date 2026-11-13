'use client';

import * as React from 'react';
import { Layers, X, ChevronUp, ChevronDown } from 'lucide-react';
import {
  SwipeToast,
  type SwipeToastCloseReason,
  type SwipeToastFuse,
  type SwipeToastPhase,
  type SwipeToastProps,
  type SwipeToastType,
} from './swipe-toast';
import { cn } from '@/lib/utils';

export type ToastType = SwipeToastType;

export type ToastPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center';

export interface ToastMessage {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  duration?: number;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  icon?: React.ReactNode;
  fuse?: SwipeToastFuse;
  closeButton?: boolean;
  pauseOnHover?: boolean;
  dismissible?: boolean;
  background?: string;
  color?: string;
  fuseColor?: string;
  width?: number;
  radius?: number;
  settleBounce?: number;
  swipeDistance?: number;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  position: ToastPosition;
  setPosition: (pos: ToastPosition) => void;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const positionClasses: Record<ToastPosition, string> = {
  'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
  'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6',
  'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
  'top-left': 'top-4 left-4 sm:top-6 sm:left-6',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 sm:top-6',
};

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
  maxVisible?: number;
  gap?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'bottom-right',
  maxVisible = 3,
  gap = 10,
}) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);
  const [position, setPosition] = React.useState<ToastPosition>(defaultPosition);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [heights, setHeights] = React.useState<Record<string, number>>({});

  const isBottom = position.startsWith('bottom');
  const effectiveExpanded = isExpanded || isHovered;

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    setHeights((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearToasts = React.useCallback(() => {
    setToasts([]);
    setHeights({});
    setIsExpanded(false);
  }, []);

  const addToast = React.useCallback(
    ({
      title,
      description,
      type = 'info',
      duration = 4500,
      actionLabel,
      onAction,
      icon,
      fuse = 'bottom',
      closeButton = true,
      pauseOnHover = true,
      dismissible = true,
      background,
      color,
      fuseColor,
      width,
      radius,
      settleBounce,
      swipeDistance,
    }: Omit<ToastMessage, 'id'>): string => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = {
        id,
        title,
        description,
        type,
        duration,
        actionLabel,
        onAction,
        icon,
        fuse,
        closeButton,
        pauseOnHover,
        dismissible,
        background,
        color,
        fuseColor,
        width,
        radius,
        settleBounce,
        swipeDistance,
      };

      // Place newest toast at index 0 (front of stack)
      setToasts((prev) => [newToast, ...prev]);
      return id;
    },
    []
  );

  const handleHeightChange = React.useCallback((id: string, h: number) => {
    setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }));
  }, []);

  // Compute container height for smooth layout bounding
  const frontHeight = (toasts[0] && heights[toasts[0].id]) || 68;
  const collapsedHeight = frontHeight + Math.min(Math.max(toasts.length - 1, 0), 2) * 12;

  let totalExpandedHeight = 0;
  toasts.slice(0, 6).forEach((t, i) => {
    const h = heights[t.id] || 68;
    totalExpandedHeight += h + (i > 0 ? gap : 0);
  });
  if (toasts.length > 1) {
    totalExpandedHeight += 36; // Extra space for stack control pill
  }

  const containerHeight = effectiveExpanded ? totalExpandedHeight : collapsedHeight;

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        clearToasts,
        position,
        setPosition,
        isExpanded,
        setIsExpanded,
      }}
    >
      {children}

      {toasts.length > 0 && (
        <div
          className={cn(
            "fixed z-[9999999] pointer-events-none transition-all duration-300 ease-out select-none",
            "w-[min(380px,calc(100vw-24px))] max-sm:inset-x-3 max-sm:w-[calc(100vw-24px)] max-sm:translate-x-0",
            positionClasses[position],
            isBottom
              ? "max-sm:bottom-[calc(12px+env(safe-area-inset-bottom,0px))]"
              : "max-sm:top-[calc(12px+env(safe-area-inset-top,0px))]"
          )}
          role="region"
          aria-live="polite"
          aria-label="Notifications"
        >
          {/* Stack Control Pill when multiple toasts are active */}
          {toasts.length > 1 && (
            <div
              className={cn(
                "pointer-events-auto flex items-center justify-between px-3 py-1 mb-2 rounded-full",
                "bg-surface-elevated/95 dark:bg-zinc-900/95 backdrop-blur-md border border-border/80 dark:border-border/60",
                "text-xs font-medium text-muted-foreground shadow-sm transition-all duration-200",
                isBottom ? "order-first" : "order-last mt-2 mb-0"
              )}
            >
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                title={effectiveExpanded ? "Collapse notification stack" : "Expand all notifications"}
              >
                <Layers className="size-3.5 text-primary" />
                <span>
                  <strong className="text-foreground font-semibold">{toasts.length}</strong> notifications
                </span>
                {effectiveExpanded ? (
                  <ChevronDown className="size-3 ml-0.5" />
                ) : (
                  <ChevronUp className="size-3 ml-0.5" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="hover:text-foreground text-[11px] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  {effectiveExpanded ? 'Collapse' : 'Expand'}
                </button>
                <span className="text-border">|</span>
                <button
                  type="button"
                  onClick={clearToasts}
                  className="hover:text-destructive text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X className="size-3" />
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* Interactive Stack Deck Container */}
          <div
            className="relative w-full pointer-events-auto"
            style={{
              height: containerHeight,
              transition: 'height 320ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
          >
            {toasts.map((toast, index) => {
              const isVisible = index < (effectiveExpanded ? 6 : maxVisible);
              const isFront = index === 0;

              // Compute vertical offset and depth scale
              let offsetY = 0;
              let scale = 1;
              let opacity = 1;
              const zIndex = 100 - index;

              if (effectiveExpanded) {
                // Expanded list: stack upwards for bottom, downwards for top
                let acc = 0;
                for (let i = 0; i < index; i++) {
                  const prevH = heights[toasts[i]?.id] || 68;
                  acc += prevH + gap;
                }
                offsetY = isBottom ? -acc : acc;
                scale = 1;
                opacity = isVisible ? 1 : 0;
              } else {
                // Collapsed card deck: subtle peek depth
                if (index === 0) {
                  offsetY = 0;
                  scale = 1;
                  opacity = 1;
                } else if (index === 1) {
                  offsetY = isBottom ? -12 : 12;
                  scale = 0.95;
                  opacity = 0.92;
                } else if (index === 2) {
                  offsetY = isBottom ? -24 : 24;
                  scale = 0.90;
                  opacity = 0.75;
                } else {
                  offsetY = isBottom ? -32 : 32;
                  scale = 0.85;
                  opacity = 0;
                }
              }

              return (
                <div
                  key={toast.id}
                  className="w-full absolute"
                  style={{
                    [isBottom ? 'bottom' : 'top']: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${offsetY}px) scale(${scale})`,
                    transformOrigin: isBottom ? 'bottom center' : 'top center',
                    opacity,
                    zIndex,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    transition:
                      'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease, scale 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <SwipeToast
                    inline
                    open
                    title={toast.title}
                    description={toast.description}
                    type={toast.type}
                    icon={toast.icon}
                    actionLabel={toast.actionLabel}
                    onAction={toast.onAction}
                    duration={toast.duration}
                    fuse={toast.fuse}
                    closeButton={toast.closeButton}
                    pauseOnHover={toast.pauseOnHover}
                    dismissible={toast.dismissible}
                    background={toast.background}
                    color={toast.color}
                    fuseColor={toast.fuseColor}
                    width={toast.width}
                    radius={toast.radius}
                    settleBounce={toast.settleBounce}
                    swipeDistance={toast.swipeDistance}
                    isPaused={effectiveExpanded}
                    onHeightChange={(h) => handleHeightChange(toast.id, h)}
                    onClose={() => removeToast(toast.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Aliases and re-exports for unified usage
export {
  SwipeToast,
  SwipeToast as Toast,
  type SwipeToastProps,
  type SwipeToastProps as ToastProps,
  type SwipeToastCloseReason,
  type SwipeToastFuse,
  type SwipeToastPhase,
};

export default SwipeToast;
