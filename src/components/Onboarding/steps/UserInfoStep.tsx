import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { AuthContext } from '../../../context/AuthContext';
import { updateUser } from '../../../services/usersService';
import { updateUserSchema } from '../../../validators/users.validation';
import Button from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

type UserInfoStepProps = {
  onComplete: () => void;
};

const UserInfoStep = ({ onComplete }: UserInfoStepProps) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async () => {
      const validatedData = updateUserSchema.parse({ body: { bio, city } });
      if (!user) {
        throw new Error('Utilisateur non authentifié');
      }
      return updateUser(user.id, validatedData.body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Profil mis à jour avec succès');
      onComplete();
    },
    onError: error => {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Erreur lors de la mise à jour du profil');
      }
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <Textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Parlez-nous de vous..." className="min-h-[100px]" />

      <Input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Dans quelle ville habitez-vous ?" />

      <Button onClick={() => updateProfile()} disabled={!bio || !city || isPending} isPending={isPending}>
        Continuer
      </Button>
    </div>
  );
};

export default UserInfoStep;
