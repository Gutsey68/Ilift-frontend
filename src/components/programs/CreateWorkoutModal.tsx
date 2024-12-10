import { useState } from 'react';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

type CreateWorkoutModalProps = {
  closeModal: () => void;
};

function CreateWorkoutModal({ closeModal }: CreateWorkoutModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ...
    closeModal();
  };

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 flex items-center justify-center bg-transparent/80">
      <div onClick={e => e.stopPropagation()} className="relative mb-[60vh] w-full max-sm:px-4 sm:w-1/3">
        <div className="flex flex-col gap-4 rounded-md border border-neutral-6 bg-neutral-1 p-4 shadow-lg lg:right-32">
          <p className="mb-2 text-lg">Ajouter une séance</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input type="text" placeholder="Nom de la séance" value={name} onChange={e => setName(e.target.value)} className="rounded border p-2" required />
            <Button type="submit">Créer</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkoutModal;
