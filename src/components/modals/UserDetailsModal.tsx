import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateUser } from '../../services/usersService';
import { UserAdminType } from '../../types/usersAdminType';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type UserDetailsModalProps = {
  user: UserAdminType;
  onClose: () => void;
};

const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      return await updateUser(user.id, { isBan: !user.isBan });
    },
    onSuccess: () => {
      toast.success('Utilisateur mis à jour avec succès');
      queryClient.invalidateQueries({ queryKey: ['usersAdmin'] });
      onClose();
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'utilisateur");
    }
  });

  const handleToggleBan = async () => {
    setIsLoading(true);
    try {
      await updateUserMutation.mutateAsync();
    } finally {
      setIsLoading(false);
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
            <span>Rôle :</span>
            <span>{user.roleId}</span>
          </div>
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
            <span className={`rounded-full px-2 text-xs font-semibold ${user.isBan ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {user.isBan ? 'Banni' : 'Actif'}
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-4 border-t border-neutral-6 p-4">
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleToggleBan}>{user.isBan ? 'Débannir' : 'Bannir'}</Button>
        </div>
      </Card>
    </Modal>
  );
};

export default UserDetailsModal;
