import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteProgram } from '../../services/programsService';
import { ProgramType } from '../../types/programsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditProgramModal from './EditProgramModal';

type ProgramsListProps = {
  programs: ProgramType[];
};

function ProgramsList({ programs }: ProgramsListProps) {
  const [programToEdit, setProgramToEdit] = useState<ProgramType | null>(null);
  const [programToDelete, setProgramToDelete] = useState<ProgramType | null>(null);
  const queryClient = useQueryClient();

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

  return (
    <>
      <div>
        {programs.map(program => (
          <div key={program.id}>
            <hr className="border-neutral-6" />
            <div className="group flex items-center justify-between gap-8">
              <Link className="w-full" to={`/programmes/${program.id}`}>
                <div className="group mb-4 cursor-pointer">
                  <h2 className="mt-3 font-semibold group-hover:text-green-9">{program.name}</h2>
                  <p className="text-sm text-neutral-10 max-sm:text-xs">{program.description}</p>
                </div>
              </Link>
              <div className="flex gap-4">
                <Pencil
                  onClick={e => {
                    e.preventDefault();
                    setProgramToEdit(program);
                  }}
                  className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100"
                />
                <Trash
                  onClick={e => {
                    e.preventDefault();
                    setProgramToDelete(program);
                  }}
                  className="inline-block cursor-pointer opacity-0 hover:text-red-11 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
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
      )}
    </>
  );
}

export default ProgramsList;
