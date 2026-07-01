<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-[72px]">
    <div class="mx-auto max-w-[1400px] px-6 h-full">
      <div class="relative h-full flex items-center justify-between gap-6 rounded-nav bg-white/80 backdrop-blur-xl border border-border/60 shadow-nav px-6 mt-3">
        <div class="flex items-center gap-6">
          <button @click="isMenuOpen = !isMenuOpen" class="flex items-center justify-center h-10 w-10 rounded-full text-[#111827] hover:bg-primary-50 lg:hidden" aria-label="Open menu">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <router-link to="/" class="flex items-center gap-2.5 flex-shrink-0">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-600/20">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <span class="text-lg font-black tracking-tight text-[#111827]">ShopSphere</span>
          </router-link>
          <nav class="hidden lg:flex items-center gap-1">
            <router-link to="/" class="inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold transition-all duration-200"
              :class="$route.path === '/' ? 'bg-primary-50 text-primary-600' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#FAFAFC]'">
              {{ $t('nav.home') }}
            </router-link>
            <router-link to="/categories" class="inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold transition-all duration-200"
              :class="$route.path === '/categories' ? 'bg-primary-50 text-primary-600' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#FAFAFC]'">
              {{ $t('nav.categories') }}
            </router-link>
            <router-link to="/products" class="inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold transition-all duration-200"
              :class="$route.path === '/products' && $route.query.sort !== 'newest' ? 'bg-primary-50 text-primary-600' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#FAFAFC]'">
              {{ $t('nav.deals') }}
            </router-link>
            <router-link :to="{ path: '/products', query: { sort: 'newest' } }" class="inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold transition-all duration-200"
              :class="$route.query.sort === 'newest' ? 'bg-primary-50 text-primary-600' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#FAFAFC]'">
              {{ $t('nav.newArrivals') }}
            </router-link>
            <router-link to="/contact" class="inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold transition-all duration-200"
              :class="$route.path === '/contact' ? 'bg-primary-50 text-primary-600' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#FAFAFC]'">
              {{ $t('nav.contact') }}
            </router-link>
          </nav>
        </div>

        <div class="flex-1 max-w-md hidden md:block">
          <div class="relative">
            <input
              v-model="search"
              type="search"
              :placeholder="$t('search.placeholderShort')"
              class="h-[48px] w-full rounded-[24px] border border-border bg-[#FAFAFC] pl-5 pr-14 text-sm font-medium text-[#111827] placeholder:text-[#6B7280] outline-none transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              @keyup.enter="applySearch"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-1.5 my-auto h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center transition-all duration-200 hover:bg-primary-700 hover:scale-105 active:scale-95 shadow-md shadow-primary-600/20"
              @click="applySearch"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <router-link to="/wishlist" class="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition-all duration-200 hover:bg-primary-50 hover:text-primary-600" aria-label="Wishlist">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span v-if="wishlistCount" class="absolute -right-0.5 -top-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white shadow-sm">
              {{ wishlistCount }}
            </span>
          </router-link>
          <router-link to="/cart" class="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition-all duration-200 hover:bg-primary-50 hover:text-primary-600" aria-label="Cart">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
            <span v-if="cartCount" class="absolute -right-0.5 -top-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white shadow-sm">
              {{ cartCount }}
            </span>
          </router-link>
          <div class="hidden md:flex items-center gap-1">
            <template v-if="authStore.isAuthenticated">
              <div class="relative" ref="profileMenuRef">
                <button
                  @click="isProfileMenuOpen = !isProfileMenuOpen"
                  class="inline-flex items-center gap-2 h-10 px-3 rounded-full text-sm font-semibold text-[#111827] transition-all duration-200 hover:bg-gray-50"
                >
                  <span
                    class="inline-flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold"
                    :class="authStore.user?.avatar ? 'bg-gray-200' : 'bg-purple-600'"
                  >
                    <template v-if="authStore.user?.avatar">
                      <img
                        :src="authStore.user.avatar"
                        :alt="authStore.user?.name"
                        class="h-8 w-8 rounded-full object-cover"
                      />
                    </template>
                    <template v-else>
                      {{ (authStore.user?.name || 'U').charAt(0).toUpperCase() }}
                    </template>
                  </span>
                  <svg class="h-4 w-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <Transition name="fade">
                  <div
                    v-if="isProfileMenuOpen"
                    class="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-white shadow-soft-lg py-1.5 z-50"
                  >
                    <router-link
                      to="/profile"
                      @click="isProfileMenuOpen = false"
                      class="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <svg class="h-4 w-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {{ $t('nav.profile') }}
                    </router-link>
                    <div class="h-px bg-gray-100 my-1" />
                    <button
                      @click="handleSignOut"
                      class="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {{ $t('auth.signOut') }}
                    </button>
                  </div>
                </Transition>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="btn-ghost h-10 px-4 rounded-full text-sm font-semibold">
                {{ $t('auth.signIn') }}
              </router-link>
            </template>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="md:hidden fixed top-[72px] left-0 right-0 z-40 px-6 pt-2 pb-3 bg-white/80 backdrop-blur-xl border-b border-border/60">
    <div class="relative">
      <input
        v-model="search"
        type="search"
        :placeholder="$t('search.placeholderShort')"
        class="h-[48px] w-full rounded-[24px] border border-border bg-[#FAFAFC] pl-5 pr-14 text-sm font-medium outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        @keyup.enter="applySearch"
      />
      <button
        type="button"
        class="absolute inset-y-0 right-1.5 my-auto h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md shadow-primary-600/20"
        @click="applySearch"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    </div>
  </div>

  <Transition name="fade">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      aria-hidden="true"
      @click="isMenuOpen = false"
    ></div>
  </Transition>

  <Transition name="slideLeft">
    <aside
      v-if="isMenuOpen"
      class="fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-soft-lg"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div class="flex items-center justify-between px-5 py-5 border-b border-border/60">
        <router-link to="/" class="flex items-center gap-2.5" @click="isMenuOpen = false">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-600/20">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <span class="text-lg font-black tracking-tight text-[#111827]">ShopSphere</span>
        </router-link>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-primary-50"
          aria-label="Close menu"
          @click="isMenuOpen = false"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <nav class="flex flex-1 flex-col gap-1 overflow-y-auto p-5">
        <router-link to="/" class="rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-primary-50"
          :class="$route.path === '/' ? 'bg-primary-50 text-primary-600' : ''"
          @click="isMenuOpen = false">
          {{ $t('nav.home') }}
        </router-link>
        <router-link to="/categories" class="rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-primary-50"
          @click="isMenuOpen = false">
          {{ $t('nav.categories') }}
        </router-link>
        <router-link to="/products" class="rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-primary-50"
          @click="isMenuOpen = false">
          {{ $t('nav.products') }}
        </router-link>
        <router-link :to="{ path: '/products', query: { sort: 'newest' } }" class="rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-primary-50"
          @click="isMenuOpen = false">
          {{ $t('nav.newArrivals') }}
        </router-link>
        <router-link to="/contact" class="rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-primary-50"
          @click="isMenuOpen = false">
          {{ $t('nav.contact') }}
        </router-link>
      </nav>

      <div class="space-y-3 border-t border-border/60 p-5">
        <template v-if="authStore.isAuthenticated">
          <router-link
            to="/profile"
            class="block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-[#111827] transition hover:bg-primary-50"
            @click="isMenuOpen = false"
          >
            {{ $t('nav.profile') }}
          </router-link>
          <button
            type="button"
            class="block w-full rounded-xl bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-700 shadow-md shadow-primary-600/20"
            @click="handleSignOut"
          >
            {{ $t('auth.signOut') }}
          </button>
        </template>
        <router-link
          v-else
          to="/login"
          class="block w-full rounded-xl bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-700 shadow-md shadow-primary-600/20"
          @click="isMenuOpen = false"
        >
          {{ $t('auth.signIn') }}
        </router-link>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const router = useRouter()
const route = useRoute()

const search = ref('')
const isMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const profileMenuRef = ref(null)

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const cartCount = computed(() => cartStore.itemsCount)
const wishlistCount = computed(() => wishlistStore.count)

const onClickOutsidePanel = (event) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    isProfileMenuOpen.value = false
  }
}

function handleSignOut() {
  authStore.logout()
  isProfileMenuOpen.value = false
  isMenuOpen.value = false
  router.push('/')
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    cartStore.fetchCart()
    wishlistStore.fetchWishlist()
  }
  document.addEventListener('click', onClickOutsidePanel, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutsidePanel, true)
})
</script>

<style scoped>
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: transform 0.3s ease;
}
.slideLeft-enter-from,
.slideLeft-leave-to {
  transform: translateX(-100%);
}
</style>
