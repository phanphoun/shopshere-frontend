<template>
  <div class="min-h-screen bg-surface">
    <!-- Header -->
    <div class="border-b border-border bg-white">
      <div class="mx-auto max-w-[1400px] px-6 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-[#111827]">{{ title }}</h1>
            <p class="text-sm text-[#6B7280] mt-1">{{ totalProducts }} {{ $t('products.found') }}</p>
          </div>
          <div class="flex items-center gap-3">
            <!-- Sort Dropdown -->
            <select v-model="filters.sort" @change="applyFilters"
              class="h-10 rounded-btn border border-border bg-white pl-4 pr-10 text-sm font-semibold text-[#111827] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236B7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat">
              <option value="latest">{{ $t('sort.latest') }}</option>
              <option value="oldest">{{ $t('sort.oldest') }}</option>
              <option value="price_asc">{{ $t('sort.priceAsc') }}</option>
              <option value="price_desc">{{ $t('sort.priceDesc') }}</option>
              <option value="name_asc">{{ $t('sort.nameAsc') }}</option>
              <option value="name_desc">{{ $t('sort.nameDesc') }}</option>
            </select>

            <!-- Grid/List Toggle -->
            <div class="hidden sm:flex items-center rounded-btn border border-border overflow-hidden">
              <button
                @click="viewMode = 'grid'"
                class="inline-flex h-10 w-10 items-center justify-center transition-colors"
                :class="viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-[#6B7280] hover:bg-[#FAFAFC]'"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                class="inline-flex h-10 w-10 items-center justify-center transition-colors"
                :class="viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-[#6B7280] hover:bg-[#FAFAFC]'"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
              </button>
            </div>

            <!-- Mobile Filter Button -->
            <button @click="mobileFilterOpen = true" class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-btn border border-border text-[#6B7280] hover:bg-[#FAFAFC]">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <section class="mx-auto max-w-[1400px] px-6 py-10">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[288px_1fr]">
        <!-- Sidebar -->
        <FilterPanel
          v-if="productStore.categories.length > 0"
          :categories="productStore.categories"
          :selected-category="currentCategorySlug"
          :selected-rating="currentRating"
  :selected-in-stock="!!filters.in_stock"
  :selected-featured="!!filters.featured"
          @category-change="onCategoryChange"
          @price-change="onPriceChange"
          @rating-change="onRatingChange"
          @availability-change="onAvailabilityChange"
          @featured-change="onFeaturedChange"
          @reset="resetFilters"
        />

        <div class="min-w-0">
          <!-- Active Filters -->
          <div v-if="hasActiveFilters" class="mb-6 flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold text-[#6B7280]">{{ $t('filters.activeFilters') }}</span>
            <button v-if="currentCategorySlug" @click="clearCategory" class="inline-flex items-center gap-1.5 rounded-full bg-primary-50 border border-primary-200 px-3 py-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-100 transition-colors">
              {{ currentCategoryName }}
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <button v-if="currentRating" @click="clearRating" class="inline-flex items-center gap-1.5 rounded-full bg-primary-50 border border-primary-200 px-3 py-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-100 transition-colors">
              {{ currentRating }}+ Stars
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <button v-if="filters.featured" @click="filters.featured = false; applyFilters()" class="inline-flex items-center gap-1.5 rounded-full bg-primary-50 border border-primary-200 px-3 py-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-100 transition-colors">
              Featured
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <button @click="resetFilters" class="text-xs font-semibold text-[#6B7280] hover:text-primary-600 transition-colors">{{ $t('filters.clearAll') }}</button>
          </div>

          <!-- Loading Skeletons -->
          <div v-if="productStore.loading">
            <div class="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4" v-if="viewMode === 'grid'">
              <div v-for="i in 8" :key="i" class="space-y-4">
                <div class="aspect-square rounded-card bg-[#ECECF3] animate-pulse-soft"></div>
                <div class="h-4 w-3/4 rounded-lg bg-[#ECECF3] animate-pulse-soft"></div>
                <div class="h-3 w-1/3 rounded-lg bg-[#ECECF3] animate-pulse-soft"></div>
              </div>
            </div>
            <div v-else class="space-y-4">
              <div v-for="i in 4" :key="i" class="flex gap-4 p-4 rounded-card bg-white border border-border">
                <div class="w-24 h-24 rounded-img bg-[#ECECF3] animate-pulse-soft flex-shrink-0"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-4 w-3/4 rounded-lg bg-[#ECECF3] animate-pulse-soft"></div>
                  <div class="h-3 w-1/4 rounded-lg bg-[#ECECF3] animate-pulse-soft"></div>
                  <div class="h-3 w-1/3 rounded-lg bg-[#ECECF3] animate-pulse-soft"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="productStore.products.length === 0" class="my-20 text-center">
            <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-card bg-[#ECECF3]">
              <svg class="h-10 w-10 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-[#111827]">No products found</h3>
            <p class="mt-2 text-sm text-[#6B7280]">Try adjusting your filters or search criteria</p>
            <button @click="resetFilters" class="mt-6 btn-primary px-6">Clear Filters</button>
          </div>

          <!-- Product Grid -->
          <div v-else-if="viewMode === 'grid'" class="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
            <ProductCard
              v-for="product in productStore.products"
              :key="product.id"
              :product="product"
              @quick-view="onQuickView"
            />
          </div>

          <!-- Product List View -->
          <div v-else class="space-y-4">
            <div v-for="product in productStore.products" :key="product.id"
              class="flex gap-5 bg-white rounded-card border border-border shadow-card p-4 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="w-28 h-28 flex-shrink-0 rounded-img overflow-hidden bg-[#FAFAFC]">
                <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover">
              </router-link>
              <div class="flex-1 min-w-0">
                <p v-if="product.category?.name" class="badge-green text-xs mb-1">{{ product.category.name }}</p>
                <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="text-base font-semibold text-[#111827] hover:text-primary-600 line-clamp-1">
                  {{ product.name }}
                </router-link>
                <div class="flex items-center gap-1.5 mt-1">
                  <div class="flex text-amber-400">
                    <svg v-for="i in 5" :key="i" class="h-3.5 w-3.5" :class="i <= Math.round(averageRating(product)) ? 'fill-current' : 'fill-[#ECECF3]'" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-[#6B7280]">({{ product.reviews_count ?? product.approved_reviews_count ?? 0 }})</span>
                </div>
                <p class="text-sm text-[#6B7280] line-clamp-2 mt-1">{{ product.description || '' }}</p>
              </div>
              <div class="flex flex-col items-end justify-between flex-shrink-0">
                <div class="text-right">
                  <p class="text-lg font-bold text-[#111827]">${{ currentPrice(product).toFixed(2) }}</p>
                  <p v-if="currentPrice(product) < Number(product.price)" class="text-sm text-[#6B7280] line-through">${{ Number(product.price).toFixed(2) }}</p>
                </div>
                <button class="btn-primary h-10 px-5 text-sm" @click="addToList(product)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="productStore.pagination.last_page > 1" class="mt-14">
            <div class="flex items-center justify-center gap-2">
              <button
                :disabled="productStore.pagination.current_page === 1 || productStore.loading"
                @click="goToPage(productStore.pagination.current_page - 1)"
                class="inline-flex items-center gap-1.5 rounded-btn border border-border bg-white px-4 h-10 text-sm font-semibold text-[#6B7280] transition-all hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                {{ $t('pagination.previous') }}
              </button>

              <div class="flex items-center gap-1">
                <template v-for="(page, idx) in visiblePages" :key="idx">
                  <span v-if="page === '...'" class="flex h-10 w-8 items-center justify-center text-xs font-semibold text-[#6B7280] select-none">...</span>
                  <button
                    v-else
                    :disabled="productStore.loading"
                    @click="goToPage(page)"
                    class="h-10 min-w-[2.5rem] rounded-btn text-sm font-semibold transition-all"
                    :class="page === productStore.pagination.current_page
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                      : 'border border-border bg-white text-[#6B7280] hover:border-primary-300 hover:text-primary-600'"
                  >
                    {{ page }}
                  </button>
                </template>
              </div>

              <button
                :disabled="productStore.pagination.current_page === productStore.pagination.last_page || productStore.loading"
                @click="goToPage(productStore.pagination.current_page + 1)"
                class="inline-flex items-center gap-1.5 rounded-btn border border-border bg-white px-4 h-10 text-sm font-semibold text-[#6B7280] transition-all hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {{ $t('pagination.next') }}
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            <p class="mt-3 text-center text-xs font-medium text-[#6B7280]">
              Page {{ productStore.pagination.current_page }} of {{ productStore.pagination.last_page }}
            </p>
          </div>


        </div>
      </div>
    </section>

    <MobileFilterDrawer :is-open="mobileFilterOpen" v-model="filters.sort" @close="mobileFilterOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import ProductCard from '@/components/ProductCard.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import MobileFilterDrawer from '@/components/MobileFilterDrawer.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const toastStore = useToastStore()

const viewMode = ref('grid')
const mobileFilterOpen = ref(false)
const filters = ref({
  search: route.query.search || '',
  category_slug: route.params.slug || '',
  min_price: route.query.min_price || '',
  max_price: route.query.max_price || '',
  sort: route.query.sort || 'latest',
  featured: !!route.query.featured,
  in_stock: !!route.query.in_stock,
  page: parseInt(route.query.page) || 1,
})

const currentRating = ref(parseInt(route.query.rating || '0') || null)



const title = computed(() => {
  if (filters.value.category_slug) {
    const category = productStore.categories.find(item => item.slug === filters.value.category_slug)
    return category ? category.name : 'Products'
  }
  if (filters.value.search) return `Results for "${filters.value.search}"`
  return 'All Products'
})

const totalProducts = computed(() => productStore.pagination.total || 0)

const currentCategorySlug = computed(() => filters.value.category_slug)
const currentCategoryName = computed(() => {
  const category = productStore.categories.find(item => item.slug === filters.value.category_slug)
  return category ? category.name : ''
})

const hasActiveFilters = computed(() => !!currentCategorySlug.value || currentRating.value || filters.value.featured || filters.value.min_price || filters.value.max_price || filters.value.in_stock)

const visiblePages = computed(() => {
  const current = productStore.pagination.current_page
  const last = productStore.pagination.last_page

  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1)
  }

  const pages = []
  pages.push(1)

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(last - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < last - 2) {
    pages.push('...')
  }

  if (last > 1) {
    pages.push(last)
  }

  return pages
})

function currentPrice(product) {
  const discount = Number(product.discount_price)
  const price = Number(product.price)
  if (discount && discount > 0 && discount < price) return discount
  return price
}

function averageRating(product) {
  const rating = Number(product.approved_reviews_avg_rating ?? product.average_rating)
  return Number.isFinite(rating) ? rating : 0
}

function buildParams() {
  const params = { page: filters.value.page, sort: filters.value.sort }
  if (filters.value.search) params.search = filters.value.search
  if (filters.value.min_price) params.min_price = filters.value.min_price
  if (filters.value.max_price) params.max_price = filters.value.max_price
  if (filters.value.featured) params.featured = 1
  if (filters.value.in_stock) params.in_stock = 1
  return params
}

async function load() {
  const params = buildParams()
  if (filters.value.category_slug) {
    await productStore.fetchByCategory(filters.value.category_slug, params)
  } else {
    await productStore.fetchProducts(params)
  }
}

function applyFilters() {
  filters.value.page = 1
  syncUrl()
  load()
}

function syncUrl() {
  const query = {}
  if (filters.value.search) query.search = filters.value.search
  if (filters.value.min_price) query.min_price = filters.value.min_price
  if (filters.value.max_price) query.max_price = filters.value.max_price
  if (filters.value.sort !== 'latest') query.sort = filters.value.sort
  if (filters.value.featured) query.featured = 1
  if (filters.value.in_stock) query.in_stock = 1
  if (filters.value.page > 1) query.page = filters.value.page
  if (currentRating.value) query.rating = currentRating.value

  if (filters.value.category_slug) {
    router.replace({ name: 'category', params: { slug: filters.value.category_slug }, query })
  } else {
    router.replace({ name: 'products', query })
  }
}

function resetFilters() {
  filters.value = { search: '', category_slug: '', min_price: '', max_price: '', sort: 'latest', featured: false, in_stock: false, page: 1 }
  currentRating.value = null
  mobileFilterOpen.value = false
  router.replace({ name: 'products' })
  load()
}

function goToPage(page) {
  filters.value.page = page
  syncUrl()
  load()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onQuickView(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

function onCategoryChange(slug) {
  filters.value.category_slug = slug || ''
  filters.value.page = 1
  mobileFilterOpen.value = false
  if (slug) router.push({ name: 'category', params: { slug } })
  else router.push({ name: 'products' })
  load()
}

function onPriceChange(range) {
  filters.value.min_price = range.min || ''
  filters.value.max_price = range.max || ''
  filters.value.page = 1
  applyFilters()
}

function onRatingChange(rating) {
  currentRating.value = rating
  filters.value.page = 1
  syncUrl()
  load()
}

function onAvailabilityChange(inStock) {
  filters.value.in_stock = inStock
  filters.value.page = 1
  syncUrl()
  load()
}

function onFeaturedChange(featured) {
  filters.value.featured = featured
  filters.value.page = 1
  syncUrl()
  load()
}

function clearCategory() {
  filters.value.category_slug = ''
  filters.value.page = 1
  router.push({ name: 'products' })
  load()
}

function clearRating() {
  currentRating.value = null
  filters.value.page = 1
  syncUrl()
  load()
}

async function addToList(product) {
  if (!authStore.isAuthenticated) {
    toastStore.info('Please sign in to add items to cart')
    return
  }
  try {
    await cartStore.addToCart(product.id, 1)
    toastStore.success('Added to cart!')
  } catch (e) {
    toastStore.error(e.formattedMessage || 'Failed to add to cart')
  }
}

watch(
  () => route.params.slug,
  (newSlug) => {
    filters.value.category_slug = newSlug || ''
    filters.value.page = 1
    load()
  }
)

watch(
  () => route.query,
  (newQuery) => {
    const sort = newQuery.sort || 'latest'
    if (sort !== filters.value.sort) {
      filters.value.sort = sort
      load()
    }
  }
)

onMounted(() => {
  productStore.fetchCategories()
  load()
})
</script>
