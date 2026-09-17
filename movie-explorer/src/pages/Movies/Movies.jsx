import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useMovieDetails, useMovieList } from '../../features/movies/movie.hooks'
import { useDebounce } from '../../hooks/useDebounce'
import MovieDetailsModal from '../../components/movie/MovieDetailsModal'
import MovieList from './components/MovieList'
import MovieListSkeleton from './components/MovieListSkeleton'
import SearchBar from './components/SearchBar'

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState('')

  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    setInputValue(urlQuery)
  }, [searchParams])

  const { debouncedValue } = useDebounce(inputValue, 400)

  useEffect(() => {
    const next = new URLSearchParams(searchParams)
    if (debouncedValue.trim().length > 0) {
      next.set('q', debouncedValue.trim())
    } else {
      next.delete('q')
    }
    const nextString = next.toString()
    const currentString = searchParams.toString()
    if (nextString !== currentString) {
      setSearchParams(next, { replace: true })
    }
  }, [debouncedValue, searchParams, setSearchParams])

  const query = useMemo(() => debouncedValue.trim(), [debouncedValue])
  const { movies, loading, error, retry } = useMovieList(query)

  const {
    details: detailsData,
    loading: detailsLoading,
    error: detailsError,
    retry: retryDetails,
  } = useMovieDetails(selectedMovieId)

  useEffect(() => {
    if (detailsData) {
      setSelectedMovie(detailsData)
    }
  }, [detailsData])

  const isSearching = inputValue.trim().length > 0 && debouncedValue !== inputValue

  const handleSeeDetails = (movie) => {
    setSelectedMovieId(movie.id)
    setSelectedMovie(movie)
  }

  const closeModal = () => {
    setSelectedMovieId(null)
    setSelectedMovie(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="section-title mt-2">Browse Movies &amp; Shows</h1>
          <p className="section-subtitle">
            Search by title or browse the full catalog.
          </p>
        </div>
        <Link to="/" className="btn-ghost self-start sm:self-auto">
          ← Back to Home
        </Link>
      </div>

      <div className="card p-3 sm:p-4">
        <SearchBar
          value={inputValue}
          onSearch={setInputValue}
          isSearching={isSearching}
        />
      </div>

      {loading ? (
        <MovieListSkeleton />
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : (
        <MovieList movies={movies} onSeeDetails={handleSeeDetails} />
      )}

      <MovieDetailsModal
        isOpen={selectedMovieId !== null}
        movieId={selectedMovieId}
        movie={selectedMovie}
        loading={detailsLoading}
        error={detailsError}
        onRetry={retryDetails}
        onClose={closeModal}
      />
    </div>
  )
}

function ErrorState({ onRetry }) {
  return (
    <div className="error-state">
      <span className="text-4xl" aria-hidden="true">
        ⚠️
      </span>
      <h3 className="text-lg font-semibold text-text">Unable to load movies</h3>
      <p className="max-w-sm text-sm text-text-muted">
        We couldn't fetch the catalog right now. Check your connection and
        try again.
      </p>
      <button type="button" onClick={onRetry} className="btn-primary mt-2">
        Retry
      </button>
    </div>
  )
}

export default Movies