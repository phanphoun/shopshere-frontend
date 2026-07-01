<template>
  <div class="flex items-center gap-1">
    <button v-for="star in 5" :key="star"
      @click="$emit('update:modelValue', star)"
      @mouseenter="hover = star"
      @mouseleave="hover = 0"
      type="button"
      class="text-xl transition-all duration-150 focus:outline-none hover:scale-110"
      :class="(hover || modelValue) >= star ? 'text-amber-400' : 'text-[#ECECF3]'"
    >
      <svg class="h-6 w-6" :class="(hover || modelValue) >= star ? 'fill-current' : 'fill-current'" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: Number, default: 0 },
})

defineEmits(['update:modelValue'])

const hover = ref(0)
</script>
