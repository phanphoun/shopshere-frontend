<template>
  <div class="min-h-screen flex flex-col bg-surface">
    <AppHeader />
    <main class="flex-1 pt-[72px]">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()

const titles = {
  home: 'ShopSphere - Home',
  products: 'ShopSphere - Products',
  'product-detail': 'ShopSphere - Product Details',
  category: 'ShopSphere - Category',
  cart: 'ShopSphere - Cart',
  checkout: 'ShopSphere - Checkout',
  wishlist: 'ShopSphere - Wishlist',
  orders: 'ShopSphere - Orders',
  'order-detail': 'ShopSphere - Order Details',
  profile: 'ShopSphere - My Profile',
}

watch(
  () => route.name,
  (name) => {
    document.title = titles[name] || 'ShopSphere - Modern E-Commerce'
  },
  { immediate: true }
)
</script>
