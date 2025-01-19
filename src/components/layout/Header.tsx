import { Dumbbell } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import DesktopNav from './navbar/DesktopNav';
import RightNav from './navbar/RightNav';

/**
 * En-tête principal de l'application
 * Fonctionnalités :
 * - Navigation responsive
 * - Logo et lien d'accueil
 * - Effet de fond au scroll
 * - Navigation desktop/mobile adaptative
 * - Affichage conditionnel selon l'authentification
 *
 * @component
 * @returns {JSX.Element} En-tête avec navigation
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useContext(AuthContext);

  /**
   * Gestion de l'effet de fond au scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-30 pb-4 transition-colors duration-300 ${isScrolled ? 'bg-neutral-1' : 'bg-transparent'} text-neutral-12`}>
      <div className="mx-auto max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <NavLink to={`/${user ? 'accueil' : ''}`} className="flex items-center text-xl font-bold hover:text-green-9">
              <Dumbbell className="mr-2 mt-1" /> <span>ILift</span>
            </NavLink>
            {user && <DesktopNav />}
          </div>
          <div className="hidden items-center justify-center gap-2 md:flex">
            <RightNav />
          </div>
          <div className="flex items-center  md:hidden">
            <RightNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
