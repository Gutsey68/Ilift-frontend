import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import { useAuthStore } from '../stores/useAuthStore';

const useAuth = () => {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      localStorage.setItem('token', data.token);
      setAuthenticated(true);
      navigate('/tableau-de-bord');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      setAuthenticated(false);
    }
  });

  const registerMutation = useMutation({
    mutationFn: register
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation
  };
};

export default useAuth;
