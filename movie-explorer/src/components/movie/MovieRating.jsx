function MovieRating({ rating, size = 'sm' }) {
  const sizeClass = size === 'lg' ? 'text-base' : 'text-sm'
  const starSize = size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'

  if (rating === null || rating === undefined) {
    return <span className={`text-text-faint ${sizeClass}`}>N/A</span>
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-accent ${sizeClass}`}
      aria-label={`Rating: ${rating.toFixed(1)} out of 10`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={starSize}
        aria-hidden="true"
      >
        <path d="M10.05 1.95l2.47 5.01 5.53.81-4 3.91.94 5.49L10 15.32l-4.99 2.63.94-5.49-4-3.91 5.53-.81 2.47-5.01z" />
      </svg>
      <span className="font-semibold text-text">{rating.toFixed(1)}</span>
    </span>
  )
}

export default MovieRating