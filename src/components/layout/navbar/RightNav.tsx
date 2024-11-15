import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ThemeToggle from '../../theme/ThemeToggle';
import Button from '../../ui/Button';
import UserNavInfos from './UserNavInfos';
import { AuthContext } from '../../../context/AuthContext';

function RightNav() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
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
