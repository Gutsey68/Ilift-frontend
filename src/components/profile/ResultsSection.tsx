import { X } from 'lucide-react';
import { ExerciseResultPost } from '../../types/exerciceResultsType';
import Badge from '../ui/Badge';

type ResultsSectionProps = {
  exercicesResultsPosts: ExerciseResultPost[];
};

function ResultsSection({ exercicesResultsPosts }: ResultsSectionProps) {
  if (!exercicesResultsPosts?.length) return null;

  return (
    <div className="mt-4 rounded-lg bg-neutral-3 p-4">
      {exercicesResultsPosts.map(({ exercicesResults: result }) => (
        <div key={result.id} className="group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge>{new Date(result.createdAt).toLocaleDateString()}</Badge>
              <span className="font-semibold text-neutral-12">{result.exercice.name}</span>
            </div>
          </div>
          <hr className="my-4 border-neutral-6" />
          {result.sets.map((set, index) => (
            <div key={set.id} className="my-2 flex items-center gap-8">
              <p className="text-neutral-10">série {index + 1}</p>
              <p className="flex items-center gap-1 text-xl text-neutral-11">
                <span className="font-semibold text-green-9">{set.reps}</span> reps <X /> <span className="font-semibold text-green-9">{set.weight}</span> kg
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResultsSection;
