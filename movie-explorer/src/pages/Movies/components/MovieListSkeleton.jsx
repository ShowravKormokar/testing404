function MovieListSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="aspect-2/3 w-full bg-bg-elevated">
            <div className="skeleton h-full w-full" />
          </div>
          <div className="flex flex-col gap-2 p-3 sm:p-4">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
            <div className="mt-auto pt-3">
              <div className="skeleton h-9 w-full rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieListSkeleton