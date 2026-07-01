<template>
  <div class="mx-auto max-w-[1400px] px-6 py-10">
    <h1 class="text-2xl font-bold text-[#111827] mb-8">{{ $t('cart.title') }}</h1>

    <LoadingSpinner v-if="cartStore.loading" />
    <EmptyState v-else-if="cartStore.cart.items.length === 0"
      :title="$t('cart.empty')"
      :description="$t('cart.emptyDesc')"
      :action-to="{ name: 'products' }"
      :action-label="$t('cart.startShopping')" />

    <div v-else class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartStore.cart.items" :key="item.id"
          class="bg-white rounded-card border border-border shadow-card p-5 flex gap-5 items-center"
        >
          <RouterLink :to="{ name: 'product-detail', params: { id: item.product.id } }"
            class="w-20 h-20 flex-shrink-0 rounded-img overflow-hidden bg-[#FAFAFC]">
            <img :src="item.product.image_url || 'https://via.placeholder.com/80'" class="w-full h-full object-cover">
          </RouterLink>

          <div class="flex-1 min-w-0">
            <RouterLink :to="{ name: 'product-detail', params: { id: item.product.id } }"
              class="text-sm font-semibold text-[#111827] hover:text-primary-600 line-clamp-1">
              {{ item.product.name }}
            </RouterLink>
            <p class="text-xs text-[#6B7280] mt-0.5">{{ item.product.category?.name }}</p>
            <p class="text-sm font-bold text-[#111827] mt-1">${{ item.product.final_price }}</p>
          </div>

          <div class="flex items-center rounded-btn border border-border overflow-hidden h-10">
            <button @click="updateQty(item, item.quantity - 1)" class="h-full w-9 flex items-center justify-center text-[#6B7280] hover:bg-[#FAFAFC] transition-colors text-sm font-semibold">−</button>
            <span class="w-10 text-center text-sm font-semibold text-[#111827] border-x border-border">{{ item.quantity }}</span>
            <button @click="updateQty(item, item.quantity + 1)"
              :disabled="item.quantity >= item.product.stock_quantity"
              class="h-full w-9 flex items-center justify-center text-[#6B7280] hover:bg-[#FAFAFC] transition-colors text-sm font-semibold disabled:opacity-30">+</button>
          </div>

          <div class="text-sm font-bold text-[#111827] w-20 text-right">${{ item.subtotal.toFixed(2) }}</div>

          <button @click="remove(item)" class="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] hover:bg-red-50 hover:text-[#EF4444] transition-colors">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/>
            </svg>
          </button>
        </div>

        <div class="flex justify-between items-center pt-2">
          <button @click="clearCart" class="text-sm font-semibold text-[#6B7280] hover:text-[#EF4444] transition-colors">{{ $t('cart.clearCart') }}</button>
          <RouterLink :to="{ name: 'products' }" class="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">{{ $t('cart.continueShopping') }}</RouterLink>
        </div>
      </div>

      <!-- Order Summary -->
      <div>
        <div class="bg-white rounded-card border border-border shadow-card p-6 sticky top-28">
          <h3 class="text-base font-bold text-[#111827] mb-5">{{ $t('cart.orderSummary') }}</h3>
          <div class="space-y-3 mb-5">
            <div class="flex justify-between text-sm">
              <span class="text-[#6B7280]">{{ $t('cart.subtotal') }} ({{ cartStore.itemsCount }} {{ $t('cart.items') }})</span>
              <span class="font-semibold text-[#111827]">${{ cartStore.summary.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[#6B7280]">{{ $t('cart.tax') }}</span>
              <span class="font-semibold text-[#111827]">${{ cartStore.summary.tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[#6B7280]">{{ $t('cart.shipping') }}</span>
              <span class="font-semibold text-[#111827]">${{ cartStore.summary.shipping_fee.toFixed(2) }}</span>
            </div>
          </div>
          <div class="border-t border-border pt-4 mb-5">
            <div class="flex justify-between font-bold text-base">
              <span class="text-[#111827]">{{ $t('cart.total') }}</span>
              <span class="text-primary-600">${{ cartStore.summary.total.toFixed(2) }}</span>
            </div>
          </div>
          <RouterLink :to="{ name: 'checkout' }" class="btn-primary w-full h-12 text-sm font-semibold flex items-center justify-center">
            {{ $t('cart.proceedToCheckout') }}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'

const { t } = useI18n()
const cartStore = useCartStore()
const toastStore = useToastStore()

onMounted(() => cartStore.fetchCart())

async function updateQty(item, qty) {
  if (qty <= 0) {
    await remove(item)
    return
  }
  try {
    await cartStore.updateQuantity(item.product_id, qty)
  } catch (e) {
    toastStore.error(e.formattedMessage || t('cart.failedUpdate'))
  }
}

async function remove(item) {
  try {
    await cartStore.removeItem(item.id)
    toastStore.success(t('cart.itemRemoved'))
  } catch (e) {
    toastStore.error(t('cart.failedRemove'))
  }
}

async function clearCart() {
  if (!confirm(t('cart.clearConfirm'))) return
  await cartStore.clearCart()
  toastStore.success(t('cart.cartCleared'))
}
</script>
