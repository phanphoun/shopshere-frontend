<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none">
      <svg class="absolute -top-24 -left-24 w-96 h-96 text-white/10" viewBox="0 0 400 400" fill="currentColor" aria-hidden="true">
        <path d="M200 0C100 50 20 150 20 250s80 150 180 150c60 0 120-40 160-80 20-20 40-40 20-80-10-30-40-60-80-60S260 100 220 100c-20 0-40 20-60 40-30 0-60-20-90 0-30 20-50 60-30 100-30-10-50 0-70 20-30 20-50 60-30 100-30-10-50 0-70 20-40 20-70 70-20 110-10 10-30 10-50 0z" />
      </svg>
      <svg class="absolute -bottom-32 -right-32 w-[500px] h-[500px] text-white/10" viewBox="0 0 600 600" fill="currentColor" aria-hidden="true">
        <path d="M300 0C430 50 550 180 550 300s-120 250-250 250c-80 0-160-30-220-80-40-30-80-80-40-140 20-40 70-70 120-70s100 30 140 60c50 0 100-50 80-130 30-10 60 0 80 20 40 30 60 80 20 120 20 20 40 30 60 30 110 0 200-90 200-200S410 0 300 0z" />
      </svg>
    </div>

    <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 overflow-hidden rounded-2xl shadow-2xl bg-white">
        <!-- Illustration Side -->
        <div class="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-10">
          <svg viewBox="0 0 420 520" fill="none" class="w-full max-w-xs" aria-hidden="true">
            <!-- Phone -->
            <rect x="120" y="80" width="160" height="300" rx="24" stroke="#4F46E5" stroke-width="8" fill="white" />
            <rect x="138" y="110" width="124" height="240" rx="8" fill="#F3F4F6" />
            <circle cx="200" cy="155" r="28" fill="#E5E7EB" />
            <rect x="180" y="195" width="40" height="4" rx="2" fill="#D1D5DB" />
            <rect x="165" y="210" width="70" height="4" rx="2" fill="#D1D5DB" />
            <rect x="165" y="225" width="40" height="4" rx="2" fill="#D1D5DB" />
            <circle cx="215" cy="305" r="6" fill="#9CA3AF" />

            <!-- Character -->
            <circle cx="290" cy="170" r="14" fill="#FDE7AD" stroke="#F59E0B" stroke-width="3" />
            <path d="M275 210 h30 v90 c0 20 -10 30 -15 40 v30 h60" stroke="#1F2937" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <path d="M275 210 c-10 -10 -10 -40 0 -50" stroke="#1F2937" stroke-width="8" stroke-linecap="round" fill="none" />
            <path d="M305 210 c10 -10 10 -40 0 -50" stroke="#1F2937" stroke-width="8" stroke-linecap="round" fill="none" />

            <!-- Key -->
            <circle cx="330" cy="190" r="14" stroke="#F59E0B" stroke-width="4" fill="white" />
            <path d="M330 204 v30 m-6 10 h4 m-6 -5 h4 m-6 -5 h4" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" />

            <!-- Shield with check -->
            <path d="M90 180 a40 40 0 0 1 80 0 v70 c0 30 -40 55 -80 70 v-70 z" fill="#10B981" />
            <path d="M115 195 l15 15 l30 -35" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />

            <!-- Plant -->
            <rect x="60" y="370" width="20" height="30" rx="4" fill="#F59E0B" />
            <path d="M70 370 c-20 -30 0 -50 20 -60 c20 10 40 30 20 60 c-20 -10 -40 0 -40 20z" fill="#10B981" />
            <path d="M70 380 c-15 -20 5 -40 20 -45 c15 5 35 25 15 45 c-15 -5 -30 5 -35 20z" fill="#34D399" />

            <!-- Clouds -->
            <path d="M40 80 h60 a10 10 0 0 1 0 20 h-60 a10 10 0 0 1 0 -20z" fill="white" opacity="0.4" />
            <rect x="80" y="90" width="50" height="10" rx="5" fill="white" opacity="0.4" />
            <path d="M260 30 h50 a8 8 0 0 1 0 16 h-50 a8 8 0 0 1 0 -16z" fill="white" opacity="0.3" />

            <!-- Floating circles / blobs -->
            <circle cx="60" cy="120" r="10" fill="#6366F1" opacity="0.2" />
            <circle cx="350" cy="90" r="16" fill="#6366F1" opacity="0.15" />
            <circle cx="100" cy="450" r="20" fill="#10B981" opacity="0.2" />
            <circle cx="340" cy="440" r="14" fill="#6366F1" opacity="0.15" />
          </svg>
        </div>

        <!-- Form Side -->
        <div class="p-8 sm:p-12 lg:p-16">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
