<template>
  <div class="fixed bottom-6 right-6 z-50">
    <Transition name="fade">
      <div v-if="!isOpen" class="flex items-center gap-3">
        <div class="relative">
          <button @click="toggleChat" class="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-3.46-.594L3 21l1.594-5.235A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span v-if="unreadCount" class="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-sm">
              {{ unreadCount }}
            </span>
          </button>
        </div>
      </div>
    </Transition>

    <Transition name="slideUp">
      <div v-if="isOpen" class="w-[380px] max-w-[calc(100vw-32px)] rounded-2xl border border-gray-200 bg-white shadow-soft-lg flex flex-col h-[520px] max-h-[calc(100vh-120px)]">
        <div class="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h4 class="text-sm font-bold text-gray-900">Customer Support</h4>
            <p class="text-xs text-gray-500">We typically reply in a few minutes</p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="toggleChat" class="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 transition-colors">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div ref="messagesPanel" data-support-messages class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <template v-if="!supportStore.conversationId">
            <div class="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
              <p class="text-sm text-gray-700">Hi there 👋</p>
              <p class="text-sm text-gray-500 mt-1">How can we help you today?</p>
              <div class="mt-3 grid grid-cols-1 gap-2">
                <button v-for="quick in quickReplies" :key="quick" @click="sendQuick(quick)" class="text-left rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:border-primary-500 hover:text-primary-700 transition-colors">
                  {{ quick }}
                </button>
              </div>
            </div>
          </template>

          <template v-else>
            <div v-for="message in supportStore.messages" :key="message.id" class="flex flex-col gap-1" :class="message.sender_type === 'customer' ? 'items-end' : 'items-start'">
              <span class="text-[11px] text-gray-400 px-1">{{ message.sender_name || message.sender_type }}</span>
              <div class="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm" :class="message.sender_type === 'customer' ? 'bg-primary-600 text-white rounded-br-md' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'">
                {{ message.message }}
              </div>
              <span class="text-[10px] text-gray-400 px-1">{{ formatTime(message.created_at) }}</span>
            </div>

            <div v-if="supportStore.sending" class="flex items-start gap-2">
              <div class="bg-white border border-gray-200 text-gray-700 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm shadow-sm">
                <span class="inline-flex items-center gap-1 text-gray-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 300ms"></span>
                </span>
              </div>
            </div>
          </template>
        </div>

        <form v-if="supportStore.conversationId" @submit.prevent="handleSend" class="border-t border-gray-100 p-3 bg-white rounded-b-2xl">
          <div class="flex items-center gap-2">
            <input
              v-model="text"
              type="text"
              placeholder="Type a message..."
              class="h-10 flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm font-medium outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            <button type="submit" :disabled="!text.trim() || supportStore.sending" class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-all duration-200 hover:bg-primary-700 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md shadow-primary-600/20">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0121.536 12 59.768 59.768 0 013.27 20.875L5.999 12z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useSupportStore } from '@/stores/support'
import { useAuthStore } from '@/stores/auth'

const supportStore = useSupportStore()
const authStore = useAuthStore()

const isOpen = ref(false)
const text = ref('')
const messagesPanel = ref(null)

const unreadCount = computed(() => supportStore.unreadCount)

const quickReplies = [
  'Where is my order?',
  'I want to return an item.',
  'I need help with payment.',
  'Something else.',
]

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    initChat()
  }
}

async function initChat() {
  try {
    await supportStore.ensureSession(
      authStore.user?.name || undefined,
      authStore.user?.email || undefined
    )
    supportStore.startPolling()
  } catch (e) {
    // handled in store
  }
}

async function handleSend() {
  if (!text.value.trim()) return
  await supportStore.sendMessage(text.value)
  text.value = ''
}

function sendQuick(message) {
  supportStore.sendMessage(message)
}

function formatTime(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

function scrollToBottom() {
  if (messagesPanel.value) {
    messagesPanel.value.scrollTop = messagesPanel.value.scrollHeight
  }
}

watch(
  () => supportStore.messages.length,
  () => {
    scrollToBottom()
  }
)

onMounted(async () => {
  await supportStore.listConversations()
  supportStore.startPolling()
})

onBeforeUnmount(() => {
  supportStore.stopPolling()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slideUp-enter-active,
.slideUp-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slideUp-enter-from,
.slideUp-leave-to {
  transform: translateY(24px);
  opacity: 0;
}
</style>
