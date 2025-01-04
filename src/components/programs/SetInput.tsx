import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { createResult } from '../../services/resultsService';
import Button from '../ui/Button';
import NumberInput from '../ui/NumberInput';

type SetInputProps = {
  onClose: () => void;
};

type SetInput = {
  reps: number;
  weight: number;
};

function SetInput({ onClose }: SetInputProps) {
  const { id } = useParams();
  const [sets, setSets] = useState<SetInput[]>([{ reps: 0, weight: 0 }]);
  const queryClient = useQueryClient();

  const createResultMutation = useMutation({
    mutationFn: (data: { exerciceId: string; sets: SetInput[] }) => createResult(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      toast.success('Résultat ajouté avec succès');
      onClose();
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout du résultat");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    createResultMutation.mutate({ exerciceId: id, sets });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-neutral-6 p-4">
      {sets.map((set, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-11">Répétitions</label>
            <NumberInput
              value={set.reps}
              onChange={value => {
                const newSets = [...sets];
                newSets[index] = { ...set, reps: value };
                setSets(newSets);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-11">Kilogrammes</label>
            <NumberInput
              value={set.weight}
              onChange={value => {
                const newSets = [...sets];
                newSets[index] = { ...set, weight: value };
                setSets(newSets);
              }}
            />
          </div>
          <Trash
            onClick={() => setSets(sets.filter((_, i) => i !== index))}
            className="mb-2.5 ml-2 cursor-pointer self-end text-neutral-11 hover:text-red-11"
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setSets([...sets, { reps: 0, weight: 0 }])}
          className="flex items-center gap-2 text-sm text-neutral-11 hover:text-neutral-12"
        >
          <Plus size={16} />
          Ajouter une série
        </button>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={onClose} disabled={createResultMutation.isPending}>
            Annuler
          </Button>
          <Button size="sm" type="submit" isPending={createResultMutation.isPending}>
            Ajouter
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SetInput;
