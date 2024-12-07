import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSearchBarOnNavigation from '../../../hooks/useSearchBarOnNavigation';
import Card from '../../ui/Card';
import IconButton from '../../ui/IconButton';
import { Input } from '../../ui/Input';

export default function SearchNav() {
  const { handleSearchClick, handleCloseClick, handleBlur, isSearching, inputRef } = useSearchBarOnNavigation();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length > 0) {
      setSearchResults(['john_doe', 'nature_lover', 'fit_mom']);
    } else {
      setSearchResults([]);
    }
  };

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
              <Input ref={inputRef} type="text" placeholder="Rechercher..." onBlur={handleBlur} onChange={handleInputChange} />
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <Search className="size-5" />
              </div>
            </div>
            <IconButton icon={<X id="close-button" className="size-5" />} />
          </div>
          {searchResults.length > 0 && (
            <Card size="sm" className="absolute top-11 -mx-1 w-[89%]">
              <div className="flex flex-col gap-1">
                {searchResults.map((result, index) => (
                  <Link to="" className="w-full hover:text-green-11" key={index}>
                    {result}
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
