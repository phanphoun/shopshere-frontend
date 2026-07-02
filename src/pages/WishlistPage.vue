<template>
  <div class="mx-auto max-w-[1400px] px-6 py-10">
    <h1 class="text-2xl font-bold text-[#111827] mb-8">{{ $t('wishlist.title') }}</h1>

    <LoadingSpinner v-if="wishlistStore.loading" />
    <EmptyState v-else-if="wishlistStore.items.length === 0"
      :title="$t('wishlist.empty')"
      :description="$t('wishlist.emptyDesc')"
      :action-to="{ name: 'products' }"
      :action-label="$t('wishlist.browseProducts')" />

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in wishlistStore.items" :key="item.id" class="relative">
        <template v-if="item.product">
          <ProductCard :product="item.product" @quick-view="onQuickView" />
        </template>
        <button v-else @click="remove(item.product_id)"
          class="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-[#EF4444] hover:scale-110">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'

const { t } = useI18n()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()
const router = useRouter()

onMounted(() => wishlistStore.fetchWishlist())

async function remove(productId) {
  try {
    await wishlistStore.removeFromWishlist(productId)
    toastStore.success(t('wishlist.removed'))
  } catch (e) {
    toastStore.error(t('wishlist.failedRemove'))
  }
}

function onQuickView(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}
</script>
