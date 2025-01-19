import { ChevronRight, HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Props du composant BreadCrumb
 * @typedef {object} BreadCrumbProps
 * @property {Array<{label: string, href?: string, current?: boolean}>} items - Éléments du fil d'Ariane
 */
type BreadCrumbProps = {
  items: {
    label: string;
    href?: string;
    current?: boolean;
  }[];
};

/**
 * Composant de fil d'Ariane (Breadcrumb)
 * Fonctionnalités :
 * - Navigation hiérarchique
 * - Icône maison pour la page d'accueil
 * - Liens cliquables ou texte simple
 * - Styles différents pour l'élément courant
 * - Responsive avec défilement horizontal
 *
 * @component
 * @param {BreadCrumbProps} props - Les propriétés du composant
 * @returns {JSX.Element} Navigation en fil d'Ariane
 */

function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <nav className="flex overflow-x-auto">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center whitespace-nowrap">
            {index > 0 && <ChevronRight size={16} className="text-neutral-10" />}
            {item.href ? (
              <Link to={item.href} className="inline-flex items-center text-sm font-medium text-neutral-10 hover:text-green-11">
                {index === 0 && <HomeIcon size={16} className="mr-1" />}
                {item.label}
              </Link>
            ) : (
              <span className={`ms-1 text-sm font-medium ${item.current ? 'text-green-11' : 'text-neutral-10'} md:ms-2`}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
