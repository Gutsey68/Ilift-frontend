import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';

type LoginCredentials = {
  pseudo: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

type RegisterCredentials = {
  pseudo: string;
  email: string;
  password: string;
};

const useAuth = () => {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);

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
    onSuccess: () => {
      setAuthenticated(true);
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterCredentials) => {
      const response = await fetch('http://localhost:3000/api/auth/register', {
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

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      setAuthenticated(false);
    }
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation
  };
};

export default useAuth;
