import { X } from 'lucide-react';
import { ExerciseResultPost } from '../../types/exerciceResultsType';
import Badge from '../ui/Badge';

type ResultsSectionProps = {
  exercicesResultsPosts: ExerciseResultPost[];
};

type GroupedResults = {
  date: string;
  exerciseName: string;
  sets: Array<{ id: string; reps: number; weight: number }>;
};

function ResultsSection({ exercicesResultsPosts }: ResultsSectionProps) {
  if (!exercicesResultsPosts?.length) return null;

  const groupedResults = exercicesResultsPosts.reduce<GroupedResults[]>((acc, { exercicesResults: result }) => {
    const date = new Date(result.createdAt).toLocaleDateString();
    const exerciseName = result.exercice.name;

    const existingGroup = acc.find(group => group.date === date && group.exerciseName === exerciseName);

    if (existingGroup) {
      existingGroup.sets.push(...result.sets);
    } else {
      acc.push({
        date,
        exerciseName,
        sets: [...result.sets]
      });
    }

    return acc;
  }, []);

  return (
    <div className="mt-4 rounded-lg bg-neutral-3 p-4">
      {groupedResults.map((group, index) => (
        <div key={index} className="group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge>{group.date}</Badge>
              <span className="font-semibold text-neutral-12">{group.exerciseName}</span>
            </div>
          </div>
          <hr className="my-4 border-neutral-6" />
          {group.sets.map((set, setIndex) => (
            <div key={set.id} className="my-2 flex items-center gap-8">
              <p className="text-neutral-10">série {setIndex + 1}</p>
              <p className="flex items-center gap-1 text-xl text-neutral-11">
                <span className="font-semibold text-green-9">{set.reps}</span> reps <X />
                <span className="font-semibold text-green-9">{set.weight}</span> kg
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResultsSection;
