<template>
  <div class="py-10">
    <header v-if="title">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-neutral-900">
          {{ title }}
        </h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title?: string
}>();
</script>
