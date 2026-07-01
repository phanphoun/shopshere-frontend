<template>
  <main class="mx-auto max-w-[1200px] px-6 py-10">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-[#111827]">{{ $t('profile.title') }}</h1>
      <p class="text-sm text-[#6B7280] mt-1">{{ $t('profile.description') }}</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-card border border-border shadow-card p-8">
          <h2 class="text-lg font-bold text-[#111827] mb-6">{{ $t('profile.personalInfo') }}</h2>
          <form @submit.prevent="updateProfile" class="space-y-5">
            <div class="flex items-center gap-5 pb-6 border-b border-border">
              <div class="relative">
                <img :src="previewAvatar || authStore.user?.avatar"
                  class="h-20 w-20 rounded-full border-2 border-border object-cover">
                <div class="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold shadow-soft">+</div>
              </div>
              <div>
                <input ref="avatarInput" type="file" accept="image/*" class="hidden" @change="onAvatarChange">
                <button type="button" @click="avatarInput?.click()" class="btn-secondary text-sm">{{ $t('profile.changeAvatar') }}</button>
                <p class="text-xs text-[#6B7280] mt-1.5">{{ $t('profile.avatarHint') }}</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.nameLabel') }}</label>
                <input v-model="form.name" class="input" required>
              </div>
              <div>
                <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.email') }}</label>
                <input v-model="form.email" type="email" class="input" required>
              </div>
              <div>
                <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.phone') }}</label>
                <input v-model="form.phone" class="input">
              </div>
              <div>
                <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.address') }}</label>
                <textarea v-model="form.address" rows="2" class="input"></textarea>
              </div>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button type="submit" :disabled="authStore.loading" class="btn-primary">
                <svg v-if="authStore.loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                {{ authStore.loading ? $t('profile.saving') : $t('profile.saveChanges') }}
              </button>
              <button type="button" class="btn-ghost text-sm" @click="resetForm">{{ $t('profile.cancel') }}</button>
            </div>
          </form>
        </div>
      </div>

      <div class="space-y-8">
        <div class="bg-white rounded-card border border-border shadow-card p-8">
          <h2 class="text-lg font-bold text-[#111827] mb-6">{{ $t('profile.changePassword') }}</h2>
          <form @submit.prevent="changePassword" class="space-y-5">
            <div>
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.currentPassword') }}</label>
              <input v-model="passwordForm.current_password" type="password" class="input" required>
            </div>
            <div>
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.newPassword') }}</label>
              <input v-model="passwordForm.new_password" type="password" class="input" required minlength="8">
            </div>
            <div>
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('profile.confirmNewPassword') }}</label>
              <input v-model="passwordForm.new_password_confirmation" type="password" class="input" required>
            </div>
            <button type="submit" :disabled="changingPassword" class="btn-primary w-full">
              <svg v-if="changingPassword" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              {{ changingPassword ? $t('profile.changing') : $t('profile.changePassword') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const authStore = useAuthStore()
const toastStore = useToastStore()

const avatarInput = ref(null)
const form = ref({})
const previewAvatar = ref(null)
let previousObjectUrl = null
const passwordForm = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
})
const changingPassword = ref(false)

onMounted(() => {
  if (authStore.user) {
    form.value = {
      name: authStore.user.name,
      email: authStore.user.email,
      phone: authStore.user.phone || '',
      address: authStore.user.address || '',
    }
  }
})

function onAvatarChange(e) {
  const file = e.target.files[0]
  if (file) {
    if (previousObjectUrl) URL.revokeObjectURL(previousObjectUrl)
    previousObjectUrl = URL.createObjectURL(file)
    previewAvatar.value = previousObjectUrl
    form.value.avatar = file
  }
}

onUnmounted(() => {
  if (previousObjectUrl) URL.revokeObjectURL(previousObjectUrl)
})

function resetForm() {
  if (authStore.user) {
    form.value = {
      name: authStore.user.name,
      email: authStore.user.email,
      phone: authStore.user.phone || '',
      address: authStore.user.address || '',
    }
  }
}

async function updateProfile() {
  try {
    await authStore.updateProfile(form.value)
    toastStore.success('Profile updated successfully')
    previewAvatar.value = null
  } catch (e) {
    toastStore.error(e.formattedMessage || 'Failed to update profile')
  }
}

async function changePassword() {
  changingPassword.value = true
  try {
    await authStore.changePassword(passwordForm.value)
    toastStore.success('Password changed successfully')
    passwordForm.value = { current_password: '', new_password: '', new_password_confirmation: '' }
  } catch (e) {
    toastStore.error(e.formattedMessage || 'Failed to change password')
  } finally {
    changingPassword.value = false
  }
}
</script>
