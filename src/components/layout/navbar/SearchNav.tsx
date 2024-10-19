import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import IconButton from '../../ui/IconButton';

export default function SearchNav() {
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
        if (!e.relatedTarget || e.relatedTarget.id !== 'close-button') {
            setIsSearching(false);
        }
    };

    return (
        <div className="relative inline-block">
            {!isSearching ? (
                <IconButton icon={<Search onClick={handleSearchClick} className="size-5" />} />
            ) : (
                <div className="flex items-center">
                    <div className="relative">
                        <input
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
