<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-btn border border-border px-3 h-9 text-sm font-semibold text-[#6B7280] transition hover:border-primary-300 hover:text-primary-600"
    @click="toggle"
  >
    <span class="h-2 w-2 rounded-full" :class="isKm ? 'bg-primary-600' : 'bg-[#6B7280]'"></span>
    {{ isKm ? 'ខ្មែរ' : 'EN' }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const isKm = computed(() => locale.value === 'km')

function toggle() {
  const next = isKm.value ? 'en' : 'km'
  locale.value = next
  localStorage.setItem('locale', next)
}
</script>
