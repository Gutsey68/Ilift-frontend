import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

function LandingPage() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tableau-de-bord');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Bienvenue sur notre site</h1>
    </div>
  );
}

export default LandingPage;
