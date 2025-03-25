
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
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  fullScreen = false,
  initialHeight,
  expandOnScroll = false,
  showFooter = false,
  footerContent
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        if (scrollTop > 50 && !expanded) {
          setExpanded(true);
        } else if (scrollTop <= 50 && expanded) {
          setExpanded(false);
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
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
          "glass-modal w-full overflow-hidden flex flex-col animate-slide-in-up transition-all duration-300",
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
        
        <div 
          ref={contentRef}
          className="flex-1 overflow-auto"
        >
          <div className="p-5">
            {children}
          </div>
        </div>
        
        {showFooter && (
          <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t shadow-sm">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
