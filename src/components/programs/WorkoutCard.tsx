import { GripVertical, Pencil, Trash } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { WorkoutType } from '../../types/workoutsType';

/**
 * Type pour l'élément en cours de glisser-déposer
 * @typedef {object} DragItem
 * @property {string} id - Identifiant de la séance
 * @property {number} index - Position dans la liste
 */
type DragItem = {
  id: string;
  index: number;
};

/**
 * Props du composant WorkoutCard
 * @typedef {object} WorkoutCardProps
 * @property {WorkoutType} workout - La séance à afficher
 * @property {number} index - Position dans la liste
 * @property {(workout: WorkoutType) => void} onEdit - Fonction d'édition
 * @property {(workout: WorkoutType) => void} onDelete - Fonction de suppression
 * @property {(dragIndex: number, hoverIndex: number) => void} moveWorkout - Fonction de réorganisation
 */
type WorkoutCardProps = {
  workout: WorkoutType;
  index: number;
  onEdit: (workout: WorkoutType) => void;
  onDelete: (workout: WorkoutType) => void;
  moveWorkout: (dragIndex: number, hoverIndex: number) => void;
};

/**
 * Carte de séance avec fonctionnalités de glisser-déposer
 * Fonctionnalités :
 * - Affichage des informations de la séance
 * - Actions d'édition et suppression
 * - Réorganisation par drag & drop
 * - Navigation vers les exercices
 *
 * @component
 * @param {WorkoutCardProps} props - Les propriétés du composant
 * @returns {JSX.Element} Carte de séance interactive
 */
export default function WorkoutCard({ workout, index, onEdit, onDelete, moveWorkout }: WorkoutCardProps) {
  /**
   * Configuration du drag & drop
   */
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
        <div className="flex gap-4 text-neutral-11">
          <Pencil
            onClick={e => {
              e.preventDefault();
              onEdit(workout);
            }}
            className="ml-2 inline-block cursor-pointer hover:text-green-11 max-lg:text-green-11"
          />
          <Trash
            onClick={e => {
              e.preventDefault();
              onDelete(workout);
            }}
            className="inline-block cursor-pointer hover:text-red-11 max-lg:text-red-11"
          />
          <GripVertical className="cursor-grab" />
        </div>
      </div>
    </div>
  );
}
