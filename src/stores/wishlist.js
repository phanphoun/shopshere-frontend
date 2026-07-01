import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axios'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const loading = ref(false)

  const count = computed(() => items.value.length)

  function isInWishlist(productId) {
    return items.value.some((i) => i.product_id === productId || i.product?.id === productId)
  }

  async function fetchWishlist() {
    loading.value = true
    try {
      const { data } = await api.get('/wishlist')
      items.value = data.data
    } catch (e) {
      items.value = []
    } finally {
      loading.value = false
    }
  }

  async function toggleWishlist(productId) {
    const { data } = await api.post(`/wishlist/${productId}`)
    await fetchWishlist()
    return data
  }

  async function removeFromWishlist(productId) {
    await api.delete(`/wishlist/${productId}`)
    items.value = items.value.filter((i) => i.product_id !== productId && i.product?.id !== productId)
  }

  function $reset() {
    items.value = []
  }

  return {
    items,
    loading,
    count,
    isInWishlist,
    fetchWishlist,
    toggleWishlist,
    removeFromWishlist,
    $reset,
  }
})
