import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateUser } from '../../services/usersService';
import { UserAdminType } from '../../types/usersAdminType';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type UserDetailsModalProps = {
  user: UserAdminType;
  onClose: () => void;
};

const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  const queryClient = useQueryClient();

  const { mutate: toggleBanUser, isPending } = useMutation({
    mutationFn: async () => {
      return await updateUser(user.id, { isBan: !user.isBan });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersAdmin'] });
      onClose();
    }
  });

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
        <div className="flex items-center gap-4 p-4">
          <Avatar alt="" size="lg" src={user.profilePhoto || ''} />
          <div>
            <h3 className="text-lg font-semibold">{user.pseudo}</h3>
            <p className="text-sm text-neutral-11">{user.email}</p>
            <p className="text-xs text-neutral-10">Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex justify-between">
            <span>Posts :</span>
            <span>{user._count.posts}</span>
          </div>
          <div className="flex justify-between">
            <span>Abonnés :</span>
            <span>{user._count.followedBy}</span>
          </div>
          <div className="flex justify-between">
            <span>Abonnements :</span>
            <span>{user._count.following}</span>
          </div>
          <div className="flex justify-between">
            <span>Statut :</span>
            <Badge variant={user.isBan ? 'destructive' : 'default'}>{user.isBan ? 'Banni' : 'Actif'}</Badge>
          </div>
        </div>
        <div className="flex justify-end gap-4 border-t border-neutral-6 p-4">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleToggleBan} disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" size={20} /> : user.isBan ? 'Débannir' : 'Bannir'}
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default UserDetailsModal;
