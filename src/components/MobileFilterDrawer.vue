<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" @click="$emit('close')"></div>
  </transition>

  <transition name="slideRight">
    <div v-if="isOpen" class="fixed right-0 top-0 h-screen w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto shadow-soft-lg">
      <div class="sticky top-0 bg-white border-b border-border p-5 flex items-center justify-between z-10">
        <h2 class="text-base font-bold text-[#111827]">Filters</h2>
        <button @click="$emit('close')" class="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] hover:bg-primary-50 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="p-5 space-y-6">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">Sort By</h3>
          <div class="space-y-1">
            <button
              v-for="option in sortOptions"
              :key="option.value"
              @click="selectSort(option.value)"
              class="w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              :class="selected === option.value ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-[#6B7280] hover:bg-[#FAFAFC]'"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  modelValue: {
    type: String,
    default: 'latest',
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A-Z' },
  { value: 'name_desc', label: 'Name: Z-A' },
]

const selected = computed(() => props.modelValue)

function selectSort(value) {
  emit('update:modelValue', value)
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slideRight-enter-active,
.slideRight-leave-active {
  transition: transform 0.3s ease;
}
.slideRight-enter-from,
.slideRight-leave-to {
  transform: translateX(100%);
}
</style>
