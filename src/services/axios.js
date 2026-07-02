import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
})

let redirecting = false

const safelyRedirect = (target) => {
  try {
    const app = target || router
    const currentRoute =
      typeof app.currentRoute?.value === 'object' ? app.currentRoute.value : null
    if (
      currentRoute &&
      currentRoute.name !== 'login' &&
      currentRoute.name !== 'register'
    ) {
      app.push({ name: 'login', query: { redirect: currentRoute.fullPath } })
    }
  } catch (e) {
    // ignore navigation issues during auth redirects
  }
}

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
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      if (!redirecting) {
        redirecting = true
        safelyRedirect(router)
      }
    }

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
