import MovieCard from '../../../components/movie/MovieCard'
import MovieGrid from '../../../components/movie/MovieGrid'

function MovieList({ movies, query = '', onSeeDetails }) {
  if (!Array.isArray(movies) || movies.length === 0) {
    const heading = query ? `No movies found for "${query}"` : 'No movies found'
    const description = query
      ? 'Try a different search term or clear the search to browse all shows.'
      : 'The catalog is currently empty. Please try again later.'

    return (
      <div className="error-state">
        <span className="text-4xl" aria-hidden="true">
          🎬
        </span>
        <h3 className="text-lg font-semibold text-text">{heading}</h3>
        <p className="max-w-sm text-sm text-text-muted">{description}</p>
      </div>
    )
  }

  return (
    <MovieGrid>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSeeDetails={onSeeDetails} />
      ))}
    </MovieGrid>
  )
}

export default MovieList