import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';

type LoginCredentials = {
  pseudo: string;
  password: string;
};

type RegisterCredentials = {
  pseudo: string;
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

const useAuth = () => {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const clearUserDetails = useAuthStore(state => state.clearUserDetails);

  const loginMutation = useMutation<LoginResponse, { message: string; status: number }, LoginCredentials>({
    mutationFn: async ({ pseudo, password }) => {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw { message: errorData.error || 'Pseudo ou mot de passe incorrect', status: response.status };
      }

      return response.json();
    },
    onSuccess: async data => {
      localStorage.setItem('token', data.token);
      setAuthenticated(true);
    }
  });

  const registerMutation = useMutation<void, { message: string; status: number }, RegisterCredentials>({
    mutationFn: async ({ pseudo, email, password }) => {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw { message: errorData.error || 'Erreur lors de l’inscription', status: response.status };
      }
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    clearUserDetails();
  };

  return {
    loginMutation,
    registerMutation,
    logout
  };
};

export default useAuth;
