
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  fullScreen = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className={cn(
          "glass-modal w-full animate-slide-in-up",
          fullScreen ? "min-h-screen" : "max-h-[90vh]",
          className
        )}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
