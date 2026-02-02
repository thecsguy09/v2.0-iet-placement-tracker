import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PlacementRecord } from '@/types/placement';

interface CompanyModalProps {
  record: PlacementRecord | null;
  isOpen: boolean;
  onClose: () => void;
  highlightHiringProcess?: boolean;
}

const CompanyModal = ({ record, isOpen, onClose, highlightHiringProcess = false }: CompanyModalProps) => {
  const hiringProcessRef = useRef<HTMLDivElement>(null);

  // Prevent right-click on modal content (scoped protection)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  useEffect(() => {
    if (isOpen && highlightHiringProcess && hiringProcessRef.current) {
      setTimeout(() => {
        hiringProcessRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isOpen, highlightHiringProcess]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!record) return null;

  const formatValue = (key: string, value: string | number) => {
    if (key === 'CTC (in LPA)' && typeof value === 'number') {
      return `₹${value} LPA`;
    }
    if (key === 'Compensation in Internship' && typeof value === 'number') {
      return `₹${value.toLocaleString()}`;
    }
    return String(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop - Fixed full-screen overlay with semi-transparent background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal - Centered in viewport using flexbox */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl bg-card shadow-2xl"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={handleContextMenu}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-primary px-6 py-4">
              <div className="protected-content">
                <h2 className="text-xl font-bold text-primary-foreground">
                  {record['Company']}
                </h2>
                <p className="text-sm text-primary-foreground/70">{record['Job Role']}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content - Protected from text selection */}
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto p-6 protected-content">
              <div className="grid gap-4">
                {Object.entries(record).map(([key, value]) => (
                  <div
                    key={key}
                    ref={key === 'Hiring Process' ? hiringProcessRef : undefined}
                    className={`rounded-lg border p-4 transition-all ${
                      key === 'Hiring Process' && highlightHiringProcess
                        ? 'border-accent bg-accent/5 ring-2 ring-accent/20'
                        : 'bg-secondary/30'
                    }`}
                  >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {key}
                    </p>
                    <p className="text-foreground">{formatValue(key, value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CompanyModal;
