function ExercicesSkeletons() {
  return (
    <div>
      {[...Array(4)].map((_, index) => (
        <div key={index}>
          <hr className="my-4 border-neutral-6" />
          <div className="animate-pulse cursor-pointer">
            <div className="mb-2 h-5 w-1/6 rounded-full bg-neutral-4"></div>
            <div className="h-4 w-1/3 rounded-full bg-neutral-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ExercicesSkeletons;
