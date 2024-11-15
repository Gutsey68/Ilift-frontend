import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../stores/useAuthStore';
import ThemeToggle from '../../theme/ThemeToggle';
import Button from '../../ui/Button';
import UserNavInfos from './UserNavInfos';

function RightNav() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <UserNavInfos />
      ) : (
        <>
          <Link to="/connexion">
            <Button>Connexion</Button>
          </Link>
        </>
      )}
      <ThemeToggle />
    </>
  );
}

export default RightNav;
