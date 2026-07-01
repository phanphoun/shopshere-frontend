<template>
  <div>
    <h2 class="text-xl font-bold text-[#111827] text-center mb-1">{{ $t('auth.createAccount') }}</h2>
    <p class="text-sm text-[#6B7280] text-center mb-6">{{ $t('auth.registerDesc') }}</p>

    <form @submit.prevent="register" class="space-y-4">
      <div>
        <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('auth.fullName') }}</label>
        <input v-model="form.name" required class="input" placeholder="John Doe">
      </div>

      <div>
        <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.email') }}</label>
        <input v-model="form.email" type="email" required class="input" placeholder="you@example.com">
      </div>

      <div>
        <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.phone') }}</label>
        <input v-model="form.phone" type="tel" class="input" placeholder="+1 555 000 0000">
      </div>

      <div>
        <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('auth.password') }}</label>
        <input v-model="form.password" type="password" required minlength="8" class="input" placeholder="••••••••">
        <p class="text-xs text-[#6B7280] mt-1">{{ $t('auth.passwordHint') }}</p>
      </div>

      <div>
        <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('auth.confirmPassword') }}</label>
        <input v-model="form.password_confirmation" type="password" required class="input" placeholder="••••••••">
      </div>

      <button type="submit" :disabled="authStore.loading" class="btn-primary w-full h-12 text-sm font-semibold">
        {{ authStore.loading ? $t('auth.creatingAccount') : $t('auth.createAccount') }}
      </button>
    </form>

    <p class="text-center text-sm text-[#6B7280] mt-6">
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
