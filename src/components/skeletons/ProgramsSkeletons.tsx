function ProgramsSkeletons() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div key={index}>
          <div className="animate-pulse">
            <div className="mb-2 h-5 w-1/6 rounded-full bg-neutral-4"></div>
            <div className="h-4 w-1/3 rounded-full bg-neutral-4"></div>
          </div>
          <hr className="my-4 border-neutral-6" />
        </div>
      ))}
    </div>
  );
}
export default ProgramsSkeletons;
