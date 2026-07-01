import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axios'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref([])
  const order = ref(null)
  const loading = ref(false)

  async function fetchOrders() {
    loading.value = true
    try {
      const { data } = await api.get('/orders')
      orders.value = data.data
      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchOrder(id) {
    loading.value = true
    try {
      const { data } = await api.get(`/orders/${id}`)
      order.value = data.data
      return data.data
    } catch {
      order.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    order,
    loading,
    fetchOrders,
    fetchOrder,
  }
})
