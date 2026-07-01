<template>
  <div class="greeting">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
defineProps({
  msg: { type: String, default: 'Hello' },
})
</script>
