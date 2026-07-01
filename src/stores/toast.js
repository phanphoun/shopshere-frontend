import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let counter = 0

  function show(message, type = 'info', duration = 3000) {
    const id = ++counter
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  function success(message, duration) {
    show(message, 'success', duration)
  }

  function error(message, duration) {
    show(message, 'error', duration)
  }

  function info(message, duration) {
    show(message, 'info', duration)
  }

  function dismiss(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return { toasts, show, success, error, info, dismiss }
})
