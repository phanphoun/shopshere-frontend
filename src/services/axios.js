import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
})

// Request interceptor: attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto-logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      const currentPath = window.location.pathname
      if (!currentPath.startsWith('/login') && !currentPath.startsWith('/register')) {
        window.location.href = '/login'
      }
    }

    // Format error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[Object.keys(error.response?.data?.errors || {})[0]]?.[0] ||
      error.message ||
      'Something went wrong'

    error.formattedMessage = message
    return Promise.reject(error)
  }
)

export default api
