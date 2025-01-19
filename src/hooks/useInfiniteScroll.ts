import { useEffect } from 'react';

/**
 * Hook personnalisé pour gérer le défilement infini
 * Détecte quand l'utilisateur atteint le bas de la page et déclenche le chargement
 * @param fetchNextPage - Fonction pour charger la page suivante
 * @param hasNextPage - Indique s'il y a une page suivante à charger
 * @param isFetchingNextPage - Indique si une page est en cours de chargement
 */
const useInfiniteScroll = (fetchNextPage: () => void, hasNextPage: boolean, isFetchingNextPage: boolean) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
};

export default useInfiniteScroll;
