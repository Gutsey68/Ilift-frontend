import { Link } from 'react-router-dom';
import { Workout } from '../../types/workoutsType';

type WorkoutsListProps = {
  workouts: Workout[];
};

function WorkoutsList({ workouts }: WorkoutsListProps) {
  return (
    <>
      {workouts.map(workout => (
        <>
          <hr className="border-neutral-6" />
          <Link key={workout.id} to={`/programmes/${workout.id}/exercices`}>
            <div className="group cursor-pointer">
              <h2 className="font-semibold group-hover:text-green-9">{workout.name}</h2>
            </div>
          </Link>
        </>
      ))}
    </>
  );
}
export default WorkoutsList;
