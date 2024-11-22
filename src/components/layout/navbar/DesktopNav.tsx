import { NavLink } from 'react-router-dom';
import { navItems } from '../../../lib/links';
import SearchNav from './SearchNav';

function DesktopNav() {
  return (
    <div className="hidden md:block">
      <div className="ml-8 flex items-center gap-2">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} className={`rounded-md px-3 py-2 text-sm font-medium text-neutral-12 transition-colors hover:text-green-9`}>
            {item.label}
          </NavLink>
        ))}
        <SearchNav />
      </div>
    </div>
  );
}
export default DesktopNav;
