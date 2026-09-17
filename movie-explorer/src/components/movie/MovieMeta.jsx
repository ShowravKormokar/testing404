import { formatGenres, formatYear } from '../../features/movies/movie.utils'

function MovieMeta({ year, genres, runtime, className = '' }) {
  const parts = []

  if (year) parts.push(formatYear(year))
  if (runtime) parts.push(`${runtime} min`)
  if (Array.isArray(genres) && genres.length > 0) parts.push(formatGenres(genres, 2))

  if (parts.length === 0) {
    return <span className={`text-text-faint text-sm ${className}`}>No metadata</span>
  }

  return (
    <p className={`text-sm text-text-muted ${className}`}>
      {parts.join(' · ')}
    </p>
  )
}

export default MovieMeta