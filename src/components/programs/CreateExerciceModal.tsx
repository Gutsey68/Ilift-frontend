import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { fetchExercices } from '../../services/exercicesService';
import { updateWorkoutExercices } from '../../services/workoutsService';
import { ExerciseType } from '../../types/exercicesType';
import Card from '../ui/Card';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

type AddExerciceModalProps = {
  closeModal: () => void;
  currentExercices: ExerciseType[];
};

function AddExerciceModal({ closeModal, currentExercices }: AddExerciceModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { id: workoutId } = useParams();
  const queryClient = useQueryClient();

  const { data: exercicesData, isPending } = useQuery({
    queryKey: ['exercices'],
    queryFn: fetchExercices
  });

  const addExerciceMutation = useMutation({
    mutationFn: (exerciceId: string) => {
      if (!workoutId) throw new Error('ID de séance manquant');
      const updatedExerciceIds = [...currentExercices.map(e => e.id), exerciceId];
      return updateWorkoutExercices(workoutId, updatedExerciceIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercices', workoutId] });
      toast.success('Exercice ajouté avec succès');
      closeModal(); // Ajout de cette ligne pour fermer la modale après succès
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de l'exercice");
    }
  });

  // Filtrer les exercices déjà ajoutés
  const filteredExercices = exercicesData?.data.filter(
    (exercice: ExerciseType) => !currentExercices.some(current => current.id === exercice.id) && exercice.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal onClose={closeModal}>
      <Card size="lg" className="modal-content max-h-[60vh] overflow-y-auto">
        <div className="relative flex w-full justify-center">
          <h2 className="mb-4 text-xl font-semibold">Ajouter un exercice</h2>
          <X onClick={closeModal} className="absolute right-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="mb-6 border-neutral-6" />
        <Input className="mb-8" placeholder="Rechercher un exercice" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        {isPending ? (
          <div className="flex justify-center">
            <LoaderCircle className="animate-spin" size={24} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredExercices?.map((exercice: ExerciseType) => (
              <div key={exercice.id} className="flex items-center justify-between">
                <p className="text-sm text-neutral-11">{exercice.name}</p>
                <button
                  onClick={() => addExerciceMutation.mutate(exercice.id)}
                  disabled={addExerciceMutation.isPending}
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-neutral-1 hover:bg-green-500"
                >
                  Ajouter
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Modal>
  );
}

export default AddExerciceModal;
