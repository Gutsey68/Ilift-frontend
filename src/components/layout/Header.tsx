import { Dumbbell } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import DesktopNav from './navbar/DesktopNav';
import RightNav from './navbar/RightNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useContext(AuthContext);

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
            <NavLink to={`/${user ? 'accueil' : ''}`} className="flex items-center text-xl font-bold">
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
