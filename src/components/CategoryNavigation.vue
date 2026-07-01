<template>
  <div class="bg-white">
    <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
      <div class="flex h-14 items-center gap-1 overflow-x-auto">
        <RouterLink
          to="/"
          class="inline-flex min-w-0 flex-shrink-0 items-center px-4 text-sm font-bold transition"
          :class="isActive('/') ? 'text-purple-700' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ $t('nav.home') }}
        </RouterLink>
        <RouterLink
          to="/categories"
          class="inline-flex min-w-0 flex-shrink-0 items-center px-4 text-sm font-bold transition"
          :class="isActive('/categories') ? 'text-purple-700' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ $t('nav.categories') }}
        </RouterLink>
        <RouterLink
          to="/products"
          class="inline-flex min-w-0 flex-shrink-0 items-center rounded-full px-4 text-sm font-bold transition"
          :class="isActive('/products') && route.query.sort !== 'newest' ? 'bg-purple-100 text-purple-700' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ $t('nav.deals') }}
        </RouterLink>
        <RouterLink
          to="/products?sort=newest"
          class="inline-flex min-w-0 flex-shrink-0 items-center px-4 text-sm font-bold transition"
          :class="$route.query.sort === 'newest' ? 'text-purple-700' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ $t('nav.newArrivals') }}
        </RouterLink>
        <RouterLink
          to="/contact"
          class="inline-flex min-w-0 flex-shrink-0 items-center px-4 text-sm font-bold transition"
          :class="isActive('/contact') ? 'text-purple-700' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ $t('nav.contact') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t: $t } = useI18n()

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
