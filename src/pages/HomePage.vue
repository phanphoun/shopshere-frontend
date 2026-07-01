<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-12 pb-8 md:pt-20 md:pb-12">
      <div class="absolute inset-0 -z-10">
        <div class="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-600/5 blur-3xl"></div>
        <div class="absolute -left-10 top-40 h-64 w-64 rounded-full bg-primary-400/5 blur-3xl"></div>
      </div>
      <div class="mx-auto max-w-[1400px] px-6">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-200 px-4 py-1.5 text-sm font-medium text-primary-600 mb-6">
            <span class="h-2 w-2 rounded-full bg-primary-600 animate-pulse-soft"></span>
            {{ $t('home.heroBadge') }}
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] leading-[1.1]">
            {{ $t('home.heroTitle') }}<br/>
            <span class="text-primary-600">{{ $t('home.heroTitleAccent') }}</span>
          </h1>
          <p class="mt-5 text-lg text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            {{ $t('home.heroDesc') }}
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RouterLink to="/products" class="btn-primary px-8 h-[48px] rounded-btn text-sm font-semibold">
              {{ $t('home.shopNow') }}
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </RouterLink>
            <RouterLink to="/products?sort=newest" class="btn-secondary px-8 h-[48px] rounded-btn text-sm font-semibold">
              {{ $t('nav.newArrivals') }}
            </RouterLink>
          </div>
        </div>

        <!-- Stat Cards -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(stat, idx) in statCards" :key="stat.label"
            class="bg-white rounded-card border border-border shadow-card p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            :style="{ animationDelay: `${idx * 100}ms` }"
          >
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 mb-4">
              <svg v-if="stat.key === 'products'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              <svg v-else-if="stat.key === 'customers'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <svg v-else-if="stat.key === 'brands'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <p class="text-3xl font-bold text-[#111827]">{{ stat.value }}</p>
            <p class="text-sm text-[#6B7280] mt-1">{{ $t('home.stats.' + stat.key) }}</p>
          </div>
          <div class="bg-white rounded-card border border-border shadow-card p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 mb-4">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
              </svg>
            </div>
            <p class="text-3xl font-bold text-[#111827]">99%</p>
            <p class="text-sm text-[#6B7280] mt-1">{{ $t('home.stats.satisfaction') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 md:py-24">
      <div class="mx-auto max-w-[1400px] px-6">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p class="text-sm font-semibold text-primary-600 tracking-wide uppercase">{{ $t('home.categoriesLabel') }}</p>
            <h2 class="mt-2 text-3xl md:text-4xl font-bold text-[#111827]">{{ $t('home.categoriesTitle') }}</h2>
            <p class="mt-2 text-[#6B7280]">{{ $t('home.findWhatYouNeed') }}</p>
          </div>
          <RouterLink to="/categories" class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            {{ $t('home.viewAll') }}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <button
            v-for="(category, idx) in displayCategories"
            :key="category.id"
            @click="goToCategory(category)"
            class="group bg-white rounded-card border border-border shadow-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary-300"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 mx-auto transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-primary-600/20">
              <span class="text-lg font-bold">{{ category.name.charAt(0) }}</span>
            </div>
            <p class="mt-3 text-sm font-semibold text-[#111827]">{{ category.name }}</p>
            <p class="text-xs text-[#6B7280] mt-0.5">{{ productCounts[category.id] ?? 0 }} {{ $t('home.items') }}</p>
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 md:py-24 bg-white">
      <div class="mx-auto max-w-[1400px] px-6">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p class="text-sm font-semibold text-primary-600 tracking-wide uppercase">{{ $t('home.featured') }}</p>
            <h2 class="mt-2 text-3xl md:text-4xl font-bold text-[#111827]">{{ $t('home.featuredProducts') }}</h2>
            <p class="mt-2 text-[#6B7280]">{{ $t('home.featuredDesc') }}</p>
          </div>
          <RouterLink to="/products" class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            View All
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>

        <TransitionGroup name="product-card" tag="div" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div v-for="(product, idx) in featured" :key="product.id" :style="{ transitionDelay: `${idx * 80}ms` }">
            <ProductCard :product="product" @quick-view="onQuickView" />
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="py-20 md:py-24">
      <div class="mx-auto max-w-[1400px] px-6">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p class="text-sm font-semibold text-[#F97316] tracking-wide uppercase">{{ $t('home.bestSellers') }}</p>
            <h2 class="mt-2 text-3xl md:text-4xl font-bold text-[#111827]">{{ $t('home.mostPopular') }}</h2>
            <p class="mt-2 text-[#6B7280]">{{ $t('home.trendingNow') }}</p>
          </div>
        </div>

        <TransitionGroup name="product-card" tag="div" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div v-for="(product, idx) in bestSellers" :key="product.id" :style="{ transitionDelay: `${idx * 80}ms` }">
            <ProductCard :product="product" @quick-view="onQuickView" />
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="py-20 md:py-24 bg-white">
      <div class="mx-auto max-w-[1400px] px-6">
        <div class="text-center mb-14">
          <p class="text-sm font-semibold text-primary-600 tracking-wide uppercase">{{ $t('home.whyChooseUs') }}</p>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold text-[#111827]">{{ $t('home.advantageTitle') }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(item, idx) in trustCards" :key="item.titleKey"
            class="bg-white rounded-card border border-border shadow-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div class="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 mb-4">
              <svg v-if="item.titleKey === 'fastDelivery'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <svg v-else-if="item.titleKey === 'securePayment'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <svg v-else-if="item.titleKey === 'easyReturns'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <svg v-else-if="item.titleKey === 'premiumQuality'" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.268 2.268L21 7.732 19.732 9l-5-5-5 5L4 7.732l2.268 2.268L6 17h12z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-[#111827]">{{ $t('home.trust.' + item.titleKey) }}</h3>
            <p class="mt-2 text-sm text-[#6B7280] leading-relaxed">{{ $t('home.trust.' + item.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews/Testimonials -->
    <section class="py-20 md:py-24">
      <div class="mx-auto max-w-[1400px] px-6">
        <div class="text-center mb-14">
          <p class="text-sm font-semibold text-primary-600 tracking-wide uppercase">{{ $t('home.testimonials') }}</p>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold text-[#111827]">{{ $t('home.lovedByThousands') }}</h2>
        </div>

        <div v-if="testimonials.length" class="grid gap-6 md:grid-cols-3">
          <div v-for="(review, idx) in testimonials" :key="review.id || idx"
            class="bg-white rounded-card border border-border shadow-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div class="flex items-center gap-1 text-amber-400">
              <svg v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= review.rating ? 'fill-current' : 'fill-[#ECECF3]'" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-[#6B7280]">&ldquo;{{ review.comment || review.text }}&rdquo;</p>
            <div class="mt-5 flex items-center gap-3">
              <img :src="review.user?.avatar || `https://ui-avatars.com/api/?name=${review.user?.name || review.name}&background=5B3DF5&color=fff`"
                class="h-9 w-9 rounded-full object-cover ring-2 ring-primary-100" alt="">
              <div>
                <p class="text-sm font-semibold text-[#111827]">{{ review.user?.name || review.name }}</p>
                <p class="text-xs text-[#6B7280]">{{ $t('home.verifiedBuyer') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="grid gap-6 md:grid-cols-3">
          <div v-for="(fallback, idx) in fallbackReviews" :key="idx"
            class="bg-white rounded-card border border-border shadow-card p-6"
          >
            <div class="flex items-center gap-1 text-amber-400">
              <svg v-for="i in 5" :key="i" class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-[#6B7280]">&ldquo;{{ fallback.text }}&rdquo;</p>
            <div class="mt-5 flex items-center gap-3">
              <img :src="`https://ui-avatars.com/api/?name=${fallback.name}&background=5B3DF5&color=fff`"
                class="h-9 w-9 rounded-full ring-2 ring-primary-100" alt="">
              <div>
                <p class="text-sm font-semibold text-[#111827]">{{ fallback.name }}</p>
                <p class="text-xs text-[#6B7280]">{{ $t('home.' + (fallback.roleKey || 'verifiedBuyer')) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'
import api from '@/services/axios'
import ProductCard from '@/components/ProductCard.vue'

const { t } = useI18n()
const router = useRouter()
const productStore = useProductStore()

const testimonials = ref([])
const customerCount = ref(0)
const totalProducts = ref(0)

const statCards = computed(() => [
  { value: (totalProducts.value || 0) + '+', key: 'products' },
  { value: customerCount.value + '+', key: 'customers' },
  { value: (productStore.categories.length || 0) + '+', key: 'brands' },
])

const displayCategories = computed(() => {
  return productStore.categories.slice(0, 7)
})

const productCounts = computed(() => {
  const map = {}
  productStore.categories.forEach(category => {
    map[category.id] = category.products_count || 0
  })
  return map
})

const featured = computed(() => productStore.featured.slice(0, 10))
const bestSellers = computed(() => productStore.bestSellers.slice(0, 10))

const fallbackReviews = computed(() => [
  { name: 'Sarah M.', role: t('home.verifiedBuyer'), roleKey: 'verifiedBuyer', text: t('home.defaultReview1') },
  { name: 'James K.', role: t('home.customerSince2024'), roleKey: 'customerSince2024', text: t('home.defaultReview2') },
  { name: 'Emily R.', role: t('home.verifiedBuyer'), roleKey: 'verifiedBuyer', text: t('home.defaultReview3') },
])

const trustCards = [
  { titleKey: 'fastDelivery', descKey: 'fastDeliveryDesc' },
  { titleKey: 'securePayment', descKey: 'securePaymentDesc' },
  { titleKey: 'easyReturns', descKey: 'easyReturnsDesc' },
  { titleKey: 'premiumQuality', descKey: 'premiumQualityDesc' },
]

onMounted(async () => {
  await Promise.all([
    productStore.fetchCategories(),
    productStore.fetchFeatured(10),
    productStore.fetchLatest(10),
    productStore.fetchBestSellers(10),
  ])

  try {
    const { data: statsData } = await api.get('/stats')
    customerCount.value = statsData.data?.total_customers || 0
    totalProducts.value = statsData.data?.total_products || totalProducts.value
  } catch {}

  try {
    const { data } = await api.get('/products', { params: { per_page: 100, has_reviews: 1 } })
    totalProducts.value = data.meta?.total || 0
    if (data.data?.length) {
      const withReviews = data.data.filter(p => p.approved_reviews_count > 0)
      const reviewResults = await Promise.all(
        withReviews.slice(0, 5).map(async p => {
          try {
            const { data: r } = await api.get(`/products/${p.id}/reviews`)
            return r.data?.slice(0, 3) || []
          } catch { return [] }
        })
      )
      testimonials.value = reviewResults.flat().slice(0, 3)
    }
  } catch {}
})

function goToCategory(category) {
  router.push({ name: 'category', params: { slug: category.slug } })
}

function onQuickView(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}
</script>

<style scoped>
.product-card-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.product-card-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
