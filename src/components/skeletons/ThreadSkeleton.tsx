function ThreadSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-6xl animate-pulse gap-6">
      <div className="flex w-1/4 flex-col">
        <div className="h-96 rounded-md bg-neutral-2"></div>
      </div>
      <div className="mb-10 flex w-2/4 flex-col">
        <div className="mb-6 h-32 rounded bg-neutral-2"></div>
        <div className="h-64 rounded-md bg-neutral-2"></div>
      </div>
      <div className="flex w-1/4 flex-col">
        <div className="h-96 rounded-md bg-neutral-2"></div>
      </div>
    </div>
  );
}
export default ThreadSkeleton;
