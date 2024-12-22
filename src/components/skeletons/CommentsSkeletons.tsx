function CommentsSkeletons() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map(item => (
        <div key={item} className="flex flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <div className="size-10 rounded-full bg-neutral-4"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 rounded bg-neutral-4"></div>
              <div className="h-3 w-16 rounded bg-neutral-4"></div>
            </div>
          </div>
          <div className="ml-12">
            <div className="h-4 w-3/4 rounded bg-neutral-4"></div>
          </div>
          <hr className="border-neutral-6" />
        </div>
      ))}
    </div>
  );
}

export default CommentsSkeletons;
