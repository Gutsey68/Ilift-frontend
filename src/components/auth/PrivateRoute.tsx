import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import OnboardingFlow from '../onboarding/OnboardingFlow';
import Spinner from '../ui/Spinner';

/**
 * Route protégée nécessitant une authentification
 * Fonctionnalités :
 * - Redirige les utilisateurs non authentifiés vers /connexion
 * - Affiche un spinner pendant la vérification de l'authentification
 * - Gère l'affichage du flux d'onboarding si nécessaire
 * - Permet l'accès aux routes enfants si authentifié
 *
 * Utilisation:
 * ```tsx
 * <PrivateRoute>
 *   <ProtectedComponent />
 * </PrivateRoute>
 * ```
 *
 * @component
 * @returns {JSX.Element} Composant de redirection, spinner, onboarding ou route enfant
 */
function PrivateRoute() {
  const { user, userPending } = useContext(AuthContext);

  if (userPending) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  return (
    <>
      {!user.isOnboardingCompleted && <OnboardingFlow />}
      <Outlet />
    </>
  );
}

export default PrivateRoute;
