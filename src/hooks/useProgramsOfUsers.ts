import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchProgramsOfUser } from '../services/programsService';

const useProgramsOfUser = () => {
  const { user } = useContext(AuthContext);

  const {
    isPending: programsPending,
    error: programsError,
    data: programs
  } = useQuery({
    queryKey: ['programs', user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchProgramsOfUser(user.id);
    },
    enabled: !!user
  });

  const programsData = programs?.data;

  return {
    programsPending,
    programsError,
    programsData
  };
};

export default useProgramsOfUser;
