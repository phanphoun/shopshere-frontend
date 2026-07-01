<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <RouterLink :to="{ name: 'home' }" class="inline-flex items-center text-white text-2xl font-bold">
          <div class="bg-white text-primary-600 rounded-xl p-2 mr-3 shadow-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          ShopSphere
        </RouterLink>
      </div>
      <div class="bg-white rounded-card shadow-soft-lg p-8">
        <RouterView />
      </div>
      <p class="text-center text-white/70 text-sm mt-6">
        <RouterLink :to="{ name: 'home' }" class="hover:text-white transition-colors">&larr; Back to shop</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
