import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { follow } from '../../../services/followersService';
import { fetchUsers } from '../../../services/usersService';
import { UserDetailsType } from '../../../types/userDetailsType';
import FollowingsSkeletons from '../../skeletons/FollowingsSkeletons';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import { Input } from '../../ui/Input';

/**
 * Composant de l'étape de suivi des utilisateurs dans le processus d'onboarding
 * Fonctionnalités :
 * - Recherche d'utilisateurs en temps réel
 * - Affichage des utilisateurs suggérés
 * - Suivi/Désabonnement des utilisateurs
 * - Gestion des états de chargement
 *
 * @component
 * @returns {JSX.Element} Étape de suivi des utilisateurs avec barre de recherche et liste de suggestions
 */
const FollowUsersStep = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  const { user: currentUser } = useContext(AuthContext);
  const currentUserId = currentUser?.id;

  /**
   * Récupération des utilisateurs suggérés
   */
  const { data = [], isLoading } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: () => fetchUsers()
  });

  // Filtrage des utilisateurs pour exclure l'utilisateur courant
  const users = data?.data?.filter((user: UserDetailsType) => user.id !== currentUserId);

  /**
   * Filtrage des utilisateurs selon le terme de recherche
   * Limite à 5 suggestions si aucune recherche active
   */
  const filteredUsers =
    searchTerm.length >= 1 ? users?.filter((user: UserDetailsType) => user.pseudo.toLowerCase().includes(searchTerm.toLowerCase())) : users?.slice(0, 5);

  /**
   * Mutation pour suivre un utilisateur
   */
  const { mutate: followUser, isPending: isFollowPending } = useMutation({
    mutationFn: (userId: string) => follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] });
      toast.success('Utilisateur suivi avec succès');
    },
    onError: () => {
      toast.error("Erreur lors du suivi de l'utilisateur");
    }
  });

  return (
    <div>
      <Input placeholder="Rechercher un utilisateur" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

      {isLoading ? (
        <FollowingsSkeletons />
      ) : (
        <div className="mt-6 flex max-h-[300px] flex-col gap-4 overflow-y-auto">
          {filteredUsers?.length ? (
            filteredUsers.map((user: UserDetailsType) => (
              <div key={user.id} className="flex items-center justify-between">
                <Link to={`/profil/${user.id}`} className="group flex w-full cursor-pointer items-center gap-3">
                  <Avatar size="sm" src={user.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${user.pseudo}`} />
                  <p className="text-sm text-neutral-11 group-hover:text-green-11">{user.pseudo}</p>
                </Link>
                <Button onClick={() => followUser(user.id)} disabled={isFollowPending} variant="secondary">
                  Suivre
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-neutral-11">Aucun utilisateur trouvé</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowUsersStep;
