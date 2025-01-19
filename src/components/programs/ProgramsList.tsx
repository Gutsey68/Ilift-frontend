import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { deleteProgram, updateProgram } from '../../services/programsService';
import { ProgramType } from '../../types/programsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditProgramModal from './EditProgramModal';
import ProgramCard from './ProgramCard';

/**
 * Props du composant ProgramsList
 * @typedef {object} ProgramsListProps
 * @property {ProgramType[]} programs - Liste des programmes à afficher
 */
type ProgramsListProps = {
  programs: ProgramType[];
};

/**
 * Liste des programmes avec fonctionnalités de gestion
 * Fonctionnalités :
 * - Affichage des programmes
 * - Édition et suppression
 * - Réorganisation par drag & drop
 * - Gestion des confirmations
 * - Mise à jour en temps réel
 *
 * @component
 * @param {ProgramsListProps} props - Les propriétés du composant
 * @returns {JSX.Element} Liste interactive des programmes
 */
function ProgramsList({ programs }: ProgramsListProps) {
  const [programToEdit, setProgramToEdit] = useState<ProgramType | null>(null);
  const [programToDelete, setProgramToDelete] = useState<ProgramType | null>(null);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  /**
   * Mutation pour la suppression d'un programme
   */
  const deleteProgramMutation = useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast.success('Programme supprimé avec succès');
      setProgramToDelete(null);
    },
    onError: () => {
      toast.error('Erreur lors de la suppression du programme');
    }
  });

  /**
   * Mutation pour la mise à jour de la position d'un programme
   */
  const updatePositionMutation = useMutation({
    mutationFn: (params: { id: string; position: number }) => updateProgram(params.id, { position: params.position }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs', user?.id] });
    }
  });

  /**
   * Gère le déplacement d'un programme dans la liste
   */
  const moveProgram = (dragIndex: number, hoverIndex: number) => {
    const draggedProgram = programs[dragIndex];

    updatePositionMutation.mutate({
      id: draggedProgram.id,
      position: hoverIndex + 1
    });
  };

  return (
    <>
      <div>
        {programs.map((program, index) => (
          <ProgramCard key={program.id} program={program} index={index} onEdit={setProgramToEdit} onDelete={setProgramToDelete} moveProgram={moveProgram} />
        ))}
      </div>
      {programToEdit && <EditProgramModal program={programToEdit} onClose={() => setProgramToEdit(null)} />}
      {programToDelete && (
        <ConfirmDeleteModal
          title="Supprimer le programme"
          message={`Êtes-vous sûr de vouloir supprimer le programme "${programToDelete.name}" ?`}
          onClose={() => setProgramToDelete(null)}
          onConfirm={() => deleteProgramMutation.mutate(programToDelete.id)}
          isLoading={deleteProgramMutation.isPending}
        />
      )}{' '}
    </>
  );
}
export default ProgramsList;
