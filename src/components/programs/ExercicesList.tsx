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
          <hr className="border-neutral-6" />
          <Link to={`/programmes/${workout.program.id}/exercices/${exercice.id}`}>
            <div className="group mt-4 cursor-pointer">
              <h2 className="font-semibold group-hover:text-green-9">{exercice.name}</h2>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
export default ExercicesList;
