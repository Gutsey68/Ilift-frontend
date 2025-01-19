import { useEffect, useState } from 'react';

/**
 * Hook personnalisé pour gérer la position d'un modal flottant par rapport à un élément de référence
 * @param referenceRef - Référence vers l'élément par rapport auquel le modal doit se positionner
 * @param onClose - Fonction de callback appelée lors de la fermeture du modal
 * @returns Position calculée du modal (top et right)
 */
const useFloatingModal = (referenceRef: React.RefObject<HTMLElement>, onClose?: () => void) => {
  const [position, setPosition] = useState(() => {
    const rect = referenceRef.current?.getBoundingClientRect();
    return rect
      ? {
          top: rect.bottom + 4,
          right: window.innerWidth - rect.right - 13
        }
      : { top: 0, right: 0 };
  });

  const updatePosition = () => {
    const rect = referenceRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right - 13
      });
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return position;
};

export default useFloatingModal;
