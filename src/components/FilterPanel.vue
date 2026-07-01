<template>
  <aside class="hidden lg:block w-72 flex-shrink-0">
    <div class="sticky top-28 bg-white rounded-card border border-border shadow-card p-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-bold text-[#111827]">{{ $t('filters.title') }}</h3>
        <button @click="$emit('reset')" class="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">{{ $t('filters.resetAll') }}</button>
      </div>

      <!-- Categories -->
      <div class="border-t border-border mt-4 pt-4">
        <button
          @click="toggleSection('categories')"
          class="flex w-full items-center justify-between text-sm font-semibold text-[#111827]"
        >
          {{ $t('filters.categories') }}
          <svg class="h-4 w-4 text-[#6B7280] transition-transform duration-200" :class="openSections.categories ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-show="openSections.categories" class="mt-3 space-y-1">
          <label class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-primary-50"
            :class="!selectedCategory ? 'bg-primary-50' : ''">
            <input
              type="radio"
              name="category"
              :checked="!selectedCategory"
              @change="$emit('category-change', null)"
              class="h-4 w-4 rounded-full border-border text-primary-600 focus:ring-primary-500 focus:ring-2"
            />
            <span class="text-sm font-medium" :class="!selectedCategory ? 'text-primary-600' : 'text-[#6B7280]'">{{ $t('filters.allCategories') }}</span>
          </label>
          <label v-for="cat in uniqueCategories" :key="cat.id"
            class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-primary-50"
            :class="selectedCategory === cat.slug ? 'bg-primary-50' : ''">
            <input
              type="radio"
              name="category"
              :checked="selectedCategory === cat.slug"
              @change="$emit('category-change', cat.slug)"
              class="h-4 w-4 rounded-full border-border text-primary-600 focus:ring-primary-500 focus:ring-2"
            />
            <span class="flex-1 text-sm font-medium" :class="selectedCategory === cat.slug ? 'text-primary-600' : 'text-[#6B7280]'">{{ cat.name }}</span>
            <span class="text-xs text-[#6B7280] font-medium">{{ cat.products_count || 0 }}</span>
          </label>
        </div>
      </div>

      <!-- Price Range -->
      <div class="border-t border-border mt-4 pt-4">
        <button
          @click="toggleSection('price')"
          class="flex w-full items-center justify-between text-sm font-semibold text-[#111827]"
        >
          {{ $t('filters.priceRange') }}
          <svg class="h-4 w-4 text-[#6B7280] transition-transform duration-200" :class="openSections.price ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-show="openSections.price" class="mt-3 space-y-3">
          <div class="flex items-center gap-2">
            <input
              v-model="localMinPrice"
              type="number"
              min="0"
              :placeholder="$t('filters.min')"
              class="w-full h-10 rounded-input border border-border bg-white px-3 text-sm text-[#111827] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            <span class="text-[#6B7280] text-xs">—</span>
            <input
              v-model="localMaxPrice"
              type="number"
              min="0"
              :placeholder="$t('filters.max')"
              class="w-full h-10 rounded-input border border-border bg-white px-3 text-sm text-[#111827] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <button
            type="button"
            @click="applyPrice"
            class="w-full h-10 rounded-btn bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            {{ $t('filters.apply') }}
          </button>
        </div>
      </div>

      <!-- Brand -->
      <div class="border-t border-border mt-4 pt-4">
        <button
          @click="toggleSection('brand')"
          class="flex w-full items-center justify-between text-sm font-semibold text-[#111827]"
        >
          {{ $t('filters.brand') }}
          <svg class="h-4 w-4 text-[#6B7280] transition-transform duration-200" :class="openSections.brand ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-show="openSections.brand" class="mt-3">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="brandSearch"
              type="text"
              :placeholder="$t('filters.searchBrands')"
              class="w-full h-10 pl-10 pr-3 rounded-input border border-border bg-white text-sm text-[#111827] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
      </div>

      <!-- Rating -->
      <div class="border-t border-border mt-4 pt-4">
        <button
          @click="toggleSection('rating')"
          class="flex w-full items-center justify-between text-sm font-semibold text-[#111827]"
        >
          {{ $t('filters.rating') }}
          <svg class="h-4 w-4 text-[#6B7280] transition-transform duration-200" :class="openSections.rating ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-show="openSections.rating" class="mt-3 space-y-1">
          <button v-for="n in 5" :key="n"
            type="button"
            @click="$emit('rating-change', n)"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-primary-50"
            :class="selectedRating === n ? 'bg-primary-50' : ''"
          >
            <div class="flex">
              <svg v-for="star in n" :key="star" class="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"/>
              </svg>
            </div>
            <span class="text-xs font-medium text-[#6B7280]">{{ n }}+</span>
          </button>
        </div>
      </div>

      <!-- Availability -->
      <div class="border-t border-border mt-4 pt-4">
        <button
          @click="toggleSection('availability')"
          class="flex w-full items-center justify-between text-sm font-semibold text-[#111827]"
        >
          {{ $t('filters.availability') }}
          <svg class="h-4 w-4 text-[#6B7280] transition-transform duration-200" :class="openSections.availability ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-show="openSections.availability" class="mt-3 space-y-2">
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              :checked="selectedInStock"
              @change="$emit('availability-change', $event.target.checked)"
              class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 focus:ring-2"
            />
            <span class="text-sm font-medium text-[#6B7280]">{{ $t('filters.inStockOnly') }}</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              :checked="selectedFeatured"
              @change="$emit('featured-change', $event.target.checked)"
              class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 focus:ring-2"
            />
            <span class="text-sm font-medium text-[#6B7280]">{{ $t('filters.featuredOnly') }}</span>
          </label>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const props = defineProps({
  categories: Array,
  selectedCategory: String,
  selectedRating: Number,
  selectedInStock: Boolean,
  selectedFeatured: Boolean,
})

const emit = defineEmits([
  'category-change',
  'price-change',
  'rating-change',
  'availability-change',
  'featured-change',
  'reset',
])

const openSections = reactive({
  categories: true,
  price: true,
  brand: false,
  rating: false,
  availability: true,
})

const uniqueCategories = computed(() => {
  if (!Array.isArray(props.categories)) return []
  const seen = new Set()
  return props.categories.filter((cat) => {
    if (seen.has(cat.id)) return false
    seen.add(cat.id)
    return true
  })
})

const localMinPrice = ref('')
const localMaxPrice = ref('')
const brandSearch = ref('')

function toggleSection(name) {
  openSections[name] = !openSections[name]
}

function applyPrice() {
  emit('price-change', { min: localMinPrice.value, max: localMaxPrice.value })
}

function onAvailabilityChange(event) {
  localInStock.value = event.target.checked
  emit('availability-change', event.target.checked)
}

function onFeaturedChange(event) {
  localFeatured.value = event.target.checked
  emit('featured-change', event.target.checked)
}
</script>
