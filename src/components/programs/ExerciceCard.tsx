import { GripVertical, Trash } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { ExerciseType } from '../../types/exercicesType';

type ExerciceCardProps = {
  exercice: ExerciseType;
  index: number;
  workoutId: string;
  onDelete: (exercice: ExerciseType) => void;
  moveExercice: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
  id: string;
  index: number;
};

export default function ExerciceCard({ exercice, index, workoutId, onDelete, moveExercice }: ExerciceCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'EXERCICE',
    item: { id: exercice.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'EXERCICE',
    hover: (item: DragItem) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveExercice(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  return (
    <div ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <hr className="mb-4 border-neutral-6" />
      <div className="group mb-4 flex items-center justify-between gap-4">
        <Link className="w-full" to={`/programmes/${workoutId}/exercices/${exercice.id}`}>
          <div className="group cursor-pointer">
            <h2 className="font-semibold group-hover:text-green-9">{exercice.name}</h2>
          </div>
        </Link>
        <Trash
          onClick={e => {
            e.preventDefault();
            onDelete(exercice);
          }}
          className="inline-block cursor-pointer text-neutral-11 hover:text-red-11 max-lg:text-red-11"
        />
        <GripVertical className="cursor-grab text-neutral-11" />
      </div>
    </div>
  );
}
