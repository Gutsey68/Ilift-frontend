import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg';
};

const Modal = ({ children, onClose, size = 'lg' }: ModalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (!modalRoot) {
      console.error('Modal root element not found');
      return;
    }

    modalRoot.appendChild(elRef.current!);

    return () => {
      if (modalRoot && elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-transparent/80" onClick={onClose}>
      <div
        className={cn({
          'sm:w-1/5': size === 'sm',
          'sm:w-1/4': size === 'md',
          'sm:w-1/3': size === 'lg',
          'relative mb-[10vh] w-full max-sm:px-4': true
        })}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return elRef.current ? createPortal(modalContent, elRef.current) : null;
};

export default Modal;
