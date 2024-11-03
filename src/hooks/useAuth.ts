import { useMutation } from '@tanstack/react-query';

type UserData = {
  pseudo: string;
  email: string;
  password: string;
};

const useAuth = () => {
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

  return {
    registerMutation
  };
};

export default useAuth;
