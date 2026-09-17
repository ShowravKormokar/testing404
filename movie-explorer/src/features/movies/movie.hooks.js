import { useCallback, useEffect, useRef, useState } from 'react'

import { movieApi } from './movie.api'
import {
  normalizeSearchResults,
  normalizeShowDetails,
  normalizeShows,
} from './movie.service'

export function useMovieList(query = '') {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const controllerRef = useRef(null)

  const fetchMovies = useCallback(
    async (searchQuery) => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }

      const controller = new AbortController()
      controllerRef.current = controller

      setLoading(true)
      setError(null)

      try {
        const trimmed = (searchQuery || '').trim()
        let response

        if (trimmed.length === 0) {
          response = await movieApi.getShows(
            { page: 0 },
            { signal: controller.signal },
          )
          setMovies(normalizeShows(response.data))
        } else {
          response = await movieApi.searchShows(trimmed, {
            signal: controller.signal,
          })
          setMovies(normalizeSearchResults(response.data))
        }
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          return
        }

        const message =
          err?.response?.status === 429
            ? 'Too many requests — please try again shortly.'
            : err?.message || 'Failed to load movies. Please try again.'
        setError(message)
        setMovies([])
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null
        }
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchMovies(query)
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [query, fetchMovies])

  const retry = useCallback(() => fetchMovies(query), [query, fetchMovies])

  return { movies, loading, error, retry }
}

export function useMovieDetails(id) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const controllerRef = useRef(null)

  const fetchDetails = useCallback(
    async (showId) => {
      if (showId === null || showId === undefined || showId === '') {
        setDetails(null)
        setError(null)
        return
      }

      if (controllerRef.current) {
        controllerRef.current.abort()
      }

      const controller = new AbortController()
      controllerRef.current = controller

      setLoading(true)
      setError(null)

      try {
        const response = await movieApi.getShowById(showId, {
          signal: controller.signal,
        })
        setDetails(normalizeShowDetails(response.data))
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          return
        }
        const message =
          err?.response?.status === 404
            ? 'Movie not found.'
            : err?.response?.status === 429
              ? 'Too many requests — please try again shortly.'
              : err?.message || 'Failed to load details. Please try again.'
        setError(message)
        setDetails(null)
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null
        }
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchDetails(id)
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [id, fetchDetails])

  const retry = useCallback(() => fetchDetails(id), [id, fetchDetails])

  return { details, loading, error, retry }
}

export default { useMovieList, useMovieDetails }