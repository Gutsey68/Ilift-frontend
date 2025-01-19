import { GripVertical, Pencil, Trash } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { ProgramType } from '../../types/programsType';

/**
 * Type pour l'élément en cours de glisser-déposer
 * @typedef {object} DragItem
 * @property {string} id - Identifiant du programme
 * @property {number} index - Position dans la liste
 */
type DragItem = {
  id: string;
  index: number;
};

/**
 * Props du composant ProgramCard
 * @typedef {object} ProgramCardProps
 * @property {ProgramType} program - Le programme à afficher
 * @property {number} index - Position dans la liste
 * @property {(program: ProgramType) => void} onEdit - Fonction d'édition
 * @property {(program: ProgramType) => void} onDelete - Fonction de suppression
 * @property {(dragIndex: number, hoverIndex: number) => void} moveProgram - Fonction de réorganisation
 */
type ProgramCardProps = {
  program: ProgramType;
  index: number;
  onEdit: (program: ProgramType) => void;
  onDelete: (program: ProgramType) => void;
  moveProgram: (dragIndex: number, hoverIndex: number) => void;
};

/**
 * Carte de programme avec fonctionnalités de glisser-déposer
 * Fonctionnalités :
 * - Affichage des informations du programme
 * - Actions d'édition et suppression
 * - Réorganisation par drag & drop
 * - Navigation vers les détails
 *
 * @component
 * @param {ProgramCardProps} props - Les propriétés du composant
 * @returns {JSX.Element} Carte de programme interactive
 */
export default function ProgramCard({ program, index, onEdit, onDelete, moveProgram }: ProgramCardProps) {
  /**
   * Configuration du drag & drop
   */
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
