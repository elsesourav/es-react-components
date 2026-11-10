'use client';

import * as React from 'react';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import {
  SwipeToast,
  type SwipeToastCloseReason,
  type SwipeToastFuse,
  type SwipeToastPhase,
  type SwipeToastProps,
} from './swipe-toast';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

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
}

export interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const getDefaultToastIcon = (type?: ToastType, customIcon?: React.ReactNode): React.ReactNode => {
  if (customIcon) return customIcon;
  switch (type) {
    case 'success':
      return <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />;
    case 'warning':
      return <TriangleAlert className="h-4 w-4 text-amber-400 shrink-0" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />;
    case 'info':
    default:
      return <Info className="h-4 w-4 text-sky-400 shrink-0" />;
  }
};

const getDefaultToastFuseColor = (type?: ToastType, customFuseColor?: string): string => {
  if (customFuseColor) return customFuseColor;
  switch (type) {
    case 'success':
      return '#10b981';
    case 'warning':
      return '#f59e0b';
    case 'error':
      return '#f43f5e';
    case 'info':
    default:
      return 'var(--primary, #6366f1)';
  }
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = React.useCallback(
    ({
      title,
      description,
      type = 'info',
      duration = 4000,
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
    }: Omit<ToastMessage, 'id'>): void => {
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
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[999999] flex flex-col gap-2 max-w-sm w-[min(380px,calc(100vw-32px))] pointer-events-none"
        aria-live="polite"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <SwipeToast
              inline
              open
              title={toast.title}
              description={toast.description}
              icon={getDefaultToastIcon(toast.type, toast.icon)}
              actionLabel={toast.actionLabel}
              onAction={toast.onAction}
              duration={toast.duration}
              fuse={toast.fuse}
              closeButton={toast.closeButton}
              pauseOnHover={toast.pauseOnHover}
              dismissible={toast.dismissible}
              background={toast.background}
              color={toast.color}
              fuseColor={getDefaultToastFuseColor(toast.type, toast.fuseColor)}
              width={toast.width}
              radius={toast.radius}
              settleBounce={toast.settleBounce}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
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
