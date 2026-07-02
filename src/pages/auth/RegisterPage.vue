<template>
  <div>
    <h2 class="text-3xl font-bold text-primary-600 mb-1">Welcome!</h2>
    <p class="text-base text-gray-500 mb-8">Sign in to your Account</p>

    <form @submit.prevent="register" class="space-y-5">
      <div>
        <label class="text-sm font-semibold text-gray-700 block mb-2">Full Name</label>
        <input v-model="form.name" required class="input w-full rounded-full" placeholder="Your full name">
      </div>

      <div>
        <label class="text-sm font-semibold text-gray-700 block mb-2">{{ $t('checkout.email') }}</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
          </div>
          <input v-model="form.email" type="email" required class="input w-full rounded-full pl-10" placeholder="Email Address">
        </div>
      </div>

      <div>
        <label class="text-sm font-semibold text-gray-700 block mb-2">{{ $t('auth.password') }}</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input v-model="form.password" type="password" required minlength="8" class="input w-full rounded-full pl-10" placeholder="Password">
        </div>
        <p class="text-xs text-gray-500 mt-1.5 ml-1">Use 8 or more characters with a mix of letters, numbers &amp; symbols.</p>
      </div>

      <div>
        <label class="text-sm font-semibold text-gray-700 block mb-2">{{ $t('auth.confirmPassword') }}</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input v-model="form.password_confirmation" type="password" required minlength="8" class="input w-full rounded-full pl-10" placeholder="Confirm Password">
        </div>
      </div>

      <button type="submit" :disabled="authStore.loading" class="w-full h-12 rounded-full bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors disabled:opacity-50">
        {{ authStore.loading ? $t('auth.creatingAccount') : $t('auth.createAccount') }}
      </button>
    </form>

    <p class="text-center text-sm text-gray-500 mt-6">
      {{ $t('auth.haveAccount') }}
      <RouterLink :to="{ name: 'login' }" class="text-primary-600 font-semibold hover:text-primary-700">{{ $t('auth.signIn') }}</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
})

async function register() {
  try {
    await authStore.register(form.value)
    await Promise.all([cartStore.fetchCart(), wishlistStore.fetchWishlist()])
    toastStore.success('Welcome to ShopSphere!')
    router.push({ name: 'home' })
  } catch (e) {
    toastStore.error(e.formattedMessage || 'Registration failed')
  }
}
</script>
