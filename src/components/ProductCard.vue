<template>
  <div class="group relative bg-white rounded-card border border-border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
    <!-- Image Container -->
    <div class="relative aspect-square overflow-hidden rounded-t-card bg-[#FAFAFC]">
      <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="block h-full w-full">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >          <template v-if="!product.image_url">
          <div class="absolute inset-0 flex items-center justify-center bg-[#ECECF3] text-[#6B7280] text-xs font-medium">{{ $t('products.noImage') }}</div>
        </template>
      </router-link>

      <!-- Discount Badge - Top Left -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span v-if="currentPrice < product.price" class="inline-flex items-center rounded-full bg-[#EF4444] px-3 py-1 text-xs font-bold text-white shadow-sm">
          -{{ discountPercent }}%
        </span>
        <span v-if="product.featured" class="badge-green text-xs">
          {{ $t('products.featuredOnly') }}
        </span>
      </div>

      <!-- Wishlist Button - Top Right -->
      <button
        class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 hover:scale-110 active:scale-95"
        :aria-label="t('wishlist.toggle')"
        @click.stop="toggleWishlist"
      >
        <svg class="h-4 w-4" :class="isWished ? 'fill-primary-600 text-primary-600' : 'fill-none text-[#6B7280]'" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>

      <transition name="fade">
        <div
          v-if="!inStock"
          class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <span class="rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-[#111827] shadow-sm">
            {{ $t('products.outOfStockLabel') }}
          </span>
        </div>
      </transition>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Category Badge -->
      <p v-if="product.category?.name" class="badge-green text-xs mb-2">{{ product.category.name }}</p>

      <!-- Product Title -->
      <router-link
        :to="{ name: 'product-detail', params: { id: product.id } }"
        class="line-clamp-2 text-base font-semibold text-[#111827] transition-colors hover:text-primary-600"
      >
        {{ product.name }}
      </router-link>

      <!-- Rating -->
      <div class="flex items-center gap-1.5 mt-2">
        <div class="flex text-amber-400">
          <svg v-for="i in 5" :key="i" class="h-3.5 w-3.5" :class="i <= Math.round(averageRating) ? 'fill-current' : 'fill-[#ECECF3]'" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <span class="text-xs font-semibold text-[#6B7280]">{{ averageRating.toFixed(1) }}</span>
        <span class="text-xs text-[#6B7280]">({{ reviewsCount }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2 mt-2">
        <span class="text-lg font-bold text-[#111827]">${{ currentPrice.toFixed(2) }}</span>
        <span v-if="currentPrice < product.price" class="text-sm text-[#6B7280] line-through">${{ Number(product.price).toFixed(2) }}</span>
      </div>
    </div>

    <!-- Add to Cart Button -->
    <div class="px-4 pb-4">
      <button
        class="w-full rounded-btn bg-primary-600 h-[44px] text-sm font-semibold text-white shadow-md shadow-primary-600/20 transition-all duration-200 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        :disabled="!inStock || loading"
        @click.stop="addToCart"
      >
        <span v-if="loading" class="inline-flex items-center gap-2">
          <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ $t('products.addingToCart') }}
        </span>
        <span v-else>{{ $t('products.addToCartLabel') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      name: 'Product',
      price: '0.00',
      discount_price: null,
      featured: false,
      stock_quantity: 0,
      approved_reviews_avg_rating: null,
      approved_reviews_count: 0,
      average_rating: null,
      reviews_count: 0,
      image_url: null,
      image: null,
      category: null,
    }),
  },
})

defineEmits(['quick-view'])

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()
const { t } = useI18n()
const loading = ref(false)

const currentPrice = computed(() => {
  const discount = Number(props.product.discount_price)
  const price = Number(props.product.price)
  if (discount && discount > 0 && discount < price) return discount
  return price
})

const discountPercent = computed(() => {
  const original = Number(props.product.price)
  const current = currentPrice.value
  if (!original || original <= current) return 0
  return Math.round(((original - current) / original) * 100)
})

const inStock = computed(() => {
  const stock = Number(props.product.stock_quantity)
  return Number.isFinite(stock) && stock > 0
})

const averageRating = computed(() => {
  const rating = Number(props.product.approved_reviews_avg_rating ?? props.product.average_rating)
  return Number.isFinite(rating) ? rating : 0
})

const reviewsCount = computed(() => {
  return props.product.approved_reviews_count ?? props.product.reviews_count ?? 0
})

const isWished = computed(() => props.product && wishlistStore.isInWishlist(props.product.id))

async function addToCart() {
  if (!authStore.isAuthenticated) {
    toastStore.info(t('auth.signInToAddCart'))
    return
  }
  loading.value = true
  try {
    await cartStore.addToCart(props.product.id, 1)
    toastStore.success(t('success.addedToCart'))
  } catch (e) {
    toastStore.error(e.formattedMessage || t('error.failedToAddCart'))
  } finally {
    loading.value = false
  }
}

async function toggleWishlist() {
  if (!authStore.isAuthenticated) {
    toastStore.info(t('auth.signInToAddWishlist'))
    return
  }
  try {
    await wishlistStore.toggleWishlist(props.product.id)
  } catch (e) {
    toastStore.error(t('wishlist.failedUpdate'))
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
