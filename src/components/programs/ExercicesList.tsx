import { Link } from 'react-router-dom';
import { ExerciseType } from '../../types/exercicesType';

type ExercicesListProps = {
  exercices: ExerciseType[];
};

function ExercicesList({ exercices }: ExercicesListProps) {
  return (
    <>
      {exercices.map(exercice => (
        <>
          <hr className="border-neutral-6" />
          <Link key={exercice.id} to={`/programmes/${exercice.workouts[0].workout.id}/exercices/${exercice.id}`}>
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
