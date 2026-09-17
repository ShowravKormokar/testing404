import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_TVMAZE_BASE_URL || 'https://api.tvmaze.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // centralized error hook for future phases
    return Promise.reject(error)
  },
)

export default api