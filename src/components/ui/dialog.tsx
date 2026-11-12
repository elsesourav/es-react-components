import * as React from 'react';
import { X } from 'lucide-react';
import { lockScroll } from '@/lib/scrollLock';
import { cn } from '@/lib/utils';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      const unlock = lockScroll();
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        unlock();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-fade-in"
        style={{ touchAction: 'none' }}
        onTouchMove={(e) => e.preventDefault()}
        onClick={onClose}
      />

      {/* Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full rounded-2xl bg-surface-elevated border border-border shadow-float z-10 overflow-hidden animate-zoom-in',
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 text-sm text-foreground">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 px-6 bg-surface/50 border-t border-border/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
