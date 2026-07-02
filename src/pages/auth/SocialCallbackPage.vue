<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p class="mt-4 text-sm text-gray-600">Completing sign in...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()
const router = useRouter()
const route = useRoute()

async function loadProfile() {
  // Read and clear the redirect URL immediately to avoid stale state
  const next = localStorage.getItem('social_next') || '/'
  localStorage.removeItem('social_next')

  try {
    const token = route.query.token

    if (!token) {
      // If in a popup, notify the parent window about the failure
      if (window.opener) {
        window.opener.postMessage({ type: 'social-auth-error', message: 'Missing social login token.' }, window.location.origin)
        window.close()
      }
      throw new Error('Missing social login token.')
    }

    localStorage.setItem('auth_token', token)
    const user = await authStore.getProfile()
    await Promise.all([cartStore.fetchCart(), wishlistStore.fetchWishlist()])

    // If opened in a popup, send auth data to parent window and close
    if (window.opener) {
      window.opener.postMessage(
        { type: 'social-auth-success', token, user, next },
        window.location.origin
      )
      window.close()
      return
    }

    toastStore.success(`Welcome back, ${authStore.user.name}!`)
    router.replace(next)
  } catch (e) {
    toastStore.error(e.message || 'Unable to complete social login.')
    if (window.opener) {
      window.opener.postMessage(
        { type: 'social-auth-error', message: e.message || 'Unable to complete social login.' },
        window.location.origin
      )
      window.close()
      return
    }
    router.replace({ name: 'login' })
  }
}

onMounted(() => loadProfile())
</script>
