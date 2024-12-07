import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import ThemeToggle from '../../theme/ThemeToggle';
import Button from '../../ui/Button';
import UserNavInfos from './UserNavInfos';

function RightNav() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <UserNavInfos />
      ) : (
        <>
          <Link className="max-sm:mr-2" to="/connexion">
            <Button>Connexion</Button>
          </Link>
        </>
      )}
      {!user && <ThemeToggle />}
    </>
  );
}

export default RightNav;
