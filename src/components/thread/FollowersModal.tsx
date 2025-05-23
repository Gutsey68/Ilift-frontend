import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchFollowers, follow } from '../../services/followersService';
import { FollowersType } from '../../types/followersType';
import { FollowingsType } from '../../types/followingsType';
import FollowingsSkeletons from '../skeletons/FollowingsSkeletons';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';
import DeleteFollowerModal from './DeleteFollowerModal';

/**
 * Props du composant FollowersModal
 * @typedef {object} FollowersModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 * @property {string} [userId] - ID de l'utilisateur dont on affiche les abonnés (utilise l'utilisateur courant si non fourni)
 */
type FollowersModalProps = {
  closeModal: () => void;
  userId?: string;
};

/**
 * Modal d'affichage et de gestion des abonnés
 * Fonctionnalités :
 * - Liste des abonnés avec recherche en temps réel
 * - Actions de suivi/suppression d'abonnés
 * - Navigation vers les profils
 * - Gestion des états de chargement
 * - Retours visuels des actions
 *
 * @component
 * @param {FollowersModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de gestion des abonnés
 */
function FollowersModal({ closeModal, userId }: FollowersModalProps) {
  const { user } = useContext(AuthContext);
  const [selectedFollower, setSelectedFollower] = useState<FollowingsType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const id = userId || user?.id;

  /**
   * Requête pour récupérer la liste des abonnés
   */
  const { isPending: followersPending, data: followers } = useQuery({
    queryKey: ['followers', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchFollowers(id);
    },
    enabled: !!id
  });

  const followersData = followers?.data;

  const filteredFollowers = followersData?.filter((follower: FollowingsType) => follower.pseudo.toLowerCase().includes(searchTerm.toLowerCase()));

  /**
   * Mutation pour suivre un utilisateur
   */
  const mutation = useMutation({
    mutationFn: (id: string) => follow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['suggested'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    }
  });

  /**
   * Gère le suivi d'un utilisateur avec retour visuel
   */
  const handleFollow = (followerId: string, followerPseudo: string) => {
    try {
      mutation.mutate(followerId);
      toast.success(`Vous suivez désormais ${followerPseudo}`);
    } catch {
      toast.error("Une erreur est survenue lors de l'ajout de l'abonné");
    }
  };

  return (
    <>
      <Modal size="lg" onClose={closeModal}>
        <Card size="lg" className="modal-content max-h-[60vh] overflow-y-auto">
          <div className="relative flex w-full justify-center">
            <h2 className="mb-4 text-xl font-semibold">Abonnés</h2>
            <X onClick={closeModal} className="absolute right-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
          </div>
          <hr className="mb-6 border-neutral-6" />
          <Input className="mb-8" placeholder="Rechercher un abonné" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          {followersPending ? (
            <FollowingsSkeletons />
          ) : (
            <div className="flex flex-col gap-4">
              {filteredFollowers.map((follower: FollowersType) => (
                <div key={follower.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link to={`/profil/${follower.id}`} onClick={closeModal} className="group flex w-full cursor-pointer items-center gap-3">
                      <Avatar size="sm" src={follower.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${follower.pseudo}`} />
                      <p className="text-sm text-neutral-11 group-hover:text-green-11 max-md:text-xs">{follower.pseudo}</p>
                    </Link>
                    {user && user.id !== follower.id && !follower.amIFollowing && (
                      <button onClick={() => handleFollow(follower.id, follower.pseudo)} className="text-sm text-green-11 hover:underline max-md:text-xs">
                        Suivre
                      </button>
                    )}
                  </div>
                  {user && user.id === id && (
                    <Button onClick={() => setSelectedFollower(follower)} variant="secondary" className="px-3 max-md:text-xs">
                      Supprimer
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </Modal>
      {selectedFollower && <DeleteFollowerModal follower={selectedFollower} closeModal={() => setSelectedFollower(null)} />}
    </>
  );
}

export default FollowersModal;
