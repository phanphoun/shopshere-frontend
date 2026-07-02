import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axios'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('auth_token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/login', credentials)
      user.value = data.data.user
      token.value = data.data.token
      localStorage.setItem('user', JSON.stringify(data.data.user))
      localStorage.setItem('auth_token', data.data.token)
      return data
    } catch (e) {
      error.value = e.formattedMessage
      throw e
    } finally {
      loading.value = false
    }
  }

  async function register(payload) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/register', payload)
      user.value = data.data.user
      token.value = data.data.token
      localStorage.setItem('user', JSON.stringify(data.data.user))
      localStorage.setItem('auth_token', data.data.token)
      return data
    } catch (e) {
      error.value = e.formattedMessage
      throw e
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await api.post('/logout')
    } catch (e) {
      // ignore
    }
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('auth_token')

    // Clear dependent store state to prevent stale data flashing
    useCartStore().$reset()
    useWishlistStore().$reset()
  }

  async function getProfile() {
    try {
      const { data } = await api.get('/profile')
      user.value = data.data
      localStorage.setItem('user', JSON.stringify(data.data))
      return data.data
    } catch (e) {
      // token invalid
      logout()
      throw e
    }
  }

  async function updateProfile(payload) {
    loading.value = true
    try {
      const formData = new FormData()
      // Laravel needs _method=PUT for FormData file uploads via POST
      formData.append('_method', 'PUT')
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value)
        }
      })
      // Use POST with _method override so Laravel properly parses multipart data
      const { data } = await api.post('/profile', formData)
      user.value = data.data
      localStorage.setItem('user', JSON.stringify(data.data))
      return data
    } finally {
      loading.value = false
    }
  }

  async function changePassword(payload) {
    return await api.put('/change-password', payload)
  }

  async function socialLogin(driver) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/social/auth/redirect/google')
      return data.data.url
    } catch (e) {
      error.value = e.formattedMessage
      throw e
    } finally {
      loading.value = false
    }
  }

  async function socialCallback(payload) {
    user.value = payload.user
    token.value = payload.token
    localStorage.setItem('user', JSON.stringify(payload.user))
    localStorage.setItem('auth_token', payload.token)
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    socialLogin,
    socialCallback,
  }
})
