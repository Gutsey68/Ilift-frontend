import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import MuscleGroupSelect from '../../pages/MusclesPage';
import { fetchExercices } from '../../services/exercicesService';
import { updateWorkoutExercices } from '../../services/workoutsService';
import { AllExercisesResponseType, ExerciseType } from '../../types/exercicesType';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

type AddExerciceModalProps = {
  closeModal: () => void;
  currentExercices: ExerciseType[];
};

const filterExercices = (exercices: ExerciseType[], currentExercices: ExerciseType[], searchTerm: string, selectedMuscleGroup: string) => {
  return exercices?.filter(exercice => {
    const matchesSearch = exercice.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || exercice.musclesGroups?.some(mg => mg.muscleGroups?.id === selectedMuscleGroup);

    return matchesSearch && matchesMuscleGroup && !currentExercices.some(current => current.id === exercice.id);
  });
};

function AddExerciceModal({ closeModal, currentExercices }: AddExerciceModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const { id: workoutId } = useParams();
  const queryClient = useQueryClient();

  const { data: exercicesData, isPending } = useQuery<AllExercisesResponseType>({
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
      closeModal();
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de l'exercice");
    }
  });

  const filteredExercices = exercicesData?.data ? filterExercices(exercicesData.data, currentExercices, searchTerm, selectedMuscleGroup) : [];

  return (
    <Modal onClose={closeModal}>
      <Card size="lg" className="modal-content max-h-[60vh] overflow-y-auto">
        <div className="relative flex w-full justify-center">
          <h2 className="mb-4 text-xl font-semibold">Ajouter un exercice</h2>
          <X onClick={closeModal} className="absolute right-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="mb-6 border-neutral-6" />
        <div className="mb-4 flex flex-col gap-4">
          <Input className="mb-4" placeholder="Rechercher un exercice" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <MuscleGroupSelect value={selectedMuscleGroup} onChange={setSelectedMuscleGroup} />
        </div>
        {isPending ? (
          <div className="flex justify-center">
            <LoaderCircle className="animate-spin" size={24} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredExercices?.map((exercice: ExerciseType) => (
              <div key={exercice.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-11">{exercice.name}</p>
                  <p className="text-xs text-neutral-10">{exercice.musclesGroups?.map(mg => mg.muscleGroups.name).join(', ')}</p>
                </div>
                <Button onClick={() => addExerciceMutation.mutate(exercice.id)} isPending={addExerciceMutation.isPending} size="sm" variant="secondary">
                  Ajouter
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Modal>
  );
}

export default AddExerciceModal;
