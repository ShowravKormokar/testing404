export function normalizeShow(show = {}) {
  const rating = show.rating?.average ?? null
  const premiered = show.premiered ?? null

  return {
    id: show.id,
    title: show.name ?? 'Untitled',
    poster: show.image?.medium ?? show.image?.original ?? null,
    releaseDate: premiered,
    year: premiered ? new Date(premiered).getFullYear() : null,
    rating,
    genres: Array.isArray(show.genres) ? show.genres : [],
    summary: show.summary ?? null,
    language: show.language ?? null,
    runtime: show.runtime ?? null,
    network: show.network?.name ?? null,
  }
}

export function normalizeShows(shows) {
  if (!Array.isArray(shows)) return []
  return shows
    .map(normalizeShow)
    .filter((movie) => movie !== null && movie.id !== undefined)
}

export function normalizeSearchResults(results) {
  if (!Array.isArray(results)) return []
  return results
    .map((entry) => (entry && typeof entry === 'object' ? entry.show : null))
    .map(normalizeShow)
    .filter((movie) => movie !== null && movie.id !== undefined)
}

export function normalizeShowDetails(show = {}) {
  const base = normalizeShow(show)

  const embedded = show._embedded || {}
  const rawCast = Array.isArray(embedded.cast) ? embedded.cast : []

  const cast = rawCast
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null
      const person = entry.person || {}
      const character = entry.character || {}
      return {
        id: person.id,
        name: person.name ?? 'Unknown',
        character: character.name ?? null,
        image: person.image?.medium ?? person.image?.original ?? null,
      }
    })
    .filter((c) => c !== null)

  return {
    ...base,
    status: show.status ?? null,
    officialSite: show.officialSite ?? null,
    schedule: show.schedule
      ? {
          days: Array.isArray(show.schedule.days) ? show.schedule.days : [],
          time: show.schedule.time ?? null,
        }
      : null,
    webChannel: show.webChannel?.name ?? null,
    language: show.language ?? base.language,
    cast,
    summaryRaw: show.summary ?? null,
  }
}

export default {
  normalizeShow,
  normalizeShows,
  normalizeSearchResults,
  normalizeShowDetails,
}