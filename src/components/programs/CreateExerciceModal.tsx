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

/**
 * Props du composant AddExerciceModal
 * @typedef {object} AddExerciceModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 * @property {ExerciseType[]} currentExercices - Liste des exercices actuels
 */
type AddExerciceModalProps = {
  closeModal: () => void;
  currentExercices: ExerciseType[];
};

/**
 * Filtre les exercices selon les critères de recherche
 * @param {ExerciseType[]} exercices - Liste complète des exercices
 * @param {ExerciseType[]} currentExercices - Exercices déjà sélectionnés
 * @param {string} searchTerm - Terme de recherche
 * @param {string} selectedMuscleGroup - Groupe musculaire sélectionné
 * @returns {ExerciseType[]} Liste des exercices filtrés
 */
const filterExercices = (exercices: ExerciseType[], currentExercices: ExerciseType[], searchTerm: string, selectedMuscleGroup: string) => {
  return exercices?.filter(exercice => {
    const matchesSearch = exercice.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || exercice.musclesGroups?.some(mg => mg.muscleGroups?.id === selectedMuscleGroup);

    return matchesSearch && matchesMuscleGroup && !currentExercices.some(current => current.id === exercice.id);
  });
};

/**
 * Modal d'ajout d'exercices à une séance
 * Fonctionnalités :
 * - Recherche d'exercices en temps réel
 * - Filtrage par groupe musculaire
 * - Exclusion des exercices déjà ajoutés
 * - Ajout avec feedback visuel
 * - État de chargement
 *
 * @component
 * @param {AddExerciceModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal d'ajout d'exercices
 */
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
