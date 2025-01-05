import { GripVertical, Pencil, Trash } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { ProgramType } from '../../types/programsType';

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

export default function ProgramCard({ program, index, onEdit, onDelete, moveProgram }: ProgramCardProps) {
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
        <div className="flex gap-4 text-neutral-11">
          <Pencil
            onClick={e => {
              e.preventDefault();
              onEdit(program);
            }}
            className="ml-2 inline-block cursor-pointer hover:text-green-11 max-lg:text-green-11"
          />
          <Trash
            onClick={e => {
              e.preventDefault();
              onDelete(program);
            }}
            className="inline-block cursor-pointer hover:text-red-11 max-lg:text-red-11"
          />
          <GripVertical className="cursor-grab" />
        </div>
      </div>
    </div>
  );
}
