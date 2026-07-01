<template>
  <footer class="bg-[#111827] mt-20">
    <!-- Feature Cards -->
    <div class="max-w-[1400px] mx-auto px-6 -translate-y-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">          <div v-for="feature in features" :key="feature.titleKey"
          class="bg-white rounded-card border border-border shadow-card p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
            <component :is="feature.icon" />
          </div>
          <div>
            <p class="text-sm font-semibold text-[#111827]">{{ $t('features.' + feature.titleKey) }}</p>
            <p class="text-xs text-[#6B7280]">{{ $t('features.' + feature.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Content -->
    <div class="max-w-[1400px] mx-auto px-6 pb-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-600/20">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <span class="text-lg font-black tracking-tight text-white">ShopSphere</span>
          </div>
          <p class="text-sm text-[#9CA3AF] leading-relaxed">{{ $t('footer.description') }}</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm">{{ $t('footer.shop') }}</h4>
          <ul class="space-y-2.5 text-sm">
            <li><RouterLink :to="{ name: 'products' }" class="text-[#9CA3AF] hover:text-white transition-colors">{{ $t('footer.allProducts') }}</RouterLink></li>
            <li v-for="cat in productStore.categories.slice(0, 4)" :key="cat.id">
              <RouterLink :to="{ name: 'category', params: { slug: cat.slug } }" class="text-[#9CA3AF] hover:text-white transition-colors">
                {{ cat.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm">{{ $t('footer.account') }}</h4>
          <ul class="space-y-2.5 text-sm">
            <li><RouterLink :to="{ name: 'login' }" class="text-[#9CA3AF] hover:text-white transition-colors">{{ $t('footer.signIn') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'register' }" class="text-[#9CA3AF] hover:text-white transition-colors">{{ $t('footer.register') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'profile' }" class="text-[#9CA3AF] hover:text-white transition-colors">{{ $t('footer.myProfile') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'orders' }" class="text-[#9CA3AF] hover:text-white transition-colors">{{ $t('footer.myOrders') }}</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm">{{ $t('footer.contact') }}</h4>
          <ul class="space-y-2.5 text-sm">
            <li class="flex items-center gap-2 text-[#9CA3AF]">
              <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              support@shopsphere.test
            </li>
            <li class="flex items-center gap-2 text-[#9CA3AF]">
              <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              +1 (555) 000-0000
            </li>
            <li class="flex items-center gap-2 text-[#9CA3AF]">
              <svg class="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              123 Market Street, CA
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-[#1F2937] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6B7280]">
        <p>&copy; {{ new Date().getFullYear() }} ShopSphere. {{ $t('footer.allRights') }}</p>
        <div class="flex gap-6">
          <RouterLink :to="{ name: 'home' }" class="hover:text-white transition-colors">{{ $t('footer.privacy') }}</RouterLink>
          <RouterLink :to="{ name: 'home' }" class="hover:text-white transition-colors">{{ $t('footer.terms') }}</RouterLink>
          <RouterLink :to="{ name: 'home' }" class="hover:text-white transition-colors">{{ $t('footer.cookies') }}</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()

const features = [
  { titleKey: 'fastDelivery', descKey: 'fastDeliveryDesc', icon: { template: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' } },
  { titleKey: 'securePayment', descKey: 'securePaymentDesc', icon: { template: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>' } },
  { titleKey: 'easyReturns', descKey: 'easyReturnsDesc', icon: { template: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>' } },
  { titleKey: 'premiumQuality', descKey: 'premiumQualityDesc', icon: { template: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.268 2.268L21 7.732 19.732 9l-5-5-5 5L4 7.732l2.268 2.268L6 17h12z"/></svg>' } },
]
</script>
