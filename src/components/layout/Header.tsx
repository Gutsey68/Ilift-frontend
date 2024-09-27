import { Dumbbell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../theme/ThemeToggle';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="text-neutral-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <NavLink to={'/'} className="font-bold text-xl flex items-center">
                        <Dumbbell className="mr-2 mt-1" /> <span>ILift</span>
                    </NavLink>
                    <DesktopNav />
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-12 hover:text-green-9 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-9 transition-colors"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && <MobileNav onClick={toggleMenu} />}
        </nav>
    );
};

export default Navbar;
