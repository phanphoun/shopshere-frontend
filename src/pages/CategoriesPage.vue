<template>
  <main class="mx-auto max-w-[1400px] px-6 py-10">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <aside class="lg:col-span-3">
        <div class="bg-white rounded-card border border-border shadow-card p-5 sticky top-28">
          <h3 class="text-sm font-bold text-[#111827]">{{ $t('categories.title') }}</h3>
          <div class="mt-4 space-y-1">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category)"
              class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary-50"
              :class="selectedCategoryId === category.id ? 'bg-primary-50 text-primary-600' : 'text-[#6B7280]'"
            >
              <span>{{ category.name }}</span>
              <span class="text-xs text-[#6B7280]">{{ category.product_count ?? 0 }}</span>
            </button>
          </div>
        </div>
      </aside>

      <section class="lg:col-span-9 space-y-6">
        <div class="bg-white rounded-card border border-border shadow-card p-5">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 class="text-xl font-bold text-[#111827]">{{ heading }}</h1>
              <p v-if="products.length" class="text-sm text-[#6B7280] mt-0.5">{{ products.length }} {{ $t('products.found') }}</p>
            </div>
            <div class="flex items-center gap-2">
              <select v-model="sort"
                class="h-10 rounded-btn border border-border bg-white px-4 text-sm font-semibold text-[#111827] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20">
                <option value="latest">{{ $t('categories.sortLatest') }}</option>
                <option value="price">{{ $t('categories.sortPrice') }}</option>
                <option value="rating">{{ $t('categories.sortRating') }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="product in products" :key="product.id" :product="product" @quick-view="onQuickView" />
        </div>

        <div v-if="!products.length" class="bg-white rounded-card border border-border shadow-card p-10 text-center">
          <p class="text-sm text-[#6B7280]">{{ $t('categories.noProducts') }}</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()
const productStore = useProductStore()

const categories = computed(() => productStore.categories)
const products = computed(() => productStore.products)
const selectedCategoryId = ref(null)
const sort = ref('latest')

const heading = computed(() => {
  const category = categories.value.find(item => item.id === selectedCategoryId.value)
  return category ? category.name : 'All Categories'
})

function selectCategory(category) {
  selectedCategoryId.value = category.id
}

function onQuickView(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

onMounted(async () => {
  if (!productStore.categories.length) {
    await productStore.fetchCategories()
  }
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }
})
</script>
