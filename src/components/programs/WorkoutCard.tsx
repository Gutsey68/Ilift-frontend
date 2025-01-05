import { Pencil, Trash } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { WorkoutType } from '../../types/workoutsType';

type DragItem = {
  id: string;
  index: number;
};

type WorkoutCardProps = {
  workout: WorkoutType;
  index: number;
  onEdit: (workout: WorkoutType) => void;
  onDelete: (workout: WorkoutType) => void;
  moveWorkout: (dragIndex: number, hoverIndex: number) => void;
};

export default function WorkoutCard({ workout, index, onEdit, onDelete, moveWorkout }: WorkoutCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'WORKOUT',
    item: { id: workout.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'WORKOUT',
    hover: (item: DragItem) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveWorkout(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  return (
    <div ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <hr className="mb-4 border-neutral-6" />
      <div className="group mb-4 flex items-center justify-between gap-8">
        <Link className="w-full" to={`/programmes/${workout.id}/exercices`}>
          <div className="group cursor-pointer">
            <h2 className="font-semibold group-hover:text-green-9">{workout.name}</h2>
          </div>
        </Link>
        <div className="flex gap-4">
          <Pencil
            onClick={e => {
              e.preventDefault();
              onEdit(workout);
            }}
            className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100"
          />
          <Trash
            onClick={e => {
              e.preventDefault();
              onDelete(workout);
            }}
            className="inline-block cursor-pointer opacity-0 hover:text-red-11 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
