import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login, logout, register, requestPasswordReset, resetPassword } from '../services/authService';
import { fetchCurrentUser } from '../services/usersService';

/**
 * Hook personnalisé pour gérer l'authentification
 * Fournit les mutations pour:
 * - Connexion
 * - Déconnexion
 * - Inscription
 * - Demande de réinitialisation de mot de passe
 * - Réinitialisation de mot de passe
 * @returns Object contenant toutes les mutations d'authentification
 */
const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      localStorage.setItem('isAuthenticated', 'true');
      const userData = await fetchCurrentUser();
      setUser(userData.data);
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate('/accueil');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      setUser(null);
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      navigate('/connexion');
    }
  });

  const registerMutation = useMutation({
    mutationFn: register
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: { email: string }) => requestPasswordReset(data.email)
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation
  };
};

export default useAuth;
