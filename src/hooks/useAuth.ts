import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser, login, register } from '../services/authService';
import { useAuthStore } from '../stores/useAuthStore';
import { UserDetails } from '../types/userDetail';

const useAuth = () => {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const navigate = useNavigate();

  const queryOptions = {
    onSuccess: () => {
      setAuthenticated(true);
    },
    onError: () => {
      navigate('/connexion');
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

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      localStorage.setItem('token', data.token);
      setAuthenticated(true);
      await refetch();
      navigate('/tableau-de-bord');
    },
    onError: () => {
      localStorage.removeItem('isAuthenticated');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
    },
    onSuccess: () => {
      localStorage.removeItem('isAuthenticated');
    },
    onError: () => {
      localStorage.removeItem('isAuthenticated');
    }
  });

  const registerMutation = useMutation({
    mutationFn: register
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
