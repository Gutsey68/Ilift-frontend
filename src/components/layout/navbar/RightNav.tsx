import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import ThemeToggle from '../../theme/ThemeToggle';
import Button from '../../ui/Button';
import UserNavInfos from './UserNavInfos';

/**
 * Navigation droite de l'en-tête
 * Fonctionnalités :
 * - Affichage conditionnel selon l'authentification
 * - Bouton de connexion pour les utilisateurs non authentifiés
 * - Informations utilisateur et contrôles pour les utilisateurs connectés
 * - Intégration du sélecteur de thème
 *
 * @component
 * @returns {JSX.Element} Navigation droite adaptative
 */
function RightNav() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <UserNavInfos />
      ) : (
        <>
          <Link className="z-50 max-sm:mr-2" to="/connexion">
            <Button className="z-50">Connexion</Button>
          </Link>
          <ThemeToggle />
        </>
      )}
    </>
  );
}

export default RightNav;
