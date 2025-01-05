import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { deleteProgram, updateProgram } from '../../services/programsService';
import { ProgramType } from '../../types/programsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditProgramModal from './EditProgramModal';
import ProgramCard from './ProgramCard';

type ProgramsListProps = {
  programs: ProgramType[];
};

function ProgramsList({ programs }: ProgramsListProps) {
  const [programToEdit, setProgramToEdit] = useState<ProgramType | null>(null);
  const [programToDelete, setProgramToDelete] = useState<ProgramType | null>(null);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

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

  const updatePositionMutation = useMutation({
    mutationFn: (params: { id: string; position: number }) => updateProgram(params.id, { position: params.position }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs', user?.id] });
    }
  });

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
