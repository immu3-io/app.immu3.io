<template>
  <input aria-describedby="candidates-description"
         type="checkbox"
         class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
         :value="modelValue"
         :checked="modelValue"
         @change="(event: Event) => emit('update:modelValue', event.target.checked)"
  >
</template>

<script setup lang="ts">
defineProps<{modelValue: boolean}>();
const emit = defineEmits(['update:modelValue']);
</script>

