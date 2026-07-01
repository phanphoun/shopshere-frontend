<template>
  <div>
    <h2 class="text-xl font-bold text-[#111827] text-center mb-1">{{ $t('auth.welcomeBack') }}</h2>
    <p class="text-sm text-[#6B7280] text-center mb-6">{{ $t('auth.signInDesc') }}</p>

    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.email') }}</label>
        <input v-model="form.email" type="email" required autofocus class="input" placeholder="you@example.com">
      </div>

      <div>
        <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('auth.password') }}</label>
        <input v-model="form.password" type="password" required class="input" placeholder="••••••••">
      </div>

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="form.remember" class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500">
          <span class="text-[#6B7280]">{{ $t('auth.rememberMe') }}</span>
        </label>
        <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">{{ $t('auth.forgotPassword') }}</a>
      </div>

      <button type="submit" :disabled="authStore.loading" class="btn-primary w-full h-12 text-sm font-semibold">
        {{ authStore.loading ? $t('auth.signingIn') : $t('auth.signIn') }}
      </button>
    </form>

    <p class="text-center text-sm text-[#6B7280] mt-6">
      {{ $t('auth.noAccount') }}
      <RouterLink :to="{ name: 'register' }" class="text-primary-600 font-semibold hover:text-primary-700">{{ $t('auth.signUp') }}</RouterLink>
    </p>

    <!-- <div class="mt-6 p-4 bg-primary-50 rounded-card border border-primary-200 text-xs text-primary-700">
      <strong class="font-semibold">{{ $t('auth.demoCredentials') }}:</strong><br>
      {{ $t('checkout.email') }}: <code class="font-mono">admin@shopsphere.test</code><br>
      {{ $t('auth.password') }}: <code class="font-mono">password</code>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()
const router = useRouter()
const route = useRoute()

const form = ref({ email: '', password: '', remember: false })

async function login() {
  try {
    await authStore.login(form.value)
    await Promise.all([cartStore.fetchCart(), wishlistStore.fetchWishlist()])
    toastStore.success(`Welcome back, ${authStore.user.name}!`)
    router.push(route.query.redirect || { name: 'home' })
  } catch (e) {
    toastStore.error(e.formattedMessage || 'Invalid credentials')
  }
}
</script>
