import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axios'

export const useCartStore = defineStore('cart', () => {
  const cart = ref({ items: [] })
  const summary = ref({ subtotal: 0, tax: 0, shipping_fee: 0, total: 0, items_count: 0 })
  const loading = ref(false)

  const itemsCount = computed(() => summary.value.items_count || 0)
  const total      = computed(() => parseFloat(summary.value.total || 0))

  async function fetchCart() {
    loading.value = true
    try {
      const { data } = await api.get('/cart')
      cart.value = data.data.cart
      summary.value = data.data.summary
    } catch (e) {
      cart.value = { items: [] }
      summary.value = { subtotal: 0, tax: 0, shipping_fee: 0, total: 0, items_count: 0 }
    } finally {
      loading.value = false
    }
  }

  async function addToCart(productId, quantity = 1) {
    const { data } = await api.post('/cart/add', { product_id: productId, quantity })
    cart.value = data.data.cart
    summary.value = data.data.summary
    return data
  }

  async function updateQuantity(productId, quantity) {
    const { data } = await api.put('/cart/update', { product_id: productId, quantity })
    cart.value = data.data.cart
    summary.value = data.data.summary
    return data
  }

  async function removeItem(itemId) {
    const { data } = await api.delete(`/cart/remove/${itemId}`)
    cart.value = data.data.cart
    summary.value = data.data.summary
    return data
  }

  async function clearCart() {
    await api.delete('/cart/clear')
    $reset()
  }

  function $reset() {
    cart.value = { items: [] }
    summary.value = { subtotal: 0, tax: 0, shipping_fee: 0, total: 0, items_count: 0 }
  }

  return {
    cart,
    summary,
    loading,
    itemsCount,
    total,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    $reset,
  }
})
