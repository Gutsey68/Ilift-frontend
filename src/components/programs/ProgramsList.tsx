import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import { useContext, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { deleteProgram, updateProgram } from '../../services/programsService';
import { ProgramType } from '../../types/programsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditProgramModal from './EditProgramModal';

type ProgramsListProps = {
  programs: ProgramType[];
};

type DragItem = {
  id: string;
  index: number;
};

type ProgramCardProps = {
  program: ProgramType;
  index: number;
  onEdit: (program: ProgramType) => void;
  onDelete: (program: ProgramType) => void;
  moveProgram: (dragIndex: number, hoverIndex: number) => void;
};

function ProgramCard({ program, index, onEdit, onDelete, moveProgram }: ProgramCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'PROGRAM',
    item: { id: program.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'PROGRAM',
    hover: (item: DragItem) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveProgram(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  return (
    <div ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
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
              onEdit(program);
            }}
            className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100"
          />
          <Trash
            onClick={e => {
              e.preventDefault();
              onDelete(program);
            }}
            className="inline-block cursor-pointer opacity-0 hover:text-red-11 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}

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
