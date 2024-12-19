import { useState } from 'react';
import Button from '../ui/Button';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';
import { Textarea } from '../ui/Textarea';

type CreateProgramModalProps = {
  closeModal: () => void;
};

function CreateProgramModal({ closeModal }: CreateProgramModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ...
    closeModal();
  };

  return (
    <Modal onClose={closeModal}>
      <div className="rounded-md border border-neutral-6 bg-neutral-1 p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Créer un programme</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type="text" placeholder="Nom du programme" value={name} onChange={e => setName(e.target.value)} className="rounded border p-2" required />
          <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="rounded border p-2" required />
          <Button type="submit">Créer</Button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateProgramModal;
