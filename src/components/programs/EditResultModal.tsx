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

/**
 * Props du composant EditResultModal
 * @typedef {object} EditResultModalProps
 * @property {ExerciseResultType} result - Le résultat d'exercice à modifier
 * @property {() => void} closeModal - Fonction de fermeture du modal
 */
type EditResultModalProps = {
  results: ExerciseResult[];
  onClose: () => void;
};

/**
 * Modal de modification des résultats d'exercice
 * Fonctionnalités :
 * - Édition des séries (répétitions et poids)
 * - Validation des données
 * - Gestion dynamique des séries
 * - Retours visuels des actions
 * - Mise à jour en temps réel
 *
 * @component
 * @param {EditResultModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal d'édition des résultats
 */
function EditResultModal({ results, onClose }: EditResultModalProps) {
  const [sets, setSets] = useState(
    results.flatMap(result =>
      result.sets.map(set => ({
        id: set.id,
        reps: set.reps,
        weight: set.weight
      }))
    )
  );
  const queryClient = useQueryClient();

  /**
   * Type de données pour la mise à jour des séries
   */
  type SetInput = {
    id: string;
    reps: number;
    weight: number;
  };

  /**
   * Mutation pour la mise à jour des résultats
   */
  const updateResultsMutation = useMutation({
    mutationFn: async (data: { sets: SetInput[] }) => {
      const updatePromises = results.map(result => {
        const resultSets = data.sets.filter(set => result.sets.some(originalSet => originalSet.id === set.id));
        return updateResult(result.id, { sets: resultSets });
      });
      return Promise.all(updatePromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      onClose();
    },
    onError: () => {
      toast.error('Erreur lors de la modification des résultats');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateResultsMutation.mutate({ sets });
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
            <Button type="submit" isPending={updateResultsMutation.isPending}>
              Modifier
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditResultModal;
