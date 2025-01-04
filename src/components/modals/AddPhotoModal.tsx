import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { updateUserPhoto } from '../../services/usersService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type AddPhotoModalProps = {
  onClose: () => void;
};

function AddPhotoModal({ onClose }: AddPhotoModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const { mutate: uploadPhoto, isPending } = useMutation({
    mutationFn: async () => {
      if (!photo) return;
      const formData = new FormData();
      formData.append('profilePhoto', photo);
      return updateUserPhoto(user.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Photo de profil mise à jour');
      onClose();
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
    }
  };

  const handleCancel = () => {
    setPhoto(null);
    setPreview(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="flex flex-col gap-6">
        <div className="relative border-b border-neutral-6 p-4">
          <h2 className="text-center text-xl font-semibold">Changer la photo de profil</h2>
          <X onClick={onClose} className="absolute right-4 top-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>

        <div className="flex flex-col items-center gap-6 p-6">
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
            <div className="mt-2 flex w-full gap-2">
              <Button variant="secondary" className="flex-1" onClick={handleCancel} type="button">
                Annuler
              </Button>
              <Button className="flex-1" onClick={() => uploadPhoto()} disabled={isPending} isPending={isPending}>
                Confirmer
              </Button>
            </div>
          ) : (
            <div className="mt-2 flex w-full gap-2">
              <Button variant="secondary" className="flex-1" onClick={onClose} type="button">
                Annuler
              </Button>
              <Button className="flex-1" onClick={handleButtonClick} type="button">
                Choisir une photo
              </Button>
            </div>
          )}
        </div>
      </Card>
    </Modal>
  );
}

export default AddPhotoModal;
