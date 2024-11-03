import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';

type UserData = {
  pseudo: string;
  email: string;
  password: string;
};

const useAuth = () => {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);

  const registerMutation = useMutation({
    mutationFn: async (userData: UserData) => {
      const response = await fetch('http://localhost:3000/api/auth/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw { message: errorData.error || 'Erreur lors de l’inscription', status: response.status };
      }

      return response.json();
    }
  });

  const loginMutation = useMutation({
    mutationFn: async ({ pseudo, password }: { pseudo: string; password: string }) => {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ pseudo, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw { message: errorData.error || 'Pseudo ou mot de passe incorrect', status: response.status };
      }

      return response.json();
    },
    onSuccess: () => {
      setAuthenticated(true);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }

      return response.json();
    },
    onSuccess: () => {
      setAuthenticated(false);
    }
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation
  };
};

export default useAuth;
