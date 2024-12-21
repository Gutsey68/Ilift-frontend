import { useEffect, useRef, useState } from 'react';

const useSearchBarOnNavigation = () => {
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleCloseClick = () => {
    setIsSearching(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || (relatedTarget.id !== 'close-button' && !relatedTarget.closest('a'))) {
      setIsSearching(false);
    }
  };

  return { handleSearchClick, handleCloseClick, handleBlur, isSearching, setIsSearching, inputRef };
};

export default useSearchBarOnNavigation;
