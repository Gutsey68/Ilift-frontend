import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser, login, logout, register } from '../services/authService';
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
    onError: error => {
      console.error('Erreur de connexion:', error);
      clearUserDetails();
      localStorage.removeItem('isAuthenticated');
      setLoading(false);
    }
  });

  const logoutMutation = useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      clearUserDetails();
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('jwtToken');
      setLoading(false);
    },
    onError: error => {
      console.error('Erreur lors de la déconnexion:', error);
      clearUserDetails();
      localStorage.removeItem('isAuthenticated');
      setLoading(false);
    }
  });

  const registerMutation = useMutation<void, { message: string; status: number }, RegisterCredentials>({
    mutationFn: register,
    onError: error => {
      console.error('Erreur lors de l’inscription:', error);
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
