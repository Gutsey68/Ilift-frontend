import { useState } from 'react';
import Button from '../ui/Button';
import { Input } from '../ui/Input';

type SetInputProps = {
  onClose: () => void;
};

function SetInput({ onClose }: SetInputProps) {
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <>
      <hr className="border-neutral-6" />

      <form className="my-4 mr-auto flex flex-col gap-4 lg:w-1/4">
        <div>
          <label className="mb-2 text-neutral-11" htmlFor="reps">
            Répétitions
          </label>
          <Input type="number" id="reps" value={reps} onChange={e => setReps(e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 text-neutral-11" htmlFor="weight">
            Poids
          </label>
          <Input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} required />
        </div>
        <Button type="submit">Ajouter</Button>
        <Button className="border border-neutral-8 bg-neutral-1 text-neutral-11 shadow-sm hover:bg-neutral-2" onClick={onClose}>
          Annuler
        </Button>
      </form>
    </>
  );
}

export default SetInput;
