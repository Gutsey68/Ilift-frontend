import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useEscapeKeydown from '../../hooks/useEscapeKeydown';
import { cn } from '../../lib/cn';

type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const Modal = ({ children, onClose, size = 'lg', className }: ModalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  useEscapeKeydown(onClose);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (!modalRoot) {
      return;
    }

    modalRoot.appendChild(elRef.current!);

    return () => {
      if (modalRoot && elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const modalContent = (
    <div className="fixed inset-0 z-30 flex justify-center bg-transparent/80" onClick={onClose}>
      <div
        className={cn(
          {
            'md:w-1/2 lg:w-1/5': size === 'sm',
            'md:w-3/4 lg:w-1/4': size === 'md',
            'md:w-3/4 lg:w-1/3': size === 'lg',
            'md:w-3/4 lg:w-1/2': size === 'xl',
            'relative mb-[10vh] w-full max-sm:px-4 top-40 max-h-[80vh] overflow-y-auto': true
          },
          className
        )}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return elRef.current ? createPortal(modalContent, elRef.current) : null;
};

export default Modal;
