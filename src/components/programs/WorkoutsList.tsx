import { Link } from 'react-router-dom';
import { WorkoutType } from '../../types/workoutsType';

type WorkoutsListProps = {
  workouts: WorkoutType[];
};

function WorkoutsList({ workouts }: WorkoutsListProps) {
  return (
    <>
      {workouts.map(workout => (
        <div key={workout.id}>
          <hr className="border-neutral-6" />
          <Link to={`/programmes/${workout.id}/exercices`}>
            <div className="group mt-4 cursor-pointer">
              <h2 className="font-semibold group-hover:text-green-9">{workout.name}</h2>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
export default WorkoutsList;
