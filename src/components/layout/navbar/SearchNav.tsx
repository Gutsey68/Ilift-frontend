import { Search, X } from 'lucide-react';
import useSearchBarOnNavigation from '../../../hooks/useSearchBarOnNavigation';
import IconButton from '../../ui/IconButton';
import { Input } from '../../ui/Input';

export default function SearchNav() {
  const { handleSearchClick, handleCloseClick, handleBlur, isSearching, inputRef } = useSearchBarOnNavigation();

  return (
    <div className="relative inline-block">
      {!isSearching ? (
        <IconButton icon={<Search onClick={handleSearchClick} className="size-5" />} />
      ) : (
        <div className="flex items-center">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Rechercher..."
              className="rounded-md bg-transparent py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-green-9"
              onBlur={handleBlur}
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <Search className="size-5" />
            </div>
          </div>
          <IconButton icon={<X id="close-button" onClick={handleCloseClick} className="size-5" />} />
        </div>
      )}
    </div>
  );
}
