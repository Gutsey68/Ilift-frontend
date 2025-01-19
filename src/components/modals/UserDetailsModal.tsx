import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { updateUser } from '../../services/usersService';
import { UserAdminType } from '../../types/usersAdminType';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant UserDetailsModal
 * @typedef {object} UserDetailsModalProps
 * @property {UserAdminType} user - Les informations de l'utilisateur à afficher
 * @property {() => void} onClose - Fonction de fermeture du modal
 */
type UserDetailsModalProps = {
  user: UserAdminType;
  onClose: () => void;
};

/**
 * Modal affichant les détails d'un utilisateur avec options d'administration
 * Fonctionnalités :
 * - Affichage des informations utilisateur (avatar, pseudo, email, date d'inscription)
 * - Statistiques (posts, abonnés, abonnements)
 * - Gestion du bannissement
 * - Lien vers le profil complet
 *
 * @component
 * @param {UserDetailsModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal avec les détails de l'utilisateur
 */
const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  const queryClient = useQueryClient();

  /**
   * Mutation pour basculer l'état de bannissement d'un utilisateur
   */
  const { mutate: toggleBanUser, isPending } = useMutation({
    mutationFn: async () => {
      return await updateUser(user.id, { isBan: !user.isBan });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersAdmin'] });
      onClose();
    }
  });

  /**
   * Gère le basculement du bannissement avec retour visuel
   */
  const handleToggleBan = () => {
    try {
      toggleBanUser();
      toast.success(`Utilisateur ${user.isBan ? 'débanni' : 'banni'} avec succès`);
    } catch {
      toast.error("Une erreur est survenue lors de la modification du statut de l'utilisateur");
    }
  };

  return (
    <Modal onClose={onClose}>
      <Card size="xs" className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Avatar alt={`Avatar de ${user.pseudo}`} size="md" src={user.profilePhoto || '/uploads/profil.png'} />
            <div>
              <h3 className="text-lg font-semibold">{user.pseudo}</h3>
              <p className="text-sm text-neutral-11">{user.email}</p>
              <p className="text-xs text-neutral-10">Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          <Link to={`/profil/${user.id}`}>
            <Button variant="secondary">Voir le profil</Button>
          </Link>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <span className="text-neutral-11">Posts :</span>
            <span>{user._count.posts}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-11">Abonnés :</span>
            <span>{user._count.followedBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-11">Abonnements :</span>
            <span>{user._count.following}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-11">Statut :</span>
            <Badge variant={user.isBan ? 'destructive' : 'default'}>{user.isBan ? 'Banni' : 'Actif'}</Badge>
          </div>
        </div>
        <div className="flex justify-end gap-4 border-t border-neutral-6 p-4">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button isPending={isPending} variant={user.isBan ? 'default' : 'destructive'} onClick={handleToggleBan}>
            {user.isBan ? 'Débannir' : 'Bannir'}
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default UserDetailsModal;
