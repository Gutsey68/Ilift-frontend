import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import OnboardingFlow from '../Onboarding/OnboardingFlow';
import Spinner from '../ui/Spinner';

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
