import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useContext, useRef, useState } from 'react'; // Ajout de useRef
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import { updateUserPhoto } from '../../../services/usersService';
import Button from '../../ui/Button';

type ProfilePhotoStepProps = {
  onComplete: () => void;
};

const ProfilePhotoStep = ({ onComplete }: ProfilePhotoStepProps) => {
  const queryClient = useQueryClient();
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadPhoto } = useMutation({
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
      uploadPhoto();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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

      <Button variant="outline" className="w-full" onClick={handleButtonClick} type="button">
        {photo ? 'Changer la photo' : 'Choisir une photo'}
      </Button>
    </div>
  );
};

export default ProfilePhotoStep;
