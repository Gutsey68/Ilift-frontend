import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateResult } from '../../services/resultsService';
import { ExerciseResult } from '../../types/exerciceResultsType';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import NumberInput from '../ui/NumberInput';

type EditResultModalProps = {
  result: ExerciseResult;
  onClose: () => void;
};

type SetInput = {
  reps: number;
  weight: number;
};

function EditResultModal({ result, onClose }: EditResultModalProps) {
  const [sets, setSets] = useState<SetInput[]>(
    result.sets.map(set => ({
      reps: set.reps,
      weight: set.weight
    }))
  );
  const queryClient = useQueryClient();

  const updateResultMutation = useMutation({
    mutationFn: (data: { sets: SetInput[] }) => updateResult(result.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      toast.success('Résultat modifié avec succès');
      onClose();
    },
    onError: () => {
      toast.error('Erreur lors de la modification du résultat');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateResultMutation.mutate({ sets });
  };

  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Modifier le résultat</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="secondary">
              Annuler
            </Button>
            <Button type="submit" isPending={updateResultMutation.isPending}>
              Modifier
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditResultModal;
