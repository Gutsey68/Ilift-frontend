import { Dumbbell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { socials } from '../../lib/links';

function SideFooter() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex gap-2 text-sm">
        <NavLink to={'/mentions-legales'} className="transition-colors hover:text-green-9">
          Mentions légales
        </NavLink>
        <NavLink to={'/a-propos'} className="transition-colors hover:text-green-9">
          À propos de nous
        </NavLink>
      </div>
      <div className="flex justify-center space-x-4">
        {socials.map(({ icon: Icon, label, href }) => (
          <a key={label} href={href} target="_blank" className="text-neutral-11 transition-colors hover:text-green-9" rel="noreferrer">
            <Icon className="size-4" />
          </a>
        ))}
      </div>
      <p className="text-xs">
        Made with ❤️ by{' '}
        <a href="https://gauthierseyzeriat.com" target="_blank" className="text-green-9 hover:underline" rel="noreferrer">
          Gauthier Seyzeriat
        </a>
      </p>
      <div className="flex items-center justify-center gap-4">
        <p className="text-green-11">
          <Dumbbell className="mr-2 inline-block size-5" />
          <span className="font-semibold">ILift</span>
        </p>
        <div className="mb-4 text-xs sm:mb-0">© {new Date().getFullYear()} ILift. Tout droits réservés.</div>
      </div>
    </div>
  );
}
export default SideFooter;
