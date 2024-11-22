import { ChevronRight, HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type BreadCrumbProps = {
  items: {
    label: string;
    href?: string;
    current?: boolean;
  }[];
};

function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <nav className="flex">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
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
