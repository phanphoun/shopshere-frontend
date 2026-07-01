<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{{ $t('order.title') }}</h1>

    <LoadingSpinner v-if="orderStore.loading" />
    <EmptyState v-else-if="orderStore.orders.length === 0"
                :title="$t('order.emptyTitle')"
                :description="$t('order.emptyDesc')"
                :action-to="{ name: 'products' }"
                :action-label="$t('wishlist.browseProducts')" />

    <div v-else class="space-y-3">
      <RouterLink v-for="order in orderStore.orders" :key="order.id"
                  :to="{ name: 'order-detail', params: { id: order.id } }"
                  class="card p-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-card-hover transition">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <p class="font-bold">{{ order.order_number }}</p>
            <span class="badge" :class="statusBadge(order.status)">{{ order.status }}</span>
            <span class="badge" :class="order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
              {{ order.payment_status }}
            </span>
          </div>
          <p class="text-sm text-gray-500">{{ new Date(order.created_at).toLocaleDateString() }}</p>
          <p class="text-sm">{{ order.items_count }} {{ $t('order.itemCount') }}</p>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-primary-600">${{ order.total.toFixed(2) }}</p>
          <p class="text-sm text-primary-600">{{ $t('order.viewDetails') }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useOrderStore } from '@/stores/orders'
import { statusBadge } from '@/utils/statusBadge'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'

const orderStore = useOrderStore()

onMounted(() => orderStore.fetchOrders())
</script>
