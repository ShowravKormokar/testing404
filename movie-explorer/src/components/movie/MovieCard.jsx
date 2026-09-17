import MovieRating from './MovieRating'
import MovieMeta from './MovieMeta'
import { posterFallbackLabel } from '../../features/movies/movie.utils'

function MovieCard({ movie, onSeeDetails }) {
  const { id, title, poster, year, genres, rating } = movie

  const handleClick = () => {
    if (typeof onSeeDetails === 'function') {
      onSeeDetails(movie)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <article className="card-hover group relative flex flex-col overflow-hidden">
      <div className="relative aspect-2/3 w-full overflow-hidden bg-bg-elevated">
        {poster ? (
          <img
            src={poster}
            alt={`${title} poster`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-accent/20 to-bg-card p-4 text-center"
            aria-label={`Missing poster for ${title}`}
          >
            <span className="text-3xl font-bold text-accent">
              {posterFallbackLabel(title)}
            </span>
            <span className="mt-1 text-xs text-text-muted">No poster</span>
          </div>
        )}

        <div className="absolute top-2 right-2">
          <MovieRating rating={rating} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3
          className="line-clamp-2 text-sm font-semibold leading-snug text-text transition-colors group-hover:text-accent"
          title={title}
        >
          {title}
        </h3>
        <MovieMeta year={year} genres={genres} />

        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className="btn-primary w-full justify-center text-center"
            aria-label={`See details for ${title}`}
          >
            See Details
          </button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard