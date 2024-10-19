import { Dumbbell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import RightNav from './RightNav';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="text-neutral-12">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center justify-center">
                        <NavLink to={'/'} className="flex items-center text-xl font-bold">
                            <Dumbbell className="mr-2 mt-1" /> <span>ILift</span>
                        </NavLink>
                        <DesktopNav />
                    </div>
                    <div className="hidden items-center justify-center gap-2 md:flex">
                        <RightNav />
                    </div>
                    <div className="flex items-center gap-2 md:hidden">
                        <RightNav />
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-12 transition-colors hover:text-green-9 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-9"
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
