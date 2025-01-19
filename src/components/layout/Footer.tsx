import { Dumbbell } from 'lucide-react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { navItems, NotAuhenticatedNavItems, socials } from '../../lib/links';

/**
 * Pied de page principal de l'application
 * Fonctionnalités :
 * - Logo et lien vers la page d'accueil
 * - Navigation rapide adaptée à l'authentification
 * - Liens légaux et informations
 * - Liens sociaux
 * - Responsive design (mobile/desktop)
 * - Crédit et copyright
 *
 * @component
 * @param {...React.HTMLAttributes<HTMLElement>} props - Props HTML du footer
 * @returns {JSX.Element} Pied de page complet
 */
const Footer = ({ ...props }) => {
  const { user } = useContext(AuthContext);

  return (
    <footer {...props} className="z-10 bg-neutral-1 text-neutral-11 max-sm:text-center">
      <div className="mx-auto max-w-6xl border-t border-neutral-6 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col sm:items-start">
            <Link to={`/${user && 'accueil'}`} className="mb-4 flex items-center justify-center max-sm:text-neutral-12">
              <Dumbbell className="mr-2 size-8" />
              <span className="text-xl font-bold">ILift</span>
            </Link>
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
              <li>
                <NavLink to={`/${user ? 'accueil' : ''}`} className="transition-colors hover:text-green-9">
                  Accueil
                </NavLink>
              </li>
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
          <div className="flex flex-col justify-center max-sm:flex">
            <h3 className="mb-4 text-lg font-semibold text-neutral-12">Liens utiles</h3>
            <div className="flex flex-col space-y-2">
              <NavLink to={'mentions-legales'} className="transition-colors hover:text-green-9">
                Mentions légales
              </NavLink>
              <NavLink to={'a-propos'} className="transition-colors hover:text-green-9">
                À propos de nous
              </NavLink>
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
