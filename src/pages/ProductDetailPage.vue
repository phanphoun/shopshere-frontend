<template>
  <div class="mx-auto max-w-[1400px] px-6 py-10">
    <LoadingSpinner v-if="loading" />
    <div v-else-if="!product" class="text-center py-20">
      <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-card bg-[#ECECF3]">
        <svg class="h-10 w-10 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <p class="text-lg font-semibold text-[#6B7280]">{{ $t('products.notFound') }}</p>
    </div>
    <div v-else>
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-[#6B7280] mb-8">
        <RouterLink :to="{ name: 'home' }" class="hover:text-primary-600 transition-colors">{{ $t('nav.home') }}</RouterLink>
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        <RouterLink :to="{ name: 'products' }" class="hover:text-primary-600 transition-colors">{{ $t('nav.products') }}</RouterLink>
        <svg v-if="product.category" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        <RouterLink v-if="product.category" :to="{ name: 'category', params: { slug: product.category.slug } }" class="hover:text-primary-600 transition-colors">{{ product.category.name }}</RouterLink>
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        <span class="text-[#111827] font-medium truncate">{{ product.name }}</span>
      </nav>

      <!-- Product Details -->
      <div class="grid md:grid-cols-2 gap-10 mb-16">
        <!-- Gallery -->
        <div>
          <div class="aspect-square bg-white rounded-card border border-border overflow-hidden mb-4">
            <img :src="selectedImage" :alt="product.name" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
          </div>
          <div v-if="galleryImages.length > 1" class="grid grid-cols-5 gap-3">
            <button v-for="img in galleryImages" :key="img"
              @click="selectedImage = img"
              class="aspect-square rounded-img overflow-hidden border-2 transition-all duration-200"
              :class="selectedImage === img ? 'border-primary-600 shadow-md shadow-primary-600/20' : 'border-transparent hover:border-border'"
            >
              <img :src="img" class="w-full h-full object-cover">
            </button>
          </div>
        </div>

        <!-- Info -->
        <div>
          <p v-if="product.category" class="badge-green text-xs mb-3">{{ product.category.name }}</p>
          <h1 class="text-3xl font-bold text-[#111827] mb-4">{{ product.name }}</h1>

          <!-- Rating -->
          <div v-if="product.average_rating > 0" class="flex items-center gap-2 mb-5">
            <div class="flex text-amber-400">
              <svg v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= Math.round(product.average_rating) ? 'fill-current' : 'fill-[#ECECF3]'" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-[#111827]">{{ Number(product.average_rating).toFixed(1) }}</span>
            <span class="text-sm text-[#6B7280]">({{ product.reviews_count }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-3 mb-6">
            <span class="text-4xl font-bold text-[#111827]">${{ product.final_price }}</span>
            <span v-if="product.has_discount" class="text-lg text-[#6B7280] line-through">${{ product.price }}</span>
            <span v-if="product.has_discount" class="badge-red text-sm font-bold px-3 py-1">-{{ product.discount_percent }}% OFF</span>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <span v-if="product.in_stock" class="inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A]">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              {{ $t('products.inStockAvailable', { count: product.stock_quantity }) }}
            </span>
            <span v-else class="inline-flex items-center gap-2 text-sm font-semibold text-[#EF4444]">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              {{ $t('products.outOfStockLabel') }}
            </span>
            <p v-if="product.sku" class="text-sm text-[#6B7280] mt-1">{{ $t('products.sku') }}: {{ product.sku }}</p>
          </div>

          <!-- Quantity + Add to Cart -->
          <div class="flex items-center gap-3 mb-8">
            <div class="flex items-center rounded-btn border border-border overflow-hidden h-[48px]">
              <button @click="quantity > 1 && quantity--" class="h-full w-11 flex items-center justify-center text-[#6B7280] hover:bg-[#FAFAFC] transition-colors font-semibold">−</button>
              <input v-model.number="quantity" type="number" min="1" :max="product.stock_quantity"
                class="w-16 h-full text-center border-x border-border py-2 text-sm font-semibold text-[#111827] outline-none focus:bg-primary-50/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none">
              <button @click="quantity < product.stock_quantity && quantity++" class="h-full w-11 flex items-center justify-center text-[#6B7280] hover:bg-[#FAFAFC] transition-colors font-semibold">+</button>
            </div>
            <button @click="addToCart" :disabled="!product.in_stock || adding"
              class="btn-primary flex-1 h-[48px] px-8 text-sm font-semibold">
              <span v-if="adding" class="inline-flex items-center gap-2">
                <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ $t('products.addingToCart') }}
              </span>
              <span v-else>{{ $t('products.addToCartLabel') }}</span>
            </button>
            <button @click="toggleWishlist"
              class="h-[48px] w-[48px] flex items-center justify-center rounded-btn border-2 transition-all duration-200"
              :class="isWished ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-border text-[#6B7280] hover:border-primary-300 hover:text-primary-600'">
              <svg class="h-5 w-5" :fill="isWished ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          <!-- Description -->
          <div class="border-t border-border pt-6">
            <h3 class="text-base font-semibold text-[#111827] mb-3">{{ $t('products.description') }}</h3>
            <p class="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line">{{ product.description }}</p>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="bg-white rounded-card border border-border shadow-card p-8 mb-16">
        <h2 class="text-xl font-bold text-[#111827] mb-6">{{ $t('products.reviewsTitle') }}</h2>

        <!-- Review Form -->
        <div v-if="authStore.isAuthenticated" class="mb-8 p-6 bg-[#FAFAFC] rounded-card border border-border">
          <h3 class="text-sm font-semibold text-[#111827] mb-3">{{ $t('products.writeReview') }}</h3>
          <form @submit.prevent="submitReview">
            <StarRating v-model="reviewForm.rating" class="mb-3" />              <textarea v-model="reviewForm.comment" rows="3" :placeholder="$t('products.reviewPlaceholder')"
              class="input mb-3"></textarea>
            <button type="submit" :disabled="submittingReview || !reviewForm.rating" class="btn-primary px-6 text-sm">
              {{ submittingReview ? $t('products.submittingReview') : $t('products.submitReview') }}
            </button>
          </form>
        </div>

        <LoadingSpinner v-if="loadingReviews" />
        <div v-else-if="reviews.length === 0" class="text-center py-8 text-sm text-[#6B7280]">
          {{ $t('products.noReviewsYet') }}
        </div>
        <div v-else class="space-y-5">
          <div v-for="review in reviews" :key="review.id" class="border-b border-border pb-5 last:border-0 last:pb-0">
            <div class="flex items-center gap-3 mb-2">
              <img :src="review.user?.avatar || `https://ui-avatars.com/api/?name=${review.user?.name || 'U'}&background=5B3DF5&color=fff`"
                class="w-10 h-10 rounded-full object-cover ring-2 ring-primary-100" alt="">
              <div>
                <p class="text-sm font-semibold text-[#111827]">{{ review.user?.name || 'Anonymous' }}</p>
                <div class="flex items-center gap-2 mt-0.5">
                  <div class="flex text-amber-400">
                    <svg v-for="i in 5" :key="i" class="h-3.5 w-3.5" :class="i <= (review.rating || review.stars) ? 'fill-current' : 'fill-[#ECECF3]'" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-[#6B7280]">{{ review.created_at }}</span>
                </div>
              </div>
            </div>
            <p class="text-sm text-[#6B7280] leading-relaxed">{{ review.comment }}</p>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length">
        <h2 class="text-xl font-bold text-[#111827] mb-6">{{ $t('products.related') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" @quick-view="onQuickView" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '@/services/axios'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import StarRating from '@/components/StarRating.vue'

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const adding = ref(false)
const selectedImage = ref('')

const reviews = ref([])
const loadingReviews = ref(false)
const reviewForm = ref({ rating: 5, comment: '' })
const submittingReview = ref(false)

const relatedProducts = ref([])

const galleryImages = computed(() => {
  if (!product.value) return []
  const imgs = product.value.image_url ? [product.value.image_url] : []
  if (product.value.images) imgs.push(...product.value.images.map(i => i.url))
  return [...new Set(imgs.filter(Boolean))]
})

const isWished = computed(() => product.value && wishlistStore.isInWishlist(product.value.id))

function onQuickView(product) {
  // handled by router-link
}

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await api.get(`/products/${route.params.id}`)
    product.value = data.data
    selectedImage.value = galleryImages.value[0] || ''

    loadingReviews.value = true
    const [reviewsRes, relatedRes] = await Promise.all([
      api.get(`/products/${route.params.id}/reviews`),
      api.get(`/products/category/${product.value.category?.slug || ''}`, { params: { per_page: 8 } }),
      wishlistStore.fetchWishlist(),
    ])
    reviews.value = reviewsRes.data.data
    relatedProducts.value = (relatedRes.data.data || []).filter(p => p.id !== product.value.id).slice(0, 4)
  } catch (e) {
    toastStore.error('Failed to load product')
  } finally {
    loading.value = false
    loadingReviews.value = false
  }
})

async function addToCart() {
  if (!authStore.isAuthenticated) {
    toastStore.info('Please sign in to add items to cart')
    return
  }
  adding.value = true
  try {
    await cartStore.addToCart(product.value.id, quantity.value)
    toastStore.success(`${product.value.name} added to cart!`)
  } catch (e) {
    toastStore.error(e.formattedMessage || 'Failed to add to cart')
  } finally {
    adding.value = false
  }
}

async function toggleWishlist() {
  if (!authStore.isAuthenticated) {
    toastStore.info('Please sign in to add to wishlist')
    return
  }
  try {
    const result = await wishlistStore.toggleWishlist(product.value.id)
    toastStore.success(result.message)
  } catch (e) {
    toastStore.error('Failed to update wishlist')
  }
}

async function submitReview() {
  if (!reviewForm.value.rating) return
  submittingReview.value = true
  try {
    const { data } = await api.post('/reviews', {
      product_id: product.value.id,
      rating: reviewForm.value.rating,
      comment: reviewForm.value.comment,
    })
    reviews.value.unshift(data.data)
    reviewForm.value = { rating: 5, comment: '' }
    toastStore.success('Review submitted!')
  } catch (e) {
    toastStore.error(e.formattedMessage || 'Failed to submit review')
  } finally {
    submittingReview.value = false
  }
}
</script>
