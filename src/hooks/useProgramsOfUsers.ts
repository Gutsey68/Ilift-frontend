import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchProgramsOfUser } from '../services/programsService';

/**
 * Hook personnalisé pour récupérer les programmes d'un utilisateur
 * Ne charge les données que si l'utilisateur est connecté
 * @returns Object contenant les programmes, l'état de chargement et les erreurs
 */
const useProgramsOfUser = () => {
  const { user } = useContext(AuthContext);

  const {
    data: programsData,
    isPending: programsPending,
    error: programsError
  } = useQuery({
    queryKey: ['programs', user?.id],
    queryFn: () => fetchProgramsOfUser(),
    enabled: !!user?.id
  });

  return {
    programsData: programsData?.data,
    programsPending,
    programsError
  };
};

export default useProgramsOfUser;
