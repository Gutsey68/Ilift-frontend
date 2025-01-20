import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchFollowings } from '../../services/followersService';
import { FollowingsType } from '../../types/followingsType';
import FollowingsSkeletons from '../skeletons/FollowingsSkeletons';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';
import UnfollowModal from './UnfollowModal';

/**
 * Props du composant FollowingsModal
 * @typedef {object} FollowingsModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 * @property {string} [userId] - ID de l'utilisateur dont on affiche les abonnements (utilise l'utilisateur courant si non fourni)
 */
type FollowingsModalProps = {
  closeModal: () => void;
  userId?: string;
};

/**
 * Modal d'affichage et de gestion des abonnements
 * Fonctionnalités :
 * - Liste des abonnements avec recherche en temps réel
 * - Suppression d'abonnements
 * - Navigation vers les profils
 * - Gestion des états de chargement
 * - Filtrage des résultats
 *
 * @component
 * @param {FollowingsModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de gestion des abonnements
 */
function FollowingsModal({ closeModal, userId }: FollowingsModalProps) {
  const { user } = useContext(AuthContext);
  const [selectedFollowing, setSelectedFollowing] = useState<FollowingsType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const id = userId || user?.id;

  /**
   * Requête pour récupérer la liste des abonnements
   */
  const { isPending: followingsPending, data: followings } = useQuery({
    queryKey: ['followings', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchFollowings(id);
    },
    enabled: !!id
  });

  const followingsData = followings?.data;

  const filteredFollowings = followingsData?.filter((following: FollowingsType) => following.pseudo.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Modal size="lg" onClose={closeModal}>
        <Card size="lg" className="modal-content max-h-[60vh] overflow-y-auto">
          <div className="relative flex w-full justify-center">
            <h2 className="mb-4 text-xl font-semibold">Abonnements</h2>
            <X onClick={closeModal} className="absolute right-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
          </div>
          <hr className="mb-6 border-neutral-6" />
          <Input className="mb-8" placeholder="Rechercher un abonnement" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          {followingsPending ? (
            <FollowingsSkeletons />
          ) : (
            <div className="flex flex-col gap-4">
              {filteredFollowings.map((following: FollowingsType) => (
                <div key={following.id} className="flex items-center justify-between">
                  <Link to={`/profil/${following.id}`} onClick={closeModal} className="group flex w-full cursor-pointer items-center gap-2">
                    <Avatar size="sm" src={following.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${following.pseudo}`} />
                    <p className="text-sm text-neutral-11 group-hover:text-green-11">{following.pseudo}</p>
                  </Link>
                  {user && user.id === id && (
                    <Button variant="secondary" onClick={() => setSelectedFollowing(following)}>
                      Suivie(e)
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </Modal>
      {selectedFollowing && <UnfollowModal following={selectedFollowing} closeModal={() => setSelectedFollowing(null)} />}
    </>
  );
}

export default FollowingsModal;
