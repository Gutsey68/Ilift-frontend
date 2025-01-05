import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, Pencil } from 'lucide-react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import AddPhotoModal from '../components/modals/AddPhotoModal';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import EditModal from '../components/modals/EditModal';
import Avatar from '../components/ui/Avatar';
import { Spacing } from '../components/ui/Spacing';
import { AuthContext } from '../context/AuthContext';
import { removeUserPhoto, updateUser } from '../services/usersService';
import { updateUserSchema } from '../validators/users.validation';

function ParametresPage() {
  const { user } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [editField, setEditField] = useState<{ type: 'bio' | 'city' | null; value: string }>({
    type: null,
    value: ''
  });

  const queryClient = useQueryClient();

  const removePhotoMutation = useMutation({
    mutationFn: () => removeUserPhoto(user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      setShowDeleteModal(false);
    }
  });

  const updateBioMutation = useMutation({
    mutationFn: (data: { bio: string }) => {
      const validatedData = updateUserSchema.parse({ body: { bio: data.bio } });
      return updateUser(user!.id, validatedData.body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      setEditField({ type: null, value: '' });
    },
    onError: error => {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Erreur lors de la mise à jour de la bio');
      }
    }
  });

  const updateCityMutation = useMutation({
    mutationFn: (data: { city: string }) => {
      const validatedData = updateUserSchema.parse({ body: { city: data.city } });
      return updateUser(user!.id, validatedData.body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      setEditField({ type: null, value: '' });
    },
    onError: error => {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Erreur lors de la mise à jour de la ville');
      }
    }
  });

  const handleDeletePicture = async () => {
    if (!user) return;
    try {
      removePhotoMutation.mutate();
    } catch {
      toast.error('Erreur lors de la suppression de la photo');
    }
  };

  const handleEditField = (type: 'bio' | 'city', value: string) => {
    setEditField({ type, value });
  };

  const handleEditSubmit = async (value: string) => {
    if (!user || !editField.type) return;

    if (editField.type === 'bio') {
      try {
        await updateBioMutation.mutateAsync({ bio: value });
        toast.success('Bio mise à jour avec succès');
      } catch {
        toast.error('Erreur lors de la mise à jour de la bio');
      }
    } else {
      try {
        await updateCityMutation.mutateAsync({ city: value });
        toast.success('Ville mise à jour avec succès');
      } catch {
        toast.error('Erreur lors de la mise à jour de la ville');
      }
    }

    setEditField({ type: null, value: '' });
  };

  return (
    <>
      <Spacing size="sm" />
      <div className="mx-auto mb-auto flex w-full max-w-6xl flex-col gap-4 text-neutral-11">
        <h1 className="text-3xl font-bold tracking-wider text-neutral-12">Mon profil</h1>
        <hr className="border-neutral-6" />
        <p>Photo actuelle</p>
        <div className="relative flex w-fit flex-col items-center lg:ml-24">
          <Avatar src={user?.profilePhoto || '/uploads.profil.webp'} alt="" size="xl" />
          <button
            onClick={() => setShowAddPhotoModal(true)}
            className="absolute bottom-10 right-1 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-1 bg-neutral-10 shadow-md hover:bg-neutral-9"
          >
            <Camera size={20} className="text-neutral-1" />
          </button>
          <button onClick={() => setShowDeleteModal(true)} className="pt-4 text-green-11 hover:underline">
            Supprimer
          </button>
        </div>
        <hr className="border-neutral-6" />
        <div className="group">
          <p className="cursor-pointer" onClick={() => handleEditField('city', user?.city?.name || '')}>
            Lieu{' '}
            <span className="ml-4 text-neutral-12 group-hover:text-green-11">
              {user?.city?.name}
              <Pencil size={16} className="ml-2 inline-block opacity-0 group-hover:opacity-100" />
            </span>
          </p>
        </div>
        <hr className="border-neutral-6" />
        <div className="group">
          <p className="cursor-pointer" onClick={() => handleEditField('bio', user?.bio || '')}>
            Bio{' '}
            <span className="ml-4 text-neutral-12 group-hover:text-green-11">
              {user?.bio}
              <Pencil size={16} className="ml-2 inline-block opacity-0 group-hover:opacity-100" />
            </span>
          </p>
        </div>
        <hr className="border-neutral-6" />
        <p className="text-xs text-neutral-10">
          Vous pouvez demander une copie de vos données personnelles en nous contactant à l'adresse suivante :{' '}
          <a href="mailto:support@example.com" className="text-green-11 hover:underline">
            support@example.com
          </a>
          .
        </p>
        <p className="text-xs text-neutral-10">
          Pour en savoir plus sur notre politique de protection des données, veuillez consulter notre
          <Link to="/mentions-legales" className="text-green-11 hover:underline">
            {' '}
            Politique de protection des données
          </Link>
          .
        </p>
      </div>
      <Spacing />
      {showDeleteModal && (
        <ConfirmDeleteModal
          title="Supprimer la photo de profil"
          message="Êtes-vous sûr de vouloir supprimer votre photo de profil ?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeletePicture}
          isLoading={removePhotoMutation.isPending}
        />
      )}
      {showAddPhotoModal && <AddPhotoModal onClose={() => setShowAddPhotoModal(false)} />}
      {editField.type && (
        <EditModal
          title={`Modifier ${editField.type === 'bio' ? 'la bio' : 'la ville'}`}
          fieldName={editField.type}
          initialValue={editField.value}
          onClose={() => setEditField({ type: null, value: '' })}
          onConfirm={handleEditSubmit}
          isLoading={editField.type === 'bio' ? updateBioMutation.isPending : updateCityMutation.isPending}
        />
      )}
    </>
  );
}

export default ParametresPage;
