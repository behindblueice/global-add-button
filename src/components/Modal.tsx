
import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
  initialHeight?: string;
  expandOnScroll?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  fullScreen = false,
  initialHeight,
  expandOnScroll = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (!expandOnScroll) return;

    const handleScroll = () => {
      if (modalRef.current) {
        const scrollTop = modalRef.current.scrollTop;
        if (scrollTop > 50 && !expanded) {
          setExpanded(true);
        } else if (scrollTop <= 50 && expanded) {
          setExpanded(false);
        }
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [expandOnScroll, expanded]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const modalStyle: React.CSSProperties = {};
  if (initialHeight && !expanded && !fullScreen) {
    modalStyle.height = initialHeight;
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        style={modalStyle}
        className={cn(
          "glass-modal w-full overflow-auto animate-slide-in-up transition-all duration-300",
          fullScreen ? "min-h-screen" : (expanded ? "min-h-screen" : ""),
          className
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b bg-white">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
