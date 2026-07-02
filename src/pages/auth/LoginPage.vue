<template>
  <div>
    <h2 class="text-3xl font-bold text-primary-600 mb-1">Welcome!</h2>
    <p class="text-base text-gray-500 mb-8">Sign in to your Account</p>

    <form @submit.prevent="login" class="space-y-5">
      <div>
        <label class="text-sm font-semibold text-gray-700 block mb-2">{{ $t('checkout.email') }}</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
          </div>
          <input v-model="form.email" type="email" required autofocus class="input w-full rounded-full pl-10" placeholder="Email Address">
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
          <input v-model="form.password" type="password" required class="input w-full rounded-full pl-10" placeholder="Password">
        </div>
      </div>

      <a href="#" class="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm">{{ $t('auth.forgotPassword') }}</a>

      <div class="grid grid-cols-2 gap-3">
        <button type="submit" :disabled="authStore.loading" class="h-12 rounded-full bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors disabled:opacity-50">
          {{ authStore.loading ? $t('auth.signingIn') : $t('auth.signIn') }}
        </button>
        <RouterLink :to="{ name: 'register' }" class="h-12 rounded-full border-2 border-primary-600 text-primary-600 text-sm font-bold flex items-center justify-center hover:bg-primary-50 transition-colors">
          {{ $t('auth.signUp') }}
        </RouterLink>
      </div>
    </form>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-xs uppercase tracking-wider">
        <span class="bg-white px-3 text-gray-400 text-xs font-semibold">Or login with</span>
      </div>
    </div>

    <div class="flex items-center justify-center gap-4">
      <a href="#" class="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Login with Facebook">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
      </a>
      <a href="#" class="w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Login with Google">
        <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      </a>
      <a href="#" class="w-11 h-11 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Login with LinkedIn">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </div>
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
