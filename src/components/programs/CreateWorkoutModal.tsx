import { useState } from 'react';
import Button from '../ui/Button';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

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
    <Modal onClose={closeModal}>
      <div className="flex flex-col gap-4 rounded-md border border-neutral-6 bg-neutral-1 p-4 shadow-lg lg:right-32">
        <p className="mb-2 text-lg">Ajouter une séance</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type="text" placeholder="Nom de la séance" value={name} onChange={e => setName(e.target.value)} className="rounded border p-2" required />
          <Button type="submit">Créer</Button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateWorkoutModal;
