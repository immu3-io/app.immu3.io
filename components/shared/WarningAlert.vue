<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">{{ title }}</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>{{ content }}</p>
        </div>
        <div v-if="link" class="mt-4">
          <div class="-mx-2 -my-1.5 flex">
            <a :href=link.href target="_blank" class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-700 hover:bg-yellow-100 focus:outline-none">{{ link.text }}</a>
          </div>
        </div>
        <div v-if="$slots.actions" class="mt-4">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid';

defineProps<{
  title?: string,
  content?: string,
  link?: {
    href: string,
    text: string,
  },
}>();
</script>