import { NavLink } from 'react-router-dom';
import navItems from '../../lib/links';

function MobileNav({ ...props }) {
    return (
        <div className="md:hidden">
            <div className="space-y-1 border-b border-neutral-6 px-2 pb-3 pt-2 text-center sm:px-3">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-md font-medium text-neutral-12 transition-colors block text-base hover:bg-green-500/20 ${
                                isActive && 'text-green-500'
                            }`
                        }
                        {...props}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
export default MobileNav;
