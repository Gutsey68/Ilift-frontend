import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import { updateUserPhoto } from '../../../services/usersService';
import Button from '../../ui/Button';

/**
 * Props du composant ProfilePhotoStep
 * @typedef {object} ProfilePhotoStepProps
 * @property {() => void} onComplete - Fonction appelée lorsque l'étape est terminée
 */
type ProfilePhotoStepProps = {
  onComplete: () => void;
};

/**
 * Composant de l'étape d'upload de photo de profil dans le processus d'onboarding
 * Fonctionnalités :
 * - Sélection de fichier image
 * - Prévisualisation de l'image
 * - Validation du type et de la taille du fichier
 * - Upload avec gestion des erreurs
 * - Retour visuel du succès/échec
 *
 * @component
 * @param {ProfilePhotoStepProps} props - Les propriétés du composant
 * @returns {JSX.Element} Étape d'upload de photo de profil
 */
const ProfilePhotoStep = ({ onComplete }: ProfilePhotoStepProps) => {
  const queryClient = useQueryClient();
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Mutation pour uploader la photo de profil
   */
  const { mutate: uploadPhoto, isPending } = useMutation({
    mutationFn: async () => {
      if (!photo) return;
      const formData = new FormData();
      formData.append('profilePhoto', photo);
      if (user) {
        return updateUserPhoto(user.id, formData);
      } else {
        throw new Error('Utilisateur non authentifié');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Photo de profil mise à jour');
      onComplete();
    },
    onError: () => {
      toast.error("Erreur lors de l'upload de la photo");
    }
  });

  /**
   * Gère la sélection d'un fichier image
   * Vérifie le type et la taille du fichier avant de créer une prévisualisation
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 5MB");
        return;
      }
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /**
   * Déclenche le sélecteur de fichier
   */
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Réinitialise la sélection de photo
   */
  const handleCancel = () => {
    setPhoto(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {preview ? (
          <img src={preview} alt="Preview" className="size-32 rounded-full object-cover" />
        ) : (
          <div className="flex size-32 items-center justify-center rounded-full bg-neutral-3">
            <Plus className="text-neutral-11" />
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {preview ? (
        <div className="flex w-full gap-2">
          <Button variant="secondary" className="flex-1" onClick={handleCancel} type="button">
            Annuler
          </Button>
          <Button className="flex-1" onClick={() => uploadPhoto()} disabled={isPending} isPending={isPending}>
            Confirmer
          </Button>
        </div>
      ) : (
        <Button variant="outline" className="w-full" onClick={handleButtonClick} type="button">
          Choisir une photo
        </Button>
      )}
    </div>
  );
};

export default ProfilePhotoStep;
