import { useCurrentUser } from '../hooks/useCurrentUser';
import { checkTokenExpiration } from '../services/authService';
import { AuthContext, AuthProviderProps } from './AuthContext';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: user, isPending: userPending, error: userError, setUser } = useCurrentUser();

  const token = localStorage.getItem('token');
  if (token) {
    try {
      checkTokenExpiration(token);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    }
  }

  return <AuthContext.Provider value={{ user, setUser, userPending, userError }}>{children}</AuthContext.Provider>;
};
