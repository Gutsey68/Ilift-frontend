import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, Pencil } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilPicture from '../assets/images/profil.png';
import AddPhotoModal from '../components/ui/AddPhotoModal';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import ConfirmDeleteModal from '../components/ui/ConfirmDeleteModal';
import { Input } from '../components/ui/Input';
import { Spacing } from '../components/ui/Spacing';
import { AuthContext } from '../context/AuthContext';
import { removeUserPhoto, updateUser, updateUserPhoto } from '../services/usersService';

function ParametresPage() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [city, setCity] = useState(user?.city?.name || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const queryClient = useQueryClient();

  const updatePhotoMutation = useMutation({
    mutationFn: (file: File) => updateUserPhoto(user!.id, file),
    onSuccess: data => {
      setUser(prev => (prev ? { ...prev, ...data } : null));
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setShowAddPhotoModal(false);
    }
  });

  const removePhotoMutation = useMutation({
    mutationFn: () => removeUserPhoto(user!.id),
    onSuccess: data => {
      setUser(prev => (prev ? { ...prev, ...data } : null));
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setShowDeleteModal(false);
    }
  });

  const updateBioMutation = useMutation({
    mutationFn: () => updateUser(user!.id, { bio }),
    onSuccess: data => {
      setUser(prev => (prev ? { ...prev, bio: data.bio } : null));
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsEditingBio(false);
    }
  });

  const updateCityMutation = useMutation({
    mutationFn: () => updateUser(user!.id, { city: { name: city } }),
    onSuccess: data => {
      setUser(prev => (prev ? { ...prev, city: { name: city } } : null));
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsEditingCity(false);
    }
  });

  const handlePhotoChange = async (file: File) => {
    if (!user) return;
    updatePhotoMutation.mutate(file);
  };

  const handleDeletePicture = async () => {
    if (!user) return;
    removePhotoMutation.mutate();
  };

  const handleBioSubmit = async () => {
    if (!user) return;
    updateBioMutation.mutate();
  };

  const handleCitySubmit = async () => {
    if (!user) return;
    updateCityMutation.mutate();
  };

  return (
    <>
      <div className="m-auto flex w-full max-w-6xl flex-col gap-4 text-neutral-11">
        <h1 className="text-3xl font-bold tracking-wider text-neutral-12">Mon profil</h1>
        <hr className="border-neutral-6" />
        <p>Photo actuelle</p>
        <div className="relative flex w-fit flex-col items-center lg:ml-24">
          <Avatar src={user?.profilePhoto || ProfilPicture} alt="" size="xl" />
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
          {isEditingCity ? (
            <div className="flex items-center gap-2">
              <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Votre ville" />
              <Button onClick={handleCitySubmit} disabled={updateCityMutation.isPending}>
                {updateCityMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
              <Button onClick={() => setIsEditingCity(false)}>Annuler</Button>
            </div>
          ) : (
            <p className="cursor-pointer" onClick={() => setIsEditingCity(true)}>
              Lieu{' '}
              <span className="ml-4 text-neutral-12 group-hover:text-green-11">
                {user?.city?.name}
                <Pencil size={16} className="ml-2 inline-block opacity-0 group-hover:opacity-100" />
              </span>
            </p>
          )}
        </div>

        <hr className="border-neutral-6" />

        <div className="group">
          {isEditingBio ? (
            <div className="flex items-center gap-2">
              <Input value={bio} onChange={e => setBio(e.target.value)} placeholder="Votre bio" />
              <Button onClick={handleBioSubmit} disabled={updateBioMutation.isPending}>
                {updateBioMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
              <Button onClick={() => setIsEditingBio(false)}>Annuler</Button>
            </div>
          ) : (
            <p className="cursor-pointer" onClick={() => setIsEditingBio(true)}>
              Bio{' '}
              <span className="ml-4 text-neutral-12 group-hover:text-green-11">
                {user?.bio}
                <Pencil size={16} className="ml-2 inline-block opacity-0 group-hover:opacity-100" />
              </span>
            </p>
          )}
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

      {showAddPhotoModal && (
        <AddPhotoModal onClose={() => setShowAddPhotoModal(false)} onConfirm={handlePhotoChange} isLoading={updatePhotoMutation.isPending} />
      )}
    </>
  );
}

export default ParametresPage;
