import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSearchBarOnNavigation from '../../../hooks/useSearchBarOnNavigation';
import { fetchUsers } from '../../../services/usersService';
import SearchNavSkeletons from '../../skeletons/SearchNavSkeletons';
import Avatar from '../../ui/Avatar';
import Card from '../../ui/Card';
import IconButton from '../../ui/IconButton';
import { Input } from '../../ui/Input';

interface User {
  id: string;
  pseudo: string;
  profilePhoto?: string;
}

export default function SearchNav() {
  const { handleSearchClick, handleCloseClick, handleBlur, isSearching, inputRef } = useSearchBarOnNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { data: users, isPending } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length >= 2 && users) {
      const filtered = users.filter(user => user.pseudo.toLowerCase().includes(query.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleLink = () => {
    handleCloseClick();
    setSearchQuery('');
  };

  return (
    <>
      {!isSearching ? (
        <div onClick={handleSearchClick} className="relative inline-block">
          <IconButton icon={<Search className="size-5" />} />
        </div>
      ) : (
        <div className="relative inline-block">
          <div className="flex items-center">
            <div className="relative">
              <Input ref={inputRef} type="text" value={searchQuery} placeholder="Rechercher..." onBlur={handleBlur} onChange={handleInputChange} autoFocus />
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <Search className="size-5" />
              </div>
            </div>
            <div onClick={handleCloseClick}>
              <IconButton icon={<X id="close-button" className="size-5" />} />
            </div>
          </div>
          {searchQuery.length >= 2 && (
            <Card size="sm" className="absolute top-11 -mx-1 w-[89%]">
              <div className="flex flex-col gap-1">
                {isPending ? (
                  <SearchNavSkeletons />
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <Link onClick={handleLink} className="group flex items-center gap-1 py-1" to={`/profil/${user.id}`} key={user.id}>
                      <Avatar
                        size="sm"
                        src={(user.profilePhoto && '/' + user.profilePhoto) || '/uploads/profil.png'}
                        alt={`Photo de ${user.pseudo}`}
                        className="mr-2 size-8"
                      />
                      <span className="text-neutral-11 group-hover:text-green-11">{user.pseudo}</span>
                    </Link>
                  ))
                ) : (
                  <p className="p-2 text-sm text-neutral-11">Aucun résultat</p>
                )}
              </div>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
