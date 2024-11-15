import { Search, X } from 'lucide-react';
import useSearchBarOnNavigation from '../../../hooks/useSearchBarOnNavigation';
import IconButton from '../../ui/IconButton';
import { Input } from '../../ui/Input';

export default function SearchNav() {
  const { handleSearchClick, handleCloseClick, handleBlur, isSearching, inputRef } = useSearchBarOnNavigation();

  return (
    <>
      {!isSearching ? (
        <div onClick={handleSearchClick} className="relative inline-block">
          <IconButton icon={<Search className="size-5" />} />
        </div>
      ) : (
        <div onClick={handleCloseClick} className="relative inline-block">
          <div className="flex items-center">
            <div className="relative">
              <Input ref={inputRef} type="text" placeholder="Rechercher..." onBlur={handleBlur} />
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <Search className="size-5" />
              </div>
            </div>
            <IconButton icon={<X id="close-button" className="size-5" />} />
          </div>
        </div>
      )}
    </>
  );
}
