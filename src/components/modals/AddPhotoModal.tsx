import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, LoaderCircle, X } from 'lucide-react';
import { useContext, useState } from 'react';
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
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  if (!user) return null;

  const handleRemoveImage = () => {
    setPreview(null);

    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const updatePhotoMutation = useMutation({
    mutationFn: (formData: FormData) => updateUserPhoto(user.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      onClose();
    }
  });

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const fileInput = document.getElementById('profilePhoto') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append('profilePhoto', fileInput.files[0]);
      }

      await updatePhotoMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Une erreur est survenue lors de la mise à jour de la photo de profil:', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Changer la photo de profil</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input disabled={updatePhotoMutation.isPending} type="file" id="profilePhoto" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Aperçu" className="size-32 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -right-2 -top-2 rounded-full bg-neutral-12 p-1 text-neutral-1 hover:bg-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label htmlFor="profilePhoto" className="my-2 flex cursor-pointer items-center gap-2 text-neutral-11 hover:text-green-11">
                <Image />
                <span>Ajouter une photo</span>
              </label>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={onClose} className="border border-neutral-8 bg-neutral-1 text-neutral-11 hover:bg-neutral-2">
              Annuler
            </Button>
            <Button type="submit" disabled={!preview || updatePhotoMutation.isPending}>
              {updatePhotoMutation.isPending ? <LoaderCircle className="animate-spin" size={20} /> : 'Sauvegarder'}
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default AddPhotoModal;
