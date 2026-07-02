<template>
  <div class="mx-auto max-w-[1400px] px-6 py-10">
    <RouterLink :to="{ name: 'orders' }" class="text-primary-600 hover:underline text-sm">{{ $t('order.backToOrders') }}</RouterLink>

    <LoadingSpinner v-if="orderStore.loading" />
    <div v-else-if="!orderStore.order" class="text-center py-16 text-gray-500">{{ $t('order.notFound') }}</div>

    <div v-else class="mt-4 grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-2xl font-bold">{{ orderStore.order.order_number }}</h1>
              <p class="text-sm text-gray-500">{{ $t('order.placedOn') }} {{ new Date(orderStore.order.created_at).toLocaleString() }}</p>
            </div>
            <div class="text-right space-y-1">
              <span class="badge block" :class="statusBadge(orderStore.order.status)">{{ orderStore.order.status }}</span>
              <span class="badge block" :class="orderStore.order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                {{ orderStore.order.payment_status }}
              </span>
            </div>
          </div>

          <div class="border-t pt-4">
            <h3 class="font-semibold mb-3">{{ $t('order.items') }}</h3>
            <div v-for="item in orderStore.order.items" :key="item.id" class="flex items-center gap-3 py-2 border-b last:border-0">
              <img :src="item.product_image || 'https://via.placeholder.com/60'" class="w-14 h-14 rounded object-cover">
              <div class="flex-1">
                <p class="font-semibold">{{ item.product_name }}</p>
                <p class="text-sm text-gray-500">{{ $t('checkout.qty') }}: {{ item.quantity }} × ${{ item.price.toFixed(2) }}</p>
              </div>
              <p class="font-semibold">${{ item.subtotal.toFixed(2) }}</p>
            </div>
          </div>

          <div class="mt-4 pt-4 space-y-2 text-sm">
            <div class="flex justify-between"><span>{{ $t('order.subtotal') }}</span><span>${{ orderStore.order.subtotal.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span>{{ $t('order.tax') }}</span><span>${{ orderStore.order.tax.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span>{{ $t('order.shipping') }}</span><span>${{ orderStore.order.shipping_fee.toFixed(2) }}</span></div>
            <hr>
            <div class="flex justify-between text-lg font-bold">
              <span>{{ $t('order.total') }}</span>
              <span class="text-primary-600">${{ orderStore.order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card p-6">
          <h3 class="font-bold mb-2">{{ $t('order.shippingAddress') }}</h3>
          <p class="text-sm text-gray-700 whitespace-pre-line">{{ orderStore.order.shipping_address }}</p>
          <p class="text-sm mt-2"><strong>{{ $t('order.phone') }}:</strong> {{ orderStore.order.phone }}</p>
          <p v-if="orderStore.order.notes" class="text-sm mt-2"><strong>{{ $t('order.notes') }}:</strong> {{ orderStore.order.notes }}</p>
        </div>
        <div class="card p-6">
          <h3 class="font-bold mb-2">{{ $t('order.payment') }}</h3>
          <p class="text-sm">{{ $t('order.method') }}: <strong>{{ orderStore.order.payment_method?.toUpperCase() }}</strong></p>
          <p class="text-sm">{{ $t('order.status') }}: <strong>{{ orderStore.order.payment_status }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useOrderStore } from '@/stores/orders'
import { statusBadge } from '@/utils/statusBadge'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const orderStore = useOrderStore()

onMounted(() => orderStore.fetchOrder(route.params.id))
</script>
