import { Dumbbell, House, Mail, Phone } from 'lucide-react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { navItems, NotAuhenticatedNavItems, socials } from '../../lib/links';

const Footer = ({ ...props }) => {
  const { user } = useContext(AuthContext);

  return (
    <footer {...props} className="text-neutral-11">
      <div className="mx-auto max-w-6xl border-t border-neutral-6 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start">
            <a href="/" className="mb-4 flex items-center text-neutral-12">
              <Dumbbell className="mr-2 size-8" />
              <span className="text-xl font-bold">ILift</span>
            </a>
            <p className="text-sm">
              Made with ❤️ by{' '}
              <a href="https://gauthierseyzeriat.com" target="_blank" className="text-green-9 hover:underline" rel="noreferrer">
                Gauthier Seyzeriat
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-neutral-12">Liens rapides</h3>
            <ul className="space-y-2">
              {user
                ? navItems.map(item => (
                    <li key={item.to}>
                      <NavLink to={item.to} className="transition-colors hover:text-green-9">
                        {item.label}
                      </NavLink>
                    </li>
                  ))
                : NotAuhenticatedNavItems.map(item => (
                    <li key={item.to}>
                      <NavLink to={item.to} className="transition-colors hover:text-green-9">
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-neutral-12">Contactez nous</h3>
            <div className="flex items-center">
              <House className="mr-2 mt-1 size-4" />
              36 rue saint Léon
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 mt-1 size-4" /> gauthier@seyzeriat.fr
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 mt-1 size-4" /> 03 89 80 53 62
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t border-neutral-6 pt-8 sm:flex-row">
          <div className="mb-4 text-sm sm:mb-0">© {new Date().getFullYear()} ILift. Tout droits réservés.</div>
          <div className="flex space-x-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" className="text-neutral-11 transition-colors hover:text-green-9" rel="noreferrer">
                <Icon className="size-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
