import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser, login, register } from '../services/authService';
import { useAuthStore } from '../stores/useAuthStore';
import { UserDetails } from '../types/userDetail';

type LoginCredentials = {
  pseudo: string;
  password: string;
};

type RegisterCredentials = {
  pseudo: string;
  email: string;
  password: string;
};

const useAuth = () => {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const setCurrentUser = useAuthStore(state => state.setCurrentUser);
  const clearUserDetails = useAuthStore(state => state.clearUserDetails);
  const setLoading = useAuthStore(state => state.setLoading);
  const navigate = useNavigate();

  const queryOptions = {
    onSuccess: (data: UserDetails) => {
      setCurrentUser(data);
      setAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setLoading(false);
    },
    onError: () => {
      clearUserDetails();
      localStorage.removeItem('isAuthenticated');
      setLoading(false);
    },
    retry: false,
    staleTime: 0
  };

  const {
    data: user,
    status,
    refetch
  } = useQuery<UserDetails, Error>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    ...queryOptions
  });

  const loginMutation = useMutation<{ token: string }, { message: string; status: number }, LoginCredentials>({
    mutationFn: login,
    onSuccess: async data => {
      localStorage.setItem('jwtToken', data.token);
      setAuthenticated(true);
      await refetch();
      navigate('/tableau-de-bord');
    },
    onError: () => {
      clearUserDetails();
      localStorage.removeItem('isAuthenticated');
      setLoading(false);
    }
  });

  const logoutMutation = useMutation<void, Error>({
    mutationFn: async () => {
      localStorage.removeItem('jwtToken');
    },
    onSuccess: () => {
      clearUserDetails();
      localStorage.removeItem('isAuthenticated');
      setLoading(false);
    },
    onError: () => {
      clearUserDetails();
      localStorage.removeItem('isAuthenticated');
      setLoading(false);
    }
  });

  const registerMutation = useMutation<void, { message: string; status: number }, RegisterCredentials>({
    mutationFn: register,
    onError: () => {
      setLoading(false);
    }
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    user,
    status
  };
};

export default useAuth;
