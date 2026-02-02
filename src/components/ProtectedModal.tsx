import React, { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ProtectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * A modal component with the following protections:
 * - Opens in exact center of viewport
 * - Fixed full-screen overlay with semi-transparent backdrop
 * - Blocks interaction with background content
 * - Text selection disabled on modal content
 * - Right-click disabled on modal content
 * - Works on mobile, tablet, and desktop
 */
export const ProtectedModal: React.FC<ProtectedModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  // Prevent right-click on modal content
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal content - centered, protected */}
      <div
        className={cn(
          'relative z-10 max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-card p-6 shadow-xl',
          'select-none', // Disable text selection
          className
        )}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>
    </div>
  );
};

export default ProtectedModal;
