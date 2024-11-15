import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/userService';

const useUser = () => {
  const {
    isPending: userPending,
    error: userError,
    data: user
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchCurrentUser()
  });

  const userData = user?.data;

  return {
    userPending,
    userError,
    userData
  };
};

export default useUser;
