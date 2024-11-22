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
        <>
          <hr className="border-neutral-6" />
          <Link key={exercice.id} to={`/programmes/${workout.program.id}/exercices/${exercice.id}`}>
            <div className="group cursor-pointer">
              <h2 className="font-semibold group-hover:text-green-9">{exercice.name}</h2>
            </div>
          </Link>
        </>
      ))}
    </>
  );
}
export default ExercicesList;
