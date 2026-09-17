import api from '../../services/api/axios'

export const movieApi = {
  getShows: (params, config) => api.get('/shows', { params, ...config }),

  searchShows: (query, config) =>
    api.get('/search/shows', { params: { q: query }, ...config }),

  getShowById: (id, config) =>
    api.get(`/shows/${id}`, { params: { embed: 'cast' }, ...config }),
}

export default movieApi