import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const product = ref(null)
  const featured = ref([])
  const latest = ref([])
  const bestSellers = ref([])
  const categories = ref([])
  const pagination = ref({})
  const loading = ref(false)

  async function fetchProducts(filters = {}) {
    loading.value = true
    try {
      const { data } = await api.get('/products', { params: filters })
      products.value = data.data
      pagination.value = data.meta || {}
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchProduct(id) {
    loading.value = true
    try {
      const { data } = await api.get(`/products/${id}`)
      product.value = data.data
      return data.data
    } finally {
      loading.value = false
    }
  }

  async function fetchFeatured(limit = 10) {
    try {
      const { data } = await api.get('/products/featured', { params: { limit } })
      featured.value = data.data
      return data.data
    } catch {
      featured.value = []
    }
  }

  async function fetchLatest(limit = 10) {
    try {
      const { data } = await api.get('/products/latest', { params: { limit } })
      latest.value = data.data
      return data.data
    } catch {
      latest.value = []
    }
  }

  async function fetchBestSellers(limit = 10) {
    try {
      const { data } = await api.get('/products/best-sellers', { params: { limit } })
      bestSellers.value = data.data
      return data.data
    } catch {
      bestSellers.value = []
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      // Deduplicate categories by ID and name
      const seenIds = new Set()
      const seenNames = new Set()
      const uniqueCategories = data.data.filter(cat => {
        if (seenIds.has(cat.id)) return false
        if (seenNames.has(cat.name)) return false
        seenIds.add(cat.id)
        seenNames.add(cat.name)
        return true
      })
      categories.value = uniqueCategories
      return uniqueCategories
    } catch {
      categories.value = []
    }
  }

  async function searchProducts(query) {
    const { data } = await api.get('/products/search', { params: { q: query } })
    products.value = data.data
    pagination.value = data.meta || {}
    return data
  }

  async function fetchByCategory(slug, filters = {}) {
    loading.value = true
    try {
      const { data } = await api.get(`/products/category/${slug}`, { params: filters })
      products.value = data.data
      pagination.value = data.meta || {}
      return data
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    product,
    featured,
    latest,
    bestSellers,
    categories,
    pagination,
    loading,
    fetchProducts,
    fetchProduct,
    fetchFeatured,
    fetchLatest,
    fetchBestSellers,
    fetchCategories,
    searchProducts,
    fetchByCategory,
  }
})
