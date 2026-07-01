<template>
  <div class="text-center py-20">
    <div class="inline-flex items-center justify-center w-20 h-20 rounded-card bg-[#ECECF3] mb-5">
      <svg class="w-10 h-10 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" :d="icon"/>
      </svg>
    </div>
    <h3 class="text-lg font-bold text-[#111827] mb-1">{{ title }}</h3>
    <p class="text-sm text-[#6B7280] mb-6">{{ description }}</p>
    <slot>
      <RouterLink v-if="actionTo" :to="actionTo" class="btn-primary px-6 inline-flex h-11 items-center text-sm font-semibold">{{ actionLabel }}</RouterLink>
    </slot>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title:       { type: String, default: 'Nothing here yet' },
  description: { type: String, default: '' },
  icon:        { type: String, default: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
  actionTo:    { type: [String, Object], default: null },
  actionLabel: { type: String, default: 'Browse Products' },
})
</script>
