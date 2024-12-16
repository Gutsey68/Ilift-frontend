import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login, register } from '../services/authService';
import { fetchCurrentUser } from '../services/usersService';

const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      const userData = await fetchCurrentUser();
      setUser(userData.data);
      navigate('/accueil');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      setUser(null);
      navigate('/connexion');
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
