<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600">404</h1>
      <p class="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</p>
      <p class="text-gray-500 mt-2 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <RouterLink :to="{ name: 'home' }" class="btn-primary">
        ← Back to Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
