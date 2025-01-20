import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../../services/usersService';
import { UserDetailsType } from '../../../types/UserDetailsType';
import SearchNavSkeletons from '../../skeletons/SearchNavSkeletons';
import Avatar from '../../ui/Avatar';
import Card from '../../ui/Card';
import { Input } from '../../ui/Input';
import Modal from '../../ui/Modal';

/**
 * Props du composant SearchModal
 * @typedef {object} SearchModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 */
type SearchModalProps = {
  closeModal: () => void;
};

/**
 * Modal de recherche d'utilisateurs
 * Fonctionnalités :
 * - Recherche en temps réel
 * - Focus automatique sur l'input
 * - Affichage des résultats avec avatars
 * - État de chargement
 * - Minimum 2 caractères pour la recherche
 * - Navigation vers les profils
 *
 * @component
 * @param {SearchModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de recherche avec résultats
 */
function SearchModal({ closeModal }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus automatique sur l'input à l'ouverture
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Requête de récupération des utilisateurs
   */
  const { isPending, data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const users = usersData?.data;
  const filteredUsers = searchTerm.length >= 2 ? users.filter((user: UserDetailsType) => user.pseudo.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  return (
    <Modal size="xl" className="top-5" onClose={closeModal}>
      <Card size="md" className="modal-content max-h-[60vh] overflow-y-auto">
        <div className="flex items-center gap-4">
          <Input ref={inputRef} placeholder="Rechercher un utilisateur" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <X onClick={closeModal} className="cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        {searchTerm.length >= 2 ? (
          isPending ? (
            <SearchNavSkeletons />
          ) : (
            <>
              <hr className="my-4 border-neutral-6" />
              <div className="flex flex-col gap-2">
                {filteredUsers.length ? (
                  filteredUsers.map((user: UserDetailsType) => (
                    <Link
                      key={user.id}
                      to={`/profil/${user.id}`}
                      className="group flex items-center gap-4 rounded-md p-2 hover:bg-neutral-3"
                      onClick={closeModal}
                    >
                      <Avatar size="sm" src={user.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${user.pseudo}`} />
                      <p className="text-neutral-11 group-hover:text-green-11">{user.pseudo}</p>
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-sm text-neutral-11">Aucun utilisateur trouvé</p>
                )}
              </div>
            </>
          )
        ) : null}
      </Card>
    </Modal>
  );
}

export default SearchModal;
