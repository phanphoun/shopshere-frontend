<template>
  <RouterView />
  <ToastContainer />
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import ToastContainer from '@/components/ToastContainer.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

onMounted(async () => {
  if (authStore.token) {
    try {
      await authStore.getProfile()
      await Promise.all([
        cartStore.fetchCart(),
        wishlistStore.fetchWishlist(),
      ])
    } catch (e) {
      // token invalid, ignore - auto-logout handled by axios interceptor
    }
  }
})
</script>
