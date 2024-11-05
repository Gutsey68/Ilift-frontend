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

type UserDetails = {
  id: string;
  pseudo: string;
  email: string;
  bio: string;
  createdAt: string;
  profilePhoto: string;
  roleId: string;
  cityId: string;
};

const useAuth = () => {
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const setUserDetails = useAuthStore(state => state.setUserDetails);
  const clearUserDetails = useAuthStore(state => state.clearUserDetails);

  const fetchUserProfile = async (token: string): Promise<UserDetails> => {
    const response = await fetch('http://localhost:3000/api/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du profil utilisateur');
    }

    return response.json();
  };

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

      try {
        const userProfile = await fetchUserProfile(data.token);
        setUserDetails(userProfile);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
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
