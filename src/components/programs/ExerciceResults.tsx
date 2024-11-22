import { ExerciseResult } from '../../types/exerciceResultsType';

type ExerciceResultsProps = {
  results: ExerciseResult[];
};

function ExerciceResults({ results }: ExerciceResultsProps) {
  return (
    <>
      {results.map(result => (
        <div key={result.id}>
          <hr className="mb-5 border-neutral-6" />
          <p className="w-fit border-b border-green-9">{new Date(result.createdAt).toLocaleDateString()}</p>
          {result.sets.map((set, index) => (
            <div key={set.id} className="my-2 flex items-center gap-8">
              <p className="text-neutral-10">série {index + 1}</p>
              <p className="flex items-center gap-1 text-xl">
                <span className="text-2xl font-semibold text-green-9">{set.reps}</span> reps X{' '}
                <span className="text-2xl font-semibold text-green-9">{set.weight}</span> kilos
              </p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
export default ExerciceResults;
