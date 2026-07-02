import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axios'
import { useToastStore } from '@/stores/toast'

export const useSupportStore = defineStore('support', () => {
  const conversations = ref([])
  const messages = ref([])
  const conversationId = ref(null)
  const sessionId = ref(null)
  const isOpen = ref(false)
  const loading = ref(false)
  const sending = ref(false)
  const unreadCount = computed(() => {
    return conversations.value.reduce((acc, conversation) => acc + conversation.unread_count, 0)
  })

  let pollTimer = null

  function toggleChat() {
    isOpen.value = !isOpen.value
  }

  async function ensureSession(username, email) {
    let sid = sessionId.value || localStorage.getItem('support_session_id')

    if (!sid) {
      sid = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem('support_session_id', sid)
    }
    sessionId.value = sid

    try {
      const { data } = await api.post('/support/start', {
        session_id: sid,
        name: username || null,
        email: email || null,
      })

      conversationId.value = data.data?.conversation_id || conversationId.value
      sessionId.value = data.data?.session_id || sid

      if (data.data?.conversation_id) {
        await fetchMessages()
      }
    } catch (e) {
      useToastStore().error(e.formattedMessage || 'Unable to start chat.')
    }
  }

  async function fetchMessages() {
    if (!conversationId.value) return
    const { data } = await api.get(`/support/messages/${conversationId.value}`)
    messages.value = data.data || []
  }

  async function sendMessage(text) {
    if (!conversationId.value || !text?.trim()) return
    sending.value = true

    try {
      const { data } = await api.post('/support/send', {
        conversation_id: conversationId.value,
        message: text.trim(),
      })

      messages.value.push({
        sender_type: 'customer',
        sender_name: 'You',
        message: text.trim(),
        created_at: new Date().toISOString(),
      })
    } catch (e) {
      useToastStore().error(e.formattedMessage || 'Unable to send message.')
    } finally {
      sending.value = false
    }
  }

  async function listConversations() {
    loading.value = true
    try {
      const { data } = await api.get('/support/conversations')
      conversations.value = (data.data || []).map(item => ({
        ...item,
        unread_count: 0,
      }))
    } catch (e) {
      useToastStore().error(e.formattedMessage || 'Unable to load conversations.')
    } finally {
      loading.value = false
    }
  }

  async function openConversation(id) {
    conversationId.value = id
    await fetchMessages()
  }

  function startPolling() {
    stopPolling()
    pollTimer = setInterval(() => {
      if (conversationId.value) {
        fetchMessages()
        listConversations()
      }
    }, 5000)
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  return {
    conversations,
    messages,
    conversationId,
    sessionId,
    isOpen,
    loading,
    sending,
    unreadCount,
    toggleChat,
    ensureSession,
    fetchMessages,
    sendMessage,
    listConversations,
    openConversation,
    startPolling,
    stopPolling,
  }
})
