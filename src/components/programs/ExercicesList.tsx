import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ExerciseType } from '../../types/exercicesType';

type ExercicesListProps = {
  exercices: ExerciseType[];
  workout: {
    name: string;
    id: string;
    program: {
      name: string;
      id: string;
    };
  };
};

function ExercicesList({ exercices, workout }: ExercicesListProps) {
  return (
    <>
      {exercices.map(exercice => (
        <div key={exercice.id}>
          <hr className="mb-4 border-neutral-6" />
          <div className="group flex items-center justify-between gap-8">
            <Link className="w-full" to={`/programmes/${workout.program.id}/exercices/${exercice.id}`}>
              <div className="group cursor-pointer">
                <h2 className="font-semibold group-hover:text-green-9">{exercice.name}</h2>
              </div>
            </Link>
            <Pencil className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100" />
          </div>
        </div>
      ))}
    </>
  );
}
export default ExercicesList;
