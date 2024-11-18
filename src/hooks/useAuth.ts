import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
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
      await checkAuth();
      setUser(data.user);
      navigate('/accueil');
      window.location.reload();
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      setUser(null);
    }
  });

  const registerMutation = useMutation({
    mutationFn: register
  });

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = await fetchCurrentUser();
        setUser(data.data);
      } catch (error) {
        if (error === 401) {
          logoutMutation.mutate();
          navigate('/login');
        }
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    checkAuth
  };
};

export default useAuth;
