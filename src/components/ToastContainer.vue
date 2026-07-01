<template>
  <div class="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
    <transition-group name="toast">
      <div v-for="t in toastStore.toasts" :key="t.id"
        class="toast pointer-events-auto"
        :class="{
          'toast-success': t.type === 'success',
          'toast-error': t.type === 'error',
          'toast-info': t.type === 'info',
        }">
        <div class="flex items-start gap-2">
          <span class="flex-1 text-sm font-medium">{{ t.message }}</span>
          <button @click="close(t.id)" class="text-white/80 hover:text-white font-bold">×</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

function close(id) {
  toastStore.dismiss(id)
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
