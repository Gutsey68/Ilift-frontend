import { useEffect } from 'react';

/**
 * Hook personnalisé pour gérer l'appui sur la touche Escape (utilisé pour fermé un modal par exemple)
 * @param onClose - Fonction de callback appelée lorsque la touche Escape est pressée
 */
const useEscapeKeydown = (onClose?: () => void) => {
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
};

export default useEscapeKeydown;
