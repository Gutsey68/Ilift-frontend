function ExerciceResultsSkeletons() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index}>
          <hr className="my-6 border-neutral-6" />
          <div className="mb-8 mt-2 animate-pulse">
            <div className="mb-2 h-4 w-24 rounded-full bg-neutral-4"></div>
            <div className="mt-3 h-6 w-1/4 rounded-full bg-neutral-4"></div>
            <div className="mt-3 h-6 w-1/4 rounded-full bg-neutral-4"></div>
            <div className="mt-3 h-6 w-1/4 rounded-full bg-neutral-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ExerciceResultsSkeletons;
