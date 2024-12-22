import { Image, LoaderCircle, X } from 'lucide-react';
import { useRef, useState } from 'react';
import Button from './Button';
import Card from './Card';
import Modal from './Modal';

type AddPhotoModalProps = {
  onClose: () => void;
  onConfirm: (file: File) => void;
  isLoading?: boolean;
};

function AddPhotoModal({ onClose, onConfirm, isLoading }: AddPhotoModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      onConfirm(file);
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
        <input type="file" id="photoInput" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        <div className="flex flex-col items-center gap-4">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Aperçu" className="size-48 rounded-lg object-cover" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -right-2 -top-2 rounded-full bg-neutral-12 p-1 text-neutral-1 hover:bg-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="photoInput"
              className="flex cursor-pointer flex-col items-center gap-2 text-neutral-11 hover:text-green-11"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={48} />
              <span>Cliquez pour sélectionner une image</span>
            </label>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="border border-neutral-8 bg-neutral-1 text-neutral-11 hover:bg-neutral-2">
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!preview || isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" size={20} /> : 'Sauvegarder'}
          </Button>
        </div>
      </Card>
    </Modal>
  );
}

export default AddPhotoModal;
