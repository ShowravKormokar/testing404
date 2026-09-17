import { useEffect } from 'react'
import Modal from 'react-modal'

import MovieRating from './MovieRating'
import { formatDate, sanitizeSummary } from '../../features/movies/movie.utils'

if (typeof document !== 'undefined' && document.getElementById('root')) {
  Modal.setAppElement('#root')
}

function MovieDetailsModal({ isOpen, movieId, movie, onClose, loading, error, onRetry }) {
  useEffect(() => {
    if (!isOpen && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`Details for ${movie?.title ?? 'movie'}`}
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={200}
      bodyOpenClassName="modal-body-open"
      htmlOpenClassName="modal-html-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${movieId}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close details"
        className="modal-close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {loading ? (
        <div className="modal-loading">
          <div className="modal-loading-spinner" />
          <p className="modal-loading-text">Loading details…</p>
        </div>
      ) : error ? (
        <div className="modal-error">
          <span className="text-4xl" aria-hidden="true">
            ⚠️
          </span>
          <h3 className="text-lg font-semibold text-text">Unable to load details</h3>
          <p className="max-w-sm text-sm text-text-muted">{error}</p>
          {onRetry ? (
            <button type="button" onClick={onRetry} className="btn-primary mt-2">
              Retry
            </button>
          ) : null}
        </div>
      ) : movie ? (
        <SuccessView movie={movie} movieId={movieId} />
      ) : null}
    </Modal>
  )
}

function SuccessView({ movie, movieId }) {
  const {
    title,
    poster,
    rating,
    year,
    releaseDate,
    genres,
    summary,
    language,
    runtime,
    status,
    officialSite,
    cast,
  } = movie

  const hasCast = Array.isArray(cast) && cast.length > 0

  return (
    <div className="modal-grid">
      <div className="modal-poster">
        {poster ? (
          <img
            src={poster}
            alt={`${title} poster`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-accent/20 to-bg-card p-6 text-center">
            <span className="text-4xl font-bold text-accent">
              {(title || '?').slice(0, 2).toUpperCase()}
            </span>
            <span className="mt-2 text-xs text-text-muted">No poster</span>
          </div>
        )}
      </div>

      <div className="modal-body">
        <h2 className="modal-title" id={`modal-title-${movieId}`}>
          {title}
        </h2>

        <div className="modal-meta-row">
          <MovieRating rating={rating} size="lg" />
          {year ? <span className="text-sm text-text-muted">{year}</span> : null}
        </div>

        <dl className="modal-facts">
          {runtime ? (
            <>
              <dt>Runtime</dt>
              <dd>{runtime} min</dd>
            </>
          ) : null}
          {language ? (
            <>
              <dt>Language</dt>
              <dd>{language}</dd>
            </>
          ) : null}
          {status ? (
            <>
              <dt>Status</dt>
              <dd>{status}</dd>
            </>
          ) : null}
          {releaseDate ? (
            <>
              <dt>Released</dt>
              <dd>{formatDate(releaseDate)}</dd>
            </>
          ) : null}
          {genres.length > 0 ? (
            <>
              <dt>Genres</dt>
              <dd>{genres.join(', ')}</dd>
            </>
          ) : null}
        </dl>

        {summary ? (
          <section aria-labelledby="modal-summary-heading">
            <h3 id="modal-summary-heading" className="modal-subheading">
              Overview
            </h3>
            <div
              className="modal-summary"
              dangerouslySetInnerHTML={{ __html: sanitizeSummary(summary) }}
            />
          </section>
        ) : null}

        {officialSite ? (
          <a
            href={officialSite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2 inline-flex w-fit"
          >
            Official Site
          </a>
        ) : null}

        {hasCast ? (
          <section aria-labelledby="modal-cast-heading">
            <h3 id="modal-cast-heading" className="modal-subheading mt-6">
              Cast
            </h3>
            <ul className="modal-cast-list">
              {cast.slice(0, 8).map((member) => (
                <li key={member.id ?? member.name} className="modal-cast-item">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="modal-cast-avatar"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="modal-cast-avatar-skeleton" aria-hidden="true">
                      {(member.name || '?').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="modal-cast-meta">
                    <span className="modal-cast-name">{member.name}</span>
                    {member.character ? (
                      <span className="modal-cast-character">
                        as {member.character}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}

export default MovieDetailsModal