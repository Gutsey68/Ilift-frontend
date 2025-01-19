import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

/**
 * Route protégée pour les utilisateurs non authentifiés
 * Fonctionnalités :
 * - Redirige les utilisateurs connectés vers /accueil
 * - Affiche un spinner pendant la vérification de l'authentification
 * - Permet l'accès aux routes enfants si non authentifié
 *
 * Utilisation:
 * ```tsx
 * <NotAuthenticatedRoute>
 *   <LoginPage />
 * </NotAuthenticatedRoute>
 * ```
 *
 * @component
 * @returns {JSX.Element} Composant de redirection ou route enfant
 */
function NotAuthenticatedRoute() {
  const { user, userPending } = useContext(AuthContext);

  if (userPending) {
    return <Spinner />;
  }

  return user ? <Navigate to="/accueil" /> : <Outlet />;
}

export default NotAuthenticatedRoute;
